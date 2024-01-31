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
import { PageHeaderFirstSection } from "../PageHeader";



export function SideBarWatch(){
    
    const { isSmallOpen, close} = useSidebarContext()

    return(
        <>
            {isSmallOpen && (
                <div
                    onClick={close}
                    className="fixed inset-0 z-[999] bg-secondary-dark opacity-50"
                />
            )}
            <aside className= {`
                w-56 absolute top-0 overflow-y-auto scrollbar-hidden pb-4 flex-col gap-2 px-2
                ${isSmallOpen? "flex z-[999] bg-white max-h-screen" : "hidden"}
            `}>
                <div className="pt-2 pb-4 px-2 sticky top-0 bg-white">
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