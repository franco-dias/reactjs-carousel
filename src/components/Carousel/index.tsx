import React, { useCallback, useEffect, useRef, useState } from "react";
import { images, TIMEOUT_MS, baseWindowState, getActiveIndex } from "./utils";
import { Image, ImageContainer } from "./style";
import { CarouselProps, WindowState } from "./types";

function Carousel({ initialIndex = 0 }: CarouselProps) {
	const adjustmentDebounce = useRef<{ index: number | undefined }>({ index: undefined });
	const containerRef = useRef<HTMLDivElement>(null);
	const [activeIndex, setActiveIndex] = useState(initialIndex);
	const [isDragging, setIsDragging] = useState(false);
	const [initialWindowState, setInitialWindowState] = useState<WindowState>(baseWindowState);  

	const cleanup = useCallback(() => {
		if(!containerRef.current) return;
		containerRef.current.style.cursor = 'grab';
		containerRef.current.style.removeProperty('user-select');
		setIsDragging(false);
	}, []);

	useEffect(() => {
		document.addEventListener('mouseout', cleanup);
		return () => document.removeEventListener('mouseout', cleanup);
	}, [cleanup]);

	const handleMouseDown = useCallback((ev: React.MouseEvent<HTMLDivElement>) => {
		setIsDragging(true);
		setInitialWindowState({
			left: ev.currentTarget.scrollLeft,
			x: ev.clientX,
		})

		if(!containerRef.current) return;

		containerRef.current.style.cursor = 'grabbing';
		containerRef.current.style.userSelect = 'none';
	}, []);

	const handleMouseMove = useCallback((ev: React.MouseEvent<HTMLDivElement>) => {
		if(!isDragging) return;
		const { left, x } = initialWindowState;

		const diff = ev.clientX - x;

		if (!containerRef.current) return;

		containerRef.current.scrollLeft = left - diff;
		
		clearTimeout(adjustmentDebounce.current.index);
		adjustmentDebounce.current.index = setTimeout(() => {
			const nextActiveIndex = getActiveIndex(containerRef.current);
			if (nextActiveIndex !== undefined) {
				setActiveIndex(nextActiveIndex);
			}
		}, TIMEOUT_MS);

	}, [initialWindowState, isDragging]);

	const handleMouseUp = useCallback(() => {
		if (!isDragging) return;
		cleanup();
	}, [cleanup, isDragging]);

	return (
    <ImageContainer
			ref={containerRef}
			onMouseDown={handleMouseDown}
			onMouseMove={handleMouseMove}
			onMouseUp={handleMouseUp}
		>
      {images.map((image, idx) => (
        <Image isActive={activeIndex === idx} key={image.desktopUrl}>
					<img src={image.desktopUrl} alt="carousel img" />
				</Image>
      ))}
    </ImageContainer>
  );
}

export default Carousel;
