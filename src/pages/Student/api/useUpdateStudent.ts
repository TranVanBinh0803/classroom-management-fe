import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  getStudentsApiSpec,
  updateStudent,
  UpdateStudentRequest,
} from "~/apis/services/instructor/Intructor";
import { RestError, RestResponse } from "~/types/common";

export const useUpdateStudent = (studentId: string) => {
  const queryClient = useQueryClient();
  return useMutation<RestResponse<any>, RestError, UpdateStudentRequest>({
    mutationFn: (request: UpdateStudentRequest) =>
      updateStudent(studentId, request),
    onSuccess: () => {
      queryClient
        .invalidateQueries({
          queryKey: [getStudentsApiSpec.name],
        })
        .then();
    },
    onError: () => {
      toast.error("Failed update Student");
    },
  });
};
