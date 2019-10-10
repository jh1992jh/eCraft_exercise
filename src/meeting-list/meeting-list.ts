import { scheduledEvent } from "../schedule/schedule-list-data";

export class MeetingList {
  schedule: scheduledEvent[];
  decorationStickPosition: number | boolean;
  bind(bindingContext, overrideContext) {
    this.schedule = bindingContext.schedule;
    this.decorationStickPosition = bindingContext.decorationStickPosition;
  }
}
