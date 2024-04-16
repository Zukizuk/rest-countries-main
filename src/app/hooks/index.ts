import { useEffect, useState } from "react";
import { CountryCardProps } from "../details/[name]/page";
import toast from "react-hot-toast";

interface FetchDataProps {
  filterParam?: string;
  queryParam?: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useDebounce = <T>(value: T, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};

export const useFetchData = ({
  filterParam,
  queryParam,
  setLoading,
}: FetchDataProps) => {
  const [countries, setCountries] = useState<CountryCardProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let countriesData = [];

        if (filterParam) {
          setLoading(true);
          const response = await fetch(
            `https://restcountries.com/v3.1/region/${filterParam}`
          );
          if (!response.ok) {
            setLoading(false);
            throw new Error("Error fetching Data");
          }
          countriesData = await response.json();
        } else {
          setLoading(true);
          const response = await fetch("https://restcountries.com/v3.1/all");
          countriesData = await response.json();
          if (!response.ok) {
            setLoading(false);
            throw new Error("Failed to fetch data");
          }
        }

        if (queryParam) {
          setLoading(true);
          countriesData = countriesData.filter((country: CountryCardProps) =>
            country.name.common.toLowerCase().includes(queryParam.toLowerCase())
          );
        }

        setCountries(countriesData);
        if (countriesData.length === 0) {
          toast.error("No match found");
        } else {
          toast.success("Search complete!");
        }
        setLoading(false);
        return countriesData;
      } catch (error) {
        toast.error("Error fetching data");
        setLoading(false);
        console.error(error);
      }
    };

    fetchData();
  }, [filterParam, queryParam, setLoading]);

  return countries;
};
