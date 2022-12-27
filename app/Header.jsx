"use client";
import { Navbar } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "../assets/logo.png";

const Header = () => {
  return (
    <header className="container mx-auto">
      <Navbar fluid={true} rounded={true}>
        <Navbar.Brand className="" href="https://flowbite.com/">
          <Image
            src={Logo}
            className="mr-3 w-12"
            alt="doTask Logo"
            // width="50"
            // height="50"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            doTask
          </span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Link
            href="/"
            className="hover:bg-slate-700 hover:text-white px-3 py-2 rounded-lg"
          >
            Home
          </Link>
          <Link
            href="/add-task"
            className="hover:bg-slate-700 hover:text-white px-3 py-2 rounded-lg"
          >
            Add Task
          </Link>
          <Link
            href="/my-tasks"
            className="hover:bg-slate-700 hover:text-white px-3 py-2 rounded-lg"
          >
            My Tasks
          </Link>
          <Link
            href="/completed-tasks"
            className="hover:bg-slate-700 hover:text-white px-3 py-2 rounded-lg"
          >
            Completed Tasks
          </Link>
          {/* <Link href="/" className="hover:bg-slate-700 hover:text-white px-3 py-2 rounded-lg">Contact</Link> */}
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
