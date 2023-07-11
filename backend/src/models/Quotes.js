import mongoose from "mongoose"
const QuoteSchema = new mongoose.Schema(
    {

        quote: {
            type: String
        },
        tags: {
            type: Array,
            items: { type: String }
        },
        author: {
            type: String
        }

    }
)

export const Quotes = mongoose.model('Quotes', QuoteSchema)