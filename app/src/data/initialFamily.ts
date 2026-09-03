import type { Person, FamilyUnion, MemoryPost } from '../types/family';

export const INITIAL_PERSONS: Person[] = [
  // ==========================================
  // --- GENERACIÓN -1 (Tatarabuelos y Patriarcas Ancestros) ---
  // ==========================================
  // Patriarcas de la Dinastía Bolbol
  {
    id: 'georges-bolbol',
    name: 'Georges Bolbol',
    generation: -1,
    branch: 'Bolbol',
    tags: ['Gen -1', 'Rama Bolbol', 'Patriarca'],
    bioSummary: 'Patriarca de la familia Bolbol. Padre de Teófilo Bolbol y sus 8 hermanos (Miguel, Labibi, Sobji, Ignacio, Camilo, Nazem, Frosina, Afife). Casado con Magidi (Alcira).'
  },
  {
    id: 'magidi-alcira-bolbol',
    name: 'Magidi "Alcira" Bolbol',
    generation: -1,
    branch: 'Bolbol',
    tags: ['Gen -1', 'Rama Bolbol', 'Matriarca'],
    bioSummary: 'Matriarca de la familia Bolbol. Madre de Teófilo Bolbol y sus 8 hermanos. Casada con Georges Bolbol.'
  },
  // Rama Jacobo Chababo & Ema Trantemberg (Ancestros)
  {
    id: 'juda-chababo',
    name: 'Judá Chababo',
    generation: -1,
    branch: 'Chababo',
    tags: ['Gen -1', 'Rama Chababo', 'Ancestro'],
    bioSummary: 'Padre de Salomón Chababo y Jacobo Chababo. Originario de Jerusalén.'
  },
  {
    id: 'malea-levi',
    name: 'Malea Levi',
    generation: -1,
    branch: 'Levi',
    tags: ['Gen -1', 'Rama Levi', 'Ancestros'],
    bioSummary: 'Madre de Salomón Chababo y Jacobo Chababo.'
  },
  {
    id: 'jose-trantemberg',
    name: 'José Trantemberg',
    generation: -1,
    branch: 'Trantemberg',
    tags: ['Gen -1', 'Rama Trantemberg', 'Ancestros'],
    bioSummary: 'Padre de Ema Trantemberg. Originario de Hamburgo, Alemania.'
  },
  {
    id: 'rosa-esrique',
    name: 'Rosa Esrique',
    generation: -1,
    branch: 'Trantemberg',
    tags: ['Gen -1', 'Rama Trantemberg', 'Ancestros'],
    bioSummary: 'Madre de Ema Trantemberg.'
  },

  // ==========================================
  // --- GENERACIÓN 0 (Bisabuelos y Hermanos Pioneros) ---
  // ==========================================
  {
    id: 'jacobo-chababo',
    name: 'Jacobo Chababo',
    birthPlace: 'Jerusalén',
    generation: 0,
    branch: 'Chababo',
    tags: ['Gen 0', 'Rama Chababo', 'Comerciante'],
    bioSummary: 'Hijo de Judá Chababo y Malea Levi, hermano de Salomón Chababo. Nacido en Jerusalén. Casado el 23 de octubre de 1913 en Rosario con Ema Trantemberg. Su apellido fue rectificado judicialmente de Sida a Chababo en 1922/1933.',
    facts: [
      { id: 'f_jacobo_1', type: 'FACT', content: 'Matrimonio civil el 23 de octubre de 1913 en Rosario (5ª Sección, Acta Nº 318).', source: 'Libreta de Familia' },
      { id: 'f_jacobo_2', type: 'FACT', content: 'Rectificación de apellido Sida a Chababo dictada por el Juez Dr. Juan Rossi.', source: 'Libreta de Familia - Registro Civil Santa Fe' }
    ]
  },
  {
    id: 'ema-trantemberg',
    name: 'Ema Trantemberg',
    birthPlace: 'Hamburgo, Alemania',
    generation: 0,
    branch: 'Trantemberg',
    tags: ['Gen 0', 'Rama Trantemberg', 'Matriarca'],
    bioSummary: 'Hija de José Trantemberg y Rosa Esrique. Nacida en Hamburgo, Alemania. Casada con Jacobo Chababo en Rosario el 23 de octubre de 1913.'
  },
  {
    id: 'jaime-chababo',
    name: 'Jaime Chababo',
    generation: 0,
    branch: 'Chababo',
    tags: ['Gen 0', 'Rama Chababo', 'Patriarca'],
    bioSummary: 'Esposo de Basilia Susman.'
  },
  {
    id: 'basilia-susman',
    name: 'Basilia Susman',
    generation: 0,
    branch: 'Susman',
    tags: ['Gen 0', 'Rama Susman', 'Matriarca'],
    bioSummary: 'Esposa de Jaime Chababo.'
  },
  {
    id: 'salomon-chababo',
    name: 'Salomón Chababo',
    generation: 0,
    branch: 'Chababo',
    tags: ['Gen 0', 'Rama Chababo', 'Patriarca'],
    bioSummary: 'Hijo de Judá Chababo y Malea Levi, hermano de Jacobo Chababo. Padre de Moisés Chababo y Reina Chababo. Emigró a Sudamérica desde Medio Oriente.',
    facts: [
      { id: 'f_salomon_1', type: 'FACT', content: 'Llegó a Argentina proveniente de Medio Oriente antes de 1926.', source: 'Deducido por nacimiento de Moisés' }
    ]
  },
  {
    id: 'mercedes-sitton',
    name: 'Mercedes Sitton',
    generation: 0,
    branch: 'Chababo',
    tags: ['Gen 0', 'Rama Chababo', 'Matriarca'],
    bioSummary: 'Madre de Moisés Chababo y Reina Chababo.'
  },
  {
    id: 'la-tatuna',
    name: 'Olga Romero (La Tatuna)',
    generation: 0,
    branch: 'Romero',
    tags: ['Gen 0', 'Rama Romero', 'La Tatuna', 'Matriarca Ancestro'],
    bioSummary: 'Madre de Ana María Baez (La Trichi), bisabuela de Ana, Fernanda y Gabriela Ballistreri.'
  },
  {
    id: 'padres-pipi',
    name: 'Hermana de Olga Romero',
    generation: 0,
    branch: 'Romero',
    tags: ['Gen 0', 'Rama Romero', 'Hermana de Olga'],
    bioSummary: 'Hermana de Olga Romero (La Tatuna) y madre de Alicia (La Pipi).'
  },
  {
    id: 'catalina-ancestro-ballistreri',
    name: 'Catalina',
    generation: 0,
    branch: 'Ballistreri',
    tags: ['Gen 0', 'Rama Ballistreri', 'Matriarca Ancestro'],
    bioSummary: 'Madre de Roberto Ballistreri, Pepe Ballistreri y Catalina Ballistreri.'
  },
  {
    id: 'teofilo-bolbol',
    name: 'Teófilo Bolbol',
    generation: 0,
    branch: 'Bolbol',
    tags: ['Gen 0', 'Rama Bolbol', 'Patriarca'],
    bioSummary: 'Padre de Zoraida y sus 7 hermanos/as. Enviudó de su primera esposa (Sofía Gesrik) y luego se casó con su cuñada (Bahíe Gesrik).'
  },
  {
    id: 'sofia-gesrik',
    name: 'Sofía Gesrik (Zakie Jezrit)',
    generation: 0,
    branch: 'Gesrik',
    tags: ['Gen 0', 'Rama Gesrik', 'Zakie Jezrit', 'Matriarca'],
    bioSummary: 'Madre de Zoraida, Elena, Gloria, Julia, Nelly y Elisa. Primera esposa de Teófilo Bolbol. Su nombre original árabe era Zakie Jezrit. Falleció tempranamente.'
  },
  {
    id: 'bahie-gesrik',
    name: 'Bahíe "Argentina" Gesrik',
    generation: 0,
    branch: 'Gesrik',
    tags: ['Gen 0', 'Rama Gesrik', 'Argentina', '2ª Esposa'],
    bioSummary: 'Hermana de Sofía y Hellen Gesrik. Conocida como Argentina. Segunda esposa de Teófilo Bolbol tras enviudar. Madre de Jorge (Coco), Alcira (Turita) y Antoine.'
  },
  {
    id: 'hellen-gesrik',
    name: 'Hellen Gesrik',
    generation: 0,
    branch: 'Gesrik',
    tags: ['Gen 0', 'Rama Gesrik', 'Hermana'],
    bioSummary: 'Hermana de Sofía y Bahíe Gesrik. Casada con Pedro Sader.'
  },
  {
    id: 'pedro-sader',
    name: 'Pedro Sader',
    generation: 0,
    branch: 'Sader',
    tags: ['Gen 0', 'Rama Sader'],
    bioSummary: 'Esposo de Hellen Gesrik. Padre de Jorge (Coquito) y Susana Sader.'
  },
  // Hermanos de Teófilo Bolbol (Hijos de Georges Bolbol y Magidi)
  {
    id: 'miguel-bolbol',
    name: 'Miguel Bolbol',
    generation: 0,
    branch: 'Bolbol',
    tags: ['Gen 0', 'Rama Bolbol', 'Hermano de Teófilo'],
    bioSummary: 'Hijo de Georges Bolbol y Magidi. Hermano de Teófilo Bolbol. Padre de Rubén y Víctor Bolbol.'
  },
  {
    id: 'labibi-bolbol',
    name: 'Labibi Bolbol',
    generation: 0,
    branch: 'Bolbol',
    tags: ['Gen 0', 'Rama Bolbol', 'Hermano de Teófilo'],
    bioSummary: 'Hijo/a de Georges Bolbol y Magidi. Hermano/a de Teófilo Bolbol. Padre/madre de Matilde Alcira Belune y Emiliz.'
  },
  {
    id: 'sobji-bolbol',
    name: 'Sobji Bolbol',
    generation: 0,
    branch: 'Bolbol',
    tags: ['Gen 0', 'Rama Bolbol', 'Hermano de Teófilo'],
    bioSummary: 'Hijo de Georges Bolbol y Magidi. Hermano de Teófilo Bolbol. Casado con Juana Sauan. Padre de Rosita, Alcira, Eva Argentina y María Argentina.'
  },
  {
    id: 'juana-sauan',
    name: 'Juana Sauan',
    generation: 0,
    branch: 'Sauan',
    tags: ['Gen 0', 'Rama Sauan'],
    bioSummary: 'Esposa de Sobji Bolbol. Madre de Rosita, Alcira, Eva Argentina y María Argentina.'
  },
  {
    id: 'ignacio-bolbol',
    name: 'Ignacio Bolbol',
    generation: 0,
    branch: 'Bolbol',
    tags: ['Gen 0', 'Rama Bolbol', 'Hermano de Teófilo'],
    bioSummary: 'Hijo de Georges Bolbol y Magidi. Hermano de Teófilo Bolbol. Casado con Irma Bernal. Padre de Alcira e Irma (Chona).'
  },
  {
    id: 'irma-bernal',
    name: 'Irma Bernal',
    generation: 0,
    branch: 'Bernal',
    tags: ['Gen 0', 'Rama Bernal'],
    bioSummary: 'Esposa de Ignacio Bolbol. Madre de Alcira e Irma (Chona) Bolbol.'
  },
  {
    id: 'camilo-bolbol',
    name: 'Camilo Bolbol',
    generation: 0,
    branch: 'Bolbol',
    tags: ['Gen 0', 'Rama Bolbol', 'Hermano de Teófilo'],
    bioSummary: 'Hijo de Georges Bolbol y Magidi. Hermano de Teófilo Bolbol. Casado con Tía Antonia. Padre de Jorge y Bebe.'
  },
  {
    id: 'tia-antonia',
    name: 'Tía Antonia',
    generation: 0,
    branch: 'Bolbol',
    tags: ['Gen 0', 'Rama Bolbol', 'Tía'],
    bioSummary: 'Esposa de Camilo Bolbol. Madre de Jorge y Bebe.'
  },
  {
    id: 'nazem-bolbol',
    name: 'Nazem Bolbol',
    generation: 0,
    branch: 'Bolbol',
    tags: ['Gen 0', 'Rama Bolbol', 'Hermano de Teófilo'],
    bioSummary: 'Hijo de Georges Bolbol y Magidi. Hermano de Teófilo Bolbol. No tuvo descendencia.'
  },
  {
    id: 'frosina-bolbol',
    name: 'Frosina Bolbol',
    generation: 0,
    branch: 'Bolbol',
    tags: ['Gen 0', 'Rama Bolbol', 'Hermana de Teófilo'],
    bioSummary: 'Hija de Georges Bolbol y Magidi. Hermana de Teófilo Bolbol. Madre de Jorge Betabe, Ebrain y Alcira Bitar.'
  },
  {
    id: 'afife-bolbol',
    name: 'Afife Bolbol',
    generation: 0,
    branch: 'Bolbol',
    tags: ['Gen 0', 'Rama Bolbol', 'Hermana de Teófilo', 'Buenos Aires'],
    bioSummary: 'Hija de Georges Bolbol y Magidi. Hermana de Teófilo Bolbol. Radicada en Buenos Aires. Madre de Felipe, José, Jorge, Alcira, Rosa y Elías.'
  },
  // Padres de Oscar Guardiet (Ancestros de la Rama Guardiet)
  {
    id: 'pablo-guardiet-padre',
    name: 'Pablo Guardiet',
    generation: 0,
    branch: 'Guardiet',
    tags: ['Gen 0', 'Rama Guardiet', 'Patriarca'],
    bioSummary: 'Padre de Oscar Guardiet y sus 6 hermanos/as (Pablo, María Celia, Lina, Dora Elvira, Dolores, Elsa). Casado con Celia Sanchez.'
  },
  {
    id: 'celia-sanchez',
    name: 'Celia Sanchez',
    generation: 0,
    branch: 'Guardiet',
    tags: ['Gen 0', 'Rama Guardiet', 'Matriarca'],
    bioSummary: 'Madre de Oscar Guardiet y sus 6 hermanos/as. Casada con Pablo Guardiet.'
  },
  {
    id: 'jean-jordan',
    name: 'Jean Jordan',
    generation: 0,
    branch: 'Jordan',
    tags: ['Gen 0', 'Rama Jordan', 'Siria'],
    bioSummary: 'Familiar de la rama Gesrik proveniente de Siria.'
  },
  {
    id: 'antoine-jordan',
    name: 'Antoine Jordan',
    generation: 0,
    branch: 'Jordan',
    tags: ['Gen 0', 'Rama Jordan', 'Guerra'],
    bioSummary: 'Familiar de la rama Jordan/Gesrik. Se encontró en la guerra con Jean Jordan. Casado con Mary.'
  },
  {
    id: 'mary-jordan',
    name: 'Mary Louise Gaywood de Jordan',
    generation: 0,
    branch: 'Gaywood',
    tags: ['Gen 0', 'Rama Gaywood', 'Rama Jordan'],
    bioSummary: 'Esposa de Antoine Jordan. Madre de Ralph (Raúl), Philippe Juan Guillermo y Ariane Jordan.'
  },

  // ==========================================
  // --- GENERACIÓN 1 (Abuelos y Ancestros) ---
  // ==========================================
  {
    id: 'moises',
    name: 'Moisés Chababo',
    birthDate: '23 de noviembre de 1926',
    birthYear: '1926',
    deathYear: '2018',
    birthPlace: 'Rosario, Santa Fe, Argentina',
    generation: 1,
    branch: 'Chababo',
    tags: ['Gen 1', 'Rama Chababo', 'Patriarca'],
    bioSummary: 'Hijo de Salomón Chababo. Su legado destaca por la cultura del trabajo, la honestidad y la unión en la mesa familiar.',
    facts: [
      { id: 'f2', type: 'OPINION', content: 'Decían de él que su sola presencia infundía un profundo respeto.' }
    ],
    valuesAndTeachings: [
      'La palabra empeñada vale más que cualquier firma en papel.',
      'En la mesa familiar siempre hay lugar para un plato más.'
    ]
  },
  {
    id: 'zoraida',
    name: 'Zoraida Bolbol',
    birthDate: '20 de febrero de 1929',
    birthYear: '1929',
    deathYear: '2024',
    generation: 1,
    branch: 'Bolbol',
    tags: ['Gen 1', 'Rama Bolbol', '4ª Hermana', 'Matriarca'],
    bioSummary: 'Cuarta hija de Teófilo Bolbol y Sofía Gesrik. Matriarca inolvidable, guardiana de las tradiciones culinarias y del calor del hogar.',
    valuesAndTeachings: [
      'Mantener unidos a los hermanos es la mayor riqueza de unos padres.'
    ]
  },
  {
    id: 'elena-bolbol',
    name: 'Elena Bolbol',
    generation: 1,
    branch: 'Bolbol',
    tags: ['Gen 1', 'Rama Bolbol', '1ª Hermana (La más grande)'],
    bioSummary: 'Primera hija de Teófilo Bolbol y Sofía Gesrik.'
  },
  {
    id: 'gloria-bolbol',
    name: 'Gloria Bolbol',
    generation: 1,
    branch: 'Bolbol',
    tags: ['Gen 1', 'Rama Bolbol', '2ª Hermana'],
    bioSummary: 'Segunda hija de Teófilo Bolbol y Sofía Gesrik. Casada con Karim Yebne.'
  },
  {
    id: 'karim-yebne',
    name: 'Karim Yebne',
    generation: 1,
    branch: 'Yebne',
    tags: ['Gen 1', 'Rama Yebne'],
    bioSummary: 'Esposo de Gloria Bolbol. Padre de Basilio, Jorge y Teresa.'
  },
  {
    id: 'julia-bolbol',
    name: 'Julia Bolbol',
    generation: 1,
    branch: 'Bolbol',
    tags: ['Gen 1', 'Rama Bolbol', '3ª Hermana'],
    bioSummary: 'Tercera hija de Teófilo Bolbol y Sofía Gesrik. Casada con Emilio "Cacho" Bonsignore.'
  },
  {
    id: 'emilio-bonsignore',
    name: 'Emilio "Cacho" Bonsignore',
    generation: 1,
    branch: 'Bonsignore',
    tags: ['Gen 1', 'Rama Bonsignore'],
    bioSummary: 'Esposo de Julia Bolbol. Padre de Daniel, Liliana y Carlos Javier ("Cachito").'
  },
  {
    id: 'nelly-bolbol',
    name: 'Nelly Bolbol',
    generation: 1,
    branch: 'Bolbol',
    tags: ['Gen 1', 'Rama Bolbol', '5ª Hermana'],
    bioSummary: 'Quinta hija de Teófilo Bolbol y Sofía Gesrik. Casada con Oscar Goytia.'
  },
  {
    id: 'oscar-goytia',
    name: 'Oscar Goytia',
    generation: 1,
    branch: 'Goytia',
    tags: ['Gen 1', 'Rama Goytia'],
    bioSummary: 'Esposo de Nelly Bolbol. Falleció a los 50 años. Padre de Oscarcito.'
  },
  {
    id: 'elisa-bolbol',
    name: 'Elisa Bolbol',
    generation: 1,
    branch: 'Bolbol',
    tags: ['Gen 1', 'Rama Bolbol', 'Hermana'],
    bioSummary: 'Hija de Teófilo Bolbol y Sofía Gesrik. Casada con Oscar Guardiet.'
  },
  {
    id: 'oscar-guardiet',
    name: 'Oscar Guardiet',
    generation: 1,
    branch: 'Guardiet',
    tags: ['Gen 1', 'Rama Guardiet'],
    bioSummary: 'Hijo de Pablo Guardiet y Celia Sanchez. Esposo de Elisa Bolbol. Padre de los gemelos Pablo y Cecilia.'
  },
  // Hermanos de Oscar Guardiet (Hijos de Pablo Guardiet y Celia Sanchez)
  {
    id: 'pablo-guardiet-hijo',
    name: 'Pablo Guardiet',
    generation: 1,
    branch: 'Guardiet',
    tags: ['Gen 1', 'Rama Guardiet'],
    bioSummary: 'Hijo de Pablo Guardiet y Celia Sanchez. Hermano de Oscar Guardiet.'
  },
  {
    id: 'maria-celia-guardiet',
    name: 'María Celia Guardiet',
    generation: 1,
    branch: 'Guardiet',
    tags: ['Gen 1', 'Rama Guardiet'],
    bioSummary: 'Hija de Pablo Guardiet y Celia Sanchez. Hermana de Oscar Guardiet.'
  },
  {
    id: 'lina-guardiet',
    name: 'Lina Guardiet',
    generation: 1,
    branch: 'Guardiet',
    tags: ['Gen 1', 'Rama Guardiet'],
    bioSummary: 'Hija de Pablo Guardiet y Celia Sanchez. Casada con Sr. Mc Roullion. Madre de Memo.'
  },
  {
    id: 'sr-mc-roullion',
    name: 'Sr. Mc Roullion',
    generation: 1,
    branch: 'Mc Roullion',
    tags: ['Gen 1', 'Rama Mc Roullion'],
    bioSummary: 'Esposo de Lina Guardiet. Padre de Memo Mc Roullion.'
  },
  {
    id: 'dora-elvira-guardiet',
    name: 'Dora Elvira Guardiet',
    generation: 1,
    branch: 'Guardiet',
    tags: ['Gen 1', 'Rama Guardiet'],
    bioSummary: 'Hija de Pablo Guardiet y Celia Sanchez. Casada con Dr. Preve. Madre de Gabriela Elsa.'
  },
  {
    id: 'dr-preve',
    name: 'Dr. Preve',
    generation: 1,
    branch: 'Preve',
    tags: ['Gen 1', 'Rama Preve'],
    bioSummary: 'Esposo de Dora Elvira Guardiet. Padre de Gabriela Elsa Preve.'
  },
  {
    id: 'dolores-guardiet',
    name: 'Dolores "Rubia" Guardiet',
    generation: 1,
    branch: 'Guardiet',
    tags: ['Gen 1', 'Rama Guardiet', 'Rubia'],
    bioSummary: 'Hija de Pablo Guardiet y Celia Sanchez. Hermana de Oscar Guardiet.'
  },
  {
    id: 'elsa-guardiet',
    name: 'Elsa "Última" Guardiet',
    generation: 1,
    branch: 'Guardiet',
    tags: ['Gen 1', 'Rama Guardiet', 'Última'],
    bioSummary: 'Hija de Pablo Guardiet y Celia Sanchez. Hermana de Oscar Guardiet.'
  },
  {
    id: 'jorge-bolbol',
    name: 'Jorge "Coco" Bolbol',
    generation: 1,
    branch: 'Bolbol',
    tags: ['Gen 1', 'Rama Bolbol', 'Mellizo', 'Coco'],
    bioSummary: 'Hijo de Teófilo Bolbol con Bahíe Gesrik (Argentina). Mellizo de Alcira (Turita). Conocido como Coco.'
  },
  {
    id: 'turita-bolbol',
    name: 'Alcira "Turita" Bolbol',
    generation: 1,
    branch: 'Bolbol',
    tags: ['Gen 1', 'Rama Bolbol', 'Melliza', 'Turita'],
    bioSummary: 'Hija de Teófilo Bolbol con Bahíe Gesrik (Argentina). Melliza de Jorge (Coco). Conocida como Turita, su nombre era Alcira. Casada con Juan Manuel Vesi.'
  },
  {
    id: 'antoine-bolbol',
    name: 'Antoine Bolbol',
    generation: 1,
    branch: 'Bolbol',
    tags: ['Gen 1', 'Rama Bolbol'],
    bioSummary: 'Hijo de Teófilo Bolbol y Bahíe Gesrik (Argentina). Falleció en Córdoba a los 18 años.'
  },
  {
    id: 'juan-manuel-vesi',
    name: 'Juan Manuel Vesi',
    generation: 1,
    branch: 'Vesi',
    tags: ['Gen 1', 'Rama Vesi'],
    bioSummary: 'Esposo de Alcira "Turita" Bolbol. Padre de Juan Carlos y Gabriela Vesi.'
  },
  // Hijos de Pedro Sader y Hellen Gesrik
  {
    id: 'jorge-sader',
    name: 'Jorge "Coquito" Sader',
    generation: 1,
    branch: 'Sader',
    tags: ['Gen 1', 'Rama Sader', 'Coquito'],
    bioSummary: 'Hijo de Pedro Sader y Hellen Gesrik. Primo hermano de Zoraida, Turita y hermanos.'
  },
  {
    id: 'susana-sader',
    name: 'Susana Sader',
    generation: 1,
    branch: 'Sader',
    tags: ['Gen 1', 'Rama Sader'],
    bioSummary: 'Hija de Pedro Sader y Hellen Gesrik. Prima hermana de Zoraida, Turita y hermanos.'
  },
  {
    id: 'reina-chababo',
    name: 'Reina Chababo',
    generation: 1,
    branch: 'Chababo',
    tags: ['Gen 1', 'Rama Chababo', 'Tía Abuela'],
    bioSummary: 'Hermana de Moisés Chababo. Casada con Sr. Levin.'
  },
  {
    id: 'isaac-levin',
    name: 'Isaac Levin',
    generation: 1,
    branch: 'Levin',
    tags: ['Gen 1', 'Rama Levin'],
    bioSummary: 'Esposo de Reina Chababo. Padre de Alberto, Elías y Daniel Levin.'
  },
  {
    id: 'roberto-ballistreri',
    name: 'Roberto Ballistreri',
    generation: 1,
    branch: 'Ballistreri',
    tags: ['Gen 1', 'Rama Ballistreri', 'Patriarca'],
    bioSummary: 'Padre de Ana, Fernanda y Gabriela Ballistreri.'
  },
  {
    id: 'la-trichi',
    name: 'Ana María Baez (La Trichi)',
    generation: 1,
    branch: 'Baez',
    tags: ['Gen 1', 'Rama Baez', 'La Trichi', 'Matriarca'],
    bioSummary: 'Madre de Ana, Fernanda y Gabriela Ballistreri, hija de Olga Romero (La Tatuna).'
  },
  {
    id: 'la-pipi',
    name: 'Alicia (La Pipi)',
    generation: 1,
    branch: 'Romero',
    tags: ['Gen 1', 'Rama Romero', 'La Pipi', 'Prima de La Trichi'],
    bioSummary: 'Hija de la hermana de Olga Romero, prima de Ana María Baez (La Trichi). Casada con Ernesto.'
  },
  {
    id: 'ernesto-padre',
    name: 'Ernesto',
    generation: 1,
    branch: 'Familia Ernesto',
    tags: ['Gen 1'],
    bioSummary: 'Esposo de La Pipi.'
  },
  {
    id: 'valentina-vondarenko',
    name: 'Valentina',
    generation: 1,
    branch: 'Vondarenko',
    tags: ['Gen 1', 'Rama Vondarenko', 'Abuela de Tatiana'],
    bioSummary: 'Madre de Elena, abuela de Tatiana Vondarenko.'
  },
  // Hijos de Jacobo Chababo y Ema Trantemberg
  {
    id: 'leon-chababo-jacobo',
    name: 'León Chababo',
    birthDate: '20 de mayo de 1915',
    birthYear: '1915',
    deathDate: '19 de julio de 1915',
    deathYear: '1915',
    birthPlace: 'Pujato, Santa Fe',
    generation: 1,
    branch: 'Chababo',
    tags: ['Gen 1', 'Rama Chababo', '1º Hijo'],
    bioSummary: 'Primer hijo de Jacobo Chababo y Ema Trantemberg. Nació en Pujato (Acta Nº 55) y falleció a los dos meses en Rosario.'
  },
  {
    id: 'matilde-chababo-jacobo',
    name: 'Matilde Chababo',
    birthDate: '20 de mayo de 1916',
    birthYear: '1916',
    birthPlace: 'Rosario, Santa Fe',
    generation: 1,
    branch: 'Chababo',
    tags: ['Gen 1', 'Rama Chababo', '2ª Hija'],
    bioSummary: 'Segunda hija de Jacobo Chababo y Ema Trantemberg. Nació en Rosario (Acta Nº 1125, 2ª Sección).'
  },
  {
    id: 'marcos-chababo-jacobo',
    name: 'Marcos Chababo',
    birthDate: '17 de julio de 1917',
    birthYear: '1917',
    birthPlace: 'Zavalla, Santa Fe',
    generation: 1,
    branch: 'Chababo',
    tags: ['Gen 1', 'Rama Chababo', '3º Hijo'],
    bioSummary: 'Tercer hijo de Jacobo Chababo y Ema Trantemberg. Nació en Zavalla (Acta Nº 117).'
  },
  {
    id: 'esther-chababo-jacobo-1',
    name: 'Esther Chababo (1ª)',
    birthDate: '16 de febrero de 1920',
    birthYear: '1920',
    deathDate: '16 de abril de 1920',
    deathYear: '1920',
    birthPlace: 'Rosario, Santa Fe',
    generation: 1,
    branch: 'Chababo',
    tags: ['Gen 1', 'Rama Chababo', '4ª Hija'],
    bioSummary: 'Cuarta hija de Jacobo Chababo y Ema Trantemberg. Nació en Rosario (Acta Nº 209) y falleció a los dos meses (Acta Nº 230).'
  },
  {
    id: 'flora-chababo-jacobo',
    name: 'Flora Chababo',
    birthDate: '10 de septiembre de 1921',
    birthYear: '1921',
    birthPlace: 'Rosario, Santa Fe',
    generation: 1,
    branch: 'Chababo',
    tags: ['Gen 1', 'Rama Chababo', '5ª Hija', 'Prima de Moisés'],
    bioSummary: 'Quinta hija de Jacobo Chababo y Ema Trantemberg. Prima hermana de Moisés Chababo. Casada con Sr. Dahan, madre de Esther Nieve Dahan (abuela de Daniel, Gabriel Eduardo y Mauricio Ades). Nació en Rosario (Acta Nº 1405, 5ª Sección).'
  },
  {
    id: 'sr-dahan',
    name: 'Sr. Dahan',
    generation: 1,
    branch: 'Dahan',
    tags: ['Gen 1', 'Rama Dahan'],
    bioSummary: 'Esposo de Flora Chababo. Padre de Esther Nieve Dahan.'
  },
  {
    id: 'esther-chababo-jacobo-2',
    name: 'Esther Chababo',
    birthDate: '15 de diciembre de 1923',
    birthYear: '1923',
    birthPlace: 'Rosario, Santa Fe',
    generation: 1,
    branch: 'Chababo',
    tags: ['Gen 1', 'Rama Chababo', '6ª Hija'],
    bioSummary: 'Sexta hija de Jacobo Chababo y Ema Trantemberg. Nació en Rosario (Acta Nº 1544, 1ª Sección).'
  },
  {
    id: 'luis-ramon-chababo',
    name: 'Luis Ramón Chababo',
    birthDate: '27 de octubre de 1924',
    birthYear: '1924',
    birthPlace: 'San Gerónimo, Santa Fe',
    generation: 1,
    branch: 'Chababo',
    tags: ['Gen 1', 'Rama Chababo', '7º Hijo'],
    bioSummary: 'Séptimo hijo de Jacobo Chababo y Ema Trantemberg. Nació en San Gerónimo (Acta Nº 82).'
  },
  {
    id: 'samuel-nisim-chababo',
    name: 'Samuel Nisim Chababo',
    birthDate: '27 de enero de 1926',
    birthYear: '1926',
    birthPlace: 'Puerto Tirol, Chaco',
    generation: 1,
    branch: 'Chababo',
    tags: ['Gen 1', 'Rama Chababo', '8º Hijo'],
    bioSummary: 'Octavo hijo de Jacobo Chababo y Ema Trantemberg. Padre de Rubén, Susana y Silvia Chababo. Nació en Puerto Tirol, Chaco (Acta Nº 12).'
  },
  {
    id: 'raquel-chababo-jacobo',
    name: 'Raquel Chababo',
    birthDate: '19 de junio de 1927',
    birthYear: '1927',
    birthPlace: 'Rosario, Santa Fe',
    generation: 1,
    branch: 'Chababo',
    tags: ['Gen 1', 'Rama Chababo', '9ª Hija'],
    bioSummary: 'Novena hija de Jacobo Chababo y Ema Trantemberg. Nació en Rosario (Acta Nº 1463, 5ª Sección).'
  },
  {
    id: 'alberto-chababo-jacobo',
    name: 'Alberto Chababo',
    birthDate: '7 de noviembre de 1928',
    birthYear: '1928',
    birthPlace: 'Puerto Tirol, Chaco',
    generation: 1,
    branch: 'Chababo',
    tags: ['Gen 1', 'Rama Chababo', '10º Hijo'],
    bioSummary: 'Décimo hijo de Jacobo Chababo y Ema Trantemberg. Nació en Puerto Tirol, Chaco (Acta Nº 201).'
  },
  {
    id: 'judas-chababo',
    name: 'Judas "Julio" Chababo',
    birthDate: '11 de mayo de 1930',
    birthYear: '1930',
    birthPlace: 'Puerto Tirol, Chaco',
    generation: 1,
    branch: 'Chababo',
    tags: ['Gen 1', 'Rama Chababo', '11º Hijo', 'Julio'],
    bioSummary: 'Undécimo hijo de Jacobo Chababo y Ema Trantemberg. Conocido como Julio. Padre de Carlos Chababo. Nació en Puerto Tirol, Chaco (Acta Nº 71).'
  },
  {
    id: 'lidia-chababo',
    name: 'Lidia Chababo',
    birthDate: '30 de agosto de 1931',
    birthYear: '1931',
    birthPlace: 'Puerto Tirol, Chaco',
    generation: 1,
    branch: 'Chababo',
    tags: ['Gen 1', 'Rama Chababo', '12ª Hija'],
    bioSummary: 'Duodécima hija de Jacobo Chababo y Ema Trantemberg. Nació en Puerto Tirol, Chaco (Acta Nº 1431).'
  },
  {
    id: 'zulema-chababo',
    name: 'Elena Zulma "Zulema" Chababo',
    birthDate: '13 de abril de 1934',
    birthYear: '1934',
    birthPlace: 'Resistencia, Chaco',
    generation: 1,
    branch: 'Chababo',
    tags: ['Gen 1', 'Rama Chababo', '13ª Hija', 'Zulema'],
    bioSummary: 'Decimotercera hija de Jacobo Chababo y Ema Trantemberg. Nació en Resistencia, Chaco (Acta Nº 349).'
  },
  // ==========================================
  // --- Descendencia de los Hermanos Bolbol (Gen 1) ---
  // ==========================================
  // Hijos de Miguel Bolbol
  {
    id: 'ruben-bolbol-miguel',
    name: 'Rubén Bolbol',
    generation: 1,
    branch: 'Bolbol',
    tags: ['Gen 1', 'Rama Bolbol'],
    bioSummary: 'Hijo de Miguel Bolbol. Tuvo un primer matrimonio con María "Maruca" Cantador (padres de Nora y Jorge) y un segundo matrimonio con Gladys (padres de Isabel, Leonor y Miguel).'
  },
  {
    id: 'maria-maruca-cantador',
    name: 'María "Maruca" Cantador',
    generation: 1,
    branch: 'Cantador',
    tags: ['Gen 1', 'Rama Cantador', '1ª Esposa'],
    bioSummary: 'Primera esposa de Rubén Bolbol. Madre de Nora y Jorge.'
  },
  {
    id: 'gladys-esposa-ruben',
    name: 'Gladys',
    generation: 1,
    branch: 'Bolbol',
    tags: ['Gen 1', 'Rama Bolbol', '2ª Esposa'],
    bioSummary: 'Segunda esposa de Rubén Bolbol. Madre de Isabel, Leonor y Miguel.'
  },
  {
    id: 'victor-bolbol',
    name: 'Víctor Bolbol',
    generation: 1,
    branch: 'Bolbol',
    tags: ['Gen 1', 'Rama Bolbol'],
    bioSummary: 'Hijo de Miguel Bolbol. Casado con Angelita Telesca. Padre del Dr. Miguel, Victoria, Alcira y Jorge.'
  },
  {
    id: 'angelita-telesca',
    name: 'Angelita Telesca',
    generation: 1,
    branch: 'Telesca',
    tags: ['Gen 1', 'Rama Telesca'],
    bioSummary: 'Esposa de Víctor Bolbol. Madre del Dr. Miguel, Victoria, Alcira y Jorge.'
  },

  // Hijos de Labibi Bolbol
  {
    id: 'matilde-alcira-belune',
    name: 'Matilde Alcira Belune',
    generation: 1,
    branch: 'Belune',
    tags: ['Gen 1', 'Rama Belune'],
    bioSummary: 'Hija de Labibi Bolbol. Casada con Ernesto "Tito" Zacco.'
  },
  {
    id: 'ernesto-tito-zacco',
    name: 'Ernesto "Tito" Zacco',
    generation: 1,
    branch: 'Zacco',
    tags: ['Gen 1', 'Rama Zacco'],
    bioSummary: 'Esposo de Matilde Alcira Belune.'
  },
  {
    id: 'emiliz-bolbol',
    name: 'Emiliz',
    generation: 1,
    branch: 'Bolbol',
    tags: ['Gen 1', 'Rama Bolbol'],
    bioSummary: 'Hija de Labibi Bolbol. Casada con Sr. Moll (Pellegrini y Sarmiento). Madre de Juan José Moll.'
  },
  {
    id: 'sr-moll',
    name: 'Sr. Moll',
    generation: 1,
    branch: 'Moll',
    tags: ['Gen 1', 'Rama Moll'],
    bioSummary: 'Esposo de Emiliz. Padre de Juan José Moll (Inmobiliaria).'
  },

  // Hijos de Afife Bolbol (Buenos Aires)
  {
    id: 'felipe-afife',
    name: 'Felipe',
    generation: 1,
    branch: 'Bolbol',
    tags: ['Gen 1', 'Rama Bolbol', 'Buenos Aires'],
    bioSummary: 'Hijo de Afife Bolbol.'
  },
  {
    id: 'jose-afife',
    name: 'José',
    generation: 1,
    branch: 'Bolbol',
    tags: ['Gen 1', 'Rama Bolbol', 'Buenos Aires'],
    bioSummary: 'Hijo de Afife Bolbol.'
  },
  {
    id: 'jorge-afife',
    name: 'Jorge',
    generation: 1,
    branch: 'Bolbol',
    tags: ['Gen 1', 'Rama Bolbol', 'Buenos Aires'],
    bioSummary: 'Hijo de Afife Bolbol.'
  },
  {
    id: 'alcira-afife',
    name: 'Alcira',
    generation: 1,
    branch: 'Bolbol',
    tags: ['Gen 1', 'Rama Bolbol', 'Buenos Aires'],
    bioSummary: 'Hija de Afife Bolbol.'
  },
  {
    id: 'rosa-afife',
    name: 'Rosa',
    generation: 1,
    branch: 'Bolbol',
    tags: ['Gen 1', 'Rama Bolbol', 'Buenos Aires'],
    bioSummary: 'Hija de Afife Bolbol.'
  },
  {
    id: 'elias-afife',
    name: 'Elías',
    generation: 1,
    branch: 'Bolbol',
    tags: ['Gen 1', 'Rama Bolbol', 'Buenos Aires'],
    bioSummary: 'Hijo de Afife Bolbol.'
  },

  // Hijos de Frosina Bolbol
  {
    id: 'jorge-betabe',
    name: 'Jorge Betabe',
    generation: 1,
    branch: 'Betabe',
    tags: ['Gen 1', 'Rama Betabe'],
    bioSummary: 'Hijo de Frosina Bolbol. Padre de Elías Betabe.'
  },
  {
    id: 'ebrain-frosina',
    name: 'Ebrain',
    generation: 1,
    branch: 'Bolbol',
    tags: ['Gen 1', 'Rama Bolbol'],
    bioSummary: 'Hijo de Frosina Bolbol. Padre de Antonio.'
  },
  {
    id: 'alcira-bitar',
    name: 'Alcira Bitar',
    generation: 1,
    branch: 'Bitar',
    tags: ['Gen 1', 'Rama Bitar'],
    bioSummary: 'Hija de Frosina Bolbol. De la firma Bitar Hnos (27 de Febrero y Paraguay).'
  },

  // Hijos de Camilo Bolbol y Tía Antonia
  {
    id: 'jorge-sodero-bolbol',
    name: 'Jorge Bolbol',
    generation: 1,
    branch: 'Bolbol',
    tags: ['Gen 1', 'Rama Bolbol', 'Sodero (Profesión)'],
    bioSummary: 'Hijo de Camilo Bolbol y Tía Antonia. De profesión sodero. Casado con Elena, padre de Jorge.'
  },
  {
    id: 'elena-esposa-sodero',
    name: 'Elena',
    generation: 1,
    branch: 'Bolbol',
    tags: ['Gen 1', 'Rama Bolbol'],
    bioSummary: 'Esposa de Jorge Bolbol. Madre de Jorge.'
  },
  {
    id: 'bebe-bolbol',
    name: 'Bebe Bolbol',
    generation: 1,
    branch: 'Bolbol',
    tags: ['Gen 1', 'Rama Bolbol'],
    bioSummary: 'Hijo/a de Camilo Bolbol y Tía Antonia. Padre/Madre de Mónica.'
  },

  // Hijos de Ignacio Bolbol y Irma Bernal
  {
    id: 'alcira-bolbol-ignacio',
    name: 'Alcira Bolbol',
    generation: 1,
    branch: 'Bolbol',
    tags: ['Gen 1', 'Rama Bolbol'],
    bioSummary: 'Hija de Ignacio Bolbol y Irma Bernal.'
  },
  {
    id: 'irma-charo-bolbol',
    name: 'Irma "Charo" Bolbol',
    generation: 1,
    branch: 'Bolbol',
    tags: ['Gen 1', 'Rama Bolbol', 'Charo'],
    bioSummary: 'Hija de Ignacio Bolbol y Irma Bernal. Casada con Eduardo Iamónico. Madre de Nadir y Romina.'
  },
  {
    id: 'eduardo-iamonico',
    name: 'Eduardo Iamónico',
    generation: 1,
    branch: 'Iamónico',
    tags: ['Gen 1', 'Rama Iamónico'],
    bioSummary: 'Esposo de Irma "Charo" Bolbol. Padre de Nadir y Romina.'
  },

  // Hijos de Sobji Bolbol y Juana Sauan
  {
    id: 'rosita-bolbol',
    name: 'Rosita Bolbol',
    generation: 1,
    branch: 'Bolbol',
    tags: ['Gen 1', 'Rama Bolbol'],
    bioSummary: 'Hija de Sobji Bolbol y Juana Sauan.'
  },
  {
    id: 'alcira-bolbol-sobji',
    name: 'Alcira Bolbol',
    generation: 1,
    branch: 'Bolbol',
    tags: ['Gen 1', 'Rama Bolbol'],
    bioSummary: 'Hija de Sobji Bolbol y Juana Sauan.'
  },
  {
    id: 'eva-argentina-bolbol',
    name: 'Eva Argentina Bolbol',
    generation: 1,
    branch: 'Bolbol',
    tags: ['Gen 1', 'Rama Bolbol'],
    bioSummary: 'Hija de Sobji Bolbol y Juana Sauan.'
  },
  {
    id: 'maria-argentina-bolbol',
    name: 'María Argentina Bolbol',
    generation: 1,
    branch: 'Bolbol',
    tags: ['Gen 1', 'Rama Bolbol'],
    bioSummary: 'Hija de Sobji Bolbol y Juana Sauan.'
  },
  // Hijos de Antoine Jordan y Mary Louise Gaywood
  {
    id: 'ralph-jordan',
    name: 'Raúl "Ralph" Jordan',
    generation: 1,
    branch: 'Jordan',
    tags: ['Gen 1', 'Rama Jordan'],
    bioSummary: 'Hijo de Antoine Jordan y Mary Louise Gaywood. Tuvo 4 hijas con su primera esposa Peggy Wilson y 3 hijos con su esposa actual Alejandra Flores.'
  },
  {
    id: 'peggy-wilson',
    name: 'Peggy Wilson Jordan',
    generation: 1,
    branch: 'Wilson',
    tags: ['Gen 1', 'Rama Wilson', 'Ex-esposa'],
    bioSummary: 'Primera esposa de Raúl "Ralph" Jordan. Madre de Kimberly Elizabeth, Tiffany Anne, Allison Nicole y Rebekah Jordan.'
  },
  {
    id: 'alejandra-flores',
    name: 'Alejandra Flores-Jordan',
    generation: 1,
    branch: 'Flores',
    tags: ['Gen 1', 'Rama Flores', 'Esposa'],
    bioSummary: 'Esposa actual de Raúl "Ralph" Jordan. Madre de Sebastian Philippe, Paulina e Isobel Jordan.'
  },
  {
    id: 'philip-jordan',
    name: 'Philippe Juan Guillermo Jordan',
    generation: 1,
    branch: 'Jordan',
    tags: ['Gen 1', 'Rama Jordan'],
    bioSummary: 'Hijo de Antoine Jordan y Mary Louise Gaywood. Esposo de Beatriz Molina. Padre de Romina Eunice y Rocío Esperanza Jordan.'
  },
  {
    id: 'beatriz-molina',
    name: 'Beatriz Molina',
    generation: 1,
    branch: 'Molina',
    tags: ['Gen 1', 'Rama Molina'],
    bioSummary: 'Esposa de Philippe Juan Guillermo Jordan. Madre de Romina Eunice y Rocío Esperanza Jordan.'
  },
  {
    id: 'ariane-jordan',
    name: 'Ariane Jordan',
    generation: 1,
    branch: 'Jordan',
    tags: ['Gen 1', 'Rama Jordan'],
    bioSummary: 'Hija de Antoine Jordan y Mary Louise Gaywood. Madre de Angelina Jordan con Said Sayed.'
  },
  {
    id: 'said-sayed',
    name: 'Said Sayed',
    birthPlace: 'Marruecos',
    generation: 1,
    branch: 'Sayed',
    tags: ['Gen 1', 'Rama Sayed', 'Marruecos'],
    bioSummary: 'Padre de Angelina Jordan con Ariane Jordan. Originario de Marruecos.'
  },
  {
    id: 'adela-chababo',
    name: 'Adela Chababo',
    generation: 1,
    branch: 'Chababo',
    tags: ['Gen 1', 'Rama Chababo'],
    bioSummary: 'Hija de Jaime Chababo y Basilia Susman.'
  },
  {
    id: 'esther-chababo',
    name: 'Esther Chababo',
    generation: 1,
    branch: 'Chababo',
    tags: ['Gen 1', 'Rama Chababo'],
    bioSummary: 'Hija de Jaime Chababo y Basilia Susman. Pareja de Gerardo.'
  },
  {
    id: 'gerardo',
    name: 'Gerardo',
    generation: 1,
    branch: 'Chababo',
    tags: ['Gen 1', 'Pareja'],
    bioSummary: 'Pareja de Esther Chababo.'
  },
  {
    id: 'rafael-chababo',
    name: 'Rafael Chababo',
    generation: 1,
    branch: 'Chababo',
    tags: ['Gen 1', 'Rama Chababo'],
    bioSummary: 'Hijo de Jaime Chababo y Basilia Susman. Esposo de Blanca.'
  },
  {
    id: 'blanca',
    name: 'Blanca',
    generation: 1,
    branch: 'Chababo',
    tags: ['Gen 1', 'Rama Chababo'],
    bioSummary: 'Esposa de Rafael Chababo. Madre de Mario, Patricia y Maria Laura.'
  },
  {
    id: 'adolfo-chababo',
    name: 'Adolfo Chababo',
    generation: 1,
    branch: 'Chababo',
    tags: ['Gen 1', 'Rama Chababo'],
    bioSummary: 'Hijo de Jaime Chababo y Basilia Susman. Esposo de Nevy.'
  },
  {
    id: 'nevy-chababo',
    name: 'Nevy',
    generation: 1,
    branch: 'Chababo',
    tags: ['Gen 1', 'Rama Chababo'],
    bioSummary: 'Esposa de Adolfo Chababo. Madre de Cecilia Matilde y Patricio Chababo.'
  },
  {
    id: 'pepe-ballistreri',
    name: 'Pepe Ballistreri',
    generation: 1,
    branch: 'Ballistreri',
    tags: ['Gen 1', 'Rama Ballistreri'],
    bioSummary: 'Hermano de Roberto Ballistreri y Catalina Ballistreri. Esposo de La Chubi.'
  },
  {
    id: 'la-chubi',
    name: 'La Chubi',
    generation: 1,
    branch: 'Ballistreri',
    tags: ['Gen 1', 'Rama Ballistreri'],
    bioSummary: 'Esposa de Pepe Ballistreri. Madre de Karina y Daniel Ballistreri.'
  },
  {
    id: 'catalina-ballistreri-hermana',
    name: 'Catalina Ballistreri',
    generation: 1,
    branch: 'Ballistreri',
    tags: ['Gen 1', 'Rama Ballistreri'],
    bioSummary: 'Hermana de Roberto Ballistreri y Pepe Ballistreri.'
  },
  {
    id: 'graciela-maria-martino',
    name: 'Graciela María Martino',
    generation: 1,
    branch: 'Martino',
    tags: ['Gen 1', 'Rama Martino', 'Pariente Ballistreri'],
    bioSummary: 'Pariente de la familia Ballistreri. Madre de Mariangeles y Cecilia Sciutto.'
  },

  // ==========================================
  // --- GENERACIÓN 2 (Padres, Tíos y Primos) ---
  // ==========================================
  {
    id: 'roberto-chababo',
    name: 'Roberto Salomón Chababo (Roly)',
    birthDate: '14 de agosto de 1961',
    birthYear: '1961',
    generation: 2,
    branch: 'Chababo',
    tags: ['Gen 2', 'Rama Chababo'],
    bioSummary: 'Hijo de Moisés y Zoraida, hermano de Jorge y Claudia. Conocido cariñosamente como Roly.'
  },
  {
    id: 'alejandra-halek',
    name: 'Alejandra Halek',
    generation: 2,
    branch: 'Halek',
    tags: ['Gen 2', 'Rama Halek'],
    bioSummary: 'Esposa de Roberto Salomón Chababo (Roly).'
  },
  {
    id: 'jorge-chababo',
    name: 'Jorge Chababo',
    birthDate: '14 de mayo de 1963',
    birthYear: '1963',
    generation: 2,
    branch: 'Chababo',
    tags: ['Gen 2', 'Rama Chababo'],
    bioSummary: 'Padre de Matías e Iván.'
  },
  {
    id: 'ana-ballistreri',
    name: 'Ana Claudia Ballistreri',
    birthDate: '10 de octubre de 1965',
    birthYear: '1965',
    deathDate: '28 de septiembre de 2006',
    deathYear: '2006',
    generation: 2,
    branch: 'Ballistreri',
    tags: ['Gen 2', 'Rama Ballistreri'],
    bioSummary: 'Madre de Matías e Iván, hija de Roberto Ballistreri y Ana María Baez (La Trichi).'
  },
  {
    id: 'claudia-chababo',
    name: 'Claudia Chababo',
    birthDate: '26 de agosto de 1960',
    birthYear: '1960',
    generation: 2,
    branch: 'Chababo',
    tags: ['Gen 2', 'Rama Chababo'],
    bioSummary: 'Hija de Moisés y Zoraida, hermana de Roberto y Jorge.'
  },
  {
    id: 'david-evlagon',
    name: 'David Evlagon',
    generation: 2,
    branch: 'Evlagon',
    tags: ['Gen 2', 'Rama Evlagon'],
    bioSummary: 'Esposo de Claudia Chababo.'
  },
  {
    id: 'alberto-levin',
    name: 'Alberto Levin',
    generation: 2,
    branch: 'Levin',
    tags: ['Gen 2', 'Rama Levin'],
    bioSummary: 'Hijo de Reina Chababo y Sr. Levin, esposo de Kuki.'
  },
  {
    id: 'kuki',
    name: 'Kuki',
    generation: 2,
    branch: 'Levin',
    tags: ['Gen 2', 'Rama Levin'],
    bioSummary: 'Esposa de Alberto Levin.'
  },
  {
    id: 'elias-levin',
    name: 'Elías Levin',
    generation: 2,
    branch: 'Levin',
    tags: ['Gen 2', 'Rama Levin'],
    bioSummary: 'Hijo de Reina Chababo y Sr. Levin, hermano de Alberto y Daniel Levin.'
  },
  {
    id: 'daniel-levin',
    name: 'Daniel Levin',
    generation: 2,
    branch: 'Levin',
    tags: ['Gen 2', 'Rama Levin'],
    bioSummary: 'Hijo de Reina Chababo y Sr. Levin, hermano de Alberto y Elías Levin.'
  },
  {
    id: 'fernanda-ballistreri',
    name: 'María Fernanda Ballistreri',
    generation: 2,
    branch: 'Ballistreri',
    tags: ['Gen 2', 'Rama Ballistreri'],
    bioSummary: 'Hija de Roberto Ballistreri y La Trichi, hermana de Ana y Gabriela.'
  },
  {
    id: 'juan-isassa',
    name: 'Juan Isassa',
    generation: 2,
    branch: 'Isassa',
    tags: ['Gen 2', 'Rama Isassa'],
    bioSummary: 'Esposo de María Fernanda Ballistreri.'
  },
  {
    id: 'gabriela-ballistreri',
    name: 'María Gabriela Ballistreri',
    generation: 2,
    branch: 'Ballistreri',
    tags: ['Gen 2', 'Rama Ballistreri'],
    bioSummary: 'Hija de Roberto Ballistreri y La Trichi, hermana de Ana y Fernanda.'
  },
  {
    id: 'fabian-romeo',
    name: 'Fabián Eduardo Romeo',
    generation: 2,
    branch: 'Romeo',
    tags: ['Gen 2', 'Rama Romeo'],
    bioSummary: 'Esposo de María Gabriela Ballistreri, padre de Lara y Maite.'
  },
  {
    id: 'victoria',
    name: 'Victoria',
    generation: 2,
    branch: 'Familia Ernesto',
    tags: ['Gen 2'],
    bioSummary: 'Hija de La Pipi y Ernesto.'
  },
  {
    id: 'mariana',
    name: 'Mariana',
    generation: 2,
    branch: 'Familia Ernesto',
    tags: ['Gen 2'],
    bioSummary: 'Hija de La Pipi y Ernesto.'
  },
  {
    id: 'ernesto-hijo',
    name: 'Ernesto (hijo)',
    generation: 2,
    branch: 'Familia Ernesto',
    tags: ['Gen 2'],
    bioSummary: 'Hijo de La Pipi y Ernesto.'
  },
  // Hijos de Elisa Bolbol y Oscar Guardiet
  {
    id: 'pablo-guardiet',
    name: 'Pablo Guardiet',
    generation: 2,
    branch: 'Guardiet',
    tags: ['Gen 2', 'Rama Guardiet', 'Gemelo'],
    bioSummary: 'Hijo de Elisa Bolbol y Oscar Guardiet. Hermano gemelo de Cecilia.'
  },
  {
    id: 'cecilia-guardiet',
    name: 'Cecilia Guardiet',
    generation: 2,
    branch: 'Guardiet',
    tags: ['Gen 2', 'Rama Guardiet', 'Gemela'],
    bioSummary: 'Hija de Elisa Bolbol y Oscar Guardiet. Hermana gemela de Pablo.'
  },
  // Hijos de Nelly Bolbol y Oscar Goytia
  {
    id: 'oscarcito-goytia',
    name: 'Oscar Goytia (hijo)',
    generation: 2,
    branch: 'Goytia',
    tags: ['Gen 2', 'Rama Goytia', 'Oscarcito'],
    bioSummary: 'Hijo de Nelly Bolbol y Oscar Goytia. Casado con Liliana Santa Cruz.'
  },
  {
    id: 'liliana-santa-cruz',
    name: 'Liliana Santa Cruz',
    generation: 2,
    branch: 'Santa Cruz',
    tags: ['Gen 2', 'Rama Santa Cruz'],
    bioSummary: 'Esposa de Oscar Goytia (hijo).'
  },
  {
    id: 'patricia-goytia',
    name: 'Patricia Goytia',
    generation: 2,
    branch: 'Goytia',
    tags: ['Gen 2', 'Rama Goytia'],
    bioSummary: 'Hija de Nelly Bolbol y Oscar Goytia, hermana de Oscarcito. Casada con Eduardo Coccolo.'
  },
  {
    id: 'eduardo-coccolo',
    name: 'Eduardo Coccolo',
    generation: 2,
    branch: 'Coccolo',
    tags: ['Gen 2', 'Rama Coccolo'],
    bioSummary: 'Esposo de Patricia Goytia. Padre de Rodrigo.'
  },
  // Hijos de Julia Bolbol y Emilio Bonsignore
  {
    id: 'daniel-bonsignore',
    name: 'Daniel Bonsignore',
    generation: 2,
    branch: 'Bonsignore',
    tags: ['Gen 2', 'Rama Bonsignore'],
    bioSummary: 'Hijo de Julia Bolbol y Emilio "Cacho" Bonsignore.'
  },
  {
    id: 'liliana-bonsignore',
    name: 'Liliana Bonsignore',
    generation: 2,
    branch: 'Bonsignore',
    tags: ['Gen 2', 'Rama Bonsignore'],
    bioSummary: 'Hija de Julia Bolbol y Emilio "Cacho" Bonsignore. Casada con Andrés Gagliardi.'
  },
  {
    id: 'andres-gagliardi',
    name: 'Andrés Gagliardi',
    generation: 2,
    branch: 'Gagliardi',
    tags: ['Gen 2', 'Rama Gagliardi'],
    bioSummary: 'Esposo de Liliana Bonsignore. Padre de Franco.'
  },
  {
    id: 'carlos-javier-bonsignore',
    name: 'Carlos Javier Bonsignore (Cachito)',
    generation: 2,
    branch: 'Bonsignore',
    tags: ['Gen 2', 'Rama Bonsignore'],
    bioSummary: 'Hijo de Julia Bolbol y Emilio "Cacho" Bonsignore.'
  },
  // Hijos de Gloria Bolbol y Karim Yebne
  {
    id: 'basilio-yebne',
    name: 'Basilio Yebne',
    generation: 2,
    branch: 'Yebne',
    tags: ['Gen 2', 'Rama Yebne'],
    bioSummary: 'Hijo de Gloria Bolbol y Karim Yebne. Casado con Gabriela Dinucchi. Padre de Mauricio.'
  },
  {
    id: 'gabriela-dinucchi',
    name: 'Gabriela Dinucchi',
    generation: 2,
    branch: 'Dinucchi',
    tags: ['Gen 2', 'Rama Dinucchi'],
    bioSummary: 'Esposa de Basilio Yebne. Madre de Mauricio.'
  },
  {
    id: 'jorge-yebne',
    name: 'Jorge Yebne',
    generation: 2,
    branch: 'Yebne',
    tags: ['Gen 2', 'Rama Yebne'],
    bioSummary: 'Hijo de Gloria Bolbol y Karim Yebne. Esposo de Marta Irene. Padre de Carina, Facundo, Sebastián, Vicky y Ezequiel.'
  },
  {
    id: 'marta-irene',
    name: 'Marta Irene',
    generation: 2,
    branch: 'Yebne',
    tags: ['Gen 2', 'Rama Yebne'],
    bioSummary: 'Esposa de Jorge Yebne. Madre de Carina, Facundo, Sebastián, Vicky y Ezequiel.'
  },
  {
    id: 'teresa-yebne',
    name: 'Teresa Yebne',
    generation: 2,
    branch: 'Yebne',
    tags: ['Gen 2', 'Rama Yebne'],
    bioSummary: 'Hija de Gloria Bolbol y Karim Yebne. Casada con Rogelio Fernandez. Madre de "Cartofle".'
  },
  {
    id: 'rogelio-fernandez',
    name: 'Rogelio Fernandez',
    generation: 2,
    branch: 'Fernandez',
    tags: ['Gen 2', 'Rama Fernandez'],
    bioSummary: 'Esposo de Teresa Yebne. Padre de "Cartofle".'
  },
  // Hijos de Turita (Alcira) Bolbol y Juan Manuel Vesi
  {
    id: 'juan-carlos-vesi',
    name: 'Juan Carlos Vesi',
    generation: 2,
    branch: 'Vesi',
    tags: ['Gen 2', 'Rama Vesi'],
    bioSummary: 'Hijo de Alcira "Turita" Bolbol y Juan Manuel Vesi.'
  },
  {
    id: 'gabriela-vesi',
    name: 'Gabriela Vesi',
    generation: 2,
    branch: 'Vesi',
    tags: ['Gen 2', 'Rama Vesi'],
    bioSummary: 'Hija de Alcira "Turita" Bolbol y Juan Manuel Vesi.'
  },
  {
    id: 'elena-vondarenko',
    name: 'Elena Vondarenko',
    generation: 2,
    branch: 'Vondarenko',
    tags: ['Gen 2', 'Rama Vondarenko', 'Madre de Tatiana'],
    bioSummary: 'Hija de Valentina, madre de Tatiana Vondarenko.'
  },
  // Descendencia de Samuel Nisim Chababo
  {
    id: 'ruben-chababo',
    name: 'Rubén Chababo',
    generation: 2,
    branch: 'Chababo',
    tags: ['Gen 2', 'Rama Chababo'],
    bioSummary: 'Hijo de Samuel Nisim Chababo, hermano de Susana y Silvia Chababo. Sobrino segundo de Moisés Chababo.'
  },
  {
    id: 'susana-chababo',
    name: 'Susana Chababo',
    generation: 2,
    branch: 'Chababo',
    tags: ['Gen 2', 'Rama Chababo'],
    bioSummary: 'Hija de Samuel Nisim Chababo, hermana de Rubén y Silvia Chababo.'
  },
  {
    id: 'silvia-chababo',
    name: 'Silvia Chababo',
    generation: 2,
    branch: 'Chababo',
    tags: ['Gen 2', 'Rama Chababo'],
    bioSummary: 'Hija de Samuel Nisim Chababo, hermana de Rubén y Susana Chababo.'
  },
  // Descendencia de Judas "Julio" Chababo
  {
    id: 'carlos-chababo',
    name: 'Carlos Chababo',
    generation: 2,
    branch: 'Chababo',
    tags: ['Gen 2', 'Rama Chababo'],
    bioSummary: 'Hijo de Judas "Julio" Chababo. Primo de Rubén, Susana, Silvia y de la rama de Moisés Chababo.'
  },
  // Descendencia de Flora Chababo y Sr. Dahan
  {
    id: 'esther-nieve-dahan',
    name: 'Esther Nieve Dahan',
    generation: 2,
    branch: 'Dahan',
    tags: ['Gen 2', 'Rama Dahan'],
    bioSummary: 'Hija de Flora Chababo y Sr. Dahan. Casada con José Ades. Madre de Daniel, Gabriel Eduardo y Mauricio Ades.'
  },
  {
    id: 'jose-ades',
    name: 'José Ades',
    generation: 2,
    branch: 'Ades',
    tags: ['Gen 2', 'Rama Ades'],
    bioSummary: 'Esposo de Esther Nieve Dahan. Padre de Daniel, Gabriel Eduardo y Mauricio Ades.'
  },
  // Descendencia de Raúl "Ralph" Jordan y Peggy Wilson
  {
    id: 'kimberly-jordan',
    name: 'Kimberly Elizabeth Jordan',
    generation: 2,
    branch: 'Jordan',
    tags: ['Gen 2', 'Rama Jordan', '1ª Hija'],
    bioSummary: 'Hija de Raúl "Ralph" Jordan y Peggy Wilson.'
  },
  {
    id: 'tiffany-jordan',
    name: 'Tiffany Anne Jordan',
    generation: 2,
    branch: 'Jordan',
    tags: ['Gen 2', 'Rama Jordan', '2ª Hija'],
    bioSummary: 'Hija de Raúl "Ralph" Jordan y Peggy Wilson.'
  },
  {
    id: 'allison-jordan',
    name: 'Allison Nicole Jordan',
    generation: 2,
    branch: 'Jordan',
    tags: ['Gen 2', 'Rama Jordan', '3ª Hija'],
    bioSummary: 'Hija de Raúl "Ralph" Jordan y Peggy Wilson.'
  },
  {
    id: 'rebekah-jordan',
    name: 'Rebekah Jordan',
    generation: 2,
    branch: 'Jordan',
    tags: ['Gen 2', 'Rama Jordan', '4ª Hija'],
    bioSummary: 'Hija de Raúl "Ralph" Jordan y Peggy Wilson.'
  },
  // Descendencia de Raúl "Ralph" Jordan y Alejandra Flores
  {
    id: 'sebastian-philippe-jordan',
    name: 'Sebastian Philippe Jordan',
    generation: 2,
    branch: 'Jordan',
    tags: ['Gen 2', 'Rama Jordan'],
    bioSummary: 'Hijo de Raúl "Ralph" Jordan y Alejandra Flores.'
  },
  {
    id: 'paulina-jordan',
    name: 'Paulina Jordan',
    generation: 2,
    branch: 'Jordan',
    tags: ['Gen 2', 'Rama Jordan'],
    bioSummary: 'Hija de Raúl "Ralph" Jordan y Alejandra Flores.'
  },
  {
    id: 'isobel-jordan',
    name: 'Isobel Jordan',
    generation: 2,
    branch: 'Jordan',
    tags: ['Gen 2', 'Rama Jordan'],
    bioSummary: 'Hija de Raúl "Ralph" Jordan y Alejandra Flores.'
  },
  // Descendencia de Philippe Juan Guillermo Jordan y Beatriz Molina
  {
    id: 'romina-eunice-jordan',
    name: 'Romina Eunice Jordan',
    generation: 2,
    branch: 'Jordan',
    tags: ['Gen 2', 'Rama Jordan'],
    bioSummary: 'Primera hija de Philippe Juan Guillermo Jordan y Beatriz Molina. Madre de Nafees Bermudas-Jordan con Sky Bermudas.'
  },
  {
    id: 'sky-bermudas',
    name: 'Sky Bermudas',
    generation: 2,
    branch: 'Bermudas',
    tags: ['Gen 2', 'Rama Bermudas'],
    bioSummary: 'Padre de Nafees Bermudas-Jordan junto a Romina Eunice Jordan.'
  },
  {
    id: 'rocio-esperanza-jordan',
    name: 'Rocío Esperanza Jordan',
    birthDate: 'julio de 1979',
    birthYear: '1979',
    generation: 2,
    branch: 'Jordan',
    tags: ['Gen 2', 'Rama Jordan'],
    bioSummary: 'Segunda hija de Philippe Juan Guillermo Jordan y Beatriz Molina. Nacida en julio de 1979. Madre de Gianna Leily y Parsa William Nejad-Jordan.'
  },
  // Descendencia de Ariane Jordan y Said Sayed
  {
    id: 'angelina-jordan',
    name: 'Angelina Jordan',
    generation: 2,
    branch: 'Jordan',
    tags: ['Gen 2', 'Rama Jordan'],
    bioSummary: 'Hija de Ariane Jordan y Said Sayed.'
  },
  // Descendencia de Adolfo Chababo y Nevy
  {
    id: 'cecilia-matilde-chababo',
    name: 'Cecilia Matilde Chababo',
    generation: 2,
    branch: 'Chababo',
    tags: ['Gen 2', 'Rama Chababo'],
    bioSummary: 'Hija de Adolfo Chababo y Nevy. Casada con Michele Bortoliero.'
  },
  {
    id: 'michele-bortoliero',
    name: 'Michele Bortoliero',
    generation: 2,
    branch: 'Bortoliero',
    tags: ['Gen 2', 'Rama Bortoliero'],
    bioSummary: 'Esposo de Cecilia Matilde Chababo. Padre de Matteo.'
  },
  {
    id: 'mario-chababo',
    name: 'Mario Chababo',
    generation: 2,
    branch: 'Chababo',
    tags: ['Gen 2', 'Rama Chababo'],
    bioSummary: 'Hijo de Rafael Chababo y Blanca.'
  },
  {
    id: 'patricia-chababo',
    name: 'Patricia Chababo',
    generation: 2,
    branch: 'Chababo',
    tags: ['Gen 2', 'Rama Chababo'],
    bioSummary: 'Hija de Rafael Chababo y Blanca.'
  },
  {
    id: 'maria-laura-chababo',
    name: 'María Laura Chababo',
    generation: 2,
    branch: 'Chababo',
    tags: ['Gen 2', 'Rama Chababo'],
    bioSummary: 'Hija de Rafael Chababo y Blanca.'
  },
  {
    id: 'patricio-chababo',
    name: 'Patricio Chababo',
    generation: 2,
    branch: 'Chababo',
    tags: ['Gen 2', 'Rama Chababo'],
    bioSummary: 'Hijo de Adolfo Chababo y Nevy. Casado con Carolina Remondino.'
  },
  {
    id: 'carolina-remondino',
    name: 'Carolina Remondino',
    generation: 2,
    branch: 'Remondino',
    tags: ['Gen 2', 'Rama Remondino'],
    bioSummary: 'Esposa de Patricio Chababo. Madre de Sol y dos hijos/as más.'
  },
  // Descendencia de Pepe Ballistreri y La Chubi
  {
    id: 'karina-ballistreri',
    name: 'Karina Ballistreri',
    generation: 2,
    branch: 'Ballistreri',
    tags: ['Gen 2', 'Rama Ballistreri'],
    bioSummary: 'Hija de Pepe Ballistreri y La Chubi. Casada con Andrés Sánchez.'
  },
  {
    id: 'andres-sanchez',
    name: 'Andrés Sánchez',
    generation: 2,
    branch: 'Sánchez',
    tags: ['Gen 2', 'Rama Sánchez'],
    bioSummary: 'Esposo de Karina Ballistreri. Padre de Mauro y Martina.'
  },
  {
    id: 'daniel-ballistreri',
    name: 'Daniel Ballistreri',
    generation: 2,
    branch: 'Ballistreri',
    tags: ['Gen 2', 'Rama Ballistreri'],
    bioSummary: 'Hijo de Pepe Ballistreri y La Chubi. En pareja con Romina (Yeya).'
  },
  {
    id: 'romina-yeya',
    name: 'Romina (Yeya)',
    generation: 2,
    branch: 'Ballistreri',
    tags: ['Gen 2', 'Rama Ballistreri'],
    bioSummary: 'Pareja de Daniel Ballistreri.'
  },
  // Familia de Graciela María Martino
  {
    id: 'mariangeles-sciutto',
    name: 'Mariangeles Sciutto',
    generation: 2,
    branch: 'Sciutto',
    tags: ['Gen 2', 'Rama Sciutto'],
    bioSummary: 'Hija de Graciela María Martino, hermana de Cecilia Sciutto.'
  },
  {
    id: 'cecilia-sciutto',
    name: 'Cecilia Sciutto',
    generation: 2,
    branch: 'Sciutto',
    tags: ['Gen 2', 'Rama Sciutto'],
    bioSummary: 'Hija de Graciela María Martino, hermana de Mariangeles Sciutto.'
  },

  // Descendencia de los Hermanos Bolbol y Guardiet (Gen 2)
  // Hijos de Rubén Bolbol y María "Maruca" Cantador (1º Matrimonio)
  {
    id: 'nora-bolbol',
    name: 'Nora Bolbol',
    generation: 2,
    branch: 'Bolbol',
    tags: ['Gen 2', 'Rama Bolbol'],
    bioSummary: 'Hija de Rubén Bolbol y María "Maruca" Cantador.'
  },
  {
    id: 'jorge-bolbol-ruben',
    name: 'Jorge Bolbol',
    generation: 2,
    branch: 'Bolbol',
    tags: ['Gen 2', 'Rama Bolbol'],
    bioSummary: 'Hijo de Rubén Bolbol y María "Maruca" Cantador.'
  },

  // Hijos de Rubén Bolbol y Gladys (2º Matrimonio)
  {
    id: 'isabel-bolbol-ruben',
    name: 'Isabel Bolbol',
    generation: 2,
    branch: 'Bolbol',
    tags: ['Gen 2', 'Rama Bolbol'],
    bioSummary: 'Hija de Rubén Bolbol y Gladys.'
  },
  {
    id: 'leonor-bolbol-ruben',
    name: 'Leonor Bolbol',
    generation: 2,
    branch: 'Bolbol',
    tags: ['Gen 2', 'Rama Bolbol'],
    bioSummary: 'Hija de Rubén Bolbol y Gladys.'
  },
  {
    id: 'miguel-bolbol-ruben',
    name: 'Miguel Bolbol',
    generation: 2,
    branch: 'Bolbol',
    tags: ['Gen 2', 'Rama Bolbol'],
    bioSummary: 'Hijo de Rubén Bolbol y Gladys.'
  },

  // Hijos de Víctor Bolbol y Angelita Telesca
  {
    id: 'miguel-bolbol-doctor',
    name: 'Dr. Miguel Bolbol',
    generation: 2,
    branch: 'Bolbol',
    tags: ['Gen 2', 'Rama Bolbol', 'Médico'],
    bioSummary: 'Hijo de Víctor Bolbol y Angelita Telesca. Médico.'
  },
  {
    id: 'victoria-bolbol',
    name: 'Victoria Bolbol',
    generation: 2,
    branch: 'Bolbol',
    tags: ['Gen 2', 'Rama Bolbol'],
    bioSummary: 'Hija de Víctor Bolbol y Angelita Telesca. Casada con Tito Zucchini. Madre de Adriana e Isabel.'
  },
  {
    id: 'tito-zucchini',
    name: 'Tito Zucchini',
    generation: 2,
    branch: 'Zucchini',
    tags: ['Gen 2', 'Rama Zucchini'],
    bioSummary: 'Esposo de Victoria Bolbol. Padre de Adriana e Isabel.'
  },
  {
    id: 'alcira-bolbol-victor',
    name: 'Alcira Bolbol',
    generation: 2,
    branch: 'Bolbol',
    tags: ['Gen 2', 'Rama Bolbol'],
    bioSummary: 'Hija de Víctor Bolbol y Angelita Telesca. Casada con Sr. Robledo. Madre de Cacho.'
  },
  {
    id: 'sr-robledo',
    name: 'Sr. Robledo',
    generation: 2,
    branch: 'Robledo',
    tags: ['Gen 2', 'Rama Robledo'],
    bioSummary: 'Esposo de Alcira Bolbol. Padre de Cacho Robledo.'
  },
  {
    id: 'jorge-bolbol-victor',
    name: 'Jorge Bolbol',
    generation: 2,
    branch: 'Bolbol',
    tags: ['Gen 2', 'Rama Bolbol'],
    bioSummary: 'Hijo de Víctor Bolbol y Angelita Telesca.'
  },

  // Hijos de Emiliz y Sr. Moll
  {
    id: 'juan-jose-moll',
    name: 'Juan José Moll',
    generation: 2,
    branch: 'Moll',
    tags: ['Gen 2', 'Rama Moll', 'Inmobiliaria'],
    bioSummary: 'Hijo de Emiliz y Sr. Moll. Titular de Juan José Moll Inmobiliaria.'
  },

  // Hijos de Jorge Betabe
  {
    id: 'elias-betabe',
    name: 'Elías Betabe',
    generation: 2,
    branch: 'Betabe',
    tags: ['Gen 2', 'Rama Betabe'],
    bioSummary: 'Hijo de Jorge Betabe.'
  },

  // Hijos de Ebrain (Rama Frosina)
  {
    id: 'antonio-hijo-ebrain',
    name: 'Antonio',
    generation: 2,
    branch: 'Bolbol',
    tags: ['Gen 2', 'Rama Bolbol'],
    bioSummary: 'Hijo de Ebrain (rama Frosina Bolbol).'
  },

  // Hijos de Jorge Bolbol y Elena
  {
    id: 'jorge-bolbol-hijo-sodero',
    name: 'Jorge Bolbol',
    generation: 2,
    branch: 'Bolbol',
    tags: ['Gen 2', 'Rama Bolbol'],
    bioSummary: 'Hijo de Jorge Bolbol y Elena.'
  },

  // Hijos de Bebe Bolbol
  {
    id: 'monica-bolbol',
    name: 'Mónica Bolbol',
    generation: 2,
    branch: 'Bolbol',
    tags: ['Gen 2', 'Rama Bolbol'],
    bioSummary: 'Hija de Bebe Bolbol.'
  },

  // Hijos de Irma "Charo" Bolbol y Eduardo Iamónico
  {
    id: 'nadir-iamonico',
    name: 'Nadir Iamónico',
    generation: 2,
    branch: 'Iamónico',
    tags: ['Gen 2', 'Rama Iamónico'],
    bioSummary: 'Hijo de Irma "Charo" Bolbol y Eduardo Iamónico.'
  },
  {
    id: 'romina-iamonico',
    name: 'Romina Iamónico',
    generation: 2,
    branch: 'Iamónico',
    tags: ['Gen 2', 'Rama Iamónico'],
    bioSummary: 'Hija de Irma "Charo" Bolbol y Eduardo Iamónico.'
  },

  // Hijos de Lina Guardiet y Sr. Mc Roullion
  {
    id: 'memo-mc-roullion',
    name: 'Memo Mc Roullion',
    generation: 2,
    branch: 'Mc Roullion',
    tags: ['Gen 2', 'Rama Mc Roullion'],
    bioSummary: 'Hijo de Lina Guardiet y Sr. Mc Roullion.'
  },

  // Hijos de Dora Elvira Guardiet y Dr. Preve
  {
    id: 'gabriela-elsa-preve',
    name: 'Gabriela Elsa Preve',
    birthDate: '13 de diciembre',
    generation: 2,
    branch: 'Preve',
    tags: ['Gen 2', 'Rama Preve'],
    bioSummary: 'Hija de Dora Elvira Guardiet y Dr. Preve. Nacida el 13 de diciembre. Madre de Florencia y Lucas.'
  },

  // ==========================================
  // --- GENERACIÓN 3 ---
  // ==========================================
  {
    id: 'matias',
    name: 'Matías Chababo',
    birthDate: '4 de agosto de 2000',
    birthYear: '2000',
    generation: 3,
    branch: 'Chababo',
    tags: ['Gen 3', 'Rama Chababo', 'Creador'],
    bioSummary: 'Creador de la plataforma "Dinastía Familiar".',
    valuesAndTeachings: [
      'Alguien muere cuando se le olvida. La historia es el mapa de nuestro futuro.'
    ]
  },
  {
    id: 'ivan',
    name: 'Iván Chababo',
    birthDate: '5 de mayo de 1996',
    birthYear: '1996',
    generation: 3,
    branch: 'Chababo',
    tags: ['Gen 3', 'Rama Chababo'],
    bioSummary: 'Hijo de Jorge Chababo y Ana Claudia Ballistreri.'
  },
  {
    id: 'alejo',
    name: 'Alejo Marcos Chababo',
    birthDate: '10 de agosto de 1990',
    birthYear: '1990',
    generation: 3,
    branch: 'Chababo',
    tags: ['Gen 3', 'Rama Chababo'],
    bioSummary: 'Hijo de Roberto Salomón Chababo (Roly) y Alejandra Halek. En pareja con Tatiana Vondarenko.'
  },
  {
    id: 'tatiana-vondarenko',
    name: 'Tatiana Vondarenko',
    generation: 3,
    branch: 'Vondarenko',
    tags: ['Gen 3', 'Rama Vondarenko'],
    bioSummary: 'Pareja de Alejo Marcos Chababo.'
  },
  {
    id: 'ramiro',
    name: 'Ramiro Nathan Chababo',
    generation: 3,
    branch: 'Chababo',
    tags: ['Gen 3', 'Rama Chababo'],
    bioSummary: 'Hijo de Roberto Salomón Chababo (Roly) y Alejandra Halek, esposo de Paula Cosolito.'
  },
  {
    id: 'paula-cosolito',
    name: 'Paula Cosolito',
    generation: 3,
    branch: 'Cosolito',
    tags: ['Gen 3', 'Rama Cosolito'],
    bioSummary: 'Esposa de Ramiro Nathan Chababo. Madre de Abril, Teo, Sol y Paz.'
  },
  {
    id: 'igal',
    name: 'Igal Evlagon',
    generation: 3,
    branch: 'Evlagon',
    tags: ['Gen 3', 'Rama Evlagon'],
    bioSummary: 'Hijo de Claudia Chababo y David Evlagon.'
  },
  {
    id: 'shay',
    name: 'Shay',
    generation: 3,
    branch: 'Evlagon',
    tags: ['Gen 3'],
    bioSummary: 'Esposa de Igal Evlagon.'
  },
  {
    id: 'danit',
    name: 'Danit Evlagon',
    generation: 3,
    branch: 'Evlagon',
    tags: ['Gen 3', 'Rama Evlagon'],
    bioSummary: 'Hija de Claudia Chababo y David Evlagon.'
  },
  {
    id: 'pablo-levin',
    name: 'Pablo Levin',
    generation: 3,
    branch: 'Levin',
    tags: ['Gen 3', 'Rama Levin'],
    bioSummary: 'Hijo de Alberto Levin y Kuki.'
  },
  {
    id: 'valeria-levin',
    name: 'Valeria Levin',
    generation: 3,
    branch: 'Levin',
    tags: ['Gen 3', 'Rama Levin'],
    bioSummary: 'Hija de Alberto Levin y Kuki, esposa de Gabi Gindin.'
  },
  {
    id: 'gabi-gindin',
    name: 'Gabi Gindin',
    generation: 3,
    branch: 'Gindin',
    tags: ['Gen 3', 'Rama Gindin'],
    bioSummary: 'Esposo de Valeria Levin.'
  },
  {
    id: 'macarena-isassa',
    name: 'Macarena Isassa',
    generation: 3,
    branch: 'Isassa',
    tags: ['Gen 3', 'Rama Isassa'],
    bioSummary: 'Hija de María Fernanda Ballistreri y Juan Isassa.'
  },
  {
    id: 'leandro',
    name: 'Leandro',
    generation: 3,
    branch: 'Familia Leandro',
    tags: ['Gen 3'],
    bioSummary: 'Padre de Nicolás (junto a Macarena Isassa).'
  },
  {
    id: 'lara-romeo',
    name: 'Lara Romeo',
    birthDate: '16 de julio de 1999',
    birthYear: '1999',
    generation: 3,
    branch: 'Romeo',
    tags: ['Gen 3', 'Rama Romeo'],
    bioSummary: 'Hija de María Gabriela Ballistreri y Fabián Eduardo Romeo.'
  },
  {
    id: 'maite-romeo',
    name: 'Maite Romeo',
    birthDate: '8 de octubre de 1997',
    birthYear: '1997',
    generation: 3,
    branch: 'Romeo',
    tags: ['Gen 3', 'Rama Romeo'],
    bioSummary: 'Hija de María Gabriela Ballistreri y Fabián Eduardo Romeo.'
  },
  // Generación 3 de la Rama Yebne
  {
    id: 'mauricio-yebne',
    name: 'Mauricio Yebne',
    generation: 3,
    branch: 'Yebne',
    tags: ['Gen 3', 'Rama Yebne'],
    bioSummary: 'Hijo de Basilio Yebne y Gabriela Dinucchi.'
  },
  {
    id: 'carina-yebne',
    name: 'Carina Yebne',
    generation: 3,
    branch: 'Yebne',
    tags: ['Gen 3', 'Rama Yebne'],
    bioSummary: 'Hija de Jorge Yebne. Madre de Valentino Vy.'
  },
  {
    id: 'facundo-yebne',
    name: 'Facundo Yebne',
    generation: 3,
    branch: 'Yebne',
    tags: ['Gen 3', 'Rama Yebne'],
    bioSummary: 'Hijo de Jorge Yebne.'
  },
  {
    id: 'sebastian-yebne',
    name: 'Sebastián Yebne',
    generation: 3,
    branch: 'Yebne',
    tags: ['Gen 3', 'Rama Yebne'],
    bioSummary: 'Hijo de Jorge Yebne.'
  },
  {
    id: 'vicky-yebne',
    name: 'Vicky Yebne',
    generation: 3,
    branch: 'Yebne',
    tags: ['Gen 3', 'Rama Yebne'],
    bioSummary: 'Hija de Jorge Yebne y Marta Irene.'
  },
  {
    id: 'ezequiel-yebne',
    name: 'Ezequiel Yebne',
    generation: 3,
    branch: 'Yebne',
    tags: ['Gen 3', 'Rama Yebne'],
    bioSummary: 'Hijo de Jorge Yebne y Marta Irene.'
  },
  {
    id: 'cartofle-fernandez',
    name: 'Cartofle Fernandez',
    generation: 3,
    branch: 'Fernandez',
    tags: ['Gen 3', 'Rama Fernandez'],
    bioSummary: 'Hijo de Teresa Yebne y Rogelio Fernandez.'
  },
  {
    id: 'milena-bonsignore',
    name: 'Milena Bonsignore',
    generation: 3,
    branch: 'Bonsignore',
    tags: ['Gen 3', 'Rama Bonsignore'],
    bioSummary: 'Hija de Carlos Javier Bonsignore (Cachito).'
  },
  {
    id: 'bruno-bonsignore',
    name: 'Bruno Bonsignore',
    generation: 3,
    branch: 'Bonsignore',
    tags: ['Gen 3', 'Rama Bonsignore'],
    bioSummary: 'Hijo de Carlos Javier Bonsignore (Cachito).'
  },
  {
    id: 'rodrigo-coccolo',
    name: 'Rodrigo Coccolo',
    generation: 3,
    branch: 'Coccolo',
    tags: ['Gen 3', 'Rama Coccolo'],
    bioSummary: 'Hijo de Patricia Goytia y Eduardo Coccolo.'
  },
  {
    id: 'franco-gagliardi',
    name: 'Franco Gagliardi',
    generation: 3,
    branch: 'Gagliardi',
    tags: ['Gen 3', 'Rama Gagliardi'],
    bioSummary: 'Hijo de Liliana Bonsignore y Andrés Gagliardi.'
  },
  {
    id: 'andres-gagliardi-hijo',
    name: 'Andrés Gagliardi (hijo)',
    generation: 3,
    branch: 'Gagliardi',
    tags: ['Gen 3', 'Rama Gagliardi'],
    bioSummary: 'Hijo de Liliana Bonsignore y Andrés Gagliardi.'
  },
  // Hijos de Esther Nieve Dahan y José Ades
  {
    id: 'daniel-ades',
    name: 'Daniel Ades',
    generation: 3,
    branch: 'Ades',
    tags: ['Gen 3', 'Rama Ades'],
    bioSummary: 'Hijo de José Ades y Esther Nieve Dahan. Hermano de Gabriel Eduardo y Mauricio Ades.'
  },
  {
    id: 'gabriel-eduardo-ades',
    name: 'Gabriel Eduardo Ades',
    generation: 3,
    branch: 'Ades',
    tags: ['Gen 3', 'Rama Ades'],
    bioSummary: 'Hijo de José Ades y Esther Nieve Dahan. Hermano de Daniel y Mauricio Ades.'
  },
  {
    id: 'mauricio-ades',
    name: 'Mauricio Ades',
    generation: 3,
    branch: 'Ades',
    tags: ['Gen 3', 'Rama Ades'],
    bioSummary: 'Hijo de José Ades y Esther Nieve Dahan. Hermano de Daniel y Gabriel Eduardo Ades.'
  },
  // Descendencia de la Rama Jordan
  {
    id: 'nafees-bermudas-jordan',
    name: 'Nafees Bermudas-Jordan',
    birthYear: '1995',
    generation: 3,
    branch: 'Bermudas',
    tags: ['Gen 3', 'Rama Bermudas', 'Rama Jordan'],
    bioSummary: 'Hijo de Romina Eunice Jordan y Sky Bermudas. Nacido aproximadamente en 1995.'
  },
  {
    id: 'gianna-leily-nejad',
    name: 'Gianna Leily Nejad-Jordan',
    birthYear: '2011',
    generation: 3,
    branch: 'Nejad',
    tags: ['Gen 3', 'Rama Nejad', 'Rama Jordan'],
    bioSummary: 'Primera hija de Rocío Esperanza Jordan. Nacida en 2011.'
  },
  {
    id: 'parsa-william-nejad',
    name: 'Parsa William Nejad-Jordan',
    birthYear: '2013',
    generation: 3,
    branch: 'Nejad',
    tags: ['Gen 3', 'Rama Nejad', 'Rama Jordan'],
    bioSummary: 'Hijo de Rocío Esperanza Jordan. Nacido en 2013.'
  },
  // Hijos de Cecilia Matilde Chababo y Sr. Bortoliero
  {
    id: 'matteo-bortoliero',
    name: 'Matteo Bortoliero',
    generation: 3,
    branch: 'Bortoliero',
    tags: ['Gen 3', 'Rama Bortoliero'],
    bioSummary: 'Hijo de Cecilia Matilde Chababo y Sr. Bortoliero.'
  },
  // Hijos de Patricio Chababo y Carolina Remondino
  {
    id: 'sol-chababo-patricio',
    name: 'Sol María Chababo',
    generation: 3,
    branch: 'Chababo',
    tags: ['Gen 3', 'Rama Chababo'],
    bioSummary: 'Hija de Patricio Chababo y Carolina Remondino.'
  },
  {
    id: 'juan-ignacio-chababo',
    name: 'Juan Ignacio Chababo',
    generation: 3,
    branch: 'Chababo',
    tags: ['Gen 3', 'Rama Chababo'],
    bioSummary: 'Hijo de Patricio Chababo y Carolina Remondino.'
  },
  {
    id: 'agustin-chababo',
    name: 'Agustín Chababo',
    generation: 3,
    branch: 'Chababo',
    tags: ['Gen 3', 'Rama Chababo'],
    bioSummary: 'Hijo de Patricio Chababo y Carolina Remondino.'
  },
  // Hijos de Karina Ballistreri y Andrés Sánchez
  {
    id: 'mauro-sanchez',
    name: 'Mauro Sánchez',
    generation: 3,
    branch: 'Sánchez',
    tags: ['Gen 3', 'Rama Sánchez'],
    bioSummary: 'Hijo de Karina Ballistreri y Andrés Sánchez.'
  },
  {
    id: 'martina-sanchez',
    name: 'Martina Sánchez',
    generation: 3,
    branch: 'Sánchez',
    tags: ['Gen 3', 'Rama Sánchez'],
    bioSummary: 'Hija de Karina Ballistreri y Andrés Sánchez.'
  },
  // Hijos de Victoria Bolbol y Tito Zucchini
  {
    id: 'adriana-zucchini',
    name: 'Adriana Zucchini',
    generation: 3,
    branch: 'Zucchini',
    tags: ['Gen 3', 'Rama Zucchini'],
    bioSummary: 'Hija de Victoria Bolbol y Tito Zucchini.'
  },
  {
    id: 'isabel-zucchini',
    name: 'Isabel Zucchini',
    generation: 3,
    branch: 'Zucchini',
    tags: ['Gen 3', 'Rama Zucchini'],
    bioSummary: 'Hija de Victoria Bolbol y Tito Zucchini. Casada con Carlos Sijel. Madre de Carina, Daniel y Leonardo.'
  },
  {
    id: 'carlos-sijel',
    name: 'Carlos Sijel',
    generation: 3,
    branch: 'Sijel',
    tags: ['Gen 3', 'Rama Sijel'],
    bioSummary: 'Esposo de Isabel Zucchini. Padre de Carina, Daniel y Leonardo Sijel.'
  },
  // Hijo de Alcira Bolbol y Sr. Robledo
  {
    id: 'cacho-robledo',
    name: 'Cacho Robledo',
    generation: 3,
    branch: 'Robledo',
    tags: ['Gen 3', 'Rama Robledo'],
    bioSummary: 'Hijo de Alcira Bolbol y Sr. Robledo.'
  },
  // Hijos de Gabriela Elsa Preve
  {
    id: 'florencia-preve',
    name: 'Florencia',
    generation: 3,
    branch: 'Preve',
    tags: ['Gen 3', 'Rama Preve'],
    bioSummary: 'Hija de Gabriela Elsa Preve.'
  },
  {
    id: 'lucas-preve',
    name: 'Lucas',
    generation: 3,
    branch: 'Preve',
    tags: ['Gen 3', 'Rama Preve'],
    bioSummary: 'Hijo de Gabriela Elsa Preve.'
  },

  // ==========================================
  // --- GENERACIÓN 4 ---
  // ==========================================
  {
    id: 'francesca-bortoliero',
    name: 'Francesca Bortoliero',
    generation: 4,
    branch: 'Bortoliero',
    tags: ['Gen 4', 'Rama Bortoliero'],
    bioSummary: 'Hija de Matteo Bortoliero.'
  },
  // Hijos de Isabel Zucchini y Carlos Sijel
  {
    id: 'carina-sijel',
    name: 'Carina Sijel',
    generation: 4,
    branch: 'Sijel',
    tags: ['Gen 4', 'Rama Sijel'],
    bioSummary: 'Hija de Isabel Zucchini y Carlos Sijel.'
  },
  {
    id: 'daniel-sijel',
    name: 'Daniel Sijel',
    generation: 4,
    branch: 'Sijel',
    tags: ['Gen 4', 'Rama Sijel'],
    bioSummary: 'Hijo de Isabel Zucchini y Carlos Sijel.'
  },
  {
    id: 'leonardo-sijel',
    name: 'Leonardo Sijel',
    generation: 4,
    branch: 'Sijel',
    tags: ['Gen 4', 'Rama Sijel'],
    bioSummary: 'Hijo de Isabel Zucchini y Carlos Sijel.'
  },
  {
    id: 'abril',
    name: 'Abril Chababo',
    generation: 4,
    branch: 'Chababo',
    tags: ['Gen 4', 'Rama Chababo'],
    bioSummary: 'Hija de Ramiro Nathan Chababo y Paula.'
  },
  {
    id: 'teo',
    name: 'Teo Chababo',
    generation: 4,
    branch: 'Chababo',
    tags: ['Gen 4', 'Rama Chababo'],
    bioSummary: 'Hijo de Ramiro Nathan Chababo y Paula.'
  },
  {
    id: 'sol',
    name: 'Sol Chababo',
    generation: 4,
    branch: 'Chababo',
    tags: ['Gen 4', 'Rama Chababo'],
    bioSummary: 'Hija de Ramiro Nathan Chababo y Paula.'
  },
  {
    id: 'paz',
    name: 'Paz Chababo',
    generation: 4,
    branch: 'Chababo',
    tags: ['Gen 4', 'Rama Chababo'],
    bioSummary: 'Hija de Ramiro Nathan Chababo y Paula.'
  },
  {
    id: 'alan-gindin',
    name: 'Alan Gindin',
    generation: 4,
    branch: 'Gindin',
    tags: ['Gen 4', 'Rama Gindin'],
    bioSummary: 'Hijo de Gabi Gindin y Valeria Levin.'
  },
  {
    id: 'zoe-gindin',
    name: 'Zoe Gindin',
    generation: 4,
    branch: 'Gindin',
    tags: ['Gen 4', 'Rama Gindin'],
    bioSummary: 'Hija de Gabi Gindin y Valeria Levin.'
  },
  {
    id: 'nicolas-hijo-macarena',
    name: 'Nicolás',
    generation: 4,
    branch: 'Isassa',
    tags: ['Gen 4', 'Rama Isassa'],
    bioSummary: 'Hijo de Macarena Isassa y Leandro.'
  },
  {
    id: 'tom',
    name: 'Tom Evlagon',
    generation: 4,
    branch: 'Evlagon',
    tags: ['Gen 4', 'Rama Evlagon'],
    bioSummary: 'Hijo de Igal Evlagon y Shay.'
  },
  {
    id: 'valentino-vy',
    name: 'Valentino Vy',
    generation: 4,
    branch: 'Yebne',
    tags: ['Gen 4', 'Rama Yebne'],
    bioSummary: 'Hijo de Carina Yebne.'
  }
];

export const INITIAL_UNIONS: FamilyUnion[] = [
  // ==========================================
  // Generación -1 -> Generación 0
  // ==========================================
  {
    id: 'union-georges-magidi',
    partner1Id: 'georges-bolbol',
    partner2Id: 'magidi-alcira-bolbol',
    unionType: 'MARRIAGE',
    childrenIds: [
      'teofilo-bolbol',
      'miguel-bolbol',
      'labibi-bolbol',
      'sobji-bolbol',
      'ignacio-bolbol',
      'camilo-bolbol',
      'nazem-bolbol',
      'frosina-bolbol',
      'afife-bolbol'
    ]
  },
  {
    id: 'union-juda-malea',
    partner1Id: 'juda-chababo',
    partner2Id: 'malea-levi',
    unionType: 'MARRIAGE',
    childrenIds: ['salomon-chababo', 'jacobo-chababo']
  },
  {
    id: 'union-jose-rosa-trantemberg',
    partner1Id: 'jose-trantemberg',
    partner2Id: 'rosa-esrique',
    unionType: 'MARRIAGE',
    childrenIds: ['ema-trantemberg']
  },

  // ==========================================
  // Generación 0 -> Generación 1
  // ==========================================
  {
    id: 'union-pablo-celia-guardiet',
    partner1Id: 'pablo-guardiet-padre',
    partner2Id: 'celia-sanchez',
    unionType: 'MARRIAGE',
    childrenIds: [
      'pablo-guardiet-hijo',
      'maria-celia-guardiet',
      'oscar-guardiet',
      'lina-guardiet',
      'dora-elvira-guardiet',
      'dolores-guardiet',
      'elsa-guardiet'
    ]
  },
  {
    id: 'union-miguel-bolbol-hijos',
    partner1Id: 'miguel-bolbol',
    unionType: 'MARRIAGE',
    childrenIds: ['ruben-bolbol-miguel', 'victor-bolbol']
  },
  {
    id: 'union-labibi-bolbol-hijos',
    partner1Id: 'labibi-bolbol',
    unionType: 'MARRIAGE',
    childrenIds: ['matilde-alcira-belune', 'emiliz-bolbol']
  },
  {
    id: 'union-sobji-juana',
    partner1Id: 'sobji-bolbol',
    partner2Id: 'juana-sauan',
    unionType: 'MARRIAGE',
    childrenIds: ['rosita-bolbol', 'alcira-bolbol-sobji', 'eva-argentina-bolbol', 'maria-argentina-bolbol']
  },
  {
    id: 'union-ignacio-irma',
    partner1Id: 'ignacio-bolbol',
    partner2Id: 'irma-bernal',
    unionType: 'MARRIAGE',
    childrenIds: ['alcira-bolbol-ignacio', 'irma-charo-bolbol']
  },
  {
    id: 'union-camilo-antonia',
    partner1Id: 'camilo-bolbol',
    partner2Id: 'tia-antonia',
    unionType: 'MARRIAGE',
    childrenIds: ['jorge-sodero-bolbol', 'bebe-bolbol']
  },
  {
    id: 'union-frosina-hijos',
    partner1Id: 'frosina-bolbol',
    unionType: 'MARRIAGE',
    childrenIds: ['jorge-betabe', 'ebrain-frosina', 'alcira-bitar']
  },
  {
    id: 'union-afife-hijos',
    partner1Id: 'afife-bolbol',
    unionType: 'MARRIAGE',
    childrenIds: ['felipe-afife', 'jose-afife', 'jorge-afife', 'alcira-afife', 'rosa-afife', 'elias-afife']
  },
  {
    id: 'union-jacobo-ema',
    partner1Id: 'jacobo-chababo',
    partner2Id: 'ema-trantemberg',
    unionType: 'MARRIAGE',
    marriageYear: '1913',
    childrenIds: [
      'leon-chababo-jacobo',
      'matilde-chababo-jacobo',
      'marcos-chababo-jacobo',
      'esther-chababo-jacobo-1',
      'flora-chababo-jacobo',
      'esther-chababo-jacobo-2',
      'luis-ramon-chababo',
      'samuel-nisim-chababo',
      'raquel-chababo-jacobo',
      'alberto-chababo-jacobo',
      'judas-chababo',
      'lidia-chababo',
      'zulema-chababo'
    ]
  },
  {
    id: 'union-ancestros-chababo',
    partner1Id: 'salomon-chababo',
    partner2Id: 'mercedes-sitton',
    unionType: 'MARRIAGE',
    childrenIds: ['moises', 'reina-chababo']
  },
  {
    id: 'union-teofilo-sofia',
    partner1Id: 'teofilo-bolbol',
    partner2Id: 'sofia-gesrik',
    unionType: 'MARRIAGE',
    childrenIds: ['elena-bolbol', 'gloria-bolbol', 'julia-bolbol', 'zoraida', 'nelly-bolbol', 'elisa-bolbol']
  },
  {
    id: 'union-teofilo-bahie',
    partner1Id: 'teofilo-bolbol',
    partner2Id: 'bahie-gesrik',
    unionType: 'MARRIAGE',
    childrenIds: ['jorge-bolbol', 'turita-bolbol', 'antoine-bolbol']
  },
  {
    id: 'union-pedro-hellen',
    partner1Id: 'pedro-sader',
    partner2Id: 'hellen-gesrik',
    unionType: 'MARRIAGE',
    childrenIds: ['jorge-sader', 'susana-sader']
  },
  {
    id: 'union-tatuna-trichi',
    partner1Id: 'la-tatuna',
    unionType: 'MARRIAGE',
    childrenIds: ['la-trichi']
  },
  {
    id: 'union-padres-pipi',
    partner1Id: 'padres-pipi',
    unionType: 'MARRIAGE',
    childrenIds: ['la-pipi']
  },
  {
    id: 'union-catalina-hijos-ballistreri',
    partner1Id: 'catalina-ancestro-ballistreri',
    unionType: 'MARRIAGE',
    childrenIds: ['roberto-ballistreri', 'pepe-ballistreri', 'catalina-ballistreri-hermana']
  },
  {
    id: 'union-antoine-mary-jordan',
    partner1Id: 'antoine-jordan',
    partner2Id: 'mary-jordan',
    unionType: 'MARRIAGE',
    childrenIds: ['ralph-jordan', 'philip-jordan', 'ariane-jordan']
  },

  // ==========================================
  // Generación 1 -> Generación 2
  // ==========================================
  // Uniones Rama Guardiet
  {
    id: 'union-lina-mcroullion',
    partner1Id: 'lina-guardiet',
    partner2Id: 'sr-mc-roullion',
    unionType: 'MARRIAGE',
    childrenIds: ['memo-mc-roullion']
  },
  {
    id: 'union-dora-drpreve',
    partner1Id: 'dora-elvira-guardiet',
    partner2Id: 'dr-preve',
    unionType: 'MARRIAGE',
    childrenIds: ['gabriela-elsa-preve']
  },

  // Uniones Descendientes Bolbol
  {
    id: 'union-ruben-maruca-bolbol',
    partner1Id: 'ruben-bolbol-miguel',
    partner2Id: 'maria-maruca-cantador',
    unionType: 'MARRIAGE',
    childrenIds: ['nora-bolbol', 'jorge-bolbol-ruben']
  },
  {
    id: 'union-ruben-gladys-bolbol',
    partner1Id: 'ruben-bolbol-miguel',
    partner2Id: 'gladys-esposa-ruben',
    unionType: 'MARRIAGE',
    childrenIds: ['isabel-bolbol-ruben', 'leonor-bolbol-ruben', 'miguel-bolbol-ruben']
  },
  {
    id: 'union-victor-angelita-bolbol',
    partner1Id: 'victor-bolbol',
    partner2Id: 'angelita-telesca',
    unionType: 'MARRIAGE',
    childrenIds: ['miguel-bolbol-doctor', 'victoria-bolbol', 'alcira-bolbol-victor', 'jorge-bolbol-victor']
  },
  {
    id: 'union-matilde-tito-zacco',
    partner1Id: 'matilde-alcira-belune',
    partner2Id: 'ernesto-tito-zacco',
    unionType: 'MARRIAGE',
    childrenIds: []
  },
  {
    id: 'union-emiliz-moll',
    partner1Id: 'emiliz-bolbol',
    partner2Id: 'sr-moll',
    unionType: 'MARRIAGE',
    childrenIds: ['juan-jose-moll']
  },
  {
    id: 'union-jorge-betabe-hijos',
    partner1Id: 'jorge-betabe',
    unionType: 'MARRIAGE',
    childrenIds: ['elias-betabe']
  },
  {
    id: 'union-ebrain-hijos',
    partner1Id: 'ebrain-frosina',
    unionType: 'MARRIAGE',
    childrenIds: ['antonio-hijo-ebrain']
  },
  {
    id: 'union-jorge-sodero-elena',
    partner1Id: 'jorge-sodero-bolbol',
    partner2Id: 'elena-esposa-sodero',
    unionType: 'MARRIAGE',
    childrenIds: ['jorge-bolbol-hijo-sodero']
  },
  {
    id: 'union-bebe-bolbol-hijos',
    partner1Id: 'bebe-bolbol',
    unionType: 'MARRIAGE',
    childrenIds: ['monica-bolbol']
  },
  {
    id: 'union-irma-charo-eduardo',
    partner1Id: 'irma-charo-bolbol',
    partner2Id: 'eduardo-iamonico',
    unionType: 'MARRIAGE',
    childrenIds: ['nadir-iamonico', 'romina-iamonico']
  },
  {
    id: 'union-samuel-hijos',
    partner1Id: 'samuel-nisim-chababo',
    unionType: 'MARRIAGE',
    childrenIds: ['ruben-chababo', 'susana-chababo', 'silvia-chababo']
  },
  {
    id: 'union-judas-carlos',
    partner1Id: 'judas-chababo',
    unionType: 'MARRIAGE',
    childrenIds: ['carlos-chababo']
  },
  {
    id: 'union-flora-dahan',
    partner1Id: 'flora-chababo-jacobo',
    partner2Id: 'sr-dahan',
    unionType: 'MARRIAGE',
    childrenIds: ['esther-nieve-dahan']
  },
  {
    id: 'union-ralph-peggy-jordan',
    partner1Id: 'ralph-jordan',
    partner2Id: 'peggy-wilson',
    unionType: 'DIVORCED',
    childrenIds: ['kimberly-jordan', 'tiffany-jordan', 'allison-jordan', 'rebekah-jordan']
  },
  {
    id: 'union-ralph-alejandra-jordan',
    partner1Id: 'ralph-jordan',
    partner2Id: 'alejandra-flores',
    unionType: 'MARRIAGE',
    childrenIds: ['sebastian-philippe-jordan', 'paulina-jordan', 'isobel-jordan']
  },
  {
    id: 'union-philippe-beatriz-jordan',
    partner1Id: 'philip-jordan',
    partner2Id: 'beatriz-molina',
    unionType: 'MARRIAGE',
    childrenIds: ['romina-eunice-jordan', 'rocio-esperanza-jordan']
  },
  {
    id: 'union-ariane-said',
    partner1Id: 'ariane-jordan',
    partner2Id: 'said-sayed',
    unionType: 'PARTNERSHIP',
    childrenIds: ['angelina-jordan']
  },
  {
    id: 'union-moises-zoraida',
    partner1Id: 'moises',
    partner2Id: 'zoraida',
    unionType: 'MARRIAGE',
    childrenIds: ['roberto-chababo', 'jorge-chababo', 'claudia-chababo']
  },
  {
    id: 'union-reina-levin',
    partner1Id: 'reina-chababo',
    partner2Id: 'isaac-levin',
    unionType: 'MARRIAGE',
    childrenIds: ['alberto-levin', 'elias-levin', 'daniel-levin']
  },
  {
    id: 'union-roberto-trichi',
    partner1Id: 'roberto-ballistreri',
    partner2Id: 'la-trichi',
    unionType: 'MARRIAGE',
    childrenIds: ['ana-ballistreri', 'fernanda-ballistreri', 'gabriela-ballistreri']
  },
  {
    id: 'union-ernesto-pipi',
    partner1Id: 'ernesto-padre',
    partner2Id: 'la-pipi',
    unionType: 'MARRIAGE',
    childrenIds: ['victoria', 'mariana', 'ernesto-hijo']
  },
  {
    id: 'union-oscar-elisa',
    partner1Id: 'elisa-bolbol',
    partner2Id: 'oscar-guardiet',
    unionType: 'MARRIAGE',
    childrenIds: ['pablo-guardiet', 'cecilia-guardiet']
  },
  {
    id: 'union-oscar-nelly',
    partner1Id: 'nelly-bolbol',
    partner2Id: 'oscar-goytia',
    unionType: 'MARRIAGE',
    childrenIds: ['oscarcito-goytia', 'patricia-goytia']
  },
  {
    id: 'union-emilio-julia',
    partner1Id: 'julia-bolbol',
    partner2Id: 'emilio-bonsignore',
    unionType: 'MARRIAGE',
    childrenIds: ['daniel-bonsignore', 'liliana-bonsignore', 'carlos-javier-bonsignore']
  },
  {
    id: 'union-karim-gloria',
    partner1Id: 'gloria-bolbol',
    partner2Id: 'karim-yebne',
    unionType: 'MARRIAGE',
    childrenIds: ['basilio-yebne', 'jorge-yebne', 'teresa-yebne']
  },
  {
    id: 'union-juan-turita',
    partner1Id: 'turita-bolbol',
    partner2Id: 'juan-manuel-vesi',
    unionType: 'MARRIAGE',
    childrenIds: ['juan-carlos-vesi', 'gabriela-vesi']
  },
  {
    id: 'union-valentina-elena',
    partner1Id: 'valentina-vondarenko',
    unionType: 'MARRIAGE',
    childrenIds: ['elena-vondarenko']
  },
  {
    id: 'union-adolfo-nevy',
    partner1Id: 'adolfo-chababo',
    partner2Id: 'nevy-chababo',
    unionType: 'MARRIAGE',
    childrenIds: ['cecilia-matilde-chababo', 'patricio-chababo']
  },
  {
    id: 'union-pepe-chubi',
    partner1Id: 'pepe-ballistreri',
    partner2Id: 'la-chubi',
    unionType: 'MARRIAGE',
    childrenIds: ['karina-ballistreri', 'daniel-ballistreri']
  },
  {
    id: 'union-graciela-martino-hijas',
    partner1Id: 'graciela-maria-martino',
    unionType: 'MARRIAGE',
    childrenIds: ['mariangeles-sciutto', 'cecilia-sciutto']
  },

  // ==========================================
  // Generación 2 -> Generación 3
  // ==========================================
  {
    id: 'union-victoria-tito-zucchini',
    partner1Id: 'victoria-bolbol',
    partner2Id: 'tito-zucchini',
    unionType: 'MARRIAGE',
    childrenIds: ['adriana-zucchini', 'isabel-zucchini']
  },
  {
    id: 'union-alcira-robledo',
    partner1Id: 'alcira-bolbol-victor',
    partner2Id: 'sr-robledo',
    unionType: 'MARRIAGE',
    childrenIds: ['cacho-robledo']
  },
  {
    id: 'union-gabriela-preve-hijos',
    partner1Id: 'gabriela-elsa-preve',
    unionType: 'MARRIAGE',
    childrenIds: ['florencia-preve', 'lucas-preve']
  },
  {
    id: 'union-jose-esther-ades',
    partner1Id: 'jose-ades',
    partner2Id: 'esther-nieve-dahan',
    unionType: 'MARRIAGE',
    childrenIds: ['daniel-ades', 'gabriel-eduardo-ades', 'mauricio-ades']
  },
  {
    id: 'union-romina-sky',
    partner1Id: 'romina-eunice-jordan',
    partner2Id: 'sky-bermudas',
    unionType: 'PARTNERSHIP',
    childrenIds: ['nafees-bermudas-jordan']
  },
  {
    id: 'union-rocio-hijos',
    partner1Id: 'rocio-esperanza-jordan',
    unionType: 'MARRIAGE',
    childrenIds: ['gianna-leily-nejad', 'parsa-william-nejad']
  },
  {
    id: 'union-jorge-ana',
    partner1Id: 'jorge-chababo',
    partner2Id: 'ana-ballistreri',
    unionType: 'MARRIAGE',
    childrenIds: ['matias', 'ivan']
  },
  {
    id: 'union-roberto-alejandra',
    partner1Id: 'roberto-chababo',
    partner2Id: 'alejandra-halek',
    unionType: 'MARRIAGE',
    childrenIds: ['alejo', 'ramiro']
  },
  {
    id: 'union-claudia-david',
    partner1Id: 'claudia-chababo',
    partner2Id: 'david-evlagon',
    unionType: 'MARRIAGE',
    childrenIds: ['igal', 'danit']
  },
  {
    id: 'union-alberto-kuki',
    partner1Id: 'alberto-levin',
    partner2Id: 'kuki',
    unionType: 'MARRIAGE',
    childrenIds: ['pablo-levin', 'valeria-levin']
  },
  {
    id: 'union-juan-fernanda',
    partner1Id: 'juan-isassa',
    partner2Id: 'fernanda-ballistreri',
    unionType: 'MARRIAGE',
    childrenIds: ['macarena-isassa']
  },
  {
    id: 'union-fabian-gabriela',
    partner1Id: 'fabian-romeo',
    partner2Id: 'gabriela-ballistreri',
    unionType: 'MARRIAGE',
    childrenIds: ['lara-romeo', 'maite-romeo']
  },
  {
    id: 'union-oscarcito-liliana',
    partner1Id: 'oscarcito-goytia',
    partner2Id: 'liliana-santa-cruz',
    unionType: 'MARRIAGE',
    childrenIds: []
  },
  {
    id: 'union-basilio-gabriela',
    partner1Id: 'basilio-yebne',
    partner2Id: 'gabriela-dinucchi',
    unionType: 'MARRIAGE',
    childrenIds: ['mauricio-yebne']
  },
  {
    id: 'union-jorge-yebne-hijos',
    partner1Id: 'jorge-yebne',
    partner2Id: 'marta-irene',
    unionType: 'MARRIAGE',
    childrenIds: ['carina-yebne', 'facundo-yebne', 'sebastian-yebne', 'vicky-yebne', 'ezequiel-yebne']
  },
  {
    id: 'union-rogelio-teresa',
    partner1Id: 'teresa-yebne',
    partner2Id: 'rogelio-fernandez',
    unionType: 'MARRIAGE',
    childrenIds: ['cartofle-fernandez']
  },
  {
    id: 'union-cachito-bonsignore',
    partner1Id: 'carlos-javier-bonsignore',
    unionType: 'MARRIAGE',
    childrenIds: ['milena-bonsignore', 'bruno-bonsignore']
  },
  {
    id: 'union-eduardo-patricia',
    partner1Id: 'patricia-goytia',
    partner2Id: 'eduardo-coccolo',
    unionType: 'MARRIAGE',
    childrenIds: ['rodrigo-coccolo']
  },
  {
    id: 'union-andres-liliana-bonsignore',
    partner1Id: 'liliana-bonsignore',
    partner2Id: 'andres-gagliardi',
    unionType: 'MARRIAGE',
    childrenIds: ['franco-gagliardi', 'andres-gagliardi-hijo']
  },
  {
    id: 'union-elena-tatiana',
    partner1Id: 'elena-vondarenko',
    unionType: 'MARRIAGE',
    childrenIds: ['tatiana-vondarenko']
  },
  {
    id: 'union-jaime-basilia',
    partner1Id: 'jaime-chababo',
    partner2Id: 'basilia-susman',
    unionType: 'MARRIAGE',
    childrenIds: ['adela-chababo', 'esther-chababo', 'rafael-chababo', 'adolfo-chababo']
  },
  {
    id: 'union-esther-gerardo',
    partner1Id: 'esther-chababo',
    partner2Id: 'gerardo',
    unionType: 'PARTNERSHIP',
    childrenIds: []
  },
  {
    id: 'union-rafael-blanca',
    partner1Id: 'rafael-chababo',
    partner2Id: 'blanca',
    unionType: 'MARRIAGE',
    childrenIds: ['mario-chababo', 'patricia-chababo', 'maria-laura-chababo']
  },
  {
    id: 'union-matteo-francesca',
    partner1Id: 'matteo-bortoliero',
    unionType: 'MARRIAGE',
    childrenIds: ['francesca-bortoliero']
  },
  {
    id: 'union-cecilia-bortoliero',
    partner1Id: 'cecilia-matilde-chababo',
    partner2Id: 'michele-bortoliero',
    unionType: 'MARRIAGE',
    childrenIds: ['matteo-bortoliero']
  },
  {
    id: 'union-patricio-carolina',
    partner1Id: 'patricio-chababo',
    partner2Id: 'carolina-remondino',
    unionType: 'MARRIAGE',
    childrenIds: ['sol-chababo-patricio', 'juan-ignacio-chababo', 'agustin-chababo']
  },
  {
    id: 'union-andres-karina',
    partner1Id: 'karina-ballistreri',
    partner2Id: 'andres-sanchez',
    unionType: 'MARRIAGE',
    childrenIds: ['mauro-sanchez', 'martina-sanchez']
  },
  {
    id: 'union-daniel-romina',
    partner1Id: 'daniel-ballistreri',
    partner2Id: 'romina-yeya',
    unionType: 'PARTNERSHIP',
    childrenIds: []
  },

  // ==========================================
  // Generación 3 -> Generación 4
  // ==========================================
  {
    id: 'union-isabel-carlos-sijel',
    partner1Id: 'isabel-zucchini',
    partner2Id: 'carlos-sijel',
    unionType: 'MARRIAGE',
    childrenIds: ['carina-sijel', 'daniel-sijel', 'leonardo-sijel']
  },
  {
    id: 'union-alejo-tatiana',
    partner1Id: 'alejo',
    partner2Id: 'tatiana-vondarenko',
    unionType: 'PARTNERSHIP',
    childrenIds: []
  },
  {
    id: 'union-ramiro-paula',
    partner1Id: 'ramiro',
    partner2Id: 'paula-cosolito',
    unionType: 'MARRIAGE',
    childrenIds: ['abril', 'teo', 'sol', 'paz']
  },
  {
    id: 'union-gabi-valeria',
    partner1Id: 'gabi-gindin',
    partner2Id: 'valeria-levin',
    unionType: 'MARRIAGE',
    childrenIds: ['alan-gindin', 'zoe-gindin']
  },
  {
    id: 'union-igal-shay',
    partner1Id: 'igal',
    partner2Id: 'shay',
    unionType: 'MARRIAGE',
    childrenIds: ['tom']
  },
  {
    id: 'union-leandro-macarena',
    partner1Id: 'leandro',
    partner2Id: 'macarena-isassa',
    unionType: 'PARTNERSHIP',
    childrenIds: ['nicolas-hijo-macarena']
  },
  {
    id: 'union-carina-valentino',
    partner1Id: 'carina-yebne',
    unionType: 'PARTNERSHIP',
    childrenIds: ['valentino-vy']
  }
];

export const INITIAL_MEMORIES: MemoryPost[] = [];
