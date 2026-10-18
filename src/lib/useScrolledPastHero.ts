"use client";

import { useSyncExternalStore } from "react";

// True once the hero (#home) has fully scrolled out of view. Shared by the mobile
// sticky bar and the floating actions so exactly one of them shows on small screens.
function subscribe(cb: () => void) {
  let raf = 0;
  const onScroll = () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(cb);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
  };
}

function getSnapshot() {
  const hero = document.getElementById("home");
  return hero ? hero.getBoundingClientRect().bottom < 0 : false;
}

export function useScrolledPastHero() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
