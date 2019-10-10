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
  nextMeetings: Meeting[] = [];
  constructor(public meetings: Meeting[] = []) {}

  fetchMeetings() {
    this.meetings = meetings;
    this.meetings = this.getTodaysMeetings(this.meetings);
    this.currentMeeting = this.getCurrentMeeting();
    return this.meetings;
  }

  getMeeting(id) {
    const meeting = this.meetings.filter(
      (meeting: Meeting) => meeting.Id === id
    );

    return meeting[0];
  }

  getTodaysMeetings(meetings) {
    const today = new Date()
      .toLocaleDateString()
      .substring(0, 11)
      .split(".")
      .reverse()
      .join("");

    const meetingDay = meeting => {
      return meeting.StartTime.substring(0, 10)
        .split("-")
        .join("");
    };

    const todaysMeetings = meetings.filter(
      meeting => meetingDay(meeting) === today
    );

    return todaysMeetings;
  }

  getNextMeetings() {
    const nextMeetings = meetings.filter(
      meeting => Date.parse(meeting.StartTime) > Date.now()
    );

    const sortedMeetings = nextMeetings.sort((a: any, b: any): number => {
      a = new Date(a.StartTime);
      b = new Date(b.StartTime);
      return a < b ? -1 : a > b ? 1 : 0;
    });

    return sortedMeetings;
  }

  getNextMeeting() {
    return meetings
      .filter(meeting => Date.parse(meeting.StartTime) > Date.now())
      .sort((a: any, b: any): number => {
        a = new Date(a.StartTime);
        b = new Date(b.StartTime);
        return a < b ? -1 : a > b ? 1 : 0;
      })[0];
  }
  getCurrentMeeting() {
    const isCurrentMeeting = meeting => {
      const StartTimeS = Date.parse(meeting.StartTime) / 1000;
      const EndTimeS = Date.parse(meeting.EndTime) / 1000;
      const currentTime = Date.parse(new Date().toString()) / 1000;

      if (StartTimeS < currentTime && EndTimeS > currentTime) {
        return true;
      } else {
        return false;
      }
    };

    const currentMeeting = meetings
      .map(meeting => {
        if (isCurrentMeeting(meeting)) {
          return meeting;
        }
      })
      .filter(meetings => meetings !== undefined);

    if (currentMeeting[0]) {
      return currentMeeting[0];
    }
  }
}
