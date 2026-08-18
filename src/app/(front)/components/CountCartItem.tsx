/* eslint-disable react-hooks/set-state-in-effect */
"use client"

import { useCartStore } from "@/lib/cart-store";
import { useEffect, useState } from "react";

export default function CountCartItem() {
  const totalItems = useCartStore((state) => state.totalItems());
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true)
  },[])

  if (!isMounted) return null;

  return (
    <>
      <span>{totalItems}</span>
    </>
  );
}