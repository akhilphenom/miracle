"use client"

import { useOrganizationList } from "@clerk/nextjs"
import { OrganizationItem } from "./org-item";

export const OrganizationList = () => {
    const { userMemberships } = useOrganizationList({
        userMemberships: {
            infinite: true
        }
    })
    if(!userMemberships.data?.length) {
        return null;
    }
    return (
        <ul className="space-y-4">
            {userMemberships.data.map(({ organization: { id, name, imageUrl } }) => (
                <OrganizationItem id={id} name={name} imageUrl={imageUrl}/>
            ))}
        </ul>
    )
}