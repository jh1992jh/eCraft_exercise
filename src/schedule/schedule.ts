import { scheduleList } from "./schedule-list-data";
import { inject } from "aurelia-framework";
import { DummyBackend } from "../dummy-backend";
import { getHour } from "../helpers/parseDate";
import { Meeting } from "meeting";

@inject(DummyBackend)
export class Schedule {
  schedule = scheduleList;
  decorationStickPosition: number | boolean = 0;
  constructor(public api: DummyBackend, public meetings: Meeting[]) {}

  created() {
    this.meetings = this.api.meetings;
    this.calcDecorationStickPosition();
  }

  attached() {
    this.processMeetings(this.meetings);

    const times = this.schedule.map(scheduleItem => scheduleItem.time);

    this.meetings.forEach(meeting => {
      const processedMeeting = this.getTodaysMeetings(meeting);
      if (processedMeeting) {
        const timeInd = times.indexOf(processedMeeting.StartTime);

        if (timeInd > -1) {
          this.schedule[timeInd].meeting = processedMeeting;
        }
      }
    });
  }

  getTodaysMeetings(meeting) {
    const today = new Date().toISOString().substring(0, 10);

    const meetingDay = meeting => {
      return meeting.FullStartDate.substring(0, 10);
    };

    if (meetingDay(meeting) === today) {
      return meeting;
    } else {
      return null;
    }
  }

  processMeetings(meetings) {
    const processedMeetings = meetings.map(meeting => {
      this.calcMeetingCardHeight(meeting);
      return {
        ...meeting,
        StartTime: getHour(meeting.StartTime),
        EndTime: getHour(meeting.EndTime),
        FullStartDate: meeting.StartTime,
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

    const height = (totalEndMins - totalStartMins) / 3;

    return `${height * 10}%`;
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
