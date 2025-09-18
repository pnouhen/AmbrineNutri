import React from "react";

export function BackgroundImgCSS({url}) {
    return(
        <div
        className="fixed top-0 left-1/2 -translate-x-1/2 -z-20 w-[1440px] h-full"
        style={{
          backgroundImage: url,
          backgroundSize: "cover",
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
        }}
      />
    )
}