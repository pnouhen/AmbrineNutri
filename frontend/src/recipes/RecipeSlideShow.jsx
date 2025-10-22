import React, { useLayoutEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { NavLink } from "react-router-dom";

import RecipeCard from "./RecipeCard";
import { RecipePagination } from "./RecipePagination";
import MessageNoData from "../components/MessageNoData";

export function RecipeSlideShow({
  heightSlideShowContainer,
  setHeightSlideShowContainer,
  recipePages,
  numberRecipes,
  noRecipes,
  actionRecipes,
  setRecipes,
  setModalMessage,
  setRecipeDelete,
  setModalRecipeActive,
  setUpdateRecipeId,
  imgUpdated,
  setImgUpdated,
}) {
  const options = {
    slidesToScroll: 1,
    loop: false,
    breakpoints: {
      "(min-width: 1024px)": { watchDrag: false },
    },
  };
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const sectionRef = useRef();
  const cardRef = useRef();

  // Manage the height of container
  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    // Calcul initial
    const images = sectionRef.current.querySelectorAll("img");

    const updateHeight = () => {
      if (sectionRef.current.offsetHeight > 200 && images.length > 0) {
        setHeightSlideShowContainer(sectionRef.current.offsetHeight);
      }
    };

    // Listen images
    images.forEach((img) => {
      if (!img.complete) img.addEventListener("load", updateHeight);
    });

    // Cleanup
    return () => {
      images.forEach((img) => img.removeEventListener("load", updateHeight));
    };
  }, []);

  return (
    <section className="section pb-5 px-5 flex flex-col gap-5">
      <h2 className="h2">Les recettes</h2>

      <div className="flex flex-col justify-between gap-5">
        {recipePages.length > 0 ? (
          <>
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="embla_section flex gap-5" ref={sectionRef}>
                {recipePages.map((page, index) => (
                  <div className="embla__slide shrink-0 w-full" key={index}>
                    <ul
                      className="md:grid lg:grid-cols-4 md:grid-cols-3 flex flex-wrap gap-10"
                      style={{ minHeight: `${heightSlideShowContainer}px` }}
                    >
                      {page.map(
                        ({
                          _id,
                          duration,
                          vegetarian,
                          title,
                          imageUrl,
                          categorie,
                          ingredients,
                          ustensils,
                          steps,
                        }) => (
                          <li key={_id} className="mx-auto" ref={cardRef}>
                            <NavLink
                              className="flex flex-shrink-0"
                              id={_id}
                              to={`/recettes/${_id}`}
                            >
                              <RecipeCard
                                imgUpdated={imgUpdated}
                                setImgUpdated={setImgUpdated}
                                setRecipeDelete={setRecipeDelete}
                                id={_id}
                                setRecipes={setRecipes}
                                actionRecipes={actionRecipes}
                                setModalMessage={setModalMessage}
                                duration={duration}
                                vegetarian={vegetarian}
                                title={title}
                                src={imageUrl}
                                categorie={categorie}
                                ingredients={ingredients}
                                ustensils={ustensils}
                                steps={steps}
                                classNameImg="opacity-40"
                                setModalRecipeActive={setModalRecipeActive}
                                setUpdateRecipeId={setUpdateRecipeId}
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

            <RecipePagination
              emblaApi={emblaApi}
              numberRecipes={numberRecipes}
            />
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
