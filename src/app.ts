import "./app.scss";
import { Router, RouterConfiguration } from "aurelia-router";
import { PLATFORM } from "aurelia-pal";
import { inject } from "aurelia-framework";
import { DummyBackend } from "./dummy-backend";

@inject(DummyBackend)
export class App {
  constructor(public api: DummyBackend) {}

  created() {
    this.api.fetchMeetings();
    //this.api.getNextMeeting();
  }
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = "Meetings";
    config.map([
      {
        route: "",
        moduleId: PLATFORM.moduleName("./schedule/schedule"),
        name: "schedule"
      },
      {
        route: "meeting/:Id",
        moduleId: PLATFORM.moduleName("./meeting-detail/meeting-detail"),
        name: "meeting-detail"
      }
    ]);
  }
}
