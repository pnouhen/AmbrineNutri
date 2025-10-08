import React from "react";
import useEmblaCarousel from "embla-carousel-react";

import { NavLink } from "react-router-dom";
import { NumberDivInvisible } from "../components/NumberDivInvisible";

import RecipeCard from "./RecipeCard";
import { RecipePagination } from "./RecipePagination";
import MessageNoData from "../components/MessageNoData";

export function RecipeSlideShow({ recipePages, numberRecipes, noRecipes }) {
  // For slide show width Embla Carousel React
  const options = { slidesToScroll: 1, loop: false };
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  // Display second row if number recipes <= 3
  let numberDivInvisible = 0;
  if (recipePages.length === 1) {
    numberDivInvisible = numberRecipes - recipePages[0].length;
  }

  return (
    <section className="section pb-5 px-5 flex flex-col gap-5">
      <h2 className="h2">Les recettes</h2>

      {recipePages.length > 0 ? (
        <>
          <div className={`overflow-hidden `} ref={emblaRef}>
            <div className="embla_container flex">
              {recipePages.map((page, index) => (
                <div className="embla__slide shrink-0 w-full" key={index}>
                  <ul className="md:grid md:grid-cols-3 flex flex-wrap gap-5">
                    {page.map(
                      ({ _id, duration, vegetarian, title, imageUrl }) => (
                        <li key={_id} className="m-auto">
                          <NavLink
                            className="flex flex-shrink-0"
                            id={_id}
                            to={`/recettes/${_id}`}
                          >
                            <RecipeCard
                              duration={duration}
                              vegetarian={vegetarian}
                              title={title}
                              src={imageUrl}
                            />
                          </NavLink>
                        </li>
                      )
                    )}

                    <NumberDivInvisible
                      numberDivInvisible={numberDivInvisible}
                      className="imgRecipe"
                    />
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
