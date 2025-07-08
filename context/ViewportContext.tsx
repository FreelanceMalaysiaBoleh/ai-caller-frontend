import { RootState } from '@/redux/store';
import { updateViewSize, ViewSizes } from '@/redux/viewSlice';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ViewportContext = createContext<string>("large");

const MOBILE = 768;
const TABLET = 1200;

export const useScreenSize = (): ViewSizes => {
    const screenSize = useSelector((state: RootState) => state.view.size);
    return screenSize;
}

export const responsiveValue = (
    size: ViewSizes,
    small: string | number | boolean,
    medium: string | number | boolean,
    large: string | number | boolean
) => {
    switch (size) {
        case "small":
            return small;
        case "medium":
            return medium;
        case "large":
            return large;
    }
}

export const ViewportProvider = ({ children }: { children: React.ReactNode }) => {
    const [width, setWidth] = useState(window.innerWidth);
    const size = useScreenSize();

    console.log(size);
    const dispatch = useDispatch();

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        const handleResize = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                setWidth(window.innerWidth);
            }, 150); // wait 150ms after resize stops
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        console.log(width);
        if (width < MOBILE) {
            dispatch(updateViewSize("small"))
        } else if (width < TABLET) {
            console.log("medium screen")
            dispatch(updateViewSize("medium"))
        } else {
            console.log("large screen")
            dispatch(updateViewSize("large"))
        }
    }, [width])

    console.log(size,)
    return (
        <ViewportContext.Provider value={"large"}>
            {children}
        </ViewportContext.Provider>
    );
};

export const useViewportSize = () => useContext(ViewportContext);