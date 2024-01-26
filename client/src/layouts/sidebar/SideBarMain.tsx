import { 
    Clapperboard, 
    Home, 
    Library, 
    Repeat, 
    ListVideo,
    HelpCircle,  
    History
} from "lucide-react";
import { playlist } from "../../data/PlayListData";
import { subscriptions } from "../../data/SubscriptionData";
import { useSidebarContext } from "../../contexts/SidebarContext";
import { LargeSidebarSection, LargeSidebarItem } from "./components/LargeSideBarComp";
import { SmallSidebarItem } from "./components/SmallSideBarComp";
import { PageHeaderFirstSection } from "../PageHeader";

export function SideBarMain(){
    //const { isLargeOpen, isSmallOpen, close } = useSidebarContext()
    //const [isSmallOpen] = useState(true)
    //const [isLargeOpen] = useState(false)
    
    const { isLargeOpen, isSmallOpen, close} = useSidebarContext()

    return (
        
        <>
            <aside className= {`
                sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col ml-1 xs:hidden
                ${isLargeOpen ? "lg:hidden" : " lg:flex" }
            `}>
                <SmallSidebarItem Icon={Home} title="Home" url="/" index={0}/>
                <SmallSidebarItem Icon={Repeat} title="Shorts" url="/shorts" index={1}/>
                <SmallSidebarItem Icon={Clapperboard} title="Subscription" url="/Subscription" index={2}/>
                <SmallSidebarItem Icon={Library} title="You" url="/library" index={3}/>
            </aside>
            
            {isSmallOpen && (
                <div
                    onClick={close}
                    className="lg:hidden fixed inset-0 z-[999] bg-secondary-dark opacity-50"
                />
            )}
            
            <aside className= {`
                    w-56 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-4 flex-col gap-2 px-2
                    ${isLargeOpen? "lg:flex": "lg:hidden"}
                    ${isSmallOpen? "flex z-[999] bg-white max-h-screen" : "hidden"}
                `}>
                <div className="lg:hidden pt-2 pb-4 px-2 sticky top-0 bg-white">
                    <PageHeaderFirstSection />
                </div>
                <LargeSidebarSection visibleItemCount={4}>
                    <LargeSidebarItem isActive IconOrImage={Home} title="Home" url="/" index={0}/>
                    <LargeSidebarItem IconOrImage={Repeat} title="Shorts" url="/shorts" index={1}/>
                    <LargeSidebarItem IconOrImage={Clapperboard} title="Subscription" url="/subscription" index={2}/>
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
        </>
    )
}

