"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useToast } from "@/components/ui/use-toast";
import { signUpWithEmailAndPassword } from "@/app/auth/_actions";

const formSchema = z
  .object({
    email: z.string().min(2, {
      message: "Email must be at least 2 characters.",
    }),
    password: z.string().min(2, {
      message: "Password must be at least 2 characters.",
    }),
    confirm: z.string().min(2, {
      message: "Confirm password must be at least 2 characters.",
    }),
  })
  .refine((val) => val.password === val.confirm, {
    message: "Password and confirm password must confirm!",
    path: ["confirm"],
  });

type FormSchema = z.infer<typeof formSchema>;

export function RegisterForm() {
  const { toast } = useToast();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirm: "",
    },
  });
  // ...

  async function onSubmit(values: FormSchema) {
    //
    const result = await signUpWithEmailAndPassword(values);
    console.log(result);
    const { data: authData, error } = JSON.parse(result);

    if (error && error.__isAuthError) {
      toast({
        title: "✅ Registed sucessfully",
        description:
          "A Verification link is sent to your email. Please check and verify it.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "🛑 Something went wrong!",
        description: error.code,
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Your email" {...field} />
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
                <Input placeholder="Your Password" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Re-enter password"
                  {...field}
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="bg-[#141414]">
          Register
        </Button>
      </form>
    </Form>
  );
}
