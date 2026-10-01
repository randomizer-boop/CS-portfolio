export const NAV_OFFSET = 55;

export function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (!element) return;

  // Scroll to the section's content (not its top padding) so it lands right under the fixed nav.
  // Measure only the top bar: the expanded mobile menu is closing at this moment.
  const bar = document.querySelector("nav > div");
  const navHeight = bar ? bar.getBoundingClientRect().height : NAV_OFFSET;
  const content = (element.firstElementChild as HTMLElement | null) ?? element;
  // offsetTop ignores CSS transforms (reveal animation), so the target is stable.
  let docTop = 0;
  for (let node: HTMLElement | null = content; node; node = node.offsetParent as HTMLElement | null) docTop += node.offsetTop;
  content.classList.add("in");
  const gap = window.innerWidth < 768 ? 16 : 28;
  const top = docTop - navHeight - gap;
  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  window.history.replaceState(null, "", window.location.pathname + window.location.search);
}

export function scrollToHome() {
  window.scrollTo({ top: 0, behavior: "smooth" });
  window.history.replaceState(null, "", window.location.pathname + window.location.search);
}
