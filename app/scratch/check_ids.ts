import { INITIAL_PERSONS, INITIAL_UNIONS } from '../src/data/initialFamily.ts';

const personIds = new Set(INITIAL_PERSONS.map(p => p.id));
let hasError = false;

for (const union of INITIAL_UNIONS) {
  if (union.partner1Id && !personIds.has(union.partner1Id)) {
    console.error(`Union ${union.id} references undefined partner1Id: ${union.partner1Id}`);
    hasError = true;
  }
  if (union.partner2Id && !personIds.has(union.partner2Id)) {
    console.error(`Union ${union.id} references undefined partner2Id: ${union.partner2Id}`);
    hasError = true;
  }
  for (const childId of union.childrenIds || []) {
    if (!personIds.has(childId)) {
      console.error(`Union ${union.id} references undefined childId: ${childId}`);
      hasError = true;
    }
  }
}

if (!hasError) {
  console.log("All IDs are valid!");
}
