import { ElementType } from "react";
import { twMerge } from "tailwind-merge";
import { buttonStyles } from "../../../components/Button";
import { Link } from "react-router-dom";

type SmallSidebarItemProps = {
    Icon: ElementType
    title: string
    url: string
    isActive?: boolean
    index: number
}

export function SmallSidebarItem({ Icon,title, url, isActive = false}:SmallSidebarItemProps){
    return( 
        <Link 
            to={url} 
            className={twMerge(
                buttonStyles({variant: "ghost"}),
                "py-4 px-1 flex flex-col items-center rounded-lg gap-1")}
        >
            <Icon className="w-5 h-5" color={isActive? "#00aaff" : "black"}/>
            <div className="text-xs">
                {title}
            </div>
        </Link>
    )
}

