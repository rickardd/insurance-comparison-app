// // auth.test.ts
// import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
// import Cookies from "js-cookie";
// import { setLoggedIn, logOut, isLoggedIn } from "./auth"; // Adjust the import path as necessary

// // Mock the js-cookie methods
// vi.mock("js-cookie", () => ({
//   set: vi.fn(),
//   get: vi.fn(),
//   remove: vi.fn(),
// }));

// describe("Authentication Utilities", () => {
//   beforeEach(() => {
//     // Clear all mocks before each test
//     vi.clearAllMocks();
//   });

//   it("should set the token in cookies", () => {
//     const token = "test.token.value";
//     setLoggedIn(token);

//     expect(Cookies.set).toHaveBeenCalledWith("token", token, { secure: true, sameSite: "Strict", expires: 7 });
//   });

//   it("should log out by removing the token from cookies", () => {
//     logOut();

//     expect(Cookies.remove).toHaveBeenCalledWith("token", { secure: true, sameSite: "Strict" });
//   });

//   it("should return true if the user is logged in with a valid token", () => {
//     const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVkIjoxNjY0MjY0MDAwfQ.abc123"; // Example token
//     (Cookies.get as jest.Mock).mockReturnValue(token); // Mock the return value of Cookies.get

//     const loggedIn = isLoggedIn();
//     expect(loggedIn).toBe(true);
//   });

//   it("should return false if the user is not logged in", () => {
//     (Cookies.get as jest.Mock).mockReturnValue(undefined); // Mock the return value of Cookies.get

//     const loggedIn = isLoggedIn();
//     expect(loggedIn).toBe(false);
//   });

//   it("should return false if the token is expired", () => {
//     const expiredToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVkIjoxfQ.abc123"; // Expired token
//     (Cookies.get as jest.Mock).mockReturnValue(expiredToken); // Mock the return value of Cookies.get

//     const loggedIn = isLoggedIn();
//     expect(loggedIn).toBe(false);
//   });
// });
