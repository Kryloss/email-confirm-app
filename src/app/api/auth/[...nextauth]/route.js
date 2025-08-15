export const runtime = "nodejs";

import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../../../../lib/mongodb";

const handler = NextAuth({
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        EmailProvider({
            server: {
                host: "smtp.resend.com",
                port: 587,
                auth: { user: "resend", pass: process.env.RESEND_API_KEY },
            },
            from: process.env.EMAIL_FROM,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
