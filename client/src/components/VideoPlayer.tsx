import { Play, Pause, VolumeX, Volume1, Volume2, Maximize, Minimize, Square, RectangleHorizontal } from "lucide-react"
import { Button } from "./Button"
import { useEffect, useRef, useState } from "react"
import { FormatDuration } from "../utils/FormatDuration"
import { useVideoPlayerContext } from "../contexts/VideoPlayerContext"

type VideoPlayerPops = {
    videoUrl: string
    videoUrlTime: string|null
}

export function VideoPlayer({videoUrl, videoUrlTime}:VideoPlayerPops) {

    
    const { isTheaterMode, isFullScreen, isVideoPlaying, isContolShowing, isMuted, volumeLevel, sliderLevel, videoTimer, videoPercent, videoRef,
        theaterModeToggle, fullScreenToggle, videoPlayToggle, videoMuteToggle, volumeHandler, HandleSliderClick, videoDuration
    } = useVideoPlayerContext()
    
    useEffect(()=> {
        
        videoPlayToggle()
        videoMuteToggle()   
    },[])

    return (

        <div 
            className={'relative group/control'}
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
                            <Button
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
                            <span>{FormatDuration(Math.trunc(videoTimer))}</span>
                            <span>/</span>
                            <span>{FormatDuration(Math.trunc(videoDuration()))}</span>
                        </div>
                    </div>
                    <div className="flex justify-center flex-nowrap">{/*Controls right side*/}
                        <div><p>autoplay</p></div>
                        <div><p>close caption</p></div>
                        <div><p>settings</p></div>
                        <div><p>minni player</p></div>
                        <div>
                            <Button
                                variant={"player"}
                                size={"player"}
                                onClick={()=>{theaterModeToggle()}}
                            >
                                <Square className={`${isTheaterMode && "hidden"}`} color="white"/>
                                <RectangleHorizontal className={`${!isTheaterMode && "hidden"}`} color="white"/>
                            </Button>
                        </div>
                        <div>
                            <Button 
                                variant={"player"}
                                size={"player"}
                                onClick={()=>{fullScreenToggle()}}
                            >
                                <Maximize className={`${isFullScreen && "hidden"}`} color="white"/> 
                                <Minimize className={`${!isFullScreen && "hidden"}`} color="white"/>
                            </Button>
                        </div>
                        
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