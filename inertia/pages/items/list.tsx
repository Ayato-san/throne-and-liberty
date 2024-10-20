import type { InferPageProps } from '@adonisjs/inertia/types'
import { Head } from '@inertiajs/react'
import { Link } from '~/components/elements/link'
import { Text } from '~/components/elements/text'

import type ItemsListController from '#controllers/items/items_list_controller'
import type { ItemsPresenter } from '#repositories/items_repository'

type ListProps = InferPageProps<ItemsListController, 'handle'>

function ItemName(item: ItemsPresenter) {
  return (
    <li>
      <Link href={'/items/' + item.id}>
        <img
          src={item.image}
          alt={item.name}
          style={{ height: 60, width: 60 }}
          className="inline-block"
        />
        <Text type="span">{item.name}</Text>
      </Link>
    </li>
  )
}

export default function List(props: ListProps) {
  const { items } = props

  return (
    <>
      <Head title="Items" />

      <Text type="h1">Items</Text>
      <ul className="grid grid-cols-2">
        {items.map((item) => (
          <ItemName key={item.id} {...item} />
        ))}
      </ul>
    </>
  )
}
