import React from "react";

export default function HomeCardObjectif({logo, title, text }) {
  return (
    <article className="m-auto flex flex-col justify-between gap-1">
      <i className={`${logo} text-8xl text-center`}></i>
      <h3
        dangerouslySetInnerHTML={{
          __html: title,
        }}
        className="h3"
      />
      <p
        dangerouslySetInnerHTML={{
          __html: text,
        }}
        className="text text-center"
      />
    </article>
  );
}