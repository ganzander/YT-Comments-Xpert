"use server";
import connectToDatabase from "@/utils/dbconnect/mongoConnection";
import Optical from "@/utils/models/Item";

export async function POST(req, res) {
  const { itemid, category, price, size, name, brand } = await req.json();
  if (!itemid) {
    return Response.json({ Success: false, msg: "Enter your item id" });
  } else if (!category) {
    return Response.json({ Success: false, msg: "Enter your category" });
  } else if (!price) {
    return Response.json({ Success: false, msg: "Enter your price" });
  } else if (!size) {
    return Response.json({ Success: false, msg: "Enter your size" });
  } else if (!name) {
    return Response.json({ Success: false, msg: "Enter your name" });
  } else if (!brand) {
    return Response.json({ Success: false, msg: "Enter your brand" });
  }

  const findItem = await Optical.findOne({ _id: itemid });
  if (findItem) {
    const updateData = {
      category,
      price,
      size,
      name,
      brand,
    };
    await Optical.updateOne(
      { _id: itemid },
      { $set: updateData },
      {
        new: true,
        runValidators: true,
      }
    );
    return Response.json({
      Success: true,
      msg: "Updated the item",
      itemId: itemid,
    });
  } else {
    return Response.json({
      Success: false,
      msg: "Invalid Item Id. Re-enter the Item Id.",
    });
  }
}
