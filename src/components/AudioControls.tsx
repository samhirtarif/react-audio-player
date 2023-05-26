import playSVG from "../icons/play.svg";
import pauseSVG from "../icons/pause.svg";
import skipSVG from "../icons/skip.svg";
import { type ReactElement } from "react";

interface Props {
  isPlaying: boolean;
  allowSkip: boolean;
  onPlayClick: () => void;
  onPauseClick: () => void;
  onSkipForwardClick: () => void;
  onSkipBackwardClick: () => void;
}

const AudioControls = ({
  isPlaying,
  allowSkip,
  onPlayClick,
  onPauseClick,
  onSkipForwardClick,
  onSkipBackwardClick,
}: Props): ReactElement => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gridColumn: "2 / 2",
        gap: 15,
      }}
    >
      {/* skip backwards */}
      {allowSkip && (
        <img
          src={skipSVG}
          onClick={onSkipBackwardClick}
          title={"Skip backwards"}
          style={{
            cursor: "pointer",
            height: 16,
            width: 16,
            transform: "rotate(180deg)",
          }}
        />
      )}
      {/* skip fowards */}
      <img
        src={isPlaying ? pauseSVG : playSVG}
        onClick={isPlaying ? onPauseClick : onPlayClick}
        title={isPlaying ? "Pause" : "Play"}
        style={{
          cursor: "pointer",
          height: "20px",
          width: "20px",
        }}
      />
      {/* skip forwards */}
      {allowSkip && (
        <img
          src={skipSVG}
          onClick={onSkipForwardClick}
          title={"Skip forwards"}
          style={{
            cursor: "pointer",
            height: 16,
            width: 16,
          }}
        />
      )}
    </div>
  );
};

export default AudioControls;
