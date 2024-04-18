import createAuthRefreshInterceptor from "axios-auth-refresh";
import axios, {type AxiosRequestConfig} from "axios";
import {refreshToken} from "~/util/refreshtoken.server";
export default function getAxiosClientServer(config?: AxiosRequestConfig) {
  // @ts-ignore
  createAuthRefreshInterceptor.default(axios, refreshToken)
  return axios.create(config)
}