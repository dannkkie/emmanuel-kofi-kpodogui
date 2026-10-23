"use client";

import { useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

function hasScrolled() {
  return window.scrollY > 0;
}

function serverSnapshot() {
  return false;
}

export default function BackToTop() {
  const visible = useSyncExternalStore(subscribe, hasScrolled, serverSnapshot);

  return (
    <a
      href="#top"
      className="back-to-top"
      data-visible={visible}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      aria-label="Back to top"
      title="Back to top"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m6 12 6-6 6 6M12 6v13" />
      </svg>
    </a>
  );
}
