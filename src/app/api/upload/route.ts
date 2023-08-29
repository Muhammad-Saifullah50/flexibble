import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary"; // this will allow us to use cloudinary instead of v2 (we are renaming it for our use)

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// instance of cloudinary

export const POST = async (request: NextRequest) => {
  const { path } = await request.json(); // we will get the path from the request

  if (!path) {
    return NextResponse.json(
      { message: "Image path is required" },
      { status: 400 }
    );
  }
  try {
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      trasformation: [{ width: 1000, height: 752, crop: "scale" }],
    };

    const result = await cloudinary.uploader.upload(path, options);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 200 });
  }
};
