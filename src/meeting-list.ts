import { scheduledEvent } from "./schedule-list-data";

export class MeetingList {
  schedule: scheduledEvent[];
  decorationStickPosition: number;
  bind(bindingContext, overrideContext) {
    console.log(bindingContext.decorationStickPosition);
    this.schedule = bindingContext.schedule;
    this.decorationStickPosition = bindingContext.decorationStickPosition;
    console.log(this.schedule);
    // console.log(this.schedule);
  }
}
