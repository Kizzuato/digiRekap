import { Outfit } from "next/font/google";
import "./globals.css";

// import { SidebarProvider } from "@/context/SidebarContext";
// import { ThemeProvider } from "@/context/ThemeContext";

// import { getSheetData } from "@/_lib/readSheet";
const outfit = Outfit({
  variable: "--font-outfit-sans",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    // const data = await getSheetData()
    // console.log("data: ", data)
  return (
    <html lang="en">
      <body className={`${outfit.variable} dark:bg-gray-900`}>
        {/* <ThemeProvider> */}
          {/* <SidebarProvider>
            </SidebarProvider> */}
            {children}
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
