import "./app.scss";
import { Router, RouterConfiguration } from "aurelia-router";
import { PLATFORM } from "aurelia-pal";
import { DummyBackend } from "./dummy-backend";

const dummyBackend = new DummyBackend();
dummyBackend.fetchMeetings();
export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = "Meetings";
    config.map([
      {
        route: "",
        moduleId: PLATFORM.moduleName("schedule"),
        name: "schedule"
      },
      {
        route: "meeting/:Id",
        moduleId: PLATFORM.moduleName("meeting-detail"),
        name: "meeting-detail"
      }
    ]);
  }
}
