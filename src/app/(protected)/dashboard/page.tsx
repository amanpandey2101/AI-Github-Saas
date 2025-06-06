"use client"
import React from "react";
import useProject from "@/hooks/use-project";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

const CommitLog = dynamic(() => import("./commit-log"), { ssr: false });

const AskQuestionCard = dynamic(() => import("./ask-question-card"), { ssr: false });

const ArchiveBtn = dynamic(() => import("./archive-btn"), { ssr: false });
const TeamMembers = dynamic(() => import("./team-members"), { ssr: false });
const MeetingCard = dynamic(() => import("./meeting-card"), { ssr: false });

const InviteBtn = dynamic(() => import("./invite-btn"), { ssr: false });

const Dashboard = () => {
  const { project } = useProject();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-y-4">
        {/*github link*/}
        <div className="w-fit rounded-md bg-primary px-4 py-3">
          <div className="flex items-center">
            <Github className="size-5 text-white" />
            <div className="ml-2">
              <p className="text-sm font-medium text-white">
                This Project is linked to{" "}
                <Link
                  target="_blank"
                  href={project?.githubURL ?? ""}
                  className="inline-flex items-center text-white/80 hover:underline"
                >
                  {project?.githubURL}
                  <ExternalLink className="ml-1 size-4" />
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="h-4"></div>
        <div className="flex items-center gap-4">
         <TeamMembers />
          <InviteBtn /> 
          <ArchiveBtn /> 
        </div>
      </div>
      <div className="mt-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-5">
          <AskQuestionCard />
           <MeetingCard /> 
        </div>
      </div>
      <div className="mt-8"></div>
      <CommitLog />
    </div>
  );
};

export default Dashboard;