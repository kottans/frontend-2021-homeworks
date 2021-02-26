import { pickCard } from "./game.js";

export function handler({ target }) {
  if (target.classList.contains("card")) {
    const cardIsAnimating =
      target.classList.contains("hiding") ||
      target.classList.contains("closing");

    if (!cardIsAnimating) pickCard(+target.id);
  }
}
