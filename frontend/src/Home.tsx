import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div>
      <h1>わたしのごはん</h1>
      <Link to="/record">
        <button>記録する</button>
      </Link>
      <Link to="/history">
        <button>今までのごはん</button>
      </Link>
    </div>
  );
};

export default Home;
