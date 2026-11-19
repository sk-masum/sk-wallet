import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getRequiredDb } from '@/db/client';
import { User } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { compare } from 'bcryptjs';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Email & Password',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'your@email.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        const db = getRequiredDb();
        const user = await db.select().from(User).where(eq(User.email, credentials.email)).get();

        if (!user) {
          throw new Error('No user found with this email');
        }

        if (!user.password) {
          throw new Error('User does not have a password set. Please use another authentication method.');
        }

        const isPasswordValid = await compare(credentials.password, user.password);

        if (!isPasswordValid) {
          throw new Error('Invalid password');
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth',
    error: '/auth',
  },
  session: {
    strategy: 'jwt' as const,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
};

const { auth } = NextAuth(authOptions as any);
export { auth };
