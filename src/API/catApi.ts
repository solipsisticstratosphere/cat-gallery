import axios, { AxiosResponse } from "axios";
import { Breed, Cat } from "../types/types";
import { toast } from "react-toastify";

const API_KEY =
  "live_FQaAWlM0uzvtEI0CVxU8kmupgo6sSrxvMyfIwTAJ9tPElh94fBXRf9sCOZkYTgVa";
const BASE_URL = "https://api.thecatapi.com/v1";

export const fetchCats = async (
  breed: string = "",
  pageParam: number = 0,
  limit: number = 10
): Promise<Cat[]> => {
  try {
    const response: AxiosResponse<Cat[]> = await axios.get(
      `${BASE_URL}/images/search`,
      {
        params: { limit, page: pageParam, breed_id: breed },
        headers: { "x-api-key": API_KEY },
      }
    );

    if (response.status !== 200) {
      toast.error(`Error: received status ${response.status}`);
      return [];
    }

    if (!Array.isArray(response.data)) {
      toast.error("Error: response data is not an array.");
      return [];
    }

    const isDataValid = response.data.every((cat) => cat.id && cat.url);
    if (!isDataValid) {
      toast.error("Error: some cat objects are missing required fields.");
      return [];
    }

    return response.data;
  } catch (error) {
    toast.error(
      "Error fetching cats: " +
        (error instanceof Error ? error.message : "Unknown error")
    );
    return [];
  }
};

export const fetchBreeds = async (): Promise<Breed[]> => {
  try {
    const response: AxiosResponse<Breed[]> = await axios.get(
      `${BASE_URL}/breeds`,
      {
        headers: { "x-api-key": API_KEY },
      }
    );

    if (response.status !== 200) {
      toast.error(`Error: received status ${response.status}`);
      return [];
    }

    if (!Array.isArray(response.data)) {
      toast.error("Error: response data is not an array.");
      return [];
    }

    const isDataValid = response.data.every((breed) => breed.id && breed.name);
    if (!isDataValid) {
      toast.error("Error: some breed objects are missing required fields.");
      return [];
    }

    return response.data;
  } catch (error) {
    toast.error(
      "Error fetching breeds: " +
        (error instanceof Error ? error.message : "Unknown error")
    );
    return [];
  }
};
