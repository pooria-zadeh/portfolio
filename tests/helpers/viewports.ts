import featureList from '../../feature_list.json';

export interface Viewport {
  name: string;
  width: number;
  height: number;
}

/** Tailwind `md` — where the desktop nav appears and the hamburger disappears. */
export const DESKTOP_NAV_MIN_WIDTH = 768;

/** The matrix every responsive test runs against, declared once in feature_list.json. */
export const VIEWPORTS: Viewport[] = Object.entries(featureList.viewports).map(([name, size]) => ({
  name,
  ...size,
}));

export const isMobile = (viewport: Viewport): boolean => viewport.width < DESKTOP_NAV_MIN_WIDTH;

export function viewport(name: string): Viewport {
  const found = VIEWPORTS.find((v) => v.name === name);
  if (!found) throw new Error(`Unknown viewport "${name}" — add it to feature_list.json`);
  return found;
}
