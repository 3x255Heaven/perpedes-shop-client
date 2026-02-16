import { axiosInstance } from "@/lib/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

export type Client = {
  id: number;
  clientId: string;
  displayName: string;
  country: string;
  place: string | null;
  area: string;
  zipCode: string;
  street1: string;
  street2: string | null;
  telefon1: string;
  telefon2: string;
  fax: string;
};

export type User = {
  id: number;
  username: string;
  role: string;
  firstName: string;
  lastName: string;
  client: Client;
  lastLogin: string;
  lastLogout: string | null;
};

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
        "/public/auth/login",
        credentials,
      );
      return response.data;
    },
  });
};

export const useLogoutUserMutation = () => {
  return useMutation<void, AxiosError, void>({
    mutationFn: async () => {
      await axiosInstance.post("/public/auth/logout");
    },
  });
};
