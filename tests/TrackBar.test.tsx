import React from "react";
import { expect, test } from "vitest";
import renderer from "react-test-renderer"
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
})
