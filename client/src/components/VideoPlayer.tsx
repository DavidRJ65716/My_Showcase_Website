import { Play, Pause, VolumeX, Volume1, Volume2 } from "lucide-react"
import { Button } from "./Button"
import { useEffect, useRef, useState } from "react"
import { FormatDuration } from "../utils/FormatDuration"

type VideoPlayerPops = {
    videoUrl: string
    videoTime: string|null
    duration: number
}

export function VideoPlayer({videoUrl, videoTime, duration}:VideoPlayerPops) {

    const [isVideoPlaying, setIsVideoPlaying] = useState(true)
    const [isContolShowing, setIsControlShowing] = useState(false)
    const [isMuted, setIsMuted] = useState(true)
    const [volumeLevel, setVolumeLevel] = useState(0)
    const [sliderLevel, setSliderLevel] = useState(0)
    const videoRef = useRef<HTMLVideoElement>(null)
    const [videoTimer, setVideoTimer] = useState("")

    useEffect(()=> {
        
        //window.addEventListener("focus",onFocus)
        if (videoRef.current == null) return
        setIsVideoPlaying(false)
        if (isVideoPlaying){
            videoRef.current.currentTime = 0
            videoRef.current.play()
        } else {
            videoRef.current.pause()
            setIsControlShowing(true)
        }
        
        return () => {
            //window.removeEventListener("focus",onFocus)
        }

    },[])

    const videoCurrentTime = () => {
        console.log("timer")
        if (videoRef.current == null) return
        let timer = FormatDuration(Math.trunc(videoRef.current.currentTime))
        
        if (timer == null) return
        setVideoTimer(timer)
    }

    const videoPlayToggle = () => {
        setIsVideoPlaying(v => !v)
        if (videoRef.current == null) return

        if (isVideoPlaying){
            //videoRef.current.currentTime = 0
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
        if (volumeLevel === 0 && isMuted) {
            setSliderLevel(20)
            setVolumeLevel(20)
            setVideoVolume(20)
        } else if (!isMuted) {
            setSliderLevel(0)
        } else {
            setSliderLevel(volumeLevel)
        }
    }

    //Handalse volume slide on inpute range
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
    
    //Changes volume when users clicks on slider randomly
    const HandleSliderClick = () => {
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
                            <div className="flex items-center px-1 py-4 ">
                                <input 
                                    className="w-0 origin-left scale-x-0 transition-transform group-hover/volume:w-[100px] group-hover/volume:scale-x-100"
                                    type="range"
                                    min="0"
                                    max="100"
                                    step="1"
                                    value={sliderLevel}
                                    onChange={volumeHandler}
                                    onClick={HandleSliderClick}
                                />
                            </div>
                        </div>
                        <div className="flex items-center flex-nowrap gap-1 text-white text-xs"> {/*time duration*/}
                            <span>{videoTimer}</span>
                            <span>/</span>
                            <span>{FormatDuration(duration)}</span>
                        </div>
                    </div>
                    <div className="flex justify-center gap-6 px-6">{/*Controls right side*/}
                        <div><p>autoplay</p></div>
                        <div><p>close caption</p></div>
                        <div><p>settings</p></div>
                        <div><p>minni player</p></div>
                        <div><p>theater</p></div>
                        <div><p>full screen</p></div>
                        
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