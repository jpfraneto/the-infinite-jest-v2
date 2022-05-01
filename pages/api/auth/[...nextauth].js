import NextAuth from 'next-auth';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import TwitterProvider from 'next-auth/providers/twitter';
import clientPromise from '../../../lib/mongodb';

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  pages: {
    signIn: '/auth/signin',
  },
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
      version: '2.0',
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    redirect: async (url, _baseUrl) => {
      if (url === '/profile') {
        return Promise.resolve('/');
      }
      return Promise.resolve('/');
    },
    session: async session => {
      session.session.id = session.user.id;
      session.session.username = session.user.username;
      return Promise.resolve(session.session);
    },
  },
});
