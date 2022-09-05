import { Schema, Model, Types, model } from 'mongoose'
import { AttackFieldsModel } from '../model-types'
export { Types } from 'mongoose'
import { attackSchema } from './Attack'


export const attackFieldsSchema: Schema = new Schema(
    {
        		fast: {type: [attackSchema]},
		special: {type: [attackSchema]},

    },
    {
        timestamps: true,
        usePushEach: true,
        versionKey: false,
    },
)



attackFieldsSchema.set('toJSON', {
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


