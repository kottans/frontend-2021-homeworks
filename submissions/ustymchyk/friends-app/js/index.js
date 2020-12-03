import { Observer } from "./observer.js";
import { CardsComponent } from "./cards-component.js";
import { SidebarComponent } from "./sidebar-component.js";
import { Api } from "./api.js";

const events = new Observer();
const api = new Api();

document.querySelectorAll("[data-component]").forEach((node) => {
  const componentAlias = node.dataset.component;

  if (componentAlias === "cards") {
    new CardsComponent(events, node);
  }

  if (componentAlias === "sidebar") {
    new SidebarComponent(events, node);
  }
});

api.getPokemons().then((pokemons) =>
  events.next({
    type: "api",
    data: pokemons,
  })
);
