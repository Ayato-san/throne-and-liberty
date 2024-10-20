import type { InferPageProps } from '@adonisjs/inertia/types'
import { Head } from '@inertiajs/react'
import { Link } from '~/components/elements/link'
import { Text } from '~/components/elements/text'
import { useEffect, useState } from 'react'

import type BuildController from '#controllers/builds/build_controller'

type UniqueProps = InferPageProps<BuildController, 'handle'>

function Item({ item }: { item: { name: string; image: string; id: string } }) {
  return (
    <li className="flex flex-col items-center">
      <div className="overflow-hidden rounded-full bg-slate-800 p-2">
        <img src={item.image} alt={item.name} style={{ height: 60, width: 60 }} />
      </div>
      <Link href={'/items/' + item.id}>{item.name}</Link>
    </li>
  )
}

export default function Unique(props: UniqueProps) {
  const { build } = props

  const [name, setName] = useState('')

  useEffect(() => {
    let name = build.class || ''
    if (build.scale) name += ' - ' + build.scale + ' Scale '
    name += build.type
    setName(name)
  }, [build])

  return (
    <>
      <Head title={'Build - ' + name} />

      <Text type="h1">{name}</Text>
      <Link href={`/builds/compare?source=${build.id}`}>Compare</Link>
      <Text type="h2">Items</Text>
      <div className="grid grid-cols-3">
        <ul>
          <Item item={build.stuff.primaryWeapon} />
          <Item item={build.stuff.secondaryWeapon} />
        </ul>
        <ul>
          <Item item={build.stuff.head} />
          <Item item={build.stuff.chest} />
          <Item item={build.stuff.legs} />
          <Item item={build.stuff.necklace} />
          <Item item={build.stuff.primaryRing} />
        </ul>
        <ul>
          <Item item={build.stuff.cloak} />
          <Item item={build.stuff.hands} />
          <Item item={build.stuff.feet} />
          <Item item={build.stuff.bracelet} />
          <Item item={build.stuff.secondaryRing} />
          <Item item={build.stuff.belt} />
        </ul>
      </div>
      <div className="grid grid-cols-2">
        <div>
          <Text type="h2">Mobs</Text>
          <ul>
            {build.mobs.map((mob) => (
              <li key={mob.name}>{mob.name}</li>
            ))}
          </ul>
        </div>
        <div>
          <Text type="h2">Locations</Text>
          <ul>
            {build.locations.map((location) => (
              <li key={location.name}>{location.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
