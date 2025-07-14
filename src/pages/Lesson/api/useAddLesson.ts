import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  addLesson,
  AddLessonRequest,
  getLessonsApiSpec,
} from "~/apis/services/instructor/Intructor";
import { RestError, RestResponse } from "~/types/common";

export const useAddLesson = () => {
  const queryClient = useQueryClient();
  return useMutation<RestResponse<any>, RestError, AddLessonRequest>({
    mutationFn: (request: AddLessonRequest) => addLesson(request),
    onSuccess: () => {
      queryClient
        .invalidateQueries({
          queryKey: [getLessonsApiSpec.name],
        })
        .then();
    },
    onError: () => {
      toast.error("Failed add lesson");
    },
  });
};
