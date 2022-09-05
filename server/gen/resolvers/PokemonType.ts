import * as extras from '../extras'
import { UnauthorizedError, RequestError } from '../api-utils'

export const pokemonTypeAll = (entry, protections) => {
    return async (root, data, ctx) => {
        if( !(await protections.public())&&!(await protections.public()) ){
        throw new UnauthorizedError()
      }

        if (entry.hooks && entry.hooks.resolvers && entry.hooks.resolvers['beforePokemonTypeAll']) {
            await entry.hooks.resolvers['beforePokemonTypeAll'](entry, { root, data, ctx })
        }

        let models = await entry.services['pokemonType'].all(data, ctx.userId)
        models = models.map((m) => {
            m.id = m._id
            return m
        })

        if (entry.hooks && entry.hooks.resolvers && entry.hooks.resolvers['afterPokemonTypeAll']) {
            models = await entry.hooks.resolvers['afterPokemonTypeAll'](entry, { models, root, data, ctx })
        }
        return models
    }
}

export const pokemonTypeCount = (entry, protections) => {
    return async (root, data, ctx) => {
        if( !(await protections.public())&&!(await protections.public()) ){
        throw new UnauthorizedError()
      }

        if (entry.hooks && entry.hooks.resolvers && entry.hooks.resolvers['beforePokemonTypeCount']) {
            await entry.hooks.resolvers['beforePokemonTypeCount'](entry, { root, data, ctx })
        }

        let models = await entry.services['pokemonType'].count(data, ctx.userId)

        if (entry.hooks && entry.hooks.resolvers && entry.hooks.resolvers['afterPokemonTypeCount']) {
            models = await entry.hooks.resolvers['afterPokemonTypeCount'](entry, { models, root, data, ctx })
        }
        return models
    }
}

export const pokemonTypeOne = (entry, protections) => {
    return async (root, data, ctx) => {
        if( !(await protections.public())&&!(await protections.public()) ){
        throw new UnauthorizedError()
      }
        if (entry.hooks && entry.hooks.resolvers && entry.hooks.resolvers['beforePokemonTypeOne']) {
            await entry.hooks.resolvers['beforePokemonTypeOne'](entry, { root, data, ctx })
        }
        let model = await entry.services['pokemonType'].one(data.id)

        if (entry.hooks && entry.hooks.resolvers && entry.hooks.resolvers['afterPokemonTypeOne']) {
            model = await entry.hooks.resolvers['afterPokemonTypeOne'](entry, { id: data.id, model, entry, root, data, ctx })
        }

        return model
    }
}

export const pokemonTypeCreate = (entry, protections) => {
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

        if (entry.hooks && entry.hooks.resolvers && entry.hooks.resolvers['beforePokemonTypeCreate']) {
            data = await entry.hooks.resolvers['beforePokemonTypeCreate'](entry, { root, data, ctx })
        }

        const userId = ctx.state?.user?.id
        if(!data.userId && userId){
        data.userId = userId
      }
        let createdModel = await entry.services['pokemonType'].create(data, userId)

        if (entry.hooks && entry.hooks.resolvers && entry.hooks.resolvers['afterPokemonTypeCreate']) {
            createdModel = await entry.hooks.resolvers['afterPokemonTypeCreate'](entry, { root, data, ctx, createdModel })
        }

        return createdModel
    }
}

export const pokemonTypeUpdate = (entry, protections) => {
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

        if (entry.hooks && entry.hooks.resolvers && entry.hooks.resolvers['beforePokemonTypeUpdate']) {
            data = await entry.hooks.resolvers['beforePokemonTypeUpdate'](entry, { root, data, ctx })
        }

        let updatedModel = await entry.services['pokemonType'].update(data, null, ctx.userId)

        if (entry.hooks && entry.hooks.resolvers && entry.hooks.resolvers['afterPokemonTypeUpdate']) {
            updatedModel = await entry.hooks.resolvers['afterPokemonTypeUpdate'](entry, { root, data, ctx, updatedModel, id: data.id })
        }

        return updatedModel
    }
}

export const pokemonTypeRemove = (entry, protections) => {
    return async (root, data, ctx) => {
        if( !(await protections.public())&&!(await protections.public()) ){
        throw new UnauthorizedError()
      }
        if (entry.hooks && entry.hooks.resolvers && entry.hooks.resolvers['beforePokemonTypeRemove']) {
            await entry.hooks.resolvers['beforePokemonTypeRemove'](entry, { root, data, ctx })
        }

        let removedModel = await entry.services['pokemonType'].remove(data.id, ctx.userId)

        if (entry.hooks && entry.hooks.resolvers && entry.hooks.resolvers['afterPokemonTypeRemove']) {
            removedModel = await entry.hooks.resolvers['afterPokemonTypeRemove'](entry, { removedModel, root, data, ctx })
        }

        return removedModel
    }
}



export const generatePokemonTypeResolver = (entry) => {
    const protections = extras.generateProtections(entry, 'pokemonType')
    return {
        all: pokemonTypeAll(entry, protections),
        count: pokemonTypeCount(entry, protections),
        one: pokemonTypeOne(entry, protections),
        create: pokemonTypeCreate(entry, protections),
        update: pokemonTypeUpdate(entry, protections),
        remove: pokemonTypeRemove(entry, protections),
        
    }
}
