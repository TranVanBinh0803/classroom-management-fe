import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  deleteStudent,
  getStudentsApiSpec,
} from "~/apis/services/instructor/Intructor";
import { RestError, RestResponse } from "~/types/common";

export const useDeleteStudent = (studentId: string) => {
  const queryClient = useQueryClient();
  return useMutation<RestResponse<any>, RestError>({
    mutationFn: () => deleteStudent(studentId),
    onSuccess: () => {
      queryClient
        .invalidateQueries({
          queryKey: [getStudentsApiSpec.name],
        })
        .then();
    },
    onError: () => {
      toast.error("Failed delete student");
    },
  });
};
