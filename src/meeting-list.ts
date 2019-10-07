export class MeetingList {
  schedule: any;
  bind(bindingContext, overrideContext) {
    //console.log(bindingContext);
    this.schedule = bindingContext.schedule;
    console.log(this.schedule);
    // console.log(this.schedule);
  }
}
