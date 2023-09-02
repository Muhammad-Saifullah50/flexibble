import { NavLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AuthProviders, CustomButton } from "..";
import { getCurrentUser } from "@/lib/session";
import { ProfileMenu } from "..";


const Navbar = async () => {
  const session = await getCurrentUser(); // session is a period of time where user interacts with the app
  // retrieving info about current user
  // console.log(session, "session");

  return (
    <nav className="flexBetween navbar">
      <div className="flex-1 flexStart gap-10">
        <Link href="/">
          <Image src="/logo.svg" width={115} height={43} alt="flexibble" />
        </Link>

        <ul className="xl:flex hidden text-small gap-7">
          {NavLinks.map((link) => (
            <Link href={link.href} key={link.key}>
              {link.text}
            </Link>
          ))}
        </ul>
      </div>

      <div className="flexCenter gap-4">
        {session?.user ? ( // if user is logged in we will show photo and share work btn, else show the authproviders component
          <>
            <ProfileMenu session={session} />

            <Link href="/create-project">
              <CustomButton 
              title="Share Work"
              />
            </Link>

          </>
        ) : (
          <AuthProviders />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
