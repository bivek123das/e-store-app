"use client";

import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utlis/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utlis/firebase";
import { useUserStore } from "../stores/userStore";
import { useRouter } from "next/navigation";
import Container from "./Container";

const DEFAULT_EMAIL = "guest@example.com";
const DEFAULT_PASSWORD = "Guest123das@";
const DEFAULT_NAME = "Guest User";

const Login = () => {
  const [isSigInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const setUser = useUserStore((s) => s.setUser);

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const handleClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;

    setIsLoading(true);

    if (!isSigInForm) {
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;

          updateProfile(user, {
            displayName: name.current.value,
            photoURL: "",
          }).then(() => {
            setUser({
              uid: user.uid,
              email: user.email,
              displayName: name.current.value,
              photoURL: "",
            });

            setIsLoading(false);
            router.push("/");
          });
        })
        .catch((error) => {
          setErrorMessage(error.code + " - " + error.message);
          setIsLoading(false);
        });
    } else {
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then(({ user }) => {
          setUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          });

          setIsLoading(false);
          router.push("/");
        })
        .catch((error) => {
          setErrorMessage(error.code + " - " + error.message);
          setIsLoading(false);
        });
    }
  };

  return (
    <div className="flex flex-col overflow-hidden">
      {/* HEADER */}
      <Header />

      {/* Center Content */}
      <Container className="flex justify-center items-center min-h-[85vh]">

        <form
          onSubmit={(e) => e.preventDefault()}
          className="max-w-sm sm:max-w-md p-8 
             bg-white border rounded-lg shadow-md"
        >
          <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">
            {isSigInForm ? "Sign In" : "Sign Up"}
          </h1>

          {!isSigInForm && (
            <input
              ref={name}
              type="text"
              placeholder="Full Name"
              className="p-3 w-full bg-gray-100 border rounded mb-3 text-black"
              defaultValue={DEFAULT_NAME}
            />
          )}

          <input
            ref={email}
            type="email"
            placeholder="Email Address"
            className="p-3 w-full bg-gray-100 border rounded mb-3 text-black"
            defaultValue={DEFAULT_EMAIL}
          />

          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="p-3 w-full bg-gray-100 border rounded mb-3 text-black"
            defaultValue={DEFAULT_PASSWORD}
          />

          <p className="text-red-600 min-h-[20px] text-sm">{errorMessage}</p>

          <button
            onClick={handleClick}
            disabled={isLoading}
            className="p-3 mt-3 font-bold bg-pink-600 text-white w-full rounded-lg 
                       hover:bg-pink-500 transition cursor-pointer"
          >
            {isLoading ? "Loading..." : isSigInForm ? "Sign In" : "Sign Up"}
          </button>

          <p
            onClick={() => setIsSignInForm(!isSigInForm)}
            className="text-center mt-4 cursor-pointer text-pink-600 font-medium hover:underline"
          >
            {isSigInForm
              ? "New here? Sign Up now."
              : "Already registered? Sign In now."}
          </p>
        </form>

      </Container>
    </div>
  );
};

export default Login;




