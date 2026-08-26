# 🌳 Proyecto: Raíces y Rumbos (Árbol Genealógico Interactivo & Preservación de Legado)

> **Misión**: Preservar y transmitir la historia, valores y aprendizajes familiares para que los descendientes tengan raíces claras y dirección de futuro.

---

## 📚 Índice de Documentación e Investigaciones para Agentes Futuros

Toda la investigación, estrategia de negocio, especificaciones de producto y arquitectura técnica realizadas por el equipo de agentes se encuentran archivadas y documentadas en la carpeta `docs/` y en el plan maestro:

1. 📄 [**Plan Maestro de Implementación**](file:///Users/matiaschababo/.gemini/antigravity/brain/695d30cf-c67a-40d1-b1b2-868fe87b1c9c/implementation_plan.md): Hoja de ruta ejecutiva aprobada.
2. 📊 [**Investigación de Mercado, Competencia y Monetización**](file:///Users/matiaschababo/Desktop/Antigravity%20projects/Arbol%20Familiar/docs/INVESTIGACION_NEGOCIO_Y_MERCADO.md): Análisis de Ancestry, MyHeritage, Remento, Océano Azul, modelos SaaS Freemium, Impresión POD de libros con QR y Concierge.
3. 📖 [**Investigación Narrativa, Literaria y Metodología**](file:///Users/matiaschababo/Desktop/Antigravity%20projects/Arbol%20Familiar/docs/INVESTIGACION_NARRATIVA_Y_METODOLOGIA.md): Concepto *"Raíces y Rumbos"*, cuestionario de entrevistas en 5 bloques, marcas de veracidad (✔ Hecho, 💬 Opinión, 📜 Contexto), contrapuntos y cartas al futuro.
4. 🎨 [**Especificación de Producto y Experiencia UX/UI**](file:///Users/matiaschababo/Desktop/Antigravity%20projects/Arbol%20Familiar/docs/ESPECIFICACION_PRODUCTO_UX_UI.md): Specs del Infinite Canvas, nodos de persona/unión, feed social de recuerdos, timeline síncrona y mapa migratorio.
5. 🛠️ [**Auditoría Técnica y Arquitectura de Software**](file:///Users/matiaschababo/Desktop/Antigravity%20projects/Arbol%20Familiar/docs/AUDITORIA_TECNICA_Y_ARQUITECTURA.md): Estado del prototipo en `/app`, modelo de entidades en TypeScript, Auto-Layout con `@dagrejs/dagre`, y sincronización con Firebase Cloud Firestore.
6. 📝 [**Especificación Original del Proyecto (`Arbol familiar, proyecto.md`)**](file:///Users/matiaschababo/Desktop/Antigravity%20projects/Arbol%20Familiar/Arbol%20familiar,%20proyecto.md): Ideas del fundador y visión del legado.

---

## 🚀 Estructura del Repositorio

```
Arbol Familiar/
├── README.md                                  # Índice general de documentación
├── Arbol familiar, proyecto.md                # Documento original con las ideas del fundador
├── docs/                                      # Documentación generada por agentes
│   ├── INVESTIGACION_NEGOCIO_Y_MERCADO.md    # Estudio de mercado, competidores y monetización
│   ├── INVESTIGACION_NARRATIVA_Y_METODOLOGIA.md # Metodología de entrevistas, sesgos y libro
│   ├── ESPECIFICACION_PRODUCTO_UX_UI.md       # Specs de UX/UI, canvas, feed y sitemap
│   └── AUDITORIA_TECNICA_Y_ARQUITECTURA.md    # Diagnóstico técnico, esquemas DB y roadmap
└── app/                                       # Aplicación Web React 19 + Vite + TypeScript
    ├── package.json                           # Dependencias (React Flow, Dagre, Firebase, etc.)
    ├── src/
    │   ├── components/                        # Componentes UI (FamilyGraphEngine, PersonNode, UnionNode, ProfileSheet, AudioPlayer)
    │   ├── data/                              # Datos iniciales rich (initialFamily.ts)
    │   ├── services/                          # Persistencia Firebase Firestore Realtime (familyService.ts)
    │   ├── types/                             # Modelos TypeScript (family.ts)
    │   └── utils/                             # Algoritmo de Auto-Layout Dagre (layout.ts)
```

---

## 💻 Instrucciones para Ejecutar la Aplicación

```bash
cd app
npm install
npm run dev
```

La aplicación abrirá la vista interactiva del árbol con Auto-Layout dinámico, nodos de unión matrimonial, perfiles multimediales enriquecidos (con reproductor de audios y marcado ✔/💬/📜) y sincronización con Firestore.
