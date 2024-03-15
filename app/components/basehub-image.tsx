"use client";

import Image from "next/image";

interface BaseHubImageProps {
  src: string;
  width?: number;
  quality?: number;
  [key: string]: any;
}

const baseHubLoader = ({ src, width, quality }: BaseHubImageProps) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

export default function BaseHubImage(props: BaseHubImageProps) {
  return <Image alt={props.alt} loader={baseHubLoader} {...props} />;
}
