import { getMembersInWorkspaceQueryFn } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useGetWorkspaceMembers = (workspaceId: string) => {
  const isValidWorkspaceId = !!workspaceId && workspaceId !== "undefined";

  const query = useQuery({
    queryKey: ["members", workspaceId],
    queryFn: () => getMembersInWorkspaceQueryFn(workspaceId),
    staleTime: Infinity,
    enabled: isValidWorkspaceId,
  });
  return query;
};

export default useGetWorkspaceMembers;
