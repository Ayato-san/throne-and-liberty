import type { InferPageProps } from '@adonisjs/inertia/types'
import { Head } from '@inertiajs/react'
import { Text } from '~/components/elements/text'
import { useEffect, useState } from 'react'

import type ItemController from '#controllers/item_controller'
import type { ItemPresenter } from '#repositories/items_repository'

type UniqueProps = InferPageProps<ItemController, 'handle'>

function Mob(mob: ItemPresenter['mobs'][0]) {
  const [name, setName] = useState('')

  useEffect(() => {
    let specs: string = ''

    if (mob.dropChance) {
      specs += '(' + mob.dropChance + '%)'
    }

    setName(mob.name + ' ' + specs)
  }, [mob])

  return <li>{name}</li>
}

export default function Unique(props: UniqueProps) {
  const { item } = props

  return (
    <>
      <Head title={'Item - ' + item.name} />

      <Text type="h1">{item.name}</Text>
      <div className="grid grid-cols-2">
        <img src={item.image} alt={item.name} />
        <div>
          <Text type="h2">Category</Text>
          <Text>{item.category}</Text>
          <Text type="h2">Tier</Text>
          <Text>{item.tier}</Text>
        </div>
      </div>
      <div className="grid grid-cols-2">
        <div>
          <Text type="h2">Mobs</Text>
          <ul>
            {item.mobs.map((mob) => (
              <Mob key={mob.name} {...mob} />
            ))}
          </ul>
        </div>
        <div>
          <Text type="h2">Locations</Text>
          <ul>
            {item.locations.map((location) => (
              <li key={location.name}>{location.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
