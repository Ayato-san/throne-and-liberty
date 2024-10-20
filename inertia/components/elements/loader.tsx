import { useEffect, useState } from 'react'

export interface LoaderProps {
  isLoading: boolean
  error?: Record<string, any> | string
  children: React.ReactNode
}

export function Loader(props: LoaderProps) {
  const { isLoading: isLoadingProps, children, error: errorProps } = props

  const [isLoading, setIsLoading] = useState(isLoadingProps)
  useEffect(() => setIsLoading(isLoadingProps), [isLoadingProps])

  const [error, setError] = useState(errorProps)
  useEffect(() => setError(errorProps), [errorProps])

  if (isLoading) {
    return <p>Loading...</p>
  }
  if (!isLoading && error) {
    if (typeof error === 'string') {
      return <p className="text-red-400">Error: {error}</p>
    }
    if (error.message) {
      return <p className="text-red-400">Error: {error.message}</p>
    }
    return <p className="text-red-400">Error: {JSON.stringify(error)}</p>
  }
  return <>{children}</>
}
