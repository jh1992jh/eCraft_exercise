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
        title: "Select_Meeting"
      },
      {
        route: "meeting/:subject",
        mouduleId: PLATFORM.moduleName("meeting"),
        name: "meeting"
      }
    ]);
  }
}
