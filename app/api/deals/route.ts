import connectDB from "@/lib/db";
import dummyDeals from "@/lib/dummy";
import Deals from "@/models/deals.model";
import { NextRequest, NextResponse } from "next/server";


export async function GET(){
    try {
        await connectDB();

        const deals = await Deals.find({})
        if(!deals || deals.length === 0){
            return NextResponse.json({
                success: true,
                message: "No deals available right now"
            }, {status: 500})
        }

        return NextResponse.json({
                success: true,
                message: "Deals fetched",
                data: deals
            }, {status: 200}) 

    } catch (error) {
        console.log('Error in fetching deals data from api')
         return NextResponse.json({
                success: false,
                error: "Error in api",
            }, {status: 500}) 
    }
}

// export async function POST(){
//     try {
//         await connectDB();
//          await Deals.insertMany(dummyDeals);
//          console.log("data added to DB")
//     } catch (error) {
//         console.log("error in adding data to DB",error)
//     }
// }