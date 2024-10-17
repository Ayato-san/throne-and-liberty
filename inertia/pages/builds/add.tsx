import type { InferPageProps } from '@adonisjs/inertia/types'
import Select, { type Item } from '~/components/form/select'

import type BuildAddController from '#controllers/build_add_controller'
import { FormEvent } from 'react'
import { useForm } from '@inertiajs/react'

type AddProps = InferPageProps<BuildAddController, 'handle'>

type FormSend = {
  class: string
  scale: string | null
  type: string
}

export default function Add(props: AddProps) {
  const { classes, scales, types } = props

  const form = useForm<FormSend>({ class: '', scale: null, type: '' })

  const classList: Item[] = classes.map((classData) => {
    const itemName = classData.name + ' - ' + classData.primary + ' / ' + classData.secondary

    return { value: classData.id, label: itemName }
  })

  const scaleList: Item[] = scales.map((scale) => {
    return { value: scale, label: scale || ' ' }
  })

  const typesList: Item[] = types.map((type) => {
    return { value: type, label: type }
  })

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    form.post('/builds/add')
  }

  return (
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
        items={typesList}
        placeholder="PvP"
        id="type"
        required
        onValueChange={(event) => form.setData('type', event.value[0])}
      >
        Select the build type
      </Select>

      {form.data.type === 'PvP' && (
        <Select
          items={scaleList}
          placeholder="small"
          id="scale"
          required
          onValueChange={(event) => form.setData('scale', event.value[0])}
        >
          Select the build scale
        </Select>
      )}

      <button type="submit">Submit</button>
    </form>
  )
}
