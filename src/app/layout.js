import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "E-Store App",
  description: "created by Bivek Das",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    afterSignInUrl={"/"}
    afterSignUpUrl={"/"}>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
        >
          <Header />

          <main className="flex-1">
           
            <SignedIn>{children}</SignedIn>

            <SignedOut>
              <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4">
                  Please sign in to continue
                </h2>
                <SignInButton mode="modal" redirectUrl="/">
                  <button className="px-4 py-2 sm:px-5 sm:py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition">
                    Sign In
                  </button>
                </SignInButton>
              </div>
            </SignedOut>
          </main>

          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
};

