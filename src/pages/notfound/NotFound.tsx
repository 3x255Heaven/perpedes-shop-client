import { useNavigate } from "react-router";
import { Button } from "@/components/shared/button";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-gray-50 p-8">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <h2 className="text-3xl font-semibold mb-6 text-center">
        Page Not Found
      </h2>
      <p className="text-lg text-center text-gray-600 mb-8 max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <Button
        variant="default"
        size="lg"
        onClick={() => navigate("/")}
        className="px-6 py-4"
      >
        Go Back Home
      </Button>
    </div>
  );
};
