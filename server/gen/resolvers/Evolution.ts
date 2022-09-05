import * as extras from '../extras'
import { UnauthorizedError, RequestError } from '../api-utils'

export const evolutionAll = (entry, protections) => {
    return async (root, data, ctx) => {
        if( !(await protections.public())&&!(await protections.public()) ){
        throw new UnauthorizedError()
      }

        if (entry.hooks && entry.hooks.resolvers && entry.hooks.resolvers['beforeEvolutionAll']) {
            await entry.hooks.resolvers['beforeEvolutionAll'](entry, { root, data, ctx })
        }

        let models = await entry.services['evolution'].all(data, ctx.userId)
        models = models.map((m) => {
            m.id = m._id
            return m
        })

        if (entry.hooks && entry.hooks.resolvers && entry.hooks.resolvers['afterEvolutionAll']) {
            models = await entry.hooks.resolvers['afterEvolutionAll'](entry, { models, root, data, ctx })
        }
        return models
    }
}

export const evolutionCount = (entry, protections) => {
    return async (root, data, ctx) => {
        if( !(await protections.public())&&!(await protections.public()) ){
        throw new UnauthorizedError()
      }

        if (entry.hooks && entry.hooks.resolvers && entry.hooks.resolvers['beforeEvolutionCount']) {
            await entry.hooks.resolvers['beforeEvolutionCount'](entry, { root, data, ctx })
        }

        let models = await entry.services['evolution'].count(data, ctx.userId)

        if (entry.hooks && entry.hooks.resolvers && entry.hooks.resolvers['afterEvolutionCount']) {
            models = await entry.hooks.resolvers['afterEvolutionCount'](entry, { models, root, data, ctx })
        }
        return models
    }
}

export const evolutionOne = (entry, protections) => {
    return async (root, data, ctx) => {
        if( !(await protections.public())&&!(await protections.public()) ){
        throw new UnauthorizedError()
      }
        if (entry.hooks && entry.hooks.resolvers && entry.hooks.resolvers['beforeEvolutionOne']) {
            await entry.hooks.resolvers['beforeEvolutionOne'](entry, { root, data, ctx })
        }
        let model = await entry.services['evolution'].one(data.id)

        if (entry.hooks && entry.hooks.resolvers && entry.hooks.resolvers['afterEvolutionOne']) {
            model = await entry.hooks.resolvers['afterEvolutionOne'](entry, { id: data.id, model, entry, root, data, ctx })
        }

        return model
    }
}

export const evolutionCreate = (entry, protections) => {
    return async (root, data, ctx) => {
        if( !(await protections.public())&&!(await protections.public()) ){
        throw new UnauthorizedError()
      }
        const presentProtectedFields = protections.checkDataContainProtectedFields(data)
        if (presentProtectedFields && presentProtectedFields.length) {
            ctx.throw(403, {
                type: 'ReachProtectedFields',
                message: 'Trying to update protected fields, which they are just read only',
                presentProtectedFields,
            })
        }

        if (entry.hooks && entry.hooks.resolvers && entry.hooks.resolvers['beforeEvolutionCreate']) {
            data = await entry.hooks.resolvers['beforeEvolutionCreate'](entry, { root, data, ctx })
        }

        const userId = ctx.state?.user?.id
        if(!data.userId && userId){
        data.userId = userId
      }
        let createdModel = await entry.services['evolution'].create(data, userId)

        if (entry.hooks && entry.hooks.resolvers && entry.hooks.resolvers['afterEvolutionCreate']) {
            createdModel = await entry.hooks.resolvers['afterEvolutionCreate'](entry, { root, data, ctx, createdModel })
        }

        return createdModel
    }
}

export const evolutionUpdate = (entry, protections) => {
    return async (root, data, ctx) => {
        if( !(await protections.public())&&!(await protections.public()) ){
        throw new UnauthorizedError()
      }

        // any fields start with double underscore are protected, example __port, __readolny, ...
        const presentProtectedFields = protections.checkDataContainProtectedFields(data)
        if (presentProtectedFields && presentProtectedFields.length) {
            ctx.throw(403, {
                type: 'ReachProtectedFields',
                message: 'Trying to update protected fields, which they are just read only',
                presentProtectedFields,
            })
        }

        if (entry.hooks && entry.hooks.resolvers && entry.hooks.resolvers['beforeEvolutionUpdate']) {
            data = await entry.hooks.resolvers['beforeEvolutionUpdate'](entry, { root, data, ctx })
        }

        let updatedModel = await entry.services['evolution'].update(data, null, ctx.userId)

        if (entry.hooks && entry.hooks.resolvers && entry.hooks.resolvers['afterEvolutionUpdate']) {
            updatedModel = await entry.hooks.resolvers['afterEvolutionUpdate'](entry, { root, data, ctx, updatedModel, id: data.id })
        }

        return updatedModel
    }
}

export const evolutionRemove = (entry, protections) => {
    return async (root, data, ctx) => {
        if( !(await protections.public())&&!(await protections.public()) ){
        throw new UnauthorizedError()
      }
        if (entry.hooks && entry.hooks.resolvers && entry.hooks.resolvers['beforeEvolutionRemove']) {
            await entry.hooks.resolvers['beforeEvolutionRemove'](entry, { root, data, ctx })
        }

        let removedModel = await entry.services['evolution'].remove(data.id, ctx.userId)

        if (entry.hooks && entry.hooks.resolvers && entry.hooks.resolvers['afterEvolutionRemove']) {
            removedModel = await entry.hooks.resolvers['afterEvolutionRemove'](entry, { removedModel, root, data, ctx })
        }

        return removedModel
    }
}



export const generateEvolutionResolver = (entry) => {
    const protections = extras.generateProtections(entry, 'evolution')
    return {
        all: evolutionAll(entry, protections),
        count: evolutionCount(entry, protections),
        one: evolutionOne(entry, protections),
        create: evolutionCreate(entry, protections),
        update: evolutionUpdate(entry, protections),
        remove: evolutionRemove(entry, protections),
        
    }
}
