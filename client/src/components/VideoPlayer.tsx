
type VideoPlayerPops = {
    videoUrl: string
}

export function VideoPlayer({videoUrl}:VideoPlayerPops) {
    //api call from database to get video info

    return (
        <div className=" box-border w-11/12 max-w-screen-lg  ">
            <video src={videoUrl} className=" w-full"/>
        </div>
    )
}