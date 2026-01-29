import connectDB from "@/lib/db";
import Deals from "@/models/deals.model";
import { NextRequest, NextResponse } from "next/server";

type RouteProps = {
  params: {
    deal_id: string;
  };
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const deal_id = searchParams.get("deal_id");

  console.log("deal_id",deal_id)
  if (!deal_id) {
    return NextResponse.json(
      { success: false, message: "deal_id missing" },
      { status: 400 }
    );
  }
  await connectDB();

  const deal = await Deals.findOne({_id: deal_id});
  return NextResponse.json(deal);
}

