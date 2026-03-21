// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Preloader — styles live in index.css
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default function Preloader() {
  return (
    <div className="preloader-overlay">
      <div className="preloader">
        <div className="crack crack1" />
        <div className="crack crack2" />
        <div className="crack crack3" />
        <div className="crack crack4" />
        <div className="crack crack5" />
      </div>
      <p
        style={{
          position: 'absolute',
          bottom: '30%',
          fontFamily: 'Cairo, sans-serif',
          color: 'var(--text-2)',
          fontSize: '14px',
          letterSpacing: '2px',
          fontWeight: 600,
        }}
      >
        فلسطين الآن
      </p>
    </div>
  );
}
