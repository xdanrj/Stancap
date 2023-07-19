import mongoose from "mongoose"

const QuoteSchema = new mongoose.Schema(
    {
        quote: {
            type: Array,
            items: { type: String }
        },
        tags: {
            type: Array,
            items: { type: String }
        },
        author: {
            type: String
        },
        date: {
            type: String
        },
        source: {
            type: String
        },
        fromId: {
            type: String
        }

    }
)

export const Quotes = mongoose.model('Quotes', QuoteSchema)