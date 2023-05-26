import React, { useEffect, useState } from "react";
import { AudioVisualizer } from "react-audio-visualize";

import AudioControls from "./AudioControls";
import TrackBar from "./TrackBar";

import volumeSVG from "../icons/volume.svg";
import muteSVG from "../icons/mute.svg";
import repeatSVG from "../icons/repeat.svg";
import repeatOneSVG from "../icons/repeat-one.svg";
import Timer from "./Timer";

interface AudioPlayerProps {
  src: string;
  minimal?: boolean;
  width: number;
  barWidth?: number;
  gap?: number;

  visualise?: boolean;
  trackHeight?: number;
  backgroundColor?: string;
  barColor?: string;
  barPlayedColor?: string;

  allowSkip?: boolean;
  skipDuration?: number;
  initialVolume?: number;
  loop?: boolean;
  showLoopOption?: boolean;
  showVolumeControl?: boolean;
  seekBarColor?: string;
  volumeControlColor?: string;
  hideTrack?: boolean;
  hideTrackKnobWhenPlaying?: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  src,
  minimal = false,
  width,
  trackHeight = 75,
  barWidth = 2,
  gap = 1,
  visualise = true,
  backgroundColor = "#EFEFEF",
  barColor,
  barPlayedColor,
  allowSkip = true,
  skipDuration = 5,
  initialVolume = 0.75,
  loop = false,
  showLoopOption = true,
  showVolumeControl = true,
  seekBarColor,
  volumeControlColor,
  hideTrack = false,
  hideTrackKnobWhenPlaying = false,
}) => {
  const [blob, setBlob] = useState<Blob>();
  const [audio] = useState<HTMLAudioElement>(() => new Audio());
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(initialVolume);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isLoop, setIsLoop] = useState<boolean>(loop);

  useEffect(() => {
    fetch(src)
      .then(async (response): Promise<Blob> => {
        const blob = await response.blob();
        audio.src = URL.createObjectURL(blob);
        audio.volume = initialVolume;
        audio.loop = loop;
        setBlob(blob);
        return blob;
      })
      .then(async (blob): Promise<void> => {
        const audioBuffer = await blob.arrayBuffer();
        const audioContext = new AudioContext();
        await audioContext.decodeAudioData(audioBuffer, (buffer) => {
          setDuration(buffer.duration);
        });
      });
  }, []);

  const playAudio = (): void => {
    if (!audio.src) return;
    if (audio.duration !== Infinity) setDuration(audio.duration);

    audio.play();
    setIsPlaying(true);

    // audio.ontimeupdate = () => {
    //   setCurrentTime(audio.currentTime)
    // }

    const handleTimeUpdates = (): void => {
      if (audio.currentTime >= duration) {
        pauseAudio();
        setAudioTime(0);
        return;
      }
      setCurrentTime(audio.currentTime);

      requestAnimationFrame(handleTimeUpdates);
    };
    requestAnimationFrame(handleTimeUpdates);
  };

  const pauseAudio = (): void => {
    audio.pause();
    setIsPlaying(false);
  };

  const muteAudio = (): void => {
    audio.volume = 0;
    setIsMuted(true);
  };

  const unMuteAudio = (): void => {
    audio.volume = volume;
    setIsMuted(false);
  };

  const setAudioVolume = (vol: number): void => {
    setIsMuted(false);
    setVolume(vol);
    audio.volume = vol;
  };

  const setAudioTime = (time: number): void => {
    audio.currentTime = time;
    setCurrentTime(time);
  };

  const toggleAudioLoop = (): void => {
    setIsLoop((loop) => !loop);
    audio.loop = !isLoop;
  };

  const skipForwards = (): void => {
    setAudioTime(Math.min(duration, currentTime + skipDuration));
  };
  const skipBackwards = (): void => {
    setAudioTime(Math.max(0, currentTime - skipDuration));
  };

  const seekTo = (time: number): void => {
    setAudioTime(time);
  };

  // const seekStart = () => {
  //   audio?.pause()
  // }

  return (
    <div
      style={{
        backgroundColor,
        borderRadius: "5px",
        width,
        height: "max-content",
        display: "flex",
        gap: 10,
        flexDirection: "column",
        alignItems: "center",
        padding: minimal ? "7px 10px" : "10px 20px 15px",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          gap: minimal ? 10 : 15,
          width,
        }}
      >
        {minimal ? (
          <AudioControls
            isPlaying={isPlaying}
            allowSkip={false}
            onPauseClick={pauseAudio}
            onPlayClick={playAudio}
            onSkipBackwardClick={skipBackwards}
            onSkipForwardClick={skipForwards}
          />
        ) : (
          <Timer seconds={currentTime} />
        )}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gridTemplateRows: "1fr",
            width: width * 0.7,
            height: trackHeight,
          }}
        >
          {visualise && (
            <AudioVisualizer
              width={width * 0.7}
              height={trackHeight}
              barWidth={barWidth}
              gap={gap}
              blob={blob}
              currentTime={currentTime}
              backgroundColor={backgroundColor}
              barColor={barColor}
              barPlayedColor={barPlayedColor}
              style={{
                gridColumn: 1 / 1,
                gridRow: 1 / 1,
                placeSelf: "center",
              }}
            />
          )}
          <TrackBar
            total={duration}
            current={currentTime}
            setCurrent={seekTo}
            color={seekBarColor}
            showTrack={!hideTrack}
            showKnob={!(hideTrackKnobWhenPlaying && isPlaying)}
          />
        </div>
        <Timer
          seconds={minimal && isPlaying ? currentTime : Math.round(duration)}
        />
      </div>
      {/* Controls */}

      {!minimal && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            placeItems: "center",

            width: "98%",
          }}
        >
          {showLoopOption && (
            <img
              src={isLoop ? repeatSVG : repeatOneSVG}
              onClick={toggleAudioLoop}
              title={"Loop"}
              style={{
                cursor: "pointer",
                justifySelf: "flex-start",
                height: 16,
                width: 16,
              }}
            />
          )}
          <AudioControls
            isPlaying={isPlaying}
            allowSkip={allowSkip}
            onPauseClick={pauseAudio}
            onPlayClick={playAudio}
            onSkipBackwardClick={skipBackwards}
            onSkipForwardClick={skipForwards}
          />
          {showVolumeControl && (
            <div
              style={{
                display: "flex",
                gap: 8,
                justifySelf: "flex-end",
                width: 80,
              }}
            >
              <img
                src={!isMuted && volume > 0 ? volumeSVG : muteSVG}
                onClick={isMuted ? unMuteAudio : muteAudio}
                title={isMuted ? "Un-mute" : "Mute"}
                style={{
                  cursor: "pointer",
                  height: 16,
                  width: 16,
                }}
              />
              <TrackBar
                current={volume}
                total={1}
                setCurrent={setAudioVolume}
                color={volumeControlColor}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export { AudioPlayer };
