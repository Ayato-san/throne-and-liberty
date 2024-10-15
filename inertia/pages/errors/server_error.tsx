export default function ServerError(props: { error: any }) {
  return (
    <>
      <div>
        <div>Server Error</div>

        <span>{props.error.message}</span>
      </div>
    </>
  )
}
