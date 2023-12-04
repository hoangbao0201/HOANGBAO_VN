import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

const authOptions: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.NEXT_PUBLIC_GITHUB_ID as string,
            clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET as string,
        }),
    ],
    secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
};

// export default NextAuth(authOptions);

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
