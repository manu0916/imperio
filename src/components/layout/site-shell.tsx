"use client";

import { Header } from "@/components/layout/header";
import { CartDrawer } from "@/components/layout/cart-drawer";
import { SearchOverlay } from "@/components/layout/search-overlay";

export function SiteShell() {
  return (
    <>
      <Header />
      <CartDrawer />
      <SearchOverlay />
    </>
  );
}

