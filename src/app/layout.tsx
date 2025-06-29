import "~/styles/globals.css";
import { Inter } from "next/font/google";
import ThemeProvider from "~/components/theme-provider";
import CustomCursor from "~/components/custom-cursor";
import Header from "~/components/Header";
import PhysicsBackground from "~/components/PhysicsBackground";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Lorem Labs",
  description:
    "Hello! I'm Lorem, and this is my lab. Here you can find some of my projects, articles, and other fun stuff.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>
          <div className="text-foreground bg-background relative min-h-screen">
            <PhysicsBackground boxCount={10} ballCount={10} />
            <div className="relative z-20 bg-transparent">
              <Header />
              <CustomCursor />
              {children}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
