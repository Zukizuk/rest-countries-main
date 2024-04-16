"use client";

import BackButton from "@/app/components/BackButton";
import Loading from "@/app/components/Loading";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export type CountryCardProps = {
  name: {
    common: string;
    nativeName: {
      [key: string]: {
        common: string;
      };
    };
  };
  population: number;
  region: string;
  subregion: string;
  capital: string;
  flags: {
    png: string;
  };
  currencies: {
    [key: string]: {
      name: string;
    };
  };
  tld: string[];
  languages: {
    [key: string]: string;
  };
  borders: string[];
};

export default function DetailsPage({ params }: any) {
  const countryName: string = params.name;
  const [country, setCountry] = useState<CountryCardProps | null>(null);
  const [borders, setBorders] = useState<CountryCardProps[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/name/${countryName}`
        );
        if (!response.ok) {
          throw new Error(`${countryName} may not be a country. Try Again!`);
        }
        const countryData: CountryCardProps[] = await response.json();
        setCountry(countryData[0]);

        if (countryData[0]?.borders) {
          const responses: Promise<any>[] = countryData[0].borders.map(
            (border) => fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          );
          const borderCountries = await Promise.all(responses);
          const borderCountriesData = await Promise.all(
            borderCountries.map((response) => response.json())
          );
          setBorders(borderCountriesData.flat());
        } else {
          setBorders([]);
        }
        toast.success(
          `${decodeURIComponent(
            countryName.charAt(0).toUpperCase() + countryName.slice(1)
          )}'s details loaded! 🌍✨`
        );
      } catch (error) {
        setCountry(null);
        console.error(error);
        if (error instanceof Error) {
          toast.error(`Error fetching Data: ${error.message}`);
        } else {
          toast.error(`Error fetching Data: ${error}`);
        }
        router.push("/");
      }
    };

    fetchData();
  }, [countryName, router]);

  if (!country) {
    return <Loading />;
  }
  return (
    <main className="details__country">
      <BackButton />

      <h1 className="sr-only">{country.name.common} Details</h1>

      <div className="country__container">
        <div className="country__image">
          <Image
            src={country.flags.png}
            alt={`Flag of ${country.name.common}`}
            width={700}
            height={500}
          />
        </div>

        <div className="country-details__container">
          <h2>{country.name.common}</h2>

          <div className="country-details__basic">
            <div className="first__col">
              <p>
                <span>Native Names:</span>{" "}
                {country.name.nativeName
                  ? Object.values(country.name.nativeName)
                      .map((name) => name.common)
                      .join(", ")
                  : "No Native Name"}
              </p>
              <p>
                <span>Population:</span> {country.population.toLocaleString()}
              </p>
              <p>
                <span>Region:</span> {country.region}
              </p>
              <p>
                <span>Sub Region:</span> {country.subregion}
              </p>
              <p>
                <span>Capital:</span> {country.capital || "No Capital"}
              </p>
            </div>

            <div className="last__col">
              <p>
                <span>Top Level Domain</span>{" "}
                {country.tld.map((domain) => domain).join(", ")}
              </p>
              <p>
                <span>Currencies:</span>{" "}
                {country.currencies
                  ? Object.values(country.currencies)
                      .map((currency: any) => currency.name)
                      .join(", ")
                  : "No Currency"}
              </p>
              <p>
                <span>Languages:</span>{" "}
                {country.languages
                  ? Object.values(country.languages)
                      .map((language: any) => language)
                      .join(", ")
                  : "No Language"}
              </p>
            </div>
          </div>

          <div className="country-details__border">
            <span>Border Countries:</span>
            <div>
              {borders.length > 0 ? (
                borders.map((border) => (
                  <Link
                    href={`/details/${border.name.common}/`}
                    key={border.name.common}
                  >
                    {border.name.common}
                  </Link>
                ))
              ) : (
                <span>No Borders</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
