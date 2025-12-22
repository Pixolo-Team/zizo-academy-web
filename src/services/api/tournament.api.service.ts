// MODULES //
import axios, { AxiosRequestConfig } from "axios";

// TYPES //
import { ApiResponseData } from "@/types/api";
import { TournamentFilterData } from "@/types/tournament";

// CONSTANTS //
import { CONSTANTS } from "@/constants";

// Get Tournaments by Filters
export const getTournamentsByFiltersRequest = async (
  filters: TournamentFilterData
): Promise<ApiResponseData<any[]>> => {
  const config: AxiosRequestConfig = {
    method: "get",
    url: `${CONSTANTS.API_URL}get-tournaments.php`,
    headers: { "Content-Type": "application/json" },
    params: filters,
  };

  const response = await axios.request<ApiResponseData<any[]>>(config);
  return response.data;
};
