import { act, render, screen } from "@testing-library/react";
import drag from "./utils/drag";

import TrackBar from "../src/components/TrackBar";


describe("Test trackbar", () => {
  it("Trackbar click", async () => {
    let current = 0;
    const onSetCurrent = (num: number) => current = num;
    render(
      <TrackBar 
        total={30}
        current={0}
        setCurrent={onSetCurrent}
        showTrack={true}
        showKnob={true}
        trackHeight={1}
        color={"blue"}
      />
    )

    const trackbar: HTMLElement = screen.getByTestId("trackbar");

    await act(async () => {
      await drag(trackbar, { 
        to: { xOffset: 0.5, yOffset: 0.5}, 
        from: { xOffset: 0, yOffset: 0},
        steps: 20
      })
    })
    expect(Math.round(current)).toBe(15)
  })  
})
