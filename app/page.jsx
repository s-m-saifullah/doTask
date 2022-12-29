/* eslint-disable react/no-unescaped-entities */
"use client";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import GoogleIcon from "../assets/google.png";
import Image from "next/image";
import { AuthContext } from "./contexts/AuthProvider";
import { saveUser } from "./saveUserToDB";
import { toast } from "react-toastify";
import Link from "next/link";

const Home = () => {
  const [registrationError, setRegistrationError] = useState("");
  const { user, loading, setLoading, login, signInWithGoogle } =
    useContext(AuthContext);

  const router = useRouter();

  if (user) {
    return router.push("/my-tasks");
  }

  const handleSignup = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    login(email, password)
      .then((result) => {
        const newUser = result.user;
        toast.success(`Welcome Back ${newUser.displayName}`);
        setLoading(false);
        router.push("/my-tasks");
      })
      .catch((err) => {
        console.log(err);
        setRegistrationError(err.message);
        setLoading(false);
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        const newUser = result.user;
        saveUser(newUser.displayName, newUser.email, newUser.photoURL);
        setLoading(false);
        router.push("/my-tasks");
      })
      .catch((err) => {
        console.log(err);
        setRegistrationError(err.message);
        setLoading(false);
      });
  };

  return (
    <div className="my-10 flex justify-center container mx-auto">
      <div className="w-full md:w-1/2 lg:w-1/3 shadow-2xl mx-2 p-5 md:p-10 rounded-lg">
        <h2 className="mb-5 text-center text-4xl font-bold">Login</h2>
        <form onSubmit={handleSignup}>
          {/* Input Email */}
          <div className="mb-5">
            <label htmlFor="email" className="block text-lg font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="border-2 w-full rounded-md text-lg px-2 py-1"
            />
          </div>
          {/* Input Password */}
          <div className="mb-5">
            <label htmlFor="password" className="block text-lg font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="border-2 w-full rounded-md text-lg px-2 py-1"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-800 py-2 px-3 rounded text-white"
          >
            LOGIN
          </button>
          <p className="mt-3">
            Don't have an account.{" "}
            <Link href="/signup" className="text-sky-600">
              Register here
            </Link>
          </p>
        </form>
        <p className="text-center py-3">OR</p>
        <button
          onClick={handleGoogleSignIn}
          className="w-full bg-white py-2 px-3 rounded border-2"
        >
          <Image
            src={GoogleIcon}
            width="25"
            height="25"
            alt="Google Icon"
            className="inline mr-2"
          />
          Continue With Google
        </button>
      </div>
    </div>
  );
};

export default Home;
