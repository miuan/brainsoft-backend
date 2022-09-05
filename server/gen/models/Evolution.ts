import { Schema, Model, Types, model } from 'mongoose'
import { EvolutionModel } from '../model-types'
export { Types } from 'mongoose'


export const evolutionSchema: Schema = new Schema(
    {
        		name: {type: Schema.Types.String, required: function () { 
                // Mongoose required string can't be a empty
                // but GraphQL required string can be a empty
                // so make required conditional https://stackoverflow.com/questions/44320745/in-mongoose-how-do-i-require-a-string-field-to-not-be-null-or-undefined-permitt
                return !(typeof this?.name === 'string') 
            }, unique: true},
		pokemon: {type: Schema.Types.ObjectId, ref: 'server_Pokemon', index: true},
		_pokemonEvo: {type: [Schema.Types.ObjectId], ref: 'server_Pokemon', index: true},
		_prevPokemonEvo: {type: [Schema.Types.ObjectId], ref: 'server_Pokemon', index: true},
		user: {type: Schema.Types.ObjectId, ref: 'server_User', index: true},

    },
    {
        timestamps: true,
        usePushEach: true,
        versionKey: false,
    },
)



evolutionSchema.set('toJSON', {
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


        export const evolutionModel: Model<EvolutionModel> = model<EvolutionModel>(
            'server_Evolution', evolutionSchema
        );
