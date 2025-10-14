import React, { useEffect, useRef, useState } from "react";
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
  // For slide show width Embla Carousel React
  const options = { slidesToScroll: 1, loop: false };
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  // Display second row if number recipes <= 3
  let numberDivInvisible = 0;
  if (recipePages.length === 1) {
    numberDivInvisible = numberRecipes - recipePages[0].length;
  }

  // Update the heightSection state when the section's height exceeds 100px
    const sectionRef = useRef();
  const [heightSection, setHeightSection] = useState(sectionRef.current?.offsetHeight)
  
  useEffect(() => {
    if(sectionRef.current?.offsetHeight > 200)
    setHeightSection(sectionRef.current?.offsetHeight)
  }, [sectionRef.current?.offsetHeight > 200]);

  return (
    <section className="section pb-5 px-5 flex flex-col gap-5" style={{ height: `${heightSection}px` }} ref={sectionRef}>
      <h2 className="h2">Les recettes</h2>

      {recipePages.length > 0 ? (
        <>
          <div className="h-full overflow-hidden" ref={emblaRef}>
            <div className="embla_section flex gap-5">
              {recipePages.map((page, index) => (
                <div className="embla__slide shrink-0 w-full" key={index}>
                  <ul className="md:grid lg:grid-cols-4 md:grid-cols-3 flex flex-wrap gap-10">
                    {page.map(
                      ({ _id, duration, vegetarian, title, imageUrl }) => (
                        <li key={_id} className="m-auto">
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
    </section>
  );
}
