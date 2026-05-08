export type TeamMember = {
  slug: string;
  number: string;
  role: { es: string; en: string };
  firstName: string;
  lastName: string;
  degree: 'PhD' | 'MSc' | 'BSc' | 'HND';
  short: { es: string; en: string };
};

export const TEAM: TeamMember[] = [
  {
    slug: 'mikel-zabala',
    number: '001',
    role: { es: 'Director', en: 'Director' },
    firstName: 'Mikel',
    lastName: 'Zabala',
    degree: 'PhD',
    short: {
      es: 'Catedrático en la Universidad de Granada. Co-autor del paradigma Athlete 2.0 (2012) y autor del Cycling 3.0 (2025). Director de Rendimiento del Movistar Team durante una década.',
      en: 'Full Professor at the University of Granada. Co-author of the Athlete 2.0 paradigm (2012) and author of Cycling 3.0 (2025). Movistar Team Performance Director for a decade.',
    },
  },
  {
    slug: 'manuel-mateo-march',
    number: '002',
    role: { es: 'Director Adjunto', en: 'Deputy Director' },
    firstName: 'Manuel',
    lastName: 'Mateo-March',
    degree: 'PhD',
    short: {
      es: 'Selección española de BMX. Coach de profesionales internacionales del WorldTour.',
      en: 'Spanish BMX National Team. Coach to WorldTour international pros.',
    },
  },
  {
    slug: 'daniel-sanabria',
    number: '003',
    role: { es: 'Senior Researcher', en: 'Senior Researcher' },
    firstName: 'Daniel',
    lastName: 'Sanabria',
    degree: 'PhD',
    short: {
      es: 'Catedrático UGR. Neurociencia cognitiva del rendimiento. PhD por la University of Oxford.',
      en: 'Full Professor at UGR. Cognitive neuroscience of performance. PhD from the University of Oxford.',
    },
  },
  {
    slug: 'cristobal-sanchez-munoz',
    number: '004',
    role: { es: 'Senior Researcher', en: 'Senior Researcher' },
    firstName: 'Cristóbal',
    lastName: 'Sánchez-Muñoz',
    degree: 'PhD',
    short: {
      es: 'Profesor titular UGR. Nutrición y composición corporal en deportes de resistencia.',
      en: 'Associate Professor at UGR. Nutrition and body composition in endurance sports.',
    },
  },
  {
    slug: 'alejandro-javaloyes',
    number: '005',
    role: { es: 'Researcher', en: 'Researcher' },
    firstName: 'Alejandro',
    lastName: 'Javaloyes',
    degree: 'PhD',
    short: {
      es: 'Profesor UMH Elche. Director de Rendimiento de INEOS Grenadiers. 50+ publicaciones.',
      en: 'Lecturer at UMH Elche. Performance Director at INEOS Grenadiers. 50+ publications.',
    },
  },
  {
    slug: 'jose-joaquin-muros',
    number: '006',
    role: { es: 'Researcher', en: 'Researcher' },
    firstName: 'José Joaquín',
    lastName: 'Muros',
    degree: 'PhD',
    short: {
      es: 'Doble doctorado (UGR + UPM). Nutrición, actividad física y antropometría ISAK.',
      en: 'Dual PhD (UGR + UPM). Nutrition, physical activity and ISAK anthropometry.',
    },
  },
  {
    slug: 'juan-jose-perez-diaz',
    number: '007',
    role: { es: 'PhD Candidate', en: 'PhD Candidate' },
    firstName: 'Juan José',
    lastName: 'Pérez Díaz',
    degree: 'MSc',
    short: {
      es: 'Docente UGR. NSCA-CSCS. Doctorando en esfuerzo máximo en ciclismo.',
      en: 'UGR lecturer. NSCA-CSCS. PhD candidate on maximal effort in cycling.',
    },
  },
  {
    slug: 'alejandro-de-rozas',
    number: '008',
    role: { es: 'PhD Candidate', en: 'PhD Candidate' },
    firstName: 'Alejandro',
    lastName: 'de Rozas',
    degree: 'MSc',
    short: {
      es: 'Investigador del CSD. Doctorando en durabilidad en ciclismo. ISAK Nivel 2.',
      en: 'CSD researcher. PhD candidate on durability in cycling. ISAK Level 2.',
    },
  },
  {
    slug: 'xabier-zabala',
    number: '009',
    role: { es: 'Junior · IA & Ciclismo', en: 'Junior · AI & Cycling' },
    firstName: 'Xabier',
    lastName: 'Zabala',
    degree: 'HND',
    short: {
      es: 'Ex-Sub23 Caja Rural. Especialista en IA generativa aplicada al ciclismo.',
      en: 'Former U23 at Caja Rural. Specialist in generative AI applied to cycling.',
    },
  },
  {
    slug: 'ignacio-valdivia',
    number: '010',
    role: { es: 'PhD Candidate', en: 'PhD Candidate' },
    firstName: 'Ignacio',
    lastName: 'Valdivia',
    degree: 'BSc',
    short: {
      es: 'Ciclista nacional XCO División de Honor III. Federación Andaluza de Ciclismo.',
      en: 'National XCO rider, Honour Division III. Andalusian Cycling Federation.',
    },
  },
];

export const FOUNDER = TEAM[0];
export const TEAM_REST = TEAM.slice(1);

export const FOUNDER_HIGHLIGHTS: { label: { es: string; en: string }; value: string }[] = [
  { label: { es: 'Cátedra', en: 'Chair' }, value: 'Univ. Granada · Director CEIO' },
  { label: { es: 'UCI WorldTour', en: 'UCI WorldTour' }, value: 'Movistar Team (2013—2020)' },
  { label: { es: 'RFEC', en: 'RFEC' }, value: 'Director Técnico · Seleccionador' },
  { label: { es: 'Publicaciones', en: 'Publications' }, value: '100+ papers · Editor Cycling Science' },
  { label: { es: 'Formación', en: 'Education' }, value: 'PhD UGR · Liverpool · MIT' },
  { label: { es: 'Reconocimientos', en: 'Recognitions' }, value: 'Insignia COE (2023)' },
];
