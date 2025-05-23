import useProject  from "@/hooks/use-project";
import { api } from "@/trpc/react";
import React from "react";

const TeamMembers = () => {
  const { projectId } = useProject();
  const { data: members } = api.project.getTeamMembers.useQuery({ projectId });

  return (
    <div className="flex items-center gap-2">
      {members?.map((member) => (
        <img
          key={member.id}
          src={member.user.imageUrl || ""}
          className="rounded-full"
          height={30}
          width={30}
          alt={member.user.firstName || ""}
        />
      ))}
    </div>
  );
};

export default TeamMembers;