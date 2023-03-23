import { useEffect } from "react";
import "./App.css";
import { Canvas } from "./canvas/Canvas";
import useWindowSize from "./hooks/useWindowSize";

function App() {
	// const size = useWindowSize()

	const windowSize = useWindowSize();
	const onWindowResize = () => {
		// 1. get width/height of the container
		// 2. set width/height to state
	};

	useEffect(() => {
		window.addEventListener("resize", onWindowResize);

		return () => {
			window.removeEventListener("resize", onWindowResize);
		};
	});

	return (
		<div className='App'>
			<Canvas width={500} height={500} innerCircles={4} ></Canvas>
			<div>
				{" "}
				{windowSize.width}px / {windowSize.height}px
			</div>
		</div>
	);
}

export default App;
