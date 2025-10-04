import { axiosInstance } from "@/lib/axios";
import { useMutation, useQuery } from "@tanstack/react-query";

type LoginPayload = {
  username: string;
  password: string;
};

type LoginResponse = {
  accessToken: string;
};

export function useUserQuery() {
  return useQuery({
    queryKey: ["user", "profile"],
    queryFn: async () => {
      const response = await axiosInstance.get("/user/profile");
      return response.data;
    },
  });
}

export const useLoginUserMutation = () => {
  return useMutation<LoginResponse, Error, LoginPayload>({
    mutationFn: async (credentials) => {
      const response = await axiosInstance.post<LoginResponse>(
        "/auth/login",
        credentials
      );
      return response.data;
    },
  });
};
