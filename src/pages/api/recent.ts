import url from "@/schema/url";
import { NextApiRequest, NextApiResponse } from "next";
import { ErrorDto, UrlSchema } from "./url";
import connectDB from "@/lib/dbConnect";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UrlSchema[] | ErrorDto>
) {
  if (req.method === "GET") {
    await connectDB();
    const { user } = req.query;
    const urls = await url.find({ user: user }).sort({ createdAt: -1 }).exec();
    if (!urls) {
      return res.status(404).json({ error: "URL not found" });
    }
    return res.status(200).json(urls as UrlSchema[]);
  }
}
