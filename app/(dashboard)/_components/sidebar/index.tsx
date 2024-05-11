import { AddOrganization } from "./add-organization"
import { OrganizationList } from "./org-list"
import Image from "next/image"

export const Sidebar = () => {
    return (
        <aside className="fixed h-full w-[60px] flex flex-col left-0 bg-blue-950 text-white">
            <div className="flex flex-col justify-center gap-y-4 p-3">
                <AddOrganization/>
                <OrganizationList/>
            </div>
            <div className="flex-1"></div>
            <div className="bg-white p-[7px] rounded-sm mx-[5px] my-[7px]">
                <Image 
                src={'/logo.png'} 
                alt={"Logo"}
                width={60}
                height={60}
                />
            </div>
        </aside>
    )
}