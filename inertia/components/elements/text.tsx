import type { HTMLAttributes } from 'react'

export interface TextProperties extends HTMLAttributes<HTMLParagraphElement> {
  type?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span'
}

export function Text(props: TextProperties) {
  const { className, children, type = 'p', ...textProps } = props

  const Component = type

  return (
    <Component className={className} {...textProps}>
      {children}
    </Component>
  )
}
