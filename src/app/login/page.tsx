"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Navbar from "@/components/Navbar/page";

const FormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const LoginPage = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const result = await signIn("credentials", {
      redirect: true,
      email: data.email,
      password: data.password,
      callbackUrl: "/dashboard",
    });

    if (!result?.ok) {
      console.error("Login failed");
    }
  }

  return (
    <>
    <Navbar page="login"/>
     <section className="flex items-center justify-center w-full min-h-screen bg-gray-100">
      <div className="w-full max-w-md px-8 py-8 bg-gray-200 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Login</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-white text-gray-800"
                      placeholder="Enter your email"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Use your registered email address.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-white text-gray-800"
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter the password associated with your account.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Submit Button */}
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </Form>

        {/* GitHub Login Button */}
        <Button
          className="w-full bg-gray-800 text-white hover:bg-gray-700 mt-4"
          onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
        >
          Login with GitHub
        </Button>

        <div className="mt-4 text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-primary hover:underline">
            Register
          </Link>
        </div>
      </div>
    </section>
    </>
   
  );
};

export default LoginPage;
