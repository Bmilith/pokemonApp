export const sortOptions = [
  { label: 'Name (Z-A)', value: 'name_desc' },
  { label: 'Name (A-Z)', value: 'name_asc' },
  { label: 'Strongest', value: 'power' },
  { label: 'Speed', value: 'speed_desc' },
  { label: 'Defense', value: 'defense_desc' },
  { label: 'Attack', value: 'attack_desc' },
  { label: 'Newest', value: 'gen_desc' },
];

export enum PokemonSortType {
  NAME_ASC = 'name_asc',
  NAME_DESC = 'name_desc',
  POWER = 'power',
  GEN_ASC = 'gen_asc',
  SPEED_DESC = 'speed_desc',
  DEFENSE_DESC = 'defense_desc',
  ATTACK_DESC = 'attack_desc',
}
