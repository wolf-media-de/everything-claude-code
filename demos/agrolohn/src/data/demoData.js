export const MONTH_LABEL = 'Juni 2025'

export const DRIVERS = [
  { id: 'klaus',  name: 'Klaus Müller',  typ: 'Festangestellt' },
  { id: 'thomas', name: 'Thomas Bauer',  typ: 'Festangestellt' },
  { id: 'maria',  name: 'Maria Huber',   typ: 'Teilzeit' },
]

export const DAY_LABELS = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']

// June 2025: June 1 = Sunday → sits at Mon-Sun column index 6
export const JUNE_WEEKS = [
  [0,  0,  0,  0,  0,  0,  1],
  [2,  3,  4,  5,  6,  7,  8],
  [9,  10, 11, 12, 13, 14, 15],
  [16, 17, 18, 19, 20, 21, 22],
  [23, 24, 25, 26, 27, 28, 29],
  [30, 0,  0,  0,  0,  0,  0],
]

// Initial shift availability per driver (day numbers in June 2025)
export const INITIAL_AVAILABILITY = {
  // Klaus: Mo/Mi/Fr
  klaus:  new Set([2,4,6,9,11,13,16,18,20,23,25,27,30]),
  // Thomas: Di/Do/Sa
  thomas: new Set([3,5,7,10,12,14,17,19,21,24,26,28]),
  // Maria: Sa/So
  maria:  new Set([1,7,8,14,15,21,22,28,29]),
}

// Shift plan summary shown in FahrerView
export const SCHICHT_PLAN = [
  { name: 'Klaus Müller',  tage: 'Mo, Mi, Fr', schicht: 'Frühschicht 06:00 – 14:00' },
  { name: 'Thomas Bauer', tage: 'Di, Do, Sa',  schicht: 'Frühschicht 06:00 – 14:00' },
  { name: 'Maria Huber',  tage: 'Sa, So',      schicht: 'Teilzeit 08:00 – 14:00' },
]
