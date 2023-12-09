import { Clapperboard, Home, Library, Repeat } from "lucide-react";
import { ElementType, ReactNode } from "react";
import { buttonStyles } from "../components/Button";
import { twMerge } from 'tailwind-merge'


export function SideBar(){
    return (
        <>
        <aside className="sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex-col ml-1 hidden lg:flex">
            <SmallSidebarItem Icon={Home} title="Home" url="/"/>
            <SmallSidebarItem Icon={Repeat} title="Shorts" url="/shorts"/>
            <SmallSidebarItem Icon={Clapperboard} title="Subscription" url="/Subscription"/>
            <SmallSidebarItem Icon={Library} title="Library" url="/library"/>
        </aside>
        <aside className="w-56 sticky flex top-0 overflow-y-auto scrollbar-hidden pb-4 flex-col gap-2 px-2">
            <LargeSidebarSection>
                <LargeSidebarItem isActive Icon={Home} title="Home" url="/"/>
                <LargeSidebarItem Icon={Home} title="Home" url="/"/>
            </LargeSidebarSection>
            
        </aside>
        
        </>
    )
}

type SmallSidebarItemProps = {
    Icon: ElementType
    title: string
    url: string
    isActive?: boolean
}

type LargeSidebarItemProps = {
    Icon: ElementType
    title: string
    url: string
    isActive?: boolean
}

type LargeSidebarSectionPorps = {
    children: ReactNode
    title?: string
    visibleItemCount?: number
}

function SmallSidebarItem({ Icon,title, url}:SmallSidebarItemProps){
    return( 
        <a 
            href={url} 
            className={twMerge(
                buttonStyles({variant: "ghost"}),
                "py-4 px-1 flex flex-col items-center rounded-lg gap-1")}
        >
            <Icon className="w-5 h-5" />
            <div className="text-xs">
                {title}
            </div>
        </a>
    )
}

function LargeSidebarSection({ children }:LargeSidebarSectionPorps)  {
    return children
}

function LargeSidebarItem({ Icon,title, url, isActive = false}:LargeSidebarItemProps) {
    return(
        <a 
            href={url}
            className={twMerge(
                buttonStyles({variant: "ghost"}),
                `w-full flex items-center rounded-lg gap-4 p-3 
                ${isActive ? "font-bold bg-neutral-200 hover:bg-secondary" : undefined}`)}
        >
            <Icon className="w-5 h-5" />
            <div className="whitespace-nowrap overflow-hidden text-ellipsis text-xs">
                {title}
            </div>
        </a>
    )
}