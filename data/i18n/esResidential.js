// The Residential hub in Spanish (Mexico), /es/residential-roofing/ (owner, November 9 2026): the same page as /residential-roofing/
// (data/pages/residential.js), translated, usted throughout. Product names (TotalShield, SecondLife, FlatGuard, ReserveReady, RoofCare Plan,
// RoofRevive, RoofScan 360) stay in English, as on the Spanish home page. Every link leads to the English pages, which are the only versions of
// those pages. No place names (owner: city names only on the location pages). Keyword: "techos residenciales" (title, description, H1 and the
// first sentence). If you reword the English page, update this copy too.
export const ES_RESIDENTIAL_PATH = '/es/residential-roofing/';

export const ES_RESIDENTIAL = {
  keyword: 'techos residenciales',
  metaTitle: 'Techos Residenciales | Quality Roofing Specialists',
  metaDescription:
    'Techos residenciales de tejas asfálticas, teja y techos planos, más techos para HOA y edificios multifamiliares. Un techador revisa primero. Evaluación gratuita.',
  crumbs: [
    { label: 'Inicio', href: '/es/' },
    { label: 'Techos residenciales', href: ES_RESIDENTIAL_PATH },
  ],
  hero: {
    heading: 'Techos residenciales',
    outcome: 'Una casa que se mantiene seca, cómoda y protegida.',
    intro:
      'Techos residenciales de tejas asfálticas, teja y techos planos. La mayoría de las goteras y del desgaste empieza en un detalle que no se ve desde el suelo: un tapajuntas, un valle, una unión. Un techador lo encuentra primero, lo fotografía y pone la solución por escrito antes de cualquier trabajo. Cada trabajo empieza con una evaluación gratuita del techo, no con una venta.',
    highlights: ['Techos de tejas asfálticas, teja y planos', 'Alcance y precio por escrito antes del trabajo', 'Garantía de mano de obra de 10 años (llame para detalles)'],
  },
  fanCaption: 'Techos de tejas asfálticas, teja y planos, un solo equipo',
  overview: {
    heading: 'Un solo equipo para cada techo de su casa',
    paragraphs: [
      'Muchas casas tienen más de un tipo de techo: un techo principal de teja con una sección plana detrás del parapeto, una casa de tejas asfálticas con un techo de patio de poca pendiente, un garaje o una ADU con su propio sistema. Si contrata a un techador distinto para cada uno, nadie se hace responsable de las uniones entre ellos. Nuestras cuadrillas trabajan los tres, así que una sola evaluación dirigida por un techador cubre toda la casa y un solo alcance por escrito dice lo que necesita cada parte.',
      'Empiece con su tipo de techo abajo, o vaya directo al servicio que necesita. ¿No sabe por dónde empezar? Una [evaluación gratuita del techo](#roof-check) le da fotos del estado de su techo y un siguiente paso claro: reparar, vigilar, dar mantenimiento o reemplazar.',
    ],
    images: [
      { src: '/images/home-services-residential-shingle-drone-view.webp', alt: 'Vista con dron de una casa con un techo nuevo de tejas asfálticas gris claro' },
      { src: '/images/tile-roof-replacement.webp', alt: 'Un techo de teja en una casa' },
      { src: '/images/flat-roof-replacement-completed-white-membrane.webp', alt: 'Un techo plano blanco terminado' },
    ],
  },
  cards: {
    heading: 'Techos por tipo',
    intro: 'Elija su tipo de techo para ver los servicios de reemplazo, reparación y cuidado que ofrecemos.',
  },
  // the roof types (RESIDENTIAL_TYPES in data/catalog.js), by their English address
  types: {
    '/residential-roofing/shingle-roofing/': { title: 'Techos de tejas asfálticas', text: 'Techos de tejas asfálticas de primera, instalados según los requisitos del fabricante, con buena ventilación y líneas limpias.' },
    '/residential-roofing/tile-roofing/': { title: 'Techos de teja', text: 'Techos de teja de barro, concreto y pizarra reparados, reinstalados sobre membrana nueva o reemplazados, conservando el aspecto que le gusta.' },
    '/residential-roofing/flat-roofing/': { title: 'Techos planos', text: 'Sistemas de betún modificado y de poca pendiente, planeados según el drenaje y la forma en que el agua corre sobre su techo.' },
  },
  serviceLinks: [
    { label: 'Reparación de techos', href: '/roof-repair/' },
    { label: 'Reemplazo de techos', href: '/roof-replacement/' },
    { label: 'Inspección del techo', href: '/roof-inspection/' },
    { label: 'Planes de mantenimiento', href: '/roof-maintenance-plans/' },
  ],
  finder: {
    heading: 'Encuentre el servicio correcto',
    intro: 'El mismo proceso, detalle por detalle, aplica a cada servicio. Elija lo que necesita y luego su tipo de techo.',
    rows: [
      {
        id: 'roof-replacement',
        title: 'Reemplazo de techo',
        text: 'Se retira todo el techo y se instala un sistema nuevo, según las especificaciones, con un alcance por escrito y una garantía de mano de obra de 10 años (llame para detalles).',
        links: [
          { label: 'Tejas asfálticas', href: '/residential-roofing/shingle-roofing/replacement/' },
          { label: 'Teja', href: '/residential-roofing/tile-roofing/replacement/' },
          { label: 'Plano', href: '/residential-roofing/flat-roofing/replacement/' },
        ],
      },
      {
        id: 'roof-repairs',
        title: 'Reparación de techos',
        text: 'Goteras, daños por tormenta y detalles desgastados reparados en su origen, con fotos de lo que estaba mal y de lo que hicimos.',
        links: [
          { label: 'Tejas asfálticas', href: '/residential-roofing/shingle-roofing/repair/' },
          { label: 'Teja', href: '/residential-roofing/tile-roofing/repair/' },
          { label: 'Plano', href: '/residential-roofing/flat-roofing/repair/' },
        ],
      },
      {
        id: 'lift-and-relay',
        title: 'Levantar y reinstalar teja',
        text: 'Membrana nueva debajo de sus tejas actuales, para que un techo de teja conserve su aspecto y deje de gotear.',
        links: [{ label: 'Levantar y reinstalar teja (Tile Lift & Relay)', href: '/residential-roofing/tile-roofing/lift-and-relay/' }],
      },
      {
        id: 'new-installations',
        title: 'Instalaciones nuevas',
        text: 'Techos para construcción nueva, ampliaciones, ADU y casas que cambian a otro tipo de techo.',
        links: [
          { label: 'Tejas asfálticas', href: '/residential-roofing/shingle-roofing/installation/' },
          { label: 'Plano', href: '/residential-roofing/flat-roofing/installation/' },
        ],
      },
      {
        id: 'inspections',
        title: 'Inspecciones',
        text: 'Inspecciones dirigidas por un techador y documentadas con fotos al comprar o vender, después de una tormenta o antes de decidir entre reparar y reemplazar.',
        links: [
          { label: 'Tejas asfálticas', href: '/roof-inspection/#shingle-roofs' },
          { label: 'Teja', href: '/roof-inspection/#tile-roofs' },
          { label: 'Plano', href: '/roof-inspection/#flat-roofs' },
        ],
      },
      {
        id: 'tune-ups',
        title: 'Puestas a punto',
        text: 'Una visita enfocada que arregla las cosas pequeñas, como piezas sueltas, sellador cansado y valles con basura, antes de que se conviertan en goteras.',
        links: [{ label: 'Puesta a punto del techo', href: '/roof-maintenance-plans/#tune-up' }],
      },
      {
        id: 'roof-care',
        title: 'Cuidado del techo',
        text: 'Mantenimiento programado que vigila el desgaste con el tiempo, con fotos de cada visita.',
        links: [{ label: 'Planes de mantenimiento del techo', href: '/roof-maintenance-plans/' }],
      },
      {
        id: 'attic-ventilation',
        title: 'Ventilación del ático',
        text: 'Ventilas revisadas, reparadas o agregadas para que su ático respire, con fotos de cada ventila.',
        links: [{ label: 'Ventilación del ático', href: '/residential-roofing/attic-ventilation/' }],
      },
      {
        id: 'hoa',
        title: 'Techos para HOA y multifamiliares',
        text: 'Techos para propiedades de HOA y multifamiliares, con un solo punto de contacto para la mesa directiva o el administrador.',
        links: [{ label: 'HOA y multifamiliares', href: '/residential-roofing/hoa-multi-family/' }],
      },
    ],
  },
  projectsHeading: 'Proyectos de techos recientes',
  reviewsHeading: 'Lo que dicen los propietarios después del trabajo',
  postsHeading: 'Artículos relacionados',
  faqHeading: 'Preguntas sobre techos residenciales',
  faqs: [
    {
      q: '¿En qué tipo de casas trabajan?',
      a: 'Casas unifamiliares, townhomes, ADU y garajes, además de propiedades de HOA y multifamiliares. Trabajamos en techos de [tejas asfálticas](/residential-roofing/shingle-roofing/), [teja](/residential-roofing/tile-roofing/) y [planos](/residential-roofing/flat-roofing/).',
    },
    {
      q: '¿Cómo sé si necesito una reparación o un techo nuevo?',
      a: 'Empiece con una evaluación gratuita del techo. Un techador inspecciona el techo, documenta con fotos lo que encuentra y le explica sus opciones en palabras sencillas, incluso cuando basta con una reparación o con levantar y reinstalar la teja.',
    },
    {
      q: '¿Recibo un precio por escrito antes de empezar?',
      a: 'Sí. Cada proyecto recibe un alcance y un precio por escrito antes de empezar cualquier trabajo, para que sepa exactamente lo que incluye. Sin presión y sin precios misteriosos.',
    },
    {
      q: '¿En qué zonas trabajan?',
      a: 'Vea todas las ciudades y condados donde trabajamos en nuestra página de [zonas de servicio](/service-areas/), o revise su código postal en el mapa.',
    },
  ],
  final: {
    heading: '¿Quiere una respuesta clara sobre su techo?',
    text: 'Empiece con una evaluación gratuita del techo. Un techador revisa su techo y le da un alcance y un precio por escrito antes de cualquier trabajo.',
  },
};
