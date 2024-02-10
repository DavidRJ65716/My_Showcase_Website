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
    getData(v)
    
    return(
        <>
            <div>

                <div className="">
                    <VideoPlayer videoUrl={"https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"} />
                </div>
                <div>
                    <p>video info</p>
                </div>
                <div>
                    <p> chat </p>
                </div>
            </div>
            <div>
                <p>Side video grid</p>
            </div>
        </>
    )
}