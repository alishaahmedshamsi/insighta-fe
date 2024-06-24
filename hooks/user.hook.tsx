import { fetchCurrentUser } from '@/services/apis';
import { IUser } from '@/types/type';
import { useQuery } from '@tanstack/react-query';

// Define the custom hook
export const useCurrentUser = () => {
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery<IUser, Error>({
    queryKey: ["current-user"],
    queryFn: fetchCurrentUser,
  });

  console.log("user: ", user)

  return { user, isLoading, isError, error };
};
