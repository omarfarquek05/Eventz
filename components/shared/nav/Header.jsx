
import {  SignedIn, SignedOut,UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";
import ModeToggle from "@/components/shared/theme/ModeToggle"

const Header = () => {
  return (
    <header className=" w-full border-b  bg-gradient-to-r from-[#FFCF26] via-[#3929F1] to-[#EB22CB]">
      <div className="wrapper flex items-center justify-between">
        <Link href="/" className="w-36">
          <Image
            src="/assets/images/logo.svg"
            width={128}
            height={38}
            alt="Evently logo"
          />
        </Link>
        <ModeToggle/>
         
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