const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

fetch(`${VITE_API_BASE_URL}/api/some-endpoint`, {
  method: "GET",
})
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
