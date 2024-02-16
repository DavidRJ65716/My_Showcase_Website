import { Play, Pause, Speaker, Volume, Volume1, Volume1Icon, Volume2 } from "lucide-react"
import { Button } from "./Button"
import { useEffect, useRef, useState } from "react"

type VideoPlayerPops = {
    videoUrl: string
    videotime: number
}

export function VideoPlayer({videoUrl, videotime}:VideoPlayerPops) {

    const [isVideoPlaying, setIsVideoPlaying] = useState(true)
    const [isContolShowing, setIsControlShowing] = useState(false)
    const [isMuted, setIsMuted] = useState(true)
    const videoRef = useRef<HTMLVideoElement>(null)
    
    useEffect(()=>{
        
        if (videoRef.current == null) return

        if (isVideoPlaying){
            videoRef.current.currentTime = videotime
            videoRef.current.play()
            setIsControlShowing(false)
        } else {
            videoRef.current.pause()
            setIsControlShowing(true)
        }
        console.log(isVideoPlaying)

    },[isVideoPlaying])

    function videoPlayToggle() {
        setIsVideoPlaying(v => !v)
    }

    function videoMuteToggle() {
        setIsMuted(m => !m)
    }

    //group-hover:opacity-100 opacity-0 group-focus-within:opacity-100 max-w-screen-lx
    return (

        <div 
            className='  relative group'
        >{/*video container*/}
            <div 
                className={`transition-opacity ${isContolShowing ? "opacity-100" : "group-hover:opacity-100 opacity-0"}`}
            >{/*video controll conatiner*/}
                <div>{/*time-line container*/}

                </div>
                <div className={`absolute bottom-0 inset-x-0 z-[100] flex`}>{/*video Controlls*/}
                    <div className="flex justify-center gap-4 px-5 py-2"> {/*controls left side*/}                    
                        <div className=''>{/*play button*/}
                            <Button onClick={videoPlayToggle} variant={"player"} size={"player"}>
                                <Play className={`${isVideoPlaying && "hidden"}`} color="white"/>
                                <Pause className={`${!isVideoPlaying && "hidden" }`} color="white"/>
                            </Button>
                        </div>
                        <div>{/*volume button*/}
                            <Button className={``}
                                onClick={videoMuteToggle} 
                                variant={"player"} 
                                size={"player"}
                            >
                                <Volume2 color="white"/>
                            </Button>
                        </div>
                        <div> {/*time duration*/}

                        </div>
                    </div>
                </div>
            </div>
            <video 
                src={`${videoUrl}`} 
                ref={videoRef}
                muted={isMuted}
                playsInline={true}
                className="w-full"
                onClick={videoPlayToggle}
                />
        </div>
    )
}