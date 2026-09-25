# [NOME DA LOJA] — frontend streetwear

Loja virtual demonstrativa construída com Next.js, TypeScript, Tailwind CSS, Framer Motion e Lucide. O projeto é totalmente estático e está pronto para publicação no Cloudflare Pages.

## Desenvolvimento local

```bash
npm ci
npm run dev
```

Acesse `http://localhost:3000`.

## Publicar no Cloudflare Pages

Conecte o repositório em **Workers & Pages → Create application → Pages → Import an existing Git repository** e use:

- Framework preset: `Next.js (Static HTML Export)`
- Production branch: `main`
- Build command: `npm run build`
- Build output directory: `out`
- Root directory: deixe vazio se este projeto estiver na raiz do repositório
- Node.js: `20` ou superior

O Cloudflare Pages fornece `CF_PAGES_URL` automaticamente para os metadados. Se usar um domínio próprio, configure `NEXT_PUBLIC_SITE_URL` com a URL final, por exemplo `https://sualoja.com.br`.

O `next.config.ts` usa `output: "export"`; o build gera todo o site dentro de `out/`. O arquivo `public/_headers` adiciona cache longo para assets e cabeçalhos básicos de segurança no Pages.

O export estático validado é versionado em `out/`, e o `wrangler.jsonc` declara essa pasta como `pages_build_output_dir`. O Cloudflare apenas publica os arquivos prontos, evitando divergências entre o build local e o ambiente do Pages.

## Personalização

- Marca, slogan, contato e Instagram: `src/config/brand.ts`
- Produtos, preços e estoque: `src/data/products.ts`
- Imagens: `public/images/products` e `public/images/brand`
- Tokens visuais e estilos globais: `src/app/globals.css`

Sacola, favoritos e histórico de busca usam `localStorage`. Não há backend, autenticação nem cobrança real nesta etapa.
