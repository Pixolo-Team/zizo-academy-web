import CalendarMark from "@/assets/icons/calendar-mark.svg";

const icons = {
  calendarMark: CalendarMark,
};

export type IconName = keyof typeof icons;

export default function Icon({
  name,
  className,
}: {
  name: IconName;
  className?: string;
}) {
  const iconSrc = icons[name];
  return <img src={iconSrc} className={className} alt="" />;
}
