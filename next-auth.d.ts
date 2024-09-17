// next-auth.d.ts
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      email: string;
      image: string;
      role: string; // Add the role property here
    };
  }

  interface User {
    role: string; // Add the role property here
  }
}
