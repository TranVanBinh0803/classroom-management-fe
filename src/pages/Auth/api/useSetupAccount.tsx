import { useMutation } from "@tanstack/react-query";
import { setupAccount, SetupAccountRequest } from "~/apis/services/auth/Auth";

import { RestError, RestResponse } from "~/types/common";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useSetupAccount = () => {
  const navigate = useNavigate();
  return useMutation<RestResponse<any>, RestError, SetupAccountRequest>({
    mutationFn: setupAccount,
    onSuccess: () => {
      navigate("/student-login");
      toast.success("Set up account completed");
    },
    onError: () => {
      toast.error("Failed set up account");
    },
  });
};
