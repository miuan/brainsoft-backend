/* eslint-disable prettier/prettier */
import { userModel, Types } from '../models/User'
import * as extras from '../extras'

export const userAll = (entry) => {
    return async (data) => {
        if (entry.hooks && entry.hooks.services['beforeUserAll']) {
            await entry.hooks.services['beforeUserAll'](entry, data)
        }

        const filter = extras.filterGen(data.filter)
        let findPromise = userModel.find(filter)
        if (data.skip) findPromise = findPromise.skip(data.skip)
        if (data.limit) findPromise = findPromise.limit(data.limit)
        if (data.orderBy) {
            const {
                groups: { field, type },
            } = data.orderBy.match(/(?<field>\w+)_(?<type>(asc|desc))/)
            findPromise = findPromise.sort([[field, type]])
        }

        let models = await findPromise.lean()

        if (entry.hooks && entry.hooks.services['afterUserAll']) {
            models = await entry.hooks.services['afterUserAll'](entry, { models, ...data })
        }
        return models
    }
}

export const userCount = (entry) => {
    return async (data) => {
        if (entry.hooks && entry.hooks.services['beforeUserCount']) {
            await entry.hooks.services['beforeUserCount'](entry, data)
        }

        const filter = extras.filterGen(data.filter)
        let countPromise = userModel.count(filter)

        let count = await countPromise.lean()

        if (entry.hooks && entry.hooks.services['afterUserCount']) {
            count = await entry.hooks.services['afterUserCount'](entry, { count, ...data })
        }
        return count
    }
}

export const userOne = (entry) => {
    return async (id, userId = null) => {
        if (entry.hooks && entry.hooks.services['beforeUserOne']) {
            await entry.hooks.services['beforeUserOne'](entry, { id })
        }
        let model = await userModel.findById(id).lean()
        model.id = id

        if (entry.hooks && entry.hooks.services['afterUserOne']) {
            model = await entry.hooks.services['afterUserOne'](entry, { id, model })
        }

        return model
    }
}

export const userCreate = (entry) => {
    return async (data, ctxUserId = null) => {
        // before real object exist
        // we generate TEMPORARY-ID for related objects what they have a required relation...
        const id = Types.ObjectId()

        
            const rolesLinkedIds = []
            
             // templates/service-transform-many-ids.ts
 // case where data.roles have many ids or many objects
  if (data.roles) {
    const idsOfCreated = []
    for(const createdFrom of data.roles){
      // the related member is NOT required so we will update later with REAL-ID
		// createdFrom.usersIds = [id]
      const created = await entry.services['userRole'].create(createdFrom);
      idsOfCreated.push(created.id)
      // backward relation is not setup yet, so need update later with REAL-ID
		 rolesLinkedIds.push(created.id)
    }
    data.roles = idsOfCreated
  }

  if (data.rolesIds) {
    if(data.roles && data.roles.length > 0) data.roles.push(...data.rolesIds)
    else data.roles = data.rolesIds
    rolesLinkedIds.push(...data.rolesIds)
  }
  
            
      
            const filesLinkedIds = []
            
             // templates/service-transform-many-ids.ts
 // case where data.files have many ids or many objects
  if (data.undefined) {
    const idsOfCreated = []
    for(const createdFrom of data.undefined){
      // the related member is NOT required so we will update later with REAL-ID
		// createdFrom.userId = id
      const created = await entry.services['file'].create(createdFrom);
      idsOfCreated.push(created.id)
      // backward relation is not setup yet, so need update later with REAL-ID
		 filesLinkedIds.push(created.id)
    }
    data.files = idsOfCreated
  }

  if (data.undefined) {
    if(data.files && data.files.length > 0) data.files.push(...data.undefined)
    else data.files = data.undefined
    filesLinkedIds.push(...data.undefined)
  }
  
            
      
            const _pokemonLinkedIds = []
            
             // templates/service-transform-many-ids.ts
 // case where data._pokemon have many ids or many objects
  if (data.undefined) {
    const idsOfCreated = []
    for(const createdFrom of data.undefined){
      // the related member is NOT required so we will update later with REAL-ID
		// createdFrom.typesIds = [id]
      const created = await entry.services['pokemon'].create(createdFrom);
      idsOfCreated.push(created.id)
      // backward relation is not setup yet, so need update later with REAL-ID
		 _pokemonLinkedIds.push(created.id)
    }
    data._pokemon = idsOfCreated
  }

  if (data.undefined) {
    if(data._pokemon && data._pokemon.length > 0) data._pokemon.push(...data.undefined)
    else data._pokemon = data.undefined
    _pokemonLinkedIds.push(...data.undefined)
  }
  
            
      
            const _evolutionLinkedIds = []
            
             // templates/service-transform-many-ids.ts
 // case where data._evolution have many ids or many objects
  if (data.undefined) {
    const idsOfCreated = []
    for(const createdFrom of data.undefined){
      // the related member is NOT required so we will update later with REAL-ID
		// createdFrom.pokemonId = id
      const created = await entry.services['evolution'].create(createdFrom);
      idsOfCreated.push(created.id)
      // backward relation is not setup yet, so need update later with REAL-ID
		 _evolutionLinkedIds.push(created.id)
    }
    data._evolution = idsOfCreated
  }

  if (data.undefined) {
    if(data._evolution && data._evolution.length > 0) data._evolution.push(...data.undefined)
    else data._evolution = data.undefined
    _evolutionLinkedIds.push(...data.undefined)
  }
  
            
      
            const _pokemonTypeLinkedIds = []
            
             // templates/service-transform-many-ids.ts
 // case where data._pokemonType have many ids or many objects
  if (data.undefined) {
    const idsOfCreated = []
    for(const createdFrom of data.undefined){
      // the related member is NOT required so we will update later with REAL-ID
		// createdFrom.pokemonsIds = [id]
      const created = await entry.services['pokemonType'].create(createdFrom);
      idsOfCreated.push(created.id)
      // backward relation is not setup yet, so need update later with REAL-ID
		 _pokemonTypeLinkedIds.push(created.id)
    }
    data._pokemonType = idsOfCreated
  }

  if (data.undefined) {
    if(data._pokemonType && data._pokemonType.length > 0) data._pokemonType.push(...data.undefined)
    else data._pokemonType = data.undefined
    _pokemonTypeLinkedIds.push(...data.undefined)
  }
  
            
      
        if (entry.hooks && entry.hooks.services['beforeUserCreate']) {
            data = await entry.hooks.services['beforeUserCreate'](entry, { data, ctxUserId })
        }
        
    if(data.password) {
      data.__password = await extras.generateHash(data.password);
      data.password = '******';
    }

        let createdModel = await userModel.create(data)

        
        
    if(rolesLinkedIds && rolesLinkedIds.length > 0) {
        await entry.models['userRole'].updateMany({ _id: {$in: rolesLinkedIds} }, {  $push: {users: { $each: [createdModel.id]}} })
      }
    if(filesLinkedIds && filesLinkedIds.length > 0) {
      await entry.models['file'].updateMany({ _id: {$in: filesLinkedIds} }, {  user: createdModel.id })
    }
    if(_pokemonLinkedIds && _pokemonLinkedIds.length > 0) {
      await entry.models['pokemon'].updateMany({ _id: {$in: _pokemonLinkedIds} }, {  user: createdModel.id })
    }
    if(_evolutionLinkedIds && _evolutionLinkedIds.length > 0) {
      await entry.models['evolution'].updateMany({ _id: {$in: _evolutionLinkedIds} }, {  user: createdModel.id })
    }
    if(_pokemonTypeLinkedIds && _pokemonTypeLinkedIds.length > 0) {
      await entry.models['pokemonType'].updateMany({ _id: {$in: _pokemonTypeLinkedIds} }, {  user: createdModel.id })
    }
        if (entry.hooks && entry.hooks.services['afterUserCreate']) {
            createdModel = await entry.hooks.services['afterUserCreate'](entry, {
                id: createdModel._id,
                data: createdModel,
                ctxUserId,
            })
        }
        return createdModel
    }
}

export const userUpdate = (entry) => {
    return async (data, updateuserId = null, ctxUserId = null) => {
        let id = updateuserId

        if (data.id) {
            id = data.id
            delete data.id
        }

        if (entry.hooks && entry.hooks.services['beforeUserUpdate']) {
            data = await entry.hooks.services['beforeUserUpdate'](entry, { data, id, ctxUserId })
        }

        // disconnect all relations
        if( (data.rolesIds && data.rolesIds.length > 0) || (data.roles && data.roles.length > 0) ){
      // relation is type: RELATION 
      await entry.models['userRole'].updateMany({users:{$all: [id]}}, {$pull: {users: id}})
    }if( (data.undefined && data.undefined.length > 0) || (data.undefined && data.undefined.length > 0) ){
      // relation is type: RELATION
      await entry.models['file'].updateMany({user: id}, {user: null})
  }if( (data.undefined && data.undefined.length > 0) || (data.undefined && data.undefined.length > 0) ){
      // relation is type: RELATION
      await entry.models['pokemon'].updateMany({user: id}, {user: null})
  }if( (data.undefined && data.undefined.length > 0) || (data.undefined && data.undefined.length > 0) ){
      // relation is type: RELATION
      await entry.models['evolution'].updateMany({user: id}, {user: null})
  }if( (data.undefined && data.undefined.length > 0) || (data.undefined && data.undefined.length > 0) ){
      // relation is type: RELATION
      await entry.models['pokemonType'].updateMany({user: id}, {user: null})
  }
        
            const rolesLinkedIds = []
            
             // templates/service-transform-many-ids.ts
 // case where data.roles have many ids or many objects
  if (data.roles) {
    const idsOfCreated = []
    for(const createdFrom of data.roles){
      createdFrom.usersIds = [id]
      const created = await entry.services['userRole'].create(createdFrom);
      idsOfCreated.push(created.id)
      // backward relation is already setup, so no need any update aditional
		// rolesLinkedIds.push(created.id)
    }
    data.roles = idsOfCreated
  }

  if (data.rolesIds) {
    if(data.roles && data.roles.length > 0) data.roles.push(...data.rolesIds)
    else data.roles = data.rolesIds
    rolesLinkedIds.push(...data.rolesIds)
  }
  
            
      
            const filesLinkedIds = []
            
             // templates/service-transform-many-ids.ts
 // case where data.files have many ids or many objects
  if (data.undefined) {
    const idsOfCreated = []
    for(const createdFrom of data.undefined){
      createdFrom.userId = id
      const created = await entry.services['file'].create(createdFrom);
      idsOfCreated.push(created.id)
      // backward relation is already setup, so no need any update aditional
		// filesLinkedIds.push(created.id)
    }
    data.files = idsOfCreated
  }

  if (data.undefined) {
    if(data.files && data.files.length > 0) data.files.push(...data.undefined)
    else data.files = data.undefined
    filesLinkedIds.push(...data.undefined)
  }
  
            
      
            const _pokemonLinkedIds = []
            
             // templates/service-transform-many-ids.ts
 // case where data._pokemon have many ids or many objects
  if (data.undefined) {
    const idsOfCreated = []
    for(const createdFrom of data.undefined){
      createdFrom.typesIds = [id]
      const created = await entry.services['pokemon'].create(createdFrom);
      idsOfCreated.push(created.id)
      // backward relation is already setup, so no need any update aditional
		// _pokemonLinkedIds.push(created.id)
    }
    data._pokemon = idsOfCreated
  }

  if (data.undefined) {
    if(data._pokemon && data._pokemon.length > 0) data._pokemon.push(...data.undefined)
    else data._pokemon = data.undefined
    _pokemonLinkedIds.push(...data.undefined)
  }
  
            
      
            const _evolutionLinkedIds = []
            
             // templates/service-transform-many-ids.ts
 // case where data._evolution have many ids or many objects
  if (data.undefined) {
    const idsOfCreated = []
    for(const createdFrom of data.undefined){
      createdFrom.pokemonId = id
      const created = await entry.services['evolution'].create(createdFrom);
      idsOfCreated.push(created.id)
      // backward relation is already setup, so no need any update aditional
		// _evolutionLinkedIds.push(created.id)
    }
    data._evolution = idsOfCreated
  }

  if (data.undefined) {
    if(data._evolution && data._evolution.length > 0) data._evolution.push(...data.undefined)
    else data._evolution = data.undefined
    _evolutionLinkedIds.push(...data.undefined)
  }
  
            
      
            const _pokemonTypeLinkedIds = []
            
             // templates/service-transform-many-ids.ts
 // case where data._pokemonType have many ids or many objects
  if (data.undefined) {
    const idsOfCreated = []
    for(const createdFrom of data.undefined){
      createdFrom.pokemonsIds = [id]
      const created = await entry.services['pokemonType'].create(createdFrom);
      idsOfCreated.push(created.id)
      // backward relation is already setup, so no need any update aditional
		// _pokemonTypeLinkedIds.push(created.id)
    }
    data._pokemonType = idsOfCreated
  }

  if (data.undefined) {
    if(data._pokemonType && data._pokemonType.length > 0) data._pokemonType.push(...data.undefined)
    else data._pokemonType = data.undefined
    _pokemonTypeLinkedIds.push(...data.undefined)
  }
  
            
      
        extras.checkPasswordIsNotIncluded(data);
        let updatedModel = await userModel.findByIdAndUpdate(id, data, { new: true, runValidators: true })

        // connect all relations
        
    if(rolesLinkedIds && rolesLinkedIds.length > 0) {
        await entry.models['userRole'].updateMany({ _id: {$in: rolesLinkedIds} }, {  $push: {users: { $each: [updatedModel.id]}} })
      }
    if(filesLinkedIds && filesLinkedIds.length > 0) {
      await entry.models['file'].updateMany({ _id: {$in: filesLinkedIds} }, {  user: updatedModel.id })
    }
    if(_pokemonLinkedIds && _pokemonLinkedIds.length > 0) {
      await entry.models['pokemon'].updateMany({ _id: {$in: _pokemonLinkedIds} }, {  user: updatedModel.id })
    }
    if(_evolutionLinkedIds && _evolutionLinkedIds.length > 0) {
      await entry.models['evolution'].updateMany({ _id: {$in: _evolutionLinkedIds} }, {  user: updatedModel.id })
    }
    if(_pokemonTypeLinkedIds && _pokemonTypeLinkedIds.length > 0) {
      await entry.models['pokemonType'].updateMany({ _id: {$in: _pokemonTypeLinkedIds} }, {  user: updatedModel.id })
    }

        if (entry.hooks && entry.hooks.services['afterUserUpdate']) {
            updatedModel = await entry.hooks.services['afterUserUpdate'](entry, {
                data: updatedModel,
                id,
                ctxUserId,
            })
        }

        return updatedModel
    }
}

export const userRemove = (entry, ctxUserId = null) => {
    return async (id, userId, skipRelations = []) => {
        if (entry.hooks && entry.hooks.services['beforeUserRemove']) {
            await entry.hooks.services['beforeUserRemove'](entry, { id, ctxUserId })
        }

        // disconnect all relations
        if( !skipRelations.includes('userRole') ){
      // relation is type: RELATION 
      await entry.models['userRole'].updateMany({users:{$all: [id]}}, {$pull: {users: id}})
    }if( !skipRelations.includes('file') ){
      // relation is type: RELATION
      await entry.models['file'].updateMany({user: id}, {user: null})
  }if( !skipRelations.includes('pokemon') ){
      // relation is type: RELATION
      await entry.models['pokemon'].updateMany({user: id}, {user: null})
  }if( !skipRelations.includes('evolution') ){
      // relation is type: RELATION
      await entry.models['evolution'].updateMany({user: id}, {user: null})
  }if( !skipRelations.includes('pokemonType') ){
      // relation is type: RELATION
      await entry.models['pokemonType'].updateMany({user: id}, {user: null})
  }
        
        let removedModel = await userModel.findByIdAndRemove(id)

        if (entry.hooks && entry.hooks.services['afterUserRemove']) {
            removedModel = await entry.hooks.services['afterUserRemove'](entry, {
                data: removedModel,
                id,
                ctxUserId,
            })
        }

        return removedModel
    }
}

// template/service-add-remove.ts
export const addRoleToUser = (entry) => {
    // console.log('userAddTo_RoleToUser')
    return async (userId, userRoleId) => {
      if (entry.hooks && entry.hooks.services['beforeaddRoleToUser']) {
        await entry.hooks.services['beforeaddRoleToUser'](entry, { userId, userRoleId });
      }
  
      const [userUpdateStats, UserRoleUpdateStats] = await Promise.all([
        entry.models['user'].updateOne({
          _id: userId,
          roles: {$ne: userRoleId}
        }, {
          $push: {roles: { $each: [userRoleId]}}
        }),
        entry.models['userRole'].updateOne({
          _id: userRoleId,
          users: { "$ne": userId } 
        }, {
          $push: {users: { $each: [userId]}}
        })
      ])

      //const userRelated = await entry.models['user'].findById(userId).lean()
      //const UserRoleRelated = await entry.models['userRole'].findById(userRoleId).lean()
  
      if (entry.hooks && entry.hooks.services['afteraddRoleToUser']) {
        await entry.hooks.services['afteraddRoleToUser'](entry, { 
          //userRelated, 
          userUpdateStats,
          //UserRoleRelated,
          UserRoleUpdateStats, 
          userId, 
          userRoleId });
      }
  
      return {
        //_PAYLOAD_PARAM_1: userRelated,
        //_PAYLOAD_PARAM_2:  UserRoleRelated
        userId, 
        userRoleId,
        userModifiedCount: userUpdateStats.nModified,
        userRoleModifiedCount: userUpdateStats.nModified
      };
    };
  };


  export const removeRoleFromUser = (entry) => {
    // console.log('userRemoveFrom_RoleToUser')
    return async (userId, userRoleId) => {
      if (entry.hooks && entry.hooks.services['beforeremoveRoleFromUser']) {
        await entry.hooks.services['beforeremoveRoleFromUser'](entry, { userId, userRoleId });
      }
  
      const [userUpdateStats, UserRoleUpdateStats] = await Promise.all([
        entry.models['user'].updateOne({
          _id: userId,
          roles: userRoleId
        }, {
          $pull: {roles: userRoleId}
        }),
        entry.models['userRole'].updateOne({
          _id: userRoleId,
          users: userId 
        }, {
          $pull: {users: userId}
        })
      ])

      // const userRelated = await entry.models['user'].findById(userId)
      // const UserRoleRelated = await entry.models['userRole'].findById(userRoleId)
  
      if (entry.hooks && entry.hooks.services['afterremoveRoleFromUser']) {
        await entry.hooks.services['afterremoveRoleFromUser'](entry, { 
          //userRelated,
          userUpdateStats, 
          //UserRoleRelated, 
          UserRoleUpdateStats,
          userId, 
          userRoleId });
      }
  
      return {
        userId, 
        userRoleId,
        userModifiedCount: userUpdateStats.nModified,
        userRoleModifiedCount: userUpdateStats.nModified
        // _PAYLOAD_PARAM_1: userRelated,
        // _PAYLOAD_PARAM_2:  UserRoleRelated
      };
    };
  };

export const generateUserService = (entry) => {
    return {
        all: userAll(entry),
        count: userCount(entry),
        one: userOne(entry),
        create: userCreate(entry),
        update: userUpdate(entry),
        remove: userRemove(entry),
        addRoleToUser : addRoleToUser(entry),
removeRoleFromUser : removeRoleFromUser(entry),
    }
}
