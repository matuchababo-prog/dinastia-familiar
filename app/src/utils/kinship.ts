import type { Person, FamilyUnion } from '../types/family';

export interface KinshipInfo {
  relationType: 'SELF' | 'PARENT' | 'CHILD' | 'SIBLING' | 'SPOUSE' | 'GRANDPARENT' | 'GRANDCHILD' | 'GREAT_GRANDPARENT' | 'UNCLE_AUNT' | 'GREAT_UNCLE_AUNT' | 'NEPHEW_NIECE' | 'COUSIN' | 'SECOND_COUSIN' | 'BRANCH_MEMBER' | 'RELATIVE';
  roleName: string; // ej: "Tu Papá", "Tu Hermano", "Tu Abuela"
  greetingName: string;
  personalizedPitch: string;
  isDirectFamily: boolean;
}

export function getParentsOf(id: string, unions: FamilyUnion[]): string[] {
  const parentIds: string[] = [];
  for (const u of unions) {
    if (u.childrenIds?.includes(id)) {
      if (u.partner1Id) parentIds.push(u.partner1Id);
      if (u.partner2Id) parentIds.push(u.partner2Id);
    }
  }
  return parentIds;
}

export function getChildrenOf(id: string, unions: FamilyUnion[]): string[] {
  const childIds: string[] = [];
  for (const u of unions) {
    if (u.partner1Id === id || u.partner2Id === id) {
      if (u.childrenIds) childIds.push(...u.childrenIds);
    }
  }
  return childIds;
}

export function getSiblingsOf(id: string, unions: FamilyUnion[]): string[] {
  const parents = getParentsOf(id, unions);
  const siblings = new Set<string>();
  for (const p of parents) {
    for (const ch of getChildrenOf(p, unions)) {
      if (ch !== id) siblings.add(ch);
    }
  }
  return Array.from(siblings);
}

export function getSpousesOf(id: string, unions: FamilyUnion[]): string[] {
  const spouses = new Set<string>();
  for (const u of unions) {
    if (u.partner1Id === id && u.partner2Id) spouses.add(u.partner2Id);
    if (u.partner2Id === id && u.partner1Id) spouses.add(u.partner1Id);
  }
  return Array.from(spouses);
}

/**
 * Calculates relationship between any current user and a target person.
 */
export function calculateKinshipBetween(
  userPersonId: string | null | undefined,
  targetPersonId: string,
  persons: Person[],
  unions: FamilyUnion[]
): KinshipInfo {
  const personMap = new Map<string, Person>(persons.map(p => [p.id, p]));
  const target = personMap.get(targetPersonId);

  if (!target) {
    return {
      relationType: 'RELATIVE',
      roleName: 'Familiar',
      greetingName: 'Familiar',
      personalizedPitch: 'Toda historia y anécdota que sumes ayuda a que el legado familiar nunca se pierda.',
      isDirectFamily: false
    };
  }

  if (!userPersonId || userPersonId === targetPersonId) {
    return {
      relationType: 'SELF',
      roleName: 'Tu propia tarjeta',
      greetingName: target.name.split(' ')[0],
      personalizedPitch: 'Esta es tu tarjeta personal en el árbol familiar.',
      isDirectFamily: true
    };
  }

  const userParents = getParentsOf(userPersonId, unions);
  const userChildren = getChildrenOf(userPersonId, unions);
  const userSiblings = getSiblingsOf(userPersonId, unions);
  const userSpouses = getSpousesOf(userPersonId, unions);

  // 1. Is Target Parent of User?
  if (userParents.includes(targetPersonId)) {
    return {
      relationType: 'PARENT',
      roleName: 'Tu Papá / Mamá',
      greetingName: target.name.split(' ')[0],
      personalizedPitch: `Como hijo/a de ${target.name}, tus recuerdos de infancia y sus enseñanzas son irreemplazables.`,
      isDirectFamily: true
    };
  }

  // 2. Is Target Child of User?
  if (userChildren.includes(targetPersonId)) {
    return {
      relationType: 'CHILD',
      roleName: 'Tu Hijo/a',
      greetingName: target.name.split(' ')[0],
      personalizedPitch: `Como papá/mamá de ${target.name}, tus anécdotas de sus primeros años son únicas.`,
      isDirectFamily: true
    };
  }

  // 3. Is Target Sibling of User?
  if (userSiblings.includes(targetPersonId)) {
    return {
      relationType: 'SIBLING',
      roleName: 'Tu Hermano/a',
      greetingName: target.name.split(' ')[0],
      personalizedPitch: `Como hermano/a de ${target.name}, las travesuras y momentos compartidos de chicos son el corazón de la familia.`,
      isDirectFamily: true
    };
  }

  // 4. Is Target Spouse of User?
  if (userSpouses.includes(targetPersonId)) {
    return {
      relationType: 'SPOUSE',
      roleName: 'Tu Pareja / Esposo/a',
      greetingName: target.name.split(' ')[0],
      personalizedPitch: `Su historia de amor y el camino recorrido juntos forman los cimientos de esta rama.`,
      isDirectFamily: true
    };
  }

  // 5. Grandparents of User
  const userGrandparents: string[] = [];
  for (const p of userParents) {
    userGrandparents.push(...getParentsOf(p, unions));
  }
  if (userGrandparents.includes(targetPersonId)) {
    return {
      relationType: 'GRANDPARENT',
      roleName: 'Tu Abuelo/a',
      greetingName: target.name.split(' ')[0],
      personalizedPitch: `Los recuerdos de las visitas a la casa de tus abuelos ${target.name} son un tesoro invaluable.`,
      isDirectFamily: true
    };
  }

  // 6. Grandchildren of User
  const userGrandchildren: string[] = [];
  for (const ch of userChildren) {
    userGrandchildren.push(...getChildrenOf(ch, unions));
  }
  if (userGrandchildren.includes(targetPersonId)) {
    return {
      relationType: 'GRANDCHILD',
      roleName: 'Tu Nieto/a',
      greetingName: target.name.split(' ')[0],
      personalizedPitch: `Ver crecer a ${target.name} es la alegría y continuidad de toda tu historia.`,
      isDirectFamily: true
    };
  }

  // 7. Uncles/Aunts of User
  const userUncles: string[] = [];
  for (const p of userParents) {
    userUncles.push(...getSiblingsOf(p, unions));
  }
  if (userUncles.includes(targetPersonId)) {
    return {
      relationType: 'UNCLE_AUNT',
      roleName: 'Tu Tío/a',
      greetingName: target.name.split(' ')[0],
      personalizedPitch: `Las anécdotas con tu tío/a ${target.name} en los asados y cumpleaños familiares no deben perderse.`,
      isDirectFamily: true
    };
  }

  // 8. Nephews/Nieces of User
  const userNephews: string[] = [];
  for (const sib of userSiblings) {
    userNephews.push(...getChildrenOf(sib, unions));
  }
  if (userNephews.includes(targetPersonId)) {
    return {
      relationType: 'NEPHEW_NIECE',
      roleName: 'Tu Sobrino/a',
      greetingName: target.name.split(' ')[0],
      personalizedPitch: `Como tío/a de ${target.name}, compartís momentos especiales de su crecimiento.`,
      isDirectFamily: true
    };
  }

  // 9. Cousins of User
  const userCousins: string[] = [];
  for (const u of userUncles) {
    userCousins.push(...getChildrenOf(u, unions));
  }
  if (userCousins.includes(targetPersonId)) {
    return {
      relationType: 'COUSIN',
      roleName: 'Tu Primo/a',
      greetingName: target.name.split(' ')[0],
      personalizedPitch: `Las reuniones familiares y veranos compartidos con tu primo/a ${target.name} son recuerdos únicos.`,
      isDirectFamily: true
    };
  }

  // 10. By Branch
  const branchName = target.branch || 'Familia';
  return {
    relationType: 'BRANCH_MEMBER',
    roleName: `Familiar de la Rama ${branchName}`,
    greetingName: target.name.split(' ')[0],
    personalizedPitch: `Como integrante de la rama ${branchName}, tus recuerdos enriquecen toda la historia familiar.`,
    isDirectFamily: false
  };
}

/**
 * Generates custom, personalized questions for the logged-in user to answer about a specific person.
 */
export function getPersonalizedQuestionsForUser(
  userPersonId: string | null | undefined,
  targetPerson: Person,
  persons: Person[],
  unions: FamilyUnion[]
): { question: string; category: string }[] {
  const kinship = calculateKinshipBetween(userPersonId, targetPerson.id, persons, unions);
  const name = targetPerson.name;

  switch (kinship.relationType) {
    case 'PARENT':
      return [
        { question: `¿Qué comida, costumbre o frase típica de los domingos recordás con tu papá/mamá ${name}?`, category: 'Costumbres' },
        { question: `¿Cuál fue la enseñanza o consejo más valioso que te dio ${name}?`, category: 'Enseñanzas' },
        { question: `¿Cómo era un día típico con ${name} cuando eras chico/a?`, category: 'Infancia' },
        { question: `¿Qué anécdota divertida o momento inolvidable vivieron juntos?`, category: 'Anécdotas' }
      ];

    case 'CHILD':
      return [
        { question: `¿Cómo recordás el día en que nació ${name} o sus primeros pasos?`, category: 'Nacimiento' },
        { question: `¿Qué travesura o historia graciosa de su infancia te hace sonreír?`, category: 'Infancia' },
        { question: `¿Qué es lo que más te llena de orgullo de ${name}?`, category: 'Orgullo' }
      ];

    case 'SIBLING':
      return [
        { question: `¿A qué jugaban de chicos con tu hermano/a ${name}?`, category: 'Infancia' },
        { question: `¿Qué travesura o secreto de chicos compartieron que sus padres nunca supieron?`, category: 'Secretos' },
        { question: `¿Cuál fue el momento más divertido o cómico que pasaron juntos?`, category: 'Anécdotas' }
      ];

    case 'SPOUSE':
      return [
        { question: `¿Cómo y dónde se conocieron por primera vez con ${name}?`, category: 'Historia de amor' },
        { question: `¿Qué anécdota del casamiento o de los primeros años juntos recordás con más cariño?`, category: 'Comienzos' },
        { question: `¿Cuál fue el mayor sueño o proyecto que construyeron juntos?`, category: 'Vida compartida' }
      ];

    case 'GRANDPARENT':
      return [
        { question: `¿Cómo era ir a la casa de tus abuelos ${name}? ¿Qué olor, comida o juego recordás?`, category: 'Casa de los Abuelos' },
        { question: `¿Qué historias de su juventud o de cuando llegaron al país te contaba ${name}?`, category: 'Raíces' },
        { question: `¿Qué frase típica o caricia de ${name} quedó grabada en tu memoria?`, category: 'Cariño' }
      ];

    case 'UNCLE_AUNT':
      return [
        { question: `¿Qué anécdota o recuerdo gracioso de los almuerzos familiares tenés con tu tío/a ${name}?`, category: 'Reuniones' },
        { question: `¿Qué apodo o costumbre divertida tenía ${name} en las fiestas?`, category: 'Fiestas' }
      ];

    case 'COUSIN':
      return [
        { question: `¿Qué vacaciones, pijamadas o salidas familiares compartiste con tu primo/a ${name}?`, category: 'Primos' },
        { question: `¿Cuál fue la anécdota más divertida que vivieron juntos en familia?`, category: 'Anécdotas' }
      ];

    case 'SELF':
      return [
        { question: `¿Qué mensaje o recuerdo te gustaría dejarle escrito a las próximas generaciones de la familia?`, category: 'Legado' },
        { question: `¿Cuál fue tu mayor pasión, pasatiempo o recuerdo más feliz de la infancia?`, category: 'Vida' }
      ];

    default:
      return [
        { question: `¿Qué es lo que más recordás, valorás o te contaron sobre ${name}?`, category: 'Recuerdo' },
        { question: `¿Hay alguna anécdota, frase o detalle de ${name} que no quieras que se olvide?`, category: 'Memoria' },
        { question: `¿Qué rol cumplía ${name} en las reuniones familiares?`, category: 'Presencia' }
      ];
  }
}

/**
 * Calculates relationship with Matías Chababo (creator).
 */
export function calculateKinshipWithMatias(
  targetPersonId: string,
  persons: Person[],
  unions: FamilyUnion[]
): KinshipInfo {
  const matiasId = 'matias';
  return calculateKinshipBetween(matiasId, targetPersonId, persons, unions);
}
