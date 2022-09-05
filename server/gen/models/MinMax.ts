import { Schema, Model, Types, model } from 'mongoose'
import { MinMaxModel } from '../model-types'
export { Types } from 'mongoose'


export const minMaxSchema: Schema = new Schema(
    {
        		minimum: {type: Schema.Types.String, required: function () { 
                // Mongoose required string can't be a empty
                // but GraphQL required string can be a empty
                // so make required conditional https://stackoverflow.com/questions/44320745/in-mongoose-how-do-i-require-a-string-field-to-not-be-null-or-undefined-permitt
                return !(typeof this?.minimum === 'string') 
            }},
		maximum: {type: Schema.Types.String, required: function () { 
                // Mongoose required string can't be a empty
                // but GraphQL required string can be a empty
                // so make required conditional https://stackoverflow.com/questions/44320745/in-mongoose-how-do-i-require-a-string-field-to-not-be-null-or-undefined-permitt
                return !(typeof this?.maximum === 'string') 
            }},

    },
    {
        timestamps: true,
        usePushEach: true,
        versionKey: false,
    },
)



minMaxSchema.set('toJSON', {
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


