import { Schema, Model, Types, model } from 'mongoose'
import { PokemonModel } from '../model-types'
export { Types } from 'mongoose'
import { minMaxSchema } from './MinMax'
import { attackFieldsSchema } from './AttackFields'


export const pokemonSchema: Schema = new Schema(
    {
        		name: {type: Schema.Types.String, required: function () { 
                // Mongoose required string can't be a empty
                // but GraphQL required string can be a empty
                // so make required conditional https://stackoverflow.com/questions/44320745/in-mongoose-how-do-i-require-a-string-field-to-not-be-null-or-undefined-permitt
                return !(typeof this?.name === 'string') 
            }, unique: true},
		classification: {type: Schema.Types.String},
		types: {type: [Schema.Types.ObjectId], ref: 'server_PokemonType', index: true},
		resistant: {type: [Schema.Types.String]},
		weaknesses: {type: [Schema.Types.String]},
		weight: {type: minMaxSchema},
		height: {type: minMaxSchema},
		attacks: {type: attackFieldsSchema},
		fleeRate: {type: Schema.Types.Number},
		maxCP: {type: Schema.Types.Number},
		maxHP: {type: Schema.Types.Number},
		evolutions: {type: [Schema.Types.ObjectId], ref: 'server_Evolution', index: true},
		prevEvolutions: {type: [Schema.Types.ObjectId], ref: 'server_Evolution', index: true},
		favorite: {type: Schema.Types.Boolean, default: false},
		_evo: {type: Schema.Types.ObjectId, ref: 'server_Evolution', index: true},
		user: {type: Schema.Types.ObjectId, ref: 'server_User', index: true},

    },
    {
        timestamps: true,
        usePushEach: true,
        versionKey: false,
    },
)



pokemonSchema.set('toJSON', {
    transform: function (doc, ret) {
        ret.id = ret._id
        delete ret._id

        // remove hidden fields __
        for (const key in ret) {
            if (key.startsWith('__')) {
                delete ret[key]
            }
        }
    },
})


        export const pokemonModel: Model<PokemonModel> = model<PokemonModel>(
            'server_Pokemon', pokemonSchema
        );
