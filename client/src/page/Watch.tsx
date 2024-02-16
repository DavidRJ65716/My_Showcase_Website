import { VideoPlayer } from "../components/VideoPlayer"
import { redirect, useSearchParams } from "react-router-dom";
import { videos } from "../data/VideoData"

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
    getData(v)
    //w-11/12 max-w-screen-2xl
    return(
        <div className="flex flex-row gap-5 justify-center  align-middle">
            <div className="flex px-6 pt-6 w-11/12"> {/*main container*/}
                <div className=" box-border max-w-screen-xl">
                    <VideoPlayer videotime = {0} videoUrl={"https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"} />
                </div>
                <div>{/*video info*/}
                    
                </div>
                <div className='hidden xs:flex'>{/*colom video grid container*/}
                   
                </div>
                <div>{/*Chat container*/}
                    
                </div>
            </div>
            <div className="flex flex-col">{/*Secondary container*/}
                <p>Side video grid</p>
            </div>
        </div>
    )
}