import Image from "next/image"

interface EmptyResultProps {
    url: string
    placeholder?: string;
    width?: number
    height?: number
}

export const EmptyResult = ({
    url,
    placeholder,
    width,
    height
}: EmptyResultProps) => {
    return (
        <div className="p-4 pb-0 flex flex-col justify-center items-center">
            <Image
            src={url}
            width={width ?? 200}
            height={height ?? 200}
            alt="No Data"
            />
            <h2 className="font-semibold mt-6 text-2xl">No Results Found</h2>
            {placeholder ? <p className="text-muted-foreground text-sm mt-2">{placeholder}</p> : null}
        </div>
    )
}