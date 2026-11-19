import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

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
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <h1 className="mb-6 text-center text-2xl font-bold tracking-tight">
          Creer un compte
        </h1>

        <div className="fi-card">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="fi-label">Nom</label>
              <input
                id="name"
                className="fi-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && <p className="fi-error">{errors.name[0]}</p>}
            </div>

            <div>
              <label htmlFor="email" className="fi-label">Email</label>
              <input
                id="email"
                type="email"
                className="fi-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <p className="fi-error">{errors.email[0]}</p>}
            </div>

            <div>
              <label htmlFor="password" className="fi-label">Mot de passe</label>
              <input
                id="password"
                type="password"
                className="fi-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <p className="fi-error">{errors.password[0]}</p>}
            </div>

            {errors.general && <p className="fi-error">{errors.general[0]}</p>}

            <button type="submit" className="fi-btn fi-btn-primary w-full">
              S'inscrire
            </button>
          </form>
        </div>

        <p className="mt-4 text-center text-sm text-zinc-600">
          Deja un compte ?{" "}
          <Link to="/login" className="font-semibold text-primary-600 hover:text-primary-500">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}