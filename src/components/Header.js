import MarvelLogo from "../asset/MarvelLogo.svg";
import { Link } from "react-router-dom";

const Header = ({ handleChangeCom, searchResult }) => {
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
      </div>
    </div>
  );
};

export default Header;
