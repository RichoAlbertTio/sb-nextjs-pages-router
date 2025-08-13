
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
  age: number;
  errorMessage?: string;
  payload?: object;
  headers?: string | string[];
  params?: object;
};


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  try {
    console.log('req =>', req);
    const response = await fetch("https://service.pace11.my.id/api/notes");
    const data = await response.json();
    res.status(200).json(data);
  } catch (errorMessage) {
    res.status(500).json({ errorMessage: "Internal Server Error" });
  }
}
