import { defineConfig } from 'vitepress';
import {
  buildPackageItems,
  HELLO_PAGES,
  NEXTJS_PAGES,
  SANDBOX_PAGES,
  SDK_PAGES,
} from './nav.mts';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: 'src',

  title: 'HiVelari SDK docs',
  description: 'HiVelari SDK documentation',
  themeConfig: {
    logo: '/assets/logo.png',
    search: { provider: 'local' },

    nav: [
      {
        text: 'Hi Velari',
        items: buildPackageItems(HELLO_PAGES, 'hello'),
      },
      {
        text: 'SDK',
        items: buildPackageItems(SDK_PAGES, 'sdk'),
      },
      {
        text: 'NextJS',
        items: buildPackageItems(NEXTJS_PAGES, 'nextjs'),
      },
      {
        text: 'Sandbox',
        items: buildPackageItems(SANDBOX_PAGES, 'sandbox'),
      },
    ],

    sidebar: [
      {
        text: 'Hi Velari',
        items: buildPackageItems(HELLO_PAGES, 'hello'),
      },
      {
        text: 'Packages',
        items: [
          {
            text: '@hivelari/sdk',
            collapsed: false,
            items: buildPackageItems(SDK_PAGES, 'sdk'),
          },
          {
            text: '@hivelari/nextjs',
            collapsed: true,
            items: buildPackageItems(NEXTJS_PAGES, 'nextjs'),
          },
          {
            text: '@hivelari/sandbox',
            collapsed: true,
            items: buildPackageItems(SANDBOX_PAGES, 'sandbox'),
          },
        ],
      },
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/HiVelari' }],

    footer: {
      copyright: 'Copyright (c) 2026 MayR Labs',
      message: 'Built with Love by the HiVelari Team',
    },

    editLink: {
      pattern:
        'https://github.com/HiVelari/hivelari-js/edit/main/apps/docs/src/:path',
      text: 'Edit this page on GitHub',
    },

    outline: {
      level: [2, 3],
      label: 'Outline',
    },
  },

  ignoreDeadLinks: 'localhostLinks',
});
