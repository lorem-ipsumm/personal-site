import "~/styles/globals.css";
import { Sora } from "next/font/google";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Lorem's Labs",
  description: "Hello! I'm Lorem, and this is my lab. Here you can find some of my projects, articles, and other fun stuff.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${sora.variable}`}>{children}</body>
    </html>
  );
}
