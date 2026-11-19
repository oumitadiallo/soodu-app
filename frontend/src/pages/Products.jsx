import { useEffect, useState } from "react";
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

export default function Products() {
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

  return (
    <div>
      <p className="text-sm text-zinc-500">Produits &gt; Liste</p>
      <h1 className="mt-1 mb-6 text-2xl font-bold tracking-tight">Produits</h1>

      <div className="fi-card overflow-hidden p-0">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-zinc-950/5 bg-zinc-50">
            <tr>
              <th className="px-6 py-3 font-semibold">Produit</th>
              <th className="px-6 py-3 font-semibold">Prix</th>
              <th className="px-6 py-3 font-semibold">Quantite</th>
              <th className="px-6 py-3 font-semibold">Stock</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-950/5">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-zinc-50">
                <td className="px-6 py-4">
                  <p className="font-medium">{p.name}</p>
                  <p className="text-zinc-500">{p.description}</p>
                </td>
                <td className="px-6 py-4">
                  {Number(p.price).toLocaleString("fr-FR")} FCFA
                </td>
                <td className="px-6 py-4">{p.stock_quantity}</td>
                <td className="px-6 py-4">
                  <StockBadge quantity={p.stock_quantity} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {loading && <p className="p-6 text-zinc-500">Chargement...</p>}
        {error && <p className="p-6 text-red-600">{error}</p>}
        {!loading && !error && products.length === 0 && (
          <p className="p-6 text-zinc-500">Aucun produit pour le moment.</p>
        )}
      </div>
    </div>
  );
}