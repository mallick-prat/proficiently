import "../styles/globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Proficiently - IB & Consulting Prep on Demand",
  openGraph: {
    title: "Proficiently - IB & Consulting Prep on Demand",
    description:
      "Proficiently is an AI-powered edtech platform that helps you ace your next recruiting cycle.",
    images: [
      {
        url: "https://ibb.co/d0PdxkH",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Proficiently - IB & Consulting Prep on Demand",
    description:
      "Proficiently is an AI-powered edtech platform that helps you ace your next recruiting cycle.",
    images: ["https://ibb.co/d0PdxkH"],
    creator: "@proficientlyco",
  },
  metadataBase: new URL("https://proficiently.co"),
  themeColor: "#FFF",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="scroll-smooth antialiased [font-feature-settings:'ss01']">
        {children}
      </body>
    </html>
  );
}
