import { useState, useEffect, useCallback } from "react"
import Card from './components/Card.jsx'

// Funzione di debounce
function debounce(callback, delay) {
  let timer
  return (value) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      callback(value)
    }, delay)
  }
}
function App() {

  // Stato per la ricerca
  const [query, setQuery] = useState('')
  // Stato per i prodotti
  const [products, setProducts] = useState([])
  // Stato per messaggio di errore
  const [errorMessage, setErrorMessage] = useState('')


  // Funzione per cercare i prodotti
  const fetchProducts = async (query) => {

    // Controllo se la query è vuota
    if (!query.trim()) {
      setProducts([])
      return
    }

    try {
      const response = await fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/products?search=${query}`)
      const products = await response.json()
      console.log('Test API')
      setProducts(products)
    }
    catch (err) {
      console.error(err.message)
      setErrorMessage('Failed to fetch products')
      throw new Error(err.message)
    }
  }

  // Creo la ricerca debounced-ata
  const debouncedFetchProducts = useCallback(
    debounce(fetchProducts, 500)
    , [])


  useEffect(() => {
    // sostituisco il normale fetch 'fetchProducts(query)'
    //  con la funzione debounced-ata
    debouncedFetchProducts(query)
    setErrorMessage('')
  }, [query])

  return (
    <>
      <header className="bg-slate-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl text-start text-gray-200">Products</h1>
          <div className="relative">
            <input
              type="text"
              className="rounded-md bg-gray-200 p-2"
              placeholder="Search products..."
              value={query}
              onChange={(e) => {
                const newQuery = e.target.value
                if (newQuery.length < query.length) {   // se il nuovo target è più corto dalla query
                  setProducts([]) // Chiudo il menu (quando viene cancellato un carattere)
                }
                setQuery(newQuery)
              }}
            />
            {products.length > 0 && (
              <ul className="bg-white shadow-md rounded-md mt-1 p-2 absolute w-full max-h-48 overflow-y-auto">
                {products.map((product) => (
                  <li key={product.id} className="text-sm p-2 border-b last:border-b-0">
                    <strong>{product.name}</strong>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </header>
      <main className="min-h-screen bg-emerald-200">
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      </main>
    </>
  )
}

export default App
