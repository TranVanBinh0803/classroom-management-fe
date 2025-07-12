import { useQuery } from "@tanstack/react-query";
import {
  getStudents,
  getStudentsApiSpec,
} from "~/apis/services/instructor/Intructor";
import { RestError, RestResponse } from "~/types/common";

export const useGetStudents = () => {
  return useQuery<RestResponse<any>, RestError>({
    queryKey: [getStudentsApiSpec.name],
    queryFn: () => getStudents(),
    refetchOnWindowFocus: false,
  });
};
