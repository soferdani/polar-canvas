// OPTION 1
// import { useEffect, useState } from 'react';

// interface WindowSize {
//     width: number
//     height: number
// }

// export function useWindowSize() {
//     const [windowSize, setWindowSize] = useState<WindowSize>({
//         width: 0,
//         height: 0
//     });

//     const handleSize = () => {
//         setWindowSize({
//             width: window.innerWidth,
//             height: window.innerHeight,
//         })
//     }
//     window.addEventListener('resize', handleSize);
//     return windowSize
// }

//OPTION 2

import { useLayoutEffect, useState } from "react";

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

    const handleSize = () => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight
        });
    };

    useLayoutEffect(() => {
        handleSize();
        window.addEventListener("resize", handleSize);
        return () => window.removeEventListener("resize", handleSize);
    }, []);

    return windowSize;
};

export default useWindowSize;
