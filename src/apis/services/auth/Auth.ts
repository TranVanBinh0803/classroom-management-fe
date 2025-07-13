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

/**
 * Setup account
 */
export const setupAccountApiSpec: ApiSpec = {
  name: "setupAccount",
  method: HttpMethod.POST,
  uri: "/students/setupAccount",
};

export interface SetupAccountRequest {
  token: string | null;
  name: string;
  password: string;
}

export const setupAccount = (request: SetupAccountRequest) =>
  restClient
    .url(setupAccountApiSpec.uri)
    .json(request)
    .post()
    .json<RestResponse<any>>();

/**
 * studentLogin
 */
export const studentLoginApiSpec: ApiSpec = {
  name: "studentLogin",
  method: HttpMethod.POST,
  uri: "/auths/studentLogin",
};

export interface StudentLoginRequest {
  email: string;
  password: string;
}

export interface StudentLoginResponse {
  accessToken: string;
  expiresInSecs: number;
  user: any;
}

export const studentLogin = (request: StudentLoginRequest) =>
  restClient
    .url(studentLoginApiSpec.uri)
    .json(request)
    .post()
    .json<RestResponse<StudentLoginResponse>>();

