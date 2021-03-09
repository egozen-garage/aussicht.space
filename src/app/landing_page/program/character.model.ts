export const characterAttributesMapping = {
  date: 'Datum',
  time: 'Zeitraum',
  title_DE: 'DE Titel',
  about_DE: 'DE Bescheibung',
  title_EN: 'EN title',
  about_EN: 'EN description'
};

export interface Character {
  date: string,
  time: string,
  title_DE: string,
  about_DE: string,
  title_EN: string,
  about_EN: string
};