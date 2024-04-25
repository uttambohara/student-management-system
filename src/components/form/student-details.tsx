"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { createStudent, updateStudentById } from "@/actions/db-queries";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useModal } from "@/providers/modal-provider";
import { useEffect, useTransition } from "react";
import { useToast } from "../ui/use-toast";
import UploadFile from "../upload-file";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  address: z.string().min(2, {
    message: "Address must be at least 2 characters.",
  }),
  class: z.enum(["SLC", "Plus2", "Bachelor", "Masters"]),
  imageUrl: z
    .string()
    .min(2, { message: "Imageurl must be at least 2 characters." }),
});

type FormSchema = z.infer<typeof formSchema>;

interface StudentDetailsFormProps {
  type: "update" | "create";
  student?: Record<string, string>;
}

export function StudentDetailsForm({
  student,
  type = "create",
}: StudentDetailsFormProps) {
  const { setClose } = useModal();
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: student?.name && "",
      address: student?.address && "",
      class:
        (student?.class as
          | "SLC"
          | "Plus2"
          | "Bachelor"
          | "Masters"
          | undefined) && undefined,
      imageUrl: student?.imageUrl && "",
    },
  });
  // ...
  async function onSubmit(values: FormSchema) {
    startTransition(async () => {
      let finalResult;

      if (type === "create") {
        const result = await createStudent(values);
        const { data, error } = JSON.parse(result);
        finalResult = { data, error };
      }

      if (type === "update") {
        const result = await updateStudentById({
          id: student?.id as string,
          values,
        });
        const { data, error } = JSON.parse(result);
        finalResult = { data, error };
      }

      // Common actions
      setClose();
      if (finalResult?.error) {
        toast({
          variant: "destructive",
          title: "🛑 Something went wrong!",
          description: finalResult.error,
        });
      } else {
        toast({
          title: `✅ Student's profile ${type === "create" ? "created" : "upated"}`,
        });
      }

      console.log(finalResult);
    });
  }

  useEffect(() => {
    if (student) {
      form.reset(student);
    }
  }, [student]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <UploadFile provider={"imageUploader"} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col items-center gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="You address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="class"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Class</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-[12rem]">
                    <SelectValue placeholder="Assign..." />
                  </SelectTrigger>
                  <SelectContent>
                    {/* This should be done from DB,using one to one relation, which is outside the scope of this project, so I have decided to leave it. 
                     Object then arr.map name*/}
                    {["SLC", "Plus2", "Bachelor", "Masters"].map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="!mt-6 w-full bg-[#141414]">
          {type === "update" ? "Update details" : "Create student"}
        </Button>
      </form>
    </Form>
  );
}

export type { FormSchema as StudentSchema };
