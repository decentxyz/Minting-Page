import Link from "next/link";
import Image from "next/image";
import styles from "./navbar.module.css";
import { usePrivy } from '@privy-io/react-auth';

interface NavItemProps {
  href: string;
  children: string | JSX.Element;
  openInNewTab?: boolean;
}

const Navbar = () => {
  const { login, user } = usePrivy();

  function NavItem({ href, openInNewTab, children }: NavItemProps): JSX.Element {
    return (
      <Link passHref href={href} target={openInNewTab ? "_blank" : undefined} rel={openInNewTab ? "noreferrer" : undefined}>
        <p
          className={`uppercase tracking-widest font-[500] text-base hover:text-black text-white p-2`}
        >
          {children}
        </p>
      </Link>
    );
  }

  function formatWallet(address: any) {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }

  return (
    <>
      <nav className={`${styles.navbar} w-full flex flex-wrap items-center sm:justify-between justify-center border-b border-black drop-shadow-md`} >
        <NavItem href="https://decent.xyz" openInNewTab><Image width={150} height={60} src="/images/decent.png" alt="decent" /></NavItem>
        <div className="flex items-center gap-4">
        {user ?
          <div className="px-5 py-2 rounded-md bg-black text-white hover:text-gray-300">{formatWallet(user?.wallet?.address)}</div> :
          <button className="px-5 py-2 rounded-md bg-black text-white hover:text-gray-300" onClick={login}>Log in</button>
        }
          <Link href='https://github.com/decentxyz/Minting-Page' target='_blank'>
            <div className="p-1 rounded-full bg-black">
              <Image src='/images/github-mark-white.svg' height={20} width={20} alt='link to repository' />
            </div>
          </Link>
          </div>
      </nav>
    </>

  );
};

export default Navbar;