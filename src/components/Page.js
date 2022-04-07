import React, { useEffect, useRef } from "react";
import { Transition } from "react-transition-group";

function Page({
  loaded,
  error,
  imgWidth,
  spread,
  singlePgMode,
  imgClass,
  src,
  alt,
  containerClass,
  show,
  click,
}) {
  const imgRef = useRef(null);

  useEffect(() => {
    // if i've nabbed the width already, don't run this again
    if (imgClass === "rightPg" && !singlePgMode && imgWidth === 0) {
      let checkSpread = setInterval(() => {
        if (imgRef.current === null) {
          clearInterval(checkSpread);
        } else if (imgRef.current.naturalWidth !== 0 || imgRef.current.complete) {
          // naturalWidth is 0 when image metadata hasn't loaded yet
          if (imgRef.current.naturalWidth > 1300) {
            spread({ spread: true, width: imgRef.current.naturalWidth });
          } else {
            spread({ spread: false, width: imgRef.current.naturalWidth });
          }
          clearInterval(checkSpread);
        }
      }, 100);
    }
  });

  const container = {
    position: "relative",
    width: singlePgMode ? "100%" : "",
  };
  const duration = 180;
  const defaultStyle = {
    opacity: 1,
    transition: `opacity ${duration}ms ease-out`,
    verticalAlign: "top",
  };
  const transitionStyles = {
    entering: {
      opacity: 1,
    },
    entered: {
      opacity: 1,
    },
    exiting: {
      opacity: 0,
    },
    exited: {
      opacity: 0,
    },
  };

  return (
    <div className={containerClass} style={container}>
      <Transition in={show} timeout={duration} key={src}>
        {(state) => (
          <img
            className={imgClass}
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
            src={src}
            alt={alt}
            ref={imgRef}
            onClick={state === "entered" ? click : () => {}}
            onLoad={loaded}
            onError={error}
          />
        )}
      </Transition>
    </div>
  );
}

export default Page;
