/* eslint-disable prettier/prettier */
import { pokemonModel, Types } from '../models/Pokemon'
import * as extras from '../extras'

export const pokemonAll = (entry) => {
    return async (data) => {
        if (entry.hooks && entry.hooks.services['beforePokemonAll']) {
            await entry.hooks.services['beforePokemonAll'](entry, data)
        }

        const filter = extras.filterGen(data.filter)
        let findPromise = pokemonModel.find(filter)
        if (data.skip) findPromise = findPromise.skip(data.skip)
        if (data.limit) findPromise = findPromise.limit(data.limit)
        if (data.orderBy) {
            const {
                groups: { field, type },
            } = data.orderBy.match(/(?<field>\w+)_(?<type>(asc|desc))/)
            findPromise = findPromise.sort([[field, type]])
        }

        let models = await findPromise.lean()

        if (entry.hooks && entry.hooks.services['afterPokemonAll']) {
            models = await entry.hooks.services['afterPokemonAll'](entry, { models, ...data })
        }
        return models
    }
}

export const pokemonCount = (entry) => {
    return async (data) => {
        if (entry.hooks && entry.hooks.services['beforePokemonCount']) {
            await entry.hooks.services['beforePokemonCount'](entry, data)
        }

        const filter = extras.filterGen(data.filter)
        let countPromise = pokemonModel.count(filter)

        let count = await countPromise.lean()

        if (entry.hooks && entry.hooks.services['afterPokemonCount']) {
            count = await entry.hooks.services['afterPokemonCount'](entry, { count, ...data })
        }
        return count
    }
}

export const pokemonOne = (entry) => {
    return async (id, userId = null) => {
        if (entry.hooks && entry.hooks.services['beforePokemonOne']) {
            await entry.hooks.services['beforePokemonOne'](entry, { id })
        }
        let model = await pokemonModel.findById(id).lean()
        model.id = id

        if (entry.hooks && entry.hooks.services['afterPokemonOne']) {
            model = await entry.hooks.services['afterPokemonOne'](entry, { id, model })
        }

        return model
    }
}

export const pokemonCreate = (entry) => {
    return async (data, ctxUserId = null) => {
        // before real object exist
        // we generate TEMPORARY-ID for related objects what they have a required relation...
        const id = Types.ObjectId()

        
            const typesLinkedIds = []
            
             // templates/service-transform-many-ids.ts
 // case where data.types have many ids or many objects
  if (data.types) {
    const idsOfCreated = []
    for(const createdFrom of data.types){
      // the related member is NOT required so we will update later with REAL-ID
		// createdFrom.pokemonsIds = [id]
      const created = await entry.services['pokemonType'].create(createdFrom);
      idsOfCreated.push(created.id)
      // backward relation is not setup yet, so need update later with REAL-ID
		 typesLinkedIds.push(created.id)
    }
    data.types = idsOfCreated
  }

  if (data.typesIds) {
    if(data.types && data.types.length > 0) data.types.push(...data.typesIds)
    else data.types = data.typesIds
    typesLinkedIds.push(...data.typesIds)
  }
  
            
      
            const evolutionsLinkedIds = []
            
             // templates/service-transform-many-ids.ts
 // case where data.evolutions have many ids or many objects
  if (data.evolutions) {
    const idsOfCreated = []
    for(const createdFrom of data.evolutions){
      // the related member is NOT required so we will update later with REAL-ID
		// createdFrom.pokemonId = id
      const created = await entry.services['evolution'].create(createdFrom);
      idsOfCreated.push(created.id)
      // backward relation is not setup yet, so need update later with REAL-ID
		 evolutionsLinkedIds.push(created.id)
    }
    data.evolutions = idsOfCreated
  }

  if (data.evolutionsIds) {
    if(data.evolutions && data.evolutions.length > 0) data.evolutions.push(...data.evolutionsIds)
    else data.evolutions = data.evolutionsIds
    evolutionsLinkedIds.push(...data.evolutionsIds)
  }
  
            
      
            const prevEvolutionsLinkedIds = []
            
             // templates/service-transform-many-ids.ts
 // case where data.prevEvolutions have many ids or many objects
  if (data.prevEvolutions) {
    const idsOfCreated = []
    for(const createdFrom of data.prevEvolutions){
      // the related member is NOT required so we will update later with REAL-ID
		// createdFrom.pokemonId = id
      const created = await entry.services['evolution'].create(createdFrom);
      idsOfCreated.push(created.id)
      // backward relation is not setup yet, so need update later with REAL-ID
		 prevEvolutionsLinkedIds.push(created.id)
    }
    data.prevEvolutions = idsOfCreated
  }

  if (data.prevEvolutionsIds) {
    if(data.prevEvolutions && data.prevEvolutions.length > 0) data.prevEvolutions.push(...data.prevEvolutionsIds)
    else data.prevEvolutions = data.prevEvolutionsIds
    prevEvolutionsLinkedIds.push(...data.prevEvolutionsIds)
  }
  
            
      
            const _evoLinkedIds = []
              // templates/service-crete-one-object.t.ts
  // case where data._evo have multiple ids or multiple object
  if (data._evo) {
    if(data._evoId) throw new Error('`_evo` and `_evoId` can\'t be filled together')
    // the related member is NOT required so we will update later with REAL-ID
		// data._evo.pokemonId = id
    const created = await entry.services['evolution'].create(data._evo)
    data._evo = created.id
    // backward relation is not setup yet, so need update later with REAL-ID
		 _evoLinkedIds.push(created.id)
  } 
              // templates/service-transform-one-id.ts
  // case where data._evo have multiple ids or multiple object
  if (data._evoId) {
    _evoLinkedIds.push(data._evoId);
    data._evo = data._evoId
  } 

            
      
            const userLinkedIds = []
            
              // templates/service-transform-one-id.ts
  // case where data.user have multiple ids or multiple object
  if (data.userId) {
    userLinkedIds.push(data.userId);
    data.user = data.userId
  } 

            
      
        if (entry.hooks && entry.hooks.services['beforePokemonCreate']) {
            data = await entry.hooks.services['beforePokemonCreate'](entry, { data, ctxUserId })
        }
        
        let createdModel = await pokemonModel.create(data)

        
        
    if(typesLinkedIds && typesLinkedIds.length > 0) {
        await entry.models['pokemonType'].updateMany({ _id: {$in: typesLinkedIds} }, {  $push: {pokemons: { $each: [createdModel.id]}} })
      }
    if(evolutionsLinkedIds && evolutionsLinkedIds.length > 0) {
        await entry.models['evolution'].updateMany({ _id: {$in: evolutionsLinkedIds} }, {  $push: {_pokemonEvo: { $each: [createdModel.id]}} })
      }
    if(prevEvolutionsLinkedIds && prevEvolutionsLinkedIds.length > 0) {
        await entry.models['evolution'].updateMany({ _id: {$in: prevEvolutionsLinkedIds} }, {  $push: {_prevPokemonEvo: { $each: [createdModel.id]}} })
      }
    if(_evoLinkedIds && _evoLinkedIds.length > 0) {
      await entry.models['evolution'].updateMany({ _id: {$in: _evoLinkedIds} }, {  pokemon: createdModel.id })
    }
    if(userLinkedIds && userLinkedIds.length > 0) {
        await entry.models['user'].updateMany({ _id: {$in: userLinkedIds} }, {  $push: {_pokemon: { $each: [createdModel.id]}} })
      }
        if (entry.hooks && entry.hooks.services['afterPokemonCreate']) {
            createdModel = await entry.hooks.services['afterPokemonCreate'](entry, {
                id: createdModel._id,
                data: createdModel,
                ctxUserId,
            })
        }
        return createdModel
    }
}

export const pokemonUpdate = (entry) => {
    return async (data, updatepokemonId = null, ctxUserId = null) => {
        let id = updatepokemonId

        if (data.id) {
            id = data.id
            delete data.id
        }

        if (entry.hooks && entry.hooks.services['beforePokemonUpdate']) {
            data = await entry.hooks.services['beforePokemonUpdate'](entry, { data, id, ctxUserId })
        }

        // disconnect all relations
        if( (data.typesIds && data.typesIds.length > 0) || (data.types && data.types.length > 0) ){
      // relation is type: RELATION 
      await entry.models['pokemonType'].updateMany({pokemons:{$all: [id]}}, {$pull: {pokemons: id}})
    }if( (data.evolutionsIds && data.evolutionsIds.length > 0) || (data.evolutions && data.evolutions.length > 0) ){
      // relation is type: RELATION 
      await entry.models['evolution'].updateMany({_pokemonEvo:{$all: [id]}}, {$pull: {_pokemonEvo: id}})
    }if( (data.prevEvolutionsIds && data.prevEvolutionsIds.length > 0) || (data.prevEvolutions && data.prevEvolutions.length > 0) ){
      // relation is type: RELATION 
      await entry.models['evolution'].updateMany({_prevPokemonEvo:{$all: [id]}}, {$pull: {_prevPokemonEvo: id}})
    }if( data._evoId || data._evo ){
      // relation is type: RELATION
      await entry.models['evolution'].updateMany({pokemon: id}, {pokemon: null})
  }if( data.userId || data.undefined ){
      // relation is type: RELATION 
      await entry.models['user'].updateMany({_pokemon:{$all: [id]}}, {$pull: {_pokemon: id}})
    }
        
            const typesLinkedIds = []
            
             // templates/service-transform-many-ids.ts
 // case where data.types have many ids or many objects
  if (data.types) {
    const idsOfCreated = []
    for(const createdFrom of data.types){
      createdFrom.pokemonsIds = [id]
      const created = await entry.services['pokemonType'].create(createdFrom);
      idsOfCreated.push(created.id)
      // backward relation is already setup, so no need any update aditional
		// typesLinkedIds.push(created.id)
    }
    data.types = idsOfCreated
  }

  if (data.typesIds) {
    if(data.types && data.types.length > 0) data.types.push(...data.typesIds)
    else data.types = data.typesIds
    typesLinkedIds.push(...data.typesIds)
  }
  
            
      
            const evolutionsLinkedIds = []
            
             // templates/service-transform-many-ids.ts
 // case where data.evolutions have many ids or many objects
  if (data.evolutions) {
    const idsOfCreated = []
    for(const createdFrom of data.evolutions){
      createdFrom.pokemonId = id
      const created = await entry.services['evolution'].create(createdFrom);
      idsOfCreated.push(created.id)
      // backward relation is already setup, so no need any update aditional
		// evolutionsLinkedIds.push(created.id)
    }
    data.evolutions = idsOfCreated
  }

  if (data.evolutionsIds) {
    if(data.evolutions && data.evolutions.length > 0) data.evolutions.push(...data.evolutionsIds)
    else data.evolutions = data.evolutionsIds
    evolutionsLinkedIds.push(...data.evolutionsIds)
  }
  
            
      
            const prevEvolutionsLinkedIds = []
            
             // templates/service-transform-many-ids.ts
 // case where data.prevEvolutions have many ids or many objects
  if (data.prevEvolutions) {
    const idsOfCreated = []
    for(const createdFrom of data.prevEvolutions){
      createdFrom.pokemonId = id
      const created = await entry.services['evolution'].create(createdFrom);
      idsOfCreated.push(created.id)
      // backward relation is already setup, so no need any update aditional
		// prevEvolutionsLinkedIds.push(created.id)
    }
    data.prevEvolutions = idsOfCreated
  }

  if (data.prevEvolutionsIds) {
    if(data.prevEvolutions && data.prevEvolutions.length > 0) data.prevEvolutions.push(...data.prevEvolutionsIds)
    else data.prevEvolutions = data.prevEvolutionsIds
    prevEvolutionsLinkedIds.push(...data.prevEvolutionsIds)
  }
  
            
      
            const _evoLinkedIds = []
              // templates/service-crete-one-object.t.ts
  // case where data._evo have multiple ids or multiple object
  if (data._evo) {
    if(data._evoId) throw new Error('`_evo` and `_evoId` can\'t be filled together')
    data._evo.pokemonId = id
    const created = await entry.services['evolution'].create(data._evo)
    data._evo = created.id
    // backward relation is already setup, so no need any update aditional
		// _evoLinkedIds.push(created.id)
  } 
              // templates/service-transform-one-id.ts
  // case where data._evo have multiple ids or multiple object
  if (data._evoId) {
    _evoLinkedIds.push(data._evoId);
    data._evo = data._evoId
  } 

            
      
            const userLinkedIds = []
            
              // templates/service-transform-one-id.ts
  // case where data.user have multiple ids or multiple object
  if (data.userId) {
    userLinkedIds.push(data.userId);
    data.user = data.userId
  } 

            
      
        
        let updatedModel = await pokemonModel.findByIdAndUpdate(id, data, { new: true, runValidators: true })

        // connect all relations
        
    if(typesLinkedIds && typesLinkedIds.length > 0) {
        await entry.models['pokemonType'].updateMany({ _id: {$in: typesLinkedIds} }, {  $push: {pokemons: { $each: [updatedModel.id]}} })
      }
    if(evolutionsLinkedIds && evolutionsLinkedIds.length > 0) {
        await entry.models['evolution'].updateMany({ _id: {$in: evolutionsLinkedIds} }, {  $push: {_pokemonEvo: { $each: [updatedModel.id]}} })
      }
    if(prevEvolutionsLinkedIds && prevEvolutionsLinkedIds.length > 0) {
        await entry.models['evolution'].updateMany({ _id: {$in: prevEvolutionsLinkedIds} }, {  $push: {_prevPokemonEvo: { $each: [updatedModel.id]}} })
      }
    if(_evoLinkedIds && _evoLinkedIds.length > 0) {
      await entry.models['evolution'].updateMany({ _id: {$in: _evoLinkedIds} }, {  pokemon: updatedModel.id })
    }
    if(userLinkedIds && userLinkedIds.length > 0) {
        await entry.models['user'].updateMany({ _id: {$in: userLinkedIds} }, {  $push: {_pokemon: { $each: [updatedModel.id]}} })
      }

        if (entry.hooks && entry.hooks.services['afterPokemonUpdate']) {
            updatedModel = await entry.hooks.services['afterPokemonUpdate'](entry, {
                data: updatedModel,
                id,
                ctxUserId,
            })
        }

        return updatedModel
    }
}

export const pokemonRemove = (entry, ctxUserId = null) => {
    return async (id, userId, skipRelations = []) => {
        if (entry.hooks && entry.hooks.services['beforePokemonRemove']) {
            await entry.hooks.services['beforePokemonRemove'](entry, { id, ctxUserId })
        }

        // disconnect all relations
        if( !skipRelations.includes('pokemonType') ){
      // relation is type: RELATION 
      await entry.models['pokemonType'].updateMany({pokemons:{$all: [id]}}, {$pull: {pokemons: id}})
    }if( !skipRelations.includes('evolution') ){
      // relation is type: RELATION 
      await entry.models['evolution'].updateMany({_pokemonEvo:{$all: [id]}}, {$pull: {_pokemonEvo: id}})
    }if( !skipRelations.includes('evolution') ){
      // relation is type: RELATION 
      await entry.models['evolution'].updateMany({_prevPokemonEvo:{$all: [id]}}, {$pull: {_prevPokemonEvo: id}})
    }if( !skipRelations.includes('evolution') ){
      // relation is type: RELATION
      await entry.models['evolution'].updateMany({pokemon: id}, {pokemon: null})
  }if( !skipRelations.includes('user') ){
      // relation is type: RELATION 
      await entry.models['user'].updateMany({_pokemon:{$all: [id]}}, {$pull: {_pokemon: id}})
    }
        
        let removedModel = await pokemonModel.findByIdAndRemove(id)

        if (entry.hooks && entry.hooks.services['afterPokemonRemove']) {
            removedModel = await entry.hooks.services['afterPokemonRemove'](entry, {
                data: removedModel,
                id,
                ctxUserId,
            })
        }

        return removedModel
    }
}

// template/service-add-remove.ts
export const linkTypeOnPokemon = (entry) => {
    // console.log('pokemonAddToTypeOnPokemon')
    return async (pokemonId, pokemonTypeId) => {
      if (entry.hooks && entry.hooks.services['beforelinkTypeOnPokemon']) {
        await entry.hooks.services['beforelinkTypeOnPokemon'](entry, { pokemonId, pokemonTypeId });
      }
  
      const [pokemonUpdateStats, PokemonTypeUpdateStats] = await Promise.all([
        entry.models['pokemon'].updateOne({
          _id: pokemonId,
          types: {$ne: pokemonTypeId}
        }, {
          $push: {types: { $each: [pokemonTypeId]}}
        }),
        entry.models['pokemonType'].updateOne({
          _id: pokemonTypeId,
          pokemons: { "$ne": pokemonId } 
        }, {
          $push: {pokemons: { $each: [pokemonId]}}
        })
      ])

      //const pokemonRelated = await entry.models['pokemon'].findById(pokemonId).lean()
      //const PokemonTypeRelated = await entry.models['pokemonType'].findById(pokemonTypeId).lean()
  
      if (entry.hooks && entry.hooks.services['afterlinkTypeOnPokemon']) {
        await entry.hooks.services['afterlinkTypeOnPokemon'](entry, { 
          //pokemonRelated, 
          pokemonUpdateStats,
          //PokemonTypeRelated,
          PokemonTypeUpdateStats, 
          pokemonId, 
          pokemonTypeId });
      }
  
      return {
        //_PAYLOAD_PARAM_1: pokemonRelated,
        //_PAYLOAD_PARAM_2:  PokemonTypeRelated
        pokemonId, 
        pokemonTypeId,
        pokemonModifiedCount: pokemonUpdateStats.nModified,
        pokemonTypeModifiedCount: pokemonUpdateStats.nModified
      };
    };
  };


  export const unlinkTypeOnPokemon = (entry) => {
    // console.log('pokemonRemoveFromTypeOnPokemon')
    return async (pokemonId, pokemonTypeId) => {
      if (entry.hooks && entry.hooks.services['beforeunlinkTypeOnPokemon']) {
        await entry.hooks.services['beforeunlinkTypeOnPokemon'](entry, { pokemonId, pokemonTypeId });
      }
  
      const [pokemonUpdateStats, PokemonTypeUpdateStats] = await Promise.all([
        entry.models['pokemon'].updateOne({
          _id: pokemonId,
          types: pokemonTypeId
        }, {
          $pull: {types: pokemonTypeId}
        }),
        entry.models['pokemonType'].updateOne({
          _id: pokemonTypeId,
          pokemons: pokemonId 
        }, {
          $pull: {pokemons: pokemonId}
        })
      ])

      // const pokemonRelated = await entry.models['pokemon'].findById(pokemonId)
      // const PokemonTypeRelated = await entry.models['pokemonType'].findById(pokemonTypeId)
  
      if (entry.hooks && entry.hooks.services['afterunlinkTypeOnPokemon']) {
        await entry.hooks.services['afterunlinkTypeOnPokemon'](entry, { 
          //pokemonRelated,
          pokemonUpdateStats, 
          //PokemonTypeRelated, 
          PokemonTypeUpdateStats,
          pokemonId, 
          pokemonTypeId });
      }
  
      return {
        pokemonId, 
        pokemonTypeId,
        pokemonModifiedCount: pokemonUpdateStats.nModified,
        pokemonTypeModifiedCount: pokemonUpdateStats.nModified
        // _PAYLOAD_PARAM_1: pokemonRelated,
        // _PAYLOAD_PARAM_2:  PokemonTypeRelated
      };
    };
  };// template/service-add-remove.ts
export const linkEvolutionOnPokemon = (entry) => {
    // console.log('pokemonAddToEvolutionOnPokemon')
    return async (pokemonId, evolutionId) => {
      if (entry.hooks && entry.hooks.services['beforelinkEvolutionOnPokemon']) {
        await entry.hooks.services['beforelinkEvolutionOnPokemon'](entry, { pokemonId, evolutionId });
      }
  
      const [pokemonUpdateStats, EvolutionUpdateStats] = await Promise.all([
        entry.models['pokemon'].updateOne({
          _id: pokemonId,
          evolutions: {$ne: evolutionId}
        }, {
          $push: {evolutions: { $each: [evolutionId]}}
        }),
        entry.models['evolution'].updateOne({
          _id: evolutionId,
          _pokemonEvo: { "$ne": pokemonId } 
        }, {
          $push: {_pokemonEvo: { $each: [pokemonId]}}
        })
      ])

      //const pokemonRelated = await entry.models['pokemon'].findById(pokemonId).lean()
      //const EvolutionRelated = await entry.models['evolution'].findById(evolutionId).lean()
  
      if (entry.hooks && entry.hooks.services['afterlinkEvolutionOnPokemon']) {
        await entry.hooks.services['afterlinkEvolutionOnPokemon'](entry, { 
          //pokemonRelated, 
          pokemonUpdateStats,
          //EvolutionRelated,
          EvolutionUpdateStats, 
          pokemonId, 
          evolutionId });
      }
  
      return {
        //_PAYLOAD_PARAM_1: pokemonRelated,
        //_PAYLOAD_PARAM_2:  EvolutionRelated
        pokemonId, 
        evolutionId,
        pokemonModifiedCount: pokemonUpdateStats.nModified,
        evolutionModifiedCount: pokemonUpdateStats.nModified
      };
    };
  };


  export const unlinkEvolutionOnPokemon = (entry) => {
    // console.log('pokemonRemoveFromEvolutionOnPokemon')
    return async (pokemonId, evolutionId) => {
      if (entry.hooks && entry.hooks.services['beforeunlinkEvolutionOnPokemon']) {
        await entry.hooks.services['beforeunlinkEvolutionOnPokemon'](entry, { pokemonId, evolutionId });
      }
  
      const [pokemonUpdateStats, EvolutionUpdateStats] = await Promise.all([
        entry.models['pokemon'].updateOne({
          _id: pokemonId,
          evolutions: evolutionId
        }, {
          $pull: {evolutions: evolutionId}
        }),
        entry.models['evolution'].updateOne({
          _id: evolutionId,
          _pokemonEvo: pokemonId 
        }, {
          $pull: {_pokemonEvo: pokemonId}
        })
      ])

      // const pokemonRelated = await entry.models['pokemon'].findById(pokemonId)
      // const EvolutionRelated = await entry.models['evolution'].findById(evolutionId)
  
      if (entry.hooks && entry.hooks.services['afterunlinkEvolutionOnPokemon']) {
        await entry.hooks.services['afterunlinkEvolutionOnPokemon'](entry, { 
          //pokemonRelated,
          pokemonUpdateStats, 
          //EvolutionRelated, 
          EvolutionUpdateStats,
          pokemonId, 
          evolutionId });
      }
  
      return {
        pokemonId, 
        evolutionId,
        pokemonModifiedCount: pokemonUpdateStats.nModified,
        evolutionModifiedCount: pokemonUpdateStats.nModified
        // _PAYLOAD_PARAM_1: pokemonRelated,
        // _PAYLOAD_PARAM_2:  EvolutionRelated
      };
    };
  };// template/service-add-remove.ts
export const linkPrevEvolutionOnPokemon = (entry) => {
    // console.log('pokemonAddToprevEvolutionOnPokemon')
    return async (pokemonId, evolutionId) => {
      if (entry.hooks && entry.hooks.services['beforelinkPrevEvolutionOnPokemon']) {
        await entry.hooks.services['beforelinkPrevEvolutionOnPokemon'](entry, { pokemonId, evolutionId });
      }
  
      const [pokemonUpdateStats, EvolutionUpdateStats] = await Promise.all([
        entry.models['pokemon'].updateOne({
          _id: pokemonId,
          prevEvolutions: {$ne: evolutionId}
        }, {
          $push: {prevEvolutions: { $each: [evolutionId]}}
        }),
        entry.models['evolution'].updateOne({
          _id: evolutionId,
          _prevPokemonEvo: { "$ne": pokemonId } 
        }, {
          $push: {_prevPokemonEvo: { $each: [pokemonId]}}
        })
      ])

      //const pokemonRelated = await entry.models['pokemon'].findById(pokemonId).lean()
      //const EvolutionRelated = await entry.models['evolution'].findById(evolutionId).lean()
  
      if (entry.hooks && entry.hooks.services['afterlinkPrevEvolutionOnPokemon']) {
        await entry.hooks.services['afterlinkPrevEvolutionOnPokemon'](entry, { 
          //pokemonRelated, 
          pokemonUpdateStats,
          //EvolutionRelated,
          EvolutionUpdateStats, 
          pokemonId, 
          evolutionId });
      }
  
      return {
        //_PAYLOAD_PARAM_1: pokemonRelated,
        //_PAYLOAD_PARAM_2:  EvolutionRelated
        pokemonId, 
        evolutionId,
        pokemonModifiedCount: pokemonUpdateStats.nModified,
        evolutionModifiedCount: pokemonUpdateStats.nModified
      };
    };
  };


  export const unlinkPrevEvolutionOnPokemon = (entry) => {
    // console.log('pokemonRemoveFromprevEvolutionOnPokemon')
    return async (pokemonId, evolutionId) => {
      if (entry.hooks && entry.hooks.services['beforeunlinkPrevEvolutionOnPokemon']) {
        await entry.hooks.services['beforeunlinkPrevEvolutionOnPokemon'](entry, { pokemonId, evolutionId });
      }
  
      const [pokemonUpdateStats, EvolutionUpdateStats] = await Promise.all([
        entry.models['pokemon'].updateOne({
          _id: pokemonId,
          prevEvolutions: evolutionId
        }, {
          $pull: {prevEvolutions: evolutionId}
        }),
        entry.models['evolution'].updateOne({
          _id: evolutionId,
          _prevPokemonEvo: pokemonId 
        }, {
          $pull: {_prevPokemonEvo: pokemonId}
        })
      ])

      // const pokemonRelated = await entry.models['pokemon'].findById(pokemonId)
      // const EvolutionRelated = await entry.models['evolution'].findById(evolutionId)
  
      if (entry.hooks && entry.hooks.services['afterunlinkPrevEvolutionOnPokemon']) {
        await entry.hooks.services['afterunlinkPrevEvolutionOnPokemon'](entry, { 
          //pokemonRelated,
          pokemonUpdateStats, 
          //EvolutionRelated, 
          EvolutionUpdateStats,
          pokemonId, 
          evolutionId });
      }
  
      return {
        pokemonId, 
        evolutionId,
        pokemonModifiedCount: pokemonUpdateStats.nModified,
        evolutionModifiedCount: pokemonUpdateStats.nModified
        // _PAYLOAD_PARAM_1: pokemonRelated,
        // _PAYLOAD_PARAM_2:  EvolutionRelated
      };
    };
  };// template/service-add-remove.ts
export const linkEvoOnPokemon = (entry) => {
    // console.log('pokemonAddToEvoOnPokemon')
    return async (pokemonId, evolutionId) => {
      if (entry.hooks && entry.hooks.services['beforelinkEvoOnPokemon']) {
        await entry.hooks.services['beforelinkEvoOnPokemon'](entry, { pokemonId, evolutionId });
      }
  
      const [pokemonUpdateStats, EvolutionUpdateStats] = await Promise.all([
        entry.models['pokemon'].updateOne({
          _id: pokemonId,
          _evo: {$ne: evolutionId}
        }, {
          $push: {_evo: { $each: [evolutionId]}}
        }),
        entry.models['evolution'].updateOne({
          _id: evolutionId,
          pokemon: { "$ne": pokemonId } 
        }, {
          $push: {pokemon: { $each: [pokemonId]}}
        })
      ])

      //const pokemonRelated = await entry.models['pokemon'].findById(pokemonId).lean()
      //const EvolutionRelated = await entry.models['evolution'].findById(evolutionId).lean()
  
      if (entry.hooks && entry.hooks.services['afterlinkEvoOnPokemon']) {
        await entry.hooks.services['afterlinkEvoOnPokemon'](entry, { 
          //pokemonRelated, 
          pokemonUpdateStats,
          //EvolutionRelated,
          EvolutionUpdateStats, 
          pokemonId, 
          evolutionId });
      }
  
      return {
        //_PAYLOAD_PARAM_1: pokemonRelated,
        //_PAYLOAD_PARAM_2:  EvolutionRelated
        pokemonId, 
        evolutionId,
        pokemonModifiedCount: pokemonUpdateStats.nModified,
        evolutionModifiedCount: pokemonUpdateStats.nModified
      };
    };
  };


  export const unlinkEvoOnPokemon = (entry) => {
    // console.log('pokemonRemoveFromEvoOnPokemon')
    return async (pokemonId, evolutionId) => {
      if (entry.hooks && entry.hooks.services['beforeunlinkEvoOnPokemon']) {
        await entry.hooks.services['beforeunlinkEvoOnPokemon'](entry, { pokemonId, evolutionId });
      }
  
      const [pokemonUpdateStats, EvolutionUpdateStats] = await Promise.all([
        entry.models['pokemon'].updateOne({
          _id: pokemonId,
          _evo: evolutionId
        }, {
          $pull: {_evo: evolutionId}
        }),
        entry.models['evolution'].updateOne({
          _id: evolutionId,
          pokemon: pokemonId 
        }, {
          $pull: {pokemon: pokemonId}
        })
      ])

      // const pokemonRelated = await entry.models['pokemon'].findById(pokemonId)
      // const EvolutionRelated = await entry.models['evolution'].findById(evolutionId)
  
      if (entry.hooks && entry.hooks.services['afterunlinkEvoOnPokemon']) {
        await entry.hooks.services['afterunlinkEvoOnPokemon'](entry, { 
          //pokemonRelated,
          pokemonUpdateStats, 
          //EvolutionRelated, 
          EvolutionUpdateStats,
          pokemonId, 
          evolutionId });
      }
  
      return {
        pokemonId, 
        evolutionId,
        pokemonModifiedCount: pokemonUpdateStats.nModified,
        evolutionModifiedCount: pokemonUpdateStats.nModified
        // _PAYLOAD_PARAM_1: pokemonRelated,
        // _PAYLOAD_PARAM_2:  EvolutionRelated
      };
    };
  };

export const generatePokemonService = (entry) => {
    return {
        all: pokemonAll(entry),
        count: pokemonCount(entry),
        one: pokemonOne(entry),
        create: pokemonCreate(entry),
        update: pokemonUpdate(entry),
        remove: pokemonRemove(entry),
        linkTypeOnPokemon : linkTypeOnPokemon(entry),
unlinkTypeOnPokemon : unlinkTypeOnPokemon(entry),linkEvolutionOnPokemon : linkEvolutionOnPokemon(entry),
unlinkEvolutionOnPokemon : unlinkEvolutionOnPokemon(entry),linkPrevEvolutionOnPokemon : linkPrevEvolutionOnPokemon(entry),
unlinkPrevEvolutionOnPokemon : unlinkPrevEvolutionOnPokemon(entry),linkEvoOnPokemon : linkEvoOnPokemon(entry),
unlinkEvoOnPokemon : unlinkEvoOnPokemon(entry),
    }
}
