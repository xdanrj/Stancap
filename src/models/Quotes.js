import mongoose from "mongoose"

// Obs.: Toda propriedade que não for explícita se refere à Quote. Por ex.: "author" e "date" é "author" e "date" da Quote. "uploadByUser" e "uploadDate" são explícitas logo se refere ao Upload em si e não à Quote.

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
            collation: { locale: 'pt', strength: 2 },
            items: { type: String },
        },
        author: {
            type: String, collation: { locale: 'pt', strength: 2 },
        },
        context: { type: String, collation: { locale: 'pt', strength: 2 } },
        source: { type: String, collation: { locale: 'pt', strength: 2 } },
        date: { type: String },
        uploadDate: { type: String },
        uploadByUser: { type: String, collation: { locale: 'pt', strength: 2 } },
        quoteType: { type: String, collation: { locale: 'pt', strength: 2 } }
    }
)
QuoteSchema.path('tags').index({ tags: { text: true, } })

export const Quotes = mongoose.model('Quotes', QuoteSchema)
