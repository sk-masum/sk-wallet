import { hash } from 'bcryptjs';
import { randomUUID } from 'crypto';
import { getRequiredDb } from '@/db/client';
import { User } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, name } = body;

    // Validation
    if (!email || !password) {
      return Response.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Password validation (minimum 8 characters)
    if (password.length < 8) {
      return Response.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }

    const db = getRequiredDb();

    // Check if user already exists
    const existingUser = await db
      .select({ id: User.id })
      .from(User)
      .where(eq(User.email, email.toLowerCase()))
      .limit(1);

    if (existingUser.length > 0) {
      return Response.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await hash(password, saltRounds);

    // Create user
    const userId = randomUUID();
    const user = await db
      .insert(User)
      .values({
        id: userId,
        email: email.toLowerCase(),
        password: hashedPassword,
        name: name?.trim() || null,
      })
      .returning({
        id: User.id,
        name: User.name,
        createdAt: User.createdAt,
      })
      .get();

    return Response.json(
      {
        success: true,
        message: 'User created successfully',
        user: {
          ...user,
          email: email.toLowerCase(),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });

    if (error instanceof SyntaxError) {
      return Response.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    if (error instanceof Error && error.message.includes('UNIQUE constraint failed')) {
      return Response.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    return Response.json(
      { 
        error: 'Failed to create user',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
