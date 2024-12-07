"use client";
import Navbar from "@/components/Navbar/page";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Navbar from '@/components/Navbar/page';

// Validation schema using Zod
const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export default function Register() {
  const [isLoading, setIsLoading] = useState(false); // State to handle loading
  const router = useRouter(); // Router instance for navigation

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      companyName: "",
      phone: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true); // Set loading state to true

    try {
      const response = await fetch(
        "https://rilo-inventory-server.vercel.app/api/v1/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        // Handle API errors
        alert(result.message || "Failed to register. Please try again.");
        return;
      }

      // Handle successful registration
      alert("Registration successful! Please log in.");

      // redirect the user to the login page
      router.push("/login");
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
     <Navbar page='register'/>
    <section className="min-h-screen flex items-center justify-center">
    <Card className="w-full max-w-md mx-auto bg-gray-200">
      <CardHeader>
        <CardTitle>Register</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                    <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input 
                    className='bg-white text-gray-800'
                    placeholder="first name" 
                    {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                    <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input 
                    className='bg-white text-gray-800'
                    placeholder="last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                    <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input 
                    className='bg-white text-gray-800'
                    placeholder="company name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                    <FormLabel>Contact Phone Number</FormLabel>
                  <FormControl>
                    <Input 
                    className='bg-white text-gray-800'
                    placeholder="contact phone number" type="tel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                    <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input 
                    className='bg-white text-gray-800'
                    placeholder="email" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                    <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input 
                    className='bg-white text-gray-800'
                    placeholder="password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Registering..." : "Register"}
            </Button>
          </form>
        </Form>
        <div className="mt-4  text-sm">
          Have an account?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
    </section>
    </>
    
  )
}
