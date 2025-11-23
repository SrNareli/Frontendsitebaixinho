import { useState } from "react";
import axios from "axios";

const API_BASE = "https://baixinho-api.onrender.com";

export default function App() {
  const [query, setQuery] = useState("");
  const [cep, setCep] = useState("");
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const buscar = async () => {
    if (!query) return setError("Digite um produto");
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${API_BASE}/search`, {
        params: { q: query, cep: cep },
      });
      setResultados(res.data.resultados || []);
    } catch (err) {
      setError(err.response?.data?.erro || err.message || "Erro na busca");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-3xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800">🔎 SiteBaixinhoPrecos</h1>
          <p className="text-sm text-slate-600">Busca o menor preço disponível levando em conta seu CEP.</p>
        </header>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Produto (ex: iPhone 15)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border p-2 rounded w-1/2"
          />
          <input
            type="text"
            placeholder="CEP (ex: 04567000)"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            className="border p-2 rounded w-1/4"
          />
          <button
            onClick={buscar}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            {loading ? "Buscando..." : "Buscar"}
          </button>
        </div>

        {error && <div className="text-red-600 mb-4">{error}</div>}

        {resultados.length === 0 && !loading && (
          <div className="text-slate-600">Nenhum resultado — tente outro termo.</div>
        )}

        <div className="space-y-3 mt-4">
          {resultados.map((r) => (
            <div key={r.id} className="bg-white p-4 rounded shadow">
              <h2 className="font-semibold text-lg">{r.nome}</h2>
              <p className="mt-1">
                Melhor oferta: <strong>R${r.melhorOferta.total.toFixed(2)}</strong>{" "}
                <span className="text-sm text-slate-500">({r.melhorOferta.loja})</span>
              </p>
              <details className="mt-2">
                <summary className="cursor-pointer text-sm text-indigo-600">Ver todas as ofertas</summary>
                <ul className="mt-2 list-disc ml-5 text-sm">
                  {r.ofertas.map((o, i) => (
                    <li key={i}>
                      {o.loja}: R${o.preco.toFixed(2)} + frete R${o.frete.toFixed(2)} = total R${o.total.toFixed(2)}
                    </li>
                  ))}
                </ul>
              </details>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
