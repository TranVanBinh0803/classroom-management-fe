import { restClient } from "~/apis/restClient";
import { ApiSpec, HttpMethod, RestResponse } from "~/types/common";

/**
 * Get students
 */
export const getStudentsApiSpec: ApiSpec = {
  name: "getStudents",
  method: HttpMethod.GET,
  uri: "/instructors/students",
};

export const getStudents = () =>
  restClient.url(getStudentsApiSpec.uri).get().json<RestResponse<any>>();

/**
 * Add student
 */
export const addStudentApiSpec: ApiSpec = {
  name: "addStudent",
  method: HttpMethod.POST,
  uri: "/instructors/addStudent",
};

export interface AddStudentRequest {
  phone: string;
  name: string;
  email: string;
  address: string;
}

export const addStudent = (request: AddStudentRequest) =>
  restClient
    .url(addStudentApiSpec.uri)
    .json(request)
    .post()
    .json<RestResponse<any>>();

/**
 * update student
 */
export const updateStudentApiSpec: ApiSpec = {
  name: "updateStudent",
  method: HttpMethod.PUT,
  uri: "/instructors/editStudent/:id",
};

export interface UpdateStudentRequest {
  phone?: string;
  name?: string;
  email?: string;
  address?: string;
}

export const updateStudent = (
  studentId: string,
  request: UpdateStudentRequest
) =>
  restClient
    .url(updateStudentApiSpec.uri.replace(":id", studentId))
    .json(request)
    .put()
    .json<RestResponse<any>>();

/**
 * Delete student
 */
export const deleteStudentApiSpec: ApiSpec = {
  name: "deleteStudent",
  method: HttpMethod.DELETE,
  uri: "/instructors/student/:id",
};

export const deleteStudent = (studentId: string) =>
  restClient
    .url(deleteStudentApiSpec.uri.replace(":id", studentId))
    .delete()
    .json<RestResponse<any>>();

/**
 * Get lessons
 */
export const getLessonsApiSpec: ApiSpec = {
  name: "getLessons",
  method: HttpMethod.GET,
  uri: "/instructors/lessons",
};

export const getLessons = () =>
  restClient.url(getLessonsApiSpec.uri).get().json<RestResponse<any>>();

/**
 * Add lesson
 */
export const addLessonApiSpec: ApiSpec = {
  name: "addLesson",
  method: HttpMethod.POST,
  uri: "/instructors/addLesson",
};

export interface AddLessonRequest {
  title: string;
  description: string;
}

export const addLesson = (request: AddLessonRequest) =>
  restClient
    .url(addLessonApiSpec.uri)
    .json(request)
    .post()
    .json<RestResponse<any>>();

/**
 * Assign lesson
 */
export const assignLessonApiSpec: ApiSpec = {
  name: "assignLesson",
  method: HttpMethod.POST,
  uri: "/instructors/assignLesson",
};

export interface AssignLessonRequest {
  studentId: string;
  lessonId: string;
  title: string;
  description: string;
}

export const assignLesson = (request: AssignLessonRequest) =>
  restClient
    .url(assignLessonApiSpec.uri)
    .json(request)
    .post()
    .json<RestResponse<any>>();
