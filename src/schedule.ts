import { scheduleList } from "./schedule-list-data";
import { inject } from "aurelia-framework";
import { DummyBackend } from "./dummy-backend";
import { getHour } from "helpers/parseDate";

@inject(DummyBackend)
export class Schedule {
  schedule = scheduleList;
  meetings = [];

  constructor(public api: DummyBackend) {}

  created() {
    const meetings = this.api.fetchMeetings();
    this.processMeetings(meetings);

    const times = this.schedule.map(scheduleItem => scheduleItem.time);

    // console.log(times);

    this.meetings.forEach(meeting => {
      /*console.log(`
        timesInd: ${times.indexOf(meeting.StartTime)}
        time: ${meeting.StartTime}
        `);*/
      const timeInd = times.indexOf(meeting.StartTime);

      this.schedule[timeInd].meeting = meeting;
      // console.log(this.meetings[timeInd]);
    });

    console.log(this.schedule);
  }

  processMeetings(meetings) {
    const processedMeetings = meetings.map(meeting => {
      return {
        ...meeting,
        StartTime: getHour(meeting.StartTime),
        EndTime: getHour(meeting.EndTime)
      };
    });

    this.meetings = processedMeetings;
  }
}
