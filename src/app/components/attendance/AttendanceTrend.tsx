"use-client";

interface AttendanceTrendProps {
  status: string;
  description: string;
}

const AttendanceTrend = ({ status, description }: AttendanceTrendProps) => {
  return (
    <div className="flex flex-col px-5 py-4 gap-1 bg-red-50 rounded-[12px]">
      <p className="text-base font-semibold leading-none text-red-700">
        {status}
      </p>
      <p className="text-xs font-normal leading-none text-n-900">
        {description}
      </p>
    </div>
  );
};

export default AttendanceTrend;
