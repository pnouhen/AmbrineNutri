import React from "react";

export function BackgroundImgCSS({url}) {
    return(
        <div
        className="fixed top-0 left-0 -z-20 w-full h-full"
        style={{
          backgroundImage: url,
          backgroundSize: "cover",
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
        }}
      />
    )
}