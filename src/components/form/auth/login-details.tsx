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
import {
  loginWithEmailAndPassword,
  signUpWithEmailAndPassword,
} from "@/app/auth/_actions";
import { useToast } from "@/components/ui/use-toast";
import { useTransition } from "react";
import { Loader } from "lucide-react";

const formSchema = z.object({
  email: z.string().min(2, {
    message: "Email must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
});

type FormSchema = z.infer<typeof formSchema>;

export function LoginForm() {
  const [isPending, startTransition] = useTransition();

  const { toast } = useToast();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "boharauttam2@gmail.com",
      password: "123456",
    },
  });
  // ...

  async function onSubmit(values: FormSchema) {
    startTransition(async () => {
      const response = await loginWithEmailAndPassword(values);
      const { data, error } = JSON.parse(response);
      console.log(error);
      if (error && error.__isAuthError) {
        toast({
          title: "✅ Login sucessfull",
        });
      } else {
        toast({
          variant: "destructive",
          title: "🛑 Something went wrong!",
          description: `${error?.status} ${error.name}`,
        });
      }
    });
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
                <Input type="password" placeholder="Your Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="bg-[#141414]">
          <div>{isPending && <Loader className="animate-spin" />}</div>
          Login
        </Button>
      </form>
    </Form>
  );
}
