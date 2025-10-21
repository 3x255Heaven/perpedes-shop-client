import { Card, CardContent } from "@/components/shared/card";
import { useAuth } from "@/context/AuthContext";

export const PersonalInformation = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="flex-1">
        <Card>
          <CardContent className="p-6 flex flex-col gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Personal Information
              </h3>
              <p className="text-sm text-gray-500">
                Your saved contact and address details.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
              <div>
                <p className="text-gray-500">Name</p>
                <p className="font-medium">{user?.name}</p>
              </div>
              <div>
                <p className="text-gray-500">Contact Person</p>
                <p className="font-medium">{user?.contactPerson}</p>
              </div>
              <div>
                <p className="text-gray-500">Street</p>
                <p className="font-medium">{user?.street}</p>
              </div>
              <div>
                <p className="text-gray-500">City</p>
                <p className="font-medium">
                  {user?.zip} {user?.city}
                </p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-gray-500">Email</p>
                <p className="font-medium">{user?.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
