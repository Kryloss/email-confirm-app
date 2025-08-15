"use client";
import { signIn } from "next-auth/react";

export default function Home() {
    return (
        <div style={{ padding: 20 }}>
            <h1>Email Sign-in</h1>
            <input id="email" type="email" placeholder="Enter your email" />
            <button
                onClick={() => {
                    const email = document.getElementById("email").value;
                    signIn("email", { email });
                }}
            >
                Send Confirmation Email
            </button>
        </div>
    );
}
