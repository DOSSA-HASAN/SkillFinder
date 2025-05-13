import { otpGen } from "../lib/otpGenerator.js"
import { accessTokenGen, refreshTokenGen } from "../lib/tokenGenerator.js"
import { userModel } from "../models/user.model.js"
import bcrypt from "bcryptjs"
import { SendEmail } from "../lib/send_mail.js"

export const createAccount = async (req, res) => {
    try {
        const { username, email, number, password } = req.body
        if (!username || !email || !number || !password) {
            return res.status(400).json({ message: "Missing required fields" })
        }
        const user = await userModel.findOne({ email, number })
        if (user) {
            return res.status(409).json({ message: "user with email or phone number already exists" })
        }

        const saltRounds = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        const verifyEmailOTP = otpGen()
        const verifyNumberOTP = otpGen()

        const newUser = new userModel({
            username,
            email,
            number,
            password: hashedPassword,
            verifyEmailOTP,
            verifyNumberOTP
        })

        await newUser.save()

        const subject = "Verify your account to get started on SkillFinder!"
        const text = `Hi ${newUser.username},

Thank you for signing up on SkillFinder! Please verify your account by clicking the link below:

https://yourdomain.com/verify-account?token=${verifyEmailOTP}

If you didn’t create this account, please ignore this email.

— SkillFinder Team
`
        const html = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Verify Your Account</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 8px; padding: 30px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
      <h2 style="color: #333;">Verify your SkillFinder account</h2>
      <p>Hi <strong>${newUser.username}</strong>,</p>
      <p>Thanks for signing up on <strong>SkillFinder</strong>! To complete your registration, please verify your account by clicking the button below:</p>
      <p style="text-align: center; margin: 30px 0;">
        <a href="https://yourdomain.com/verify-account?token=${verifyEmailOTP}" style="background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">Verify My Account</a>
      </p>
      <p>If the button doesn’t work, copy and paste this link into your browser:</p>
      <p>If you didn’t create this account, you can safely ignore this email.</p>
      <p>— The SkillFinder Team</p>
    </div>
  </body>
</html>
`
        await SendEmail(newUser.email, subject, text, html)

        return res.status(201).json({ message: "Account created" })
    } catch (error) {
        console.log(`error while creating account: ${error.message}`)
        return res.status(500).json({ message: error.message })
    }
}

export const login = async (req, res) => {
    // credential can be the users phone number or email, they can login using both
    const { credential, password } = req.body
    try {
        if (!credential || !password) {
            return res.status(400).json({ message: "Missing required fields" })
        }

        const user = await userModel.findOne({
            $or: [
                { email: credential },
                { number: credential }
            ]
        })

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password)

        if (!isPasswordMatch) {
            return res.status(403).json({ message: "Invalid credential" })
        }

        const { password: _, ...userWithoutPassword } = user._doc

        const refreshToken = refreshTokenGen(user._id)
        const accessToken = accessTokenGen(user._id)

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'Lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        // store access token on frontend
        return res.status(200).json({ accessToken, user:userWithoutPassword })

    } catch (error) {
        console.log(`Login error: ${error.message}`);
        return res.status(500).json({ message: error.message });
    }
}

export const logout = (req, res) => {
    try {

        const { refreshToken } = req.cookies

        if(!refreshToken){
            return res.status(400).json({message: "User not logged in"})
        }

        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'Lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({ message: "Logged user" })
    } catch (error) {
        console.log(`Error loggin out: ${error.message}`)
        return res.status(500).json({ message: error.message })
    }
}