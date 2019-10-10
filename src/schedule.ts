import { scheduleList } from "./schedule-list-data";
import { inject } from "aurelia-framework";
import { DummyBackend } from "./dummy-backend";
import { getHour } from "./helpers/parseDate";

@inject(DummyBackend)
export class Schedule {
  schedule = scheduleList;
  meetings = [];
  decorationStickPosition = 0;

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
    const currentMins = new Date()
      .toTimeString()
      .substring(0, 5)
      .split(":");

    const currentTotalMins =
      Number(currentMins[0]) * 60 + Number(currentMins[1]);
    console.log(currentMins, currentTotalMins);

    // 600 comes from 10 total available hours * 60 (7 - 17), 200 comes from the ul lenght 100% would be 640 that includes five hours but since there are 10 hours in the list it has to be multiplied by 200
    // First param: klo 7 = 0; klo 10 = 180, klo 11 = 240, klo 12 = 300, klo 17 = 600, see how 60 moves it by an hour and 30 by half an hour
    this.decorationStickPosition = (480 / totalAvailableMins) * 200;
    // ADD DISPLAY NONE IF THE TIME IS NOT BETWEEN 7 - 17
    console.log(this.decorationStickPosition);
  }
}
