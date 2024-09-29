"use server";
import connectToDatabase from "@/utils/dbconnect/mongoConnection";
import Optical from "@/utils/models/Item";

export async function POST(req, res) {
  const { itemid } = await req.json();
  if (!itemid) {
    return Response.json({ Success: false, msg: "Enter your item id" });
  }

  const findItem = await Optical.findOne({ _id: itemid });
  if (findItem) {
    return Response.json({
      Success: true,
      msg: "Found the item",
      foundItem: findItem,
    });
  } else {
    return Response.json({
      Success: false,
      msg: "Invalid Item Id. Re-enter the Item Id.",
    });
  }
}
