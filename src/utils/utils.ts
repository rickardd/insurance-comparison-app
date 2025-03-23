import Cookies from "js-cookie";

const TOKEN = "jwt_access_token";
const TOKEN_EXPIRY_TIME = new Date(Date.now() + 10 * 60 * 1000); // 10 minute from now
const REFRESH_TOKEN = "refresh_token";
const USER_UID = "user_uid";

// ToDo:
// - Write a cypress test for this
// - Request a new jwt_access_token if expired with the refresh token.

export const setAccessToken = (token: string) => {
  // The user will be automatically logged out after 10 min
  Cookies.set(TOKEN, token, { secure: true, sameSite: "Strict", expires: TOKEN_EXPIRY_TIME });
};

export const setRefreshToken = (token: string) => {
  Cookies.set(REFRESH_TOKEN, token, { secure: true, sameSite: "Strict", expires: 7 });
};

export const setUserUid = (uid: string) => {
  Cookies.set(USER_UID, uid, { secure: false, sameSite: "Strict", expires: 7 });
};

export const getUserUid = () => {
  return Cookies.get(USER_UID);
};

export const getRefreshToken = () => {
  return Cookies.get(REFRESH_TOKEN);
};

export const logOut = () => {
  // Option object has to be identical to when we set them
  Cookies.remove(TOKEN, { secure: true, sameSite: "Strict" });
  Cookies.remove(REFRESH_TOKEN, { secure: true, sameSite: "Strict" });
  Cookies.remove(USER_UID, { secure: true, sameSite: "Strict" });
};

export const isLoggedIn = () => {
  const token = Cookies.get(TOKEN);
  return token && !isTokenExpired();
};

// Function to check if the token is expired
export const isTokenExpired = () => {
  const token = Cookies.get(TOKEN);

  if (!token) {
    return true;
  }

  try {
    const payload = JSON.parse(atob(token.split(".")[1])); // Decode the JWT payload. characters before the first .
    const currentTime = Date.now() / 1000; // Current time in seconds
    return payload.exp < currentTime; // Check if the token is expired
  } catch (error) {
    console.error("Error decoding token:", error);
    return true; // If there's an error, consider the token expired
  }
};
