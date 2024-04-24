import AddCourse from "@/components/modal/add-course";

import Image from "next/image";

import { getAllStudents } from "@/actions/db-queries";
import RevenueGenerated from "@/components/charts/revenue-generated";
import BarChart from "@/components/charts/students-by-course-bar-chart";
import TotalCountCard from "@/components/charts/total-count-card";
import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/data-table";
import { getAllData } from "@/lib/data";

export default async function Home() {
  //
  const studentByCourse = await getAllData();
  const totalNumberOfStudents = studentByCourse.reduce(
    (acc, item) => acc + item.value,
    0,
  );
  // I have implemented the most basic form of revenue estimation
  const totalRevenueGenerated = totalNumberOfStudents * 1000;

  const allStudents = await getAllStudents();
  const studentsObj = JSON.parse(allStudents);
  const data = studentsObj.data;

  return (
    <section className="bg-zinc-200/40 dark:bg-zinc-900/90">
      <div className="mx-auto h-full max-w-[1200px] space-y-10 p-8 pt-32">
        <h1 className="relative inline-block text-4xl dark:text-white">
          <span> Dashboard</span>
          <Image
            src="/circle.svg"
            priority
            height="250"
            width={"250"}
            className="object-fit absolute top-0"
            alt={""}
          />
        </h1>

        <div className="item-scenter flex flex-col gap-6 md:flex-row">
          <TotalCountCard totalNumberOfStudents={totalNumberOfStudents} />
          <RevenueGenerated totalRevenueGenerated={totalRevenueGenerated} />
        </div>

        <div className="flex flex-col items-center justify-center gap-8 px-4 pb-4 max-md:gap-6 lg:flex-row">
          <BarChart studentByCourse={studentByCourse} />
        </div>

        <div className="p-4 shadow-md">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl">Manage Students</h2>
            <AddCourse />
          </div>

          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </section>
  );
}
