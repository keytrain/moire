import React, { useState } from "react";

const IMAGE_FADE_IN_DURATION = 200;

function Image({ loaded, error, containerClass, imgClass, src, alt }) {
  const [show, setShow] = useState({});

  const handleImageLoaded = () => {
    setShow({ ...show, opacity: 1 });
    loaded?.();
  };

  const handleImageError = () => {
    error?.();
  };

  return (
    <div
      className={containerClass}
      style={{
        position: "relative",
      }}
    >
      <img
        className={imgClass}
        style={{
          opacity: 0,
          transition: `opacity ${IMAGE_FADE_IN_DURATION}ms ease-out`,
          verticalAlign: "top",
          ...show,
        }}
        src={src}
        alt={alt}
        onLoad={handleImageLoaded}
        onError={handleImageError}
      />
    </div>
  );
}

export default Image;
