"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import { useState } from "react";
import { Bar } from "react-chartjs-2";
Chart.register(CategoryScale);

interface BarChartProps {
  studentByCourse: {
    name: string;
    value: number;
  }[];
}

export default function BarChart({ studentByCourse }: BarChartProps) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Card className="border-none bg-transparent p-4 md:max-w-fit">
      <CardHeader>
        <CardTitle className="w-fit rounded-full bg-[#141414] p-2 text-base text-white md:text-xl">
          🧒👦 Student&apos;s composition by course
        </CardTitle>
      </CardHeader>

      <div className="h-fit w-[25rem] md:w-[30rem]">
        <Bar
          options={{
            plugins: {
              legend: {
                display: false,
              },
            },
            scales: {
              x: {
                grid: {
                  display: false,
                },
              },
              y: {
                grid: {
                  display: false,
                },
              },
            },
          }}
          data={{
            labels: studentByCourse.map((course) => course.name),
            datasets: [
              {
                label: "Number of Students",
                data: studentByCourse.map((course) => course.value),
                backgroundColor: [
                  "rgba(201, 203, 207, 0.2)",
                  "rgba(3, 138, 255, 0.5)",
                  "rgba(201, 242, 155, 0.5)",
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                ],
                borderRadius: 3,
              },
            ],
          }}
        />
      </div>
    </Card>
  );
}
