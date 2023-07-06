import React from "react";
import ReactDOM from "react-dom/client";
import { AudioPlayer } from "./components/AudioPlayer";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AudioPlayer 
      src="audios/audio.webm"
      minimal={false}
      width={350}
      trackHeight={75}
      barWidth={1}
      gap={1}

      visualise={true}
      backgroundColor="#FFF8DE"
      barColor="#C1D0B5"
      barPlayedColor="#99A98F"

      skipDuration={2}
      showLoopOption={true}
      showVolumeControl={true}
      onended={() => console.log("ENDED")}
      // seekBarColor="purple"
      // volumeControlColor="blue"
      // hideSeekBar={true}
      // hideTrackKnobWhenPlaying={true}
    />
    <br />
    <AudioPlayer 
      src="audios/test.mp3"
      minimal={true}
      width={250}
      trackHeight={40}
      barWidth={3}
      gap={1}

      visualise={true}
      backgroundColor="#FFF8DE"
      barColor="#C1D0B5"
      barPlayedColor="#99A98F"

      skipDuration={2}
      showLoopOption={true}
      showVolumeControl={true}

      hideSeekBar={true}
      hideSeekKnobWhenPlaying={true}
    />
  </React.StrictMode>
);
