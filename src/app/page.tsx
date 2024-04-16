import CountryList from "./components/CountryList";
import Filters from "./components/Filters";
export default function Home() {
  return (
    <>
      <main className="main">
        <h1 className="sr-only">Countries List</h1>
        <Filters />
        <CountryList />
      </main>
    </>
  );
}
