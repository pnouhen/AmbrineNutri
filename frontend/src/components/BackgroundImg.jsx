import React from "react"

export default function BackgroundImg({url, className}){
    return(
        <img
          src={url}
          alt="Arrière plan de la page"
          className={`absolute top-0 -z-20 w-[100vw] h-full object-cover ${className}`}
          loading="eager"
        />
    )
}