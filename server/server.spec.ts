
    import { isType } from 'graphql'
import { connectToServer, disconnectFromServer } from './gen/integration-tests/helper'
import { pokemonTypeModel } from './gen/models/PokemonType'

export async function createPokemon(server, data){
    return server.entry.services['pokemon'].create(data)
}

export async function createType(server, data){
    return server.entry.models['pokemonType'].create(data)
}
    
    describe('integration', () => {
        let server
        let admin, user, pub, createPokemonResponse, createPokemonResponse2, type1, type2
        
        beforeAll(async ()=>{
            server = await connectToServer()
            pub = {user: {}, token: ''};
                type1 = await createType(server, {name:'type1'}) 
                type2 = await createType(server, {name:'type2'})       
                // createModelLine: start
                createPokemonResponse = await createPokemon(server, {typesIds:[type1._id],"name":"Bulbasaur","classification":"Pokemon/classification/197x214j","resistant":["Pokemon/resistant/34ljitgo","Pokemon/resistant/k65xghbw","Pokemon/resistant/vr5omzb5"],"weaknesses":["Pokemon/weaknesses/81jm1mlg","Pokemon/weaknesses/pc2kdrxf","Pokemon/weaknesses/n5m55yf"],"fleeRate":76874.5167810101,"maxCP":405257,"maxHP":208987})
                // // createModelLine: end

                // // createModelLine: start
                createPokemonResponse2 = await createPokemon(server, {"name":"Ivysaur2","classification":"Pokemon/classification/eowshw98","typesIds":[type1._id,type2._id],"resistant":["Pokemon/resistant/2bbyleiq","Pokemon/resistant/gxmbt4xg","Pokemon/resistant/ibuki2p5"],"weaknesses":["Pokemon/weaknesses/4d1gftr","Pokemon/weaknesses/7z38x2iu","Pokemon/weaknesses/tvj28p"],"fleeRate":80621.91328715195,"maxCP":933752,"maxHP":816565})
                // // createModelLine: end 
        })

        afterAll(async () => {
            disconnectFromServer(server)
        });

        describe("Query allPokemon", ()=>{
            it('all',async ()=> {
                const token = pub.token
     
                const allPokemonQuery = `query allPokemon {
                    allPokemon {
                        id,
                        name,
                        classification,
                        types{name},
                        resistant,
                        weaknesses,
                        fleeRate,maxCP,maxHP,
                        evolutions{updatedAt,createdAt,id,pokemon{id}},
                        prevEvolutions{updatedAt,createdAt,id},
                    }
                }`
        
                const allPokemonResponse = await server.query({
                    query: allPokemonQuery
                }, token)
    
                
                expect(allPokemonResponse.data.allPokemon).toEqual(expect.arrayContaining([
                    expect.objectContaining({
                        id: createPokemonResponse.id,
                        name: createPokemonResponse.name,
                        classification: createPokemonResponse.classification,
                        types: [{"name": "type1"}],
                        resistant: expect.arrayContaining(createPokemonResponse.resistant),
                        weaknesses: expect.arrayContaining(createPokemonResponse.weaknesses),
                        fleeRate: createPokemonResponse.fleeRate,
                        maxCP: createPokemonResponse.maxCP,
                        maxHP: createPokemonResponse.maxHP
                    }),
                    expect.objectContaining({
                        id: createPokemonResponse2.id,
                        name: createPokemonResponse2.name,
                        classification: createPokemonResponse2.classification,
                        types: [{"name": "type1"}, {"name": "type2"}],
                        resistant: expect.arrayContaining(createPokemonResponse2.resistant),
                        weaknesses: expect.arrayContaining(createPokemonResponse2.weaknesses),
                        fleeRate: createPokemonResponse2.fleeRate,
                        maxCP: createPokemonResponse2.maxCP,
                        maxHP: createPokemonResponse2.maxHP
                    })
                 ]))
            })
    
            it('Pagination',async ()=> {
                const token = pub.token
                
                   const allPokemonQuery = `query allPokemon {
                    allPokemon(limit:1, skip:1) {
                        id,
                        name,
                        classification,
                        types{name},
                        resistant,
                        weaknesses,
                        fleeRate,maxCP,maxHP,
                        evolutions{updatedAt,createdAt,id,pokemon{id}},
                        prevEvolutions{updatedAt,createdAt,id},
                    }
                }`
        
                const allPokemonResponse = await server.query({
                    query: allPokemonQuery,
                    variables: { id: createPokemonResponse.id}
                }, token)
    
                
                expect(allPokemonResponse.data.allPokemon).toEqual(expect.arrayContaining([
                    expect.objectContaining({
                        id: createPokemonResponse2.id,
                        name: createPokemonResponse2.name,
                        classification: createPokemonResponse2.classification,
                        types:  [{"name": "type1"},{"name": "type2"}],
                        resistant: expect.arrayContaining(createPokemonResponse2.resistant),
                        weaknesses: expect.arrayContaining(createPokemonResponse2.weaknesses),
                        fleeRate: createPokemonResponse2.fleeRate,
                        maxCP: createPokemonResponse2.maxCP,
                        maxHP: createPokemonResponse2.maxHP
                    })
                 ]))
            })
    
            it('Filter by pokemon type',async ()=> {
                const token = pub.token
                
                   const allPokemonQuery = `query allPokemon {
                    allPokemon(filter:{types_every:{id:"${type1.id}"}}) {
                        id,
                        name,
                        classification,
                        types{name},
                        resistant,
                        weaknesses,
                        fleeRate,maxCP,maxHP,
                        evolutions{updatedAt,createdAt,id,pokemon{id}},
                        prevEvolutions{updatedAt,createdAt,id},
                    }
                }`
        
                const allPokemonResponse = await server.query({
                    query: allPokemonQuery,
                }, token)
    
                
                expect(allPokemonResponse.data.allPokemon).toEqual(expect.arrayContaining([
                    expect.objectContaining({
                        id: createPokemonResponse.id,
                        name: createPokemonResponse.name,
                        classification: createPokemonResponse.classification,
                        types: [{"name": "type1"}],
                        resistant: expect.arrayContaining(createPokemonResponse.resistant),
                        weaknesses: expect.arrayContaining(createPokemonResponse.weaknesses),
                        fleeRate: createPokemonResponse.fleeRate,
                        maxCP: createPokemonResponse.maxCP,
                        maxHP: createPokemonResponse.maxHP
                    }),
                 ]))
            })
    
            it('Search by name',async ()=> {
                const token = pub.token
                
                   const allPokemonQuery = `query allPokemon {
                    allPokemon(filter:{name_contains:"saur"}) {
                        id,
                        name,
                        classification,
                        types{name},
                        resistant,
                        weaknesses,
                        fleeRate,maxCP,maxHP,
                        evolutions{updatedAt,createdAt,id,pokemon{id}},
                        prevEvolutions{updatedAt,createdAt,id},
                    }
                }`
        
                const allPokemonResponse = await server.query({
                    query: allPokemonQuery,
                }, token)
    
                
                expect(allPokemonResponse.data.allPokemon).toEqual(expect.arrayContaining([
                    expect.objectContaining({
                        id: createPokemonResponse.id,
                        name: createPokemonResponse.name,
                        classification: createPokemonResponse.classification,
                        types: [{"name": "type1"}],
                        resistant: expect.arrayContaining(createPokemonResponse.resistant),
                        weaknesses: expect.arrayContaining(createPokemonResponse.weaknesses),
                        fleeRate: createPokemonResponse.fleeRate,
                        maxCP: createPokemonResponse.maxCP,
                        maxHP: createPokemonResponse.maxHP
                    }),
                    expect.objectContaining({
                        id: createPokemonResponse2.id,
                        name: createPokemonResponse2.name,
                        classification: createPokemonResponse2.classification,
                        types: [{"name": "type1"},{"name": "type2"}],
                        resistant: expect.arrayContaining(createPokemonResponse2.resistant),
                        weaknesses: expect.arrayContaining(createPokemonResponse2.weaknesses),
                        fleeRate: createPokemonResponse2.fleeRate,
                        maxCP: createPokemonResponse2.maxCP,
                        maxHP: createPokemonResponse2.maxHP
                    }),
                 ]))
            })
            it('Query a pokemon by name',async ()=> {
                const token = pub.token
                
                   const allPokemonQuery = `query allPokemon {
                    allPokemon(filter:{name:"Ivysaur2"}) {
                        id,
                        name,
                        classification,
                        resistant,
                        weaknesses,
                        fleeRate,maxCP,maxHP,
                        evolutions{updatedAt,createdAt,id,pokemon{id}},
                        prevEvolutions{updatedAt,createdAt,id},
                    }
                }`
        
                const allPokemonResponse = await server.query({
                    query: allPokemonQuery,
                }, token)
    
                
                expect(allPokemonResponse.data.allPokemon).toEqual(expect.arrayContaining([
                    expect.objectContaining({
                        id: createPokemonResponse2.id,
                        name: createPokemonResponse2.name,
                        classification: createPokemonResponse2.classification,
                        resistant: expect.arrayContaining(createPokemonResponse2.resistant),
                        weaknesses: expect.arrayContaining(createPokemonResponse2.weaknesses),
                        fleeRate: createPokemonResponse2.fleeRate,
                        maxCP: createPokemonResponse2.maxCP,
                        maxHP: createPokemonResponse2.maxHP
                    }),
                 ]))
            })
        })

        describe("Query Pokemon", ()=>{
            it('Query a pokemon by id',async ()=> {
                const token = pub.token
     
                const allPokemonQuery = `query Pokemon {
                    Pokemon(id:"${createPokemonResponse.id}") {
                        id,
                        name,
                        classification,
                        resistant,
                        weaknesses,
                        fleeRate,maxCP,maxHP,
                        evolutions{updatedAt,createdAt,id,pokemon{id}},
                        prevEvolutions{updatedAt,createdAt,id},
                    }
                }`
        
                const allPokemonResponse = await server.query({
                    query: allPokemonQuery,
                }, token)
    
                
                expect(allPokemonResponse.data.Pokemon).toEqual(
                    expect.objectContaining({
                        id: createPokemonResponse.id,
                        name: createPokemonResponse.name,
                        classification: createPokemonResponse.classification,
                        resistant: expect.arrayContaining(createPokemonResponse.resistant),
                        weaknesses: expect.arrayContaining(createPokemonResponse.weaknesses),
                        fleeRate: createPokemonResponse.fleeRate,
                        maxCP: createPokemonResponse.maxCP,
                        maxHP: createPokemonResponse.maxHP
                    }))
                
            })
        })

        describe("Query allPokemonType", ()=>{
            it('all',async ()=> {
                const token = pub.token
     
                const allPokemonQuery = `query allPokemonType {
                    allPokemonType {
                        id,
                        name,
                        pokemons{name}
                    }
                }`
        
                const allPokemonResponse = await server.query({
                    query: allPokemonQuery
                }, token)
    
                
                expect(allPokemonResponse.data.allPokemonType).toEqual(expect.arrayContaining([
                    expect.objectContaining({
                        id: type1.id,
                        name: type1.name,
                        pokemons:expect.arrayContaining([expect.objectContaining({name:"Ivysaur2"}), expect.objectContaining({name:"Bulbasaur"})])
                    }),
                    expect.objectContaining({
                        id: type2.id,
                        name: type2.name,
                        pokemons:expect.arrayContaining([expect.objectContaining({name:"Ivysaur2"})])
                    })
                 ]))
            })
        })

        describe("Mutation updatePokemon", ()=>{
            it('name',async ()=> {
                const token = pub.token
     
                const createPokemonResponse3 = await await createPokemon(server, {typesIds:[type1._id],"name":"Bulbasaur2","classification":"Pokemon/classification/197x214j","resistant":["Pokemon/resistant/34ljitgo","Pokemon/resistant/k65xghbw","Pokemon/resistant/vr5omzb5"],"weaknesses":["Pokemon/weaknesses/81jm1mlg","Pokemon/weaknesses/pc2kdrxf","Pokemon/weaknesses/n5m55yf"],"fleeRate":76874.5167810101,"maxCP":405257,"maxHP":208987})// createModelLine: end  
                const updatePokemonMutation = `mutation UpdatePokemon($id: ID!,$name: String!){
                    updatePokemon(id: $id,name: $name) {
                        id,name, favorite
                    }
                }`
    
                const updatePokemonResponse = await server.mutate({
                    mutation: updatePokemonMutation,
                    variables: {
                        "id": createPokemonResponse3.id,
                        "name": "Pokemon/name/o45c0tm",
                    }
                })

               
                expect(updatePokemonResponse.data.updatePokemon).toEqual(
                    expect.objectContaining({
                        id: createPokemonResponse3.id,
                        name: "Pokemon/name/o45c0tm",
                        favorite: false
                    }))
            })

            it('favorite',async ()=> {
                const token = pub.token
     
                const createPokemonResponse4 = await await createPokemon(server, {typesIds:[type1._id],"name":"Bulbasaur3","classification":"Pokemon/classification/197x214j","resistant":["Pokemon/resistant/34ljitgo","Pokemon/resistant/k65xghbw","Pokemon/resistant/vr5omzb5"],"weaknesses":["Pokemon/weaknesses/81jm1mlg","Pokemon/weaknesses/pc2kdrxf","Pokemon/weaknesses/n5m55yf"],"fleeRate":76874.5167810101,"maxCP":405257,"maxHP":208987})// createModelLine: end  
                const updatePokemonMutation = `mutation UpdatePokemon($id: ID!,$favorite: Boolean!){
                    updatePokemon(id: $id,favorite: $favorite) {
                        id,name,favorite
                    }
                }`
    
                const updatePokemonResponse = await server.mutate({
                    mutation: updatePokemonMutation,
                    variables: {
                        "id": createPokemonResponse4.id,
                        "favorite": true,
                    }
                })

               
                expect(updatePokemonResponse.data.updatePokemon).toEqual(
                    expect.objectContaining({
                        id: createPokemonResponse4.id,
                        name: "Bulbasaur3",
                        favorite: true
                    }))
            })
        })
    })

