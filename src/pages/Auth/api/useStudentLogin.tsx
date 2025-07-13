import { useMutation } from "@tanstack/react-query";
import {
  studentLogin,
  StudentLoginRequest,
  StudentLoginResponse,
} from "~/apis/services/auth/Auth";

import { RestError, RestResponse } from "~/types/common";
import { useSetAtom } from "jotai";
import {
  accessTokenAtom,
  accessTokenExpiresAtAtom,
  user,
} from "~/atoms/AuthAtoms";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useStudentLogin = () => {
  const setAccessToken = useSetAtom(accessTokenAtom);
  const setAccessTokenExpiresAt = useSetAtom(accessTokenExpiresAtAtom);
  const setUser = useSetAtom(user);
  const navigate = useNavigate();
  return useMutation<
    RestResponse<StudentLoginResponse>,
    RestError,
    StudentLoginRequest
  >({
    mutationFn: studentLogin,
    onSuccess: (data) => {
      setAccessToken(data.data.accessToken);
      const expiresAt = dayjs()
        .add(data.data.expiresInSecs, "seconds")
        .toISOString();
      setAccessTokenExpiresAt(expiresAt);
      setUser(data.data.user);
      navigate("/student/tasks");
    },
    onError: () => {
      toast.error("Failed student login");
    },
  });
};
