export default function SectionTitle({ eyebrow, title, subtitle, align = 'center' }) {
  return (
    <div className={`mb-10 text-${align}`}>
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-rose-200/80">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-4xl font-semibold tracking-tight text-white md:text-5xl">
        {title}
      </h2>
      {subtitle && <p className="mx-auto mt-4 max-w-2xl text-base text-rose-100/80 md:text-lg">{subtitle}</p>}
    </div>
  );
}
