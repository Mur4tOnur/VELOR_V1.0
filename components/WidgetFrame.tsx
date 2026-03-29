"use client";

type WidgetFrameProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  /** Overview only: corner control to hide widget from the grid. */
  onHide?: () => void;
  showHide?: boolean;
};

export function WidgetFrame({ title, subtitle, children, onHide, showHide }: WidgetFrameProps) {
  return (
    <section className="velor-glass-card relative min-w-0 p-5">
      {showHide && onHide && (
        <button
          type="button"
          onClick={onHide}
          className="absolute right-3 top-3 z-10 rounded-lg border border-white/10 bg-black/50 px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-zinc-400 backdrop-blur-sm transition-colors hover:border-white/20 hover:text-white"
          title="Hide from overview"
        >
          Hide
        </button>
      )}
      <div className={showHide ? "pr-14" : undefined}>
        <h2 className="text-sm font-semibold tracking-tight text-white">{title}</h2>
        {subtitle ? <p className="mt-1 text-xs text-[var(--muted)]">{subtitle}</p> : null}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}
