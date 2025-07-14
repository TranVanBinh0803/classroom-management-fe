import { useQuery } from "@tanstack/react-query";
import {
  getLessons,
  getLessonsApiSpec,
} from "~/apis/services/instructor/Intructor";
import { RestError, RestResponse } from "~/types/common";

export const useGetLessons = () => {
  return useQuery<RestResponse<any>, RestError>({
    queryKey: [getLessonsApiSpec.name],
    queryFn: () => getLessons(),
    refetchOnWindowFocus: false,
  });
};
