import type { InferPageProps } from '@adonisjs/inertia/types'
import { Head, useForm } from '@inertiajs/react'
import Select, { arrayToItem, type Item } from '~/components/form/select'
import { useEffect, useState, type FormEvent } from 'react'

import type BuildAddController from '#controllers/builds/build_add_controller'
import type { ItemsPresenter } from '#repositories/items_repository'

type AddProps = InferPageProps<BuildAddController, 'handle'>

type FormSend = {
  class: string
  scale: string | null
  type: string
  primaryWeapon: string
  secondaryWeapon: string
  helmet: string
  cloak: string
  chest: string
  gloves: string
  legs: string
  boots: string
  necklaces: string
  bracelets: string
  primaryRing: string
  secondaryRing: string
  belt: string
}

function ItemsPresenterToItem(items: ItemsPresenter[]): Item[] {
  return items.map((item) => {
    return { value: item.id, label: item.name }
  })
}

export default function Add(props: AddProps) {
  const {
    classes,
    scales,
    types,
    weapons,
    helmets,
    cloaks,
    chests,
    gloves,
    legs,
    boots,
    necklaces,
    bracelets,
    rings,
    belts,
  } = props

  const form = useForm<FormSend>({
    class: '',
    scale: null,
    type: '',
    primaryWeapon: '',
    secondaryWeapon: '',
    helmet: '',
    cloak: '',
    chest: '',
    gloves: '',
    legs: '',
    boots: '',
    necklaces: '',
    bracelets: '',
    primaryRing: '',
    secondaryRing: '',
    belt: '',
  })

  const [itemDisabled, setItemDisabled] = useState(true)

  const classList: Item[] = classes.map((classData) => {
    const itemName = classData.name + ' - ' + classData.primary + ' / ' + classData.secondary

    return { value: classData.id, label: itemName }
  })

  const weaponsList = ItemsPresenterToItem(weapons)
  const helmetsList = ItemsPresenterToItem(helmets)
  const cloaksList = ItemsPresenterToItem(cloaks)
  const chestsList = ItemsPresenterToItem(chests)
  const glovesList = ItemsPresenterToItem(gloves)
  const legsList = ItemsPresenterToItem(legs)
  const bootsList = ItemsPresenterToItem(boots)
  const necklacesList = ItemsPresenterToItem(necklaces)
  const braceletsList = ItemsPresenterToItem(bracelets)
  const ringsList = ItemsPresenterToItem(rings)
  const beltsList = ItemsPresenterToItem(belts)

  const [primaryWeaponsList, setPrimaryWeaponsList] = useState<Item[]>(weaponsList)
  const [secondaryWeaponsList, setSecondaryWeaponsList] = useState<Item[]>(weaponsList)

  useEffect(() => {
    setItemDisabled(form.data.class === '')

    if (form.data.class !== '') {
      const foundedClass = classes.find((classData) => classData.id === form.data.class)
      if (foundedClass) {
        const primaryWeapons = weapons.filter((data) => data.category === foundedClass.primary)
        const secondaryWeapons = weapons.filter((data) => data.category === foundedClass.secondary)

        setPrimaryWeaponsList(ItemsPresenterToItem(primaryWeapons))
        setSecondaryWeaponsList(ItemsPresenterToItem(secondaryWeapons))
      }
    }
  }, [form.data.class])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    form.post('/builds/add')
  }

  return (
    <>
      <Head title="Add Build" />

      <form onSubmit={handleSubmit}>
        <Select
          items={classList}
          placeholder="Templar"
          id="class"
          required
          onValueChange={(event) => form.setData('class', event.value[0])}
        >
          Select a class
        </Select>

        <Select
          items={arrayToItem(types)}
          placeholder="PvP"
          id="type"
          required
          onValueChange={(event) => form.setData('type', event.value[0])}
        >
          Select the build type
        </Select>

        {form.data.type === 'PvP' && (
          <Select
            items={arrayToItem(scales)}
            placeholder="small"
            id="scale"
            required
            onValueChange={(event) => form.setData('scale', event.value[0])}
          >
            Select the build scale
          </Select>
        )}

        <div className="grid grid-cols-2 gap-x-2">
          <Select
            items={primaryWeaponsList}
            placeholder="Excavator's Mysterious Scepter"
            id="primary_weapon"
            required
            onValueChange={(event) => form.setData('primaryWeapon', event.value[0])}
            disabled={itemDisabled}
          >
            Select the primary weapon
          </Select>
          <Select
            items={secondaryWeaponsList}
            placeholder="Karnix's Netherbow"
            id="secondary_weapon"
            required
            onValueChange={(event) => form.setData('secondaryWeapon', event.value[0])}
            disabled={itemDisabled}
          >
            Select the secondary weapon
          </Select>
          <Select
            items={helmetsList}
            placeholder="Shock Commander Visor"
            id="helmet"
            required
            onValueChange={(event) => form.setData('helmet', event.value[0])}
            disabled={itemDisabled}
          >
            Select the helmet
          </Select>
          <Select
            items={cloaksList}
            placeholder="Forsaken Embrace"
            id="cloak"
            required
            onValueChange={(event) => form.setData('cloak', event.value[0])}
            disabled={itemDisabled}
          >
            Select the cloak
          </Select>
          <Select
            items={chestsList}
            placeholder="Shock Commander Plate Armor"
            id="chest"
            required
            onValueChange={(event) => form.setData('chest', event.value[0])}
            disabled={itemDisabled}
          >
            Select the chestplate
          </Select>
          <Select
            items={glovesList}
            placeholder="Gauntlets of the Infernal Herald"
            id="gloves"
            required
            onValueChange={(event) => form.setData('gloves', event.value[0])}
            disabled={itemDisabled}
          >
            Select the gloves
          </Select>
          <Select
            items={legsList}
            placeholder="Greaves of the Infernal Herald"
            id="legs"
            required
            onValueChange={(event) => form.setData('legs', event.value[0])}
            disabled={itemDisabled}
          >
            Select the leggins
          </Select>
          <Select
            items={bootsList}
            placeholder="Heroic Boots of the Resistance"
            id="boots"
            required
            onValueChange={(event) => form.setData('boots', event.value[0])}
            disabled={itemDisabled}
          >
            Select the boots
          </Select>
          <Select
            items={necklacesList}
            placeholder="Clasp of the Conqueror"
            id="necklaces"
            required
            onValueChange={(event) => form.setData('necklaces', event.value[0])}
            disabled={itemDisabled}
          >
            Select the necklace
          </Select>
          <Select
            items={braceletsList}
            placeholder="Bracers of the Primal King"
            id="bracelets"
            required
            onValueChange={(event) => form.setData('bracelets', event.value[0])}
            disabled={itemDisabled}
          >
            Select the bracelets
          </Select>
          <Select
            items={ringsList}
            placeholder="Sapphire Dimensional Band"
            id="primary_ring"
            required
            onValueChange={(event) => form.setData('primaryRing', event.value[0])}
            disabled={itemDisabled}
          >
            Select the primary ring
          </Select>
          <Select
            items={ringsList}
            placeholder="Band of Universal Power"
            id="secondary_ring"
            required
            onValueChange={(event) => form.setData('secondaryRing', event.value[0])}
            disabled={itemDisabled}
          >
            Select the secondary ring
          </Select>
          <Select
            items={beltsList}
            placeholder="Flamewrought Bindings"
            id="belt"
            required
            onValueChange={(event) => form.setData('belt', event.value[0])}
            disabled={itemDisabled}
          >
            Select the belt
          </Select>
        </div>

        <button type="submit">Submit</button>
      </form>
    </>
  )
}
