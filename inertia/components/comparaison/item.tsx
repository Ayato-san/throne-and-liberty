import { ArrowCompare } from './arrow'
import { LeftCompare } from './left'
import { RightCompare } from './right'

export type CompareItemProps = { source?: string; target?: string }

export function CompareItem({ source, target }: CompareItemProps) {
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
