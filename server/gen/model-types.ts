import { Document } from 'mongoose'

    // type for model: `Attack`
    export interface AttackModel extends Document {
		name: string
		type: string
		damage: number
    }
  
    // type for model: `AttackFields`
    export interface AttackFieldsModel extends Document {
		fast: AttackModel[]
		special: AttackModel[]
    }
  
    // type for model: `Evolution`
    export interface EvolutionModel extends Document {
		updatedAt: Date
		createdAt: Date
		id: string
		name: string
		pokemon: PokemonModel
		_pokemonEvo: PokemonModel[]
		_prevPokemonEvo: PokemonModel[]
		user: UserModel
    }
  
    // type for model: `File`
    export interface FileModel extends Document {
		updatedAt: Date
		createdAt: Date
		id: string
		name: string
		publicKey: string
		type: string
		size: number
		user: UserModel
		__path?: string,

    }
  
    // type for model: `MinMax`
    export interface MinMaxModel extends Document {
		minimum: string
		maximum: string
    }
  
    // type for model: `Pokemon`
    export interface PokemonModel extends Document {
		updatedAt: Date
		createdAt: Date
		id: string
		name: string
		classification: string
		types: PokemonTypeModel[]
		resistant: string[]
		weaknesses: string[]
		weight: MinMaxModel
		height: MinMaxModel
		attacks: AttackFieldsModel
		fleeRate: number
		maxCP: number
		maxHP: number
		evolutions: EvolutionModel[]
		prevEvolutions: EvolutionModel[]
		favorite: Boolean
		_evo: EvolutionModel
		user: UserModel
    }
  
    // type for model: `PokemonType`
    export interface PokemonTypeModel extends Document {
		updatedAt: Date
		createdAt: Date
		id: string
		name: string
		pokemons: PokemonModel[]
		user: UserModel
    }
  
    // type for model: `User`
    export interface UserModel extends Document {
		updatedAt: Date
		createdAt: Date
		id: string
		email: string
		password: string
		verified: Boolean
		roles: UserRoleModel[]
		files: FileModel[]
		_pokemon: PokemonModel[]
		_evolution: EvolutionModel[]
		_pokemonType: PokemonTypeModel[]
		__token?: string,

		__refreshToken?: string,

		__verifyToken?: string,

		__password: string,

		__resetPasswordToken: string,

		__parent_access_token: string,

    }
  
    // type for model: `UserRole`
    export interface UserRoleModel extends Document {
		updatedAt: Date
		createdAt: Date
		id: string
		name: string
		users: UserModel[]
    }
  