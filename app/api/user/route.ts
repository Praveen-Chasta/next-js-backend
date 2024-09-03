import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export function GET() {
  return NextResponse.json({
    email: "Praveen.chastaa@gmail.com",
    name: "Praveen",
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Add zod validation here (optional, based on your requirements)

    const user = await client.user.create({
      data: {
        username: body.username,
        password: body.password,
      },
    });

    console.log(user.id);

    // Return a success response with the created user details
    return NextResponse.json({
      message: "User created successfully",
      user: {
        id: user.id,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);

    // Return an error response in case of failure
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
