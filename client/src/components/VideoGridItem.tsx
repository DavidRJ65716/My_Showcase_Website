import { useEffect, useRef, useState } from "react"
import { FormatDuration } from "../utils/FormatDuration"
import { FormatTimeAgo } from "../utils/FormatTimeAgo"
import { Link } from "react-router-dom"

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

const VIEW_FORMATER = new Intl.NumberFormat(undefined, { notation:"compact" })

export function VideoGridItem({
    id,
    title,
    channel,
    views,
    postedAt,
    duration,
    thumbnailUrl,
    videoUrl,
}: VideoGridItemProps) {

    const [isVideoPlaying, setIsVideoPlaying] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {

        if (videoRef.current == null) return

        if (isVideoPlaying){
            videoRef.current.currentTime = 0
            videoRef.current.play()
        } else {
            videoRef.current.pause()
        }
    }, [isVideoPlaying])

    return (
        <div 
            className="flex flex-col gap-2" 
            onMouseEnter={() => setIsVideoPlaying(true)} 
            onMouseLeave={() => setIsVideoPlaying(false)}
        >
            <Link to={`/watch?v=${id}`} className="relative aspect-video">
                <img 
                    src={thumbnailUrl} 
                    className={`block w-full h-full object-cover transition-[border-radius] duration-200 
                        ${isVideoPlaying ? "rounded-none" : "rounded-xl"}`}
                />
                <div 
                    className="
                        absolute 
                        bottom-1 
                        right-1 
                        bg-secondary-dark 
                        text-secondary 
                        text-sm 
                        px-0.5 
                        rounded"
                >
                    {FormatDuration(duration)}
                </div>
                <video 
                    className={`
                        block 
                        h-full 
                        object-cover 
                        absolute 
                        inset-0 
                        transition-opacity 
                        duration-200
                        ${isVideoPlaying ? "opacity-100 delay-200" : "opacity-0"}
                    `}
                    ref={videoRef} 
                    muted={true}
                    playsInline={true}
                    autoPlay={false}
                    src={`${videoUrl}`}
                />
            </Link>
            <div className="flex gap-2">
                <Link to={`/@${channel.id}`} className="flex-shrink-0">
                    <img className="w-12 h-12 rounded-full" src={`${channel.profileUrl}`}/>
                </Link>
                <div className="flex flex-col">
                    <h3 className="leading-5">
                        <Link to={`/watch?v=${id}`} className="font-bold">
                            {title}
                        </Link>
                    </h3>
                    <Link to={`/@${channel.id}`} className="text-secondary-text text-sm">
                        {channel.name}
                    </Link>
                    <div className="text-secondary-text text-sm flex flex-row">
                        <span>
                            {VIEW_FORMATER.format(views)} views 
                        </span>
                        <span className="px-1 0">
                            • {FormatTimeAgo(postedAt)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}