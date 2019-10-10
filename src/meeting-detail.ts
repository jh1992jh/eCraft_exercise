import { inject } from "aurelia-framework";
import { DummyBackend } from "./dummy-backend";
import { getHour, getDay, getDisplayDate } from "./helpers/parseDate";
import "font-awesome/css/font-awesome.css";

@inject(DummyBackend)
export class MeetingDetail {
  currentMeeting = {};
  showParticipants = false;

  constructor(public api: DummyBackend) {}

  activate(params, routeConfig) {
    const meeting = this.api.getMeeting(params.Id);
    this.currentMeeting = meeting;
    this.processMeeting(this.currentMeeting);
  }

  processMeeting(meeting) {
    const processedMeeting = {
      ...meeting,
      StartTime: getHour(meeting.StartTime),
      EndTime: getHour(meeting.EndTime),
      displayDate: getDisplayDate(meeting.StartTime)
    };

    this.currentMeeting = processedMeeting;
  }

  toggleShowParticipants() {
    const participants = this.showParticipants;
    this.showParticipants = !participants;
  }
}
