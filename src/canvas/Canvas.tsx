import { useEffect, useRef, useState } from "react";
import { useDrawChart } from "../hooks/useDrawChart";
import { Colors } from "../styles/Colors";
import './Canvas.css'

const POLAR_MAP_PX_RADIUS = 248;

export type PolarDiagramProps = {
  width: number;
  height: number;
};


export function Canvas({width, height}: PolarDiagramProps) { // add number of rings + get raduis in px 
    const [pxRadius] = useState(POLAR_MAP_PX_RADIUS);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [radiusMin, radiusMax] = [38, 218];

    const innerCircles = 5 // temporary

    const chartDrawer = useRef(useDrawChart());

    useEffect(() => {
        // let canvas = canvasRef.current;
        // let context = canvas?.getContext('2d');
        // context?.beginPath();
        // // context?.arc(50, 50, 50, 0, 2 * Math.PI);
        // // context?.setStrokeStyle(23,33,44);
        // context?.fillRect(25, 25, 100, 100);
        // context?.clearRect(45, 45, 60, 60);
        // context?.strokeRect(50, 50, 50, 50);
        chartDrawer.current.clear();
        chartDrawer.current.setStrokeStyle(Colors.StrokeBlue, 1, [0, 0]);



    });


    return (
        <canvas
            ref={chartDrawer.current.canvasRef}
            className="canvas"
            height={height}
            width={width}
        ></canvas>
    )
}