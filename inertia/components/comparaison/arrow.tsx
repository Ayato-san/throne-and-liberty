import { faArrowRight } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export function ArrowCompare() {
  return (
    <div className="col-span-2 text-center text-purple-300">
      <FontAwesomeIcon icon={faArrowRight} style={{ height: 24 }} />
    </div>
  )
}
