import { useQuery } from "@tanstack/react-query";
import {
  getConversationById,
  getConversationByIdApiSpec,
} from "~/apis/services/conversation/Conversation";
import { RestError, RestResponse } from "~/types/common";

export const useGetConversationById = (conversationId: string) => {
  return useQuery<RestResponse<any>, RestError>({
    queryKey: [getConversationByIdApiSpec.name],
    queryFn: () => getConversationById(conversationId),
    refetchOnWindowFocus: false,
  });
};
