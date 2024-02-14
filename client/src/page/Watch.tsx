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
    
    return(
        <div className="flex gap-0 ms-auto me-auto">
            <div className="">
                <div className=" box-border flex justify-center ">
                    <VideoPlayer videotime = {0} videoUrl={"https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"} />
                </div>
                <div>
                    <p>video info</p>
                </div>
                <div>
                    <p> chat </p>
                </div>
            </div>
            <div className="flex">
                <p>Side video grid</p>
            </div>
        </div>
    )
}