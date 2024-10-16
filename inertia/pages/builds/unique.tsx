import type { InferPageProps } from '@adonisjs/inertia/types'
import { useEffect, useState } from 'react'

import type BuildController from '#controllers/build_controller'

type UniqueProps = InferPageProps<BuildController, 'handle'>

export default function Unique(props: UniqueProps) {
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
      <h1>{name}</h1>
      <h2>Items</h2>
      <ul>
        {build.items.map((item) => (
          <li key={item.name}>{item.name}</li>
        ))}
      </ul>
      <h2>Mobs</h2>
      <ul>
        {build.mobs.map((mob) => (
          <li key={mob.name}>{mob.name}</li>
        ))}
      </ul>
      <h2>Locations</h2>
      <ul>
        {build.locations.map((location) => (
          <li key={location.name}>{location.name}</li>
        ))}
      </ul>
    </>
  )
}
