import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h2>Home</h2>
      <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
    </div>
  );
}

export default Home;
