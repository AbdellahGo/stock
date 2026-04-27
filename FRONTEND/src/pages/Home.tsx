import { Link } from "react-router-dom"
import { Button } from "../components/Button"
import Logo from "../components/Logo"

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-(61px+(36px*2)))]">
      <Logo HStyles="text-[18px]" SpanStyles="w-[30px] h-[30px]" />
      <p className="mt-8 font-serif text-[50px] leading-11.25 ">Inventory, beautifully simple.</p>
      <p className="w-100 text-center mt-4 font-sans text-[16px] text-brand-muted">Track products, suppliers, and stock levels in one calm, focused workspace.</p>
      <div className="flex gap-3.75 mt-8 ">
        <Button>
          <Link to='/register'>
            Register
          </Link>
        </Button>
        <Button bStyles="bg-transparent text-black border border-brand-border hover:bg-brand-badge-bg !text-black">
          <Link to='/login'>
            Login
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default Home