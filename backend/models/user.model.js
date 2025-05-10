import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        googleId: { type: String, unique: true },
        number: { type: String, unique: true },
        password: { type: String },
        profilePic: { type: String, default: "" },
        passwordResetOTP: { type: String, default: "" },
        passwordResetOTPExpiry: { type: String, default: "" },
        emailResetOTP: { type: String, default: "" },
        emailResetOTPExpiry: { type: String, default: "" },
        experience: { type: String },
        bio: { type: String, default: "" },
        birthDate: { type: Date, default: "" },
        location: { type: String, default: "" },
        skills: [{ type: String, default: "" }],
        skillRequest: [{ type: String, default: "" }],
        verifyEmailOTP: { type: String },
        verifyEmail: { type: Boolean, default: false },
        verifyNumberOTP: { type: String },
        verifyNumber: { type: Boolean, default: false },
    },
    {
        timestamps: true
    }
)

export const userModel = mongoose.model("user", userSchema)