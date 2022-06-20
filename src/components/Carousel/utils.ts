export const images = [
  {
    mobileUrl:
      "https://via.placeholder.com/1280x960",
    desktopUrl:
      "https://via.placeholder.com/1280x960",
    onClick: () => console.log("clicked #1"),
  },
  {
    mobileUrl:
      "https://via.placeholder.com/800x600",
    desktopUrl:
      "https://via.placeholder.com/800x600",
    onClick: () => console.log("clicked #1"),
  },
  {
    mobileUrl:
      "https://via.placeholder.com/1024x768",
    desktopUrl:
      "https://via.placeholder.com/1024x768",
    onClick: () => console.log("clicked #1"),
  },
  {
    mobileUrl:
      "https://via.placeholder.com/960x720",
    desktopUrl:
      "https://via.placeholder.com/960x720",
    onClick: () => console.log("clicked #1"),
  },
];

export const baseWindowState = {
	left: 0,
	x: 0,
};

export const TIMEOUT_MS = 150;

export const getReverseIndex = (index: number, arrLength: number) => arrLength - index - 1;
export const half = (num: number) => num/2;

export const getActiveIndex = (container: HTMLDivElement | null) => {
  if(!container) return;

  let index = undefined;
  const childNodes = container.childNodes;

  Array
  .from(childNodes || [])
  .reverse()
  .find((item, idx) => {
    const { offsetLeft, clientWidth } = item as HTMLDivElement;
    const elementMiddle = offsetLeft + half(clientWidth);
    const containerEnd = container.clientWidth + container.scrollLeft;
    if(containerEnd > elementMiddle) {
      index = getReverseIndex(idx, childNodes.length);
      return true;
    }
    return false;
  });

  return index;
}