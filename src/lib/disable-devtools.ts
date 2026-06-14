export function disableDevtoolsShortcuts() {
  if (typeof document === "undefined" || typeof window === "undefined") return;
  const w = window as Window & { __disableDevtoolsInstalled?: boolean };
  if (w.__disableDevtoolsInstalled) return;
  w.__disableDevtoolsInstalled = true;

  document.addEventListener(
    "contextmenu",
    (event) => {
      event.preventDefault();
    },
    { capture: true },
  );

  window.addEventListener(
    "keydown",
    (event) => {
      const e = event as KeyboardEvent;

      const key = e.key;
      if (key === "F12") {
        e.preventDefault();
        return;
      }

      // Normalize key to compare for I/J/U
      const k = key.length === 1 ? key.toLowerCase() : key.toLowerCase();

      const isCtrlOrMeta = e.ctrlKey || e.metaKey;
      const isShift = e.shiftKey;
      const isOptionAlt = e.altKey; // Cmd+Option uses altKey in browsers

      // Ctrl+Shift+I / Cmd+Option+I
      if ((isShift && (e.ctrlKey || (e.metaKey && isOptionAlt))) && k === "i") {
        e.preventDefault();
        return;
      }

      // Ctrl+Shift+J / Cmd+Option+J
      if ((isShift && (e.ctrlKey || (e.metaKey && isOptionAlt))) && k === "j") {
        e.preventDefault();
        return;
      }

      // Ctrl+U / Cmd+Option+U
      if ((isCtrlOrMeta && !isShift && !e.altKey && k === "u") || ((e.metaKey || e.ctrlKey) && isOptionAlt && !isShift && k === "u")) {
        e.preventDefault();
        return;
      }

      // Extra coverage:
      // - If browser treats Cmd+Option+I/J/U slightly differently, also block Ctrl+U with meta+alt.
      if ((e.ctrlKey && !e.shiftKey && k === "u") || (e.metaKey && e.altKey && !e.shiftKey && k === "u")) {
        e.preventDefault();
      }
    },
    { capture: true },
  );
}
