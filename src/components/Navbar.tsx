import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "@/lib/context";
import { auth } from "@/lib/firebase";

export const Navbar = () => {
  const { user, username } = useContext(UserContext);

  return (
    <nav className="bg-white py-2 shadow-sm">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 flex justify-between">
        <Link href="/">
          <button
            type="button"
            className="inline-flex px-3 py-2 border items-center border-transparent text-base font-bold rounded-md text-white bg-black hover:bg-gray-800 shadow-sm hover:shadow-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-6"
            >
              <path
                fillRule="evenodd"
                d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                clipRule="evenodd"
              />
            </svg>
            NEXTFIRE
          </button>
        </Link>
        <div>
          {/* user is signed-in and has username */}
          {username && (
            <div className="flex">
              <button
                onClick={() => auth.signOut()}
                className="bg-gray-200 text-gray-900 text-base font-semibold shadow-sm hover:shadow-md rounded-lg flex items-center px-4 py-2 border hover:animate-ping mx-1"
              >
                Sign Out
              </button>
              <Link href="/admin">
                <button className="px-3 py-2 border border-transparent text-base font-semibold rounded-md text-white  bg-indigo-600 hover:bg-indigo-500 shadow-sm hover:shadow-md mx-1">
                  Write Posts
                </button>
              </Link>
              <Link href={`/${username}`}>
                <img src={user?.photoURL} className="mx-1" />
              </Link>
            </div>
          )}

          {/* user is not signed-in and has username */}
          {!username && (
            <Link href="/enter">
              <button className="px-3 py-2 border border-transparent text-base font-semibold rounded-md text-white  bg-indigo-600 hover:bg-indigo-500 shadow-sm hover:shadow-md">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
