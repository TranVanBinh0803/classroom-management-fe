import { useAtom } from "jotai";
import dayjs from "dayjs";
import {
  accessTokenAtom,
  accessTokenExpiresAtAtom,
  user,
} from "~/atoms/AuthAtoms";

export function useAuth() {
  const [accessToken] = useAtom(accessTokenAtom);
  const [accessTokenExpiresAt] = useAtom(accessTokenExpiresAtAtom);
  const [getUser] = useAtom(user);

  const isAuthenticated = () => accessToken && accessTokenExpiresAt;

  const isAccessTokenExpired = () =>
    dayjs().isAfter(dayjs(accessTokenExpiresAt));

  return { isAuthenticated, isAccessTokenExpired, getUser };
}
