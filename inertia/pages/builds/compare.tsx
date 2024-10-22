import type { InferPageProps } from '@adonisjs/inertia/types'
import { Head } from '@inertiajs/react'
import { CompareDoubleItem, CompareItem } from '~/components/comparaison'
import { Loader } from '~/components/elements/loader'
import { Text } from '~/components/elements/text'
import type { Item } from '~/components/form/select'
import Select from '~/components/form/select'
import { useFetch } from '~/hooks/use_fetch_hooks'
import { formatName } from '~/scripts/build_name'
import { addQueryParams, removeQueryParams } from '~/scripts/window'
import { useEffect, useState } from 'react'

import type BuildsCompareController from '#controllers/builds/builds_compare_controller'
import type BuildPresenter from '#presenters/build_presenter'

type CompareProps = InferPageProps<BuildsCompareController, 'handle'>

export default function Compare(props: CompareProps) {
  const { source, target, builds } = props

  const [sourceId, setSourceId] = useState(source)
  const [targetId, setTargetId] = useState(target)

  const [nbDiff, setNbDiff] = useState(0)

  const {
    data: dataSource,
    loading: loadingSource,
    error: errorSource,
  } = useFetch<BuildPresenter>('/builds/' + sourceId)

  const {
    data: dataTarget,
    loading: loadingTarget,
    error: errorTarget,
  } = useFetch<BuildPresenter>('/builds/' + targetId)

  const [nameSource, setNameSource] = useState('')

  useEffect(() => {
    if (dataSource) {
      setNameSource(formatName(dataSource))
      addQueryParams('source', dataSource.id)
      setNbDiff(NbDiff(dataSource?.stuff, dataTarget?.stuff))
    } else {
      setNameSource('')
      removeQueryParams('source')
      setNbDiff(0)
    }
  }, [dataSource])

  const [nameTarget, setNameTarget] = useState('')

  const buildList: Item[] = builds.map((data) => {
    return { value: data.id, label: formatName(data) }
  })

  useEffect(() => {
    if (dataTarget) {
      setNameTarget(formatName(dataTarget))
      addQueryParams('target', dataTarget.id)
      setNbDiff(NbDiff(dataSource?.stuff, dataTarget?.stuff))
    } else {
      setNameTarget('')
      removeQueryParams('target')
      setNbDiff(0)
    }
  }, [dataTarget])

  return (
    <>
      <Head title={'Build'} />

      <div className="grid grid-cols-2 gap-x-2">
        <div>
          <Text type="h1">Source Class</Text>
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
            <Text type="h2">{nameSource}</Text>
          </Loader>
        </div>
        <div>
          <Text type="h1">Target Class</Text>
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
            <Text type="h2" className="text-right">
              {nameTarget}
            </Text>
          </Loader>
        </div>
      </div>
      <div className="grid grid-cols-6 items-center">
        <CompareDoubleItem
          source={dataSource?.stuff.primaryWeapon.name}
          source2={dataSource?.stuff.secondaryWeapon.name}
          target={dataTarget?.stuff.primaryWeapon.name}
          target2={dataTarget?.stuff.secondaryWeapon.name}
        />
        <CompareItem source={dataSource?.stuff.head.name} target={dataTarget?.stuff.head.name} />
        <CompareItem source={dataSource?.stuff.cloak.name} target={dataTarget?.stuff.cloak.name} />
        <CompareItem source={dataSource?.stuff.chest.name} target={dataTarget?.stuff.chest.name} />
        <CompareItem source={dataSource?.stuff.hands.name} target={dataTarget?.stuff.hands.name} />
        <CompareItem source={dataSource?.stuff.legs.name} target={dataTarget?.stuff.legs.name} />
        <CompareItem source={dataSource?.stuff.feet.name} target={dataTarget?.stuff.feet.name} />
        <CompareItem
          source={dataSource?.stuff.necklace.name}
          target={dataTarget?.stuff.necklace.name}
        />
        <CompareItem
          source={dataSource?.stuff.bracelet.name}
          target={dataTarget?.stuff.bracelet.name}
        />
        <CompareDoubleItem
          source={dataSource?.stuff.primaryRing.name}
          source2={dataSource?.stuff.secondaryRing.name}
          target={dataTarget?.stuff.primaryRing.name}
          target2={dataTarget?.stuff.secondaryRing.name}
        />
        <CompareItem source={dataSource?.stuff.belt.name} target={dataTarget?.stuff.belt.name} />
      </div>
      <div className="grid grid-cols-2">
        <div>
          <Text type="h3">Nb Commun</Text>
          <Text className={nbDiff <= 8 ? 'text-green-400' : ''}>{13 - nbDiff}</Text>
        </div>
        <div>
          <Text type="h3">Nb Diff</Text>
          <Text>{nbDiff}</Text>
        </div>
      </div>
    </>
  )
}

type KeyStuff = keyof BuildPresenter['stuff']

function NbDiff(source?: BuildPresenter['stuff'], target?: BuildPresenter['stuff']) {
  if (!source || !target) {
    return 0
  }

  const keys = Object.keys(source) as KeyStuff[]

  return keys.reduce((acc, key) => {
    const sourceName = source[key].name
    const targetName = target[key].name

    if (sourceName !== targetName) {
      if (key.startsWith('primary')) {
        const secondaryKey = key.replace('primary', 'secondary') as KeyStuff
        if (sourceName !== target[secondaryKey]?.name) {
          return acc + 1
        }
      } else if (key.startsWith('secondary')) {
        const primaryKey = key.replace('secondary', 'primary') as KeyStuff
        if (sourceName !== target[primaryKey]?.name) {
          return acc + 1
        }
      } else {
        return acc + 1
      }
    }
    return acc
  }, 0)
}
