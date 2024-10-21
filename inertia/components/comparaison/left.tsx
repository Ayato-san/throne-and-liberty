import type { VariantProps } from 'tailwind-variants'
import { tv } from 'tailwind-variants'

const leftVariants = tv({
  base: 'transition-transform',
  variants: {
    classes: {
      default: ['col-span-2'],
      equals: ['col-span-3', 'translate-x-1/2', 'text-center'],
    },
  },
  defaultVariants: { classes: 'default' },
})

interface LeftCompareProps extends VariantProps<typeof leftVariants> {
  children?: string
}

export function LeftCompare(props: LeftCompareProps) {
  const { children, classes } = props

  return <div className={leftVariants({ classes })}>{children}</div>
}
