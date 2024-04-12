import { useMemo, useState } from 'react';
import ImageSlide from 'lux/components/EmployerConstructor/widgets/GalleryWidget/components/ImageSlide';
import { jsx as _jsx } from "react/jsx-runtime";
export const SLIDE_TYPE_IMAGE = 'SLIDE_TYPE_IMAGE';
export const SLIDE_TYPE_LOAD_AREA = 'SLIDE_TYPE_LOAD_AREA';
export default (pictures => {
  const [activeSlide, setActiveSlide] = useState(1);
  const pictureSlides = useMemo(() => pictures.map(({
    src,
    id
  }) => ({
    id: `${SLIDE_TYPE_IMAGE}_${id}`,
    content: /*#__PURE__*/_jsx(ImageSlide, {
      src: src
    })
  })), [pictures]);
  return [pictureSlides, activeSlide, setActiveSlide];
});