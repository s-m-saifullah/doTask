"use client";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { saveUser } from "../saveUserToDB";
import GoogleIcon from "../../assets/google.png";
import Image from "next/image";
import { toast } from "react-toastify";
import Link from "next/link";
const Signup = () => {
  const [registrationError, setRegistrationError] = useState("");
  const { loading, setLoading, createUser, signInWithGoogle, updateUser } =
    useContext(AuthContext);
  const router = useRouter();
  const handleSignup = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photo = form.photo.files[0];
    const formData = new FormData();
    formData.append("image", photo);

    const url = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_imgbb_apiKey}`;

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        const uploadedImg = imgData.data.display_url;
        createUser(email, password)
          .then((result) => {
            const newUser = result.user;
            console.log(newUser);
            updateUser(name, uploadedImg)
              .then(() => {
                saveUser(newUser.displayName, newUser.email, uploadedImg);
                setLoading(false);
                router.push("/add-task");
              })
              .catch((err) => {
                console.log(err);
                setRegistrationError(err.message);
                setLoading(false);
              });
          })
          .catch((err) => {
            console.log(err);
            setRegistrationError(err.message);
            setLoading(false);
          });
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
        router.push("/add-task");
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
        <h2 className="mb-5 text-center text-4xl font-bold">Sign Up</h2>
        <form onSubmit={handleSignup}>
          {/* Input Name */}
          <div className="mb-5">
            <label htmlFor="name" className="block text-lg font-medium">
              Your Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              className="border-2 w-full rounded-md text-lg px-2 py-1"
            />
          </div>
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
          {/* Input Photo */}
          <div className="mb-5">
            <label htmlFor="photo" className="block text-lg font-medium">
              Photo
            </label>
            <input
              type="file"
              name="photo"
              id="photo"
              className="border-2 w-full rounded-md text-lg px-2 py-1"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-800 py-2 px-3 rounded text-white"
          >
            SIGN UP
          </button>
          <p className="mt-3">
            Already have an account.{" "}
            <Link href="/" className="text-sky-600">
              Login here
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

export default Signup;
