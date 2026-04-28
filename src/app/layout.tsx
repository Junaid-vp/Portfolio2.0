import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google"; 
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";
import Navbar from "@/components/ui/Navbar";
import SplashCursor from "@/components/ui/SplashCursor";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import DotGrid from "@/components/ui/DotGrid";
import Preloader from "@/components/ui/Preloader";
import ScrollIndicator from "@/components/ui/ScrollIndicator";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Junaid-Software-Developer",
  description: "A visually shocking portfolio for a Junior MERN Stack Developer.",
  icons: {
    icon: "/924673b2-e843-4420-957f-ab5ad187b441.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground selection:bg-purple-500 selection:text-white transition-colors duration-300`}
      >
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          forcedTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Preloader />
          <SplashCursor />
          <ScrollIndicator />
          <div className="fixed inset-0 z-0 pointer-events-none">
            <DotGrid 
                dotSize={3} 
                gap={30} 
                baseColor="#52525b" 
                activeColor="#d8b4fe" 
                proximity={300} 
            /> 
          </div>
          <SmoothScroll>
              <div className="relative z-10">
                <Navbar />
                {children}
              </div>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
