import sprite from "../../../assets/symbol-defs.svg";

export default function SpriteIcon({ id, className, ...props }) {
  return (
    <svg className={className} aria-hidden="true" {...props}>
      <use href={`${sprite}#${id}`} />
    </svg>
  );
}
