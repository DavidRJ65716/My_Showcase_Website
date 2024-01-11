import { ElementType, ReactNode, useState, Children } from "react";
import { ChevronUp, ChevronDown} from "lucide-react";
import { Button, buttonStyles } from "../../../components/Button";
import { twMerge } from 'tailwind-merge'


type LargeSidebarItemProps = {
    IconOrImage: ElementType | string
    title: string
    url: string
    isActive?: boolean
    index: number
}

type LargeSidebarSectionPorps = {
    children: ReactNode
    title?: string
    visibleItemCount?: number
}

export function LargeSidebarSection({ 
    children,
    title,
    visibleItemCount = Number.POSITIVE_INFINITY
 }:LargeSidebarSectionPorps)  {
    
    const [isExpanded, setIsExpanded] = useState(false)
    const childrenArray = Children.toArray(children).flat()
    const showExpandButton = childrenArray.length > visibleItemCount
    const visibleChildren = isExpanded ? childrenArray : childrenArray.slice(0,visibleItemCount)
    const ButtonIcon = isExpanded ? ChevronUp : ChevronDown

    return( 
        <div>
            {title && 
                <div className="ml-4 mt-2 text-lg">
                    {title}    
                </div>
            }
            {visibleChildren}
            {showExpandButton && 
                <Button
                    onClick={() => setIsExpanded(e => !e)} 
                    variant="ghost" 
                    className="w-full flex items-center rounded-lg gap-4 p-3"
                >
                    <ButtonIcon className="w-5 h-5" />
                    <div className="text-sm">
                        {isExpanded ? "Show Less" : "Show More"}    
                    </div>    
                </Button>
            }
        </div>
    )
}

export function LargeSidebarItem({ IconOrImage,title, url, isActive = false }:LargeSidebarItemProps) {
    return(
        <a 
            href={url}
            className={twMerge(
                buttonStyles({variant: "ghost"}),
                `w-full flex items-center rounded-lg gap-4 p-3 
                ${isActive ? "font-bold bg-neutral-200 hover:bg-secondary" : undefined}`)}
        >   
            {typeof IconOrImage === "string" ? (
                <img src={IconOrImage} className="w-5 h-5 rounded-full" />
            ) : (
                <IconOrImage className="w-5 h-5" color={isActive? "#00aaff" : "black"}/>
            )}
            <div className="whitespace-nowrap overflow-hidden text-ellipsis text-sm">
                {title}
            </div>
        </a>
    )
}