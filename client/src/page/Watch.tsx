import { VideoPlayer } from "../components/VideoPlayer"
import { redirect, useSearchParams } from "react-router-dom";
import { videos } from "../data/VideoData"
import { useVideoPlayerContext } from "../contexts/VideoPlayerContext";
import { VideoPlayerProvider } from "../contexts/VideoPlayerContext"

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
        
            <div>
                <div className={`${isTheaterMode ? "" : "hidden"}`}>{/*theater mode*/}
                    <div className=" z-[-1] bg-black w-full h-full">
                    </div>
                    <div className="flex justify-center">
                        <VideoPlayer 
                            videoUrlTime={""}                
                            videoUrl={"https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"}
                        />
                    </div>
                </div>
                <div className="flex justify-center m-0 flex-row">{/*colum container*/}
                    <div className=""> {/*main container*/}
                        <div className={`box-border ${isTheaterMode ? "hidden" : " max-w-screen-xl pt-6 px-6 flex basis-0" }`}>
                        <VideoPlayer 
                            videoUrlTime={""}                
                            videoUrl={"https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"}
                            />
                        </div>
                        <div className="flex justify-center">{/*video info*/}
                            <p>video info</p>
                        </div>
                        <div className="hidden xs:flex justify-center">{/*colom video grid container*/}
                            <p>Side video grid</p>
                        </div>
                        <div className="flex justify-center">{/*Chat container*/}
                            <p>comment</p>
                        </div>
                    </div>
                    <div className="pr-6 pt-6 relative hidden lg:flex w-[406px] min-w-[300px]">{/*Secondary container*/}
                        <div className=" sticky top-0 ">
                            <p>Side video grid</p>
                        </div>
                        
                    </div>
                </div>
            </div>
    )
}