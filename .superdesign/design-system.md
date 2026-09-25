# [NOME DA LOJA] — sistema visual do e-commerce

## Contexto do produto

- Loja virtual brasileira de moda contemporânea, com foco principal em roupas e calçados casuais de apelo urbano.
- Público: pessoas de 18–38 anos que procuram peças versáteis, atuais e fáceis de combinar, com apresentação mais premium que um marketplace comum.
- Idioma: português do Brasil.
- Moeda: Real brasileiro (R$), com preços formatados em `pt-BR`.
- Identidade provisória obrigatória: nome `[NOME DA LOJA]` e slogan `[SLOGAN DA MARCA]`, ambos centralizados em configuração para futura substituição.
- Nesta fase não há backend, conta real, pagamento ou autenticação. Busca, filtros, favoritos e sacola são experiências de frontend com dados demonstrativos e persistência local.
- As únicas imagens finais permitidas são os nove arquivos fornecidos pelo usuário no ZIP. Dois pares são duplicados; usar uma ocorrência de cada par é suficiente. Não importar, copiar ou baixar nenhuma mídia do Instagram.

## Leitura visual dos arquivos fornecidos

- Fotografias verticais espontâneas, com estética de bastidor de loja e flat lays de combinações completas.
- Produtos observados: cropped tees neutras; conjunto vinho com tênis cinza; polo texturizada branca com calça escura; camiseta listrada vinho com bermuda clara; camiseta listrada azul-marinho com calça clara; camiseta canelada em quatro cores; fachada da loja.
- Superfícies recorrentes: grades metálicas pretas, cabides de madeira, sofá taupe, piso claro e luz direta. Essas linhas e materiais sugerem usar grid forte, filetes finos e texturas discretas.
- Cores dominantes: preto, off-white, cinza, areia e taupe. Acentos reais das fotos: vinho profundo e azul-marinho.
- Personalidade: streetwear contemporânea, direta, jovem, curada e tátil. Elevar o material cotidiano por meio de edição tipográfica, recortes de imagem precisos, ritmo de “drop” e bastante espaço negativo.
- Evitar visual excessivamente clássico, dourado, ornamental, corporativo ou com gradientes tecnológicos.

## Princípios de direção

1. **Editorial streetwear que vende:** cada seção combina lookbook independente, catálogo de drop e revista de cultura urbana, mas CTAs, preço, cor e tamanho permanecem claros.
2. **Luxo sem ostentação:** contraste, proporção, ritmo e tipografia entregam valor; não usar dourado, efeitos 3D ou sombras pesadas.
3. **Produto em primeiro plano:** fotos grandes e recortes verticais; planos neutros ao redor aumentam a percepção de cuidado.
4. **Assimetria controlada:** combinar grids regulares de produto com blocos deslocados, numeração grande, tarjas tipográficas, respiros generosos e legendas técnicas pequenas.
5. **Grafismo original:** usar desenhos lineares próprios — setas, estrelas irregulares, círculos, riscos de marcador, coordenadas e marcas de registro — como elementos decorativos, nunca como logotipo e nunca copiando símbolos de marcas existentes.
6. **Interação silenciosa:** movimentos curtos, naturais e úteis. O usuário nunca espera uma animação terminar para comprar.

## Paleta

### Base

- `ink`: `#080808` — preto dominante, botões e blocos sólidos.
- `paper`: `#0D0D0D` — fundo principal quase preto.
- `chalk`: `#F2EEE5` — texto principal e superfícies claras raras.
- `sand`: `#2A2927` — divisórias, skeletons e superfícies grafite.
- `stone`: `#A29E96` — texto secundário e metadados.

### Acentos derivados das fotos

- `wine`: `#6E2035` — campanhas, tags Sale, microdestaques e estados ativos selecionados.
- `navy`: `#1E2B46` — alternativa sóbria para blocos editoriais e coleções masculinas.
- `sage`: `#667064` — uso raro para sucesso e disponibilidade.
- `error`: `#A4382F` — erros e indisponibilidade.

### Regras

- 70% preto/grafite, 20% off-white, no máximo 10% wine/navy por viewport.
- Não usar gradientes. Não usar dourado.
- Contraste mínimo AA. Texto longo sempre ink sobre paper/chalk ou chalk sobre ink/navy.

## Tipografia

- Display: **Instrument Serif**, fallback Georgia, serif. Usar como contraponto em frases de campanha e momentos de manifesto, não como voz dominante.
- Interface e corpo: **Manrope**, fallback Arial, sans-serif. Pesos 400, 500 e 600.
- Microtipografia underground: **IBM Plex Mono**, fallback monospace. Pesos 400 e 600 para códigos, coordenadas, etiquetas de drop e observações técnicas.
- Voz streetwear principal: Manrope 600 em títulos condensados visualmente por tracking negativo, caixa alta parcial, números de coleção e labels de drop.
- Microtexto editorial: Manrope 600, 10–12px, tracking 0.14em, caixa alta.
- Escala fluida:
  - Hero: `clamp(3.5rem, 8.5vw, 9rem)`, line-height 0.88–0.94.
  - H1 interno: `clamp(2.75rem, 6vw, 6.5rem)`, line-height 0.95.
  - H2: `clamp(2rem, 4.2vw, 4.5rem)`, line-height 1.
  - H3: `clamp(1.35rem, 2vw, 2rem)`.
  - Corpo: 15–17px, line-height 1.6.
- Alternar títulos sans em caixa alta com frases serif em sentence case. Nunca escrever títulos inteiros em caixa alta na serif.
- A direção underground pode comprimir visualmente títulos sans com tracking negativo, usar palavras cortadas pelas bordas e contrastar com etiquetas mono pequenas.

## Grid e espaçamento

- Desktop: grid de 12 colunas, max-width 1600px, gutters laterais de 32–56px.
- Tablet: 8 colunas, gutters de 24px.
- Mobile: 4 colunas, gutters de 16–20px.
- Escala de espaçamento base: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128 e 160px.
- Seções desktop com 112–160px verticais; mobile com 72–96px.
- Cards majoritariamente sem container decorativo: imagem, código do produto/drop, metadados e preço. Bordas aparecem como filetes de 1px.
- Cantos: imagens e cartões 0–4px; controles 999px apenas para chips, badges e seletores. Drawers/modais até 16px.

## Imagética e composição

- Preservar os arquivos em seus enquadramentos verticais; usar `object-fit: cover` com foco por imagem configurável.
- Não inventar, gerar ou buscar fotos externas. Onde faltar ângulo alternativo, reutilizar a imagem correspondente com crop distinto, tratamento monocromático leve ou placeholder tipográfico elegante, sem fingir ser outra fotografia.
- Home: uma imagem de look completo como hero vertical dominante; tipografia sans grande e recortada, contador `DROP 01 / 26`, coordenadas/índices gráficos discretos e CTAs claros. Não cobrir produtos importantes.
- Grid editorial: misturar 4:5, 3:4, 1:1 e blocos horizontais 16:9, mantendo alinhamentos do grid.
- Produto: 3:4 como proporção principal; segunda imagem no hover pode ser crop alternativo da mesma foto quando não houver outro arquivo.
- Aplicar no máximo um grão sutil por CSS (opacidade 2–3%) em campanhas, nunca sobre imagens de produto na página de detalhe.

## Componentes essenciais

### Header

- 76px desktop / 64px mobile.
- Transparente sobre o hero, texto claro quando necessário; ao rolar vira paper translúcido com blur discreto e filete inferior.
- Wordmark tipográfico `[NOME DA LOJA]`, nunca um ícone inventado.
- Desktop: Novidades, Feminino, Masculino, Coleções, Sale; busca, conta, favoritos e sacola.
- Mobile: menu, wordmark central, busca e sacola; drawer completo.

### Botões

- Primário: ink/chalk, altura 48–54px, label uppercase 12px, tracking 0.1em.
- Secundário: transparente com borda ink 1px.
- Editorial link: texto com seta e underline animado.
- Estados hover/active/focus/disabled/loading/success explicitamente desenhados. Foco visível com outline de 2px e offset de 3px.

### Cards de produto

- Imagem 3:4, sem sombra, fundo sand.
- Badge pequeno no canto superior esquerdo; favorito no direito com área de toque de 44px.
- Nome e categoria alinhados à esquerda; preço alinhado com boa hierarquia. Preço anterior riscado e desconto wine.
- Swatches de 14–16px com label acessível.
- No hover desktop: troca/crop suave da imagem, quick action sobe 8–12px e aparece; nome/preço não se movem.
- Mobile: ação rápida sempre acessível; nada depende exclusivamente de hover.

### Formulários e seletores

- Inputs de 52px, fundo transparente/chalk, borda stone 35%.
- Labels persistentes. Erro abaixo do campo, nunca apenas por cor.
- Chips de tamanho com pelo menos 44×44px; esgotados riscados e `aria-disabled`.

### Drawers e modais

- Overlay preto a 36%; painel chalk.
- Drawer de sacola à direita no desktop e bottom/full-height no mobile.
- Foco preso, Escape fecha, clique externo fecha e o foco retorna ao disparador.

## Home — composição de referência

1. Barra editorial curta acima do header: frete grátis acima de R$ 399, troca facilitada e marcador de drop.
2. Hero de 100svh: composição split assimétrica, foto vertical ocupando cerca de 55–60%, tipografia sans oversized e detalhes de catálogo. Título forte “O essencial, elevado.”, label `DROP 01 / 26`, texto curto e CTA “Explorar o drop”. Usar nome/slogan provisórios onde apropriado.
3. Marquee curto, acessível e pausável: “NOVO DROP · FORMAS URBANAS · PEÇAS PARA O AGORA”.
4. Coleções em destaque: três módulos — Core essentials, Vinho profundo, Movimento urbano — com índices `01`, `02`, `03`.
5. Novidades: cabeçalho editorial + 4 cards.
6. Grid editorial irregular com looks, detalhes e um bloco de manifesto.
7. Banner de campanha wine ou navy com recorte fotográfico sobreposto, título sans amplo, código de coleção e frase serif menor.
8. Mais vendidos: carrossel acessível ou grid de 4.
9. Essência: texto de manifesto ao lado de imagem da fachada ou bastidor.
10. Benefícios: entrega, troca e pagamento em linha, separados por filetes.
11. Lookbook/Instagram demonstrativo usando somente os arquivos enviados e link textual para o perfil, sem importar mídia externa.
12. Newsletter ink com tipografia chalk e campo amplo.
13. Footer completo em ink, com navegação, atendimento, políticas, redes e assinatura provisória.

## Páginas e estados

- Rotas planejadas: `/`, `/catalogo`, `/produto/[slug]`, `/sacola`, `/favoritos` e busca em overlay global.
- Catálogo: breadcrumb, introdução compacta, contagem, sort, toggle de densidade, sidebar desktop e drawer mobile. Skeleton, vazio e “carregar mais” devem existir visualmente.
- Produto: galeria 2 colunas desktop / swipe mobile, sticky info, preço/parcelamento, cor, tamanho, guia modal, CEP visual, accordions, relacionados e complete o look.
- Sacola: drawer e página completa; barra de frete grátis, quantidade, variações, cupom e resumo. Mostrar estado vazio elegante.
- Favoritos: grid reutilizando cards, remoção e adição à sacola.
- Busca: overlay fullscreen com campo grande, sugestões instantâneas, recentes, populares e resultados.

## Motion

- Curva principal: `cubic-bezier(0.22, 1, 0.36, 1)`.
- Microinterações: 160–240ms; drawers/modais: 320–420ms; revelações editoriais: 500–700ms.
- Hero: entrada curta por máscara/linha; não criar splash que bloqueie a navegação.
- Seções: opacity 0→1 e translateY 20→0 ao entrar no viewport uma única vez.
- Produtos: stagger de 50–70ms, com limite para não atrasar grades grandes.
- Parallax máximo de 4–6% e somente em desktop potente.
- Respeitar `prefers-reduced-motion`: remover parallax, marquee automático, stagger e transições de layout; manter apenas mudanças instantâneas ou fades mínimos.

## Acessibilidade e UX

- HTML semântico, skip link, ordem de headings correta e alvos de toque de pelo menos 44px.
- Ícones Lucide sempre acompanhados de `aria-label` quando não houver texto visível.
- Estados nunca comunicados apenas por cor.
- Alt text deve descrever o tipo de peça e composição, sem citar marcas de terceiros visíveis nas fotos.
- Header, menus, drawers e modal de medidas operáveis por teclado.
- Feedback por região `aria-live` para favorito, sacola e aplicação de cupom.

## Guardrails de geração

- Usar somente as fontes, cores, espaçamentos e estilos definidos aqui.
- Não introduzir rosa, roxo, neon, gradientes, dourado, personagens ou mascotes copiados, glassmorphism intenso ou cards genéricos com sombras.
- Os desenhos devem parecer feitos à mão com traço off-white ou vinho, mas permanecer abstratos e originais; não usar logos, monogramas ou símbolos protegidos.
- Permitir textura CSS de retícula/xerox em baixa opacidade, fita adesiva simulada, bordas tracejadas, marcações de registro e imagens com contraste alto. Não usar texturas ou assets externos.
- Não criar logotipo gráfico; usar apenas o wordmark tipográfico provisório `[NOME DA LOJA]`.
- Não usar imagens do Instagram, bancos de imagens ou conteúdo gerado. Incorporar apenas URLs públicas retornadas para os arquivos do ZIP enviados.
- Não copiar textos, logos ou marcas visíveis nas fotos. O catálogo e a copy são fictícios e originais.
- O resultado deve equilibrar moda urbana real e acabamento editorial premium, com navegação comercial inequívoca.
