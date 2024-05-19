import { Overlay } from "@/components/shared/overlay";
import Image from "next/image";
import Link from "next/link";

export interface IBoardCardItemProps extends Document {
    _id: string,
    title: string;
    organizationIdClerk?: string;
    authorIdClerk?: string;
    organizationId: string;
    authorId?: string;
    authorName: string;
    imageUrl: string;
    createdAt?: Date;
    updatedAt?: Date;
};

export const BoardCardItem = ({
    _id, title, organizationId, imageUrl, authorId, authorName, 
}: IBoardCardItemProps) => {
    return (
        <Link key={_id} href={`/board/${_id}`}>
            <div className="group border border-yellow-300 rounded-lg flex flex-col justify-between overflow-hidden aspect-[9/14]">
                <div className="relative flex-1 bg-amber-300 flex flex-col">
                    <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className=" object-contain"
                    />
                    <Overlay/>
                </div>
            </div>
        </Link>
    )
}