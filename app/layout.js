import { Montserrat, Bebas_Neue } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const bebaseNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas-neue",
  subsets: ["latin"],
});

export const metadata = {
  title: "KickOff - Soccer league management",
  description: "KickOff is a soccer league management app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/logo.png" type="image/png" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body
        className={`${montserrat.variable} ${bebaseNeue.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
