"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useBoardContext } from "@/providers/boards-provider";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { LayoutDashboard, Star } from "lucide-react";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const font = Poppins({
    subsets: ['latin'],
    weight: ['600']
})

export const OrganizationSidebar = () => {
    const searchParams = useSearchParams();
    const favourites = searchParams.get('favourites');
    const { setFavourites } = useBoardContext();
    
    return (
        <div className="hidden lg:flex flex-col space-y-6 pl-[2rem] pr-[0.5rem] pt-5 w-[300px]">
            <Link href={""}>
                <div className="gap-x-2 flex justify-center">
                    <div className="flex flex-col gap-y-0">
                        <div className="flex-1"></div>
                        <div className={cn(
                            "font-light text-2xl",
                            font.style
                        )}>
                            Organization
                        </div>
                        <div className={cn(
                            "font-light text-xs text-center",
                            font.style
                        )}>
                            Boards
                        </div>
                    </div>
                </div>
            </Link>
            <OrganizationSwitcher
            hidePersonal
            appearance={{
                elements: {
                    rootBox: {
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        background: 'snowwhite'
                    },
                    organizationSwitcherTrigger: {
                        padding: '6px',
                        width: '100%',
                        borderRadius: '8px',
                        border: '0.5px solid #e5e5e5',
                        justifyContent: 'space-between',
                    }
                }
            }}
            />
            <div className="space-y-1 w-full">
                <Button asChild size={'default'} className="w-full justify-start" variant={ favourites? 'ghost' : 'secondary' } onClick={() => setFavourites(false)}>
                    <Link href={"/"}>
                        <LayoutDashboard className="m-2 h-4"/>
                        Team Boards
                    </Link>
                </Button>
                <Button asChild size={'default'} className="w-full justify-start" variant={ !favourites? 'ghost' : 'secondary'}>
                    <Link href={{pathname: '/', query: { favourites: true }}} onClick={() => setFavourites(true)}>
                        <Star className="m-2 h-4"/>
                        Favourite Boards
                    </Link>
                </Button>
            </div>
        </div>
    )
}