import React, { useEffect } from "react";

export interface AppProps {}

let localWindow: any = window;

const { ScrollMagic, TweenMax } = localWindow;

const video = require("../assets/video.mp4");

export default function App({}: AppProps) {
  useEffect(() => {
    const intro = document.querySelector(".intro");
    const video = intro!.querySelector("video");
    const text = intro!.querySelector("h1");
    //END SECTION
    const section = document.querySelector("section");
    const end = section!.querySelector("h1");

    //SCROLLMAGIC
    const controller = new ScrollMagic.Controller();

    //Scenes
    let scene = new ScrollMagic.Scene({
      duration: 5000,
      triggerElement: intro,
      triggerHook: 0,
    })
      .setPin(intro)
      .addTo(controller);

    //Text Animation
    const textAnim = TweenMax.fromTo(text, 3, { opacity: 1 }, { opacity: 0 });

    let scene2 = new ScrollMagic.Scene({
      duration: 3000,
      triggerElement: intro,
      triggerHook: 0,
    })
      .setTween(textAnim)
      .addTo(controller);

    //Video Animation
    let accelamount = 0.5;
    let scrollpos = 0;
    let delay = 0;

    scene.on("update", (e) => {
      scrollpos = e.scrollPos / 1000;
    });

    setInterval(() => {
      delay += (scrollpos - delay) * accelamount;

      video!.currentTime = Math.round(delay * 100) / 100;
    }, 144);
  }, []);

  return (
    <>
      <div className="intro">
        <h1>Scroll Down</h1>
        <video>
          <source src={video} type="video/mp4" />
        </video>
      </div>
      <section>
        <h1>END</h1>
      </section>
    </>
  );
}
