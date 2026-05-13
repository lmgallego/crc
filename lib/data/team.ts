import type { LocalizedString } from './services';

export type TeamRole =
  | 'director'
  | 'cofounder'
  | 'deputy-director'
  | 'senior-researcher'
  | 'researcher'
  | 'phd-candidate'
  | 'applied-research'
  | 'junior';

export type Highlight = {
  label: LocalizedString;
  value: LocalizedString;
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
  orcidId?: string;
  scholar?: string;
  researchgate?: string;
  photo?: string;
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
      es: 'Catedrático de la Universidad de Granada y Director del CRC. Ex-Director de Rendimiento del Movistar Team (2013-2019) y Head Coach (2020). Editor del libro Cycling Science.',
      en: 'Full Professor at the University of Granada and CRC Director. Former Movistar Team Performance Director (2013-2019) and Head Coach (2020). Editor of the Cycling Science book.',
    },
    bioParagraphs: {
      es: [
        'Editor jefe (Editor-in-Chief) de Journal of Science and Cycling.',
        'Mikel Zabala es Catedrático de la Universidad de Granada, donde imparte el Máster de Ciclismo y el curso de doctorado "Investigación aplicada al Ciclismo". Es Doctor en Ciencias de la Actividad Física y del Deporte por la Universidad de Granada y la Universidad John Moores de Liverpool. Cuenta además con un Máster en Inteligencia Artificial Generativa por el Massachusetts Institute of Technology (MIT) y un Máster en Alto Rendimiento Deportivo por el Comité Olímpico Español y la UPM. Es Director del Centro de Estudios e Investigaciones Olímpico (CEIO) de la UGR y miembro del grupo de investigación HUM1063 "Rendimiento Deportivo y Ciclismo".',
        'Es autor de más de 100 artículos científicos sobre ciclismo y entrenamiento, y editor del libro Cycling Science (Human Kinetics) junto a Stephen Cheung. En 2023 fue distinguido con la Insignia del Comité Olímpico Español en reconocimiento a su trayectoria profesional.',
        'En el ámbito federativo y profesional ha sido Director de Rendimiento del Movistar Cycling Team (2013-2019) y Head Coach del mismo equipo (2020). En la Real Federación Española de Ciclismo ha desempeñado los roles de Entrenador (1999-2004), Seleccionador Nacional de Mountain Bike (2004-2006), Director de Proyectos para la Prevención del Dopaje (2008-2012), Director Técnico (2007-2008) y Seleccionador Nacional Sub-23 de Carretera y de Mountain Bike (2021-2024). Es además Director de Ciclismo UCI World Tour, y ha entrenado a múltiples deportistas profesionales internacionales en ciclismo de carretera, triatlón, mountain bike y motocross, incluyendo Campeones del Mundo y Medallistas Olímpicos.',
        'En su faceta deportiva personal fue piloto de motocross — Campeón de España 80cc en 1987, 3º en el Campeonato de España Junior 250cc en 1990 y clasificado para el Campeonato del Mundo 250cc en 1996, además de múltiples veces Campeón de Navarra y Vasco-Navarro absoluto — y actualmente compite como ciclista de carretera y mountain bike en categoría Máster 50.',
      ],
      en: [
        'Editor-in-Chief of Journal of Science and Cycling.',
        'Mikel Zabala is Full Professor at the University of Granada, where he teaches the Cycling Master programme and the doctoral course "Applied Cycling Research". He holds a PhD in Physical Activity and Sport Sciences from the University of Granada and Liverpool John Moores University. He also holds a Master in Generative Artificial Intelligence from the Massachusetts Institute of Technology (MIT) and a Master in High Performance Sport from the Spanish Olympic Committee and UPM. He is Director of the Olympic Studies and Research Centre (CEIO) at UGR and a member of the HUM1063 "Sport Performance and Cycling" research group.',
        'He is the author of more than 100 scientific articles on cycling and training, and editor of the Cycling Science book (Human Kinetics) together with Stephen Cheung. In 2023 he was awarded the Spanish Olympic Committee Badge in recognition of his professional career.',
        'In the federative and professional arena he served as Performance Director of Movistar Cycling Team (2013-2019) and as Head Coach of the same team (2020). At the Royal Spanish Cycling Federation he has held the roles of Coach (1999-2004), Mountain Bike National Team Manager (2004-2006), Director of Anti-Doping Prevention Projects (2008-2012), Technical Director (2007-2008) and Under-23 Road and Mountain Bike National Team Manager (2021-2024). He is also a UCI World Tour Cycling Director, and has coached multiple international professional athletes across road cycling, triathlon, mountain bike and motocross — including World Champions and Olympic Medallists.',
        'On the personal sporting side he was a motocross rider — Spanish 80cc Champion in 1987, 3rd at the Spanish Junior 250cc Championship in 1990, and qualified for the 250cc World Championship in 1996, as well as multiple-times Navarre and Basque-Navarre overall champion — and he currently competes as a road and mountain bike cyclist in the Master 50 category.',
      ],
    },
    highlights: [
      {
        label: { es: 'Cátedra', en: 'Chair' },
        value: { es: 'Univ. Granada · Director CEIO', en: 'Univ. Granada · CEIO Director' },
      },
      {
        label: { es: 'Formación', en: 'Education' },
        value: {
          es: 'PhD UGR + John Moores Liverpool · MSc IA MIT · MSc COE+UPM',
          en: 'PhD UGR + John Moores Liverpool · MSc AI MIT · MSc COE+UPM',
        },
      },
      {
        label: { es: 'Movistar', en: 'Movistar' },
        value: {
          es: 'Director Rendimiento (2013-2019) · Head Coach (2020)',
          en: 'Performance Director (2013-2019) · Head Coach (2020)',
        },
      },
      {
        label: { es: 'RFEC', en: 'RFEC' },
        value: {
          es: 'Director Técnico · Seleccionador Sub-23 Carretera y MTB',
          en: 'Technical Director · U23 Road & MTB National Team Manager',
        },
      },
      {
        label: { es: 'Publicaciones', en: 'Publications' },
        value: {
          es: '100+ papers · Editor Cycling Science (Human Kinetics)',
          en: '100+ papers · Editor of Cycling Science (Human Kinetics)',
        },
      },
      {
        label: { es: 'Reconocimientos', en: 'Recognition' },
        value: { es: 'Insignia COE (2023)', en: 'COE Badge of Honor (2023)' },
      },
    ],
    career: [],
    email: 'mikel@crc.org',
    orcidId: '0000-0002-8700-0382',
    photo: '/team/mikel-zabala.webp',
  },
  {
    slug: 'manuel-mateo-march',
    number: 2,
    role: 'cofounder',
    name: 'Manuel',
    surname: 'Mateo-March',
    degree: 'PhD',
    specialty: {
      es: 'Entrenamiento ciclista y BMX',
      en: 'Cycling & BMX coaching',
    },
    short: {
      es: 'Doctor en CCAFD y Subdirector del CRC. Entrenador de la Selección Española de BMX en la RFEC y de ciclistas profesionales internacionales.',
      en: 'PhD in Sport Sciences and CRC Deputy Director. Coach of the Spanish BMX National Team at the RFEC and of international professional cyclists.',
    },
    bioParagraphs: {
      es: [
        'Director asociado (Associate Editor) de Journal of Science and Cycling.',
        'Manuel Mateo-March es Doctor en Ciencias de la Actividad Física y del Deporte y cuenta con un Máster en Alto Rendimiento Deportivo. Es profesor del módulo de conducción de grupos en el medio natural en bicicleta de montaña (TCAF) en el instituto La Creueta de Onil, y autor de múltiples artículos científicos sobre ciclismo y entrenamiento.',
        'En el ámbito federativo y profesional es Entrenador de la Selección Española de BMX en la Real Federación Española de Ciclismo y Seleccionador (Team Manager) de BMX de la Federación de Ciclismo de la Comunidad Valenciana. Ha desempeñado tareas de gestión deportiva en el Energy Sistem BMX Team y como Director Deportivo en el Club BMX San Vicente. Es Director de Ciclismo nivel UCI y entrenador de diversos ciclistas profesionales internacionales. En su faceta deportiva personal es ex-piloto de BMX y actualmente compite como ciclista en categoría Máster 30.',
      ],
      en: [
        'Associate Editor of Journal of Science and Cycling.',
        'Manuel Mateo-March holds a PhD in Physical Activity and Sport Sciences and a Master in High Performance Sport. He teaches the module on guiding groups in natural environments by mountain bike (TCAF) at La Creueta high school in Onil, and is the author of multiple scientific articles on cycling and training.',
        'In the federative and professional arena he is Coach of the Spanish BMX National Team at the Royal Spanish Cycling Federation and BMX Team Manager at the Valencian Cycling Federation. He has handled sport management duties at Energy Sistem BMX Team and served as Sport Director at Club BMX San Vicente. He is a UCI-level Cycling Director and coaches several international professional cyclists. On the personal sporting side he is a former BMX rider and currently competes as a cyclist in the Master 30 category.',
      ],
    },
    highlights: [
      {
        label: { es: 'Rol', en: 'Role' },
        value: { es: 'Director Adjunto CRC', en: 'CRC Deputy Director' },
      },
      {
        label: { es: 'Formación', en: 'Education' },
        value: {
          es: 'PhD CCAFD · MSc Alto Rendimiento',
          en: 'PhD Sport Sciences · MSc High Performance Sport',
        },
      },
      {
        label: { es: 'RFEC', en: 'RFEC' },
        value: {
          es: 'Entrenador Selección Española BMX',
          en: 'Spanish BMX National Team Coach',
        },
      },
      {
        label: { es: 'UCI', en: 'UCI' },
        value: { es: 'Director Ciclismo nivel UCI', en: 'UCI-level Cycling Director' },
      },
      {
        label: { es: 'Trayectoria', en: 'Career' },
        value: {
          es: 'Ex-piloto BMX · Ciclista Máster 30',
          en: 'Former BMX rider · Master 30 cyclist',
        },
      },
    ],
    career: [],
    orcidId: '0000-0003-4418-8263',
    photo: '/team/manuel-mateo-march.webp',
  },
  {
    slug: 'daniel-sanabria',
    number: 3,
    role: 'senior-researcher',
    name: 'Daniel',
    surname: 'Sanabria',
    degree: 'PhD',
    specialty: {
      es: 'Neurociencia cognitiva',
      en: 'Cognitive neuroscience',
    },
    short: {
      es: 'Doctor por la Universidad de Oxford y Catedrático de Psicología Experimental en la Universidad de Granada. Dirige el laboratorio Dinámicas cognitivas y afectivas en el CIMCYC. Investiga los mecanismos psicológicos y cerebrales vinculados al rendimiento físico, con énfasis en ciclismo.',
      en: 'PhD from the University of Oxford and Full Professor of Experimental Psychology at the University of Granada. Director of the Cognitive and Affective Dynamics laboratory at CIMCYC. He researches the psychological and brain mechanisms linked to physical performance, with a focus on cycling.',
    },
    bioParagraphs: {
      es: [
        'Daniel Sanabria es Doctor por la Universidad de Oxford (Inglaterra) y Catedrático en el Departamento de Psicología Experimental de la Facultad de Psicología de la Universidad de Granada. Es Director del laboratorio "Dinámicas cognitivas y afectivas" (grupo de investigación "Cerebro y cognición humana") del Centro de Investigación Mente, Cerebro y Comportamiento (CIMCYC) de la Universidad de Granada.',
        'Es autor de numerosas publicaciones internacionales en revistas con proceso de revisión por pares, así como de numerosas contribuciones en congresos nacionales e internacionales en Psicología Experimental, Neurociencia Cognitiva y Ciencias del Deporte. Ha dirigido 6 proyectos de investigación financiados por el Ministerio de Ciencia e Innovación (MICINN), 1 por la Junta de Andalucía y 2 por la Agencia Mundial Antidopaje, estos últimos para estudiar los efectos del Tramadol en el rendimiento en ciclismo. Es experto en el estudio de los mecanismos psicológicos, cognitivos y cerebrales vinculados al rendimiento físico, con un interés particular en el ciclismo. Es ciclista aficionado.',
      ],
      en: [
        'Daniel Sanabria holds a PhD from the University of Oxford (England) and is Full Professor in the Department of Experimental Psychology at the Faculty of Psychology of the University of Granada. He is Director of the "Cognitive and Affective Dynamics" laboratory (within the "Brain and Human Cognition" research group) at the Mind, Brain and Behaviour Research Centre (CIMCYC) of the University of Granada.',
        'He is the author of numerous peer-reviewed international publications and of numerous contributions at national and international conferences in Experimental Psychology, Cognitive Neuroscience and Sport Sciences. He has led 6 research projects funded by the Spanish Ministry of Science and Innovation (MICINN), 1 by the Regional Government of Andalusia, and 2 by the World Anti-Doping Agency — the latter focused on the effects of Tramadol on cycling performance. He is an expert in the study of the psychological, cognitive and brain mechanisms linked to physical performance, with a particular focus on cycling. He is an amateur cyclist.',
      ],
    },
    highlights: [
      {
        label: { es: 'Formación', en: 'Education' },
        value: { es: 'PhD Universidad de Oxford', en: 'PhD University of Oxford' },
      },
      {
        label: { es: 'Posición', en: 'Position' },
        value: {
          es: 'Catedrático UGR · Psicología Experimental',
          en: 'Full Professor UGR · Experimental Psychology',
        },
      },
      {
        label: { es: 'Laboratorio', en: 'Lab' },
        value: {
          es: 'Dinámicas cognitivas y afectivas (CIMCYC)',
          en: 'Cognitive and Affective Dynamics (CIMCYC)',
        },
      },
      {
        label: { es: 'Proyectos', en: 'Projects' },
        value: {
          es: '6 MICINN · 1 J. Andalucía · 2 AMA (Tramadol)',
          en: '6 MICINN · 1 Andalusia Gov. · 2 WADA (Tramadol)',
        },
      },
      {
        label: { es: 'Línea', en: 'Research line' },
        value: {
          es: 'Rendimiento físico · ciclismo',
          en: 'Physical performance · cycling',
        },
      },
    ],
    career: [],
    orcidId: '0000-0002-4164-7607',
    photo: '/team/daniel-sanabria.webp',
  },
  {
    slug: 'cristobal-sanchez-munoz',
    number: 4,
    role: 'senior-researcher',
    name: 'Cristóbal',
    surname: 'Sánchez-Muñoz',
    degree: 'PhD',
    specialty: {
      es: 'Nutrición y composición corporal',
      en: 'Nutrition & body composition',
    },
    short: {
      es: 'Profesor Titular en la Universidad de Granada y Director del grupo HUM1063. Ex-Director Técnico (2013-2024) y Seleccionador Nacional de MTB (2007-2020) en la RFEC. Antropometrista ISAK Nivel II especializado en nutrición y composición corporal.',
      en: 'Associate Professor at the University of Granada and Director of the HUM1063 research group. Former Technical Director (2013-2024) and Mountain Bike National Team Manager (2007-2020) at the RFEC. ISAK Level II anthropometrist specialised in nutrition and body composition.',
    },
    bioParagraphs: {
      es: [
        'Co-editor jefe (Co-Editor-in-Chief) de Journal of Science and Cycling.',
        'Cristóbal Sánchez-Muñoz es Profesor Titular de la Universidad de Granada, donde imparte el Máster en Ciclismo y el curso de doctorado "Investigación en Ciclismo". Es Doctor en Ciencias de la Actividad Física y del Deporte por la Universidad de Granada y cuenta con un Máster en Alto Rendimiento Deportivo por el Comité Olímpico Español y la UPM. Es Director del grupo de investigación HUM1063 "Rendimiento Deportivo y Ciclismo" y Co-Director del Centro de Estudios e Investigaciones Olímpico (CEIO) de la UGR. Es autor de diversos artículos científicos sobre ciclismo, composición corporal y nutrición.',
        'En el ámbito federativo ha sido Entrenador de la Real Federación Española de Ciclismo (2005-2006), Seleccionador Nacional (Team Manager) de Mountain Bike de la RFEC (2007-2020) y Director Técnico de la RFEC (2013-2024). Es Director de Ciclismo Nivel III y Antropometrista Nivel II por la Sociedad Internacional para el Avance de la Cineantropometría (ISAK), y experto en Nutrición y Composición Corporal en el deporte de élite.',
      ],
      en: [
        'Co-Editor-in-Chief of Journal of Science and Cycling.',
        'Cristóbal Sánchez-Muñoz is Associate Professor at the University of Granada, where he teaches the Cycling Master programme and the doctoral course "Cycling Research". He holds a PhD in Physical Activity and Sport Sciences from the University of Granada and a Master in High Performance Sport from the Spanish Olympic Committee and UPM. He is Director of the HUM1063 "Sport Performance and Cycling" research group and Co-Director of the Olympic Studies and Research Centre (CEIO) at UGR. He is the author of several scientific articles on cycling, body composition and nutrition.',
        'In the federative arena he has served as Coach at the Royal Spanish Cycling Federation (2005-2006), Mountain Bike National Team Manager at the RFEC (2007-2020) and Technical Director at the RFEC (2013-2024). He is a Level III Sport Director in Cycling and a Level II anthropometrist with the International Society for the Advancement of Kinanthropometry (ISAK), and an expert in Nutrition and Body Composition in elite sport.',
      ],
    },
    highlights: [
      {
        label: { es: 'Posición', en: 'Position' },
        value: { es: 'Profesor Titular UGR', en: 'Associate Professor UGR' },
      },
      {
        label: { es: 'Formación', en: 'Education' },
        value: {
          es: 'PhD CCAFD · MSc Alto Rendimiento COE+UPM',
          en: 'PhD Sport Sciences · MSc High Performance Sport COE+UPM',
        },
      },
      {
        label: { es: 'Grupos', en: 'Groups' },
        value: {
          es: 'Director HUM1063 · Co-Director CEIO',
          en: 'HUM1063 Director · CEIO Co-Director',
        },
      },
      {
        label: { es: 'RFEC', en: 'RFEC' },
        value: {
          es: 'Director Técnico (2013-2024) · Seleccionador MTB (2007-2020)',
          en: 'Technical Director (2013-2024) · MTB National Team Manager (2007-2020)',
        },
      },
      {
        label: { es: 'Especialidad', en: 'Specialty' },
        value: {
          es: 'ISAK Nivel II · Nutrición élite',
          en: 'ISAK Level II · Elite nutrition',
        },
      },
    ],
    career: [],
    orcidId: '0000-0001-9183-6417',
    photo: '/team/cristobal-sanchez-munoz.webp',
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
      {
        label: { es: 'Posición', en: 'Position' },
        value: {
          es: 'Profesor Ayudante Doctor UMH Elche',
          en: 'Assistant Professor UMH Elche',
        },
      },
      {
        label: { es: 'Trayectoria', en: 'Career' },
        value: {
          es: 'Técnico Rendimiento RFEC (2017-2024)',
          en: 'RFEC Performance Technician (2017-2024)',
        },
      },
      {
        label: { es: 'Formación', en: 'Education' },
        value: { es: 'PhD CCAFD · MSc UMH', en: 'PhD Sport Sciences · MSc UMH' },
      },
      {
        label: { es: 'Grupo', en: 'Group' },
        value: { es: 'GIAFIS', en: 'GIAFIS' },
      },
      {
        label: { es: 'Publicaciones', en: 'Publications' },
        value: { es: '50+ artículos científicos', en: '50+ scientific papers' },
      },
    ],
    career: [],
    orcidId: '0000-0003-2689-4244',
    photo: '/team/alejandro-javaloyes.webp',
  },
  {
    slug: 'jose-antonio-salas',
    number: 12,
    role: 'researcher',
    name: 'José Antonio',
    surname: 'Salas Montoro',
    degree: 'PhD',
    specialty: {
      es: 'Rendimiento ciclista y dirección deportiva',
      en: 'Cycling performance & sport direction',
    },
    short: {
      es: 'Científico del rendimiento ciclista, Coach y Director Deportivo. Profesor en la Universidad de Granada y técnico de la RFEC en competiciones internacionales de BTT.',
      en: 'Cycling performance scientist, coach and sport director. Lecturer at the University of Granada and RFEC technician in international MTB competitions.',
    },
    bioParagraphs: {
      es: [
        'Profesor en la Universidad de Granada, impartiendo docencia de ciclismo en la Facultad de Ciencias del Deporte (Universidad de Granada, España).',
        'Doctor (PhD) en Biomedicina por la Universidad de Granada, con una tesis centrada en el rendimiento en ciclismo.',
        'Máster en Rendimiento Físico y Deportivo (Universidad Pablo de Olavide, España).',
        'Máster en Alto Rendimiento en Deportes Cíclicos (Universidad de Murcia, España).',
        'Maestro: Especialidad en Educación Física (Universidad Autónoma de Barcelona, España).',
        'Director Deportivo de Ciclismo Nivel III por la Real Federación Española de Ciclismo.',
        'Técnico de rendimiento y técnico de apoyo en concentraciones y competiciones internacionales con la Real Federación Española de Ciclismo entre los años 2019 y la actualidad, formando parte del staff de la selección española en Campeonatos del Mundo y Campeonatos de Europa de BTT.',
        'Profesor en los cursos de Director Deportivo Nivel I y Nivel II organizados por la Federación Andaluza de Ciclismo desde el año 2022.',
        'Director deportivo de la Escuela de Ciclismo Madre Tierra (Granada, España).',
        'Entrenador de múltiples deportistas de nivel autonómico, nacional e internacional.',
        'Autor de múltiples artículos científicos sobre ciclismo y entrenamiento.',
        'Investigador en proyectos y contratos de asesoramiento, coordinación e investigación para la mejora del rendimiento de los equipos nacionales de la Real Federación Española de Ciclismo.',
        'Miembro del grupo de investigación HUM1063 "Ciclismo y Rendimiento Deportivo".',
        'Exárbitro de fútbol, actividad desarrollada entre 1998 y 2016, con participación en encuentros del fútbol profesional y de la Copa de S. M. el Rey.',
        'Ciclista aficionado.',
      ],
      en: [],
    },
    highlights: [
      {
        label: { es: 'Posición', en: 'Position' },
        value: {
          es: 'Profesor UGR · Facultad CC. del Deporte',
          en: 'Lecturer UGR · Faculty of Sport Sciences',
        },
      },
      {
        label: { es: 'Formación', en: 'Education' },
        value: {
          es: 'PhD Biomedicina UGR · MSc UPO · MSc UMU',
          en: 'PhD Biomedicine UGR · MSc UPO · MSc UMU',
        },
      },
      {
        label: { es: 'RFEC', en: 'RFEC' },
        value: {
          es: 'Técnico Rendimiento BTT (2019-presente)',
          en: 'MTB Performance Technician (2019-present)',
        },
      },
      {
        label: { es: 'Federativo', en: 'Federation' },
        value: {
          es: 'Director Deportivo Nivel III · Docente FAC',
          en: 'Level III Sport Director · FAC Instructor',
        },
      },
      {
        label: { es: 'Grupo', en: 'Group' },
        value: { es: 'HUM1063', en: 'HUM1063' },
      },
    ],
    career: [],
    orcidId: '0000-0001-8600-0930',
    photo: '/team/jose-antonio-salas.webp',
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
      {
        label: { es: 'Formación', en: 'Education' },
        value: {
          es: 'Doble PhD (UGR/Loughborough + Jaén/Nottingham)',
          en: 'Dual PhD (UGR/Loughborough + Jaén/Nottingham)',
        },
      },
      {
        label: { es: 'Especialidad', en: 'Specialty' },
        value: { es: 'Nutrición · ISAK Lvl II', en: 'Nutrition · ISAK Lvl II' },
      },
      {
        label: { es: 'Grupo', en: 'Group' },
        value: { es: 'HUM1063', en: 'HUM1063' },
      },
      {
        label: { es: 'Cargos federativos', en: 'Federation roles' },
        value: {
          es: 'Dir. Deportivo Ciclismo III · Entrenador Natación III',
          en: 'Level III Cycling Sport Director · Level III Swimming Coach',
        },
      },
      {
        label: { es: 'Docencia', en: 'Teaching' },
        value: {
          es: 'Programa Tecnificación RFEC',
          en: 'RFEC Tecnificación Programme',
        },
      },
    ],
    career: [],
    orcidId: '0000-0001-7573-0399',
    photo: '/team/jose-joaquin-muros.webp',
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
      {
        label: { es: 'Formación', en: 'Education' },
        value: {
          es: 'MSc UCAM (×2) · PhD activo UGR',
          en: 'MSc UCAM (×2) · Active PhD UGR',
        },
      },
      {
        label: { es: 'Certificación', en: 'Certification' },
        value: {
          es: 'NSCA-CSCS · Director Deportivo III RFEC',
          en: 'NSCA-CSCS · Level III RFEC Sport Director',
        },
      },
      {
        label: { es: 'Línea', en: 'Research line' },
        value: {
          es: 'Esfuerzo máximo en ciclismo',
          en: 'Maximal effort in cycling',
        },
      },
      {
        label: { es: 'Trayectoria', en: 'Career' },
        value: {
          es: 'Valverde Team junior · Sel. Murciana',
          en: 'Valverde Team junior · Murcia Regional Team',
        },
      },
      {
        label: { es: 'Grupo', en: 'Group' },
        value: { es: 'HUM1063', en: 'HUM1063' },
      },
    ],
    career: [],
    orcidId: '0000-0002-2438-6329',
    photo: '/team/juan-jose-perez-diaz.webp',
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
      {
        label: { es: 'Formación', en: 'Education' },
        value: { es: 'MSc UGR · PhD activo', en: 'MSc UGR · Active PhD' },
      },
      {
        label: { es: 'Línea Tesis', en: 'Thesis' },
        value: { es: 'Durabilidad en ciclismo', en: 'Durability in cycling' },
      },
      {
        label: { es: 'Grupo', en: 'Group' },
        value: { es: 'HUM727', en: 'HUM727' },
      },
      {
        label: { es: 'Certificación', en: 'Certification' },
        value: { es: 'ISAK Nivel 2', en: 'ISAK Level 2' },
      },
      {
        label: { es: 'Colaboración', en: 'Collaboration' },
        value: { es: 'CSD · RFEC', en: 'CSD · RFEC' },
      },
      {
        label: { es: 'Publicaciones', en: 'Publications' },
        value: { es: '3 papers Q1 (2024-25)', en: '3 Q1 papers (2024-25)' },
      },
    ],
    career: [],
    orcidId: '0009-0007-8184-7965',
    photo: '/team/alejandro-de-rozas.webp',
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
      {
        label: { es: 'Trayectoria Deport.', en: 'Sport career' },
        value: {
          es: 'Sub23 Caja Rural-Alea (2023-2025)',
          en: 'U23 Caja Rural-Alea (2023-2025)',
        },
      },
      {
        label: { es: 'Palmarés Junior', en: 'Junior achievements' },
        value: {
          es: 'Campeón Navarra 2021 · Equipo Nacional',
          en: 'Navarra Champion 2021 · National Team',
        },
      },
      {
        label: { es: 'Formación', en: 'Education' },
        value: {
          es: 'TSAF · Estudiante Grado CAFD UGR',
          en: 'TSAF · CAFD undergraduate UGR',
        },
      },
      {
        label: { es: 'Especialidad', en: 'Specialty' },
        value: {
          es: 'IA generativa en ciclismo',
          en: 'Generative AI in cycling',
        },
      },
      {
        label: { es: 'Rol CRC', en: 'CRC role' },
        value: { es: 'Junior researcher', en: 'Junior researcher' },
      },
    ],
    career: [],
    photo: '/team/xabier-zabala.webp',
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
      {
        label: { es: 'Formación', en: 'Education' },
        value: { es: 'Grado CAFD UGR · PhD activo', en: 'CAFD degree UGR · Active PhD' },
      },
      {
        label: { es: 'Palmarés XCO', en: 'XCO achievements' },
        value: {
          es: '1º Cto. Andalucía Sub23 (2023) · 10º Copa España Sub23 (2022)',
          en: '1st Andalusia U23 Championship (2023) · 10th Spanish Cup U23 (2022)',
        },
      },
      {
        label: { es: 'Federación', en: 'Federation' },
        value: {
          es: 'Delegado Provincial FAC Granada',
          en: 'FAC Granada Provincial Delegate',
        },
      },
      {
        label: { es: 'Cargo', en: 'Role' },
        value: {
          es: 'Director Deportivo Nivel III',
          en: 'Level III Sport Director',
        },
      },
      {
        label: { es: 'Grupo', en: 'Group' },
        value: { es: 'HUM1063', en: 'HUM1063' },
      },
    ],
    career: [],
    photo: '/team/ignacio-valdivia.webp',
  },
  {
    slug: 'luisma-gallego',
    number: 11,
    role: 'applied-research',
    name: 'Luisma',
    surname: 'Gallego',
    degree: '',
    specialty: {
      es: 'IA aplicada al rendimiento',
      en: 'Applied AI for performance',
    },
    short: {
      es: 'Docente de IA aplicada al rendimiento en Intervals.icu. Python, ML y automatización de procesos en ciencias del deporte.',
      en: 'Lecturer on AI applied to performance at Intervals.icu. Python, ML, and process automation in sport sciences.',
    },
    bioParagraphs: {
      es: [
        'Luisma Gallego forma parte del equipo de docencia de Intervals.icu, plataforma referente en análisis de datos para deportistas de resistencia. Su rol consiste en formar a entrenadores, deportistas y profesionales en el uso de herramientas de inteligencia artificial aplicada al entrenamiento ciclista.',
        'Especializado en Python, machine learning y automatización de procesos, desarrolla integraciones que conectan sensores, datos de entrenamiento y modelos predictivos para apoyar la toma de decisiones en deporte de élite. Forma parte del Talent Pool de NTT DATA.',
        'En el Cycling Research Center, su rol es construir el puente entre la investigación académica y la aplicación práctica de la IA: traducir hallazgos científicos en herramientas y workflows que entrenadores y atletas pueden usar día a día. Su trabajo se alinea con el paradigma "Ciclismo 3.0" del CRC, donde la IA es aliada del criterio humano, no su sustituta.',
      ],
      en: [
        'Luisma Gallego is part of the teaching team at Intervals.icu, a leading platform for data analysis for endurance athletes. His role is to train coaches, athletes, and professionals in the use of AI tools applied to cycling training.',
        'Specialized in Python, machine learning, and process automation, he develops integrations that connect sensors, training data, and predictive models to support decision-making in elite sport. He is a member of NTT DATA Talent Pool.',
        'At the Cycling Research Center, his role is to build the bridge between academic research and the practical application of AI: translating scientific findings into tools and workflows that coaches and athletes can use day to day. His work aligns with the CRC\'s "Cycling 3.0" paradigm, where AI is an ally of human judgment, not a substitute.',
      ],
    },
    highlights: [
      {
        label: { es: 'Docencia', en: 'Teaching' },
        value: { es: 'Intervals.icu', en: 'Intervals.icu' },
      },
      {
        label: { es: 'Stack', en: 'Stack' },
        value: {
          es: 'Python · ML · Automatización',
          en: 'Python · ML · Automation',
        },
      },
      {
        label: { es: 'Colaboración', en: 'Collaboration' },
        value: {
          es: 'NTT DATA Talent Pool',
          en: 'NTT DATA Talent Pool',
        },
      },
    ],
    career: [],
    photo: '/team/luisma-gallego.webp',
  },
];

export const JUNIOR_GROUP_ORDER = ['xabier-zabala'];

export const FOUNDER = TEAM[0];
export const COFOUNDER = TEAM.find((m) => m.slug === 'manuel-mateo-march')!;
export const TEAM_REST = TEAM.slice(1);

export const FOUNDER_HIGHLIGHTS = TEAM[0].highlights;

export const ROLE_ORDER: TeamRole[] = [
  'deputy-director',
  'senior-researcher',
  'researcher',
  'phd-candidate',
  'applied-research',
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
  cofounder: 'cofounder',
  'deputy-director': 'deputyDirector',
  'senior-researcher': 'seniorResearcher',
  researcher: 'researcher',
  'phd-candidate': 'phdCandidate',
  'applied-research': 'appliedResearch',
  junior: 'junior',
};

export function roleI18nKey(role: TeamRole) {
  return ROLE_TO_KEY[role];
}
