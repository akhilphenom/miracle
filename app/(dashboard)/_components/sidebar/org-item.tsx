"use client";

import { Hint } from "@/components/shared/hint";
import { cn } from "@/lib/utils";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import Image from "next/image";

interface IProps {
    id: string,
    name: string
    imageUrl: string
}

export const OrganizationItem = ({
    id, name, imageUrl
}: IProps) => {
    const { organization } = useOrganization();
    const { setActive } = useOrganizationList();
    const isActive = organization?.id == id;
    const onClick = () => {
        setActive?.({ organization: id })
    }
    return (
        <div className="aspect-square relative">
            <Hint 
            label={name}
            side="right"
            sideOffset={20}
            align="start"
            >
                <Image 
                src={imageUrl} alt={name}
                fill
                onClick={onClick}
                className={cn(
                    "rounded-md cursor-pointer opacity-75 hover:opacity-100 transition-opacity",
                    isActive && "opacity-100"
                )}
                />
            </Hint>
        </div>
    )
}