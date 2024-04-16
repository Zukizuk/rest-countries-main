import type { Metadata } from "next";
import Header from "./components/Header";
import "@/app/styles.scss";
import ThemeContextProvider, { useTheme } from "./context/ThemeContext";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Rest Countries",
  description: "A simple app to view information about countries",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="description"
          content="Crowdfunding Product Page Solution by Zukizuk for FrontendMentor.io"
        />
        <meta
          name="keywords"
          content="Frontend Mentor, Crowdfunding Product Page Challenge, Zukizuk"
        />
        <meta
          property="og:title"
          content="Crowdfunding Product Page - Frontend Mentor"
        />
        <meta
          property="og:description"
          content="Crowdfunding Product Page Solution by Zukizuk for FrontendMentor.io"
        />
      </head>
      <body>
        <ThemeContextProvider>
          <Header />
          {children}
        </ThemeContextProvider>
        <Toaster />
      </body>
    </html>
  );
}
