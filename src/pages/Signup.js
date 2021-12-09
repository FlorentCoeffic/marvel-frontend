import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Signup = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post("http://localhost:4000/user/signup", {
        username: username,
        email: email,
        password: password,
      });
      console.log(response.data);

      if (response.data.token) {
        setUser(response.data.token);
        navigate("/");
      }
    } catch (error) {
      if (error.response.status === 409) {
        setErrorMessage("Cet email est déjà utilisé");
      }
    }
  };

  return (
    <div>
      <h2>S'inscrire</h2>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          value={username}
          type="text"
          placeholder="Nom d'utilisateur"
        />

        <input
          onChange={(event) => {
            setEmail(event.target.value);
            setErrorMessage("");
          }}
          value={email}
          type="email"
          placeholder="Email"
        />
        <span> {errorMessage}</span>

        <input
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          value={password}
          type="password"
          placeholder="Mot de passe"
        />

        <button>S'inscrire</button>
      </form>
    </div>
  );
};

export default Signup;
