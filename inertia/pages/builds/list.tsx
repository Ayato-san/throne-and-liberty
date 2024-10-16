import type { InferPageProps } from '@adonisjs/inertia/types'
import { Head } from '@inertiajs/react'
import { Link } from '~/components/elements/link'
import { Text } from '~/components/elements/text'
import { useEffect, useState } from 'react'

import type BuildsListController from '#controllers/builds_list_controller'
import type BuildsPresenter from '#presenters/builds_presenter'

type ListProps = InferPageProps<BuildsListController, 'handle'>

function BuildName(build: BuildsPresenter) {
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
    <>
      <Head title="Builds" />

      <Link href="/builds/add">Add Build</Link>
      <Text type="h1">Builds</Text>
      <ul>
        {builds.map((build) => (
          <BuildName key={build.id} {...build} />
        ))}
      </ul>
    </>
  )
}
