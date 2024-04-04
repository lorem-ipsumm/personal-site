import "~/styles/globals.css";
import { Sora } from "next/font/google";
import LeftSection from "./components/LeftSection";

const sora = Sora({
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
    <html lang="en">
      <body
        className={`flex bg-[#121313] font-sans text-white ${sora.variable}`}
      >
        <div className="m-auto flex md:flex-row flex-col md:min-h-screen w-full md:w-5/6 justify-center">
          <LeftSection />
          {children}
        </div>
      </body>
    </html>
  );
}
