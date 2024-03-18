"use client";
import Image, { ImageLoaderProps, ImageProps } from "next/image";

const basehubLoader = ({ src, width, quality }: ImageLoaderProps) => {
  if (src.endsWith("/public")) {
    src = src.replace("/public", `/w=${width},quality=${quality || 85}`);
  }
  return src;
};

export default function BaseHubImage(props: ImageProps) {
  return <Image loader={basehubLoader} {...props} />;
}
