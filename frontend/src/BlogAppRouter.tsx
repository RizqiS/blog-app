import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import HomeBlogs from "./pages/HomeBlogs";
import { lazy, Suspense } from "react";
import { loaderToken, loaderCheckAuth } from "./util/mytoken";

// import { addEvents, deleteEvents } from "./libs/events-api";
// import { logoutAction } from "./pages/events-blog/Logout";
// import { actionAuthentication } from "./libs/auth-api";
// import ErrorPages from "./pages/Errors";
// import EventDetails from "./pages/EventDetails";
// import EventNews from "./pages/EventNews";
// import EventEdits from "./pages/EventEdits";
// import EventsBlog from "./pages/EventsBlog";

const ErrorPages = lazy(() => import("./pages/Errors"));
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
    errorElement: (
      <Suspense>
        <ErrorPages />
      </Suspense>
    ),
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomeBlogs />,
      },
      {
        path: "events",
        children: [
          {
            index: true,
            loader: (meta) => import("./libs/events-api").then((module) => module.getEvents(meta)),
            element: (
              <Suspense>
                <EventsBlog />
              </Suspense>
            ),
          },
          {
            id: "event-detail",
            path: ":id",
            loader: (meta) => import("./libs/events-api").then((module) => module.getEvents(meta)),
            children: [
              {
                path: "detail",
                action: (meta) => import("./libs/events-api").then((module) => module.deleteEvents(meta)),
                element: (
                  <Suspense fallback={<p className="text-center">Loading...</p>}>
                    <EventDetails />
                  </Suspense>
                ),
              },
              {
                path: "edit",
                loader: loaderCheckAuth,
                action: (meta) => import("./libs/events-api").then((module) => module.addEvents(meta)),
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
            action: (meta) => import("./libs/events-api").then((module) => module.addEvents(meta)),
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
        action: (meta) => import("./libs/auth-api").then((module) => module.actionAuthentication(meta)),
        element: (
          <Suspense fallback={<p className="text-center">Loading...</p>}>
            <Authentication />
          </Suspense>
        ),
      },
      {
        path: "logout",
        action: (meta) => import("./pages/events-blog/Logout").then((module) => module.logoutAction(meta)),
        element: null,
      },
    ],
  },
]);

export default function BlogAppRouter() {
  return <RouterProvider router={router} />;
}
