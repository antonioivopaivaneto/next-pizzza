import { getCookie } from "cookies-next";
export default function getCookieClient() {
  const token = getCookie("session");
  return token;
}
