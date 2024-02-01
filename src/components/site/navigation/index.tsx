import { User } from "@clerk/nextjs/server";
import Image from "next/image";

type NavigationProps = {
  user?: User | null;
};

const Navigation = ({ user }: NavigationProps) => {
  return (
    <div className="p-4 flex items-center justify-between relative">
      <aside className="flex items-center gap-2">
        <Image src="/assets/logo.svg" alt="logo" height={40} width={40} />
      </aside>
    </div>
  );
};

export default Navigation;
