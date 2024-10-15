import type { InferPageProps } from '@adonisjs/inertia/types'
import { Link } from '~/components/elements/link'
import { useEffect, useState } from 'react'

import type BuildListsController from '#controllers/build_lists_controller'

type ListProps = InferPageProps<BuildListsController, 'handle'>

interface Build {
  id: string
  class?: string
  scale: string | null
  type: string
  weapons?: string[]
}

function BuildName(build: Build) {
  const [name, setName] = useState('')

  useEffect(() => {
    let specs: string = ''
    const name = build.class || ''

    if (build.scale) {
      specs += build.scale + ' Scale '
    }

    specs += build.type

    setName(name + ' - ' + specs)
  }, [build])

  return (
    <li>
      <Link href={'/builds/' + build.id}>{name}</Link>
    </li>
  )
}

export default function List(props: ListProps) {
  const { builds } = props

  return (
    <ul>
      {builds.map((build) => (
        <BuildName key={build.id} {...build} />
      ))}
    </ul>
  )
}
