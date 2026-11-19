import { useNavigate } from "react-router-dom";
import api from "./api";

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/logout");
    } catch {
      // meme si l'API echoue, on deconnecte cote navigateur
    }
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <button onClick={handleLogout} className="fi-btn fi-btn-gray">
      Se deconnecter
    </button>
  );
}