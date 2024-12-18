import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "./providers/theme-provider";

const robotoSlabVariable = localFont({
  src: [
    {
      path: "./fonts/RobotoSlab-Thin.woff",
      weight: "100",
      style: "normal",
    },
    {
      path: "./fonts/RobotoSlab-ExtraLight.woff",
      weight: "200",
      style: "normal",
    },
    {
      path: "./fonts/RobotoSlab-Light.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/RobotoSlab-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/RobotoSlab-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/RobotoSlab-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/RobotoSlab-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/RobotoSlab-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/RobotoSlab-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-roboto-slab",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Football fans",
    default: "Football fans",
  },
  description: "The socail media app for football fans",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${robotoSlabVariable.variable} antialiased`}>
        <main>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </main>
      </body>
    </html>
  );
}
