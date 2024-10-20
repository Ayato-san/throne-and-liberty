import { useEffect, useState } from 'react'

type Object = Record<string, any>

function useFetch<T extends Object | Object[]>(url: string) {
  const [data, setData] = useState<T>()
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Record<string, any>>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        })

        const data = await response.json()

        if (response.status !== 200) {
          setData(undefined)
          setError(data)
        } else {
          setError(undefined)
          setData(data)
        }
      } catch (error) {
        setData(undefined)
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [url])

  return { data, loading, error }
}

export { useFetch }
