import { ChangeEvent, SyntheticEvent, useState } from "react";
import "./App.css";
import CardList from "./Components/CardList/CardList";
import Search from "./Components/Search/Search";
import { CompanySearch } from "./company";
import { searchCompanies } from "./api";
import ListPortfolio from "./Components/Portfolio/ListPortfolio/ListPortfolio";
import Navbar from "./Components/Navbar/Navbar";
import Hero from "./Components/Hero/Hero";

/* APP COMPONENT:
  + At the top of the component tree
  + Smart component (state & logic)
  + All other components are the dumb components (no logic)
  + Passes data down to dumb components, and dumb components sends data requests up
*/

function App() {
  const [search, setSearch] = useState<string>("");
  const [portfolioValues, setPortfolioValues] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<CompanySearch[]>([]);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onPortfolioCreate = (e: any) => {
    // MUST add the prevent default
    e.preventDefault();
    // check for duplication
    const exists = portfolioValues.find((value) => value === e.target[0].value);
    if (exists) return;
    // Update array values by creating completely new array
    const updatedPortfolio = [...portfolioValues, e.target[0].value];
    setPortfolioValues(updatedPortfolio);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onPortfolioDelete = (e: any) => {
    e.preventDefault();
    const removed = portfolioValues.filter((value) => {
      // check if value is not part of our target value
      return value !== e.target[0].value;
    });
    setPortfolioValues(removed);
  };

  /* OnClick: 
     + SyntheticEvent:  Broader type for events incase you can't find the right type
     + TRICK: To get type, do a console.log(e), hover over e to get the type
  */
  const onSearchSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const result = await searchCompanies(search);
    // Type Narrowing: Narrow variable to a specific type
    if (typeof result === "string") {
      setServerError(result);
    } else if (Array.isArray(result?.data)) {
      setSearchResults(result!.data);
    }
    // console.log(result.data);
  };
  // console.log(search);
  // search prop = user input
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <Search
        onSearchSubmit={onSearchSubmit}
        search={search}
        handleSearchChange={handleSearchChange}
      />
      <ListPortfolio
        portfolioValues={portfolioValues}
        onPortfolioDelete={onPortfolioDelete}
      />
      {serverError && <h1>{serverError}</h1>}
      <CardList
        searchResults={searchResults}
        onPortfolioCreate={onPortfolioCreate}
      />
      {serverError && <div>Unable to connect to API</div>}
    </div>
  );
}

export default App;
