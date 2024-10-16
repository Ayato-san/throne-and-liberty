import { useEffect, useState } from 'react'

import { Link } from '../elements/link'

export function PageHeader() {
  const [backHref, setBackHref] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname

      if (pathname !== '/') {
        const backHref = pathname.split('/').slice(0, -1).join('/')

        setBackHref(backHref || '/')
      } else {
        setBackHref(null)
      }
    }
  }, [typeof window !== 'undefined' ? window.location.pathname : null])

  return (
    <header className="flex w-full items-center justify-between border-b bg-white px-6 py-3">
      {backHref && <Link href={backHref}>Back</Link>}
    </header>
  )
}
