import type { HTMLAttributes } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const textVariants = tv({
  base: [],
  variants: {
    type: {
      p: [],
      h1: ['text-2xl', 'font-bold'],
      h2: ['text-xl', 'font-medium'],
      h3: ['text-lg'],
      span: ['text-sm', 'font-light'],
    },
  },
  defaultVariants: { type: 'p' },
})

export interface TextProperties
  extends HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {}

export function Text(props: TextProperties) {
  const { className, children, type = 'p', ...textProps } = props

  const Component = type

  return (
    <Component className={textVariants({ type, className })} {...textProps}>
      {children}
    </Component>
  )
}
