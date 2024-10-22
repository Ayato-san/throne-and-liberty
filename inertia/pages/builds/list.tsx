import type { InferPageProps } from '@adonisjs/inertia/types'
import { Head } from '@inertiajs/react'
import { Link } from '~/components/elements/link'
import { Text } from '~/components/elements/text'
import { useBuildName } from '~/hooks/use_build_name_hooks'

import type BuildsListController from '#controllers/builds/builds_list_controller'
import type BuildsPresenter from '#presenters/builds_presenter'

type ListProps = InferPageProps<BuildsListController, 'handle'>

function BuildName(build: BuildsPresenter) {
  const name = useBuildName(build)

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
      <Link href="/builds/compare">Compare</Link>
      <Text type="h1">Builds</Text>
      <ul>
        {builds.map((build) => (
          <BuildName key={build.id} {...build} />
        ))}
      </ul>
    </>
  )
}
