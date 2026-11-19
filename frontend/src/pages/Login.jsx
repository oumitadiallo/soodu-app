import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await api.post("/login", { email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);
      navigate(data.user.role === "admin" ? "/admin" : "/");
    } catch (err) {
      if (err.response && err.response.status === 422) {
        setError(err.response.data.errors.email[0]);
      } else {
        setError("Erreur du serveur, reessaie plus tard.");
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <h1 className="mb-6 text-center text-2xl font-bold tracking-tight">
          Connexion
        </h1>

        <div className="fi-card">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="fi-label">Email</label>
              <input
                id="email"
                type="email"
                className="fi-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
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
            </div>

            {error && <p className="fi-error">{error}</p>}

            <button type="submit" className="fi-btn fi-btn-primary w-full">
              Se connecter
            </button>
          </form>
        </div>

        <p className="mt-4 text-center text-sm text-zinc-600">
          Pas de compte ?{" "}
          <Link to="/register" className="font-semibold text-primary-600 hover:text-primary-500">
            Creer un compte
          </Link>
        </p>
      </div>
    </div>
  );
}