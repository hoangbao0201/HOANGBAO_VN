"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { Provider } from "react-redux";
import store from "@/redux/store";


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
                <Provider store={store}>{children}</Provider>
            </SessionProvider >
        </>
    );
}
