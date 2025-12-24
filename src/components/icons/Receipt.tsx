export default function ReceiptIcon({
  className,
  width = 17,
  height = 19,
}: {
  className?: string;
  width?: number;
  height?: number;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 17 19"
      fill="none"
      className={className}
    >
      <path
        d="M16.3045 15.2505C16.4325 13.2895 16.5 11.254 16.5 9.16667C16.5 8.59868 16.4951 8.03455 16.4852 7.47469C16.4668 6.42948 16.1313 5.40943 15.4909 4.58313C14.3911 3.16385 13.4119 2.1858 11.8962 1.03052C11.4734 0.708243 10.9573 0.532976 10.4258 0.520881C9.81739 0.507037 9.18144 0.5 8.5 0.5C6.44592 0.5 4.80512 0.563943 3.08496 0.685536C1.80029 0.776345 0.7794 1.79767 0.69548 3.0828C0.567427 5.04392 0.5 7.07933 0.5 9.16667C0.5 11.254 0.567427 13.2895 0.69548 15.2505C0.7794 16.5357 1.80029 17.5569 3.08496 17.6477C4.80512 17.7693 6.44591 17.8333 8.5 17.8333C10.5541 17.8333 12.1949 17.7693 13.9151 17.6477C15.1997 17.5569 16.2207 16.5357 16.3045 15.2505Z"
        stroke="#324158"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.26758 7.58931C5.26758 7.58931 5.97623 5.38032 7.14174 5.23844C8.44205 5.08015 8.22669 7.66716 9.53427 7.58931C10.9442 7.50536 11.5281 4.57178 11.5281 4.57178"
        stroke="#324158"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.1875 10.7559H11.8125"
        stroke="#324158"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.1875 13.8394H11.8125"
        stroke="#324158"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
