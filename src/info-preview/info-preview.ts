import { inject } from "aurelia-framework";
import { DummyBackend } from "../dummy-backend";
import { Meeting } from "../meeting";
import { getHour } from "../helpers/parseDate";

@inject(DummyBackend)
export class InfoPreview {
  meeting: Meeting;
  nextMeeting: Meeting;
  progress: number;
  isNextMeeting = false;

  constructor(public api: DummyBackend) {}
  created() {
    this.meeting = this.api.getCurrentMeeting() as any;

    if (this.meeting) {
      this.progress = this.calculateMeetingProgress(this.meeting);
      this.processCurrentMeeting();
    } /* else if (!this.meeting) {
      // Fix this any type
      this.meeting = this.api.getNextMeeting() as any;

      this.isNextMeeting = true;
      this.processCurrentMeeting();
    } */
  }

  processCurrentMeeting() {
    const processedMeeting = {
      ...this.meeting,
      StartTime: getHour(this.meeting.StartTime),
      EndTime: getHour(this.meeting.EndTime)
    };

    this.meeting = processedMeeting;
  }

  calculateMeetingProgress(meeting) {
    const startTimeMins = meeting.StartTime.substring(11, 16).split(":");
    const endTimeMins = meeting.EndTime.substring(11, 16).split(":");
    const currentTimeMins = new Date()
      .toLocaleTimeString()
      .substring(0, 5)
      .split(".");

    const minsPassedTodayStart =
      Number(startTimeMins[0]) * 60 + Number(startTimeMins[1]);
    const minsPassedTodayEnd =
      Number(endTimeMins[0]) * 60 + Number(endTimeMins[1]);
    const minsPassedTodayCurrent =
      Number(currentTimeMins[0]) * 60 + Number(currentTimeMins[1]);

    const startTimeSecs = minsPassedTodayStart * 60;
    const endTimeSecs = minsPassedTodayEnd * 60;
    const currentTimeSecs = minsPassedTodayCurrent * 60;

    const timePassed = currentTimeSecs - startTimeSecs;
    const timeLeft = endTimeSecs - currentTimeSecs;
    const duration = endTimeSecs - startTimeSecs;
    const percentage = (timePassed / duration) * 100;

    return Number(percentage.toFixed(2));
  }
}
