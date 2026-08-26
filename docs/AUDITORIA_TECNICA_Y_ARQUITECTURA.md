# 🛠️ Auditoría Técnica y Arquitectura de Software

> **Proyecto**: Dinastía Familiar  
> **Fecha**: Agosto 2026  
> **Autor**: Agente Auditor & Arquitecto de Software  

---

## 1. Estado del Prototipo en `/app`

- **Tech Stack**: React 19.2 + Vite 8.2 + TypeScript 6.0 + `@xyflow/react` v12.11 + Firebase v12.17 + Tailwind CSS v4 + `@dagrejs/dagre`.
- **Estructura**:
  - `src/components/FamilyGraphEngine.tsx`: Motor del grafo genealógico con Dagre auto-layout.
  - `src/components/PersonNode.tsx`: Nodo de persona personalizado con esquema cromático generacional.
  - `src/components/UnionNode.tsx`: Nodo de matrimonio/unión con icono de corazón y conectores.
  - `src/components/ProfileSheet.tsx`: Drawer de perfil con pestañas (Biografía ✔/💬/📜, Audios, Contrapuntos, Valores).
  - `src/components/AudioPlayer.tsx`: Componente reproductor de audio de voz con onda sonora interactiva y transcripción.
  - `src/services/familyService.ts`: Suscripción y persistencia en tiempo real con Firebase Cloud Firestore y fallback offline.
  - `src/utils/layout.ts`: Cálculo automatizado de posiciones $X,Y$ mediante `@dagrejs/dagre`.

---

## 2. Esquemas de Datos (TypeScript / Firestore)

```typescript
export interface Person {
  id: string;
  name: string;
  birthYear?: string;
  deathYear?: string;
  birthPlace?: string;
  photoUrl?: string;
  tags: string[];
  generation: number;
  branch: string;
  bioSummary?: string;
  facts?: FactItem[];
  counterpoints?: CounterpointItem[];
  valuesAndTeachings?: string[];
  audioRecordings?: { id: string; title: string; duration: string; audioUrl: string; transcript: string }[];
}

export interface FamilyUnion {
  id: string;
  partner1Id: string;
  partner2Id?: string;
  unionType?: 'MARRIAGE' | 'PARTNERSHIP' | 'DIVORCED';
  childrenIds: string[];
  marriageYear?: string;
}

export interface MemoryPost {
  id: string;
  personId: string;
  personName: string;
  authorName: string;
  content: string;
  type: 'FACT' | 'OPINION' | 'CONTEXT';
  privacy: 'PUBLIC' | 'BRANCH' | 'DIRECT';
  createdAt: string;
  likes: number;
}
```

---

## 3. Hoja de Ruta de Desarrollo Tecnológico

1. **Fase 1 (Completada en Prototipo)**: Reestructuración de Grafo con Nodos de Unión Matrimonial, Auto-Layout con `@dagrejs/dagre`, Servicio Firestore Realtime.
2. **Fase 2**: Ficha de Perfil Rica + Hub Multimedia de Audios y Transcripciones.
3. **Fase 3**: Feed Social de Recuerdos (*"Compartió un recuerdo contigo"*).
4. **Fase 4**: Línea de Tiempo Histórica Síncrona + Mapa Interactivo de Migraciones (Leaflet).
5. **Fase 5**: Búsqueda Global, Filtros Avanzados y Exportador a PDF / Libro Físico POD con QR.
