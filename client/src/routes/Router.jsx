// src/router.js
import { createBrowserRouter } from "react-router-dom";
import { PublicRoute,ProtectedRoute } from "./RouteGuards";
import AppLayout from "../AppLayout";

import HomePage from "@pages/HomePage";
import StandingsPage from "@pages/StandingsPage";
import DriversPage from "@pages/DriversPage";
import TeamsPage from "@pages/TeamsPage";
import EventsPage from "@pages/EventsPage";
import UserProfile from "@pages/UserProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout/>,
    children: [
      {
        path: "/",
        element:
          <PublicRoute>
            <HomePage />
          </PublicRoute>,
      },
      {
        path: "/standings",
        element: (
          <ProtectedRoute>
            <StandingsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/drivers",
        element: (
          <ProtectedRoute>
            <DriversPage />
          </ProtectedRoute>
        ),      
      },
      {
        path: "/teams",
        element: (
          <ProtectedRoute>
            <TeamsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/events",
        element: (
          <ProtectedRoute>
            <EventsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        ),
      }
    ],
  },
]);

export default router;
