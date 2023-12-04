"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';


export default function ProviderLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <ProgressBar
                options={{ showSpinner: false }}
            />
            <SessionProvider>
                {children}
            </SessionProvider >
        </>
    );
}