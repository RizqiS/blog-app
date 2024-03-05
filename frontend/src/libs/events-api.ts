import { ActionFunctionArgs, LoaderFunctionArgs, json, redirect } from "react-router-dom";
import { getToken } from "../util/auth-token";

const url: string = import.meta.env.VITE_BACEND_URL as string;
type Params = {
  request: Request;
  id: string;
};

const token = getToken();

export async function getEvents({ params }: LoaderFunctionArgs<Params>) {
  let urlEvents = url + "/events";
  if (params.id) {
    urlEvents = url + "/events/" + params.id;
  }

  const resEvents = await fetch(`${urlEvents}`);

  const events = await resEvents.json();
  if (!resEvents.ok) {
    json({ message: "Could not fetch events." }, { status: 500 });
  }
  return events;
}

export async function addEvents({ params, request }: ActionFunctionArgs<Params>) {
  const fd = await request.formData();
  const events = {
    title: fd.get("title") as string,
    image: fd.get("image") as string,
    description: fd.get("description") as string,
  };

  let newUrl = url + "/events";
  if (params.id) {
    newUrl += `/${params.id}`;
  }

  const config = {
    method: request.method,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(events),
  };

  const resEvents = await fetch(newUrl, config);
  const data = await resEvents.json();
  if (!resEvents) {
    json({ message: data.message }, { status: data.status });
  }
  return redirect("/");
}

export async function deleteEvents({ params, request }: LoaderFunctionArgs<Params>) {
  await fetch(url + "/events/" + params.id, {
    headers: {
      Authorization: "Bearer " + token,
    },
    method: request.method,
  });
  return redirect("/");
}
