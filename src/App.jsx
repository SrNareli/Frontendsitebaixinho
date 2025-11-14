import { useState } from "react";
import axios from "axios";

const API_BASE = "https://baixinho-api.onrender.com";

function App() {
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
      setError(err.message || "Erro na busca");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">🔍 Baixinho — Busca Menor Preço</h1>

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
        <button onClick={buscar} className="bg-blue-600 text-white px-4 py-2 rounded">
          {loading ? "Buscando..." : "Buscar"}
        </button>
      </div>

      {error && <div className="text-red-600 mb-4">{error}</div>}

      {resultados.length === 0 && !loading && <div>Nenhum resultado — tente outro termo.</div>}

      {resultados.map((r) => (
        <div key={r.id} className="bg-white p-4 rounded shadow mb-3">
          <h2 className="font-semibold">{r.nome}</h2>
          <p>
            Melhor oferta: <strong>R${r.melhorOferta.total.toFixed(2)}</strong> ({r.melhorOferta.loja})
          </p>
          <details>
            <summary>Ver todas as ofertas</summary>
            <ul className="mt-2 list-disc ml-4">
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
  );
}

export default App;
