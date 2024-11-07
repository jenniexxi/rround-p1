import { ReactNode } from 'react';

import { Navigation, Pagination } from 'swiper/modules';
import { SwiperProps, SwiperSlide } from 'swiper/react';

import * as S from './SwiperCarousel.style';

type Props = SwiperProps & {
  children?: ReactNode[];
  isPaination?: boolean;
  slideClick?: () => void;
  slideNavi?: boolean;
};

const SwiperCarousel = ({ children, isPaination = true, slideClick, slideNavi = false, ...props }: Props) => {
  return (
    <S.SwiperContainer>
      <S.CustomSwiper
        modules={[Pagination, Navigation]}
        pagination={{ enabled: isPaination, clickable: true }}
        navigation={{ enabled: slideNavi }}
        {...props}
      >
        {Array.isArray(children)
          ? children.map((child, index) => (
              <SwiperSlide
                key={index}
                onClick={slideClick}
              >
                {child}
              </SwiperSlide>
            ))
          : children}
      </S.CustomSwiper>
    </S.SwiperContainer>
  );
};

export default SwiperCarousel;
