import { ArrowCompare } from './arrow'
import type { CompareItemProps } from './item'
import { LeftCompare } from './left'
import { RightCompare } from './right'

type CompareItemDoubleProps = CompareItemProps & { source2?: string; target2?: string }

export function CompareDoubleItem({ source, source2, target, target2 }: CompareItemDoubleProps) {
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
