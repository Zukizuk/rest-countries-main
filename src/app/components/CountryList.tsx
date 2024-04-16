"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useFetchData } from "../hooks";
import Loading from "./Loading";

type Country = {
  flags: {
    png: string;
  };
  name: {
    common: string;
  };
  population: number;
  region: string;
  capital: string;
};
export default function CountryList({}) {
  const searchParams = useSearchParams();
  const filterParam = searchParams.get("filter") ?? undefined;
  const queryParam = searchParams.get("query") ?? undefined;
  const [loading, setLoading] = useState(false);

  const countries = useFetchData({
    filterParam,
    queryParam,
    setLoading,
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <ul className="result__container">
      {countries.length === 0 ? (
        <p className="not__found">No result found</p>
      ) : (
        <div className="result">
          {countries.map((country: Country, index: number) => (
            <li key={index} className="result__item">
              <Image
                src={country.flags.png}
                alt={`${country.name.common} Flag`}
                width={264}
                height={500}
                className="item__image"
              />
              <div className="item__text">
                <h3>{country.name.common}</h3>
                <p>
                  Population: <span>{country.population.toLocaleString()}</span>
                </p>
                <p>
                  Region: <span>{country.region}</span>
                </p>
                <p>
                  Capital: <span>{country.capital}</span>
                </p>
              </div>
              <Link
                href={`/details/${country.name.common}/`}
                className="details__link"
              >
                <span className="sr-only">See More Details</span>
              </Link>
            </li>
          ))}
        </div>
      )}
    </ul>
  );
}
