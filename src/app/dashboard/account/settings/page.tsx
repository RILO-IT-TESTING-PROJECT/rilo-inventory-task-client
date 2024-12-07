"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSession } from "next-auth/react";

const AccountSettings = () => {
  const { data: session } = useSession();

  return (
    <Tabs defaultValue="account" className="w-full mt-4">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Profile</TabsTrigger>
        <TabsTrigger value="password">Security</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        {/* update profile card */}
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex space-x-4">
              <div className="space-y-1 w-1/2">
                <Label htmlFor="current">First Name</Label>
                <Input
                  id="current"
                  type="text"
                  placeholder="Enter first name"
                  defaultValue={
                    session?.user?.user?.firstName || session?.user?.name || ""
                  }
                />
              </div>
              <div className="space-y-1 w-1/2">
                <Label htmlFor="new">Last Name</Label>
                <Input
                  id="new"
                  type="text"
                  placeholder="Enter last name"
                  defaultValue={session?.user?.user?.lastName}
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="confirm">Company Name</Label>
              <Input
                id="confirm"
                type="text"
                placeholder="Enter company name"
                defaultValue={session?.user?.user?.companyName}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save</Button>
          </CardFooter>
        </Card>

        {/* image upload card */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Profile Image</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="confirm">Image Upload</Label>
              <Input
                id="confirm"
                type="file"
                placeholder="Enter company name"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Update Password</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex space-x-4">
              <div className="space-y-1 w-1/2">
                <Label htmlFor="current">Current password</Label>
                <Input
                  id="current"
                  type="password"
                  placeholder="Enter current password"
                />
              </div>
              <div className="space-y-1 w-1/2">
                <Label htmlFor="new">New password</Label>
                <Input
                  id="new"
                  type="password"
                  placeholder="Enter new password"
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="confirm">Confirm new password</Label>
              <Input
                id="confirm"
                type="password"
                placeholder="Enter confirm password"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default AccountSettings;
