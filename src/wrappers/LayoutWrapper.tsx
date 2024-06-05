"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState, ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Crisp } from "crisp-sdk-web";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { Tooltip } from "react-tooltip";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
import config from "@/utils/config";

// Crisp customer chat support:
// This component is separated from LayoutWrapper because it needs to be wrapped with <SessionProvider> to use useSession() hook
const CrispChat = (): null => {
  const pathname = usePathname();
  const supabase = createClientComponentClient();
  const [data, setData] = useState<any>({});
  // This is used to get the user data from Supabase Auth (if logged in) => user ID is used to identify users in Crisp
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        setData(session.user);
      }
    };
    getUser();
  }, []);
  useEffect(() => {
    if (config?.crisp?.id) {
      // Set up Crisp
      Crisp.configure(config.crisp.id);
      // (Optional) If onlyShowOnRoutes array is not empty in config.js file, Crisp will be hidden on the routes in the array.
      // Use <AppButtonSupport> instead to show it (user clicks on the button to show Crisp—it cleans the UI)
      if (
        config.crisp.onlyShowOnRoutes &&
        !config.crisp.onlyShowOnRoutes?.includes(pathname)
      ) {
        Crisp.chat.hide();
        Crisp.chat.onChatClosed(() => {
          Crisp.chat.hide();
        });
      }
    }
  }, [pathname]);
  // Add User Unique ID to Crisp to easily identify users when reaching support (optional)
  useEffect(() => {
    if (data?.user && config?.crisp?.id) {
      Crisp.session.setData({ userId: data.user?.id });
    }
  }, [data]);
  return null;
};

// All the client wrappers are here (they can't be in server components)
// 1. NextTopLoader: Show a progress bar at the top when navigating between pages
// 2. Toaster: Show Success/Error messages anywhere from the app with toast()
// 3. Tooltip: Show tooltips if any JSX elements has these 2 attributes: data-tooltip-id="tooltip" data-tooltip-content=""
// 4. CrispChat: Set Crisp customer chat support (see above)
const LayoutWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {/* Show a progress bar at the top when navigating between pages */}
      <NextTopLoader color={config.colors.main} showSpinner={false} />
      {/* Content inside app/page.js files  */}
      <SessionProvider>{children}</SessionProvider>
      {/* Show Success/Error messages anywhere from the app with toast() */}
      <Toaster
        toastOptions={{
          duration: 3000,
          style: {
            background: "#333",
            color: "#fff",
          },
          position: "bottom-right",
          success: {
            icon: "🎉",
            duration: 3000,
          },
          error: {
            icon: "🚧",
            duration: 3000,
          },
        }}
      />
      {/* Show tooltips if any JSX elements has these 2 attributes: data-tooltip-id="tooltip" data-tooltip-content="" */}
      <Tooltip
        id="tooltip"
        className="z-[60] !opacity-100 max-w-sm shadow-lg"
      />
      {/* Set Crisp customer chat support */}
      <CrispChat />
      <Script type="text/javascript" id="clarity-microsoft">
        {`(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY}");`}
      </Script>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA ?? ""} />
    </>
  );
};

export default LayoutWrapper;
