import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const formSchema = z.object({
  title: z.string().min(1, "Title wajib diisi !"),
  description: z.string().min(1, "Description wajib diisi !"),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const validatedData = formSchema.parse(req.body);

    const response = await fetch("https://service.pace11.my.id/api/note", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedData),
    });

    const data = await response.json();

    // Check if creation was successful based on message or status
    const isSuccess = response.ok || (data.message && data.message.toLowerCase().includes("successfully created")) || data.status === "OK";

    if (isSuccess) {
      return res.status(200).json({ success: true, data });
    } else {
      return res.status(400).json({ success: false, message: data.message || "Failed to create note" });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fieldErrors: Record<string, string[]> = error.flatten().fieldErrors;

      // Ubah array menjadi string
      const formattedErrors: Record<string, string> = {};
      for (const key in fieldErrors) {
        if (fieldErrors[key] && fieldErrors[key].length > 0) {
          formattedErrors[key] = fieldErrors[key][0];
        }
      }

      return res.status(400).json({
        errors: formattedErrors,
      });
    }

    return res.status(500).json({ message: "Internal Server Error" });
  }
}
