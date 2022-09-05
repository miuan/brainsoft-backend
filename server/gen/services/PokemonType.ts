/* eslint-disable prettier/prettier */
import { pokemonTypeModel, Types } from '../models/PokemonType'
import * as extras from '../extras'

export const pokemonTypeAll = (entry) => {
    return async (data) => {
        if (entry.hooks && entry.hooks.services['beforePokemonTypeAll']) {
            await entry.hooks.services['beforePokemonTypeAll'](entry, data)
        }

        const filter = extras.filterGen(data.filter)
        let findPromise = pokemonTypeModel.find(filter)
        if (data.skip) findPromise = findPromise.skip(data.skip)
        if (data.limit) findPromise = findPromise.limit(data.limit)
        if (data.orderBy) {
            const {
                groups: { field, type },
            } = data.orderBy.match(/(?<field>\w+)_(?<type>(asc|desc))/)
            findPromise = findPromise.sort([[field, type]])
        }

        let models = await findPromise.lean()

        if (entry.hooks && entry.hooks.services['afterPokemonTypeAll']) {
            models = await entry.hooks.services['afterPokemonTypeAll'](entry, { models, ...data })
        }
        return models
    }
}

export const pokemonTypeCount = (entry) => {
    return async (data) => {
        if (entry.hooks && entry.hooks.services['beforePokemonTypeCount']) {
            await entry.hooks.services['beforePokemonTypeCount'](entry, data)
        }

        const filter = extras.filterGen(data.filter)
        let countPromise = pokemonTypeModel.count(filter)

        let count = await countPromise.lean()

        if (entry.hooks && entry.hooks.services['afterPokemonTypeCount']) {
            count = await entry.hooks.services['afterPokemonTypeCount'](entry, { count, ...data })
        }
        return count
    }
}

export const pokemonTypeOne = (entry) => {
    return async (id, userId = null) => {
        if (entry.hooks && entry.hooks.services['beforePokemonTypeOne']) {
            await entry.hooks.services['beforePokemonTypeOne'](entry, { id })
        }
        let model = await pokemonTypeModel.findById(id).lean()
        model.id = id

        if (entry.hooks && entry.hooks.services['afterPokemonTypeOne']) {
            model = await entry.hooks.services['afterPokemonTypeOne'](entry, { id, model })
        }

        return model
    }
}

export const pokemonTypeCreate = (entry) => {
    return async (data, ctxUserId = null) => {
        // before real object exist
        // we generate TEMPORARY-ID for related objects what they have a required relation...
        const id = Types.ObjectId()

        
            const pokemonsLinkedIds = []
            
             // templates/service-transform-many-ids.ts
 // case where data.pokemons have many ids or many objects
  if (data.pokemons) {
    const idsOfCreated = []
    for(const createdFrom of data.pokemons){
      // the related member is NOT required so we will update later with REAL-ID
		// createdFrom.typesIds = [id]
      const created = await entry.services['pokemon'].create(createdFrom);
      idsOfCreated.push(created.id)
      // backward relation is not setup yet, so need update later with REAL-ID
		 pokemonsLinkedIds.push(created.id)
    }
    data.pokemons = idsOfCreated
  }

  if (data.pokemonsIds) {
    if(data.pokemons && data.pokemons.length > 0) data.pokemons.push(...data.pokemonsIds)
    else data.pokemons = data.pokemonsIds
    pokemonsLinkedIds.push(...data.pokemonsIds)
  }
  
            
      
            const userLinkedIds = []
            
              // templates/service-transform-one-id.ts
  // case where data.user have multiple ids or multiple object
  if (data.userId) {
    userLinkedIds.push(data.userId);
    data.user = data.userId
  } 

            
      
        if (entry.hooks && entry.hooks.services['beforePokemonTypeCreate']) {
            data = await entry.hooks.services['beforePokemonTypeCreate'](entry, { data, ctxUserId })
        }
        
        let createdModel = await pokemonTypeModel.create(data)

        
        
    if(pokemonsLinkedIds && pokemonsLinkedIds.length > 0) {
        await entry.models['pokemon'].updateMany({ _id: {$in: pokemonsLinkedIds} }, {  $push: {types: { $each: [createdModel.id]}} })
      }
    if(userLinkedIds && userLinkedIds.length > 0) {
        await entry.models['user'].updateMany({ _id: {$in: userLinkedIds} }, {  $push: {_pokemonType: { $each: [createdModel.id]}} })
      }
        if (entry.hooks && entry.hooks.services['afterPokemonTypeCreate']) {
            createdModel = await entry.hooks.services['afterPokemonTypeCreate'](entry, {
                id: createdModel._id,
                data: createdModel,
                ctxUserId,
            })
        }
        return createdModel
    }
}

export const pokemonTypeUpdate = (entry) => {
    return async (data, updatepokemonTypeId = null, ctxUserId = null) => {
        let id = updatepokemonTypeId

        if (data.id) {
            id = data.id
            delete data.id
        }

        if (entry.hooks && entry.hooks.services['beforePokemonTypeUpdate']) {
            data = await entry.hooks.services['beforePokemonTypeUpdate'](entry, { data, id, ctxUserId })
        }

        // disconnect all relations
        if( (data.pokemonsIds && data.pokemonsIds.length > 0) || (data.pokemons && data.pokemons.length > 0) ){
      // relation is type: RELATION 
      await entry.models['pokemon'].updateMany({types:{$all: [id]}}, {$pull: {types: id}})
    }if( data.userId || data.undefined ){
      // relation is type: RELATION 
      await entry.models['user'].updateMany({_pokemonType:{$all: [id]}}, {$pull: {_pokemonType: id}})
    }
        
            const pokemonsLinkedIds = []
            
             // templates/service-transform-many-ids.ts
 // case where data.pokemons have many ids or many objects
  if (data.pokemons) {
    const idsOfCreated = []
    for(const createdFrom of data.pokemons){
      createdFrom.typesIds = [id]
      const created = await entry.services['pokemon'].create(createdFrom);
      idsOfCreated.push(created.id)
      // backward relation is already setup, so no need any update aditional
		// pokemonsLinkedIds.push(created.id)
    }
    data.pokemons = idsOfCreated
  }

  if (data.pokemonsIds) {
    if(data.pokemons && data.pokemons.length > 0) data.pokemons.push(...data.pokemonsIds)
    else data.pokemons = data.pokemonsIds
    pokemonsLinkedIds.push(...data.pokemonsIds)
  }
  
            
      
            const userLinkedIds = []
            
              // templates/service-transform-one-id.ts
  // case where data.user have multiple ids or multiple object
  if (data.userId) {
    userLinkedIds.push(data.userId);
    data.user = data.userId
  } 

            
      
        
        let updatedModel = await pokemonTypeModel.findByIdAndUpdate(id, data, { new: true, runValidators: true })

        // connect all relations
        
    if(pokemonsLinkedIds && pokemonsLinkedIds.length > 0) {
        await entry.models['pokemon'].updateMany({ _id: {$in: pokemonsLinkedIds} }, {  $push: {types: { $each: [updatedModel.id]}} })
      }
    if(userLinkedIds && userLinkedIds.length > 0) {
        await entry.models['user'].updateMany({ _id: {$in: userLinkedIds} }, {  $push: {_pokemonType: { $each: [updatedModel.id]}} })
      }

        if (entry.hooks && entry.hooks.services['afterPokemonTypeUpdate']) {
            updatedModel = await entry.hooks.services['afterPokemonTypeUpdate'](entry, {
                data: updatedModel,
                id,
                ctxUserId,
            })
        }

        return updatedModel
    }
}

export const pokemonTypeRemove = (entry, ctxUserId = null) => {
    return async (id, userId, skipRelations = []) => {
        if (entry.hooks && entry.hooks.services['beforePokemonTypeRemove']) {
            await entry.hooks.services['beforePokemonTypeRemove'](entry, { id, ctxUserId })
        }

        // disconnect all relations
        if( !skipRelations.includes('pokemon') ){
      // relation is type: RELATION 
      await entry.models['pokemon'].updateMany({types:{$all: [id]}}, {$pull: {types: id}})
    }if( !skipRelations.includes('user') ){
      // relation is type: RELATION 
      await entry.models['user'].updateMany({_pokemonType:{$all: [id]}}, {$pull: {_pokemonType: id}})
    }
        
        let removedModel = await pokemonTypeModel.findByIdAndRemove(id)

        if (entry.hooks && entry.hooks.services['afterPokemonTypeRemove']) {
            removedModel = await entry.hooks.services['afterPokemonTypeRemove'](entry, {
                data: removedModel,
                id,
                ctxUserId,
            })
        }

        return removedModel
    }
}



export const generatePokemonTypeService = (entry) => {
    return {
        all: pokemonTypeAll(entry),
        count: pokemonTypeCount(entry),
        one: pokemonTypeOne(entry),
        create: pokemonTypeCreate(entry),
        update: pokemonTypeUpdate(entry),
        remove: pokemonTypeRemove(entry),
        
    }
}
