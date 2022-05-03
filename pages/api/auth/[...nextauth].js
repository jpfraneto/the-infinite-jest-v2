import NextAuth from 'next-auth';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../../lib/mongodb';

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  // pages: {
  //   signIn: '/auth/signin',
  // },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  // secret: process.env.NEXTAUTH_SECRET,
  // async jwt(token, account) {
  //   if (account?.accessToken) {
  //     token.accessToken = account.accessToken;
  //   }
  //   return token;
  // },
  debug: false,
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log('inside the signIn callback', user, account, profile);
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, user, token }) {
      session.user.username = user.username;
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      return token;
    },
  },
});
