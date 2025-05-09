import jwt from "jsonwebtoken"

export const verifyAccessToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "UnAuthorized - no valid token found" })
        }

        const token = authHeader.split(" ")[1]
        const decoded = jwt.verify(token, process.env.ACCESS_SECRET)
        req.user = decoded
        next()

    } catch (error) {
        console.log(`Error in verify.js: ${error.message}`)
        return res.status(500).json({ message: error.message })
    }
}

export const verifyRefreshToken = (req, res, next) => {
    try {
        const token = req.cookies.refreshToken
        if (!token) {
            return res.status(401).json({ message: "Unauthorized - login to continue" })
        }
        const decoded = jwt.verify(token, process.env.REFRESH_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        console.log(`Error in verify.js: ${error.message}`)
        return res.status(500).json({ message: error.message })
    }
}
