import { model, Schema } from 'mongoose';

const contactSchema = new Schema(
    {
        name: { type: String, required: true },
        number: { type: String, required: true },
        contactType: {
            type: String,
            enum: ['home', 'work', 'personal', 'other'],
            default: 'other',
        },
        owner: { type: Schema.Types.ObjectId },
    },
    { versionKey: false },
);

export const Contact = model('contact', contactSchema);
