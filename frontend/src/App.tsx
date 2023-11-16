import { ChangeEvent, SyntheticEvent, useState } from "react";
import "./App.css";
import CardList from "./Components/CardList/CardList";
import Search from "./Components/Search/Search";
import { CompanySearch } from "./company";
import { searchCompanies } from "./api";

/* APP COMPONENT:
  + At the top of the component tree
  + Smart component (state & logic)
  + All other components are the dumb components (no logic)
  + Passes data down to dumb components, and dumb components sends data requests up
*/

function App() {
  const [search, setSearch] = useState<string>("");
  const [searchResults, setSearchResults] = useState<CompanySearch[]>([]);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  /* OnClick: 
     + SyntheticEvent:  Broader type for events incase you can't find the right type
     + TRICK: To get type, do a console.log(e), hover over e to get the type
  */
  const onClick = async (e: SyntheticEvent) => {
    const result = await searchCompanies(search);
    // Type Narrowing: Narrow variable to a specific type
    if (typeof result === "string") {
      setServerError(result);
    } else if (Array.isArray(result?.data)) {
      setSearchResults(result!.data);
    }
    console.log(result.data)
  };
  // console.log(search);
  // search prop = user input
  return (
    <>
      <div className="App">
        <Search onClick={onClick} search={search} handleChange={handleChange} />
        {serverError && <h1>{serverError}</h1>}
        <CardList searchResults={searchResults} />
      </div>
    </>
  );
}

export default App;
