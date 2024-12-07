"use client";
import { AppSidebar } from "@/components/Dashboard/app-sidebar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { LogOut, Settings, User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { ReactNode, useEffect } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // When the session is loaded, check if accessToken is available
    if (session?.accessToken) {
      // Set the accessToken
      localStorage.setItem("token", session.accessToken);
    }
  }, [session?.accessToken]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="border-t-4 border-purple-500 border-solid w-12 h-12 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!session) {
    router.push("/login");
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center w-full gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />

            <div className="flex w-full items-center justify-between">
              <h1 className="text-xl font-bold">Inventory Management</h1>
              <h2>Dashboard</h2>
              {/* <Button className='bg-red-600'> <User/> My Account</Button> */}
              {/* my account */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="bg-red-500 text-white">
                    <User /> My Account
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-44">
                  <div className="grid gap-4">
                    <div className="flex flex-col gap-2">
                      <div className=" items-center gap-4">
                        <Button variant="ghost">
                          <Settings /> Settings
                        </Button>
                      </div>
                      <div className="text-red-600 items-center gap-4">
                        <Button
                          variant="ghost"
                          onClick={() => signOut({ callbackUrl: "/login" })}
                        >
                          <LogOut /> Logout
                        </Button>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
