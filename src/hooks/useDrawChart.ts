import { useEffect, useRef } from "react";


export interface Gradient {
    gradient: Array<number>
    colors: Array<string>
}



export function useDrawChart() { 
    const canvasRef = useRef<HTMLCanvasElement | null >(null);
    const context = useRef<CanvasRenderingContext2D | null>(null);
    
    let imageData: ImageData | null = null;

    
    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            context.current = canvas.getContext('2d');
        }
    }, []);



        //stroke style
        const setStrokeStyle = (strokeStyle = "#ffffff", lineWidth = 1, pattern: Array<number> = [], gradient?: Gradient) => {
            if (context.current) {
                context.current.lineWidth = lineWidth;
                if (pattern.length > 0) context.current.setLineDash(pattern);
                if (gradient) {
                    const grd = context.current.createLinearGradient(gradient.gradient[0], gradient.gradient[1], gradient.gradient[2], gradient.gradient[3]);
                    gradient.colors.forEach((color: string, i: number) => {
                        grd.addColorStop(i, color);
                    })
                    context.current.strokeStyle = grd;
                } else context.current.strokeStyle = strokeStyle;
            }
    }
    

     //fill style
        const setFillStyle = (fillStyle = "#ffffff") => {
        if (context.current) {
            context.current.fillStyle = fillStyle
        }
    }
    
    const drawTicks = (radius: number, xCenter: number, yCenter: number, fromAngle = 0, toAngle = 180, degree = 6, height = radius) => {

        if (context.current) {
            context.current.save()
            context.current.translate(xCenter, yCenter);
            context.current.rotate(-fromAngle * (Math.PI / 180))

            const amount = (toAngle - fromAngle) / degree

            for (let i = 0; i < amount; i++) {//Draw amount tick marks
                context.current.beginPath();
                context.current.moveTo(radius, 0);
                context.current.lineTo(radius - height, 0);
                context.current.stroke();
                context.current.rotate(-degree * (Math.PI / 180));
                context.current.closePath();
            }

            context.current.restore();
        }

    }


    const drawCircle = (radius: number, xCenter: number, yCenter: number, startAngle = 0, endAngle = 180) => {
        if (context.current) {
            context.current.moveTo(xCenter, yCenter);
            context.current.beginPath();
            context.current.arc(xCenter, yCenter, radius, (Math.PI / 180) * startAngle, (Math.PI / 180) * endAngle);
            context.current.stroke();
            context.current.closePath();
        }

    }

    const drawLine = (xCenter: number, yCenter: number, startAngle = 0, length = 10) => {
        if (context.current) {
            context.current.save()
            context.current.translate(xCenter, yCenter);
            context.current.rotate(-startAngle * (Math.PI / 180))

            context.current.beginPath();
            context.current.moveTo(length, 0);
            context.current.lineTo(0, 0);
            context.current.stroke();
            context.current.closePath();
            context.current.restore()
        }

    }

    const drawPie = (radius: number, xCenter: number, yCenter: number, startAngle = 0, endAngle = 180) => {
        if (context.current) {
            context.current.beginPath();
            context.current.moveTo(xCenter, yCenter);
            context.current.arc(xCenter, yCenter, radius, startAngle * (Math.PI / 180), endAngle * (Math.PI / 180));
            context.current.lineTo(xCenter, yCenter);
            context.current.stroke();
            context.current.closePath();
        }
    }

    const fill = () => context.current?.fill()


    const saveState =() => {
        if (context.current) {
            if (canvasRef?.current) {
                imageData = context.current.getImageData(0,0,canvasRef.current.width,canvasRef.current.height);
            }
        }
    }

    const clear = () => {
        if (context.current) {
            if (canvasRef?.current) { 
                context.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            }
        }
    }



    const restoreState =() => {
        if (context.current && imageData) {
            context.current.putImageData(imageData, 0, 0);
        }
    }

    return { drawTicks, drawLine, drawCircle, drawPie, fill, clear,   saveState, restoreState, setStrokeStyle, setFillStyle, canvasRef }

    

}