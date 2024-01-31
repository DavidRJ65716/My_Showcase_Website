import { VideoPlayer } from "../components/VideoPlayer"
import { useSearchParams } from "react-router-dom";
import { videos } from "../data/VideoData"

type VideoGridItemProps ={
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
    videoUrl: string
}

function getData(v: string|null){

    
}

export default function Watch() {
    
    const [searchParams] = useSearchParams();
    const  v  = searchParams.get('v');
    getData(v)
    
    return(
        <>
            <div>
                <div className="">
                    <VideoPlayer videoUrl={""} />
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