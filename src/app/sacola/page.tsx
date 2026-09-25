import type { Metadata } from "next";
import { CartPage } from "@/components/cart/cart-page";

export const metadata: Metadata = {
  title: "Sacola",
  description: "Revise os produtos escolhidos e simule seu pedido.",
};

export default function BagPage() {
  return <CartPage />;
}
