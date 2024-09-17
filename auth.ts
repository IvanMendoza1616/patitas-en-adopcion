import client from "@/app/lib/db";
import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import GitHub from "next-auth/providers/github";
import axios from "axios";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(client),
  providers: [
    Google({
      profile(profile) {
        //Returns all values that are going to be stored in database
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: profile.role ?? "user",
        };
      },
      allowDangerousEmailAccountLinking: true,
    }),
    Facebook({
      async profile(profile, tokens) {
        // Graph API URL to return a large picture
        const url = `https://graph.facebook.com/v10.0/${profile.id}/picture?type=large&access_token=${tokens.access_token}`;
        // GET req via axios
        const response = await axios.get(url);
        // Get the url for the large picture
        const { imageUrl } = response.request.res;
        // Return customised next-auth user session
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          image: imageUrl,
          role: profile.role ?? "user",
        };
      },
      allowDangerousEmailAccountLinking: true,
    }),
    GitHub({
      profile(profile) {
        //Returns all values that are going to be stored in database
        return {
          id: profile.id.toString(),
          name: profile.login,
          email: profile.email,
          image: profile.avatar_url,
          role: typeof profile.role === "string" ? profile.role : "user", // Ensure role is a string
        };
      },
      allowDangerousEmailAccountLinking: true,
    }),
  ],

  //Need to extend next-auth types in order to have role as property
  //Created next-auth.d.ts file
  callbacks: {
    session({ session, user }) {
      session.user.role = user.role;
      return session;
    },
  },
});
