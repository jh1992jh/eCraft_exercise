import { Meeting } from "meeting";

export interface scheduledEvent {
  time: string;
  meeting?: Meeting | string;
}

export const scheduleList: scheduledEvent[] = [
  {
    time: "7:00",
    meeting: ""
  },
  {
    time: "7:30",
    meeting: ""
  },
  {
    time: "8:00",
    meeting: ""
  },
  {
    time: "8:30",
    meeting: ""
  },
  {
    time: "9:00",
    meeting: ""
  },
  {
    time: "9:30",
    meeting: ""
  },
  {
    time: "10:00",
    meeting: ""
  },
  {
    time: "10:30",
    meeting: ""
  },
  {
    time: "11:00",
    meeting: ""
  },
  {
    time: "11:30",
    meeting: ""
  },
  {
    time: "12:00",
    meeting: ""
  },
  {
    time: "12:30",
    meeting: ""
  },
  {
    time: "13:00",
    meeting: ""
  },
  {
    time: "13:30",
    meeting: ""
  },
  {
    time: "14:00",
    meeting: ""
  },
  {
    time: "14:30",
    meeting: ""
  },
  {
    time: "15:00",
    meeting: ""
  },
  {
    time: "15:30",
    meeting: ""
  },
  {
    time: "16:00",
    meeting: ""
  },
  {
    time: "16:30",
    meeting: ""
  },
  {
    time: "17:00",
    meeting: ""
  }
];
