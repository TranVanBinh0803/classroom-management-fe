import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getMyLessons, markLessonDone, MarkLessonDoneRequest } from "~/apis/services/student/Student";
import { RestError, RestResponse } from "~/types/common";

export const useMarkLessonDone = () => {
  const queryClient = useQueryClient();
  return useMutation<RestResponse<any>, RestError, MarkLessonDoneRequest>({
    mutationFn: (request: MarkLessonDoneRequest) => markLessonDone(request),
    onSuccess: () => {
      queryClient
        .invalidateQueries({
          queryKey: [getMyLessons.name],
        })
        .then();
    },
    onError: () => {
        toast.error("Failed mark lesson done");
    },
  });
};
