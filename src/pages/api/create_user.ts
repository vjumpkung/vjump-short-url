import connectDB from "@/lib/dbConnect";
import user from "@/schema/user";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

async function CreateUser(username: string, password: string) {
  await connectDB();

  const existingUser = await user.findOne({ username: username }).exec();

  if (existingUser) {
    throw new Error("User already exists");
  }

  // Create a new user
  const hashedPassword = await bcrypt.hash(password, 5);
  const newUser = await user.create({
    username: username,
    password: hashedPassword,
  });
  return newUser;
}

export default async function createUserHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Missing username or password" });
  }
  try {
    const newUser = await CreateUser(username, password);
    return res.status(201).json(newUser);
  } catch (error: any) {
    if (error.message === "User already exists") {
      return res.status(409).json({ error: "User already exists" });
    }
    return res.status(500).json({ error: "Error creating user" });
  }
}
