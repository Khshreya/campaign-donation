declare namespace Express {
  interface Request {
    auth?: {
      clerkId: string;
    };
  }
}
