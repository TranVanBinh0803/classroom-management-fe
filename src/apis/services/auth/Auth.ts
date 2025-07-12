import { restClient } from "~/apis/restClient";
import { ApiSpec, HttpMethod, RestResponse } from "~/types/common";

/**
 * createAccessCode
 */
export const createAccessCodeApiSpec: ApiSpec = {
  name: "createAccessCode",
  method: HttpMethod.POST,
  uri: "/auths/createAccessCode",
};

export interface CreateAccessCodeRequest {
  phone: string;
}

export interface CreateAccessCodeResponse {}
export const createAccessCode = (request: CreateAccessCodeRequest) =>
  restClient
    .url(createAccessCodeApiSpec.uri)
    .json(request)
    .post()
    .json<RestResponse<CreateAccessCodeResponse>>();

/**
 * Validate Access Code
 */
export const validateAccessCodeApiSpec: ApiSpec = {
  name: "validateAccessCode",
  method: HttpMethod.POST,
  uri: "/auths/validateAccessCode",
};

export interface ValidateAccessCodeRequest {
  phone: string;
  otp: string;
}

export interface ValidateAccessCodeResponse {
  accessToken: string;
  expiresInSecs: number;
  user: any;
}
export const validateAccessCode = (request: ValidateAccessCodeRequest) =>
  restClient
    .url(validateAccessCodeApiSpec.uri)
    .json(request)
    .post()
    .json<RestResponse<ValidateAccessCodeResponse>>();

/**
 * Logout
 */
export const logoutApiSpec: ApiSpec = {
  name: "logout",
  method: HttpMethod.GET,
  uri: "/auths/logout",
};

export const logout = () =>
  restClient.url(logoutApiSpec.uri).get().res<RestResponse<any>>();
