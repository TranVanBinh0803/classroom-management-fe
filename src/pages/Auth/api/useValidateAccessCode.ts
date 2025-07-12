import { useMutation } from "@tanstack/react-query";
import {
  validateAccessCode,
  ValidateAccessCodeRequest,
  ValidateAccessCodeResponse,
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

export const useValidateAccessCode = () => {
  const setAccessToken = useSetAtom(accessTokenAtom);
  const setAccessTokenExpiresAt = useSetAtom(accessTokenExpiresAtAtom);
  const setUser = useSetAtom(user);
  const navigate = useNavigate();
  return useMutation<
    RestResponse<ValidateAccessCodeResponse>,
    RestError,
    ValidateAccessCodeRequest
  >({
    mutationFn: validateAccessCode,
    onSuccess: (data) => {
      setAccessToken(data.data.accessToken);
      const expiresAt = dayjs()
        .add(data.data.expiresInSecs, "seconds")
        .toISOString();
      setAccessTokenExpiresAt(expiresAt);
      setUser(data.data.user);
      navigate("/");
    },
    onError: () => {
      toast.error("Failed validate access code");
    },
  });
};
