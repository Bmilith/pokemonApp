import { TeamPokemon, charizard, pikachu } from '@/assets';

export const heroSliderContent = [
  { id: 1, image: pikachu },
  { id: 2, image: charizard },
  { id: 3, image: TeamPokemon },
];

export const heroSliderSettings = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 800,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplaySpeed: 4000,
  cssEase: 'ease-in-out',
  pauseOnHover: false,
  pauseOnFocus: true,
};
