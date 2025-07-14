import { ApiSpec, HttpMethod, RestResponse } from "~/types/common";
import { UserType } from "../auth/Auth";
import { restClient } from "~/apis/restClient";

/**
 * Create Conversation
 */

export const createConversationApiSpec: ApiSpec = {
  name: "createConversation",
  method: HttpMethod.POST,
  uri: "/conversations/createConversation",
};

export const createConversation = (request: any) =>
  restClient
    .url(createConversationApiSpec.uri)
    .json(request)
    .post()
    .json<RestResponse<any>>();

/**
 * Get Personal Conversation
 */

export const getPersonalConversationApiSpec: ApiSpec = {
  name: "getPersonalConversation",
  method: HttpMethod.GET,
  uri: "/conversations/getPersonalConversation/:id",
};

export const getPersonalConversation = (userId: string) =>
  restClient
    .url(getPersonalConversationApiSpec.uri.replace(":id", userId))
    .get()
    .json<RestResponse<any>>();

/**
 * Send message
 */
export const sendMessageApiSpec: ApiSpec = {
  name: "sendMessage",
  method: HttpMethod.POST,
  uri: "/conversations/:conversationId/sendMessage",
};

export interface SendMessageRequest {
  senderId: string;
  text: string;
}

export const sendMessage = (
  conversationId: string,
  request: SendMessageRequest
) =>
  restClient
    .url(sendMessageApiSpec.uri.replace(":conversationId", conversationId))
    .json(request)
    .post()
    .json<RestResponse<any>>();

/**
 * Get Conversation By Id
 */
export const getConversationByIdApiSpec: ApiSpec = {
  name: "getConversationById",
  method: HttpMethod.GET,
  uri: "/conversations/:conversationId",
};

export const getConversationById = (
  conversationId: string,
) =>
  restClient
    .url(getConversationByIdApiSpec.uri.replace(":conversationId", conversationId))
    .get()
    .json<RestResponse<any>>();
