export const brandConfig = {
  name: "[NOME DA LOJA]",
  slogan: "[SLOGAN DA MARCA]",
  category: "moda contemporânea",
  locale: "pt-BR",
  currency: "BRL",
  instagramUrl: "https://www.instagram.com/imperiostorecg01/",
  email: "atendimento@nomedaloja.com.br",
  phone: "+55 11 99999-9999",
  freeShippingThreshold: 399,
  installmentCount: 10,
} as const;

export const mainNavigation = [
  { label: "Novidades", href: "/catalogo?ordem=novidades", accent: false },
  { label: "Feminino", href: "/catalogo?publico=feminino", accent: false },
  { label: "Masculino", href: "/catalogo?publico=masculino", accent: false },
  { label: "Coleções", href: "/catalogo?colecao=drop-01", accent: false },
  { label: "Sale", href: "/catalogo?sale=true", accent: true },
] as const;
