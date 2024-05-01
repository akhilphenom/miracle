import Image from "next/image"

export default function Loading () {
    return (
        <div className="h-dvh w-dvw flex flex-col justify-center items-center">
            <Image src={'/logo.png'} alt={"Logo"}
            width={200}
            height={200}
            className="duration-1000 animate-pulse"
            />
        </div>
    )
}