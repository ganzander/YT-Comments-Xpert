"use server";
import connectToDatabase from "@/utils/dbconnect/mongoConnection";
import Optical from "@/utils/models/Item";

export async function POST(req, res) {
  const { category, price, size, name, brand } = await req.json();
  if (!category) {
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

  try {
    const opticalItem = new Optical({
      category,
      price,
      size,
      name,
      brand,
    });
    const newItem = await Optical.create(opticalItem);

    return Response.json({
      Success: true,
      msg: "Added a new item",
      itemId: newItem._id,
    });
  } catch (err) {
    console.log(err);
  }

  return Response.json({
    Success: false,
    msg: "Unable to add a new item",
  });
}
