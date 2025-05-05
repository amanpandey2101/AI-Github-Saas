// /api/process-meeting

import { processMeeting } from "@/lib/assembly";
import { db } from "@/server/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";


const bodyParser = z.object({
    meetingUrl: z.string(),
    projectId: z.string(),
    meetingId: z.string(),
})

export const maxDuration = 60
export async function POST(req: NextRequest){
    const { userId } = await auth();
    if(!userId) return NextResponse.json({error: "Unauthorized"}, {status: 401});
    try{
        const body = await req.json();
        const { meetingUrl, projectId, meetingId } = bodyParser.parse(body);

        const { summaries} = await processMeeting(meetingUrl);
        await db.issue.createMany({
            data: summaries.map(summary=>({
                meetingId,
                summary: summary.summary,
                gist: summary.gist,
                headline: summary.headline,
                start: summary.start,
                end: summary.end,
            }))
        })
        await db.meeting.update({
            where:{
                id: meetingId,
            },
            data:{
                status: "COMPLETED",
                name:summaries[0]!.headline
            }
        })
        return NextResponse.json({message: "Meeting processed successfully"}, {status: 200});
    }
    catch(error){
        console.error(error);
        return NextResponse.json({error: "Internal server error"}, {status: 500});
    }
}
