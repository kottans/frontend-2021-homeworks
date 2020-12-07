import { Observer } from "./observer.js";
import { CardsComponent } from "./cards-component.js";
import { SidebarComponent } from "./sidebar-component.js";
import { Api } from "./api.js";

import { Components } from './components.js';
import { Events } from './events.js';

const events = new Observer();
const api = new Api();

document.querySelectorAll("[data-component]").forEach((node) => {
  const componentAlias = node.dataset.component;

  if (componentAlias === Components.cards) {
    new CardsComponent(events, node);
  }

  if (componentAlias === Components.sidebar) {
    new SidebarComponent(events, node);
  }
});

api.getPokemons()
  .then((pokemons) =>
    events.next({
      type: Events.api,
      data: pokemons,
    })
  )
  .catch(() => alert('Sorry, somethings wrong with server, thy again letter :('));
