import axios from "axios";
import {setToken} from "~/util/tokenUtil.server";
import process from "process";

export async function refreshToken() {
  console.log("Refreshing token")
  let res
  try {
    res = await axios.post(process.env.EMR_AUTH_URL ?? "", {
      grant_type: 'password',
      client_id: process.env.EMR_CLIENT_ID!,
      scope: process.env.EMR_SCOPES!,
      user_role: 'users',
      username: process.env.EMR_USERNAME!,
      password: process.env.EMR_PASSWORD!
    }, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
  } catch (e) {
    console.error("Error refreshing token")
    return undefined;
  }
  if (!res.data.access_token) {
    throw new Error("No access token in response")
  }
  return await setToken(res.data.access_token)
}