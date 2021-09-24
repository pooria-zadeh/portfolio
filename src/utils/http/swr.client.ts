import { GraphQLClient } from "graphql-request";

import { ACCESS_TOKEN_KEY } from "src/utils/storage/constant";
import { getCookieStorage } from "../storage";

const idToken = getCookieStorage(ACCESS_TOKEN_KEY) || "token";
// const idToken =
//   "eyJhbGciOiJSUzI1NiIsImtpZCI6IjhmNDMyMDRhMTc5MTVlOGJlN2NjZDdjYjI2NGRmNmVhMzgzYzQ5YWIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYXBzLXZvbHludCIsImF1ZCI6ImFwcy12b2x5bnQiLCJhdXRoX3RpbWUiOjE2MjU5OTc5OTYsInVzZXJfaWQiOiJCclQ4RGx2cjByaGtkM09UMUhIV3hIU3NXOXEyIiwic3ViIjoiQnJUOERsdnIwcmhrZDNPVDFISFd4SFNzVzlxMiIsImlhdCI6MTYyNjA2NzY4MCwiZXhwIjoxNjI2MDcxMjgwLCJlbWFpbCI6InN1cGVyYWRtaW5Adm9seW50LmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJzdXBlcmFkbWluQHZvbHludC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.NTlYUTNrFURYMapyNz3c3E6iWL9tzBBLZVSFatl6iXDM188pmWK88oqeBPbWWFOVPx8U9ovNY1BP80Cx8sUcICLTgBvuzlzKu-KQFitx0txeV8GHbFFowAw_212FJCP0cMTYi0UiY7UigGH4wyvOXFacP8u20JDPageVR1UNrAXI_yNZE7jjyTgYnql-6D68SG5XlfFvR-hyaYdSdijLAYZY91bipcmGu7gzpvVw303IBy6KLuFYmT-37jwQreaBCeF3PGp0UaazkfD-avCM3J4cXNFDiFEedmIr5-Gl1Ko11R5miiF_1d6JXQ4bgE7_fHyip4ul8gPlnKnMFDEgkw";
const client = new GraphQLClient(process.env.BASE_URL||"https://base-url.com", {
  headers: { Authorization: `Bearer ${idToken}` },
});

export function setAuthHeader(idToken: string) {
  // TODO uncomment bottom line (for silent refresh)
  client.setHeader("Authorization", `Bearer ${idToken}`);
}

export default client;
