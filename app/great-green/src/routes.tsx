import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Journey from "./pages/Journey";
import MyJourneys from "./pages/MyJourneys";
import MyContributions from "./pages/Contributions";
import LandingPage from "./pages/LandingPage";
import Welcome from "./pages/Welcome";
import Experience from "./pages/SelectExperience";
import AssignKit from "./pages/AssigningKit";

const router = createBrowserRouter([
  {
    path: "/home",
    Component: App,
    children: [
      {
        Component: Welcome,
        index: true,
      },
      {
        path: "journeys",
        Component: MyJourneys, // List all journeys and create /its id to display journey
      },
      {
        path: "journeys/:id",
        Component: Journey, // List all journeys and create /its id to display journey
      },
      {
        path: "contributions",
        Component: MyContributions, // List all journeys and create /its id to display journey
      },
    ],
  },
  {
    path: "/login",
    Component: Login,
    children: [
      {
        Component: Login,
        index: true,
      },
      /*{
                path: '/user/:id',
                Component: Div
            }*/
    ],
  },
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/select-experience",
    Component: Experience,
  },
  {
    path: "/assign-kit",
    Component: AssignKit,
  },
]);

export default router;
