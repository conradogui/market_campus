import { Link } from "react-router"

function Home() {
  return (
    <div>
      <h1>Bem vindo ao Market Campus</h1>
      <Link to="/login">Login</Link>
    </div>
  )
}

export default Home