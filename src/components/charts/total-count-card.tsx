import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TotalCountCardProps {
  totalNumberOfStudents: number;
}

export default function TotalCountCard({
  totalNumberOfStudents,
}: TotalCountCardProps) {
  return (
    <Card className="w-full cursor-pointer bg-gradient-to-r from-slate-500 to-slate-800 text-white transition-all duration-500 md:w-full">
      <CardHeader>
        <CardTitle>Total students</CardTitle>
      </CardHeader>

      <CardContent className="text-3xl font-bold">
        {totalNumberOfStudents}
      </CardContent>
    </Card>
  );
}
