import { 
    Clapperboard, 
    Home, 
    Library, 
    Repeat, 
    ListVideo, 
    ChevronUp, 
    ChevronDown, 
    HelpCircle,  
    History
} from "lucide-react";
import { ElementType, ReactNode, useState } from "react";
import { Button, buttonStyles } from "../components/Button";
import { twMerge } from 'tailwind-merge'
import { Children } from "react";
import { playlist } from "../data/PlayListData";
import { subscriptions } from "../data/SubscriptionData";




export function SideBar(){
    //const { isLargeOpen, isSmallOpen, close } = useSidebarContext()
    const [isSmallOpen] = useState(true)
    const [isLargeOpen] = useState(true)
    
    return (
        <>
        <aside className= {`
            sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex-col ml-1
            ${isLargeOpen ? "hidden" : "hidden lg:flex" }`
        }>
            <SmallSidebarItem Icon={Home} title="Home" url="/" index={0}/>
            <SmallSidebarItem Icon={Repeat} title="Shorts" url="/shorts" index={1}/>
            <SmallSidebarItem Icon={Clapperboard} title="Subscription" url="/Subscription" index={2}/>
            <SmallSidebarItem Icon={Library} title="You" url="/library" index={3}/>
        </aside>
        {isSmallOpen && (
            <aside className="w-56 sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col gap-2 px-2">
                <LargeSidebarSection visibleItemCount={4}>
                    <LargeSidebarItem isActive IconOrImage={Home} title="Home" url="/" index={0}/>
                    <LargeSidebarItem IconOrImage={Repeat} title="Shorts" url="/shorts" index={1}/>
                    <LargeSidebarItem IconOrImage={Clapperboard} title="Subscription" url="/Subscription" index={2}/>
                </LargeSidebarSection>
                <hr className=""/>
                <LargeSidebarSection visibleItemCount={6} >
                    <LargeSidebarItem IconOrImage={Library} title=">" url="/library" index={3}/>
                    <LargeSidebarItem isActive IconOrImage={Library} title="Your channel" url="/" index={4}/>
                    <LargeSidebarItem isActive IconOrImage={History} title="History" url="/" index={5}/>
                    <LargeSidebarItem isActive IconOrImage={HelpCircle} title="Your videos" url="/" index={6}/>
                    <LargeSidebarItem isActive IconOrImage={HelpCircle} title="Your movies & TV" url="/" index={5}/>
                    <LargeSidebarItem isActive IconOrImage={HelpCircle} title="Watch later" url="/" index={5}/>
                    <LargeSidebarItem isActive IconOrImage={HelpCircle} title="Licked videos" url="/" index={5}/>
                    {playlist.map(playlist => (
                        <LargeSidebarItem 
                            key={playlist.id}
                            isActive 
                            IconOrImage={ListVideo} 
                            title={playlist.name} 
                            url={`/playlist?list=${playlist.id}`} 
                            index={5}
                        />
                    ))}
                </LargeSidebarSection>
                <hr className=""/>
                <LargeSidebarSection visibleItemCount={7} title="Subscriptions">
                    {subscriptions.map(subs=>(                                 
                        <LargeSidebarItem 
                            key={subs.id}
                            isActive 
                            IconOrImage={subs.imgUrl} 
                            title={subs.channelName} 
                            url={`/@${subs.channelName}`} 
                            index={5}
                        />
                    ))}
                </LargeSidebarSection>
                <hr className=""/>
                <LargeSidebarSection title="Explore">
                    <LargeSidebarItem IconOrImage={Library} title=">" url="/library" index={3}/>
                    <LargeSidebarItem IconOrImage={Library} title=">" url="/library" index={3}/>
                    <LargeSidebarItem IconOrImage={Library} title=">" url="/library" index={3}/>
                    <LargeSidebarItem IconOrImage={Library} title=">" url="/library" index={3}/>
                </LargeSidebarSection>
            </aside>
        )}    
        
        </>
    )
}

type SmallSidebarItemProps = {
    Icon: ElementType
    title: string
    url: string
    isActive?: boolean
    index: number
}

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

function SmallSidebarItem({ Icon,title, url, isActive = false}:SmallSidebarItemProps){
    return( 
        <a 
            href={url} 
            className={twMerge(
                buttonStyles({variant: "ghost"}),
                "py-4 px-1 flex flex-col items-center rounded-lg gap-1")}
        >
            <Icon className="w-5 h-5" color={isActive? "#00aaff" : "black"}/>
            <div className="text-xs">
                {title}
            </div>
        </a>
    )
}

function LargeSidebarSection({ 
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

function LargeSidebarItem({ IconOrImage,title, url, isActive = false }:LargeSidebarItemProps) {
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