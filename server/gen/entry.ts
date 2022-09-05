import { evolutionModel } from './models/Evolution'
import { generateEvolutionService } from './services/Evolution'
import { generateEvolutionResolver } from './resolvers/Evolution'
import { connectEvolutionApi } from './api/Evolution'

import { fileModel } from './models/File'
import { generateFileService } from './services/File'
import { generateFileResolver } from './resolvers/File'
import { connectFileApi } from './api/File'

import { pokemonModel } from './models/Pokemon'
import { generatePokemonService } from './services/Pokemon'
import { generatePokemonResolver } from './resolvers/Pokemon'
import { connectPokemonApi } from './api/Pokemon'

import { pokemonTypeModel } from './models/PokemonType'
import { generatePokemonTypeService } from './services/PokemonType'
import { generatePokemonTypeResolver } from './resolvers/PokemonType'
import { connectPokemonTypeApi } from './api/PokemonType'

import { userModel } from './models/User'
import { generateUserService } from './services/User'
import { generateUserResolver } from './resolvers/User'
import { connectUserApi } from './api/User'

import { userRoleModel } from './models/UserRole'
import { generateUserRoleService } from './services/UserRole'
import { generateUserRoleResolver } from './resolvers/UserRole'
import { connectUserRoleApi } from './api/UserRole'

import { generateDataloaders } from './dataloaders'
import { apiMiddleware } from './api-utils'
import * as extras from './extras'
import { registerStorageService } from './storage'

let hooks

try {
    hooks = require(`${process.cwd()}/services/entryHooks.ts`).hooks
} catch (ex) {
    if (ex.code == 'MODULE_NOT_FOUND') {
        hooks = {}
        console.log(`missing ${process.cwd()}/services/entryHooks.ts`)
    } else {
        console.error(ex)
        throw ex
    }
}

export const generateResolver = (setting = {}) => {
    const entry = {
        models: {},
        services: {},
        resolvers: {},
        dataloaders: {},
        hooks: {
            api: {},
            services: {},
            resolvers: {},
        },
        storage: {} as ReturnType<typeof registerStorageService>,
    }

    if (hooks.services) {
        for (const serviceHookName in hooks.services) {
            entry.hooks.services[serviceHookName] = hooks.services[serviceHookName]
        }
    }

    if (hooks.resolvers) {
        for (const serviceHookName in hooks.resolvers) {
            entry.hooks.resolvers[serviceHookName] = hooks.resolvers[serviceHookName]
        }
    }

    entry.models['evolution'] = evolutionModel
entry.models['file'] = fileModel
entry.models['pokemon'] = pokemonModel
entry.models['pokemonType'] = pokemonTypeModel
entry.models['user'] = userModel
entry.models['userRole'] = userRoleModel

    entry.services['evolution'] = generateEvolutionService(entry)
entry.services['file'] = generateFileService(entry)
entry.services['pokemon'] = generatePokemonService(entry)
entry.services['pokemonType'] = generatePokemonTypeService(entry)
entry.services['user'] = generateUserService(entry)
entry.services['userRole'] = generateUserRoleService(entry)

    entry.resolvers['evolution'] = generateEvolutionResolver(entry)
entry.resolvers['file'] = generateFileResolver(entry)
entry.resolvers['pokemon'] = generatePokemonResolver(entry)
entry.resolvers['pokemonType'] = generatePokemonTypeResolver(entry)
entry.resolvers['user'] = generateUserResolver(entry)
entry.resolvers['userRole'] = generateUserRoleResolver(entry)


    generateDataloaders(entry)

    const resolvers = 
  {
    Query:{
      		Evolution: entry.resolvers['evolution'].one,
		allEvolution: entry.resolvers['evolution'].all,
		countEvolution: entry.resolvers['evolution'].count,
		File: entry.resolvers['file'].one,
		allFile: entry.resolvers['file'].all,
		countFile: entry.resolvers['file'].count,
		Pokemon: entry.resolvers['pokemon'].one,
		allPokemon: entry.resolvers['pokemon'].all,
		countPokemon: entry.resolvers['pokemon'].count,
		PokemonType: entry.resolvers['pokemonType'].one,
		allPokemonType: entry.resolvers['pokemonType'].all,
		countPokemonType: entry.resolvers['pokemonType'].count,
		User: entry.resolvers['user'].one,
		allUser: entry.resolvers['user'].all,
		countUser: entry.resolvers['user'].count,
		UserRole: entry.resolvers['userRole'].one,
		allUserRole: entry.resolvers['userRole'].all,
		countUserRole: entry.resolvers['userRole'].count,

    },
    Mutation:{
      		createEvolution: entry.resolvers['evolution'].create,
		updateEvolution: entry.resolvers['evolution'].update,
		removeEvolution: entry.resolvers['evolution'].remove,
		createFile: entry.resolvers['file'].create,
		updateFile: entry.resolvers['file'].update,
		removeFile: entry.resolvers['file'].remove,
		createPokemon: entry.resolvers['pokemon'].create,
		updatePokemon: entry.resolvers['pokemon'].update,
		removePokemon: entry.resolvers['pokemon'].remove,
		linkTypeOnPokemon: entry.resolvers['pokemon'].linkTypeOnPokemon,
		unlinkTypeOnPokemon: entry.resolvers['pokemon'].unlinkTypeOnPokemon,
		linkEvolutionOnPokemon: entry.resolvers['pokemon'].linkEvolutionOnPokemon,
		unlinkEvolutionOnPokemon: entry.resolvers['pokemon'].unlinkEvolutionOnPokemon,
		linkPrevEvolutionOnPokemon: entry.resolvers['pokemon'].linkPrevEvolutionOnPokemon,
		unlinkPrevEvolutionOnPokemon: entry.resolvers['pokemon'].unlinkPrevEvolutionOnPokemon,
		linkEvoOnPokemon: entry.resolvers['pokemon'].linkEvoOnPokemon,
		unlinkEvoOnPokemon: entry.resolvers['pokemon'].unlinkEvoOnPokemon,
		createPokemonType: entry.resolvers['pokemonType'].create,
		updatePokemonType: entry.resolvers['pokemonType'].update,
		removePokemonType: entry.resolvers['pokemonType'].remove,
		updateUser: entry.resolvers['user'].update,
		removeUser: entry.resolvers['user'].remove,
		addRoleToUser: entry.resolvers['user'].addRoleToUser,
		removeRoleFromUser: entry.resolvers['user'].removeRoleFromUser,
		createUserRole: entry.resolvers['userRole'].create,
		updateUserRole: entry.resolvers['userRole'].update,
		removeUserRole: entry.resolvers['userRole'].remove,

      // generated by entry.ts
      login_v1: extras.generateLogin(entry),
      register_v1: extras.generateRegister(entry),
      logout_v1: extras.generateLogout(entry),
      refreshToken_v1: extras.generateRefreshToken(entry),
      changePassword_v1: extras.generateChangePassword(entry),
      forgottenPassword_v1: extras.generateForgottenPassword(entry),
      forgottenPasswordCheck_v1: extras.generateForgottenPasswordCheck(entry),
      forgottenPasswordReset_v1: extras.generateForgottenPasswordReset(entry),
      verifyEmail_v1: extras.generateVerify(entry),
      verifyEmailResend_v1: extras.generateVerifyEmailResend(entry)
    }
    ,AttackModel: {    
}

,AttackFieldsModel: {    
}

,EvolutionModel: {
    pokemon: async (pokemonModel, data, koaContext) => {
      return entry.dataloaders['pokemon'](koaContext, pokemonModel.pokemon,false)
    },    
}

,FileModel: {
    data: async (fileModel, data, koaContext) => {
      return entry.storage.loadDataFromFile(fileModel, data, koaContext)
    },    
}

,MinMaxModel: {    
}

,PokemonModel: {
    types: async (pokemonTypeModel, data, koaContext) => {
      return entry.dataloaders['pokemonType'](koaContext, pokemonTypeModel.types,true)
    },
    evolutions: async (evolutionModel, data, koaContext) => {
      return entry.dataloaders['evolution'](koaContext, evolutionModel.evolutions,true)
    },
    prevEvolutions: async (evolutionModel, data, koaContext) => {
      return entry.dataloaders['evolution'](koaContext, evolutionModel.prevEvolutions,true)
    },    
}
,LinkTypeOnPokemonResult:{
                pokemon: async (pokemonModel, data, koaContext) => {
                    return  entry.dataloaders['pokemon'](koaContext, pokemonModel.pokemonId,true)
                  },
                pokemonType: async (pokemonTypeModel, data, koaContext) => {
                    return  entry.dataloaders['pokemonType'](koaContext, pokemonTypeModel.pokemonTypeId,true)
                  }
            }
    ,LinkEvolutionOnPokemonResult:{
                pokemon: async (pokemonModel, data, koaContext) => {
                    return  entry.dataloaders['pokemon'](koaContext, pokemonModel.pokemonId,true)
                  },
                evolution: async (evolutionModel, data, koaContext) => {
                    return  entry.dataloaders['evolution'](koaContext, evolutionModel.evolutionId,true)
                  }
            }
    ,LinkPrevEvolutionOnPokemonResult:{
                pokemon: async (pokemonModel, data, koaContext) => {
                    return  entry.dataloaders['pokemon'](koaContext, pokemonModel.pokemonId,true)
                  },
                evolution: async (evolutionModel, data, koaContext) => {
                    return  entry.dataloaders['evolution'](koaContext, evolutionModel.evolutionId,true)
                  }
            }
    
,PokemonTypeModel: {
    pokemons: async (pokemonModel, data, koaContext) => {
      return entry.dataloaders['pokemon'](koaContext, pokemonModel.pokemons,true)
    },    
}

,UserModel: {    
}

,UserRoleModel: {    
}


  }
  

    return {
        entry,
        resolvers,
    }
}

export function connectApi(apiRouter, entry) {
    //apiRouter.use(apiMiddleware)
    connectEvolutionApi(apiRouter, entry)
connectFileApi(apiRouter, entry)
connectPokemonApi(apiRouter, entry)
connectPokemonTypeApi(apiRouter, entry)
connectUserApi(apiRouter, entry)
connectUserRoleApi(apiRouter, entry)

}
