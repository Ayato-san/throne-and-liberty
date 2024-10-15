import { createInertiaApp } from '@inertiajs/react'
import { AppShell } from '~/components/layouts/app_shell'
import { renderToString } from 'react-dom/server'

import type { Page } from './app'

/**
 * Render function to create an Inertia.js app instance.
 *
 * @param page - The initial page component to render
 * @returns The created Inertia.js app instance
 */
export default function render(page: any) {
  return createInertiaApp({
    /** Initial page component to render */
    page,

    /** Use renderToString for server-side rendering */
    render: renderToString,

    /** Resolve function to dynamically load page components */
    resolve: (name) => {
      /** Step 1: Eagerly load all page components matching the glob pattern */
      const pages = import.meta.glob<Page>('../pages/**/*.tsx', {
        eager: true,
      })
      const currentPage = pages[`../pages/${name}.tsx`]

      /** Step 2: Set default layout if not specified in the page component */
      currentPage.default.layout =
        currentPage.default.layout || ((currentPage: any) => <AppShell children={currentPage} />)

      /** Step 3: Return the resolved page component */
      return currentPage
    },

    /** Setup function to render the app with props */
    setup: ({ App, props }) => <App {...props} />,
  })
}
