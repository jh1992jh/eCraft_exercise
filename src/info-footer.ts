import { inject } from "aurelia-framework";
import { DummyBackend } from "./dummy-backend";
import { Meeting } from "./meeting";
import { getHour } from "./helpers/parseDate";

@inject(DummyBackend)
export class InfoFooter {
  meetings: Meeting[];
  constructor(private api: DummyBackend) {}
  created() {
    this.api.fetchMeetings();
    this.processMeetings(this.api.getNextMeetings());
    console.log(this.api.getNextMeetings());
  }

  processMeetings(meetings) {
    const processedMeetings = meetings.map(meeting => {
      return {
        ...meeting,
        StartTime: getHour(meeting.StartTime),
        EndTime: getHour(meeting.EndTime)
      };
    });
    this.meetings = processedMeetings.slice(1, 4);
  }
}
