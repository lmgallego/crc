export type LocalizedString = { es: string; en: string };
export type LocalizedStringArray = { es: string[]; en: string[] };

export type ServiceArea = {
  name: LocalizedString;
  description: LocalizedString;
};

export type LocationGroup = {
  region: LocalizedString;
  places: { name: string; detail: LocalizedString }[];
};

export type IncludedItem = {
  item: LocalizedString;
  detail: LocalizedString;
};

export type Program = {
  name: LocalizedString;
  description: LocalizedString;
};

export type ServiceSlug =
  | 'investigacion'
  | 'coaching'
  | 'training-camps'
  | 'formacion';

export type Service = {
  slug: ServiceSlug;
  order: number;
  featured: boolean;
  variant: 'accent' | 'inverse' | 'default';
  number: string;
  name: LocalizedString;
  shortDescription: LocalizedString;
  longDescription: LocalizedStringArray;
  audience: LocalizedStringArray;
  cta: LocalizedString;
  ctaSecondary?: LocalizedString;
  badge?: string;
  metric?: { label: string; value: string };
  objectives?: LocalizedStringArray;
  areas?: ServiceArea[];
  modalities?: string[];
  locations?: LocationGroup[];
  included?: IncludedItem[];
  programs?: Program[];
};

export const SERVICES: Service[] = [
  {
    slug: 'investigacion',
    order: 1,
    featured: true,
    variant: 'accent',
    number: '01',
    name: { es: 'Investigación', en: 'Research' },
    shortDescription: {
      es: 'Estudiamos lo que mueve al ciclismo. Publicamos lo que descubrimos.',
      en: 'We study what moves cycling. We publish what we discover.',
    },
    longDescription: {
      es: [
        'Confiamos en la ciencia; estudiamos las contribuciones de otros, pero también realizamos nuestra propia investigación específica en el campo del ciclismo y el triatlón. CRC se basa en la investigación para obtener las mejores respuestas a tus preguntas específicas. Podemos encontrar explicaciones científicas y aplicaciones prácticas con y para ti.',
        'El objetivo del CRC es desarrollar y promover el Ciclismo 3.0 mediante investigaciones innovadoras y de calidad centradas en el ciclismo. No se trata solo de biomecánica, ayudas ergogénicas o fisiología, sino también de aspectos psicosociales como las actitudes relacionadas con el dopaje o cuestiones psicológicas.',
      ],
      en: [
        'We trust science; we study the contributions of others, but we also conduct our own specific research in cycling and triathlon. CRC is grounded in research to deliver the best answers to your specific questions, with both scientific explanations and practical applications.',
        'The CRC objective is to develop and promote Cycling 3.0 through innovative, high-quality cycling-focused research. It is not only biomechanics, ergogenic aids or physiology, but also psychosocial aspects such as anti-doping attitudes or psychological matters.',
      ],
    },
    objectives: {
      es: [
        'Promover la investigación centrada en el ciclismo y crear conocimiento aplicado.',
        'Difundir los últimos conocimientos procedentes de la ciencia del ciclismo.',
        'Desarrollar metodología propia: integral, ética, vanguardista y científica.',
      ],
      en: [
        'Promote cycling-centred research and produce applied knowledge.',
        'Disseminate the latest knowledge from cycling science.',
        'Develop our own methodology: integrated, ethical, cutting-edge and scientific.',
      ],
    },
    audience: {
      es: [
        'Equipos profesionales con preguntas científicas concretas',
        'Federaciones y organismos públicos del deporte',
        'Investigadores y grupos académicos colaboradores',
        'Marcas y plataformas tecnológicas del sector',
      ],
      en: [
        'Professional teams with specific scientific questions',
        'Federations and public sports bodies',
        'Researchers and collaborating academic groups',
        'Brands and technology platforms in the sector',
      ],
    },
    areas: [
      {
        name: { es: 'Fisiología', en: 'Physiology' },
        description: {
          es: 'Umbral, lactato, HRV, durabilidad, adaptaciones al entrenamiento.',
          en: 'Threshold, lactate, HRV, durability, training adaptations.',
        },
      },
      {
        name: { es: 'Biomecánica', en: 'Biomechanics' },
        description: {
          es: 'Análisis del pedaleo, ergonomía, posicionamiento sobre la bici.',
          en: 'Pedalling analysis, ergonomics, bike fit and positioning.',
        },
      },
      {
        name: { es: 'Nutrición', en: 'Nutrition' },
        description: {
          es: 'Estrategias nutricionales, antropometría ISAK, composición corporal.',
          en: 'Nutrition strategies, ISAK anthropometry, body composition.',
        },
      },
      {
        name: { es: 'Antidopaje', en: 'Anti-doping' },
        description: {
          es: 'Actitudes, prevención, ética del rendimiento.',
          en: 'Attitudes, prevention, performance ethics.',
        },
      },
      {
        name: { es: 'Psicología', en: 'Psychology' },
        description: {
          es: 'Cognición, atención, percepción del esfuerzo.',
          en: 'Cognition, attention, perceived exertion.',
        },
      },
      {
        name: { es: 'Inteligencia Artificial', en: 'Artificial Intelligence' },
        description: {
          es: 'Modelos predictivos, gemelos digitales, IA generativa.',
          en: 'Predictive models, digital twins, generative AI.',
        },
      },
    ],
    cta: { es: 'Ver investigación', en: 'See research' },
    ctaSecondary: {
      es: 'Contactar con el equipo',
      en: 'Contact the team',
    },
    badge: '100+ PAPERS',
  },
  {
    slug: 'coaching',
    order: 2,
    featured: false,
    variant: 'default',
    number: '02',
    name: { es: 'Coaching', en: 'Coaching' },
    shortDescription: {
      es: 'Programas individuales y para equipos profesionales basados en Ciclismo 3.0.',
      en: 'Individual and pro-team programmes grounded in Cycling 3.0.',
    },
    longDescription: {
      es: [
        'Somos coaches basados en el concepto Ciclismo 3.0 y desarrollamos programas específicos para ciclistas profesionales individuales o equipos.',
        'Provenimos de la competición real, con más de 25 años de experiencia al más alto nivel y éxitos cosechados, siempre cerca de los mejores ciclistas.',
        'No somos solo entrenadores físicos o gestores; pretendemos que el atleta saque lo mejor de sí mismo, siendo autónomo paso a paso y creciendo como un deportista completo. Tratamos a cada persona como un individuo, con sus propias fortalezas y debilidades, utilizando los avances más recientes en la ciencia del entrenamiento.',
        'Hemos entrenado a campeones mundiales y olímpicos de diferentes disciplinas, por lo que no tememos trabajar con los mejores. ¡Nos encantan los retos!',
      ],
      en: [
        'We are coaches grounded in Cycling 3.0 and develop specific programmes for individual pro cyclists or teams.',
        'We come from real competition, with more than 25 years of top-level experience and proven success, always close to the best cyclists.',
        'We are not just physical trainers or managers; we aim for the athlete to bring out their best, growing in autonomy step by step. We treat each person as an individual, leveraging the latest advances in training science.',
        "We've trained world and Olympic champions across disciplines, so we are not afraid to work with the best. We love a challenge.",
      ],
    },
    audience: {
      es: [
        'Ciclistas profesionales individuales',
        'Equipos profesionales (UCI WorldTour, Continental, etc.)',
        'Triatletas de alto nivel',
        'Especialistas en MTB, BMX, pista o ciclocross',
        'Atletas de otras disciplinas (motocross, etc.) con necesidad de preparación específica',
      ],
      en: [
        'Individual pro cyclists',
        'Pro teams (UCI WorldTour, Continental, etc.)',
        'High-level triathletes',
        'MTB, BMX, track or cyclo-cross specialists',
        'Athletes from other disciplines (motocross, etc.) needing specific preparation',
      ],
    },
    modalities: ['Ruta', 'MTB', 'BMX', 'Triatlón', 'Pista', 'Ciclocross', 'Motocross'],
    cta: { es: 'Solicitar coaching', en: 'Request coaching' },
    ctaSecondary: { es: 'Conocer al equipo', en: 'Meet the team' },
    metric: { label: '25+ AÑOS · WORLDTOUR', value: '' },
  },
  {
    slug: 'training-camps',
    order: 3,
    featured: false,
    variant: 'default',
    number: '03',
    name: { es: 'Training Camps', en: 'Training Camps' },
    shortDescription: {
      es: 'Concentraciones diseñadas para grupos y equipos profesionales con asesoramiento integral.',
      en: 'Camps designed for groups and pro teams with full scientific support.',
    },
    longDescription: {
      es: [
        'Podemos organizar todo lo que necesites en una experiencia concentrada. Nuestros Training Camps están diseñados para grupos o equipos profesionales que desean tenerlo todo organizado en los mejores lugares para rodar, con rutas específicas, alimentación de alta calidad, asesoramiento científico (entrenamiento, psicología, fisiología, nutrición, biomecánica…) o formación.',
        '¡Solo pídenoslo y diseñaremos tu experiencia completa!',
        'En estas concentraciones podemos desarrollar todo nuestro potencial: realizamos valoraciones específicas e individuales, ofrecemos programas de entrenamiento especiales en el mejor entorno, actividades formativas y una oferta social y cultural para disfrutar mientras se trabaja.',
      ],
      en: [
        'We can organise whatever you need in a concentrated experience. Our Training Camps are designed for groups or pro teams who want everything organised in the best riding locations: specific routes, high-quality nutrition, scientific support (training, psychology, physiology, nutrition, biomechanics) or education.',
        'Just ask and we will design your full experience!',
        'In these camps we can deploy our full potential: individualised assessments, tailored training programmes in top environments, educational sessions and a social and cultural offer to enjoy while you work.',
      ],
    },
    audience: {
      es: [
        'Equipos profesionales en pretemporada',
        'Grupos de alto rendimiento (federaciones, selecciones)',
        'Clubs ambiciosos con objetivos concretos',
        'Plataformas o marcas con eventos privados',
      ],
      en: [
        'Pro teams during pre-season',
        'High-performance groups (federations, national teams)',
        'Ambitious clubs with concrete goals',
        'Platforms or brands running private events',
      ],
    },
    included: [
      {
        item: { es: 'Rutas', en: 'Routes' },
        detail: {
          es: 'Diseñadas según el perfil del grupo y los objetivos.',
          en: 'Designed for the group profile and goals.',
        },
      },
      {
        item: { es: 'Alimentación', en: 'Nutrition' },
        detail: {
          es: 'Alta calidad, planificada con nuestros nutricionistas.',
          en: 'High-quality, planned with our nutritionists.',
        },
      },
      {
        item: { es: 'Valoraciones', en: 'Assessments' },
        detail: {
          es: 'Tests fisiológicos individualizados.',
          en: 'Individualised physiological testing.',
        },
      },
      {
        item: { es: 'Asesoramiento científico', en: 'Scientific support' },
        detail: {
          es: 'Entrenamiento, fisiología, nutrición, psicología, biomecánica.',
          en: 'Training, physiology, nutrition, psychology, biomechanics.',
        },
      },
      {
        item: { es: 'Formación', en: 'Education' },
        detail: {
          es: 'Sesiones específicas (potencia, HRV, nutrición).',
          en: 'Specific sessions (power, HRV, nutrition).',
        },
      },
      {
        item: { es: 'Ocio', en: 'Leisure' },
        detail: {
          es: 'Oferta social y cultural complementaria.',
          en: 'Complementary social and cultural offer.',
        },
      },
    ],
    locations: [
      {
        region: { es: 'Sur de España', en: 'Southern Spain' },
        places: [
          {
            name: 'Almería',
            detail: {
              es: 'Costas de Cabo de Gata, sierra de los Filabres.',
              en: 'Cabo de Gata coast, Filabres mountains.',
            },
          },
          {
            name: 'Málaga',
            detail: {
              es: 'Sierra de las Nieves, Caminito del Rey.',
              en: 'Sierra de las Nieves, Caminito del Rey.',
            },
          },
          {
            name: 'Granada (Sierra Nevada)',
            detail: {
              es: 'Alta montaña, recuperación en altura.',
              en: 'High altitude, recovery training.',
            },
          },
        ],
      },
      {
        region: { es: 'Sureste de España', en: 'South-East Spain' },
        places: [
          {
            name: 'Alicante (Altea, Calpe)',
            detail: {
              es: 'Clima invernal favorable, rutas costeras emblemáticas.',
              en: 'Mild winter weather, classic coastal routes.',
            },
          },
        ],
      },
      {
        region: { es: 'Otros destinos', en: 'Other destinations' },
        places: [
          {
            name: 'On request',
            detail: {
              es: 'Bajo petición, siempre que sea posible.',
              en: 'On request, when feasible.',
            },
          },
        ],
      },
    ],
    cta: { es: 'Reservar Training Camp', en: 'Book a Training Camp' },
    ctaSecondary: {
      es: 'Solicitar propuesta personalizada',
      en: 'Request a custom proposal',
    },
    badge: 'ALMERÍA · GRANADA · ALICANTE',
  },
  {
    slug: 'formacion',
    order: 4,
    featured: false,
    variant: 'inverse',
    number: '04',
    name: { es: 'Formación', en: 'Education' },
    shortDescription: {
      es: 'Mentorización, cursos federativos, congresos y módulos universitarios.',
      en: 'Mentoring, federation courses, conferences and university modules.',
    },
    longDescription: {
      es: [
        'Creemos firmemente que todo el mundo necesita saber qué está haciendo y por qué. El Principio Pedagógico se entiende como un principio de entrenamiento ordinario, al igual que el de sobrecarga o especificidad.',
        'Actualmente impartimos contenidos específicos sobre biomecánica, nutrición y entrenamiento por potencia a entrenadores, ciclistas, directores de equipo o incluso a nivel de doctorado universitario.',
      ],
      en: [
        'We firmly believe everyone needs to know what they are doing and why. The Pedagogical Principle is a training principle in its own right, just like overload or specificity.',
        'We currently deliver specific content on biomechanics, nutrition and power-based training to coaches, cyclists, team directors and even at PhD level.',
      ],
    },
    audience: {
      es: [
        'Entrenadores en activo que quieren elevar su nivel',
        'Ciclistas avanzados con vocación formativa',
        'Directores deportivos y staff de equipos',
        'Estudiantes de ciencias del deporte y doctorado',
        'Federaciones, clubs y plataformas que organizan formación',
      ],
      en: [
        'Active coaches looking to raise their level',
        'Advanced cyclists with educational drive',
        'Sport directors and team staff',
        'Sport science and PhD students',
        'Federations, clubs and platforms running training',
      ],
    },
    programs: [
      {
        name: { es: 'Programa de Mentorización', en: 'Mentoring Programme' },
        description: {
          es: 'Grupo reducido guiado paso a paso para ser un coach 3.0 e incluso unirse a nuestro staff.',
          en: 'Small group guided step by step to become a Coach 3.0, with the option to join our staff.',
        },
      },
      {
        name: { es: 'Cursos federativos', en: 'Federation courses' },
        description: {
          es: 'Niveles I y II territorial y obtención de licencia UCI.',
          en: 'Territorial Levels I and II plus UCI licence pathway.',
        },
      },
      {
        name: { es: 'Universidad', en: 'University' },
        description: {
          es: '3 módulos en CCD Granada — única universidad del mundo con título específico en ciclismo. Docencia también a nivel de doctorado.',
          en: '3 modules at CCD Granada — the only university worldwide with a specific cycling degree. Teaching at PhD level too.',
        },
      },
      {
        name: { es: 'Cursos certificados', en: 'Certified courses' },
        description: {
          es: 'Certificaciones específicas en ergonomía, potencia y HRV.',
          en: 'Specific certifications in ergonomics, power and HRV.',
        },
      },
      {
        name: { es: 'Congresos', en: 'Conferences' },
        description: {
          es: 'Ponencias frecuentes en congresos nacionales e internacionales, también en triatlón.',
          en: 'Frequent talks at national and international conferences, including triathlon.',
        },
      },
      {
        name: { es: 'Eventos no formales', en: 'Informal events' },
        description: {
          es: 'Eventos en clubs de ciclismo y triatlón. El conocimiento debe estar abierto para todos.',
          en: 'Events at cycling and triathlon clubs. Knowledge should be open to everyone.',
        },
      },
    ],
    cta: { es: 'Solicitar información', en: 'Request information' },
    ctaSecondary: { es: 'Próximos cursos', en: 'Upcoming courses' },
    badge: 'DOCTORADO · MÁSTER · UCI',
  },
];

export function findService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
