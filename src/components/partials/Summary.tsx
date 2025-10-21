import { Card, CardContent } from "../shared/card";

export const Summary = ({
  total,
  children,
}: {
  total: number;
  children: React.ReactNode;
}) => {
  return (
    <Card className="w-full md:w-80 self-start">
      <CardContent className="p-4">
        <h3 className="font-semibold mb-2">Summary</h3>
        <div className="flex justify-between text-sm mb-2">
          <span>Subtotal</span>
          <span>€{total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>Total Amount</span>
          <span>€{total.toFixed(2)}</span>
        </div>
        {children}
      </CardContent>
    </Card>
  );
};
