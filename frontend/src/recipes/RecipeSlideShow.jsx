import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { NavLink } from "react-router-dom";

import RecipeCard from "./RecipeCard";
import { RecipePagination } from "./RecipePagination";
import MessageNoData from "../components/MessageNoData";

export function RecipeSlideShow({
  recipePages,
  numberRecipes,
  noRecipes,
  actionRecipes,
  setRecipes,
  setModalMessage,
  setRecipeDelete,
}) {
  const options = { slidesToScroll: 1, loop: false };
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const sectionRef = useRef()
  const [heightContainer, setHeightContainer] = useState(0);

 const cardRef =useRef()

 useLayoutEffect(() => {
  if (!sectionRef.current) return;
  // Calcul initial
  const images = sectionRef.current.querySelectorAll("img");
  
  const updateHeight = () => {
    if (sectionRef.current.offsetHeight > 200 && images.length > 0) {
      console.log("change")
      setHeightContainer(sectionRef.current.offsetHeight);
    }
  };

  // Écoute des images
  images.forEach(img => {
    if (!img.complete) img.addEventListener("load", updateHeight);
  });

  // Cleanup
  return () => {
    images.forEach(img => img.removeEventListener("load", updateHeight));
  };
}, []);


  return (
    <section className="section pb-5 px-5 flex flex-col gap-5">
      <h2 className="h2">Les recettes</h2>

    <div className="flex flex-col justify-between gap-5" style={{ minHeight: `${heightContainer}px` }}>
      {recipePages.length > 0 ? (
        <>
          <div
            className="overflow-hidden"
            ref={emblaRef}
          >
            <div className="embla_section flex gap-5" ref={sectionRef}>
              {recipePages.map((page, index) => (
                <div className="embla__slide shrink-0 w-full" key={index}>
                  <ul className="md:grid lg:grid-cols-4 md:grid-cols-3 flex flex-wrap gap-10">
                    {page.map(
                      ({ _id, duration, vegetarian, title, imageUrl }) => (
                        <li key={_id} className="m-auto" ref={cardRef}>
                          <NavLink
                            className="flex flex-shrink-0"
                            id={_id}
                            to={`/recettes/${_id}`}
                          >
                            <RecipeCard
                              setRecipeDelete={setRecipeDelete}
                              id={_id}
                              setRecipes={setRecipes}
                              actionRecipes={actionRecipes}
                              setModalMessage={setModalMessage}
                              duration={duration}
                              vegetarian={vegetarian}
                              title={title}
                              src={imageUrl}
                              classNameImg="opacity-40"
                            />
                          </NavLink>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <RecipePagination emblaApi={emblaApi} numberRecipes={numberRecipes} />
        </>
      ) : (
        <MessageNoData
          className="lg:col-start-1 lg:col-end-4"
          text={noRecipes}
        />
      )}
    </div>
      
    </section>
  );
}
