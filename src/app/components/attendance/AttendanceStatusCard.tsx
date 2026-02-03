"use client";

// COMPONENTS //
import LineArrowRight1 from "@/components/icons/neevo-icons/LineArrowRight1";

// OTHERS //
import AttendanceState from "./AttendanceState";
import AttendanceTrend from "./AttendanceTrend";

// Attendance Status Card
const AttendanceStatusCard = () => {
  return (
    <div className="flex flex-col rounded-2xl p-5 gap-4 bg-n-50 border border-n-200">
      <p className="font-normal text-sm leading-none text-n-900">
        Attendance Summary
      </p>
      <div className="flex flex-col gap-2.5">
        {/* Total Session Summary */}
        <div className="flex justify-between">
          <div className="flex gap-0.5">
            <p className="text-4xl font-bond leading-none text-n-600 self-end">
              30
            </p>
            <p className="text-xl font-medium leading-none text-n-500 self-end">
              /30
            </p>
          </div>
          <div className="flex gap-2 justify-center items-center self-center">
            {/* Icon */}
            <div className="flex justify-center items-center rounded-sm p-0.5 w-[15px] h-[19px] bg-n-200">
              <LineArrowRight1 className=" h-full -rotate-90 " />
            </div>
            {/*  */}
            <div className="flex gap-1">
              <p className="font-bold text-base leading-none text-n-600">0%</p>
              <p className="font-normal text-base leading-none text-n-600">
                from last month
              </p>
            </div>
          </div>
        </div>

        {/* Attendance states - On Time, Late, Total */}
        <div className="flex gap-2">
          <AttendanceState label="On Time" value="28" />
          <AttendanceState label="Late" value="02" />
          <AttendanceState label="Total" value="30" />
        </div>

        {/* Attendance Trend */}
        <AttendanceTrend
          status="Late Increased 10%"
          description="Late check-ins increased by 1 this week"
        />
      </div>
    </div>
  );
};

export default AttendanceStatusCard;
