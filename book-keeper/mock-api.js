import { http } from "msw";
import { setupWorker } from "msw/browser";

let bookmarks = [
  {
    name: "jacinto design",
    url: "https://jacinto.design",
  },
];

const worker = setupWorker(
  http.get(
    "/bookmarks",
    () =>
      new Response(JSON.stringify(bookmarks), {
        status: 200,
      }),
  ),
  http.post("/bookmarks", async (res, resp) => {
    const body = await res.request.json();

    bookmarks = [...bookmarks, body];
    const jsonResponse = new Response(JSON.stringify(bookmarks), {
      status: 200,
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    });
    return jsonResponse;
  }),
  http.delete("/bookmarks/:id", (res) => {
    const id = Number(res.params.id);
    bookmarks = bookmarks.filter((_, index) => {
      return !(index === id);
    });
    return new Response(JSON.stringify(bookmarks), {
      status: 201,
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    });
  }),
);

worker
  .start()
  .then(() => {
    initializePage();
  })
  .catch(console.error);
