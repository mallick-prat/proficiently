// pages/api/prompt.ts

import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const filePath = path.resolve(process.cwd(), 'utils', 'prompt.txt');
  const data = fs.readFileSync(filePath, 'utf-8');
  res.status(200).json({ prompt: data });
}
