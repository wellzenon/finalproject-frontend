import { getCsrf } from "./auth";

const imageUpload = async (image) => {
  try {
    const data = new FormData();
    data.append("file", image, image.name);
    data.append("folder", "teste");
    data.append("upload_preset", "ucjtaxzy");
    data.append("cloud_name", "eventcalendar");

    const apiEnd = "https://api.cloudinary.com/v1_1/eventcalendar/image/upload";
    const options = { method: "post", body: data };

    const response = await fetch(apiEnd, options);
    return await response.json();
  } catch (e) {
    console.error(e);
  }
};

const postEvent = async (newEvent) => {
  try {
    const csrf = await getCsrf();
    const apiEnd = "http://localhost:8000/events/";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrf,
      },
      credentials: "include",
      body: JSON.stringify(newEvent),
    };

    const response = await fetch(apiEnd, options);
    return { ok: response.ok, json: await response.json() };
  } catch (e) {
    return e;
  }
};

const postPresence = async (newPresence) => {
  try {
    const csrf = await getCsrf();
    const apiEnd = "http://localhost:8000/presences/";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrf,
      },
      credentials: "include",
      body: JSON.stringify(newPresence),
    };

    const response = await fetch(apiEnd, options);
    return { ok: response.ok, json: await response.json() };
  } catch (e) {
    return e;
  }
};

const patchPresence = async (presenceId, presenceUpdate) => {
  try {
    const csrf = await getCsrf();
    const apiEnd = `http://localhost:8000/presences/${presenceId}/`;
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrf,
      },
      credentials: "include",
      body: JSON.stringify(presenceUpdate),
    };

    const response = await fetch(apiEnd, options);
    return { ok: response.ok, json: await response.json() };
  } catch (e) {
    return e;
  }
};

const postComment = async (newComment) => {
  try {
    const csrf = await getCsrf();
    const apiEnd = "http://localhost:8000/comments/";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrf,
      },
      credentials: "include",
      body: JSON.stringify(newComment),
    };

    const response = await fetch(apiEnd, options);
    return { ok: response.ok, json: await response.json() };
  } catch (e) {
    return e;
  }
};

const patchComment = async (commentId, commentUpdate) => {
  try {
    const csrf = await getCsrf();
    const apiEnd = `http://localhost:8000/comments/${commentId}/`;
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrf,
      },
      credentials: "include",
      body: JSON.stringify(commentUpdate),
    };

    const response = await fetch(apiEnd, options);
    return { ok: response.ok, json: await response.json() };
  } catch (e) {
    return e;
  }
};

export {
  imageUpload,
  postEvent,
  postPresence,
  patchPresence,
  postComment,
  patchComment,
};
