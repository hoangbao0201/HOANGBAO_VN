import Footer from "@/components/partials/footer";
import Header from "@/components/partials/header";
import SpecialEventWinter from "@/components/special-event/Winter";

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
