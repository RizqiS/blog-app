import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { getEvents as getEventsLoader, addEvents, deleteEvents } from "./libs/events-api";
import { actionAuthentication } from "./libs/auth-api";
import RootLayout from "./layout/RootLayout";
import HomeBlogs from "./pages/HomeBlogs";
import { lazy, Suspense } from "react";
import Authentication from "./pages/events-blog/Authentication";

// import EventDetails from "./pages/EventDetails";
// import EventNews from "./pages/EventNews";
// import EventEdits from "./pages/EventEdits";
// import EventsBlog from "./pages/EventsBlog";

const EventDetails = lazy(() => import("./pages/events-blog/EventDetails"));
const EventNews = lazy(() => import("./pages/events-blog/EventNews"));
const EventEdits = lazy(() => import("./pages/events-blog/EventEdits"));
const EventsBlog = lazy(() => import("./pages/events-blog/EventsBlog"));

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
            element: (
              <Suspense>
                <EventsBlog />
              </Suspense>
            ),
          },
          {
            path: ":id",
            id: "event-detail",
            loader: getEventsLoader,
            children: [
              {
                path: "detail",
                action: deleteEvents,
                element: (
                  <Suspense fallback={<p className="text-center">Loading...</p>}>
                    <EventDetails />
                  </Suspense>
                ),
              },
              {
                path: "edit",
                action: addEvents,
                element: (
                  <Suspense fallback={<p className="text-center">Loading...</p>}>
                    <EventEdits />
                  </Suspense>
                ),
              },
            ],
          },
          {
            path: "new",
            action: addEvents,
            element: (
              <Suspense fallback={<p className="text-center">Loading...</p>}>
                <EventNews />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "auth",
        action: actionAuthentication,
        element: <Authentication />,
      },
    ],
  },
]);

export default function BlogAppRouter() {
  return <RouterProvider router={router} />;
}
