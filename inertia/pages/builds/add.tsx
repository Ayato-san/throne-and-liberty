import type { InferPageProps } from '@adonisjs/inertia/types'
import Select, { type Item } from '~/components/form/select'

import type BuildAddController from '#controllers/build_add_controller'

type AddProps = InferPageProps<BuildAddController, 'handle'>

export default function Add(props: AddProps) {
  const { classes, scales, types } = props

  const classList: Item[] = classes.map((classData) => {
    const itemName = classData.name + ' - ' + classData.primary + ' / ' + classData.secondary

    return { value: classData.id, label: itemName }
  })

  const scaleList: Item[] = scales.map((scale) => {
    return { value: scale || 'none', label: scale || ' ' }
  })

  const typesList: Item[] = types.map((type) => {
    return { value: type, label: type }
  })

  return (
    <form>
      <Select items={classList} placeholder="Templar" id="class">
        Select a class
      </Select>

      <Select items={scaleList} placeholder="small" id="scale">
        Select the build scale
      </Select>

      <Select items={typesList} placeholder="PvP" id="type">
        Select the build type
      </Select>
    </form>
  )
}
