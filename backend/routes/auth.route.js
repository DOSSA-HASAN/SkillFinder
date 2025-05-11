import express from "express"
import { createAccount, login, logout } from "../controllers/auth.controller.js"
import { accessTokenGen, refreshTokenGen } from "../lib/tokenGenerator.js"
import { verifyRefreshToken } from "../lib/verify.js"
import passport from "passport"

const router = express.Router()

router.post('/register', createAccount)
router.post('/login', login)
// TODO: verify middleware
router.post('/logout', logout)
router.post('/refresh', verifyRefreshToken, async (req, res) => {
  try {
    const { id: userId } = req.user

    if (!userId) {
      return res.status(400).json({ message: "Invalid request - missing required credentials" })
    }

    const newAccessToken = accessTokenGen(userId)
    return res.status(200).json({ accessToken: newAccessToken })

  } catch (error) {
    console.log(`Error in refresh route: ${error.message}`)
    return res.status(500).json({ message: "Error in refresh route" })
  }
})

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
    session: false,
  }),
  (req, res) => {
    const accessToken = accessTokenGen(req.user._id);
    const refreshToken = refreshTokenGen(req.user._id);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.redirect(`http://localhost:5173/oauth-success?token=${accessToken}`);
  }
);

export default router
