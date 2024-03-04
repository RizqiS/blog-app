import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { getEvents as getEventsLoader, addEvents, deleteEvents } from "./libs/events-api";
import RootLayout from "./layout/RootLayout";
import HomeBlogs from "./pages/HomeBlogs";
import { lazy } from "react";

// import EventDetails from "./pages/EventDetails";
// import EventNews from "./pages/EventNews";
// import EventEdits from "./pages/EventEdits";
// import EventsBlog from "./pages/EventsBlog";

const EventDetails = lazy(() => import("./pages/EventDetails"));
const EventNews = lazy(() => import("./pages/EventNews"));
const EventEdits = lazy(() => import("./pages/EventEdits"));
const EventsBlog = lazy(() => import("./pages/EventsBlog"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        loader: getEventsLoader,
        element: <HomeBlogs />,
      },
      {
        path: "events",
        element: null,
        children: [
          {
            index: true,
            element: <EventsBlog />,
          },
          {
            path: ":id",
            id: "event-detail",
            loader: getEventsLoader,
            children: [
              {
                path: "detail",
                action: deleteEvents,
                element: <EventDetails />,
              },
              {
                path: "edit",
                action: addEvents,
                element: <EventEdits />,
              },
            ],
          },
          {
            path: "new",
            action: addEvents,
            element: <EventNews />,
          },
        ],
      },
      {
        path: "auth",
        element: null,
      },
    ],
  },
]);

export default function BlogAppRouter() {
  return <RouterProvider router={router} />;
}
