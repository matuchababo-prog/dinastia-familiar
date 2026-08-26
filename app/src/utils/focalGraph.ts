import type { Person, FamilyUnion } from '../types/family';

/**
 * Returns the set of person IDs that belong to the focal person's expanded family tree:
 * - Focal person
 * - All ancestors (parents, grandparents, etc.)
 * - All descendants (children, grandchildren, etc.)
 * - Direct siblings
 * - All spouses/partners of any person in this subgraph
 */
export function getFocalPersonSubgraph(
  focalPersonId: string,
  persons: Person[],
  unions: FamilyUnion[]
): Set<string> {
  const resultIds = new Set<string>();
  const personIds = new Set(persons.map(p => p.id));
  
  if (!personIds.has(focalPersonId)) return resultIds;

  // Build lookups
  const childOf = new Map<string, FamilyUnion>();
  const partnerIn = new Map<string, FamilyUnion[]>();

  unions.forEach(u => {
    u.childrenIds.forEach(cid => {
      if (personIds.has(cid)) childOf.set(cid, u);
    });
    [u.partner1Id, u.partner2Id].forEach(pid => {
      if (pid && personIds.has(pid)) {
        if (!partnerIn.has(pid)) partnerIn.set(pid, []);
        partnerIn.get(pid)!.push(u);
      }
    });
  });

  // 1. Add Focal Person
  resultIds.add(focalPersonId);

  // 2. Add Ancestors (recursive upwards)
  const addAncestors = (personId: string) => {
    const parentUnion = childOf.get(personId);
    if (!parentUnion) return;
    
    [parentUnion.partner1Id, parentUnion.partner2Id].forEach(pid => {
      if (pid && personIds.has(pid) && !resultIds.has(pid)) {
        resultIds.add(pid);
        addAncestors(pid);
      }
    });
  };
  addAncestors(focalPersonId);

  // 3. Add Descendants (recursive downwards)
  const addDescendants = (personId: string) => {
    const unionsAsPartner = partnerIn.get(personId) || [];
    unionsAsPartner.forEach(u => {
      // Also add partners of this union
      [u.partner1Id, u.partner2Id].forEach(pid => {
        if (pid && personIds.has(pid)) resultIds.add(pid);
      });
      u.childrenIds.forEach(cid => {
        if (personIds.has(cid) && !resultIds.has(cid)) {
          resultIds.add(cid);
          addDescendants(cid);
        }
      });
    });
  };
  addDescendants(focalPersonId);

  // 4. Add Spouses of Focal Person
  const unionsAsPartner = partnerIn.get(focalPersonId) || [];
  unionsAsPartner.forEach(u => {
    [u.partner1Id, u.partner2Id].forEach(pid => {
      if (pid && personIds.has(pid)) {
        resultIds.add(pid);
      }
    });
  });

  // 5. Add Siblings of Focal Person (children of their parent union)
  const focalParentUnion = childOf.get(focalPersonId);
  if (focalParentUnion) {
    focalParentUnion.childrenIds.forEach(cid => {
      if (personIds.has(cid)) {
        resultIds.add(cid);
        // Include spouses of siblings
        const sibUnions = partnerIn.get(cid) || [];
        sibUnions.forEach(su => {
          [su.partner1Id, su.partner2Id].forEach(pid => {
            if (pid && personIds.has(pid)) resultIds.add(pid);
          });
        });
      }
    });
  }

  // 6. Complete coverage: Ensure all spouses in unions of any included person are present
  unions.forEach(u => {
    const hasP1 = u.partner1Id && resultIds.has(u.partner1Id);
    const hasP2 = u.partner2Id && resultIds.has(u.partner2Id);
    if (hasP1 && u.partner2Id && personIds.has(u.partner2Id)) resultIds.add(u.partner2Id);
    if (hasP2 && u.partner1Id && personIds.has(u.partner1Id)) resultIds.add(u.partner1Id);
  });

  return resultIds;
}

/**
 * Returns the set of person IDs that belong to a family branch lineage:
 * - Direct members of that branch
 * - All their descendants (children, grandchildren, etc. regardless of surname change)
 * - All their spouses/partners
 */
export function getBranchSubgraph(
  branchName: string,
  persons: Person[],
  unions: FamilyUnion[]
): Set<string> {
  const resultIds = new Set<string>();
  const personIds = new Set(persons.map(p => p.id));
  const targetBranch = branchName.trim().toLowerCase();

  // Build lookups
  const partnerIn = new Map<string, FamilyUnion[]>();

  unions.forEach(u => {
    [u.partner1Id, u.partner2Id].forEach(pid => {
      if (pid && personIds.has(pid)) {
        if (!partnerIn.has(pid)) partnerIn.set(pid, []);
        partnerIn.get(pid)!.push(u);
      }
    });
  });

  // Find all seed persons that belong to this branch
  const seedPersons = persons.filter(p => {
    const pBranch = (p.branch || '').toLowerCase();
    const matchesDirect = pBranch === targetBranch || pBranch === `familia ${targetBranch}` || `familia ${pBranch}` === targetBranch;
    const matchesTag = p.tags && p.tags.some(t => t.toLowerCase().includes(targetBranch));
    return matchesDirect || matchesTag;
  });

  // Recursively add all descendants of a person
  const addDescendants = (personId: string) => {
    const unionsAsPartner = partnerIn.get(personId) || [];
    unionsAsPartner.forEach(u => {
      [u.partner1Id, u.partner2Id].forEach(pid => {
        if (pid && personIds.has(pid)) resultIds.add(pid);
      });
      u.childrenIds.forEach(cid => {
        if (personIds.has(cid) && !resultIds.has(cid)) {
          resultIds.add(cid);
          addDescendants(cid);
        }
      });
    });
  };

  // Add seed persons + their descendants
  seedPersons.forEach(p => {
    resultIds.add(p.id);
    addDescendants(p.id);
  });

  // Include spouses of all matched members
  unions.forEach(u => {
    const hasP1 = u.partner1Id && resultIds.has(u.partner1Id);
    const hasP2 = u.partner2Id && resultIds.has(u.partner2Id);
    if (hasP1 && u.partner2Id && personIds.has(u.partner2Id)) resultIds.add(u.partner2Id);
    if (hasP2 && u.partner1Id && personIds.has(u.partner1Id)) resultIds.add(u.partner1Id);
  });

  return resultIds;
}

