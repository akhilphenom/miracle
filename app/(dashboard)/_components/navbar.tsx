"use client";

import { OrganizationSwitcher, UserButton, useOrganization } from "@clerk/nextjs";
import { SearchInput } from "./search-input";
import { InviteButton } from "./sidebar/invite-button";

export const Navbar = () => {
    const { organization } = useOrganization();
    return (
        <nav className="flex items-center gap-x-4 p-5">
            <div className="hidden lg:flex flex-1">
                <SearchInput/>
            </div>
            <div className="flex lg:hidden flex-1">
                <OrganizationSwitcher
                hidePersonal
                appearance={{
                    elements: {
                        rootBox: {
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                            maxWidth: '400px',
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
                }}/>
            </div>
            { organization ? <InviteButton/> : null }
            <div>
                <UserButton/>
            </div>
        </nav>
    )
}