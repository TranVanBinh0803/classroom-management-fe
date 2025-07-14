import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createConversation } from "~/apis/services/conversation/Conversation";
import { RestError, RestResponse } from "~/types/common";

export const useCreateConversation = () => {
  const navigate = useNavigate();
  return useMutation<RestResponse<any>, RestError, any>({
    mutationFn: (request: any) => createConversation(request),
    onSuccess: () => {
      toast.success("Create conversation successfully");
      navigate("/instructor/messages");
    },
    onError: () => {
      toast.error("Failed create conversation");
    },
  });
};
