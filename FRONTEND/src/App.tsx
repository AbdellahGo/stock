import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import RootLayout from "./layout/RootLayout"
import { LogIn, Products, Register } from "./pages/PagesImports"
import ProtectedRoute from "./routesWrappers/ProtectedRoute"
import PublicRoute from "./routesWrappers/PublicRoute"
import Home from "./pages/Home"

const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />} >
        <Route element={<ProtectedRoute />}>
          <Route path="/products" element={<Products />} />
        </Route>

        <Route element={<PublicRoute />}>
          <Route index element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<LogIn />} />
        </Route>

      </Route>
    )
  )

  return <RouterProvider router={router} />
}


export default App