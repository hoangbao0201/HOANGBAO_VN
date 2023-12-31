import "./globals.scss";
import type { Metadata } from "next";
import ProviderLayout from "@/components/modules/Provider";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="vi" className="scroll-pt-20">
            <body>
                <ProviderLayout>
                    {children}
                </ProviderLayout>
                <ToastContainer
                    limit={1}
                />
            </body>
        </html>
    );
}
