"use client";

interface AttendanceTrendProps {
  status: string;
  description: string;
  latePercentageChange: number;
}

const AttendanceTrend = ({
  status,
  description,
  latePercentageChange,
}: AttendanceTrendProps) => {
  /**  Determine trend type based on percentage change */
  const getTrendStyles = () => {
    if (latePercentageChange < 0) {
      // Late reduced (improvement)
      return {
        bgColor: "bg-green-50",
        textColor: "text-green-800",
      };
    } else if (latePercentageChange === 0) {
      // No change
      return {
        bgColor: "bg-n-100",
        textColor: "text-n-700",
      };
    } else {
      // Late increased (negative)
      return {
        bgColor: "bg-red-50",
        textColor: "text-red-700",
      };
    }
  };

  const { bgColor, textColor } = getTrendStyles();

  return (
    <div
      className={`flex flex-col px-5 py-4 gap-1.5 ${bgColor} rounded-[12px]`}
    >
      <p className={`text-base font-semibold leading-none ${textColor}`}>
        {status}
      </p>
      <p className="text-xs font-normal leading-none text-n-900">
        {description}
      </p>
    </div>
  );
};

export default AttendanceTrend;
