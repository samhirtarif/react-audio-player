import React from "react";
import { expect, test, vi } from "vitest";
import renderer from "react-test-renderer"
import userEvent from "@testing-library/user-event";
import { render, act, screen } from "@testing-library/react";
import { AudioPlayer } from "../src/components/AudioPlayer";

describe("Test AudioPlayer", () => {
  test("AudioPlayer snapshot full", () => {
    const audioControls = renderer.create(
      <AudioPlayer 
        src="https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg"
        width={350}
        trackHeight={75}
      />
    )
    const tree = audioControls.toJSON();
    expect(tree).toMatchSnapshot();
  })

  test("AudioPlayer snapshot full - no visualize", () => {
    const audioControls = renderer.create(
      <AudioPlayer 
        src="https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg"
        width={350}
        trackHeight={75}
        visualise={false}
      />
    )
    const tree = audioControls.toJSON();
    expect(tree).toMatchSnapshot();
  })

  test("AudioPlayer snapshot full - no skip", () => {
    const audioControls = renderer.create(
      <AudioPlayer 
        src="https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg"
        width={350}
        trackHeight={75}
        allowSkip={false}
      />
    )
    const tree = audioControls.toJSON();
    expect(tree).toMatchSnapshot();
  })

  test("AudioPlayer snapshot full - no loop", () => {
    const audioControls = renderer.create(
      <AudioPlayer 
        src="https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg"
        width={350}
        trackHeight={75}
        showLoopOption={false}
      />
    )
    const tree = audioControls.toJSON();
    expect(tree).toMatchSnapshot();
  })

  test("AudioPlayer snapshot full - no volume control", () => {
    const audioControls = renderer.create(
      <AudioPlayer 
        src="https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg"
        width={350}
        trackHeight={75}
        showVolumeControl={false}
      />
    )
    const tree = audioControls.toJSON();
    expect(tree).toMatchSnapshot();
  })

  test("AudioPlayer snapshot full - no seekbar", () => {
    const audioControls = renderer.create(
      <AudioPlayer 
        src="https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg"
        width={350}
        trackHeight={75}
        hideSeekBar={false}
      />
    )
    const tree = audioControls.toJSON();
    expect(tree).toMatchSnapshot();
  })

  test("AudioPlayer snapshot full - minimal", () => {
    const audioControls = renderer.create(
      <AudioPlayer 
        src="https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg"
        width={350}
        trackHeight={75}
        minimal={true}
      />
    )
    const tree = audioControls.toJSON();
    expect(tree).toMatchSnapshot();
  })
})
