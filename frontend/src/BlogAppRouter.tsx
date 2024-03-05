import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { getEvents as getEventsLoader, addEvents, deleteEvents } from "./libs/events-api";
import { actionAuthentication } from "./libs/auth-api";
import RootLayout from "./layout/RootLayout";
import HomeBlogs from "./pages/HomeBlogs";
import { lazy, Suspense } from "react";
import { logoutAction } from "./pages/events-blog/Logout";
import { loaderToken, loaderCheckAuth } from "./util/mytoken";
import ErrorPages from "./pages/Errors";

// import EventDetails from "./pages/EventDetails";
// import EventNews from "./pages/EventNews";
// import EventEdits from "./pages/EventEdits";
// import EventsBlog from "./pages/EventsBlog";

const EventDetails = lazy(() => import("./pages/events-blog/EventDetails"));
const EventNews = lazy(() => import("./pages/events-blog/EventNews"));
const EventEdits = lazy(() => import("./pages/events-blog/EventEdits"));
const EventsBlog = lazy(() => import("./pages/events-blog/EventsBlog"));
const Authentication = lazy(() => import("./pages/events-blog/Authentication"));

const router = createBrowserRouter([
  {
    id: "token",
    path: "/",
    loader: loaderToken,
    errorElement: <ErrorPages />,
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomeBlogs />,
      },
      {
        path: "events",
        element: null,
        children: [
          {
            loader: getEventsLoader,
            index: true,
            element: (
              <Suspense>
                <EventsBlog />
              </Suspense>
            ),
          },
          {
            id: "event-detail",
            path: ":id",
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
                loader: loaderCheckAuth,
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
            loader: loaderCheckAuth,
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
        element: (
          <Suspense fallback={<p className="text-center">Loading...</p>}>
            <Authentication />
          </Suspense>
        ),
      },
      {
        path: "logout",
        action: logoutAction,
        element: null,
      },
    ],
  },
]);

export default function BlogAppRouter() {
  return <RouterProvider router={router} />;
}
