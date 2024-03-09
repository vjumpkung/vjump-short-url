import connectDB from "@/lib/dbConnect";
import url from "@/schema/url";
import { NextApiRequest, NextApiResponse } from "next";

async function generateShortId(numOfChars: number): Promise<string> {
  await connectDB();
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  while (true) {
    const ans = Array.from(
      { length: numOfChars },
      () => chars[Math.floor(Math.random() * chars.length)]
    ).join("");
    if ((await url.findOne({ shorturl: ans }).exec()) === null) {
      return ans;
    }
  }
}

export type UrlSchema = {
  user: string;
  url: string;
  slug: string;
  createdAt: string;
};

export type ErrorDto = {
  error: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UrlSchema | ErrorDto>
) {
  if (req.method === "POST") {
    await connectDB();

    const request = JSON.parse(req.body); // Destructure the request body
    // Create a new URL
    const shorturl = await generateShortId(5);
    const created_at = new Date();
    const newUrl = await url.create({
      user: request.user,
      url: request.url,
      slug: shorturl,
      created_at,
    });
    return res.status(201).json(newUrl);
  }
  if (req.method === "GET") {
    await connectDB();
    const { slug } = req.query;
    const urlres = await url.findOne({ slug: slug }).exec();
    if (!urlres) {
      return res.status(404).json({ error: "URL not found" });
    }
    return res.status(200).json(urlres);
  }
}
