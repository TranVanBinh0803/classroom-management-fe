import { FetchLike, WretchOptions } from "wretch/types";
import wretch from 'wretch';
import QueryStringAddon from 'wretch/addons/queryString';
import FormDataAddon from 'wretch/addons/formData';
import { accessTokenAtom } from "~/atoms/AuthAtoms";
import { API_ROOT } from "~/untils/constants";
import { store } from "~/atoms/store";

const auth =
  () =>
  (next: FetchLike) =>
  (url: string, { headers, ...opts }: WretchOptions) => {
    const nextHeaders = new Headers(headers);
    const accessToken = store.get(accessTokenAtom);

    if (accessToken) {
      nextHeaders.set('Authorization', `Bearer ${accessToken}`);
    }

    return next(url, { ...opts, headers: nextHeaders });
  };

export const restClient = wretch(API_ROOT)
  .middlewares([auth()])
  .errorType('json')
  .catcherFallback((error) => Promise.reject(error.json))
  .addon(QueryStringAddon)
  .addon(FormDataAddon);
