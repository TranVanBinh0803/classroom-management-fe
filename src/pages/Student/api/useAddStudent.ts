import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  addStudent,
  AddStudentRequest,
  getStudentsApiSpec,
} from "~/apis/services/instructor/Intructor";
import { RestError, RestResponse } from "~/types/common";

export const useAddStudent = () => {
  const queryClient = useQueryClient();
  return useMutation<RestResponse<any>, RestError, AddStudentRequest>({
    mutationFn: (request: AddStudentRequest) => addStudent(request),
    onSuccess: () => {
      queryClient
        .invalidateQueries({
          queryKey: [getStudentsApiSpec.name],
        })
        .then();
    },
    onError: () => {
        toast.error("Failed add student");
    },
  });
};
