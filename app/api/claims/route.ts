import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/db";
import Claims from "@/models/claims.model";
import Users from "@/models/auth.model";
import Deals from "@/models/deals.model";

export async function POST(req: NextRequest) {

  try {
    
    const token = req.cookies.get("token")?.value;
    if (!token){
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      verified: boolean
    };
    
const { dealId } = await req.json();

    await connectDB();

    const deal = await Deals.findById(dealId);
    if (!deal) {
      return NextResponse.json(
        { success: false, message: "Deal not found" },
        { status: 404 }
      );
    }

    if (deal.isLocked && !decoded.verified) {
      return NextResponse.json(
        { success: false, message: "Verification required to claim this deal" },
        { status: 403 }
      );
    }

    const existingClaim = await Claims.findOne({
      user: decoded.id,
      deal: dealId,
    });

    if (existingClaim) {
      return NextResponse.json(
        { success: false, message: "Deal already claimed" },
        { status: 409 }
      );
    }

    const claim = await Claims.create({
      user: decoded.id,
      deal: dealId,
      status: "pending",
    });

   
    await Users.findByIdAndUpdate(decoded.id, {
      $addToSet: { claimedDeals: dealId },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Deal claimed successfully",
        data: {
          claimId: claim._id,
          status: claim.status,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("CLAIM DEAL ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}


export async function GET(req: NextRequest) {
  try {
   
    const token = req.cookies.get("token")?.value;
    if (!token){
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      verified: boolean
    };
    

    await connectDB();

    const claims = await Claims.find({ user: decoded.id })
      .populate({
        path: "deal",
        select: "title price desc",
      })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(
      {
        success: true,
        data: claims,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("error in claim api:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}