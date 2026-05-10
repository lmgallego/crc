import Image from 'next/image';

type Size = 'sm' | 'md' | 'lg';

const HEIGHT_CLASS: Record<Size, string> = {
  sm: 'h-6 md:h-7',
  md: 'h-[38px] md:h-[52px]',
  lg: 'h-9 md:h-12',
};

export function LogoCRC({
  size = 'md',
  priority = false,
}: {
  size?: Size;
  priority?: boolean;
  /** Kept for backwards compatibility; the PNG asset is single-tone. */
  variant?: 'default' | 'inverse';
}) {
  return (
    <Image
      src="/logo/crc-logo.png"
      alt="Cycling Research Center"
      width={400}
      height={200}
      priority={priority}
      className={`w-auto ${HEIGHT_CLASS[size]}`}
    />
  );
}
