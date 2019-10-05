import { meetings } from "./data/meetings.json";

interface Participant {
  name: string;
  title: string;
}

interface Meeting {
  Subject: string;
  Organizer: string;
  StartTime: string;
  EndTime: string;
  Participants: Participant[] | null;
}

export class DummyBackend {
  constructor(public meetings: Meeting[] = []) {}

  fetchMeetings() {
    this.meetings = meetings;
    return this.meetings;
  }
}
