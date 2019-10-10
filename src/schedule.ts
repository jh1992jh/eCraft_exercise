import { scheduleList } from "./schedule-list-data";
import { inject } from "aurelia-framework";
import { DummyBackend } from "./dummy-backend";
import { getHour } from "./helpers/parseDate";

@inject(DummyBackend)
export class Schedule {
  schedule = scheduleList;
  meetings = [];
  decorationStickPosition: number | boolean = 0;

  constructor(public api: DummyBackend) {}

  created() {
    this.api.fetchMeetings();
    this.processMeetings(this.api.meetings);

    const times = this.schedule.map(scheduleItem => scheduleItem.time);

    this.meetings.forEach(meeting => {
      const timeInd = times.indexOf(meeting.StartTime);

      this.schedule[timeInd].meeting = meeting;
    });

    this.calcDecorationStickPosition();
  }

  processMeetings(meetings) {
    const processedMeetings = meetings.map(meeting => {
      this.calcMeetingCardHeight(meeting);
      return {
        ...meeting,
        StartTime: getHour(meeting.StartTime),
        EndTime: getHour(meeting.EndTime),
        height: this.calcMeetingCardHeight(meeting)
      };
    });

    this.meetings = processedMeetings;
  }

  calcMeetingCardHeight(meeting) {
    const startMins = meeting.StartTime.substring(11, 16).split(":");
    const endMins = meeting.EndTime.substring(11, 16).split(":");

    const totalStartMins = Number(startMins[0]) * 60 + Number(startMins[1]);
    const totalEndMins = Number(endMins[0]) * 60 + Number(endMins[1]);

    const difference = totalEndMins - totalStartMins;
    const height = (difference / 30) * 100;

    return `${height}%`;
  }

  calcDecorationStickPosition() {
    const totalAvailableMins = 10 * 60;

    const hours = new Date().getHours();
    const hoursPosition = (hours - 7) * 60;
    const mins = new Date().getMinutes();
    const finalPosition = hoursPosition + mins;

    if (hours < 7 || hours > 16) {
      this.decorationStickPosition = false;
      return;
    }

    // First param: klo 7 = 0; klo 10 = 180, klo 11 = 240,klo 11:15 = 255, klo 12 = 300, klo 17 = 600 etc..., see how 60 moves it by an hour and 30 by half an hour,  200 comes from the ul lenght 100% would be five hours but since there are 10 hours in the list it has to be multiplied by 200
    this.decorationStickPosition = (finalPosition / totalAvailableMins) * 200;
  }
}
