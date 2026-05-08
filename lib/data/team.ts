export type TeamRole =
  | 'director'
  | 'deputy-director'
  | 'senior-researcher'
  | 'researcher'
  | 'phd-candidate'
  | 'junior';

export type Highlight = {
  label: string;
  value: string;
};

export type CareerItem = {
  startYear: number;
  endYear?: number | 'present';
  rangeLabel?: string;
  title: string;
  org: string;
  honor?: string;
};

export type TeamMember = {
  slug: string;
  number: number;
  role: TeamRole;
  name: string;
  surname: string;
  degree: 'PhD' | 'MSc' | 'BSc' | 'HND' | '';
  specialty: { es: string; en: string };
  short: { es: string; en: string };
  bioParagraphs: { es: string[]; en: string[] };
  highlights: Highlight[];
  career: CareerItem[];
  email?: string;
  orcid?: string;
  scholar?: string;
  researchgate?: string;
};

export const TEAM: TeamMember[] = [
  {
    slug: 'mikel-zabala',
    number: 1,
    role: 'director',
    name: 'Mikel',
    surname: 'Zabala',
    degree: 'PhD',
    specialty: {
      es: 'Rendimiento y paradigmas del ciclismo',
      en: 'Performance & cycling paradigms',
    },
    short: {
      es: 'Catedrático en la Universidad de Granada. Co-autor del paradigma Athlete 2.0 (2012) y autor del Cycling 3.0 (2025). Director de Rendimiento del Movistar Team durante una década.',
      en: 'Full Professor at the University of Granada. Co-author of the Athlete 2.0 paradigm (2012) and author of Cycling 3.0 (2025). Movistar Team Performance Director for a decade.',
    },
    bioParagraphs: {
      es: [
        'Cycling Research Center fue desde la primera década de los 2000 una idea utópica que finalmente vio la luz en 2024 gracias al esfuerzo de Mikel y de un grupo de gente que se ha ido sumando junto a él, todas con un perfil científico en activo, pero con la peculiaridad de la pasión por el ciclismo. Mikel desde sus 12 años fue un apasionado del ciclismo en todas sus formas, lo que le llevó a competir desde su infancia y juventud, fundamentalmente en MTB, donde llegó a competir hasta nivel internacional.',
        'La afición por la lectura del fenómeno deportivo le llevaría a estudiar Magisterio en Educación Física y posteriormente la Licenciatura en Educación Física y Deportes en la Universidad de Granada. Defendió una tesis doctoral multidisciplinar tras una estancia con el Dr. Iñigo Mujika en el Athletic Club de Bilbao y un postdoc con el Dr. Ernst Albin Hansen en Manchester Metropolitan University bajo la batuta del Dr. Greg Atkinson. En 2018 realizó otra estancia en el MIT y la Boston University.',
        'Ha publicado más de 100 artículos científicos. Es editor responsable de la sección de Ciclismo de Frontiers (Journal of Cycling Science) y miembro de la junta directiva de la World Commission of Science Cycling. En 2012 publicó junto con el Dr. Greg Atkinson el paradigma Athlete 2.0 en el Journal of Science and Cycling. En 2025 publicó el nuevo paradigma Cycling 1.0, 2.0, 3.0.',
        'Catedrático de Universidad en la Universidad de Granada. Fue Director de Rendimiento del Movistar Team durante 10 años, además de colaborador frecuente con la Real Federación Española de Ciclismo, llegando a ser Director Técnico y Seleccionador Nacional MTB. En 2023 fue galardonado con la insignia del Comité Olímpico Español. Lleva 25 años trabajando con muchos deportistas internacionales, entrenando campeones del mundo, JJOO y Tour en distintas modalidades.',
      ],
      en: [],
    },
    highlights: [
      { label: 'Cátedra', value: 'Univ. Granada · Director CEIO' },
      { label: 'UCI WorldTour', value: 'Movistar Team (2013—2020)' },
      { label: 'RFEC', value: 'Director Técnico · Seleccionador' },
      { label: 'Publicaciones', value: '100+ papers · Editor Cycling Science' },
      { label: 'Formación', value: 'PhD UGR · Liverpool · MIT' },
      { label: 'Reconocimientos', value: 'Insignia COE (2023)' },
    ],
    career: [],
    email: 'mikel@crc.org',
  },
  {
    slug: 'manuel-mateo-march',
    number: 2,
    role: 'deputy-director',
    name: 'Manuel',
    surname: 'Mateo-March',
    degree: 'PhD',
    specialty: {
      es: 'Fisiología y metodología del entrenamiento',
      en: 'Physiology & training methodology',
    },
    short: {
      es: 'Director Adjunto del CRC. Selección española de BMX. Coach de profesionales internacionales del WorldTour.',
      en: 'CRC Deputy Director. Spanish BMX National Team. Coach to WorldTour international pros.',
    },
    bioParagraphs: {
      es: [
        'Inició su contacto con el ciclismo a una edad temprana, lo que despertó en él una profunda pasión que lo llevó a involucrarse activamente en este deporte, no sólo como practicante, sino también como entrenador. Posteriormente decidió formarse en Ciencias de la Actividad Física y el Deporte, ámbito en el que profundizó sus conocimientos al cursar un Doctorado y un Postdoctorado especializados en el ámbito del ciclismo.',
        'A lo largo de su carrera ha trabajado con una gran variedad de ciclistas, desde principiantes hasta profesionales del World Tour, abarcando distintas disciplinas. Su trabajo se ha centrado en optimizar el rendimiento de los atletas mediante un enfoque integral que combina la ciencia del deporte y la planificación estratégica.',
        'Actualmente cuenta con una década de experiencia como entrenador de la selección española de BMX racing. Además sigue activo como entrenador personal, atendiendo principalmente a profesionales del World Tour. Su investigación se centra en aspectos de fisiología y rendimiento, así como en metodologías y estrategias de entrenamiento.',
      ],
      en: [],
    },
    highlights: [
      { label: 'Rol', value: 'Director Adjunto CRC' },
      { label: 'Experiencia', value: '10+ años Sel. Esp. BMX Racing' },
      { label: 'Actividad', value: 'Coach UCI WorldTour' },
      { label: 'Formación', value: 'PhD + Postdoc en ciclismo' },
      { label: 'Línea', value: 'Fisiología y metodología' },
    ],
    career: [],
  },
  {
    slug: 'daniel-sanabria',
    number: 3,
    role: 'senior-researcher',
    name: 'Daniel',
    surname: 'Sanabria',
    degree: 'PhD',
    specialty: {
      es: 'Neurociencia cognitiva del rendimiento',
      en: 'Cognitive neuroscience of performance',
    },
    short: {
      es: 'Catedrático UGR. Neurociencia cognitiva del rendimiento. PhD por la University of Oxford.',
      en: 'Full Professor at UGR. Cognitive neuroscience of performance. PhD from the University of Oxford.',
    },
    bioParagraphs: {
      es: [
        'Daniel Sanabria es licenciado en Psicología por la UNED. Tras una estancia inicial en la Universidad de Granada, completó su doctorado en Psicología Experimental en la Universidad de Oxford (UK) en 2007. Posteriormente realizó una estancia postdoctoral Marie Curie de 2 años en el International School for Advanced Studies (Italia).',
        'Desde 2009 ocupa diferentes puestos académicos en la Universidad de Granada, donde actualmente es Catedrático de Universidad. Su investigación se centra en la cognición humana, principalmente en la atención, percepción del tiempo, control cognitivo, integración multisensorial, ejercicio físico, sueño, así como una serie de actividades de la vida cotidiana como el ciclismo, el bádminton, los deportes de raqueta y el deporte en general.',
        'Es miembro del grupo de investigación HUM379, que ha producido más de 350 artículos JCR en revistas como Cerebral Cortex, Trends in Cognitive Sciences, Sports Medicine, Cognition o NeuroImage. Daniel ha publicado más de 130 artículos JCR. Es Director Académico Adjunto del Centro de Investigación, Mente, Cerebro y Comportamiento (CIMCYC-UGR).',
      ],
      en: [],
    },
    highlights: [
      { label: 'Posición', value: 'Catedrático UGR' },
      { label: 'Línea', value: 'Neurociencia cognitiva' },
      { label: 'Formación', value: 'PhD Oxford · Marie Curie' },
      { label: 'Publicaciones', value: '130+ artículos JCR' },
      { label: 'Grupo', value: 'HUM379 (350+ papers)' },
      { label: 'Afición', value: 'Bádminton (campeón Andalucía)' },
    ],
    career: [],
  },
  {
    slug: 'cristobal-sanchez-munoz',
    number: 4,
    role: 'senior-researcher',
    name: 'Cristóbal',
    surname: 'Sánchez-Muñoz',
    degree: 'PhD',
    specialty: {
      es: 'Antropometría y nutrición deportiva',
      en: 'Anthropometry & sports nutrition',
    },
    short: {
      es: 'Profesor titular UGR. Nutrición y composición corporal en deportes de resistencia.',
      en: 'Associate Professor at UGR. Nutrition and body composition in endurance sports.',
    },
    bioParagraphs: {
      es: [
        'Doctor por la Universidad de Granada en el ámbito de las Ciencias del Deporte, con una sólida trayectoria académica dedicada al estudio del rendimiento físico, la nutrición deportiva y la composición corporal en deportes de alta intensidad. Es Profesor Titular del Departamento de Educación Física y Deportiva en la Facultad de Ciencias del Deporte de la Universidad de Granada.',
        'Su carrera investigadora gira en gran medida en torno al ciclismo. Ha estudiado las características antropométricas y de composición corporal de los ciclistas profesionales, así como su evolución a lo largo del tiempo. Otro de sus campos de especialización es la nutrición deportiva, área en la que ha desarrollado investigaciones aplicadas a cómo la alimentación afecta el rendimiento, la recuperación y la salud de los deportistas.',
      ],
      en: [],
    },
    highlights: [
      { label: 'Posición', value: 'Profesor titular UGR' },
      { label: 'Línea', value: 'Antropometría · ISAK' },
      { label: 'Especialidad', value: 'Nutrición deportiva' },
      { label: 'Formación', value: 'PhD UGR (ciclismo)' },
      { label: 'Área', value: 'Composición corporal' },
    ],
    career: [],
  },
  {
    slug: 'alejandro-javaloyes',
    number: 5,
    role: 'researcher',
    name: 'Alejandro',
    surname: 'Javaloyes',
    degree: 'PhD',
    specialty: {
      es: 'Fisiología y rendimiento ciclista',
      en: 'Physiology & cycling performance',
    },
    short: {
      es: 'Profesor UMH Elche. Director de Rendimiento de INEOS Grenadiers. 50+ publicaciones científicas.',
      en: 'Lecturer at UMH Elche. Performance Director at INEOS Grenadiers. 50+ scientific publications.',
    },
    bioParagraphs: {
      es: [
        'Alejandro Javaloyes Torres (Cox, 1989) es Licenciado en Ciencias de la Actividad Física y el Deporte por la Universidad Miguel Hernández de Elche, donde también realizó el Máster en Rendimiento Deportivo y se Doctoró en el campo de la Fisiología y el Entrenamiento aplicado al ciclismo.',
        'Actualmente ejerce como profesor en el Departamento de Educación Física y Deportiva de la Universidad Miguel Hernández y es responsable del Laboratorio de Análisis del Rendimiento Físico. Cuenta con más de 50 publicaciones científicas en revistas indexadas centradas en el ámbito del ciclismo y el rendimiento deportivo. Ha trabajado durante más de 15 años como entrenador de equipos profesionales de ciclismo, con experiencia tanto a nivel europeo como en la World Tour. Actualmente es Director de Rendimiento del INEOS Grenadiers.',
      ],
      en: [],
    },
    highlights: [
      { label: 'Posición', value: 'Profesor UMH Elche' },
      { label: 'Rol Actual', value: 'Director Rendimiento INEOS' },
      { label: 'Formación', value: 'PhD Fisiología/Entrenamiento' },
      { label: 'Experiencia', value: '15+ años entrenador prof.' },
      { label: 'Publicaciones', value: '50+ artículos científicos' },
    ],
    career: [],
  },
  {
    slug: 'jose-joaquin-muros',
    number: 6,
    role: 'researcher',
    name: 'José Joaquín',
    surname: 'Muros',
    degree: 'PhD',
    specialty: {
      es: 'Nutrición humana y antropometría',
      en: 'Human nutrition & anthropometry',
    },
    short: {
      es: 'Doble doctorado (UGR + UPM). Nutrición, actividad física y antropometría ISAK.',
      en: 'Dual PhD (UGR + UPM). Nutrition, physical activity and ISAK anthropometry.',
    },
    bioParagraphs: {
      es: [
        'José Joaquín Muros (Granada, 6 de marzo de 1986) es Doctor en Nutrición Humana por la Universidad de Granada y Doctor en Ciencias del Deporte por la Universidad Politécnica de Madrid. Cursó sus estudios universitarios en la UGR, donde también obtuvo el grado de Profesor de Educación Física.',
        'Es miembro del grupo de investigación HUM1063 y antropometrista nivel 4 ISAK. Su pasión por el ciclismo le motivó a realizar un Doctorado en Ciencias del Deporte por la UPM, mediante una estancia de investigación en la Universidad de Zúrich, en el cual analizó los patrones de actividad física e ingesta nutricional de ciclistas profesionales del Movistar Team. Sus líneas de investigación se centran en la nutrición, la actividad física y la antropometría. Ha publicado más de 50 artículos en revistas científicas.',
      ],
      en: [],
    },
    highlights: [
      { label: 'Formación', value: 'Doble PhD (UGR + UPM)' },
      { label: 'Especialidad', value: 'Nutrición · ISAK Lvl 4' },
      { label: 'Grupo', value: 'HUM1063' },
      { label: 'Estancias', value: 'París (Pierre&Marie Curie) · Zúrich' },
      { label: 'Tesis Doctoral', value: 'Movistar Team data' },
    ],
    career: [],
  },
  {
    slug: 'juan-jose-perez-diaz',
    number: 7,
    role: 'phd-candidate',
    name: 'Juan José',
    surname: 'Pérez Díaz',
    degree: 'MSc',
    specialty: {
      es: 'Esfuerzo máximo en ciclismo',
      en: 'Maximal effort in cycling',
    },
    short: {
      es: 'Docente UGR. NSCA-CSCS. Doctorando en esfuerzo máximo en ciclismo.',
      en: 'UGR lecturer. NSCA-CSCS. PhD candidate on maximal effort in cycling.',
    },
    bioParagraphs: {
      es: [
        'Juan José Pérez Díaz (Granada, 6 de abril de 1996) es Graduado en Ciencias de la Actividad Física y el Deporte por la Universidad de Granada. Concluida su licenciatura, fue contratado por la Diputación de Granada en 2018 y 2019 para diferentes proyectos de actividad física, deporte y eventos en bicicleta.',
        'Tras esto regresó a la UGR, donde obtuvo el Máster en Investigación e Innovación Curricular y Ciencias de la Actividad Física y donde es actualmente doctorando en el ámbito del ciclismo, donde estudia el esfuerzo máximo y todas las variables que en él influyen. Es Coach certificado por la Federación Andaluza de Ciclismo y Especialista en Fuerza y Acondicionamiento Físico (NSCA-CSCS). Ha trabajado con el Movistar Team a través de un convenio en el ámbito de la nutrición e impacto de las cargas en el rendimiento.',
      ],
      en: [],
    },
    highlights: [
      { label: 'Formación', value: 'MSc UGR (PhD activo)' },
      { label: 'Certificación', value: 'NSCA-CSCS · FAC Coach' },
      { label: 'Línea', value: 'Esfuerzo máximo en ciclismo' },
      { label: 'Colaboración', value: 'Movistar Team (nutrición)' },
      { label: 'Otras Hazañas', value: 'Final mundial OCR 2024' },
    ],
    career: [],
  },
  {
    slug: 'alejandro-de-rozas',
    number: 8,
    role: 'phd-candidate',
    name: 'Alejandro',
    surname: 'de Rozas',
    degree: 'MSc',
    specialty: {
      es: 'Durabilidad en ciclismo',
      en: 'Durability in cycling',
    },
    short: {
      es: 'Investigador del CSD. Doctorando en durabilidad en ciclismo. ISAK Nivel 2.',
      en: 'CSD researcher. PhD candidate on durability in cycling. ISAK Level 2.',
    },
    bioParagraphs: {
      es: [
        'Alejandro De Rozas Pacheco es Graduado en Ciencias de la Actividad Física y del Deporte por la Universidad Europea de Madrid en 2020 y obtuvo su Máster en Entrenamiento y Rendimiento Deportivo por la Universidad de Granada en 2021, donde colabora actualmente con el grupo de investigación HUM727: Entrenamiento Deportivo y Rendimiento Físico.',
        'Es certificado nivel 2 de antropometría por ISAK en 2022. Ha trabajado como entrenador, antropometrista y responsable de pruebas funcionales y rendimiento deportivo en Sportiness Wellness en Estepona desde 2018 hasta 2024. Es uno de los principales investigadores del Programa de Promoción de Talentos del Consejo Superior de Deportes (CSD). Ha colaborado con la Real Federación Española de Ciclismo y participa en investigaciones internacionales con el Cycling Research Center desde sus inicios. Su tesis doctoral tiene como línea principal la durabilidad en el ciclismo.',
      ],
      en: [],
    },
    highlights: [
      { label: 'Formación', value: 'MSc UGR · PhD activo' },
      { label: 'Línea Tesis', value: 'Durabilidad en ciclismo' },
      { label: 'Grupo', value: 'HUM727' },
      { label: 'Certificación', value: 'ISAK Nivel 2' },
      { label: 'Colaboración', value: 'CSD · RFEC' },
      { label: 'Publicaciones', value: '3 papers Q1 (2024-25)' },
    ],
    career: [],
  },
  {
    slug: 'xabier-zabala',
    number: 9,
    role: 'junior',
    name: 'Xabier',
    surname: 'Zabala',
    degree: 'HND',
    specialty: {
      es: 'IA generativa aplicada al ciclismo',
      en: 'Generative AI applied to cycling',
    },
    short: {
      es: 'Ex-Sub23 Caja Rural. Especialista en IA generativa aplicada al ciclismo.',
      en: 'Former U23 at Caja Rural. Specialist in generative AI applied to cycling.',
    },
    bioParagraphs: {
      es: [
        'Xabier Zabala Buendía (Granada, 13 de junio de 2002) es Técnico Superior en Acondicionamiento Físico, y graduado en Ciencias de la Actividad Física y del Deporte por la Universidad de Granada, especializado en Rendimiento Deportivo y Salud.',
        'Su pasión por el ciclismo comienza desde los 6 años, llegando a ser ciclista en los equipos Sub23 Caja Rural Cycling Team y Lizarte, encadenando una larga lista de éxitos a nivel nacional e internacional. Es junior researcher en el Cycling Research Center, donde está impulsando la implantación de la IA generativa en distintos ámbitos relacionados con el ciclismo a nivel internacional. Combina la base biofísica del rendimiento con un enfoque innovador en inteligencia artificial generativa aplicada a la optimización del entrenamiento y análisis del rendimiento ciclista.',
      ],
      en: [],
    },
    highlights: [
      { label: 'Trayectoria Deport.', value: 'Sub23 Caja Rural · Lizarte' },
      { label: 'Formación', value: 'HND + Grado CAFD UGR' },
      { label: 'Especialidad', value: 'IA generativa en ciclismo' },
      { label: 'Rol CRC', value: 'Junior researcher' },
      { label: 'Inicio Ciclismo', value: '6 años de edad' },
    ],
    career: [],
  },
  {
    slug: 'ignacio-valdivia',
    number: 10,
    role: 'phd-candidate',
    name: 'Ignacio',
    surname: 'Valdivia',
    degree: 'BSc',
    specialty: {
      es: 'XCO y dirección deportiva',
      en: 'XCO & sport direction',
    },
    short: {
      es: 'Ciclista nacional XCO División de Honor III. Federación Andaluza de Ciclismo.',
      en: 'National XCO rider, Honour Division III. Andalusian Cycling Federation.',
    },
    bioParagraphs: {
      es: [
        'Ignacio Valdivia Linde (Granada, 19 de noviembre de 2003) obtuvo el Grado en Ciencias del Deporte por la Universidad de Granada en 2025. Su pasión por el ciclismo se vio reflejada en su afán por mejorar su rendimiento ciclista en la modalidad de XCO, ya entrenado por Mikel Zabala, llegando a competir como ciclista del Team Cycling Research a nivel nacional en División de Honor III desde 2023.',
        'En 2024 se incorporó como entrenador a la Federación Andaluza de Ciclismo en distintos proyectos relacionados con la formación, conferencias y eventos deportivos relacionados con el ciclismo. Tras finalizar su grado universitario, se incorpora como uno de los junior researchers del CRC, sumando esfuerzos por su nivel y compromiso. Combina su pasión y conocimiento por el ciclismo con sus tareas en el rol de la dirección deportiva en distintas modalidades del ciclismo de la Federación Andaluza.',
      ],
      en: [],
    },
    highlights: [
      { label: 'Formación', value: 'BSc CCD UGR (2025)' },
      { label: 'Ciclismo', value: 'Top 50 nacional XCO · DH III' },
      { label: 'Equipo', value: 'Team Cycling Research' },
      { label: 'Federación', value: 'Federación Andaluza Ciclismo' },
      { label: 'Entrenador', value: 'Mikel Zabala' },
    ],
    career: [],
  },
  {
    slug: 'luisma-gallego',
    number: 11,
    role: 'junior',
    name: 'Luisma',
    surname: 'Gallego',
    degree: '',
    specialty: {
      es: 'IA aplicada · Docente Intervals.icu',
      en: 'AI applied · Intervals.icu instructor',
    },
    short: {
      es: 'Docente de IA aplicada al rendimiento en Intervals.icu. Python, ML y automatización de procesos con IA.',
      en: 'AI applied to performance instructor at Intervals.icu. Python, ML and AI process automation.',
    },
    bioParagraphs: {
      es: [
        'Luisma Gallego tiene un Grado en Desarrollo de Aplicaciones Multiplataforma y posee la Certificación Profesional en Preparación Física, una combinación poco habitual que le permite operar simultáneamente en el lado técnico y en el lado deportivo del análisis del rendimiento. Su pasión por el ciclismo le llevó desde muy pronto a aplicar herramientas de programación al estudio del entrenamiento, encadenando experiencia tanto como practicante como en el desarrollo de soluciones técnicas para entrenadores y atletas.',
        'Está especializado en Python aplicado al análisis de datos del ciclismo: ingesta y procesamiento de archivos de potencia, modelos de carga, análisis de durabilidad y construcción de pipelines de datos para entrenadores y plataformas. Es además experto en automatización de procesos con inteligencia artificial, ámbito en el que diseña flujos que conectan herramientas de análisis, generación de informes y comunicación con el atleta sin intervención manual.',
        'Forma parte del staff técnico de Intervals.icu, una de las plataformas de referencia internacional para el análisis de entrenamiento ciclista. Es además docente de IA aplicada al rendimiento en Intervals.icu, formando a entrenadores en el uso avanzado de la plataforma combinada con herramientas de inteligencia artificial: cómo interpretar datos de potencia con asistencia de modelos, cómo automatizar la generación de planes y cómo construir flujos de trabajo en los que la IA opera como copiloto del entrenador.',
        'Su formación específica en IA proviene del Talent Pool de NTT DATA en Ciencia de Datos y Machine Learning, donde profundizó en metodologías de la industria —procesamiento de datos a escala, validación experimental, despliegue de modelos— y trasladó este conocimiento al contexto deportivo. Cuenta además con certificaciones de Microsoft en Inteligencia Artificial empresarial, completando en 2025 los distintivos de Adaptación de la IA a la organización, Adopción de las prácticas y los principios de inteligencia artificial responsables, Creación de valor empresarial a partir de la inteligencia empresarial y Aprovechamiento de las herramientas y los recursos de inteligencia artificial para la empresa.',
        'En el Cycling Research Center lidera el desarrollo de aplicaciones internas de análisis del rendimiento y la automatización de procesos con IA, complementando el trabajo de IA generativa de Xabier Zabala con un enfoque más cercano al machine learning clásico, la automatización y la construcción de herramientas a medida. Luisma combina rigor de ingeniería con conocimiento deportivo de primera mano, aspecto que le permite construir soluciones que entrenadores y atletas pueden integrar realmente en su día a día.',
      ],
      en: [],
    },
    highlights: [
      { label: 'Formación', value: 'Grado en Desarrollo de Aplicaciones Multiplataforma' },
      { label: 'Preparación Física', value: 'Certificación Profesional' },
      { label: 'Intervals.icu', value: 'Staff técnico · Docente IA' },
      { label: 'Talent Pool', value: 'NTT DATA — Data Science & ML' },
      { label: 'Certificación IA', value: 'Microsoft — 4 distintivos 2025' },
      { label: 'Rol CRC', value: 'Aplicaciones · Automatización IA' },
    ],
    career: [],
  },
];

export const JUNIOR_GROUP_ORDER = ['luisma-gallego', 'xabier-zabala'];

export const FOUNDER = TEAM[0];
export const TEAM_REST = TEAM.slice(1);

export const FOUNDER_HIGHLIGHTS = TEAM[0].highlights;

export const ROLE_ORDER: TeamRole[] = [
  'deputy-director',
  'senior-researcher',
  'researcher',
  'phd-candidate',
  'junior',
];

export function groupByRole(members: TeamMember[]) {
  const map = new Map<TeamRole, TeamMember[]>();
  for (const role of ROLE_ORDER) map.set(role, []);
  for (const m of members) {
    if (m.role === 'director') continue;
    map.get(m.role)?.push(m);
  }
  // Force explicit ordering for the junior group.
  const junior = map.get('junior');
  if (junior) {
    junior.sort(
      (a, b) =>
        JUNIOR_GROUP_ORDER.indexOf(a.slug) - JUNIOR_GROUP_ORDER.indexOf(b.slug),
    );
  }
  return Array.from(map.entries())
    .filter(([, members]) => members.length > 0);
}

export function findMember(slug: string) {
  return TEAM.find((m) => m.slug === slug);
}

const ROLE_TO_KEY: Record<TeamRole, string> = {
  director: 'director',
  'deputy-director': 'deputyDirector',
  'senior-researcher': 'seniorResearcher',
  researcher: 'researcher',
  'phd-candidate': 'phdCandidate',
  junior: 'junior',
};

export function roleI18nKey(role: TeamRole) {
  return ROLE_TO_KEY[role];
}
