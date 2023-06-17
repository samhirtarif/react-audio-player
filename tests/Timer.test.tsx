import React from "react";
import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer"
import "@testing-library/jest-dom"
import Timer from "../src/components/Timer";


describe("Test timer", () => {
  test("Timer renders", () => {
    render(<Timer />)
    expect(screen.getByTestId("timer")).toHaveTextContent("--:--")
  })

  test("Timer renders with seconds", () => {
    render(<Timer seconds={23} />)
    expect(screen.getByTestId("timer")).toHaveTextContent("00:23")
  })

  test("Timer renders with seconds more than 60", () => {
    render(<Timer seconds={62} />)
    expect(screen.getByTestId("timer")).toHaveTextContent("01:02")
  })

  test("Timer renders with seconds more than 600", () => {
    render(<Timer seconds={620} />)
    expect(screen.getByTestId("timer")).toHaveTextContent("10:20")
  })

  test("Timer snapshot", () => {
    const timer = renderer.create(<Timer />)
    const tree = timer.toJSON();
    expect(tree).toMatchSnapshot();
  })

  test("Timer snapshot with time passed", () => {
    const timer = renderer.create(<Timer seconds={671}/>)
    const tree = timer.toJSON();
    expect(tree).toMatchSnapshot();
  })
})
