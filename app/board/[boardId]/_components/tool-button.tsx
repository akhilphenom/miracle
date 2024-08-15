import { Hint } from "@/components/shared/hint";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface IToolButtonProps {
    label: string,
    icon: LucideIcon,
    onClick: () => void,
    isActive: boolean,
    isDisabled: boolean
}

export const ToolButton = ({
    label, icon: Icon, onClick, isActive, isDisabled
}: IToolButtonProps) => {
    return (
        <Hint label={label} side={'right'} sideOffset={10}>
            <Button disabled={isDisabled} onClick={onClick} variant={isActive? 'toolActive' : 'tool'} className="px-3 py-1">
                <Icon width={20} height={20}/>
            </Button>
        </Hint>
    )
}