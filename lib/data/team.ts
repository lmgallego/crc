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
      en: [
        'Cycling Research Center began in the early 2000s as a near-utopian idea that finally came to life in 2024 thanks to Mikel and a group of people who joined him along the way — all with active scientific careers, all driven by a deep passion for cycling. From the age of 12, Mikel was hooked on cycling in every form, racing throughout his youth — primarily in MTB, where he competed at international level.',
        'His curiosity about the inner workings of sport led him to a teaching degree in Physical Education and later to a Bachelor in Physical Education and Sports Sciences at the University of Granada. He defended a multidisciplinary doctoral thesis after a research stay with Dr. Iñigo Mujika at Athletic Club de Bilbao and a postdoc with Dr. Ernst Albin Hansen at Manchester Metropolitan University under Dr. Greg Atkinson. In 2018 he completed an additional research stay at MIT and Boston University.',
        'He has authored more than 100 scientific articles. He is associate editor of the Cycling section of Frontiers (Journal of Cycling Science) and a board member of the World Commission of Science Cycling. In 2012, alongside Dr. Greg Atkinson, he published the Athlete 2.0 paradigm in the Journal of Science and Cycling. In 2025 he published the new Cycling 1.0, 2.0, 3.0 paradigm.',
        'Full Professor at the University of Granada. He served as Performance Director of Movistar Team for 10 years and has been a long-time collaborator with the Royal Spanish Cycling Federation, where he held the roles of Technical Director and MTB National Coach. In 2023 he received the badge of the Spanish Olympic Committee. He brings 25 years of work with international athletes, coaching world, Olympic and Tour champions across multiple cycling disciplines.',
      ],
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
      en: [
        'He started cycling at a very early age, sparking a deep passion that led him to engage with the sport not only as a rider but also as a coach. He went on to study Physical Activity and Sport Sciences, deepening his expertise through a PhD and a postdoctoral fellowship both focused on cycling.',
        'Throughout his career he has worked with cyclists at every level, from beginners to WorldTour professionals, across multiple disciplines. His work centres on optimising athlete performance through an integrated approach that combines sport science and strategic planning.',
        'He currently has a decade of experience coaching the Spanish BMX Racing National Team. He remains active as a personal coach, working primarily with WorldTour professionals. His research focuses on physiology and performance, as well as training methodologies and strategies.',
      ],
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
      en: [
        'Daniel Sanabria holds a Psychology degree from UNED. After an initial stay at the University of Granada, he completed his PhD in Experimental Psychology at the University of Oxford (UK) in 2007. He then carried out a 2-year Marie Curie postdoctoral fellowship at the International School for Advanced Studies (Italy).',
        'Since 2009 he has held several academic positions at the University of Granada, where he is currently Full Professor. His research centres on human cognition — primarily attention, time perception, cognitive control, multisensory integration, physical exercise and sleep — as well as everyday activities such as cycling, badminton, racket sports and sport in general.',
        'He is a member of the HUM379 research group, which has produced over 350 JCR-indexed papers in journals such as Cerebral Cortex, Trends in Cognitive Sciences, Sports Medicine, Cognition and NeuroImage. Daniel has authored more than 130 JCR papers. He is Deputy Academic Director of the Mind, Brain and Behaviour Research Centre (CIMCYC-UGR).',
      ],
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
      en: [
        'PhD from the University of Granada in Sport Sciences, with a strong academic track record dedicated to the study of physical performance, sports nutrition and body composition in high-intensity sports. He is Associate Professor in the Department of Physical Education and Sport at the Faculty of Sport Sciences of the University of Granada.',
        'His research career is largely centred on cycling. He has studied the anthropometric and body composition profiles of professional cyclists and their evolution over time. Another core area is sports nutrition, where he has developed applied research on how nutrition affects athlete performance, recovery and health.',
      ],
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
      es: 'Profesor Ayudante Doctor en UMH Elche. Investigador en rendimiento ciclista. 50+ publicaciones científicas.',
      en: 'Assistant Professor at UMH Elche. Researcher in cycling performance. 50+ scientific publications.',
    },
    bioParagraphs: {
      es: [
        'Alejandro Javaloyes es Doctor en Ciencias de la Actividad Física y del Deporte y Máster en Rendimiento Deportivo y Salud por la Universidad Miguel Hernández de Elche.',
        'Actualmente ejerce como Profesor Ayudante Doctor en la Universidad Miguel Hernández de Elche. Fue Técnico de Rendimiento en la Real Federación Española de Ciclismo (2017-2024). Es miembro del grupo de investigación en Actividad Física y Saludable (GIAFIS) y autor de más de 50 artículos científicos sobre ciclismo, entrenamiento y actividad física. Ha entrenado a múltiples ciclistas amateurs y profesionales.',
      ],
      en: [
        'Alejandro Javaloyes holds a PhD in Physical Activity and Sport Sciences and a Master in Sport Performance and Health from Universidad Miguel Hernández de Elche.',
        'He currently serves as Assistant Professor at Universidad Miguel Hernández de Elche. He was Performance Technician at the Royal Spanish Cycling Federation (2017-2024). He is a member of the GIAFIS research group on Physical Activity and Health, and author of more than 50 scientific articles on cycling, training and physical activity. He has coached multiple amateur and professional cyclists.',
      ],
    },
    highlights: [
      { label: 'Posición', value: 'Profesor Ayudante Doctor UMH Elche' },
      { label: 'Trayectoria', value: 'Técnico Rendimiento RFEC (2017-2024)' },
      { label: 'Formación', value: 'PhD CCAFD · MSc UMH' },
      { label: 'Grupo', value: 'GIAFIS' },
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
      es: 'Doble doctorado (UGR/Loughborough + Jaén/Nottingham). Nutrición, actividad física y antropometría ISAK.',
      en: 'Dual PhD (UGR/Loughborough + Jaén/Nottingham). Nutrition, physical activity and ISAK anthropometry.',
    },
    bioParagraphs: {
      es: [
        'José Joaquín Muros es Doctor en Nutrición y Actividad Física por la Universidad de Granada y la Universidad de Loughborough, y Doctor en Ciencias de la Educación por la Universidad de Jaén y la Universidad de Nottingham. Cuenta además con un Máster en Nutrición Humana, una Licenciatura en Ciencias de la Actividad Física y del Deporte, un Grado en Nutrición Humana y Dietética y un Diplomado en Ciencias de la Educación.',
        'Es miembro del grupo de investigación HUM1063 "Rendimiento Deportivo y Ciclismo" y antropometrista Nivel II por la Sociedad Internacional para el Avance de la Cineantropometría (ISAK). Es autor de diversos artículos científicos sobre ciclismo, triatlón y nutrición. Es Director Deportivo de Ciclismo Nivel III y Entrenador Nacional de Natación Nivel III, y docente del Programa de Formación y Tecnificación de la RFEC.',
      ],
      en: [
        'José Joaquín Muros holds a PhD in Nutrition and Physical Activity from the University of Granada and Loughborough University, and a PhD in Education Sciences from the University of Jaén and the University of Nottingham. He also holds a Master in Human Nutrition, a degree in Physical Activity and Sport Sciences, a degree in Human Nutrition and Dietetics, and a diploma in Education Sciences.',
        'He is a member of the HUM1063 "Sport Performance and Cycling" research group and an ISAK Level II anthropometrist (International Society for the Advancement of Kinanthropometry). He is the author of several scientific articles on cycling, triathlon and nutrition. He is a Level III Sport Director in Cycling and a Level III National Swimming Coach, and teaches in the Spanish Cycling Federation\'s Tecnificación training programme.',
      ],
    },
    highlights: [
      { label: 'Formación', value: 'Doble PhD (UGR/Loughborough + Jaén/Nottingham)' },
      { label: 'Especialidad', value: 'Nutrición · ISAK Lvl II' },
      { label: 'Grupo', value: 'HUM1063' },
      { label: 'Cargos federativos', value: 'Dir. Deportivo Ciclismo III · Entrenador Natación III' },
      { label: 'Docencia', value: 'Programa Tecnificación RFEC' },
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
        'Juan José Pérez Díaz es docente e investigador en la Facultad de Ciencias del Deporte de la Universidad de Granada, donde imparte las asignaturas de Especialización, Perfeccionamiento y Fundamentos del Ciclismo. Es doctorando en Ciencias del Deporte por la Universidad de Granada, con la tesis "Experiencia subjetiva en el esfuerzo máximo en ciclismo" en fase de defensa.',
        'Cuenta con un Máster en Alto Rendimiento Deportivo: Fuerza y Acondicionamiento Físico y un Máster en Dirección y Gestión de Entidades Deportivas, ambos por la UCAM. Es Director Deportivo Nivel III por la Real Federación Española de Ciclismo y Certified Strength and Conditioning Specialist (NSCA-CSCS). Es miembro del grupo de investigación HUM1063 "Rendimiento Deportivo y Ciclismo" y autor de múltiples artículos científicos sobre ciclismo. Ha sido Director Deportivo de la estructura junior del Valverde Team (2021), técnico de rendimiento y entrenador de la Selección Murciana de Ciclismo, y Director Deportivo del equipo Brócoli Mecánico Sakata-Lorca. Colabora como técnico de rendimiento en concentraciones con la RFEC.',
      ],
      en: [
        'Juan José Pérez Díaz is a lecturer and researcher at the Faculty of Sport Sciences of the University of Granada, where he teaches the cycling courses Specialisation, Refinement and Fundamentals. He is a PhD candidate in Sport Sciences at the University of Granada, with a thesis titled "Subjective experience of maximal effort in cycling" currently in the defence phase.',
        'He holds a Master in High Performance Sport: Strength and Conditioning, and a Master in Sport Entity Management, both from UCAM. He is a Level III Sport Director with the Royal Spanish Cycling Federation and a Certified Strength and Conditioning Specialist (NSCA-CSCS). He is a member of the HUM1063 "Sport Performance and Cycling" research group and author of multiple scientific articles on cycling. He has served as Sport Director for the Valverde Team junior structure (2021), as performance technician and coach for the Murcia Regional Cycling Team, and as Sport Director for the Brócoli Mecánico Sakata-Lorca team. He collaborates as a performance technician at training camps with the RFEC.',
      ],
    },
    highlights: [
      { label: 'Formación', value: 'MSc UCAM (×2) · PhD activo UGR' },
      { label: 'Certificación', value: 'NSCA-CSCS · Director Deportivo III RFEC' },
      { label: 'Línea', value: 'Esfuerzo máximo en ciclismo' },
      { label: 'Trayectoria', value: 'Valverde Team junior · Sel. Murciana' },
      { label: 'Grupo', value: 'HUM1063' },
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
      en: [
        'Alejandro De Rozas Pacheco graduated in Physical Activity and Sport Sciences from Universidad Europea de Madrid in 2020 and earned his Master in Sport Training and Performance from the University of Granada in 2021, where he currently collaborates with the HUM727 research group: Sport Training and Physical Performance.',
        'He became an ISAK Level 2 certified anthropometrist in 2022. He worked as coach, anthropometrist and head of functional testing and sport performance at Sportiness Wellness in Estepona from 2018 to 2024. He is one of the lead researchers of the Talent Promotion Programme of the Spanish High Council for Sports (CSD). He has collaborated with the Royal Spanish Cycling Federation and has been involved in international research with the Cycling Research Center since its inception. His doctoral thesis focuses on durability in cycling.',
      ],
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
        'Xabier Zabala es estudiante del Grado en Ciencias de la Actividad Física y del Deporte por la Universidad de Granada. Cuenta además con el Grado Superior en Acondicionamiento Físico (TSAF) y el Grado Medio en Sistemas Microinformáticos y Redes.',
        'Como ciclista de carretera, ha competido en categoría Sub23 con el equipo Caja Rural-Alea (2023-2025), donde fue 3º en el Campeonato de Navarra CRI 2024. En categoría Junior fue Campeón de Navarra 2021 y miembro del Equipo Nacional para la Copa de Naciones y el Campeonato de Europa 2021, así como en la Copa de Naciones de Morbihan y la París-Roubaix Junior 2022. En categorías inferiores acumuló títulos como Campeón de los Juegos de Navarra Ruta y Crono Cadete 2020 y Campeón de España Infantil 2018. Como junior researcher en el Cycling Research Center, trabaja en la aplicación de la inteligencia artificial generativa al ciclismo.',
      ],
      en: [
        'Xabier Zabala is an undergraduate student in Physical Activity and Sport Sciences at the University of Granada. He also holds a Higher Vocational Diploma in Physical Conditioning (TSAF) and an Intermediate Vocational Diploma in Microcomputer Systems and Networks.',
        'As a road cyclist, he has competed in the U23 category with the Caja Rural-Alea team (2023-2025), finishing 3rd at the Navarra Time Trial Championship 2024. In the Junior category he was Navarra Champion 2021 and a member of the National Team for the Nations Cup and the European Championship 2021, as well as for the Morbihan Nations Cup and the Paris-Roubaix Juniors 2022. In lower categories he accumulated titles such as Cadet Navarra Games Champion 2020 (Road and Time Trial) and Spanish Under-14 Champion 2018. As a junior researcher at the Cycling Research Center, he works on the application of generative artificial intelligence to cycling.',
      ],
    },
    highlights: [
      { label: 'Trayectoria Deport.', value: 'Sub23 Caja Rural-Alea (2023-2025)' },
      { label: 'Palmarés Junior', value: 'Campeón Navarra 2021 · Equipo Nacional' },
      { label: 'Formación', value: 'TSAF · Estudiante Grado CAFD UGR' },
      { label: 'Especialidad', value: 'IA generativa en ciclismo' },
      { label: 'Rol CRC', value: 'Junior researcher' },
    ],
    career: [],
  },
  {
    slug: 'ignacio-valdivia',
    number: 10,
    role: 'phd-candidate',
    name: 'Ignacio',
    surname: 'Valdivia',
    // Word note: degree shown as BSc in Word header but he is also PhD candidate UGR per bullets.
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
        'Ignacio Valdivia es Graduado en Ciencias de la Actividad Física y del Deporte por la Universidad de Granada y doctorando en Ciencias del Deporte por la misma universidad. Cursa actualmente el Máster en Alimentación para la Actividad Física y el Deporte por la UOC. Es miembro del grupo de investigación HUM1063 "Rendimiento Deportivo y Ciclismo".',
        'Es Delegado Provincial de la Federación Andaluza de Ciclismo en Granada, Técnico de la FAC en Granada y Jaén, Técnico de la Selección Andaluza de Ciclismo y Director Deportivo Nivel III de ciclismo. Entrena a ciclistas en edad de formación (Cadete, Junior y Sub-23). Como ciclista de XCO de nivel nacional ha logrado, entre otros resultados, 1º en el Campeonato de Andalucía XCO Sub23 (2023), 10º en la Copa de España XCO Sub23 (2022) y 11º en el Campeonato de España XCO Junior (2021).',
      ],
      en: [
        'Ignacio Valdivia holds a degree in Physical Activity and Sport Sciences from the University of Granada and is a PhD candidate in Sport Sciences at the same university. He is currently completing a Master in Nutrition for Physical Activity and Sport at UOC. He is a member of the HUM1063 "Sport Performance and Cycling" research group.',
        'He is Provincial Delegate of the Andalusian Cycling Federation in Granada, technician for the FAC in Granada and Jaén, technician for the Andalusian Cycling National Team and a Level III Sport Director in cycling. He coaches development-age cyclists (Cadet, Junior and Under-23). As a national-level XCO rider his results include 1st place at the Andalusian XCO Championship U23 (2023), 10th at the Spanish XCO Cup U23 (2022) and 11th at the Spanish XCO Championship Junior (2021).',
      ],
    },
    highlights: [
      { label: 'Formación', value: 'Grado CAFD UGR · PhD activo' },
      { label: 'Palmarés XCO', value: '1º Cto. Andalucía Sub23 (2023) · 10º Copa España Sub23 (2022)' },
      { label: 'Federación', value: 'Delegado Provincial FAC Granada' },
      { label: 'Cargo', value: 'Director Deportivo Nivel III' },
      { label: 'Grupo', value: 'HUM1063' },
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
      en: [
        'Luisma Gallego holds a degree in Multi-platform Application Development and a Professional Certification in Physical Conditioning — an unusual combination that lets him operate simultaneously on the technical and the sport side of performance analysis. His passion for cycling led him early on to apply programming tools to the study of training, building experience both as a rider and as a developer of technical solutions for coaches and athletes.',
        'He specialises in Python applied to cycling data analysis: ingestion and processing of power files, training load models, durability analysis and the construction of data pipelines for coaches and platforms. He is also an expert in AI-driven process automation, designing flows that connect analysis tools, report generation and athlete communication without manual intervention.',
        'He is part of the technical staff at Intervals.icu, one of the leading international platforms for cycling training analysis. He also teaches AI applied to performance at Intervals.icu, training coaches in the advanced use of the platform combined with AI tools: how to interpret power data with model assistance, how to automate plan generation and how to build workflows in which AI operates as the coach\'s copilot.',
        'His specific AI training comes from the NTT DATA Talent Pool in Data Science and Machine Learning, where he went deep into industry methodologies — large-scale data processing, experimental validation, model deployment — and translated that knowledge into the sport context. He also holds Microsoft certifications in enterprise Artificial Intelligence, completing in 2025 the badges for Adapting AI to the organisation, Adopting responsible AI practices and principles, Creating business value from business intelligence and Leveraging AI tools and resources for the enterprise.',
        'At the Cycling Research Center he leads the development of internal performance-analysis applications and AI-driven process automation, complementing Xabier Zabala\'s generative AI work with a focus closer to classic machine learning, automation and the construction of bespoke tools. Luisma combines engineering rigour with first-hand sport knowledge — which lets him build solutions coaches and athletes can actually integrate into their daily routine.',
      ],
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
