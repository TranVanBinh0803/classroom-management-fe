import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createAccessCode,
  CreateAccessCodeRequest,
  CreateAccessCodeResponse,
} from "~/apis/services/auth/Auth";
import { RestError, RestResponse } from "~/types/common";

export const useCreateAccessCode = () => {
  const navigate = useNavigate();
  return useMutation<
    RestResponse<CreateAccessCodeResponse>,
    RestError,
    CreateAccessCodeRequest
  >({
    mutationFn: createAccessCode,
    onSuccess: (data, variables) => {
      localStorage.setItem("auth_phone", variables.phone);
      toast.success("OTP sent successfully");
      navigate("/verify");
    },
    onError: () => {
      toast.error("Failed create access code");
    },
  });
};
