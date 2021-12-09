import MarvelLogo from "../asset/MarvelLogo.svg";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ handleChangeCom, searchResult, token, setUser }) => {
  const navigate = useNavigate();

  return (
    <div className="header">
      <div className="container">
        <Link to="/">
          <img src={MarvelLogo} alt="logo" />
        </Link>

        <input
          onChange={handleChangeCom}
          type="text"
          placeholder="Search comics"
        />

        <Link to="/">
          <span className="test">Characters</span>
        </Link>
        <Link to="/comics">
          <span className="test">Comics</span>
        </Link>

        {token ? (
          <button
            onClick={() => {
              setUser(null);
              navigate("/");
            }}
          >
            Se déconnecter{" "}
          </button>
        ) : (
          <div>
            <Link to="/login"> Se connecter</Link>
            <Link to="/signup"> S'inscrire </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
