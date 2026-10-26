import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { Link } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      const { data } = await api.post("/register", { name, email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);
      navigate("/");
    } catch (err) {
      if (err.response && err.response.status === 422) {
        setErrors(err.response.data.errors);
      } else {
        setErrors({ general: ["Erreur du serveur, reessaie plus tard."] });
      }
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto" }}>
      <h1>Creer un compte</h1>
      <form onSubmit={handleSubmit}>
        <p>Deja un compte ? <Link to="/login">Se connecter</Link></p>
        <input placeholder="Nom" value={name} onChange={(e) => setName(e.target.value)} />
        {errors.name && <p style={{ color: "red" }}>{errors.name[0]}</p>}

        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        {errors.email && <p style={{ color: "red" }}>{errors.email[0]}</p>}

        <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
        {errors.password && <p style={{ color: "red" }}>{errors.password[0]}</p>}

        {errors.general && <p style={{ color: "red" }}>{errors.general[0]}</p>}
        <button type="submit">S inscrire</button>
      </form>
    </div>
  );
}