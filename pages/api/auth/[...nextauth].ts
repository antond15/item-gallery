import { get } from '@vercel/edge-config';
import NextAuth, { NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@db';

const isUserAdmin = async (email: string) => {
  const admins: string[] | undefined = await get('admins');
  return admins?.includes(email) ?? false;
};

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token }) {
      token.isAdmin = await isUserAdmin(token.email as string);
      return token;
    },
    async session({ session, token }) {
      session.user.isAdmin = token.isAdmin;
      return session;
    },
  },
};

export default NextAuth(authOptions);
