import Image from "next/image";

import { CarCard, CustomFilter, Hero, SearchBar, ShowMore } from "@/components";
import { fetchCars } from "@/utils";
import { fuels, yearsOfProduction } from "@/constants";

export default async function Home({ searchParams }) {
  const allCars = await fetchCars({
    manufacturer: searchParams.manufacturer || '',
    year: searchParams.year || 2023,
    fuel: searchParams.fuel || '',
    limit: searchParams.limit || 10,
    model: searchParams.model || '',
  });

  //Checks if data is empty
  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  return (
    <main className="overflow-hidden">
      <Hero />

      <div className="mt-12 padding-x padding-y max-width" id="discover">
        {/* Catalogue Container */}
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>

        <div className="home__filters">
          <SearchBar />

          <div className="home__filter-container">
            <CustomFilter title="fuel" options= {fuels} />
            <CustomFilter title="year" options= {yearsOfProduction} />
          </div>
        </div>

        {/* If data isn't empty, show "We have cars" otherwise the second */}
        {!isDataEmpty ? (
          <section>
            <div className="home__cars-wrapper">
            {allCars?.map((car) => (
            <CarCard car= {car}/>))}
            </div>

            <ShowMore
              pageNumber= {(searchParams.limit || 10)/10} //Because we're showing 10 cars per page
              isNext= {(searchParams.limit || 10) > allCars.length}

            />
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">Oops! No results.</h2>
            <p>{allCars?.message}</p>
          </div>
        )}
      </div>
    </main>
  );
}
