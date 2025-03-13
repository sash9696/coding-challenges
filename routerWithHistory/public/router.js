//URL will change based on the hash (after the # symbol),

const homeBtn = document.getElementById("homeBtn");
const aboutBtn = document.getElementById("aboutBtn");
const contactBtn = document.getElementById("contactBtn");
const userBtn = document.getElementById("userBtn");

const routes = {
  "/home": () => `<h1>Home</h1><p>Welcome to the home page!</p>`,
  "/about": () => `<h1>About</h1><p>This is the about page.</p>`,
  "/contact": () => `<h1>Contact</h1><p>Get in touch!</p>`,
  "/user": (id) => `<h1>User: ${id}</h1>`,
};

//functions

function navigateTo(path) {
  setCustomPathname(path);

  if (path.includes('/user/')) {
    const userId = path.split('/')[2];
    // renderRoute(path, userId); // Render user with ID
    const newPath = `/${path.split('/')[1]}`;
    renderRoute(newPath, userId);
} else {
    renderRoute(path); // Render simple route
}
}

function renderRoute(path, userId = null) {
  // Match route and render corresponding content

  const route = routes[path];
  console.log('path',{path,userId,route})

  if (route) {
    document.getElementById("view").innerHTML = userId
      ? route(userId)
      : route();
  } else {
    document.getElementById(
      "view"
    ).innerHTML = `<h1>404 Not Found</h1><p>The page you're looking for doesn't exist.</p>`;
  }
};

function setCustomPathname(path) {
  console.log('setCustomPathname',path)
  window.history.pushState(null, '', path);
};

//events

homeBtn.addEventListener("click", () => navigateTo("/home"));

aboutBtn.addEventListener("click", () => navigateTo("/about"));

contactBtn.addEventListener("click", () => navigateTo("/contact"));
userBtn.addEventListener("click", () => navigateTo("/user/123"));

window.addEventListener("load", () => {
  let path = window.location.pathname || "home";

  if(path.includes('/routerWithHistory/index.html')){
    path = path.replace('/routerWithHistory/index.html','');
  };

  console.log("path456", path);
  setCustomPathname(path);
  if(!path || path === '/'){
    path = '/home';
  };

  if (path.includes("/user/")) {
    console.log('userId',path.split("/"))
    const userId = path.split("/")[2];
    console.log('123',path.split('/')[1])
    const newPath = `/${path.split('/')[1]}`;
    renderRoute(newPath, userId);
  } else {
    renderRoute(path);
  }
});
