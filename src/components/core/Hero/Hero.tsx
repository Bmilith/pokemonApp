import { useTranslation } from 'react-i18next';
import Slider from 'react-slick';
import { HeroSlideItem } from './HeroSlideItem';
import {
  heroSliderContent,
  heroSliderSettings,
} from '@/constants/heroSliderConstants';

export const Hero = () => {
  const { t } = useTranslation();

  return (
    <div className="p-[1rem] pt-0 cursor-grab">
      <div
        style={{
          backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0kbGMqXtr0gb7bxeK6k7ZxU9oY8vcz307Rg&s')`,
        }}
        className="overflow-hidden rounded-3xl min-h-[550px] sm:min-h-[650px] bg-gradient-to-r from-gray-300/80  to-gray-100 dark:from-gray-900 dark:to-gray-800 dark:text-white"
      >
        <div className="p-[2rem] pb-8 sm:pb-0">
          <Slider {...heroSliderSettings}>
            {heroSliderContent.map((slide, index) => (
              <HeroSlideItem
                key={slide.id}
                index={index}
                title={t(`heroSlider.slides.${slide.id}.title`)}
                title2={t(`heroSlider.slides.${slide.id}.title2`)}
                description={t(`heroSlider.slides.${slide.id}.description`)}
                image={slide.image}
              />
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};
