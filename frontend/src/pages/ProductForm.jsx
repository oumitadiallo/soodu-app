import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../api";

export default function ProductForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock_quantity: "0",
    image_url: "",
  });
  const [errors, setErrors] = useState({});

  // En modification : on charge le produit existant
  useEffect(() => {
    if (!isEdit) return;
    api.get(`/products/${id}`).then(({ data }) => {
      const p = data.data;
      setForm({
        name: p.name ?? "",
        description: p.description ?? "",
        price: p.price ?? "",
        stock_quantity: p.stock_quantity ?? "0",
        image_url: p.image_url ?? "",
      });
    });
  }, [id, isEdit]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      if (isEdit) {
        await api.put(`/products/${id}`, form);
      } else {
        await api.post("/products", form);
      }
      navigate("/admin");
    } catch (err) {
      if (err.response && err.response.status === 422) {
        setErrors(err.response.data.errors);
      } else {
        setErrors({ general: ["Erreur du serveur, reessaie plus tard."] });
      }
    }
  };

  return (
    <div className="max-w-2xl">
      <p className="text-sm text-zinc-500">
        Administration &gt; Gestion &gt; {isEdit ? "Modifier" : "Creer"}
      </p>
      <h1 className="mt-1 mb-6 text-2xl font-bold tracking-tight">
        {isEdit ? "Modifier le produit" : "Nouveau produit"}
      </h1>

      <div className="fi-card">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="fi-label">Nom</label>
            <input id="name" name="name" className="fi-input" value={form.name} onChange={handleChange} />
            {errors.name && <p className="fi-error">{errors.name[0]}</p>}
          </div>

          <div>
            <label htmlFor="description" className="fi-label">Description</label>
            <textarea id="description" name="description" rows={3} className="fi-input" value={form.description} onChange={handleChange} />
            {errors.description && <p className="fi-error">{errors.description[0]}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="price" className="fi-label">Prix (FCFA)</label>
              <input id="price" name="price" type="number" min="0" className="fi-input" value={form.price} onChange={handleChange} />
              {errors.price && <p className="fi-error">{errors.price[0]}</p>}
            </div>

            <div>
              <label htmlFor="stock_quantity" className="fi-label">Quantite en stock</label>
              <input id="stock_quantity" name="stock_quantity" type="number" min="0" className="fi-input" value={form.stock_quantity} onChange={handleChange} />
              {errors.stock_quantity && <p className="fi-error">{errors.stock_quantity[0]}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="image_url" className="fi-label">Image (lien, facultatif)</label>
            <input id="image_url" name="image_url" className="fi-input" value={form.image_url} onChange={handleChange} />
            {errors.image_url && <p className="fi-error">{errors.image_url[0]}</p>}
          </div>

          {errors.general && <p className="fi-error">{errors.general[0]}</p>}

          <div className="flex gap-3">
            <button type="submit" className="fi-btn fi-btn-primary">
              {isEdit ? "Enregistrer" : "Creer"}
            </button>
            <Link to="/admin" className="fi-btn fi-btn-gray">Annuler</Link>
          </div>
        </form>
      </div>
    </div>
  );
}