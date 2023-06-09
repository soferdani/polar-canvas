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
    const shipDirectionAngle: null | number = null;

    const canvasRef = useRef<HTMLCanvasElement>(null); // why ?
    const [radiusMin, radiusMax] = [38, 218]; 
    // const innerCircles = 5 // temporary
    const chartDrawer = useRef(useDrawChart());
    const innerCirclesFraction = radiusMax / innerCircles;
    const degreeScale = 10; // can get it from props


      // //set thetas and values for inner degree scales
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


    // the value of the distance scale
    const distances = Array.from({ length: innerCircles - 1 }, (v, i) => { 
        let distanceBetweenCircles = (radiusMax / innerCircles) - 34.5; // 34.5 is temp value until data from api
        return Math.round(distanceBetweenCircles * (i + 1)) 
    })
    

    const mappedDistances = distances.map((distance) => {
        return <span key={"polar-map-distance-" + distance}>{distance}NM</span>;
    });


    const outerDegrees = useCallback(() => {
        return degreeScaleValues.map((value, index) => { 
            const posx = Math.round((pxRadius) * Math.cos(degreeScaleThetas[index])) + "px";
            const posy = Math.round((pxRadius) * Math.sin(degreeScaleThetas[index])) + "px";
            
            const left = width / 2;
            const top = height / 2;

            const topPos = top - (value === 0 ? 7 : value === 180 ? 6 : 7 )  - parseInt(posy.slice(0, -2)) + "px";
            const leftPos = left - (value < 10 ? 3 : value < 100 ? 4 : 4) - (value > 200 ? 9 : 1)  + parseInt(posx.slice(0, -2)) + "px";
        

            return (
                <span
                    key={"polar-map-inner-degree-" + value}
                    className="degree-scale-inner-value"
                    style={{ top: topPos, left: leftPos }}
                >
                    {value}
                </span>
            )
        })
    },[degreeScaleThetas,degreeScaleValues])


    // start drawing
    useEffect(() => {
        chartDrawer.current.clear();
        chartDrawer.current.setStrokeStyle(Colors.StrokeBlue, 1, [0, 0]);
         // Draw the outer circle
        
        chartDrawer.current.drawCircle(   
            pxRadius - 10, // radius
            pxCenter.y,
            250,
            0,
            360
        )
        // Draw the inner circles
        chartDrawer.current.setStrokeStyle(Colors.StrokeBlue, 1, [2, 10]);
        for (let i = 1; i <= innerCircles-1; i++) { 
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
            <div
                className="distance-scales"
                style={{padding: `113.5px`}}
            >
                
                <div
                    className="values-top"
                    style={{gap: 41}}
                >
                    {mappedDistances}
                </div>
            </div>
        <div className="degree-scales">
            <div className="inner-scales"></div>
            <div className="outer-scales">{outerDegrees()}</div>
        </div>
    </>
    )
}