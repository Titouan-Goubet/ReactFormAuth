import "./App.css";
import BackgroundImage from "./assets/background.jpg";

function App() {
  return (
    <>
      <div
        className="sign-up__wrapper"
        style={{ backgroundImage: `url(${BackgroundImage})` }}
      ></div>
    </>
  );
}

export default App;
