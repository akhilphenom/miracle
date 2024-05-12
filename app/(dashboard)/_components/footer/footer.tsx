import Image from "next/image"

export const Footer = () => {
    return (
        <div className="flex-1">
            <div className="bg-white p-[7px] rounded-sm mx-[5px] my-[7px]">
                <Image 
                src={'/logo.png'} 
                alt={"Logo"}
                width={60}
                height={60}
                />
            </div>
        </div>
    )
}