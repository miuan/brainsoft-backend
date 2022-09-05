import * as extras from '../extras'
import { UnauthorizedError, RequestError } from '../api-utils'

export const pokemonAll = (entry, protections) => {
    return async (root, data, ctx) => {
        if( !(await protections.public())&&!(await protections.public()) ){
        throw new UnauthorizedError()
      }

        if (entry.hooks && entry.hooks.resolvers && entry.hooks.resolvers['beforePokemonAll']) {
            await entry.hooks.resolvers['beforePokemonAll'](entry, { root, data, ctx })
        }

        let models = await entry.services['pokemon'].all(data, ctx.userId)
        models = models.map((m) => {
            m.id = m._id
            return m
        })

        if (entry.hooks && entry.hooks.resolvers && entry.hooks.resolvers['afterPokemonAll']) {
            models = await entry.hooks.resolvers['afterPokemonAll'](entry, { models, root, data, ctx })
        }
        return models
    }
}

export const pokemonCount = (entry, protections) => {
    return async (root, data, ctx) => {
        if( !(await protections.public())&&!(await protections.public()) ){
        throw new UnauthorizedError()
      }

        if (entry.hooks && entry.hooks.resolvers && entry.hooks.resolvers['beforePokemonCount']) {
            await entry.hooks.resolvers['beforePokemonCount'](entry, { root, data, ctx })
        }

        let models = await entry.services['pokemon'].count(data, ctx.userId)

        if (entry.hooks && entry.hooks.resolvers && entry.hooks.resolvers['afterPokemonCount']) {
            models = await entry.hooks.resolvers['afterPokemonCount'](entry, { models, root, data, ctx })
        }
        return models
    }
}

export const pokemonOne = (entry, protections) => {
    return async (root, data, ctx) => {
        if( !(await protections.public())&&!(await protections.public()) ){
        throw new UnauthorizedError()
      }
        if (entry.hooks && entry.hooks.resolvers && entry.hooks.resolvers['beforePokemonOne']) {
            await entry.hooks.resolvers['beforePokemonOne'](entry, { root, data, ctx })
        }
        let model = await entry.services['pokemon'].one(data.id)

        if (entry.hooks && entry.hooks.resolvers && entry.hooks.resolvers['afterPokemonOne']) {
            model = await entry.hooks.resolvers['afterPokemonOne'](entry, { id: data.id, model, entry, root, data, ctx })
        }

        return model
    }
}

export const pokemonCreate = (entry, protections) => {
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

        if (entry.hooks && entry.hooks.resolvers && entry.hooks.resolvers['beforePokemonCreate']) {
            data = await entry.hooks.resolvers['beforePokemonCreate'](entry, { root, data, ctx })
        }

        const userId = ctx.state?.user?.id
        if(!data.userId && userId){
        data.userId = userId
      }
        let createdModel = await entry.services['pokemon'].create(data, userId)

        if (entry.hooks && entry.hooks.resolvers && entry.hooks.resolvers['afterPokemonCreate']) {
            createdModel = await entry.hooks.resolvers['afterPokemonCreate'](entry, { root, data, ctx, createdModel })
        }

        return createdModel
    }
}

export const pokemonUpdate = (entry, protections) => {
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

        if (entry.hooks && entry.hooks.resolvers && entry.hooks.resolvers['beforePokemonUpdate']) {
            data = await entry.hooks.resolvers['beforePokemonUpdate'](entry, { root, data, ctx })
        }

        let updatedModel = await entry.services['pokemon'].update(data, null, ctx.userId)

        if (entry.hooks && entry.hooks.resolvers && entry.hooks.resolvers['afterPokemonUpdate']) {
            updatedModel = await entry.hooks.resolvers['afterPokemonUpdate'](entry, { root, data, ctx, updatedModel, id: data.id })
        }

        return updatedModel
    }
}

export const pokemonRemove = (entry, protections) => {
    return async (root, data, ctx) => {
        if( !(await protections.public())&&!(await protections.public()) ){
        throw new UnauthorizedError()
      }
        if (entry.hooks && entry.hooks.resolvers && entry.hooks.resolvers['beforePokemonRemove']) {
            await entry.hooks.resolvers['beforePokemonRemove'](entry, { root, data, ctx })
        }

        let removedModel = await entry.services['pokemon'].remove(data.id, ctx.userId)

        if (entry.hooks && entry.hooks.resolvers && entry.hooks.resolvers['afterPokemonRemove']) {
            removedModel = await entry.hooks.resolvers['afterPokemonRemove'](entry, { removedModel, root, data, ctx })
        }

        return removedModel
    }
}

export const linkTypeOnPokemon = (entry, protections) => {
    return async (root, data, ctx) => {
      
      if( !(await protections.public())&&!(await protections.public()) ){
        throw new UnauthorizedError()
      }
      if (entry.hooks && entry.hooks.resolvers['beforelinkTypeOnPokemon']) {
       await entry.hooks.resolvers['beforelinkTypeOnPokemon'](entry, { root, data, ctx });
      }
  
      let model = await entry.services['pokemon'].linkTypeOnPokemon(data.pokemonId, data.pokemonTypeId);
  
      if (entry.hooks && entry.hooks.resolvers['afterlinkTypeOnPokemon']) {
        model = await entry.hooks.resolvers['afterlinkTypeOnPokemon'](entry, { model, root, data, ctx });
      }
  
      return model;
    };
  };

  export const unlinkTypeOnPokemon = (entry, protections) => {
    return async (root, data, ctx) => {
      
      if( !(await protections.public())&&!(await protections.public()) ){
        throw new UnauthorizedError()
      }
      
      
      if (entry.hooks && entry.hooks.resolvers['beforeunlinkTypeOnPokemon']) {
       await entry.hooks.resolvers['beforeunlinkTypeOnPokemon'](entry, { root, data, ctx });
      }
  
      let model = await entry.services['pokemon'].unlinkTypeOnPokemon(data.pokemonId, data.pokemonTypeId);
  
      if (entry.hooks && entry.hooks.resolvers['afterunlinkTypeOnPokemon']) {
        model = await entry.hooks.resolvers['afterunlinkTypeOnPokemon'](entry, { model, root, data, ctx });
      }
  
      return model;
    };
  };export const linkEvolutionOnPokemon = (entry, protections) => {
    return async (root, data, ctx) => {
      
      if( !(await protections.public())&&!(await protections.public()) ){
        throw new UnauthorizedError()
      }
      if (entry.hooks && entry.hooks.resolvers['beforelinkEvolutionOnPokemon']) {
       await entry.hooks.resolvers['beforelinkEvolutionOnPokemon'](entry, { root, data, ctx });
      }
  
      let model = await entry.services['pokemon'].linkEvolutionOnPokemon(data.pokemonId, data.evolutionId);
  
      if (entry.hooks && entry.hooks.resolvers['afterlinkEvolutionOnPokemon']) {
        model = await entry.hooks.resolvers['afterlinkEvolutionOnPokemon'](entry, { model, root, data, ctx });
      }
  
      return model;
    };
  };

  export const unlinkEvolutionOnPokemon = (entry, protections) => {
    return async (root, data, ctx) => {
      
      if( !(await protections.public())&&!(await protections.public()) ){
        throw new UnauthorizedError()
      }
      
      
      if (entry.hooks && entry.hooks.resolvers['beforeunlinkEvolutionOnPokemon']) {
       await entry.hooks.resolvers['beforeunlinkEvolutionOnPokemon'](entry, { root, data, ctx });
      }
  
      let model = await entry.services['pokemon'].unlinkEvolutionOnPokemon(data.pokemonId, data.evolutionId);
  
      if (entry.hooks && entry.hooks.resolvers['afterunlinkEvolutionOnPokemon']) {
        model = await entry.hooks.resolvers['afterunlinkEvolutionOnPokemon'](entry, { model, root, data, ctx });
      }
  
      return model;
    };
  };export const linkPrevEvolutionOnPokemon = (entry, protections) => {
    return async (root, data, ctx) => {
      
      if( !(await protections.public())&&!(await protections.public()) ){
        throw new UnauthorizedError()
      }
      if (entry.hooks && entry.hooks.resolvers['beforelinkPrevEvolutionOnPokemon']) {
       await entry.hooks.resolvers['beforelinkPrevEvolutionOnPokemon'](entry, { root, data, ctx });
      }
  
      let model = await entry.services['pokemon'].linkPrevEvolutionOnPokemon(data.pokemonId, data.evolutionId);
  
      if (entry.hooks && entry.hooks.resolvers['afterlinkPrevEvolutionOnPokemon']) {
        model = await entry.hooks.resolvers['afterlinkPrevEvolutionOnPokemon'](entry, { model, root, data, ctx });
      }
  
      return model;
    };
  };

  export const unlinkPrevEvolutionOnPokemon = (entry, protections) => {
    return async (root, data, ctx) => {
      
      if( !(await protections.public())&&!(await protections.public()) ){
        throw new UnauthorizedError()
      }
      
      
      if (entry.hooks && entry.hooks.resolvers['beforeunlinkPrevEvolutionOnPokemon']) {
       await entry.hooks.resolvers['beforeunlinkPrevEvolutionOnPokemon'](entry, { root, data, ctx });
      }
  
      let model = await entry.services['pokemon'].unlinkPrevEvolutionOnPokemon(data.pokemonId, data.evolutionId);
  
      if (entry.hooks && entry.hooks.resolvers['afterunlinkPrevEvolutionOnPokemon']) {
        model = await entry.hooks.resolvers['afterunlinkPrevEvolutionOnPokemon'](entry, { model, root, data, ctx });
      }
  
      return model;
    };
  };export const linkEvoOnPokemon = (entry, protections) => {
    return async (root, data, ctx) => {
      
      if( !(await protections.public())&&!(await protections.public()) ){
        throw new UnauthorizedError()
      }
      if (entry.hooks && entry.hooks.resolvers['beforelinkEvoOnPokemon']) {
       await entry.hooks.resolvers['beforelinkEvoOnPokemon'](entry, { root, data, ctx });
      }
  
      let model = await entry.services['pokemon'].linkEvoOnPokemon(data.pokemonId, data.evolutionId);
  
      if (entry.hooks && entry.hooks.resolvers['afterlinkEvoOnPokemon']) {
        model = await entry.hooks.resolvers['afterlinkEvoOnPokemon'](entry, { model, root, data, ctx });
      }
  
      return model;
    };
  };

  export const unlinkEvoOnPokemon = (entry, protections) => {
    return async (root, data, ctx) => {
      
      if( !(await protections.public())&&!(await protections.public()) ){
        throw new UnauthorizedError()
      }
      
      
      if (entry.hooks && entry.hooks.resolvers['beforeunlinkEvoOnPokemon']) {
       await entry.hooks.resolvers['beforeunlinkEvoOnPokemon'](entry, { root, data, ctx });
      }
  
      let model = await entry.services['pokemon'].unlinkEvoOnPokemon(data.pokemonId, data.evolutionId);
  
      if (entry.hooks && entry.hooks.resolvers['afterunlinkEvoOnPokemon']) {
        model = await entry.hooks.resolvers['afterunlinkEvoOnPokemon'](entry, { model, root, data, ctx });
      }
  
      return model;
    };
  };

export const generatePokemonResolver = (entry) => {
    const protections = extras.generateProtections(entry, 'pokemon')
    return {
        all: pokemonAll(entry, protections),
        count: pokemonCount(entry, protections),
        one: pokemonOne(entry, protections),
        create: pokemonCreate(entry, protections),
        update: pokemonUpdate(entry, protections),
        remove: pokemonRemove(entry, protections),
        linkTypeOnPokemon : linkTypeOnPokemon(entry, protections),
unlinkTypeOnPokemon : unlinkTypeOnPokemon(entry, protections),linkEvolutionOnPokemon : linkEvolutionOnPokemon(entry, protections),
unlinkEvolutionOnPokemon : unlinkEvolutionOnPokemon(entry, protections),linkPrevEvolutionOnPokemon : linkPrevEvolutionOnPokemon(entry, protections),
unlinkPrevEvolutionOnPokemon : unlinkPrevEvolutionOnPokemon(entry, protections),linkEvoOnPokemon : linkEvoOnPokemon(entry, protections),
unlinkEvoOnPokemon : unlinkEvoOnPokemon(entry, protections),
    }
}
