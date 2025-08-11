// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  id?: string | string[] | undefined;
  name?: string;
  message?: string;
  data?: object | null;
  headers?: string | string[] | undefined;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  // console.log(`req =>`, req.query);
  // console.log('req =>', req.method);
  // res.status(200).json(
  //   {
  //     id: req?.query?.id,
  //     name: 'John Doe',
  //   }
  // );

  // jika methodnya POST maka akan menampilkan json dengan data dari req.body dan headers
  if (req.method === "POST") {
    res.status(200).json({ id: req?.query?.id, name: "John Doe", data: req.body, headers: req.headers["api-token"] });
  }  else {
    // jika methodnya bukan POST maka akan menampilkan json dengan message "Forbidden"
    res.status(403).json({ message: "Tidak diizinkan" });
  }
}
