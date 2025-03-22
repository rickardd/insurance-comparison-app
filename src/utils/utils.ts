import Cookies from "js-cookie";

const TOKEN = "token";
const TOKEN_EXPIRY_TIME = new Date(Date.now() + 10 * 60 * 1000); // 10 minute from now
const REFRESH_TOKEN = "refresh_token";
const USER_UID = "user_uid";

export const setAccessToken = (token: string) => {
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

export const logOut = () => {
  // Option object has to be identical to when we set them
  Cookies.remove(TOKEN, { secure: true, sameSite: "Strict" });
  Cookies.remove(REFRESH_TOKEN, { secure: true, sameSite: "Strict" });
  Cookies.remove(USER_UID, { secure: true, sameSite: "Strict" });
};

export const isLoggedIn = () => {
  const token = Cookies.get(TOKEN);
  return token && !isTokenExpired(token);
};

// Function to check if the token is expired
const isTokenExpired = (token: string) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1])); // Decode the JWT payload
    const currentTime = Date.now() / 1000; // Current time in seconds
    return payload.exp < currentTime; // Check if the token is expired
  } catch (error) {
    console.error("Error decoding token:", error);
    return true; // If there's an error, consider the token expired
  }
};
