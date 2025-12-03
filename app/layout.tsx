import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "./query-provider";
import { ReactNode } from 'react';

export const metadata: Metadata = {
    title: "Nightborn Todo",
    description: "A Nightborn Todo exercise",
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
        <body>
        <QueryProvider>
            {children}
        </QueryProvider>
        </body>
        </html>
    );
}



