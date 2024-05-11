"use client";

import { Hint } from "@/components/shared/hint";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CreateOrganization } from "@clerk/nextjs";
import { Plus } from "lucide-react";

export const AddOrganization = () => {
    return (
        <Dialog>
            <DialogTrigger>
                <div className="aspect-square">
                    <Hint 
                    label={"Create Organization"}
                    side="right"
                    sideOffset={20}
                    align="start"
                    >
                        <button className="bg-white/25 h-full w-full rounded-md flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity">
                            <Plus className="text-white"></Plus>
                        </button>
                    </Hint>
                </div>
            </DialogTrigger>
            <DialogContent className="p-0 bg-transparent border-none max-w-[480px]">
                <CreateOrganization></CreateOrganization>
            </DialogContent>
        </Dialog>
    )
}