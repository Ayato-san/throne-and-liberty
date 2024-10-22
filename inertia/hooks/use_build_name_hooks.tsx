import { useEffect, useState } from 'react'

import type { BuildPresenter, BuildsPresenter } from '#repositories/builds_repository'

export function useBuildName(build: BuildPresenter | BuildsPresenter | undefined) {
  const [name, setName] = useState('')

  useEffect(() => {
    if (build === undefined) {
      setName('')
    } else {
      setName(formatName(build))
    }
  }, [build])

  return name
}

export function formatName(data: BuildPresenter | BuildsPresenter) {
  let name = data.class || ''
  if (data.scale) {
    name += ' - ' + data.scale + ' Scale '
  } else {
    name += ' - '
  }
  name += data.type

  return name
}
