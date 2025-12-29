import Image from "next/image";

interface SocialIconProps {
  src: string;
}

// SocialIcon Component
export default function SocialIcon({ src }: SocialIconProps) {
  return (
    <div className="flex items-center justify-center px-8 py-5 border rounded-xl bg-n-100 border-n-200">
      <Image
        src={src}
        alt="social"
        className="h-full w-full"
        width={18}
        height={18}
      />
    </div>
  );
}
