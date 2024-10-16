import {
  Combobox as ArkSelect,
  createListCollection,
  type ComboboxValueChangeDetails,
} from '@ark-ui/react/combobox'
import { Portal } from '@ark-ui/react/portal'
import { faAnglesUpDown, faCheck } from '@fortawesome/pro-light-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMemo, useState } from 'react'

type Item = {
  value: number | string
  label: string
}

interface SelectProperties<T extends Item>
  extends Omit<ArkSelect.RootProps<T>, 'asChild' | 'collection' | 'onInputValueChange'> {
  /** The items to display in the select */
  items: T[]
  /** The label of the select */
  children: string
  /** The label of the group */
  groupLabel?: string
  /** The max height of the select (in px) */
  maxHeight?: number
  /** The id of the select */
  id: string
}

export default function Select<T extends Item>(props: SelectProperties<T>) {
  const { children, items: initialItems, groupLabel, id, maxHeight = 300, ...selectProps } = props

  const [items, setItems] = useState(initialItems)

  const collection = useMemo(() => createListCollection({ items }), [items])

  const handleInputChange = (details: ArkSelect.InputValueChangeDetails) => {
    setItems(
      initialItems.filter((item) =>
        item.label.toLowerCase().includes(details.inputValue.toLowerCase())
      )
    )
  }

  return (
    <ArkSelect.Root
      collection={collection}
      onInputValueChange={handleInputChange}
      {...selectProps}
      id={id}
      name={id}
    >
      <ArkSelect.Label className="text-sm">{children}</ArkSelect.Label>
      <ArkSelect.Control className="relative">
        <ArkSelect.Input className="relative h-10 w-full min-w-10 appearance-none rounded border px-3 text-base" />
        <ArkSelect.Trigger className="absolute right-3 top-0 h-10">
          <FontAwesomeIcon icon={faAnglesUpDown} />
        </ArkSelect.Trigger>
      </ArkSelect.Control>
      <Portal>
        <ArkSelect.Positioner>
          <ArkSelect.Content
            className="pointer-events-auto flex animate-fade-out flex-col gap-1 overflow-y-auto rounded-sm bg-white p-1 shadow-md data-state-open:animate-fade-in data-state-closed:hidden"
            style={{ maxHeight }}
          >
            <ArkSelect.ItemGroup>
              {groupLabel && (
                <ArkSelect.ItemGroupLabel className="px-2 py-1.5 text-sm font-semibold">
                  {groupLabel}
                </ArkSelect.ItemGroupLabel>
              )}
              {collection.items.map((item) => (
                <ArkSelect.Item
                  key={item.value}
                  item={item}
                  className="flex h-10 cursor-pointer items-center justify-between rounded-sm px-2 text-base transition-colors hover:bg-gray-100 checked:bg-gray-100"
                >
                  <ArkSelect.ItemText>{item.label}</ArkSelect.ItemText>
                  <ArkSelect.ItemIndicator className="size-4" asChild>
                    <FontAwesomeIcon icon={faCheck} />
                  </ArkSelect.ItemIndicator>
                </ArkSelect.Item>
              ))}
            </ArkSelect.ItemGroup>
          </ArkSelect.Content>
        </ArkSelect.Positioner>
      </Portal>
    </ArkSelect.Root>
  )
}

export type { ComboboxValueChangeDetails as ValueChangeData, Item }
