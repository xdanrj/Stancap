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
        verifiedUser: {
            type: Boolean,
            default: false
        }

    }
)

export const User = mongoose.model('User', UserSchema)