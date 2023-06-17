import React, { useEffect, useState } from "react";
import { AudioVisualizer } from "react-audio-visualize";

import AudioControls from "./AudioControls";
import TrackBar from "./TrackBar";

import volumeSVG from "../icons/volume.svg";
import muteSVG from "../icons/mute.svg";
import repeatSVG from "../icons/repeat.svg";
import repeatOneSVG from "../icons/repeat-one.svg";
import Timer from "./Timer";

interface AudioElementNativeProps {
  /**
   * The address or URL of the a audio resource that is to be considered.
   */
  src: string;
  /**
   * Sets a flag to specify whether playback should restart after it completes. Defaults to `false`
   */
  loop?: boolean;
  /**
   * Initial volume level for the audio, minimum being `0`, maximum being `1`. Defaults to `0.75`
   */
  volume?: number;
  /**
   * Sets a flag that indicates whether the audio is muted. Defaults to `false`
   */
  muted?: boolean;
  /**
   * Sets a value that indicates whether to start playing the media automatically. Defaults to `false`
   */
  autoplay?: boolean;
  /**
   * The CORS setting for this media element. {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/crossOrigin MDN Reference}. Defaults to `null`
   */
  crossOrigin?: string;
  /**
   * Sets a value indicating what data should be preloaded, if any. Defaults to empty string
   */
  preload?: "" | "none" | "metadata" | "auto";
}

interface AudioPlayerProps {
  
  /**
   * Displays a minimal version of the audio player, with only the play/pause button, track bar and timestamp. Defaults to `false`
   */
  minimal?: boolean;
  /**
   * Width of the audio player
   */
  width: number;
  /**
   * Width of each individual bar in the visualization. Defaults to `2`
   */
  barWidth?: number;
  /**
   * Gap between each individual bar in the visualization. Defaults to `1`
   */
  gap?: number;
  /**
   * Represents whether the audio visualization (waveform) should be displayed. Defaults to `true`
   */
  visualise?: boolean;
  /**
   * Height of the visualization / trackbar area. Defaults to `75`
   */
  trackHeight?: number;
  /**
   * Background color for the audio player. Defaults to `#EFEFEF`
   */
  backgroundColor?: string;
  /**
   * Bar color for the bars in the visualization. This only applies to bars that have not currently been played
   */
  barColor?: string;
  /**
   * Bar color for the bars that have been played
   */
  barPlayedColor?: string;
  /**
   * Represents whether the skip forward/backward options should be displayed. Defaults to `true`. Not applicable when `minimal` is set to `true`
   */
  allowSkip?: boolean;
  /**
   * The number of seconds to skip forward/backward. Defaults to `5`
   */
  skipDuration?: number;
  /**
   * Represents whether to show the loop options. Defaults to `true`
   */
  showLoopOption?: boolean;
  /**
   * Represents whether the volume control should be shown. Defaults to `true`
   */
  showVolumeControl?: boolean;
  /**
   * Color for the audio seek bar
   */
  seekBarColor?: string;
  /**
   * Color for the volumn control
   */
  volumeControlColor?: string;
  /**
   * Hides the seek bar if set to `true`, the audio will still be seekable. Defaults to `false`
   */
  hideSeekBar?: boolean;
  /**
   * Hides the seek knob when audio is playing if set to `true`. Defaults to `false`
   */
  hideSeekKnobWhenPlaying?: boolean;
}

const AudioPlayer: React.FC<AudioElementNativeProps & AudioPlayerProps> = ({
  // native props
  src,
  loop = false,
  volume = 0.75,
  muted = false,
  autoplay = false,
  crossOrigin = null,
  preload = "",
  // Audio player props
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
  showLoopOption = true,
  showVolumeControl = true,
  seekBarColor,
  volumeControlColor,
  hideSeekBar = false,
  hideSeekKnobWhenPlaying = false,
}) => {
  const [blob, setBlob] = useState<Blob>();
  const [audio] = useState<HTMLAudioElement>(() => new Audio());
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [internalVolume, setVolume] = useState<number>(volume);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isLoop, setIsLoop] = useState<boolean>(loop);

  useEffect(() => {
    fetch(src)
      .then(async (response): Promise<Blob> => {
        const blob = await response.blob();
        audio.src = URL.createObjectURL(blob);
        audio.volume = volume;
        audio.loop = loop;
        audio.muted = muted;
        audio.autoplay = autoplay;
        audio.crossOrigin = crossOrigin;
        audio.preload = preload;
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
          {visualise && blob && (
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
            showTrack={!hideSeekBar}
            showKnob={!(hideSeekKnobWhenPlaying && isPlaying)}
            data-testid="seek-trackbar"
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
                current={internalVolume}
                total={1}
                setCurrent={setAudioVolume}
                color={volumeControlColor}
                data-testid="volume"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export { AudioPlayer };
