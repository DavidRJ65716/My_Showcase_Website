import { useParams,  } from "react-router-dom"


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
    videoUrl: string
}

export function VideoPlayer(){

    const { v } = useParams();
    //api call from database to get video info

    return (
        <div className=" box-border w-11/12 max-w-screen-lg  ">
            <video src="" className=" w-full"/>
        </div>
    )
}