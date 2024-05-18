import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { CreateOrganization } from "@clerk/nextjs"
import Image from "next/image"

export const EmptyOrganization = () => {
    return (
        <div className="h-full w-full flex flex-col items-center">
            <Image alt="No data" src={'./empty.svg'} width={400} height={400}/>
            <h2 className=" text-3xl pt-5 pb-1 px-1 font-semibold">Welcome to Miracle!</h2>
            <p className="text-sm text-muted-foreground">Create an organization to get started</p>
            <div className="p-5">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button size={'lg'}>
                            Create Organization
                        </Button>
                    </DialogTrigger>
                    <DialogContent 
                    autoFocus={false}
                    className="p-0 max-w-[fit-content] bg-transparent border-0">
                        <CreateOrganization/>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}