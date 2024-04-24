"use server";

import { getAllStudents } from "@/actions/db-queries";

export async function getAllData(): Promise<{ name: string; value: number }[]> {
  const students = await getAllStudents();
  const { data, error } = JSON.parse(students);

  const classCount = data.reduce(
    (acc: { [x: string]: any }, student: { class: string | number }) => {
      acc[student.class] = (acc[student.class] || 0) + 1;
      return acc;
    },
    {},
  );

  return Object.entries(classCount).map(([className, count]) => ({
    name: className,
    value: count as number,
  }));
}
