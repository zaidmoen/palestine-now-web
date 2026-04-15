import { useEffect, useMemo, useState } from 'react';

const TWEMOJI_CDN_BASE = 'https://cdn.jsdelivr.net/gh/jdecked/twemoji@15.1.0/assets/svg';

function toCodePoints(emoji, { stripVariationSelectors = false } = {}) {
  return Array.from(emoji ?? '')
    .map((symbol) => symbol.codePointAt(0)?.toString(16))
    .filter(Boolean)
    .filter((codePoint) => !(stripVariationSelectors && codePoint === 'fe0f'))
    .join('-');
}

function buildEmojiUrl(emoji, options) {
  const codePoints = toCodePoints(emoji, options);
  return codePoints ? `${TWEMOJI_CDN_BASE}/${codePoints}.svg` : null;
}

export default function EmojiIcon({
  emoji,
  label,
  size = 24,
  className = '',
  style,
  decorative = true,
  priority = false,
}) {
  const primarySrc = useMemo(() => buildEmojiUrl(emoji), [emoji]);
  const fallbackSrc = useMemo(
    () => buildEmojiUrl(emoji, { stripVariationSelectors: true }),
    [emoji],
  );
  const [src, setSrc] = useState(primarySrc);
  const [renderFallback, setRenderFallback] = useState(!primarySrc);

  useEffect(() => {
    setSrc(primarySrc);
    setRenderFallback(!primarySrc);
  }, [primarySrc]);

  if (!emoji || renderFallback) {
    return (
      <span
        className={className}
        style={{ fontSize: size, lineHeight: 1, ...style }}
        role={decorative ? undefined : 'img'}
        aria-label={decorative ? undefined : label ?? emoji}
        aria-hidden={decorative ? 'true' : undefined}
      >
        {emoji}
      </span>
    );
  }

  return (
    <img
      src={src}
      alt={decorative ? '' : label ?? emoji}
      aria-hidden={decorative ? 'true' : undefined}
      className={className}
      style={{ width: size, height: size, ...style }}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      draggable="false"
      onError={() => {
        if (src !== fallbackSrc && fallbackSrc) {
          setSrc(fallbackSrc);
          return;
        }

        setRenderFallback(true);
      }}
    />
  );
}
