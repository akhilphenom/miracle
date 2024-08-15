"use client";

import { useOrganization } from "@clerk/nextjs";
import { EmptyOrganization } from "./_components/empty-organization"
import { BoardList } from "./_components/board-list";
import { ModalProvider } from "@/providers/modal-provider";

interface DashboardPageProps {
    searchParams: {
        search?: string;
        favourites?: string;
    }
}

const DashboardPage = ({
    searchParams
}: DashboardPageProps) => {
    const { organization } = useOrganization();

    return (
        <div className="h-full w-full flex p-5 flex-1 flex-col min-h-0 basis-0">
            { organization?.id ?  
                <>
                    <BoardList organizationId={organization.id} query={searchParams}/>
                    <ModalProvider/>
                </>
            : <EmptyOrganization/> }
        </div>
    )
}

export default DashboardPage