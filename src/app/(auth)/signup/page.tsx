import authImage from "@/assets/auth-image.jpg";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SignUpForm from "./sign-up-form";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function Page() {
  return (
    <div className="flex h-dvh items-center justify-center p-5">
      <div className="flex lg:h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-2xl bg-card shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
          <div className="p-4 lg:p-10 md:p-6 lg:self-center">
            <h1 className="font-bold mb-3 text-3xl lg:text-4xl text-center">
              Sign up to <span className="text-primary">Football fans</span>
            </h1>
            <SignUpForm />
            <Link
              href="/login"
              className="block text-center hover:underline mt-2"
            >
              Already have an account? Log in
            </Link>
          </div>
          <div className="hidden lg:block">
            <Image src={authImage} alt="" className="object-cover h-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
