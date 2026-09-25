import type { Metadata } from "next";
import { FavoritesPage } from "@/components/favorites/favorites-page";

export const metadata: Metadata = {
  title: "Favoritos",
  description: "Peças salvas para rever quando quiser.",
};

export default function FavoritesRoute() {
  return <FavoritesPage />;
}
