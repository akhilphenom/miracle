export interface IBoardCardItemProps extends Document {
    id: string,
    title: string;
    organizationIdClerk?: string;
    authorIdClerk?: string;
    organizationId: string;
    authorId?: string;
    authorName: string;
    imageUrl?: string;
};

export const BoardCardItem = ({
    id, title, organizationId, imageUrl
}: IBoardCardItemProps) => {
    return (
        <div key={id}>
            {title}
        </div>
    )
}