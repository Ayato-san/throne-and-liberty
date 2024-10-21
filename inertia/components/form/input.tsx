import type { Field as ArkTextInput } from '@ark-ui/react/field'
import type { NumberInput as ArkNumberInput } from '@ark-ui/react/number-input'

// const components = {
//   text: ArkTextInput,
//   number: ArkNumberInput,
// }

interface InputTextProperties extends Omit<ArkTextInput.RootProps, 'asChild'> {
  type: 'text'
}
interface InputNumberProperties extends Omit<ArkNumberInput.RootProps, 'asChild'> {
  type: 'number'
}

type InputProperties = InputTextProperties | InputNumberProperties

export function Input(props: InputProperties) {
  const { type } = props

  return <>{type}</>
}
