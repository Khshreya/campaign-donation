import { Router } from "express";
import  prisma  from "../prisma";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.get("/me", requireAuth, async (req, res) => {
  const clerkId = req.auth?.clerkId;

  if (!clerkId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user = await prisma.user.findUnique({
    where: { clerkId },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
});

export default router;
