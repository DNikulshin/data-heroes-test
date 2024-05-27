import axios from "axios";
import { IData } from "../types";

interface getDataProps {
  page?: number;
  params: {
    name?: string;
    status?: string;
  };
}

export default function useGetData() {
  const getData = async ({ page = 1, params }: getDataProps) => {
    const { data } = await axios<IData>(
      `https://rickandmortyapi.com/api/character?page=${page}&name=${params.name}&status=${params.status}`,
    );

    return {
      info: data?.info,
      results: data?.results,
    };
  };

  const getEpisode = async (url: string) => {
    const { data } = await axios(url);
    return data?.name;
  };
  return {
    getData,
    getEpisode,
    // getFilterData,
  };
}
