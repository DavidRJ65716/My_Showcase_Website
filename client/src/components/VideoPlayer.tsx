import { Play, Pause, VolumeX, Volume1, Volume2 } from "lucide-react"
import { Button } from "./Button"
import { useEffect, useRef, useState } from "react"

type VideoPlayerPops = {
    videoUrl: string
    videoTime: number
}

export function VideoPlayer({videoUrl, videoTime = 0}:VideoPlayerPops) {

    const [isVideoPlaying, setIsVideoPlaying] = useState(false)
    const [isContolShowing, setIsControlShowing] = useState(false)
    const [isMuted, setIsMuted] = useState(false)
    const [volumeLevel, setVolumeLevel] = useState(50)
    const [sliderLevel, setSliderLevel] = useState(50)
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(()=> {
        
        window.addEventListener("focus",onFocus)
        videoPlayToggle()

        return () => {
            window.removeEventListener("focus",onFocus)
        }

    },[])

    const onFocus = () =>{
        console.log("tab is focus")
    }

    const videoPlayToggle = () => {
        setIsVideoPlaying(v => !v)
        if (videoRef.current == null) return

        if (isVideoPlaying){
            videoRef.current.currentTime = videoTime
            videoRef.current.play()
            setIsControlShowing(false)
        } else {
            videoRef.current.pause()
            setIsControlShowing(true)
        }
    }

    //0 to 100 are the only numbers in scope
    const setVideoVolume = (newVolume: number) => {
        if (videoRef.current == null) return
        videoRef.current.volume = newVolume/100
    }

    const videoMuteToggle = () => {
        setIsMuted(m => !m)
    }

    const volumeHandler = (newVolume: React.ChangeEvent<HTMLInputElement>) => {
        setVolumeLevel(Number(newVolume.target.value))
        if (volumeLevel === 0) {
            setSliderLevel(0)
            setIsMuted(true)
        } else {
            setIsMuted(false)
            setSliderLevel(volumeLevel)
            setVideoVolume(volumeLevel)
        }
    }

    return (

        <div 
            className="relative group/control"
        >{/*video container*/}
            <div 
                className={`transition-opacity ${isContolShowing ? "opacity-100" : "group-hover/control:opacity-100 opacity-0"} 
            `}>{/*video controll conatiner*/}
                <div>{/*time-line container*/}
                </div>
                <div className="bottom-0 absolute bg-gradient-to-t w-full from-black to-transparent aspect-[6/1] opacity-50"></div>{/*Bottom gradiant*/}
                <div className={`absolute bottom-0 inset-x-0 z-[100] flex justify-between px-3`}>{/*video Controlls*/}
                    <div className="flex justify-center flex-nowrap"> {/*controls left side*/}                    
                        <div>{/*play button*/}
                            <Button
                                className="flex items-center" 
                                onClick={videoPlayToggle} 
                                variant={"player"} 
                                size={"player"}
                            >
                                <Play className={`
                                    ${!isVideoPlaying && "hidden"}`}
                                    color="white"
                                />
                                <Pause className={`${isVideoPlaying && "hidden" }`} color="white"/>
                            </Button>
                        </div>
                        <div className="group/volume flex flex-row ">{/*volume button*/}
                            <Button className={`flex items-center`}
                                onClick={videoMuteToggle} 
                                variant={"player"} 
                                size={"player"}
                            >
                                <VolumeX className={`${!isMuted && "hidden"}`} color="white" />
                                <Volume1 className={`${sliderLevel >= 50 && "hidden"} ${isMuted && "hidden"}`} color="white"/>
                                <Volume2 className={`${sliderLevel < 50 && "hidden"} ${isMuted && "hidden"}`} color="white"/>
                            </Button>
                            <div className="flex items-center px-2 py-4 ">
                                <input 
                                    className="w-0 origin-left scale-x-0 transition-transform group-hover/volume:w-[100px] group-hover/volume:scale-x-100"
                                    type="range"
                                    min="0"
                                    max="100"
                                    
                                    value={sliderLevel}
                                    onChange={volumeHandler}
                                />
                            </div>
                            
                        </div>
                        <div className="flex items-center flex-row"> {/*time duration*/}
                            <p>time</p>
                        </div>
                    </div>
                    <div className="flex justify-center gap-6 px-6">{/*Controls right side*/}
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <p>theater</p>
                    </div>
                </div>
            </div>
            <video 
                className="block w-full"
                src={`${videoUrl}`} 
                ref={videoRef}
                muted={isMuted}
                playsInline={true}
                onClick={videoPlayToggle}
            />
        </div>

    )
}