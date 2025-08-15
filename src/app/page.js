"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function Home() {
    const [email, setEmail] = useState("");
    const [busy, setBusy] = useState(false);
    const [msg, setMsg] = useState("");

    const sendLink = async () => {
        setMsg("");
        if (!email || !email.includes("@")) {
            setMsg("Please enter a valid email.");
            return;
        }
        setBusy(true);
        try {
            const res = await signIn("email", { email, redirect: false });
            if (res?.ok) setMsg("Check your email for the sign-in link.");
            else setMsg("Could not send email. Double-check .env and server logs.");
        } catch (e) {
            setMsg("Unexpected error. See terminal logs.");
        } finally {
            setBusy(false);
        }
    };

    return (
        <div style={{ maxWidth: 420, margin: "60px auto", padding: 20, fontFamily: "system-ui" }}>
            <h1>Email Sign-in</h1>
            <p>Enter your email to get a magic login link.</p>
            <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: "100%", padding: 10, margin: "12px 0", borderRadius: 8, border: "1px solid #ccc" }}
            />
            <button
                onClick={sendLink}
                disabled={busy}
                style={{ padding: "10px 14px", borderRadius: 8, border: "1px solid #333", cursor: "pointer" }}
            >
                {busy ? "Sending..." : "Send confirmation email"}
            </button>
            {msg && <p style={{ marginTop: 12 }}>{msg}</p>}
            <p style={{ marginTop: 16 }}>
                Or open the NextAuth page directly: <a href="/api/auth/signin">/api/auth/signin</a>
            </p>
        </div>
    );
}
