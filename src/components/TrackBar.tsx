import React, { type ReactElement, useRef, useState } from "react";

interface Props {
  current: number;
  setCurrent: (c: number) => void;
  total: number;
  showTrack?: boolean;
  showKnob?: boolean;
  trackHeight?: number;
  color?: string;
}

const TrackBar = ({
  current,
  setCurrent,
  total,
  showTrack = true,
  showKnob = true,
  trackHeight = 1,
  color = "rgba(140, 140, 140)",
}: Props): ReactElement => {
  const [isHover, setIsHover] = useState(false);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const getPercentage = (): string => {
    const percentage = (current / total) * 100;
    return `${percentage}%`;
  };

  const setPosition = (event: MouseEvent | TouchEvent): void => {
    if (!progressBarRef.current) return;

    const progressBarRect = progressBarRef.current.getBoundingClientRect();
    const maxRelativePos = progressBarRect.width;
    const relativePos = getClientX(event) - progressBarRect.left;

    if (relativePos < 0) {
      setCurrent(0);
    } else if (relativePos > maxRelativePos) {
      setCurrent(total);
    } else {
      setCurrent((total * relativePos) / maxRelativePos);
    }
  };

  const getClientX = (event: MouseEvent | TouchEvent): number => {
    if (event instanceof TouchEvent) {
      return event.touches[0].clientX;
    }
    return event.clientX;
  };

  const onMouseDownOrTouchStart = (
    event: React.MouseEvent | React.TouchEvent
  ): void => {
    if (event.nativeEvent instanceof MouseEvent) {
      window.addEventListener("mousemove", onMouseOrTouchMove);
      window.addEventListener("mouseup", onMouseOrTouchUp);
    } else {
      window.addEventListener("touchmove", onMouseOrTouchMove);
      window.addEventListener("touchend", onMouseOrTouchUp);
    }

    setPosition(event.nativeEvent);
    setIsHover(true);
  };

  const onMouseOrTouchMove = (event: MouseEvent | TouchEvent): void => {
    setPosition(event);
  };

  const onMouseOrTouchUp = (event: MouseEvent | TouchEvent): void => {
    if (event instanceof MouseEvent) {
      window.removeEventListener("mousemove", onMouseOrTouchMove);
      window.removeEventListener("mouseup", onMouseOrTouchUp);
    } else {
      window.removeEventListener("touchmove", onMouseOrTouchMove);
      window.removeEventListener("touchend", onMouseOrTouchUp);
    }
    setIsHover(false);
  };

  const handleMouseEnter = (): void => {
    setIsHover(true);
  };

  const handleMouseLeave = (): void => {
    setIsHover(false);
  };

  return (
    <div
      tabIndex={0}
      style={{
        height: "15px",
        width: "100%",
        gridColumn: 1 / 1,
        gridRow: 1 / 1,
        placeSelf: "center",

        display: "flex",
        alignItems: "center",
        cursor: "pointer",
      }}
      onMouseDown={onMouseDownOrTouchStart}
      onTouchStart={onMouseDownOrTouchStart}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={progressBarRef}
      data-testid={"trackbar"}
    >
      <div
        style={{
          backgroundColor: color,
          height: showTrack ? trackHeight : 0,
          width: "100%",

          display: "flex",
          alignItems: "center",

          position: "relative",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            backgroundColor: color,
            opacity: showKnob || isHover ? 1 : 0,

            position: "absolute",
            // left: `${percentage}%`,
            left: getPercentage(),
            marginLeft: -5,

            cursor: "pointer",
            transition: isHover
              ? "opacity 0.3s ease-in-out"
              : "opacity 0.75s ease-in-out",
          }}
        ></div>
      </div>
    </div>
  );
};

export default TrackBar;
