import { ObjectId } from "mongodb"
import mongoose from "mongoose"

const QuoteSchema = new mongoose.Schema(
    {
        
        quotes: {
            type: Array,
            items: {
                type: Array,
                quote: { type: String },
                author: { type: String }
            }
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