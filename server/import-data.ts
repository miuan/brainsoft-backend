
import { readFile } from 'fs/promises';
import { evolutionModel } from './gen/models/Evolution';
import { pokemonModel } from './gen/models/Pokemon';
import { pokemonTypeModel } from './gen/models/PokemonType';

const saveEvo = async (evo) => {
    const saved = await evolutionModel.create(evo)
    evo.id = saved._id
}

const saveType = async (type) => {
    const saved = await pokemonTypeModel.create(type)
    type.id = saved._id
}

const updateTypes = (id, pokemon) => Promise.all((pokemon.types || []).map((typeId)=> pokemonTypeModel.findByIdAndUpdate(typeId, 
    { $push: { pokemons : id}})
))

const savePokemon = async (pokemon, connectors) => {
    const saved = await pokemonModel.create(pokemon)
    
    const evo = connectors.evolutions[pokemon.name] 
    if(evo){
        await evolutionModel.findByIdAndUpdate(evo.id, { pokemon: saved._id })
    }
   
    await updateTypes(saved._id, pokemon )
}

const mapEvo = (evolutions, items=[]) => items.map(({name})=>evolutions[name].id)
const mapType = (types, items=[]) => items.map((name)=>types[name].id)

export const importData = async () =>{
    await evolutionModel.deleteMany({})
    await pokemonModel.deleteMany({})
    await pokemonTypeModel.deleteMany({})
    
    let data = JSON.parse(await readFile('../pokemons.json', 'utf8'));
    let connectors = data.reduce((connect, pokes) => {
        for(const {name} of (pokes.evolutions || [])){
            if(!(name in connect.evolutions)){
                const evo = { id:null, name }
                connect.evolutions[name] = evo
                connect.promises.push(saveEvo(evo))
            }
        }

        for(const {name} of (pokes.prevEvolutions || [])){
            if(!(name in connect.evolutions)){
                const evo = { id:null, name }
                connect.evolutions[name] = evo
                connect.promises.push(saveEvo(evo))
            }
        }

        for(const name of (pokes.types || [])){
            if(!(name in connect.types)){
                const type = { id:null, name }
                connect.types[name] = type
                connect.promises.push(saveType(type))
            }
        }

        return connect
    }, {
        evolutions:{},
        types: {},
        promises:[],
    })

    await Promise.all(connectors.promises)
    
    let pokemons = data.map((pokes) => {
        const pokemon = {
            ...pokes,
            types: mapType(connectors.types, pokes.types),
            evolutions: mapEvo(connectors.evolutions, pokes.evolutions), 
            prevEvolutions: mapEvo(connectors.evolutions, pokes.prevEvolutions),
            id: undefined
        }
        return savePokemon(pokemon, connectors)
    })

    await Promise.all(pokemons)
}