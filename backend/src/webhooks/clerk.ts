import { Request, Response } from "express";
import prisma from "../prisma";

export const clerkWebhook = async (req: Request, res: Response) => {
  const event = req.body;

  if (event.type === "user.created") {
    const clerkUser = event.data;

    const clerkId = clerkUser.id;
    const email = clerkUser.email_addresses?.[0]?.email_address;
    const name = clerkUser.first_name ?? null;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { clerkId },
    });

    if (!existingUser) {
      await prisma.user.create({
        data: {
          clerkId,
          email,
          name,
          profileComplete: false,
        },
      });
    }
  }

  return res.status(200).json({ success: true });
};
