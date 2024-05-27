import axios from "axios";
import { IData } from "./types";

export default function useGetData() {
  const getData = async (page: number) => {
    const { data } = await axios<IData>(
      `https://rickandmortyapi.com/api/character?page=${page}`,
    );

    return {
      info: data?.info,
      results: data?.results,
    };
  };

  const getFilterData = async ({ name = "", status = "" }) => {
    const { data } = await axios<IData>(
      `https://rickandmortyapi.com/api/character/?name=${name}&status=${status}`,
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
    getFilterData,
  };
}
