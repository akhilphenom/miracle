import { Overlay } from "@/components/shared/overlay";
import { useAuth } from "@clerk/nextjs";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import Footer from "./footer";
import { Skeleton } from "@/components/ui/skeleton";
import Actions from "@/components/actions";
import { MoreHorizontal } from "lucide-react";
import { useBoardContext } from "@/providers/boards-provider";

export interface IBoardCardItemProps {
    _id: string,
    title: string;
    organizationIdClerk?: string;
    authorIdClerk?: string;
    organizationId: string;
    authorId?: string;
    authorName: string;
    imageUrl: string;
    createdAt: Date;
    updatedAt?: Date;
    favourite: boolean;
    disableEvents: boolean
    onBoardDelete: (_id: string) => void
};

export const BoardCardItem = ({
    _id, title, organizationId, disableEvents, favourite, imageUrl, authorId, authorName, createdAt, onBoardDelete
}: IBoardCardItemProps) => {
    const { userId } = useAuth();
    const { toggleFavourite } = useBoardContext();
    const authorLabel = userId == authorId? 'You' : authorName;
    const createdAtLabel = formatDistanceToNow(createdAt, {
        addSuffix: true
    })

    return (
        <div className="group border border-slate-300 rounded-lg flex flex-col justify-between overflow-hidden aspect-[9/14]">
            <Link href={`/board/${_id}`} className="relative flex-1 bg-amber-300 flex flex-col">
                <Image
                src={imageUrl}
                alt={title}
                fill
                className="object-contain"
                />
                <Overlay/>
                <Actions
                _id={_id}
                title={title}
                side={'right'}
                sideOffset={0}
                onBoardDelete={onBoardDelete}
                >
                    <button disabled={disableEvents} onClick={e =>e.preventDefault()} className="absolute z-50 right-0 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none">
                        <MoreHorizontal className="text-white opacity-75 hover:opacity-100 transition-opacity"/>
                    </button>
                </Actions>
            </Link>
            <Footer
            isFavourite={favourite}
            title={title}
            authorLabel={authorLabel}
            createdAtLabel={createdAtLabel}
            toggleFavourite={() => toggleFavourite(_id)}
            disabled={false}
            />
        </div>
    )
}

export const BoardCardItemSkeleton = () => (
    <div className="group border-slate-300 rounded-lg flex flex-col justify-between overflow-hidden aspect-[9/14]">
        <Skeleton className="h-full w-full"></Skeleton>
    </div>
)