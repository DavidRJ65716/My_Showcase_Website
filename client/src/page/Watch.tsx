import { VideoPlayer } from "../components/VideoPlayer"
import { VideoPlayerTheater } from "../components/VideoTheater"
import { SetURLSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import { videos } from "../data/VideoData";
import { useVideoPlayerContext } from "../contexts/VideoPlayerContext";
import { useEffect } from "react";


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
    
    if(v === null)return true
    
    return false
}

function getTime(searchParams: URLSearchParams, setSearchParams: SetURLSearchParams ){
    const t = searchParams.get('t')
    console.log(t)
    if(t === null){
        return 0
    }

    if(t === "") {
        searchParams.delete('t')
        console.log("blank")
        return 0
    }
    return parseInt(t)
}

export default function Watch() {
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams();
    const  v  = searchParams.get('v');
    var t = getTime(searchParams, setSearchParams)
    const { isTheaterMode } = useVideoPlayerContext()
    const redirect = getData(v)    
    
    useEffect(() => {
        if (redirect) return navigate("/")
        setSearchParams(searchParams)
    }, [t])

    return(
        <div>
            <div className={`${isTheaterMode ? "" : "hidden"}`}>{/*theater mode*/}
                <div className="flex justify-center">
                    <VideoPlayer 
                        videoUrlTime={t}                
                        videoUrl={"https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"}
                    />
                </div>
            </div>
            <div className="flex justify-center m-0 flex-row">{/*colum container*/}
                <div className=""> {/*main container*/}
                    <div className={`box-border ${isTheaterMode ? "hidden" : " max-w-screen-xl pt-6 px-6 flex basis-0" }`}>
                        <VideoPlayerTheater      
                            videoUrl={"https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"} 
                            videoUrlTime={t}                        />
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