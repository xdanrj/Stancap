import mongoose from "mongoose"

const QuoteSchema = new mongoose.Schema(
    {
        quoteType: {
            type: String
        },
        quotes: {
            type: Array,
            items: { type: String }
        },
        quote: {
            type: String
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