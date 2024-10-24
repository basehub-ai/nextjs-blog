import { BaseHubImage } from "basehub/next-image";

export function BodyImage({
  ...props
}: {
  src: string;
  alt?: string | undefined;
  width?: number | undefined;
  height?: number | undefined;
  caption?: string | undefined;
}) {
  return (
    <>
      <BaseHubImage
        {...props}
        alt={props.caption ?? "Image"}
        className="rounded-lg"
        priority
      />
      {props.caption && (
        <figcaption className="text-center">{props.caption}</figcaption>
      )}
    </>
  );
}
