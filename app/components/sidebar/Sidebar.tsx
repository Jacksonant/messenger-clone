import { Suspense } from "react";
import LoadingModal from "../LoadingModal";
import DesktopSidebar from "./DesktopSidebar";
import MobileFooter from "./MobileFooter";

import getCurrentUser from "@/app/actions/getCurrentUser";

export default async function Sidebar({
    children,
}: {
    children: React.ReactNode;
}) {

    const currentUser = await getCurrentUser()

    return (
        <Suspense fallback={<LoadingModal />}>
            <div className="h-full">
                <DesktopSidebar currentUser={currentUser!} />
                <MobileFooter />
                <main className="lg:pl-20 h-full">
                    {children}
                </main>
            </div>
        </Suspense>
    );
}