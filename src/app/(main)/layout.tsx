import Footer from "@/components/partials/footer";
import Header from "@/components/partials/header";
import SpecialEventWinter from "@/components/special-event/Winter";
import { Suspense } from "react";



export default function PageLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <SpecialEventWinter />
            <Header />
            {children}
            <Footer />
        </>
    );
}
