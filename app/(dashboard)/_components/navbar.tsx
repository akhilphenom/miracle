"use client";

import { UserButton } from "@clerk/nextjs";

export const Navbar = () => {
    return (
        <nav className="flex items-center gap-x-4 p-5 bg-green-400">
            <div className="hidden lg:flex flex-1">
                Search
            </div>
            <div>
                <UserButton/>
            </div>
        </nav>
    )
}