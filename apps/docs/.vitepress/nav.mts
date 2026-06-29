export interface Page {
  path: string;
  title: string;
}

export const HELLO_PAGES: Page[] = [
  { path: 'what-is-hivelari', title: 'What is HiVelari?' },
  { path: 'getting-started', title: 'Getting Started' },
];

export const SDK_PAGES: Page[] = [
  { path: 'overview', title: 'Overview' },
  { path: 'authentication', title: 'Authentication' },
  { path: 'commerce', title: 'Commerce' },
  { path: 'profiles', title: 'Profiles' },
  { path: 'records', title: 'Records' },
  { path: 'readme', title: 'README' },
  { path: 'changelog', title: 'CHANGELOG' },
];

export const NEXTJS_PAGES: Page[] = [
  { path: 'overview', title: 'Overview' },
  { path: 'session-management', title: 'Session Management' },
  { path: 'social-oauth', title: 'Social OAuth' },
  { path: 'middleware', title: 'Middleware' },
  { path: 'configuration', title: 'Configuration' },
  { path: 'readme', title: 'README' },
  { path: 'changelog', title: 'CHANGELOG' },
];

export const SANDBOX_PAGES: Page[] = [
  { path: 'overview', title: 'Overview' },
  { path: 'readme', title: 'README' },
  { path: 'changelog', title: 'CHANGELOG' },
];

export const buildPackageItems = (pages: Page[], _package: string) => {
  return Array.from(pages).map((page: Page) => ({
    text: page.title,
    link: `/${_package}/${page.path}`,
  }));
};
