import { useQuery } from "@tanstack/react-query";
import { getPersonalConversation, getPersonalConversationApiSpec } from "~/apis/services/conversation/Conversation";
import { RestError, RestResponse } from "~/types/common";

export const useGetPersonalConversation = (userId: string) => {
  return useQuery<RestResponse<any>, RestError>({
    queryKey: [getPersonalConversationApiSpec.name],
    queryFn: () => getPersonalConversation(userId),
    refetchOnWindowFocus: false,
  });
};
