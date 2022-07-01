import NextAuth from 'next-auth';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '../../../lib/mongodb';

import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  pages: {
    signIn: '/auth/signin',
  },
  providers: [
    // Providers.Credentials({
    //   // The name to display on the sign in form (e.g. 'Sign in with...')
    //   name: 'Lightning',
    //   // The credentials is used to generate a suitable form on the sign in page.
    //   // You can specify whatever fields you are expecting to be submitted.
    //   // e.g. domain, username, password, 2FA token, etc.
    //   credentials: {
    //     pubkey: { label: 'publickey', type: 'text' },
    //     k1: { label: 'k1', type: 'text' },
    //   },
    //   async authorize(credentials, req) {
    //     console.log('inside the authorize function');
    //     const { k1, pubkey } = credentials;
    //     try {
    //       const lnauth = await prisma.lnAuth.findUnique({ where: { k1 } });
    //       if (lnauth.pubkey === pubkey) {
    //         let user = await prisma.user.findUnique({ where: { pubkey } });
    //         const session = await getSession({ req });
    //         if (!user) {
    //           // if we are logged in, update rather than create
    //           if (session?.user) {
    //             user = await prisma.user.update({
    //               where: { id: session.user.id },
    //               data: { pubkey },
    //             });
    //           } else {
    //             user = await prisma.user.create({
    //               data: { name: pubkey.slice(0, 10), pubkey },
    //             });
    //           }
    //         } else if (session && session.user?.id !== user.id) {
    //           throw new Error('account not linked');
    //         }

    //         await prisma.lnAuth.delete({ where: { k1 } });
    //         return user;
    //       }
    //     } catch (error) {
    //       console.log(error);
    //     }

    //     return null;
    //   },
    // }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  // async jwt(token, account) {
  //   if (account?.accessToken) {
  //     token.accessToken = account.accessToken;
  //   }
  //   return token;
  // },
  debug: false,
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
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
