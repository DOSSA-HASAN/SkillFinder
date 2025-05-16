import toast from "react-hot-toast"
import { create } from "zustand"
import { axiosInstance } from "../lib/AxiosInstance"
export const userAuth = create((set, get) => ({
    authUser: null || JSON.parse(localStorage.getItem("user")),
    accessToken: null || JSON.parse(localStorage.getItem("accessToken")),
    isLoggingIn: false,
    isSigningup: false,
    setAccessToken: (token) => set({ accessToken: token }),

    createAccount: async (username, email, number, password) => {
        set({ isSigningup: true })
        try {
            const res = await axiosInstance.post("register", { username, email, number, password })
            toast.success("Account created successfully")
            setTimeout(() => {
                window.location.pathname = "/login"
            }, 3000);
        } catch (error) {
            // TODO: clg are only for development
            console.log(error.message)
            toast.error("Failed to create an account")
        } finally {
            set({ isSigningup: false })
        }
    },

    login: async (credential, password) => {
        set({ isLoggingIn: true })
        try {
            const res = await axiosInstance.post("login", { credential, password })
            console.log(res)
            set({ user: res.data.user })
            localStorage.setItem("user", JSON.stringify(res.data.user))
            set({ accessToken: res.data.accessToken })
            localStorage.setItem("accessToken", JSON.stringify(res.data.accessToken))
            setTimeout(() => {
                window.location.pathname = "/"
                toast.success("Logged in successfully")
            }, 0);
        } catch (error) {
            // TODO: clg are only for development
            console.log(error.message)
            toast.error("Failed to login")
        } finally {
            set({ isLoggingIn: false })
        }
    },

    logout: async () => {
        try {
            const res = await axiosInstance.post("logout")
            console.log("loggin out user")
            set({ accessToken: null })
            set({ authUser: false })
            localStorage.clear()
            setTimeout(() => {
                window.location.pathname = "/login"
            }, 0);
        } catch (error) {
            // TODO: clg are only for development
            console.log(error.message)
            toast.error("Failed to logout")
        }
    }
}))