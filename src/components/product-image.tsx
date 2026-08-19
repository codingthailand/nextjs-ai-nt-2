"use client"

import { useState } from "react";
import Image from "next/image";

export default function ProductImage({
  name,
  src,
}: {
  name: string;
  src: string | null;
}) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className="flex size-full items-center justify-center bg-muted text-5xl font-bold text-muted-foreground/30">
        {name.charAt(0)}
      </div>
    );
  }

  return (
    <Image
      alt={name}
      className="size-full bg-muted object-cover transition-transform duration-300 group-hover/card:scale-105"
      width={0}
      height={0}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      src={src}
      loading="eager"
      onError={() => setFailed(true)}
    />
  );
}
