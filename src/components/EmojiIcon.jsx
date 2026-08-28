export default function EmojiIcon({
  emoji,
  label,
  size = 24,
  className = '',
  style,
  decorative = true,
}) {
  return (
    <span
      className={className}
      style={{ display: 'inline-block', fontSize: size, lineHeight: 1, ...style }}
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : label ?? emoji}
      aria-hidden={decorative ? 'true' : undefined}
    >
      {emoji}
    </span>
  );
}
