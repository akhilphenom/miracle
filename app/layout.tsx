import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkLoaded, ClerkLoading, ClerkProvider } from "@clerk/nextjs";
import Loading from "@/components/auth/Loading";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    throw 'Missing Publishable Key'
  }
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="en">
        <body className={inter.className}>
          <div className="h-dvh w-dvw flex flex-col">  
            <ClerkLoading>
              <Loading/>
            </ClerkLoading>
            <ClerkLoaded>
              {children}
            </ClerkLoaded>
            <Toaster/>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
