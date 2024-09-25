import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { JWT } from "next-auth/jwt"

// Define a type for credentials
interface Credentials {
  email: string
  password: string
}

// Define the login function for super user
const loginSuperUser = async ({ email, password }: Credentials) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/super-user/super-login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    )

    if (!response.ok) {
      throw new Error("Login failed")
    }

    const data = await response.json()
    console.log("data", data)
    return data
  } catch (error: any) {
    console.error("Login failed:", error)
    throw new Error(error.message)
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("No credentials provided")
        }

        const user = await loginSuperUser({
          email: credentials.email,
          password: credentials.password,
        })

        if (user) {
          return {
            id: user._id,
            name: user.name,
            email: user.email,
            // token: user.token,
          }
        }
        return null
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email

        token.accessToken = user.token
      }
      return token
    },
    async session({ session, token }: { session: any; token: JWT }) {
      if (token) {
        session.user.id = token.id
        session.user.email = token.email

        session.user.accessToken = token.accessToken
      }

      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET!,
}
