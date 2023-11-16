import axios from "axios";
import { CompanySearch } from "./company";

interface SearchResponse {
  data: CompanySearch[];
}

export const searchCompanies = async (query: string) => {
  try {
    const data = await axios.get<SearchResponse>(
        // import.meta.env.VITE_API_BASE_URL : Use this if using Vite
      `https://financialmodelingprep.com/api/v3/search?query=${query}&limit=10&exchange=NASDAQ&apikey=${import.meta.env.VITE_API_BASE_URL}`
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("error message: ", error.message);
    } else {
      console.error("unexpected error: ", error);
      return "An unexpected error has occurred";
    }
  }
};
