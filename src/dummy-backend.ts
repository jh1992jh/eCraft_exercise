import { meetings } from "./data/meetings.json";

interface Participant {
  name: string;
  title: string;
}

interface Meeting {
  Id: string;
  Subject: string;
  Organizer: string;
  StartTime: string;
  EndTime: string;
  Participants: Participant[] | null;
}

export class DummyBackend {
  currentMeeting = {};
  constructor(public meetings: Meeting[] = []) {}

  fetchMeetings() {
    this.meetings = meetings;
    this.currentMeeting = meetings[1];
    return this.meetings;
  }

  getMeeting(id) {
    const meeting = this.meetings.filter(
      (meeting: Meeting) => meeting.Id === id
    );

    return meeting[0];
  }
}
