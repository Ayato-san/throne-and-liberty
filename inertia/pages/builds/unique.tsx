import type { InferPageProps } from '@adonisjs/inertia/types'
import { Link } from '~/components/elements/link'
import { useEffect, useState } from 'react'

import type BuildController from '#controllers/build_controller'

type UniqueProps = InferPageProps<BuildController, 'handle'>

export default function List(props: UniqueProps) {
  const { build } = props

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
    <>
      <Link href="/builds">Back</Link>
      <h1>{name}</h1>
      <ul>
        {build.items.map((item) => (
          <li key={item.name}>{item.name}</li>
        ))}
      </ul>
    </>
  )
}
