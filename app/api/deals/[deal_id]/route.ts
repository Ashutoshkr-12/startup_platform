import connectDB from "@/lib/db";
import Deals from "@/models/deals.model";
import { NextRequest, NextResponse } from "next/server";


export async function GET(
 req: NextRequest,
  { params }: { params: { deal_id: string } }
) {
  const userVerified = req.headers.get("user-verified") === "true";
  await connectDB();

  const { deal_id } =  params;
//console.log('id from api: ', deal_id)
  try {
    const deal = await Deals.findById(deal_id);
   // console.log('deal from api:',deal);

    if (!deal) {
      return NextResponse.json(
        { success: false, message: "Deal not found" },
        { status: 404 }
      );
    }

    if(deal.isLocked && !userVerified){
      return NextResponse.json({
        success: false,
        message: "This deal is only available for verified users"
      }, { status: 403})
    }

    return NextResponse.json(
      {
        success: true,
        data: deal,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching deal:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
