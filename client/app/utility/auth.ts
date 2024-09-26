import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { JWT } from "next-auth/jwt"

// Define a type for credentials
interface Credentials {
  email: string
  password: string
}

interface LoginResponse {
  success: boolean
  message: string
  token: string
  data: {
    id: number
    name: string
    email: string
    // ... other fields
  }
}

// Define the login function for super user
// const loginSuperUser = async ({ email, password }: Credentials) => {
//   try {
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/super-user/super-login`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       }
//     )

//     if (!response.ok) {
//       throw new Error("Login failed")
//     }

//     const data = await response.json()
//     console.log("data", data)
//     return data
//   } catch (error: any) {
//     console.error("Login failed:", error)
//     throw new Error(error.message)
//   }
// }

const loginSuperUser = async ({
  email,
  password,
}: {
  email: string
  password: string
}): Promise<LoginResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/super-user/super-login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }
  )

  if (!response.ok) {
    throw new Error("Login failed")
  }

  return await response.json()
}

// export const authOptions: NextAuthOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID!,
//       clientSecret: process.env.GOOGLE_SECRET!,
//     }),
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials) {
//           throw new Error("No credentials provided")
//         }

//         const user = await loginSuperUser({
//           email: credentials.email,
//           password: credentials.password,
//         })

//         if (user) {
//           return {
//             id: user._id,
//             name: user.name,
//             email: user.email,
//             token: user.token,
//           }
//         }
//         return null
//       },
//     }),
//   ],
//   session: {
//     strategy: "jwt",
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id
//         token.email = user.email
//         token.token = (user as any).token
//       }
//       return token
//     },
//     async session({ session, token }: { session: any; token: JWT }) {
//       if (token) {
//         session.user.id = token.id
//         session.user.email = token.email
//         session.user.accessToken = token.accessToken
//       }

//       return session
//     },
//   },
//   secret: process.env.NEXTAUTH_SECRET!,
// }

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

        try {
          const user = await loginSuperUser({
            email: credentials.email,
            password: credentials.password,
          })

          if (user.success) {
            return {
              id: user.data.id.toString(),
              name: user.data.name,
              email: user.data.email,
              token: user.token,
            }
          }
        } catch (error) {
          console.error("Login error:", error)
        }
        return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
        token.token = (user as any).token
      }
      return token
    },
    async session({ session, token }: { session: any; token: JWT }) {
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.name = token.name as string
        session.user.token = token.token as string
      }
      return session
    },
  },
  pages: {
    signIn: "/super-user/super-login",
  },
  secret: process.env.NEXTAUTH_SECRET!,
}
