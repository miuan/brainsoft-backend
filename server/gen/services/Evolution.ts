/* eslint-disable prettier/prettier */
import { evolutionModel, Types } from '../models/Evolution'
import * as extras from '../extras'

export const evolutionAll = (entry) => {
    return async (data) => {
        if (entry.hooks && entry.hooks.services['beforeEvolutionAll']) {
            await entry.hooks.services['beforeEvolutionAll'](entry, data)
        }

        const filter = extras.filterGen(data.filter)
        let findPromise = evolutionModel.find(filter)
        if (data.skip) findPromise = findPromise.skip(data.skip)
        if (data.limit) findPromise = findPromise.limit(data.limit)
        if (data.orderBy) {
            const {
                groups: { field, type },
            } = data.orderBy.match(/(?<field>\w+)_(?<type>(asc|desc))/)
            findPromise = findPromise.sort([[field, type]])
        }

        let models = await findPromise.lean()

        if (entry.hooks && entry.hooks.services['afterEvolutionAll']) {
            models = await entry.hooks.services['afterEvolutionAll'](entry, { models, ...data })
        }
        return models
    }
}

export const evolutionCount = (entry) => {
    return async (data) => {
        if (entry.hooks && entry.hooks.services['beforeEvolutionCount']) {
            await entry.hooks.services['beforeEvolutionCount'](entry, data)
        }

        const filter = extras.filterGen(data.filter)
        let countPromise = evolutionModel.count(filter)

        let count = await countPromise.lean()

        if (entry.hooks && entry.hooks.services['afterEvolutionCount']) {
            count = await entry.hooks.services['afterEvolutionCount'](entry, { count, ...data })
        }
        return count
    }
}

export const evolutionOne = (entry) => {
    return async (id, userId = null) => {
        if (entry.hooks && entry.hooks.services['beforeEvolutionOne']) {
            await entry.hooks.services['beforeEvolutionOne'](entry, { id })
        }
        let model = await evolutionModel.findById(id).lean()
        model.id = id

        if (entry.hooks && entry.hooks.services['afterEvolutionOne']) {
            model = await entry.hooks.services['afterEvolutionOne'](entry, { id, model })
        }

        return model
    }
}

export const evolutionCreate = (entry) => {
    return async (data, ctxUserId = null) => {
        // before real object exist
        // we generate TEMPORARY-ID for related objects what they have a required relation...
        const id = Types.ObjectId()

        
            const pokemonLinkedIds = []
              // templates/service-crete-one-object.t.ts
  // case where data.pokemon have multiple ids or multiple object
  if (data.pokemon) {
    if(data.pokemonId) throw new Error('`pokemon` and `pokemonId` can\'t be filled together')
    // the related member is NOT required so we will update later with REAL-ID
		// data.pokemon.typesIds = [id]
    const created = await entry.services['pokemon'].create(data.pokemon)
    data.pokemon = created.id
    // backward relation is not setup yet, so need update later with REAL-ID
		 pokemonLinkedIds.push(created.id)
  } 
              // templates/service-transform-one-id.ts
  // case where data.pokemon have multiple ids or multiple object
  if (data.pokemonId) {
    pokemonLinkedIds.push(data.pokemonId);
    data.pokemon = data.pokemonId
  } 

            
      
            const _pokemonEvoLinkedIds = []
            
             // templates/service-transform-many-ids.ts
 // case where data._pokemonEvo have many ids or many objects
  if (data._pokemonEvo) {
    const idsOfCreated = []
    for(const createdFrom of data._pokemonEvo){
      // the related member is NOT required so we will update later with REAL-ID
		// createdFrom.typesIds = [id]
      const created = await entry.services['pokemon'].create(createdFrom);
      idsOfCreated.push(created.id)
      // backward relation is not setup yet, so need update later with REAL-ID
		 _pokemonEvoLinkedIds.push(created.id)
    }
    data._pokemonEvo = idsOfCreated
  }

  if (data._pokemonEvoIds) {
    if(data._pokemonEvo && data._pokemonEvo.length > 0) data._pokemonEvo.push(...data._pokemonEvoIds)
    else data._pokemonEvo = data._pokemonEvoIds
    _pokemonEvoLinkedIds.push(...data._pokemonEvoIds)
  }
  
            
      
            const _prevPokemonEvoLinkedIds = []
            
             // templates/service-transform-many-ids.ts
 // case where data._prevPokemonEvo have many ids or many objects
  if (data._prevPokemonEvo) {
    const idsOfCreated = []
    for(const createdFrom of data._prevPokemonEvo){
      // the related member is NOT required so we will update later with REAL-ID
		// createdFrom.typesIds = [id]
      const created = await entry.services['pokemon'].create(createdFrom);
      idsOfCreated.push(created.id)
      // backward relation is not setup yet, so need update later with REAL-ID
		 _prevPokemonEvoLinkedIds.push(created.id)
    }
    data._prevPokemonEvo = idsOfCreated
  }

  if (data._prevPokemonEvoIds) {
    if(data._prevPokemonEvo && data._prevPokemonEvo.length > 0) data._prevPokemonEvo.push(...data._prevPokemonEvoIds)
    else data._prevPokemonEvo = data._prevPokemonEvoIds
    _prevPokemonEvoLinkedIds.push(...data._prevPokemonEvoIds)
  }
  
            
      
            const userLinkedIds = []
            
              // templates/service-transform-one-id.ts
  // case where data.user have multiple ids or multiple object
  if (data.userId) {
    userLinkedIds.push(data.userId);
    data.user = data.userId
  } 

            
      
        if (entry.hooks && entry.hooks.services['beforeEvolutionCreate']) {
            data = await entry.hooks.services['beforeEvolutionCreate'](entry, { data, ctxUserId })
        }
        
        let createdModel = await evolutionModel.create(data)

        
        
    if(pokemonLinkedIds && pokemonLinkedIds.length > 0) {
      await entry.models['pokemon'].updateMany({ _id: {$in: pokemonLinkedIds} }, {  _evo: createdModel.id })
    }
    if(_pokemonEvoLinkedIds && _pokemonEvoLinkedIds.length > 0) {
        await entry.models['pokemon'].updateMany({ _id: {$in: _pokemonEvoLinkedIds} }, {  $push: {evolutions: { $each: [createdModel.id]}} })
      }
    if(_prevPokemonEvoLinkedIds && _prevPokemonEvoLinkedIds.length > 0) {
        await entry.models['pokemon'].updateMany({ _id: {$in: _prevPokemonEvoLinkedIds} }, {  $push: {prevEvolutions: { $each: [createdModel.id]}} })
      }
    if(userLinkedIds && userLinkedIds.length > 0) {
        await entry.models['user'].updateMany({ _id: {$in: userLinkedIds} }, {  $push: {_evolution: { $each: [createdModel.id]}} })
      }
        if (entry.hooks && entry.hooks.services['afterEvolutionCreate']) {
            createdModel = await entry.hooks.services['afterEvolutionCreate'](entry, {
                id: createdModel._id,
                data: createdModel,
                ctxUserId,
            })
        }
        return createdModel
    }
}

export const evolutionUpdate = (entry) => {
    return async (data, updateevolutionId = null, ctxUserId = null) => {
        let id = updateevolutionId

        if (data.id) {
            id = data.id
            delete data.id
        }

        if (entry.hooks && entry.hooks.services['beforeEvolutionUpdate']) {
            data = await entry.hooks.services['beforeEvolutionUpdate'](entry, { data, id, ctxUserId })
        }

        // disconnect all relations
        if( data.pokemonId || data.pokemon ){
      // relation is type: RELATION
      await entry.models['pokemon'].updateMany({_evo: id}, {_evo: null})
  }if( (data._pokemonEvoIds && data._pokemonEvoIds.length > 0) || (data._pokemonEvo && data._pokemonEvo.length > 0) ){
      // relation is type: RELATION 
      await entry.models['pokemon'].updateMany({evolutions:{$all: [id]}}, {$pull: {evolutions: id}})
    }if( (data._prevPokemonEvoIds && data._prevPokemonEvoIds.length > 0) || (data._prevPokemonEvo && data._prevPokemonEvo.length > 0) ){
      // relation is type: RELATION 
      await entry.models['pokemon'].updateMany({prevEvolutions:{$all: [id]}}, {$pull: {prevEvolutions: id}})
    }if( data.userId || data.undefined ){
      // relation is type: RELATION 
      await entry.models['user'].updateMany({_evolution:{$all: [id]}}, {$pull: {_evolution: id}})
    }
        
            const pokemonLinkedIds = []
              // templates/service-crete-one-object.t.ts
  // case where data.pokemon have multiple ids or multiple object
  if (data.pokemon) {
    if(data.pokemonId) throw new Error('`pokemon` and `pokemonId` can\'t be filled together')
    data.pokemon.typesIds = [id]
    const created = await entry.services['pokemon'].create(data.pokemon)
    data.pokemon = created.id
    // backward relation is already setup, so no need any update aditional
		// pokemonLinkedIds.push(created.id)
  } 
              // templates/service-transform-one-id.ts
  // case where data.pokemon have multiple ids or multiple object
  if (data.pokemonId) {
    pokemonLinkedIds.push(data.pokemonId);
    data.pokemon = data.pokemonId
  } 

            
      
            const _pokemonEvoLinkedIds = []
            
             // templates/service-transform-many-ids.ts
 // case where data._pokemonEvo have many ids or many objects
  if (data._pokemonEvo) {
    const idsOfCreated = []
    for(const createdFrom of data._pokemonEvo){
      createdFrom.typesIds = [id]
      const created = await entry.services['pokemon'].create(createdFrom);
      idsOfCreated.push(created.id)
      // backward relation is already setup, so no need any update aditional
		// _pokemonEvoLinkedIds.push(created.id)
    }
    data._pokemonEvo = idsOfCreated
  }

  if (data._pokemonEvoIds) {
    if(data._pokemonEvo && data._pokemonEvo.length > 0) data._pokemonEvo.push(...data._pokemonEvoIds)
    else data._pokemonEvo = data._pokemonEvoIds
    _pokemonEvoLinkedIds.push(...data._pokemonEvoIds)
  }
  
            
      
            const _prevPokemonEvoLinkedIds = []
            
             // templates/service-transform-many-ids.ts
 // case where data._prevPokemonEvo have many ids or many objects
  if (data._prevPokemonEvo) {
    const idsOfCreated = []
    for(const createdFrom of data._prevPokemonEvo){
      createdFrom.typesIds = [id]
      const created = await entry.services['pokemon'].create(createdFrom);
      idsOfCreated.push(created.id)
      // backward relation is already setup, so no need any update aditional
		// _prevPokemonEvoLinkedIds.push(created.id)
    }
    data._prevPokemonEvo = idsOfCreated
  }

  if (data._prevPokemonEvoIds) {
    if(data._prevPokemonEvo && data._prevPokemonEvo.length > 0) data._prevPokemonEvo.push(...data._prevPokemonEvoIds)
    else data._prevPokemonEvo = data._prevPokemonEvoIds
    _prevPokemonEvoLinkedIds.push(...data._prevPokemonEvoIds)
  }
  
            
      
            const userLinkedIds = []
            
              // templates/service-transform-one-id.ts
  // case where data.user have multiple ids or multiple object
  if (data.userId) {
    userLinkedIds.push(data.userId);
    data.user = data.userId
  } 

            
      
        
        let updatedModel = await evolutionModel.findByIdAndUpdate(id, data, { new: true, runValidators: true })

        // connect all relations
        
    if(pokemonLinkedIds && pokemonLinkedIds.length > 0) {
      await entry.models['pokemon'].updateMany({ _id: {$in: pokemonLinkedIds} }, {  _evo: updatedModel.id })
    }
    if(_pokemonEvoLinkedIds && _pokemonEvoLinkedIds.length > 0) {
        await entry.models['pokemon'].updateMany({ _id: {$in: _pokemonEvoLinkedIds} }, {  $push: {evolutions: { $each: [updatedModel.id]}} })
      }
    if(_prevPokemonEvoLinkedIds && _prevPokemonEvoLinkedIds.length > 0) {
        await entry.models['pokemon'].updateMany({ _id: {$in: _prevPokemonEvoLinkedIds} }, {  $push: {prevEvolutions: { $each: [updatedModel.id]}} })
      }
    if(userLinkedIds && userLinkedIds.length > 0) {
        await entry.models['user'].updateMany({ _id: {$in: userLinkedIds} }, {  $push: {_evolution: { $each: [updatedModel.id]}} })
      }

        if (entry.hooks && entry.hooks.services['afterEvolutionUpdate']) {
            updatedModel = await entry.hooks.services['afterEvolutionUpdate'](entry, {
                data: updatedModel,
                id,
                ctxUserId,
            })
        }

        return updatedModel
    }
}

export const evolutionRemove = (entry, ctxUserId = null) => {
    return async (id, userId, skipRelations = []) => {
        if (entry.hooks && entry.hooks.services['beforeEvolutionRemove']) {
            await entry.hooks.services['beforeEvolutionRemove'](entry, { id, ctxUserId })
        }

        // disconnect all relations
        if( !skipRelations.includes('pokemon') ){
      // relation is type: RELATION
      await entry.models['pokemon'].updateMany({_evo: id}, {_evo: null})
  }if( !skipRelations.includes('pokemon') ){
      // relation is type: RELATION 
      await entry.models['pokemon'].updateMany({evolutions:{$all: [id]}}, {$pull: {evolutions: id}})
    }if( !skipRelations.includes('pokemon') ){
      // relation is type: RELATION 
      await entry.models['pokemon'].updateMany({prevEvolutions:{$all: [id]}}, {$pull: {prevEvolutions: id}})
    }if( !skipRelations.includes('user') ){
      // relation is type: RELATION 
      await entry.models['user'].updateMany({_evolution:{$all: [id]}}, {$pull: {_evolution: id}})
    }
        
        let removedModel = await evolutionModel.findByIdAndRemove(id)

        if (entry.hooks && entry.hooks.services['afterEvolutionRemove']) {
            removedModel = await entry.hooks.services['afterEvolutionRemove'](entry, {
                data: removedModel,
                id,
                ctxUserId,
            })
        }

        return removedModel
    }
}



export const generateEvolutionService = (entry) => {
    return {
        all: evolutionAll(entry),
        count: evolutionCount(entry),
        one: evolutionOne(entry),
        create: evolutionCreate(entry),
        update: evolutionUpdate(entry),
        remove: evolutionRemove(entry),
        
    }
}
