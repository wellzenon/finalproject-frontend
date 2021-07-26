const getCsrf = async () => {
  const apiEnd = "http://localhost:8000/auth/csrf";
  const options = { credentials: "include" };

  const response = await fetch(apiEnd, options);
  return response.headers.get("X-CSRFToken");
};

const signUp = async (formValues) => {
  const csrf = await getCsrf();
  const apiEnd = "http://localhost:8000/auth/signup/";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrf,
    },
    credentials: "include",
    body: JSON.stringify(formValues),
  };

  const response = await fetch(apiEnd, options);
  return { ok: response.ok, json: await response.json() };
};

const login = async (formValues) => {
  const csrf = await getCsrf();
  const apiEnd = "http://localhost:8000/auth/login/";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrf,
    },
    credentials: "include",
    body: JSON.stringify(formValues),
  };

  const response = await fetch(apiEnd, options);
  return { ok: response.ok, json: await response.json() };
};

export { getCsrf, login, signUp };
