import React from 'react'
import IssuesList from '../issues-list';

type Props = {
    params:Promise<{meetingId: string}>
}

const MeetingDetailsPage = async({params}: Props) => {
    const {meetingId} = await params;
    // const {data: meeting} = await api.project.getMeeting.useQuery({meetingId})
  return (
    <IssuesList meetingId={meetingId}/>
  )
}

export default MeetingDetailsPage