import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { NavLink } from "react-router-dom";

import RecipeCard from "./RecipeCard";
import { NumberDivInvisible } from "../components/NumberDivInvisible";
import { RecipePagination } from "./RecipePagination";
import MessageErrorBackEnd from "../components/MessageErrorBackEnd";

export function RecipeSlideShow({ recipePages, numberRecipes }) {
  const options = { slidesToScroll: 1, loop: false };
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  let numberDivInvisible = 0;

  if (recipePages.length === 1) {
    numberDivInvisible = numberRecipes - recipePages[0].length;
  }

  return (
    <section pb-5 className="section pb-5 px-5 flex flex-col gap-5">
      <h2 className="h2">Les recettes</h2>

      {recipePages.length > 0 ? (
        <>
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="embla_container flex">
              {recipePages.map((page, index) => (
                <div className="embla__slide shrink-0 w-full" key={index}>
                  <div className="md:grid md:grid-cols-3 flex flex-wrap gap-5">
                    {page.map(({ _id, duration, vegetarian, title, img }) => (
                      <NavLink
                        key={_id}
                        className="m-auto flex flex-shrink-0"
                        id={_id}
                        to={`/recettes/${_id}`}
                      >
                        <RecipeCard
                          duration={duration}
                          classNameRegime={
                            vegetarian === "Oui"
                              ? "text useBadgeInfo regimeActive"
                              : "hidden"
                          }
                          textRegime={vegetarian === "Oui" ? "Végétarien" : ""}
                          title={title}
                          classNameImg="opacity-40"
                          src={img}
                        />
                      </NavLink>
                    ))}

                    <NumberDivInvisible
                      numberDivInvisible={numberDivInvisible}
                      className="imgRecipe"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <RecipePagination emblaApi={emblaApi} numberRecipes={numberRecipes} />
        </>
      ) : (
        <MessageErrorBackEnd className="lg:col-start-1 lg:col-end-4" />
      )}
    </section>
  );
}
