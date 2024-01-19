# Book keeper

Simple bookmark manager. Enter bookmarks through a modal dialog form and save it to local data.

First implementation was done the "easy" way by saving JSON to localStorage.

Reworking it to use HTMX and Service Worker.

Used [msw](https://mswjs.io) as the Service Worker to avoid creating a backend, but that was a mistake.

The reason being is that service worker can't access localStorage, and Workbox has the caching tools needed, so I'm just putting this down as a lesson learned.
