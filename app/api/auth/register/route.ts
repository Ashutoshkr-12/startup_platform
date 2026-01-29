import connectDB from "@/lib/db";
import Users from "@/models/auth.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest){
    try {
        const { name, email, password } = await req.json();
        if(!name || !email || !password){
            return NextResponse.json({
                success: false,
                error: "All fields are required"
            }, { status: 400})
        }
        console.log('user details:',name,email,password)
    
        await connectDB();

        const existingUser = await Users.findOne( {email});

       // console.log('db connected')
        
        if(existingUser){
              return NextResponse.json({
                success: false,
                message: "email already exists"
            }, { status: 400})
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const createdUser = await Users.create({
            name,
            email,
            password: hashedPassword,
        })
    //console.log('user created:',createdUser);

    const user = createdUser.toObject();
    delete user.password;


    return NextResponse.json({
          success: true,
          message:"User created",
          user
      },{status: 200})

  } catch (error) {
    //console.log('error in user creation:',error) 
    return NextResponse.json({
        success: false,
        error:" Failed to create User from server:"
    },{ status: 500})
  }
}