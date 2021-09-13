import React, { useEffect, useRef } from "react";
import { Controller, Scene } from "react-scrollmagic";
const video = require("../assets/outbike.mp4");

let accelamount = 0.1;
let delay = 0;
let scrollpos = 0;

export interface VideoScrollerProps {}

export default function VideoScroller({}: VideoScrollerProps) {
  const videoRef = useRef<any>();

  useEffect(() => {
    setInterval(() => {
      delay += (scrollpos - delay) * accelamount;

      videoRef.current.currentTime = delay * 12;
    }, 48);
  }, []);

  const handleScrollEvent = (progress) => {
    scrollpos = progress;
  };

  return (
    <div>
      <Controller>
        <Scene duration={12000} pin triggerHook={0} triggerElement=".intro">
          {(progress, event) => {
            handleScrollEvent(progress);

            return (
              <div className="intro">
                <h1>Scroll Down</h1>

                <video src={video} ref={videoRef} preload={"auto"} />
              </div>
            );
          }}
        </Scene>
      </Controller>
    </div>
  );
}
