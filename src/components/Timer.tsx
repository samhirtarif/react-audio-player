import { type ReactElement } from "react";

interface Props {
  seconds?: number;
}

const Timer = ({ seconds }: Props): ReactElement => {
  return (
    <div
      style={{
        color: "#000000",
        fontSize: 14,
      }}
    >
      {seconds !== undefined
        ? `${Math.floor(seconds / 60)
            .toString()
            .padStart(2, "0")}:${String(Math.round(seconds % 60)).padStart(
            2,
            "0"
          )}`
        : "--:--"}
    </div>
  );
};

export default Timer;
