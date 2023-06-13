import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    error:
      "We love that you want to keep trying us out! Please sign up for our waitlist to receive full access.",
  });
  return res.end();
}
