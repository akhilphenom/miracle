import { AddOrganization } from "./add-organization"
import { OrganizationList } from "./org-list"

export const Sidebar = () => {
    return (
        <aside className="fixed h-full w-[60px] flex flex-col left-0 bg-blue-950 text-white z-50">
            <div className="flex flex-col justify-center gap-y-4 p-3">
                <AddOrganization/>
                <OrganizationList/>
            </div>
        </aside>
    )
}