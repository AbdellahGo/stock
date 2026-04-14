import Header from '../components/Header'
import SearchBar from '../components/SearchBar'
import TableProduct from "../components/TableProduct"

const Products = () => {
  return (
    <>
      <Header />
      <main className="py-9 px-8">
        <SearchBar />
        <TableProduct />
      </main>
    </>
  )
}

export default Products