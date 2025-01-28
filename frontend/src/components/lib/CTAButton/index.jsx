export default function CTAButton({
  children,
  disabled = false,
  onClick,
  className = "",
  buttonProps = {},
}) {
  return (
    <button
      disabled={disabled}
      onClick={() => onClick?.()}
      className={`border-none text-xs px-4 py-1 font-semibold light:text-[#ffffff] rounded-lg bg-primary-button h-[34px] -mr-8 whitespace-nowrap shadow-[0_4px_14px_rgba(0,0,0,0.25)] w-fit custom-theme-bg-quad custom-theme-color-quad ${className}`}
      {...buttonProps}
    >
      <div className="flex items-center justify-center gap-2">{children}</div>
    </button>
  );
}
