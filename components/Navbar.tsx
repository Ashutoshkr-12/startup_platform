"use client";
import { getMe } from "@/lib/currentUser";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

type User = {
  _id: string;
  email: string;
};
const Navbar = () => {
  const [user, setUser] = useState<User>();
  const router = useRouter();
  //console.log(user)

  useEffect(() => {
    getMe().then(setUser);
  }, []);


const handleLogout = async () => {
  try {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    setUser(undefined); // clear UI state
    router.push("/login"); // or "/"
  } catch (err) {
    console.error("Logout failed", err);
  }
};


  return (
    <div className=" sticky z-99 top-4 mx-6 bg-slate-300 rounded-full  border ">
      <header>
        <nav className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="text-xl font-bold text-black">
            Startup Benefits
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            <Link
              href="/deals"
              className="text-md font-semibold hover:text-slate-600 text-slate-900"
            >
              Deals
            </Link>
            <Link
              href="/pricing"
              className="text-md font-semibold hover:text-slate-600 text-slate-900"
            >
              Pricing
            </Link>
            <Link
              href="/contact-us"
              className="text-md font-semibold hover:text-slate-600 text-slate-900"
            >
              Contact us
            </Link>
            {user && (
              <Link
                href={`/dashboard/${user._id}`}
                className="text-md font-semibold hover:text-slate-600 text-slate-900"
              >
                Dashboard
              </Link>
            )}
          </div>

          {user ? (
            <>
              <Button
  onClick={handleLogout}
  className="text-md px-6 text-white font-semibold hover:text-slate-900"
>
  Logout
</Button>

            </>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="text-md font-semibold hover:text-slate-600 text-slate-900"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-600"
              >
                Get Started
              </Link>
            </div>
          )}
        </nav>
      </header> 
    </div>
  );
};

export default Navbar;
