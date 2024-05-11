"use client";

import { UserButton } from "@clerk/nextjs";
import { SearchInput } from "./search-input";

export const Navbar = () => {
    return (
        <nav className="flex items-center gap-x-4 p-5">
            <div className="hidden lg:flex flex-1">
                <SearchInput/>
            </div>
            <div>
                <UserButton/>
            </div>
        </nav>
    )
}