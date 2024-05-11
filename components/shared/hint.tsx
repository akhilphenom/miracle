import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

export interface HintProps {
    label: string;
    children: React.ReactNode;
    side?: 'top' | 'right' | 'bottom' | 'left',
    align?: 'start' | 'center' | 'end';
    sideOffset?: number
    alignOffset?: number
}

export const Hint = ({
    label, children, side, align, sideOffset, alignOffset
}: HintProps) => {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent
                className="text-white bg-black border-black z-200"
                side={side}
                sideOffset={sideOffset}
                align={align}
                alignOffset={alignOffset}
                >
                    <p className="font-semibold capitalize text-xs">{label}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}