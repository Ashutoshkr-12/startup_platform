import Users from "@/models/auth.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import connectDB from "@/lib/db";

type cookieOpts= {
    httpOnly: boolean,
    sameSite: "strict" | "lax" | "none",
    maxAge: number

}

const cookieOptions: cookieOpts = {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 7* 24 * 60 * 60 *1000, //7d
}
export async function POST(req: NextRequest){

    const { email, password} = await req.json();

    if(!email || !password){
        return NextResponse.json({
            success: false,
            error: "All fields are required"
        }, {  status: 400})
    }

    await connectDB();

    const user = await Users.findOne({ email })

    if(!user){
  return NextResponse.json({
            success: false,
            error: "No user found with this email"
        }, {  status: 404})
    }

    const isValid = await bcrypt.compare(password,user.password)

if(!isValid){
    return NextResponse.json({
        success: false,
        error: "Invalid credentials"
    }, {  status: 400})
    }

     const createdUser = user.toObject();
    delete createdUser.password;

    const token = jwt.sign(
     { id: user._id, email: user.email },
     process.env.JWT_SECRET!,{expiresIn: "7d"}
    )

    const res =  NextResponse.json({
        success: true,
        token,
        message: "logging in"
    }, { status: 200});


    res.cookies.set("token", token, cookieOptions)
    //console.log(res);

    return res;
}