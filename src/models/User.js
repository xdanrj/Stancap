import mongoose from "mongoose"
const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            unique: true
        },
        password: {
            type: String
        },
        username: {
            type: String
        }

    }
)

export const User = mongoose.model('User', UserSchema)