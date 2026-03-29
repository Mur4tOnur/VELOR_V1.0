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
    <section className="relative rounded-xl border border-[var(--border)] bg-[var(--panel)] p-4 shadow-sm">
      {showHide && onHide && (
        <button
          type="button"
          onClick={onHide}
          className="absolute right-2 top-2 z-10 rounded-md border border-[var(--border)] bg-[#0c0c0f]/90 px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-[var(--muted)] hover:border-zinc-500 hover:text-white"
          title="Hide from overview"
        >
          Hide
        </button>
      )}
      <div className={showHide ? "pr-14" : undefined}>
        <h2 className="text-sm font-semibold tracking-tight text-white">{title}</h2>
        {subtitle ? <p className="mt-1 text-xs text-[var(--muted)]">{subtitle}</p> : null}
      </div>
      <div className="mt-3">{children}</div>
    </section>
  );
}
