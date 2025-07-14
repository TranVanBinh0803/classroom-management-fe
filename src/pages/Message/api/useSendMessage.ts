import { useMutation } from "@tanstack/react-query";
import { sendMessage, SendMessageRequest } from "~/apis/services/conversation/Conversation";
import { RestError, RestResponse } from "~/types/common";

export const useSendMessage = (conversationId: string) => {
  return useMutation<RestResponse<any>, RestError, SendMessageRequest>({
    mutationFn: (request) => sendMessage(conversationId, request),
  });
};
