import React from "react";

export default function MessageNoData({className, text}) {
    return (
        <p className={`text text-center transition-all duration-1000 opacity-0 animate-[fadeIn_0.4s_0.5s_forwards] ${className}`}>{text}</p>
    )
}