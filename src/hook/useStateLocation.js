import { useGetStatesQuery } from "../services/api";

export default function useStateLocation(country) {
  const { data, isLoading, isError } = useGetStatesQuery(country, {
    skip: !country, // prevents the query from running if no country is selected
  });
  const states = data?.data?.states?.map((el) => el.name) || [];

  return { states, isLoading, isError };
}
