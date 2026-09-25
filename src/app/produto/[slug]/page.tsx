import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetails } from "@/components/product/product-details";
import { productBySlug, products } from "@/data/products";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = productBySlug(slug);

  if (!product) return { title: "Produto não encontrado" };

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.images[0], alt: product.name }],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = productBySlug(slug);

  if (!product) notFound();

  const related = products
    .filter(
      (item) =>
        item.id !== product.id &&
        (item.category === product.category || item.collection === product.collection),
    )
    .slice(0, 4);

  const completeTheLook = products
    .filter((item) => item.id !== product.id && item.category !== product.category)
    .slice(0, 3);

  return (
    <ProductDetails
      product={product}
      related={related.length >= 2 ? related : products.filter((item) => item.id !== product.id).slice(0, 4)}
      completeTheLook={completeTheLook}
    />
  );
}
