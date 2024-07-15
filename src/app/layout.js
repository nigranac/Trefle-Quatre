import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dört yapraklı yonca",
  description: "Elbet bir gün...",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <meta property="og:title" content="Dört yapraklı yonca" />
        <meta property="og:description" content="Elbet bir gün..." />
        <meta
          property="og:image"
          content="https://parade.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTkwNTgxNDU5NDY0MzY1OTQ4/four-leaf-clovers-jpg.jpg"
        />
        <meta property="og:url" content="https://trefle-quatre.vercel.app/" />
        <meta property="og:type" content="website" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
