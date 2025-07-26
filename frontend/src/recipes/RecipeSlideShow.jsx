import React from "react";
import useEmblaCarousel from "embla-carousel-react";

import RecipeCard from "./RecipeCard";
import MessageErrorBackEnd from "../components/MessageErrorBackEnd";
import { RecipePagination } from "./RecipePagination";

export function RecipeSlideShow({ recipePages, numberRecipes }) {
  const options = { slidesToScroll: 1, loop: false };
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  
  return (
    <section className="section flex flex-col gap-5">
      <h2 className="h2">Les recettes</h2>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="embla_container flex">
          {recipePages.length > 0 ? (
            recipePages.map((page, index) => (
              <div className="embla__slide shrink-0 w-full" key={index}>
                <div className="md:grid md:grid-cols-3 flex flex-wrap gap-5">
                  {page.map(({ _id, duration, vegetarian, title, img }) => (
                    <RecipeCard
                      key={_id}
                      id={_id}
                      duration={duration}
                      classNameRegime={
                        vegetarian === "Oui"
                          ? "text useBadgeInfo regimeActive"
                          : "hidden"
                      }
                      textRegime={vegetarian === "Oui" ? "Végétarien" : ""}
                      title={title}
                      src={img}
                    />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <MessageErrorBackEnd className="lg:col-start-1 lg:col-end-4" />
          )}
        </div>
      </div>

      <RecipePagination emblaApi={emblaApi} numberRecipes={numberRecipes} />
    </section>
  );
}
