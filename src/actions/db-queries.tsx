"use server";

import { StudentSchema } from "@/components/form/student-details";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getAllStudents() {
  const supabase = await createSupabaseServerClient();
  let response = await supabase.from("student").select("*");
  console.log(response);
  return JSON.stringify(response);
}

export async function createStudent(value: StudentSchema) {
  const supabase = await createSupabaseServerClient();
  const response = await supabase
    .from("student")
    .insert([{ ...value }])
    .select();
  console.log(response);
  revalidatePath("/");
  return JSON.stringify(response);
}
export async function getStudentById({ id }: { id: string }) {
  const supabase = await createSupabaseServerClient();
  const response = await supabase
    .from("student")
    .select("*")
    .eq("id", id)
    .single();
  console.log(response);
  revalidatePath("/");
  return JSON.stringify(response);
}

export async function deleteStudent({ id }: { id: string }) {
  const supabase = await createSupabaseServerClient();
  const response = await supabase.from("student").delete().eq("id", id);
  console.log(response);
  revalidatePath("/");
  return JSON.stringify(response);
}

export async function updateStudentById({
  id,
  values,
}: {
  id: string;
  values: StudentSchema;
}) {
  const supabase = await createSupabaseServerClient();
  const response = await supabase
    .from("student")
    .update({ ...values })
    .eq("id", id)
    .select();

  console.log(response);

  revalidatePath("/");
  return JSON.stringify(response);
}
