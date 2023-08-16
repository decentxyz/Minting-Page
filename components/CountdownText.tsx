import { useEffect, useState } from "react";
import useCountdown from "../lib/useCountdown";

interface CountdownProps {
  dropTime: Date;
  dropCallback?: Function;
  className?: string;
}

export default function CountdownText({ dropTime, dropCallback, className }: CountdownProps): JSX.Element {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const {days, hours, minutes, seconds} = useCountdown(dropTime, dropCallback);

  if (!mounted) {
    return <span>at {dropTime.toLocaleString("en-US")}</span>
  } 

  return <span className={className}>
    {' '}{days}d {hours}h {minutes}m {seconds}s
  </span>
}
