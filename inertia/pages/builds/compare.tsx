import type { InferPageProps } from '@adonisjs/inertia/types'
import { Head } from '@inertiajs/react'
import { Loader } from '~/components/elements/loader'
import { Text } from '~/components/elements/text'
import type { Item } from '~/components/form/select'
import Select from '~/components/form/select'
import { useFetch } from '~/hooks/use_fetch_hooks'
import { useEffect, useState } from 'react'

import type BuildsCompareController from '#controllers/builds/builds_compare_controller'
import type BuildPresenter from '#presenters/build_presenter'

type CompareProps = InferPageProps<BuildsCompareController, 'handle'>

function ListItem({
  children,
  other,
}: {
  children: string | undefined
  other: string | undefined
}) {
  return <li className={children === other ? '' : 'text-red-500'}>{children}</li>
}

export default function Compare(props: CompareProps) {
  const { source, target, builds } = props

  const [sourceId, setSourceId] = useState(source)
  const [targetId, setTargetId] = useState(target)

  const {
    data: dataSource,
    loading: loadingSource,
    error: errorSource,
  } = useFetch<BuildPresenter>('/builds/' + sourceId)

  const [nameSource, setNameSource] = useState('')

  useEffect(() => {
    if (dataSource) {
      let name = dataSource.class || ''
      if (dataSource.scale) name += ' - ' + dataSource.scale + ' Scale '
      name += dataSource.type
      setNameSource(name)
    } else {
      setNameSource('')
    }
  }, [dataSource])

  const {
    data: dataTarget,
    loading: loadingTarget,
    error: errorTarget,
  } = useFetch<BuildPresenter>('/builds/' + targetId)

  const [nameTarget, setNameTarget] = useState('')

  const buildList: Item[] = builds.map((data) => {
    let label = data.class || ''
    if (data.scale) label += ' - ' + data.scale + ' Scale '
    label += data.type
    return { value: data.id, label }
  })

  useEffect(() => {
    if (dataTarget) {
      let name = dataTarget.class || ''
      if (dataTarget.scale) name += ' - ' + dataTarget.scale + ' Scale '
      name += dataTarget.type
      setNameTarget(name)
    } else {
      setNameTarget('')
    }
  }, [dataTarget])

  return (
    <>
      <Head title={'Build'} />

      <div className="grid grid-cols-2 gap-x-2">
        <div>
          <Select
            items={buildList}
            placeholder="Templar"
            id="firstClass"
            onValueChange={(event) => setSourceId(event.value[0])}
            defaultValue={[source || '']}
          >
            Select the first class
          </Select>

          <Loader isLoading={loadingSource} error={errorSource}>
            <Text type="h1">{nameSource}</Text>
            <ul>
              <li>{dataSource?.stuff.primaryWeapon.name}</li>
              <li>{dataSource?.stuff.secondaryWeapon.name}</li>
              <li>{dataSource?.stuff.head.name}</li>
              <li>{dataSource?.stuff.cloak.name}</li>
              <li>{dataSource?.stuff.chest.name}</li>
              <li>{dataSource?.stuff.hands.name}</li>
              <li>{dataSource?.stuff.legs.name}</li>
              <li>{dataSource?.stuff.feet.name}</li>
              <li>{dataSource?.stuff.necklace.name}</li>
              <li>{dataSource?.stuff.bracelet.name}</li>
              <li>{dataSource?.stuff.primaryRing.name}</li>
              <li>{dataSource?.stuff.secondaryRing.name}</li>
              <li>{dataSource?.stuff.belt.name}</li>
            </ul>
          </Loader>
        </div>
        <div>
          <Select
            items={buildList}
            placeholder="Templar"
            id="secondClass"
            onValueChange={(event) => setTargetId(event.value[0])}
            defaultValue={[target || '']}
          >
            Select the second class
          </Select>

          <Loader isLoading={loadingTarget} error={errorTarget}>
            <Text type="h1">{nameTarget}</Text>
            <ul>
              <ListItem other={dataSource?.stuff.primaryWeapon.name}>
                {dataTarget?.stuff.primaryWeapon.name}
              </ListItem>
              <ListItem other={dataSource?.stuff.secondaryWeapon.name}>
                {dataTarget?.stuff.secondaryWeapon.name}
              </ListItem>
              <ListItem other={dataSource?.stuff.head.name}>{dataTarget?.stuff.head.name}</ListItem>
              <ListItem other={dataSource?.stuff.cloak.name}>
                {dataTarget?.stuff.cloak.name}
              </ListItem>
              <ListItem other={dataSource?.stuff.chest.name}>
                {dataTarget?.stuff.chest.name}
              </ListItem>
              <ListItem other={dataSource?.stuff.hands.name}>
                {dataTarget?.stuff.hands.name}
              </ListItem>
              <ListItem other={dataSource?.stuff.legs.name}>{dataTarget?.stuff.legs.name}</ListItem>
              <ListItem other={dataSource?.stuff.feet.name}>{dataTarget?.stuff.feet.name}</ListItem>
              <ListItem other={dataSource?.stuff.necklace.name}>
                {dataTarget?.stuff.necklace.name}
              </ListItem>
              <ListItem other={dataSource?.stuff.bracelet.name}>
                {dataTarget?.stuff.bracelet.name}
              </ListItem>
              <ListItem other={dataSource?.stuff.primaryRing.name}>
                {dataTarget?.stuff.primaryRing.name}
              </ListItem>
              <ListItem other={dataSource?.stuff.secondaryRing.name}>
                {dataTarget?.stuff.secondaryRing.name}
              </ListItem>
              <ListItem other={dataSource?.stuff.belt.name}>{dataTarget?.stuff.belt.name}</ListItem>
            </ul>
          </Loader>
        </div>
      </div>
    </>
  )
}
