"use client";

interface AttendanceStateProps {
  label: string;
  value: string;
}

const AttendanceState = ({ label, value }: AttendanceStateProps) => {
  return (
    <div className="flex flex-col rounded-2xl p-3 gap-0.5 bg-n-100 justify-center items-center w-full">
      <p className="font-normal text-sm leading-none text-n-900">{label}</p>
      <p className="font-bold text-4xl leading-none text-n-800">{value}</p>
    </div>
  );
};

export default AttendanceState;
