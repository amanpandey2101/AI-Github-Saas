import { z } from 'zod'
import {createTRPCRouter, protectedProcedure} from '../trpc'
import { pollCommit } from '@/lib/github';
import { indexGithubRepo } from '@/lib/github-loader';

export const projectRouter = createTRPCRouter({
    createProject: protectedProcedure.input(
        z.object({
            name: z.string(),
            repoUrl: z.string(),
            githubToken: z.string().optional(),
        })
    )
    .mutation(async ({ ctx, input }) => {
        const project = await ctx.db.project.create({
          data: {
            name: input.name,
            githubURL: input.repoUrl,
            userToProjects: {
              create: {
                userId: ctx.user.userId!,
              },
            },
          },
        });
        await indexGithubRepo(project.id, input.repoUrl, input.githubToken);
        await pollCommit(project.id);
        return project;
      }),
      getProjects: protectedProcedure.query(async ({ ctx }) => {
        return await ctx.db.project.findMany({
            where:{
                userToProjects:{
                    some:{
                        userId: ctx.user.userId!
                    }
                },
                deletedAt: null
            }
        })
      }),
      getCommits: protectedProcedure.input(z.object({
        projectId: z.string()
      })).query(async ({ctx, input}) => {
        pollCommit(input.projectId).then().catch(console.error)
        return await ctx.db.commit.findMany({
            where: {
                projectId: input.projectId
            }
        })
      }),
      saveAnswer: protectedProcedure
      .input(
        z.object({
          projectId: z.string(),
          question: z.string(),
          answer: z.string(),
          filesReferences: z.any(),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        return await ctx.db.question.create({
          data: {
            answer: input.answer,
            filesReferences: input.filesReferences,
            question: input.question,
            projectId: input.projectId,
            userId: ctx.user.userId!,
          },
        });
      }),
    getQuestions: protectedProcedure
      .input(
        z.object({
          projectId: z.string(),
        }),
      )
      .query(async ({ ctx, input }) => {
        return await ctx.db.question.findMany({
          where: {
            projectId: input.projectId,
          },
          include: {
            user: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
      }),
      uploadMeeting: protectedProcedure.input(z.object({
        projectId: z.string(),
        meetingUrl: z.string(),
        name: z.string(),
      })).mutation(async ({ctx, input}) => {
        const meeting = await ctx.db.meeting.create({
          data:{
            meetingUrl: input.meetingUrl,
            name: input.name,
            projectId: input.projectId,
            status: 'PROCESSING'
          }
        })
        return meeting;
      }),
      getMeetings: protectedProcedure.input(z.object({
        projectId: z.string(),
      })).query(async ({ctx, input}) => {
        return await ctx.db.meeting.findMany({
          where: {projectId: input.projectId}, include:{issues:true}
        })
      }),
      deleteMeeting: protectedProcedure.input(z.object({
        meetingId: z.string(),
      })).mutation(async ({ctx, input}) => {
        return await ctx.db.meeting.delete({
          where: {id: input.meetingId}
        })
      }),
      getMeetingById: protectedProcedure.input(z.object({
        meetingId: z.string(),
      })).query(async ({ctx, input}) => {
        return await ctx.db.meeting.findUnique({
          where: {id: input.meetingId}, include:{issues:true}
        })
      }),
    archiveProject: protectedProcedure
      .input(
        z.object({
          projectId: z.string(),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        return await ctx.db.project.update({
          where: {
            id: input.projectId,
          },
          data: {
            deletedAt: new Date(),
          },
        });
      }),
    getTeamMembers: protectedProcedure
      .input(
        z.object({
          projectId: z.string(),
        }),
      )
      .query(async ({ ctx, input }) => {
        return await ctx.db.userToProject.findMany({
          where: {
            projectId: input.projectId,
          },
          include: {
            user: true,
          },
        });
      }),
})