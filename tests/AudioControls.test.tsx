import React from "react";
import { expect, test, vi } from "vitest";
import renderer from "react-test-renderer"
import userEvent from "@testing-library/user-event";
import { render, act, screen } from "@testing-library/react";
import AudioControls from "../src/components/AudioControls";

describe("Test audio controls", () => {
  const onPlayClick = vi.fn()
  const onPauseClick = vi.fn()
  const onSkipForwardClick = vi.fn()
  const onSkipBackwardClick = vi.fn()

  test("AudioControls snapshot (playing + skip)", () => {
    const audioControls = renderer.create(
      <AudioControls 
        isPlaying={true}
        allowSkip={true}
        onPlayClick={onPlayClick}
        onPauseClick={onPauseClick}
        onSkipForwardClick={onSkipForwardClick}
        onSkipBackwardClick={onSkipBackwardClick}
      />
    )
    const tree = audioControls.toJSON();
    expect(tree).toMatchSnapshot();
  })

  test("AudioControls snapshot (no playing + no skip)", () => {
    const audioControls = renderer.create(
      <AudioControls 
        isPlaying={false}
        allowSkip={false}
        onPlayClick={onPlayClick}
        onPauseClick={onPauseClick}
        onSkipForwardClick={onSkipForwardClick}
        onSkipBackwardClick={onSkipBackwardClick}
      />
    )
    
    const tree = audioControls.toJSON();
    expect(tree).toMatchSnapshot();
  })

  test("AudioControls onPlayClick when paused", async () => {
    render(
      <AudioControls 
        isPlaying={false}
        allowSkip={false}
        onPlayClick={onPlayClick}
        onPauseClick={onPauseClick}
        onSkipForwardClick={onSkipForwardClick}
        onSkipBackwardClick={onSkipBackwardClick}
      />
    )

    const element = screen.getByTestId("play-pause")
    await act(() => userEvent.click(element))
    expect(onPlayClick).toHaveBeenCalledOnce();
  })

  test("AudioControls onPlayClick when playing", async () => {
    render(
      <AudioControls 
        isPlaying={true}
        allowSkip={false}
        onPlayClick={onPlayClick}
        onPauseClick={onPauseClick}
        onSkipForwardClick={onSkipForwardClick}
        onSkipBackwardClick={onSkipBackwardClick}
      />
    )

    const element = screen.getByTestId("play-pause")
    await act(() => userEvent.click(element))
    expect(onPauseClick).toHaveBeenCalledOnce();
  })

  test("AudioControls skips buttons", async () => {
    render(
      <AudioControls 
        isPlaying={true}
        allowSkip={true}
        onPlayClick={onPlayClick}
        onPauseClick={onPauseClick}
        onSkipForwardClick={onSkipForwardClick}
        onSkipBackwardClick={onSkipBackwardClick}
      />
    )

    const elementBack = screen.getByTestId("skip-back")
    await act(() => userEvent.click(elementBack))
    expect(onSkipBackwardClick).toHaveBeenCalledOnce();

    const elementForward = screen.getByTestId("skip-forward")
    await act(() => userEvent.click(elementForward))
    expect(onSkipForwardClick).toHaveBeenCalledOnce();
  })
})
