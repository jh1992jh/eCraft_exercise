import { inject } from "aurelia-framework";
import { DummyBackend } from "./dummy-backend";
import { Meeting } from "meeting";
import { getHour } from "helpers/parseDate";

@inject(DummyBackend)
export class InfoPreview {
  currentMeeting: Meeting;

  constructor(public api: DummyBackend) {}

  // TODO WRITE A LICECYCLE METHOD THAT CHANGES THE CURRENT MEETING BASED ON TIME
  created() {
    const meetings = this.api.fetchMeetings();

    this.currentMeeting = meetings[0];
    this.processCurrentMeeting();
  }

  processCurrentMeeting() {
    const processedMeeting = {
      ...this.currentMeeting,
      StartTime: getHour(this.currentMeeting.StartTime),
      EndTime: getHour(this.currentMeeting.EndTime)
    };

    this.currentMeeting = processedMeeting;
  }
}
