import logo from "@/assets/shopitt-logo.png.asset.json";
import icon from "@/assets/shopitt-logo.png.asset.json";

export function Logo({ className = "h-7" }: { className?: string }) {
  return (
    <img
      src={logo.url}
      alt="Shopitt"
      className={`${className} w-auto dark:invert dark:hue-rotate-180`}
      draggable={false}
    />
  );
}

export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <img src={icon.url} alt="" aria-hidden className={`${className} object-contain object-left`} />
  );
}