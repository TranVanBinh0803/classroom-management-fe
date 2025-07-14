import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  assignLesson,
  AssignLessonRequest,
  getStudentsApiSpec,
} from "~/apis/services/instructor/Intructor";
import { RestError, RestResponse } from "~/types/common";

export const useAssignLesson = () => {
  const queryClient = useQueryClient();
  return useMutation<RestResponse<any>, RestError, AssignLessonRequest>({
    mutationFn: (request: AssignLessonRequest) => assignLesson(request),
    onSuccess: () => {
      queryClient
        .invalidateQueries({
          queryKey: [getStudentsApiSpec.name],
        })
        .then();
      toast.success("Completed assign lesson");
    },
    onError: () => {
      toast.error("Failed assign lesson");
    },
  });
};
