import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PencilSquareIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import api from "../api";

function StockBadge({ quantity }) {
  if (quantity === 0) {
    return <span className="fi-badge fi-badge-danger">Rupture</span>;
  }
  if (quantity <= 5) {
    return <span className="fi-badge fi-badge-warning">Stock faible</span>;
  }
  return <span className="fi-badge fi-badge-success">En stock</span>;
}

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/products")
      .then(({ data }) => setProducts(data.data))
      .catch(() => setError("Impossible de charger les produits."))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (product) => {
    if (!window.confirm(`Supprimer "${product.name}" ?`)) return;
    try {
      await api.delete(`/products/${product.id}`);
      setProducts(products.filter((p) => p.id !== product.id));
    } catch {
      setError("La suppression a echoue.");
    }
  };

  return (
    <div>
      <p className="text-sm text-zinc-500">Administration &gt; Gestion</p>
      <div className="mt-1 mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Gestion des produits</h1>
        <Link to="/admin/products/new" className="fi-btn fi-btn-primary">
          <PlusIcon className="size-4" />
          Ajouter un produit
        </Link>
      </div>

      {error && <p className="fi-error mb-4">{error}</p>}

      <div className="fi-card overflow-hidden p-0">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-zinc-950/5 bg-zinc-50">
            <tr>
              <th className="px-6 py-3 font-semibold">Produit</th>
              <th className="px-6 py-3 font-semibold">Prix</th>
              <th className="px-6 py-3 font-semibold">Quantite</th>
              <th className="px-6 py-3 font-semibold">Stock</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-950/5">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-zinc-50">
                <td className="px-6 py-4 font-medium">{p.name}</td>
                <td className="px-6 py-4">
                  {Number(p.price).toLocaleString("fr-FR")} FCFA
                </td>
                <td className="px-6 py-4">{p.stock_quantity}</td>
                <td className="px-6 py-4">
                  <StockBadge quantity={p.stock_quantity} />
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <Link to={`/admin/products/${p.id}/edit`} className="fi-btn fi-btn-gray">
                      <PencilSquareIcon className="size-4" />
                      Modifier
                    </Link>
                    <button onClick={() => handleDelete(p)} className="fi-btn fi-btn-danger">
                      <TrashIcon className="size-4" />
                      Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {loading && <p className="p-6 text-zinc-500">Chargement...</p>}
        {!loading && products.length === 0 && (
          <p className="p-6 text-zinc-500">Aucun produit pour le moment.</p>
        )}
      </div>
    </div>
  );
}