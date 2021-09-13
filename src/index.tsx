import * as React from "react";
import { render } from "react-dom";

import "./globals.scss";

import App from "~/main/App";
import VideoScroller from "./main/VideoScroller";

render(<VideoScroller />, document.getElementById("root"));
