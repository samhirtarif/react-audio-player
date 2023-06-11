import { expect, test, vi } from "vitest";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderer from "react-test-renderer"
import "@testing-library/jest-dom";
import TrackBar from "../src/components/TrackBar";


describe("Test trackbar", () => {
  test("Trackbar snapshot", () => {
    const trackbar = renderer.create(
      <TrackBar 
        total={30}
        current={0}
        setCurrent={(num) => console.log(num)}
        showTrack={true}
        showKnob={true}
        trackHeight={1}
      />
    )
    const tree = trackbar.toJSON();
    expect(tree).toMatchSnapshot();
  })

  test("Trackbar click", async () => {
    const user = userEvent.setup()
    const onSetCurrent = vi.fn((num) => console.log(num))
    render(
      <TrackBar 
        total={30}
        current={0}
        setCurrent={onSetCurrent}
        showTrack={true}
        showKnob={true}
        trackHeight={1}
      />
    )

    const trackbar: HTMLElement = screen.getByTestId("trackbar");
    await user.click(trackbar)
    expect(onSetCurrent).toHaveBeenCalled()
  })  
})
