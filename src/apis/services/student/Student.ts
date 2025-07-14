import { restClient } from "~/apis/restClient";
import { ApiSpec, HttpMethod, RestResponse } from "~/types/common";

export const getMyLessonsApiSpec: ApiSpec = {
  name: "getMyLessons",
  method: HttpMethod.GET,
  uri: "/students/myLessons", 
};

export const getMyLessons = (id: string) =>
  restClient
    .url(`${getMyLessonsApiSpec.uri}?id=${id}`)
    .get()
    .json<RestResponse<any>>();

/**
 * Mark lesson done
 */
export const markLessonDoneApiSpec: ApiSpec = {
  name: "markLessonDone",
  method: HttpMethod.POST,
  uri: "/students/markLessonDone",
};

export interface MarkLessonDoneRequest {
  studentId: string;
  lessonId: string;
}

export const markLessonDone = (request: MarkLessonDoneRequest) =>
  restClient
    .url(markLessonDoneApiSpec.uri)
    .json(request)
    .post()
    .json<RestResponse<any>>();