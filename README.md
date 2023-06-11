# **react-audio-player-component**
A audio player for React with a modern look and convenient usage

## Installation
```sh
npm install react-audio-player-component
```

## **AudioPlayer** Component ([Example](https://stackblitz.com/edit/stackblitz-starters-t5nci5?file=src%2FApp.tsx))

![screenshot](./assets/AudioPlayer.png)
<br /><br />
![screenshot](./assets/AudioPlayerMinimal.png)
<br />
*Minimal Audio player*

```js
import React, { useState } from 'react';
import { AudioPlayer } from 'react-audio-player-component';

const Player = () => {
  return (
    <AudioPlayer 
      src="audios/test.mp3"
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

      // seekBarColor="purple"
      // volumeControlColor="blue"
      // hideSeekBar={true}
      // hideTrackKnobWhenPlaying={true}
    />
  )
}

```

| Props  | Description | Default | Optional |
| :------------ |:--------------- |:--------------- | :--------------- |
| **`src`**  | Source for the audio file that needs to be played | N/A | No |
| **`minimal`** | Displays a minimal version of the audio player, with only the play/pause button, track bar and timestamp | `false` | Yes |
| **`width`** | Width of the audio player | N/A | No |
| **`barWidth`** | Width of each individual bar in the visualization | `2` | Yes |     
| **`gap`** |  Gap between each bar in the visualization | `1` | Yes |
| **`visualise`** |  Represents whether the audio visualization (waveform) should be displayed | `true` | Yes |
| **`trackHeight`** |  Height of the visualization / trackbar area | `75` | Yes |
| **`backgroundColor`** |  Background color for the audio player | `#EFEFEF` | Yes |
| **`barColor`** |  Color for the bars in the visualization. This only applies to bars that have not currently been played | `"rgb(184, 184, 184)""` | Yes |
| **`barPlayedColor`** |  Color for the bars that have been played | `"rgb(160, 198, 255)""` | Yes |
| **`allowSkip`** |  Represents whether the skip forward/backward options should be displayed | `true` | Yes |
| **`skipDuration`** |  The number of seconds to skip forward/backward | `5` | Yes |
| **`initialVolume`** |  Initial volume for the audio, minimum being `0`, maximum being `1` | `0.75` | Yes |
| **`loop`** |  Setting this to `true` will keep playing the audio in a loop | `false` | Yes |
| **`showLoopOption`** |  Represents whether to show the loop options | `true` | Yes |
| **`showVolumeControl`** |  Represents whether the volume control should be shown | `true` | Yes |
| **`seekBarColor`** |  Color for the audio seek bar | `rgba(140, 140, 140)` | Yes |
| **`volumeControlColor`** |  Color for the volumn control | `rgba(140, 140, 140)` | Yes |
| **`hideSeekBar`** |  Hides the seek bar if set to `true`, the audio will still be seekable | `false` | Yes |
| **`hideSeekKnobWhenPlaying`** |  Hides the seek knob when audio is playing if set to `true` | `false` | Yes |
