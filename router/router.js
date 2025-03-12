//URL will change based on the hash (after the # symbol),

const routes = {
  home: "<h1>Home </h1><p>Welcome to the home page!</p>",
  about: "<h1>About </h1><p>Welcome to the about page!</p>",
  contact: "<h1>Contact</h1><p>Get in touch!</p>",
  user: (id) => `<h1>User: ${id}</h1>`, //dynamic routes
  post: (id) => `<h1>Post: ${id}</h1>`,
};

function router() {
  // Get the current hash or default to 'home' if no hash is present
  const hash = window.location.hash.substring(1) || "home";

  //dynamic #user/123

  const routeParts = hash.split("/");

  const route = routeParts[0];

  const params = routeParts[1];

  console.log("hash", { route, params });

  if (routes[route]) {
    if (typeof routes[route] == "function") {
      document.getElementById("view").innerHTML =
        routes[route](params) || "<h1>404 not found</h1>";
    } else {
      document.getElementById("view").innerHTML =
        routes[hash] || "<h1>404 not found</h1>";
    }
  } else {
    document.getElementById("view").innerHTML = "<h1>404 not found</h1>";
  }
}
window.addEventListener("hashchange", router);
window.addEventListener("load", router);
