import { Card, CardContent } from "../shared/card";

export const Summary = ({
  subtotal,
  children,
}: {
  subtotal: number;
  children: React.ReactNode;
}) => {
  return (
    <Card className="w-full md:w-80 self-start">
      <CardContent className="p-4">
        <h3 className="font-semibold mb-2">Summary</h3>
        <div className="flex justify-between text-sm mb-2">
          <span>Subtotal</span>
          <span>€{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>Total Amount</span>
          <span>€{subtotal.toFixed(2)}</span>
        </div>
        <p className="text-xs text-gray-500 mt-1">incl. VAT</p>
        {children}
      </CardContent>
    </Card>
  );
};
