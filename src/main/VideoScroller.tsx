import React, { useEffect, useRef } from "react";
import { ScrollTrigger, Tween } from "react-gsap";
import { Controller, Scene } from "react-scrollmagic";
const video = require("../assets/outbike.mp4");

let accelamount = 0.1;
let delay = 0;
let scrollpos = 0;

export interface VideoScrollerProps {}

export default function VideoScroller({}: VideoScrollerProps) {
  const videoRef = useRef<any>();

  function onSuccess(url) {
    console.log(url);
    videoRef.current.src = url;
  }

  function onProgress() {}

  function onError() {}

  useEffect(() => {
    prefetch_file(video, onSuccess, onProgress, onError);

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
        {/* <div style={{ backgroundColor: "blanchedalmond", height: "300vh" }}> */}
        <Scene duration={12000} pin triggerHook={0} triggerElement=".intro">
          {(progress, event) => {
            handleScrollEvent(progress);

            return (
              <div className="intro">
                <Tween
                  from={{
                    css: {
                      opacity: "1",
                    },
                  }}
                  to={{
                    css: {
                      opacity: "0.1",
                    },
                  }}
                  //   totalProgress={progress <= 0.5 ? 0 : (progress - 0.5) * 2}
                  paused
                >
                  <h1>Scroll Down</h1>

                  <video ref={videoRef} />
                </Tween>
              </div>
            );
          }}
        </Scene>
        {/* </div> */}
      </Controller>

      {/* <div style={{ height: "100vh" }}></div>

      <ScrollTrigger
        start="bottom center"
        end="400px center"
        scrub={0.5}
        markers
      >
        <Tween
          from={{ opacity: 0 }}
          to={{
            x: "300px",
            opacity: 1,
          }}
        >
          <div
            style={{ width: "100px", height: "100px", background: "#ccc" }}
          />
        </Tween>
        <Tween
          to={{
            x: "300px",
          }}
        >
          <div
            style={{ width: "100px", height: "100px", background: "#999" }}
          />
        </Tween>
      </ScrollTrigger>
      <div style={{ height: "100vh" }}></div> */}
    </div>
  );
}

function prefetch_file(
  url,
  fetched_callback,
  progress_callback,
  error_callback
) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.responseType = "blob";

  xhr.addEventListener(
    "load",
    function () {
      if (xhr.status === 200) {
        var URL = window.URL || window.webkitURL;
        var blob_url = URL.createObjectURL(xhr.response);
        fetched_callback(blob_url);
      } else {
        error_callback();
      }
    },
    false
  );

  var prev_pc = 0;
  xhr.addEventListener("progress", function (event) {
    if (event.lengthComputable) {
      var pc = Math.round((event.loaded / event.total) * 100);
      if (pc != prev_pc) {
        prev_pc = pc;
        progress_callback(pc);
      }
    }
  });
  xhr.send();
}
