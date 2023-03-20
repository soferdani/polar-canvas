import { useCallback, useEffect, useRef, useState } from "react";
import { useDrawChart } from "../hooks/useDrawChart";
import { Colors } from "../styles/Colors";
import './Canvas.scss'

const POLAR_MAP_PX_RADIUS = 248; // isnt radius need to be dynamic ?

export type PolarDiagramProps = {
    width: number;
    height: number;
    innerCircles: number;
};


export function Canvas({width, height, innerCircles}: PolarDiagramProps) { // add number of rings + get raduis in px 
    const [pxRadius] = useState(POLAR_MAP_PX_RADIUS);
    const [pxCenter] = useState({ x: width / 2, y: height / 2 })
      // //helper values to draw degrees around the radar
    const [degreeScaleThetas, setDegreeScaleThetas] = useState([] as Array<number>);
    const [degreeScaleValues, setDegreeScaleValues] = useState([] as Array<number>);
    


    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [radiusMin, radiusMax] = [38, 218]; 
    // const innerCircles = 5 // temporary
    const chartDrawer = useRef(useDrawChart());
    const innerCirclesFraction = radiusMax / innerCircles;
    const degreeScale = 10; // can get it from props

    useEffect(() => {
        let innerThetas = [];
        let values = [];
        for (let i = 0; i < 360; i += degreeScale) {
            innerThetas[i] = i * (-Math.PI / 180);
        } 
        for (let i = 0; i < 360; i += degreeScale) {
            values[i] = (90 + i) % 360;
        }

        setDegreeScaleThetas(innerThetas);
        setDegreeScaleValues(values);
    },[degreeScale])




    const outerDegrees = useCallback(() => {
        return degreeScaleValues.map((value, index) => { 

        })
    },[degreeScaleThetas,degreeScaleValues])


    // start drawing
    useEffect(() => {
        chartDrawer.current.clear();
        chartDrawer.current.setStrokeStyle(Colors.StrokeBlue, 1, [2, 10]);
         // Draw the outer circle
        
        chartDrawer.current.drawCircle(   
            pxRadius - 10, // radius
            pxCenter.y,
            250,
            0,
            360
        )
        // Draw the inner circles
        // chartDrawer.current.setStrokeStyle(Colors.StrokeBlue, 1, [2, 10]);
        for (let i = 1; i <= innerCircles; i++) { 
            chartDrawer.current.drawCircle(   
                (pxRadius - 10) - (i * innerCirclesFraction), // radius
                pxCenter.y,
                250,
                0,
                360
            )
        }
    });


    return (
    <>
        <canvas
            ref={chartDrawer.current.canvasRef}
            className="canvas"
            height={height}
            width={width}
        ></canvas>
        <div className="degree-scales">
            <div className="inner-scales"></div>
            <div className="outer-scales"></div>
        </div>
    </>
    )
}