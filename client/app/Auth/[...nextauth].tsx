import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

// Ensure environment variables are properly typed
const GITHUB_ID = process.env.GITHUB_ID as string
const GITHUB_SECRET = process.env.GITHUB_SECRET as string
const GOOGLE_ID = process.env.GOOGLE_ID as string
const GOOGLE_SECRET = process.env.GOOGLE_SECRET as string

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: GITHUB_ID,
      clientSecret: GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: GOOGLE_ID,
      clientSecret: GOOGLE_SECRET,
    }),
  ],
}

export default NextAuth(authOptions)
