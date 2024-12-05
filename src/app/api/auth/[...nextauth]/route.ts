import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

// Your NextAuth configuration
export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/login", // Optional: Define a custom sign-in page
  },
};

// Default export handler for the API route
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
