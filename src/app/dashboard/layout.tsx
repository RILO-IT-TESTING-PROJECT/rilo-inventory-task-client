"use client"
import React from 'react'
import { AppSidebar } from "@/components/Dashboard/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from '@/components/ui/button'
import { LogOut, Settings, User } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
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
                    <Button variant="outline" className='bg-red-500 text-white'><User/> My Account</Button>
                </PopoverTrigger>
                <PopoverContent className="w-44">
                    <div className="grid gap-4">
                   
                    <div className="flex flex-col gap-2">
                        <div className=" items-center gap-4">
                         <Button variant="default"><Settings /> Settings</Button>
                        </div>
                        <div className=" items-center gap-4">
                        <Button variant="default"><LogOut /> Logout</Button>
                        </div>
                        
                    </div>
                    </div>
                </PopoverContent>
                </Popover>
            </div>
          </div>
        </header>



        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}