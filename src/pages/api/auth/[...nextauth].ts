import NextAuth, { DefaultSession, NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import connectDB from "@/lib/dbConnect";
import user from "@/schema/user";
import Credentials from "next-auth/providers/credentials";
import { DefaultJWT } from "next-auth/jwt";
import { AdapterUser } from "next-auth/adapters";
import * as argon2 from "argon2";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string;
      email: string;
    };
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends DefaultJWT {
    user: AdapterUser & {
      id: string;
      email: string;
    };
  }
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, token }: any) => {
      session.user = token.user;

      return {
        ...session,
        token,
      };
    },

    jwt: ({ token, user }: any) => {
      const userTemp = user as AdapterUser & {
        id: string;
        email: string;
      };

      if (user) {
        token.user = userTemp;
      }
      return token;
    },
  },
  // Configure one or more authentication providers
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    Credentials({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied

        await connectDB();
        const checkUser = await user
          .findOne({
            username: credentials?.username,
          })
          .exec();

        if (!checkUser) {
          throw new Error("Invalid Username or Password");
        }

        if (
          await argon2.verify(
            checkUser.password,
            credentials?.password as string
          )
        ) {
          // Any object returned will be saved in `user` property of the JWT
          return {
            id: checkUser._id,
            email: checkUser.username,
          };
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          throw new Error("Invalid Username or Password");
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  pages: { signIn: "/signin" },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
export default NextAuth(authOptions);
