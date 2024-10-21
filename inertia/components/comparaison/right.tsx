import type { VariantProps } from 'tailwind-variants'
import { tv } from 'tailwind-variants'

const rightVariants = tv({
  variants: {
    classes: {
      default: ['col-span-2 text-right'],
      blank: ['col-span-3'],
    },
  },
  defaultVariants: { classes: 'default' },
})

interface RightCompareProps extends VariantProps<typeof rightVariants> {
  children?: string
}

export function RightCompare(props: RightCompareProps) {
  const { children, classes } = props

  return <div className={rightVariants({ classes })}>{children}</div>
}
