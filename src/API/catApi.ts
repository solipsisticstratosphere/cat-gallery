import axios, { AxiosResponse } from "axios";
import { Breed, Cat } from "../types/types";

const API_KEY =
  "live_FQaAWlM0uzvtEI0CVxU8kmupgo6sSrxvMyfIwTAJ9tPElh94fBXRf9sCOZkYTgVa";
const BASE_URL = "https://api.thecatapi.com/v1";

export const fetchCats = async (breed: string = ""): Promise<Cat[]> => {
  const response: AxiosResponse<Cat[]> = await axios.get(
    `${BASE_URL}/images/search`,
    {
      params: { limit: 10, breed_id: breed },
      headers: { "x-api-key": API_KEY },
    }
  );
  return response.data;
};

export const fetchBreeds = async (): Promise<Breed[]> => {
  const response: AxiosResponse<Breed[]> = await axios.get(
    `${BASE_URL}/breeds`,
    {
      headers: { "x-api-key": API_KEY },
    }
  );
  return response.data;
};
