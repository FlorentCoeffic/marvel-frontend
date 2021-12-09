import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post("http://localhost:4000/user/login", {
      email: email,
      password: password,
    });

    if (response.data.token) {
      setUser(response.data.token);
      navigate("/");
    } else {
      alert("Une erreur est survenue, veuillez réssayer.");
    }

    try {
    } catch (error) {
      console.log(error.response);
      console.log(error.message);
      if (error.response.status === 401) {
        setErrorMessage("Mauvais email et/ou mot de passe");
      }
    }
  };
  return (
    <div>
      Se connecter
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <span className="errorMessage">{errorMessage}</span>
        <input
          type="password"
          placeholder="Mot de passe"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <button>Se connecter</button>
      </form>
    </div>
  );
};

export default Login;
