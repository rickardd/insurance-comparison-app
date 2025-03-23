import React, { useState } from "react";
import { auth } from "./firebase";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { setAccessToken, setRefreshToken, setUserUid } from "./utils/utils";
import { useNavigate } from "react-router-dom";
import { useAuthStore, User } from "./store/authStore";

const Login: React.FC = () => {
  const [email, setEmail] = useState("broker1@mail.com");
  const [password, setPassword] = useState("password");
  const navigate = useNavigate();
  const { setUser } = useAuthStore();

  const handleLogin = async () => {
    try {
      const userCredentials = await signInWithEmailAndPassword(auth, email, password);

      const user = userCredentials?.user;
      const jwtAccessToken = user?.accessToken;
      const refreshToken = user?.refreshToken;

      // Redirect to home or another page

      // When we are setting up a user we only define email and password.
      // Investigate how we add the displayName, photoUrl to the user.
      const appUser: User = { email: user.email, displayName: user.displayName, photoURL: user.photoURL, phoneNumber: user.phoneNumber };

      setUser(appUser); // Store
      setAccessToken(jwtAccessToken); // Cookie, JWT
      setRefreshToken(refreshToken); // Cookie, Regular token
      setUserUid(user.uid);

      navigate("/", { replace: true });
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // Redirect to home or another page
    } catch (error) {
      console.error("Error logging in with Google:", error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleGoogleLogin}>Login with Google</button>
    </div>
  );
};

export default Login;
