import { useState, useEffect } from "react";
import Link from "next/link";
import Navmenu from "./Navmenu";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useDisconnect } from "wagmi"; // access the connected wallet or disconnect the currently connected wallet.

export default function Navbar({theme, handleThemeToggle}) {
  const [mounted, setMounted] = useState(false);
  const { data: account } = useAccount();
  const { disconnect } = useDisconnect();
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    mounted && (
      <header className="bg-white dark:bg-zinc-300 border-b-2 border-gray-200">
        <nav
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          aria-label="Top"
        >
          <div className="w-full py-6 flex flex-wrap items-center justify-between border-b border-indigo-500 lg:border-none">
            <div className="flex items-center">
              <Link href="/">
                <a>web3rsvp</a>
              </Link>
            </div>
            <div className="ml-10 space-x-4 flex items-center">
              <Link href="/create-event">
                <a className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 border border-indigo-100 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Create Event
                </a>
              </Link>
            </div>

            <div className="flex items-center">
              {/* <ConnectButton /> */}
              {account ? (
                <Navmenu account={account} disconnect={() => disconnect()} />
              ) : (
                <ConnectButton />
              )}

              <button
                id="theme-toggle"
                type="button"
                class="text-2xl dark:text-gray-200 bg-indigo-100 rounded-lg py-1 px-4 mx-4"
                onClick={handleThemeToggle}
              >
                {theme ? (
                  <p id="theme-toggle-dark-icon" class="text-gray-800 ">
                  ☼
                  </p>
                ): (
                  <p id="theme-toggle-light-icon" class="text-gray-600">
                    ☾
                  </p>
                )
              }
              </button>
            </div>
          </div>
        </nav>
      </header>
    )
  );
}
