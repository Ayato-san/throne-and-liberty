import type { InferPageProps } from '@adonisjs/inertia/types'
import { Head } from '@inertiajs/react'
import { ArrowCompare, LeftCompare, RightCompare } from '~/components/comparaison'
import { Loader } from '~/components/elements/loader'
import { Text } from '~/components/elements/text'
import type { Item } from '~/components/form/select'
import Select from '~/components/form/select'
import { useFetch } from '~/hooks/use_fetch_hooks'
import { addQueryParams, removeQueryParams } from '~/scripts/window'
import { useEffect, useState } from 'react'

import type BuildsCompareController from '#controllers/builds/builds_compare_controller'
import type BuildPresenter from '#presenters/build_presenter'

type CompareProps = InferPageProps<BuildsCompareController, 'handle'>

type CompareItemProps = { source?: string; target?: string }
type CompareItemDoubleProps = CompareItemProps & { source2?: string; target2?: string }

function CompareItem({ source, target }: CompareItemProps) {
  if (source === target) {
    return (
      <>
        <LeftCompare classes="equals">{source}</LeftCompare>
        <RightCompare classes="blank" />
      </>
    )
  }
  return (
    <>
      <LeftCompare>{source}</LeftCompare>
      <ArrowCompare />
      <RightCompare>{target}</RightCompare>
    </>
  )
}

function CompareItemDouble({ source, source2, target, target2 }: CompareItemDoubleProps) {
  if ((source === target && source2 === target2) || (source === target2 && source2 === target)) {
    return (
      <>
        <LeftCompare classes="equals">{source}</LeftCompare>
        <RightCompare classes="blank" />
        <LeftCompare classes="equals">{source2}</LeftCompare>
        <RightCompare classes="blank" />
      </>
    )
  }
  if (source === target) {
    return (
      <>
        <LeftCompare classes="equals">{source}</LeftCompare>
        <RightCompare classes="blank" />
        <LeftCompare>{source2}</LeftCompare>
        <ArrowCompare />
        <RightCompare>{target2}</RightCompare>
      </>
    )
  }
  if (source === target2) {
    return (
      <>
        <LeftCompare classes="equals">{source}</LeftCompare>
        <RightCompare classes="blank" />
        <LeftCompare>{source2}</LeftCompare>
        <ArrowCompare />
        <RightCompare>{target}</RightCompare>
      </>
    )
  }
  if (source2 === target) {
    return (
      <>
        <LeftCompare>{source}</LeftCompare>
        <ArrowCompare />
        <RightCompare>{target2}</RightCompare>
        <LeftCompare classes="equals">{source2}</LeftCompare>
        <RightCompare classes="blank" />
      </>
    )
  }
  if (source2 === target2) {
    return (
      <>
        <LeftCompare>{source}</LeftCompare>
        <ArrowCompare />
        <RightCompare>{target}</RightCompare>
        <LeftCompare classes="equals">{source2}</LeftCompare>
        <RightCompare classes="blank" />
      </>
    )
  }

  return (
    <>
      <LeftCompare>{source}</LeftCompare>
      <ArrowCompare />
      <RightCompare>{target}</RightCompare>
      <LeftCompare>{source2}</LeftCompare>
      <ArrowCompare />
      <RightCompare>{target2}</RightCompare>
    </>
  )
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
      addQueryParams('source', dataSource.id)
    } else {
      setNameSource('')
      removeQueryParams('source')
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
      addQueryParams('target', dataTarget.id)
    } else {
      setNameTarget('')
      removeQueryParams('target')
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
        <CompareItemDouble
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
        <CompareItemDouble
          source={dataSource?.stuff.primaryRing.name}
          source2={dataSource?.stuff.secondaryRing.name}
          target={dataTarget?.stuff.primaryRing.name}
          target2={dataTarget?.stuff.secondaryRing.name}
        />
        <CompareItem source={dataSource?.stuff.belt.name} target={dataTarget?.stuff.belt.name} />
      </div>
    </>
  )
}
