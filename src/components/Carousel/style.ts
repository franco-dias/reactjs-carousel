import styled, { css } from "styled-components";

const ImageContainer = styled.div`
  display: flex;
	position: fixed;
	width: 100vw;
	height: 100%;
	background-color: #000;
	overflow: auto;
	gap: 48px;
	align-items: flex-end;
	padding-left: 12.5vw;
	padding-right: 12.5vw;
	cursor: grab;
	&::-webkit-scrollbar {
  	display: none;
	}
	-ms-overflow-style: none;
	scrollbar-width: none;
`;

interface ImageProps {
	isActive: boolean;
}

const Image = styled.div<ImageProps>`
	min-width: 62.5vw;

	${({ isActive }) => isActive && css`
		min-width: 75vw;
	`}

	img {
		pointer-events: none;
		object-fit: contain;
		width: 100%;
		max-height: 100vh;
	}


	transition: all 0.3s ease;
`;

export { Image, ImageContainer };
