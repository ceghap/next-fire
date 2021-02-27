import { Navbar } from "@/components";
import { UserContext } from "@/lib/context";
import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";
import { useUserData } from "@/lib/hooks";

function MyApp({ Component, pageProps }) {
  const userData = useUserData();
  return (
    <UserContext.Provider value={userData}>
      <Navbar />
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <Component {...pageProps} />
      </div>
      <Toaster />
    </UserContext.Provider>
  );
}

export default MyApp;
