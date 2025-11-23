# SiteBaixinhoPrecos - Frontend (React + Vite + Tailwind)

Projeto frontend pronto para deploy no Netlify.

API Backend configurada (por padrão) para:
https://baixinho-api.onrender.com

## Como usar localmente

1. Instale dependências:
   npm install

2. Rodar em modo desenvolvimento:
   npm run dev

3. Build para produção:
   npm run build

## Deploy no Netlify

1. Crie repositório no GitHub e envie o código:
   git init
   git add .
   git commit -m "frontend SiteBaixinhoPrecos"
   git branch -M main
   git remote add origin https://github.com/<SEU_USUARIO>/SiteBaixinhoPrecos.git
   git push -u origin main

2. No Netlify, import from GitHub:
   - Build command: npm run build
   - Publish directory: dist
   - Site name: SiteBaixinhoPrecos (ou outro disponível)

Obs: Se sua API estiver em outra URL, edite a constante API_BASE em src/App.jsx.
