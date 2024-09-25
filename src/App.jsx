import "./App.css";
import { Link } from "react-router-dom";

function App() {
  return (
    <>
      <h1>Welcome Page</h1>
      <div>
        <Link to={"/login"}>Lien vers page de connexion</Link>
        <Link to={"/signup"}>Lien vers page d'inscription</Link>
      </div>
    </>
  );
}

export default App;
