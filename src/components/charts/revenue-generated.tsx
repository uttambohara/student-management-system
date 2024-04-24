import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

interface RevenueGeneratedProps {
  totalRevenueGenerated: number;
}

export default function RevenueGenerated({
  totalRevenueGenerated,
}: RevenueGeneratedProps) {
  return (
    <Card className="w-full cursor-pointer bg-gradient-to-r from-neutral-300 to-stone-400 text-white transition-all duration-500 md:w-full">
      <CardHeader>
        <CardTitle>Revenue generated</CardTitle>
      </CardHeader>

      <CardContent className="text-3xl font-bold">
        {formatCurrency(totalRevenueGenerated)}
      </CardContent>
    </Card>
  );
}
