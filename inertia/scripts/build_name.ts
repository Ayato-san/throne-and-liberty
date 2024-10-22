import type BuildPresenter from '#presenters/build_presenter'
import type BuildsPresenter from '#presenters/builds_presenter'

export function formatName(build: BuildPresenter | BuildsPresenter) {
  let name = build.class || ''
  if (build.scale) {
    name += ' - ' + build.scale + ' Scale '
  } else {
    name += ' - '
  }
  name += build.type

  return name
}
