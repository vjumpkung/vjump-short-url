import connectDB from "@/lib/dbConnect";
import user from "@/schema/user";
import * as argon2 from "argon2";
import { NextApiRequest, NextApiResponse } from "next";

async function CreateUser(username: string, password: string) {
  await connectDB();
  // Create a new user
  const hashedPassword = await argon2.hash(password);
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
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Missing username or password" });
  }
  try {
    const newUser = await CreateUser(username, password);
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ error: "Error creating user" });
  }
}
