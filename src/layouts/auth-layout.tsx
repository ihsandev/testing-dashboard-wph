import React from "react";
import AUTH_BG from "@/assets/images/auth-bg.png";
import LOGO from "@/assets//svg/logo.svg";
import { cn } from "@/lib/utils";

interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  isFormOnly?: boolean;
}

export default function AuthLayout({
  children,
  title,
  subtitle,
  isFormOnly = false,
}: Readonly<AuthLayoutProps>) {
  return (
    <section
      className={cn(
        "grid h-screen grid-cols-1 lg:grid-cols-2",
        isFormOnly && "lg:grid-cols-1"
      )}
    >
      <div
        className={cn(
          `bg-cover bg-center bg-no-repeat h-screen col-span-1 relative lg:block hidden`,
          isFormOnly && "lg:hidden"
        )}
        style={{
          backgroundImage: `url(${AUTH_BG})`,
        }}
      >
        <div className="h-[35.75rem] w-full absolute bottom-0 bg-gradient-to-t from-wph-base-bg to-transparent flex flex-col items-center">
          <div className="text-center flex flex-col gap-3 max-w-[35.625rem] pt-[17.875rem]">
            <h1 className="font-bold text-[1.75rem]">
              Your Career Dashboard Starts Here
            </h1>
            <p className="text-base font-normal text-wph-neutral-400">
              Track your job applications, set goals, and stay on top of your
              career <br /> journey—effortlessly.
            </p>
          </div>
        </div>
      </div>
      <div className="col-span-1 flex flex-col justify-center items-center px-6 lg:px-0">
        <div
          className={cn(
            "min-h-[31.0625rem] w-full lg:w-[29.375rem] bg-wph-neutral border border-wph-neutral-800 rounded-4xl px-6 py-8",
            isFormOnly && "min-h-[25.4375rem]"
          )}
        >
          <figure className="flex justify-center items-center gap-6 mb-6 flex-col">
            {title ? (
              <h1 className="text-2xl font-bold">{title}</h1>
            ) : (
              <img src={LOGO} alt="Logo" className="w-fit h-auto" />
            )}
            <p className="text-center text-wph-neutral-400 text-sm leading-7">
              {subtitle ??
                "Lorem ipsum dolor sit amet consectetur. Tellus eget magna nulla volutpat nec risus sed."}
            </p>
          </figure>
          {children}
        </div>
      </div>
    </section>
  );
}
