import { VideoPlayer } from "../components/VideoPlayer"
import { redirect, useSearchParams } from "react-router-dom";
import { videos } from "../data/VideoData"
import { useVideoPlayerContext } from "../contexts/VideoPlayerContext";

type VideoPlayerProps ={
    id: string,
    title: string,
    channel: {
        name: string,
        id: string,
        profileUrl: string,
    },
    views: number,
    postedAt: Date,
    duration: number,
    thumbnailUrl: string,
    videoUrl: string|null
}

function getData(v: string|null){
    if(!v)redirect("/")

}

export default function Watch() {
    
    const [searchParams] = useSearchParams();
    const  v  = searchParams.get('v');
    const t = searchParams.get('t')
    const { isTheaterMode } = useVideoPlayerContext()
    getData(v)


    //box-border 
    return(
        <div className="flex justify-center mx-auto overflow-x-hidden">
            <div className=""> {/*main container*/}
                <div className={`box-border ${isTheaterMode ? "h-screen w-[90vw] absolute" : "max-w-screen-xl px-6" }`}>
                    <VideoPlayer 
                        videoUrlTime={t}
                        
                        videoUrl={"https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"}
                    />
                </div>
                <div>{/*video info*/}
                    
                </div>
                <div className="hidden xs:flex">{/*colom video grid container*/}
                   
                </div>
                <div>{/*Chat container*/}
                    
                </div>
            </div>
            <div className="pr-6 border-solid border-black  hidden lg:flex">{/*Secondary container*/}
                <div className="sticky top-0 "></div>
                <p>Side video grid</p>
            </div>
        </div>
    )
}