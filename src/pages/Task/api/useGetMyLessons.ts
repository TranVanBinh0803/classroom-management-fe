import { useQuery } from "@tanstack/react-query";
import {
  getMyLessons,
  getMyLessonsApiSpec,
} from "~/apis/services/student/Student";
import { RestError, RestResponse } from "~/types/common";

export const useGetMyLessons = (id: string) => {
  return useQuery<RestResponse<any>, RestError>({
    queryKey: [getMyLessonsApiSpec.name],
    queryFn: () => getMyLessons(id),
    refetchOnWindowFocus: false,
  });
};
