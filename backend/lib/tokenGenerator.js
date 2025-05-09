import jwt from "jsonwebtoken"

export const refreshTokenGen = (userId) => {
    try {
        return (
            jwt.sign(
                { id: userId },
                process.env.REFRESH_SECRET,
                { expiresIn: '7d' }
            )
        )
    } catch (error) {
        console.log(`Refresh token: ${error.message}`)
        return null
    }
}

export const accessTokenGen = (userId) => {
    try {
        return(
            jwt.sign(
                { id: userId },
                process.env.ACCESS_SECRET,
                { expiresIn: '15m' }
            )
        )
    } catch (error) {
        console.log(`Access token: ${error.message}`)
        return null
    }
}