import { ModeToggle } from "@/components/global/mode-toggle";
import { UserButton } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";
import { BrainCircuit } from "lucide-react";
import Link from "next/link";

type NavigationProps = {
  user?: null | User;
};

const Navigation = ({ user }: NavigationProps) => {
  return (
    <div className="fixed top-0 right-0 inset-x-0 dark:bg-background/80 left-0 p-4 flex backdrop:blur-xl items-center justify-between z-20">
      <aside className="flex items-center gap-0.5">
        <BrainCircuit width={25} height={25} className="text-blue-600" />
        <span className="text-xl font-bold"> Nebula.</span>
      </aside>
      <nav className="hidden md:block absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]">
        <ul className="flex items-center justify-center gap-8">
          <Link href={"#"}>Pricing</Link>
          <Link href={"#"}>About</Link>
          <Link href={"#"}>Documentation</Link>
          <Link href={"#"}>Features</Link>
        </ul>
      </nav>
      <aside className="flex gap-2 items-center">
        <Link href={"/agency"} className="bg-primary text-white p-2 px-4 rounded-md hover:bg-primary/80">
          Login
        </Link>
        <UserButton />
        <ModeToggle />
      </aside>
    </div>
  );
};

export default Navigation;
