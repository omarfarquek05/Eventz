
import {  SignedIn, SignedOut,UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";

const Header = () => {
  return (
    <header className=" w-full border-b  bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500">
      <div className="wrapper flex items-center justify-between">
        <Link href="/" className="w-36">
          <Image
            src="/assets/images/logo.svg"
            width={128}
            height={38}
            alt="Evently logo"
          />
        </Link>
         
        <SignedIn>
        <nav className="md:flex-between hidden w-full max-w-xs">
     <NavItems />
        </nav>
      </SignedIn>

        <div className="flex w-32 justify-end gap-0 ">

         {/* Singin */}
         <SignedIn>
         <UserButton afterSignOutUrl="/" />
          {/* <MobileNav />*/}
         <MobileNav />
         
       </SignedIn>

         {/* SignedOut */}
        <SignedOut>
        <Button asChild className="rounded-full" size="lg">
          <Link href="/sign-in">
            Login
          </Link>
        </Button>
      </SignedOut>

        </div>
      </div>
    </header>
  );
}

export default Header