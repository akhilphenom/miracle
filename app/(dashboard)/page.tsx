"use client";

import { useOrganization } from "@clerk/nextjs";
import { EmptyOrganization } from "./_components/empty-organization"
import { BoardList } from "./_components/board-list";

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
        <div className="h-full w-full flex p-5 flex-1">
            { organization ?  <BoardList organizationId={organization.id} query={searchParams}/> : <EmptyOrganization/> }
        </div>
    )
}

export default DashboardPage