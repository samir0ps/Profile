import type { Metadata } from "next";
import { Comfortaa } from "next/font/google";
import "./globals.css";
import Navbar from "./ui/Navbar";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import { ClerkProvider } from "@clerk/nextjs";
import ChatPopup from "./ui/components/chat";
import Provider from "./ui/components/provider";
import Snackbar from "./ui/Message";
import ConnectComponent from "./ui/components/ConnectComponent";

const comfortaa = Comfortaa({ weight: "400", subsets: ['latin', 'greek'] });
const ThemeProvider = dynamic(() => import("./ui/Themeprovider"), { ssr: false });

export const metadata: Metadata = {
  title: "Profile",
  description: "Samir's profile",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = cookies().get("__theme__")?.value || "system";

  return (
    <ClerkProvider>
      <Provider>
        <ConnectComponent>
          <html
            className={theme}
            lang="en"
          >
            <body className={comfortaa.className}>
              <ThemeProvider>
                <Navbar />
                {children}
                <ChatPopup />
                <Snackbar />
              </ThemeProvider>
            </body>
          </html>
        </ConnectComponent>
      </Provider>
    </ClerkProvider>
  );
}
