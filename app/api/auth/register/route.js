import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import db from "@/libs/db";

export async function POST(request) {
  try {
    //Request data from client
    const data = await request.json();

    //Validate data on unique username 
    const userNameFound = await db.user.findUnique({
      where: {
        username: data.username
      }
    });
    if (userNameFound) {
      return NextResponse.json({
        message: "User name already exists"
      }, { status: 400 });
    }

    //|| Validate data on unique email
    const userFound = await db.user.findUnique({
      where: {
        email: data.email
      }
    });
    if (userFound) {
      return NextResponse.json({
        message: "Email already exists"
      }, { status: 400 });
    }

    //Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = await db.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: hashedPassword
      }
    });

    //Remove password from response
    const { password, ...user } = newUser;
    return NextResponse.json(user);

  } catch (error) {
    //Catch error
    return NextResponse.json({
      message: error.message || "Something went wrong"
    }, { status: 500 });
  }

}