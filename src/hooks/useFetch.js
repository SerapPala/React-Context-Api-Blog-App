
import { useState, useEffect } from "react"
export const useFetch = (url, method = "GET") => {
    
  const [data, setData] = useState(null)
  const [yukleniyor, setYukleniyor] = useState(false)
  const [hata, setHata] = useState(null)

  const [options, setOptions] = useState(null)


  const postData = (postData) => {
    setOptions({
      method: "POST",
      headers: {
      "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    })
  }

  

  useEffect(() => {
    const controller = new AbortController()



const fetchData = async (fetchOptions) => {
        setYukleniyor(true)
      
      try {
        const res = await fetch(url, {...fetchOptions, signal: controller.signal })
        if(!res.ok) {
          throw new Error(res.statusText)
        }
        const data = await res.json()

        setYukleniyor(false)
        setData(data)
        setHata(null)
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("veri çekme işlemi iptal edildi")
        } else {
          setYukleniyor(false)
          setHata('veriler çekilemedi')
        }
      }
    }

    if (method === "GET") {
      fetchData()
    }
    if (method === "POST" && options) {
      fetchData(options)
    }

    return () => {
      controller.abort()
    }

  }, [url, method, options])

  return { data, yukleniyor, hata,postData }
}