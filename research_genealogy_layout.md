# 🔬 Research: Cómo los Árboles Genealógicos Profesionales Resuelven el Layout

Fuentes: Ancestry.com, FamilySearch, MyHeritage, Gramps, GenoPro, HaploPainter, FamilyTreeJS (BALKANGraph), GoJS, yFiles, estándares NSGC y GEDCOM.

---

## 🎯 Hallazgo Principal: Nos falta la "Barra de Hermanos"

El problema de hermanos desconectados se resuelve universalmente con un patrón llamado **"Bus Bar" o "Sibship Rail"** (barra de hermandad). **Ningún software profesional conecta hijos directamente al corazón/unión con líneas individuales.**

### Patrón estándar (lo que usan TODOS los profesionales):

```
       [Mamá] ═══ ❤ ═══ [Papá]
                  │
                  │  ← Línea de descenso (1 sola)
    ┌─────────────┼─────────────┐  ← BARRA DE HERMANOS (horizontal)
    │             │             │
    ▼             ▼             ▼
 [Hijo 1]     [Hijo 2]      [Hijo 3]
```

### Lo que tenemos hoy (incorrecto):

```
       [Mamá] ═══ ❤ ═══ [Papá]
                 /│\
                / │ \   ← 3 líneas separadas desde el corazón
               /  │  \
              ▼   ▼   ▼
          [H1]  [H2]  [H3]   ← no se ven como hermanos
```

> La barra horizontal es lo que inmediatamente comunica "estos son hermanos" sin necesidad de trazar líneas. Es un patrón Gestalt de agrupación por proximidad + conexión.

---

## 📐 Spacing: La Regla del 1:3

El segundo hallazgo clave es la **proporción de espaciado**:

| Tipo de gap | Medida | Nuestro valor actual |
|---|---|---|
| **Entre hermanos** (intra-sibling) | 20-32px | 50px ❌ (demasiado) |
| **Entre familias** (inter-family) | 64-120px | 50px ❌ (muy poco) |

> La proporción correcta es 1:3 o 1:4 → hermanos MUY juntos (24px), familias BIEN separadas (72-96px). Esto hace que el ojo agrupe automáticamente a los hermanos antes de leer las líneas.

---

## 💍 Matrimonios Múltiples (como Teófilo)

Para personas con 2 esposas/esposos, el patrón estándar es **inline horizontal**:

```
[Sofía] ─── ❤₁ ─── [Teófilo] ─── ❤₂ ─── [Bahíe]
                        │                    │
              hijos de ❤₁           hijos de ❤₂
```

Para 3+ parejas: usar un badge expandible (+1 Pareja) o nodos "clon".

---

## 📊 Convenciones Visuales de Líneas

| Relación | Estilo de línea | Grosor |
|---|---|---|
| Pareja → Unión | Sólida horizontal | 2.0-2.5px |
| Unión → Barra hermanos | Sólida vertical | 1.5-2.0px |
| Barra hermanos | Sólida horizontal | 1.5-2.0px |
| Barra → Hijo | Sólida vertical | 1.5-2.0px |
| Adopción | Punteada | 1.5px |
| Divorcio | Doble barra diagonal // | 2.0px |

---

## 🏗️ Algoritmo de Layout Recomendado

Los profesionales usan Walker / Reingold-Tilford modificado (que es exactamente lo que implementamos), pero con estas mejoras:

1. **Generational Snapping**: Todas las personas de la misma generación están EXACTAMENTE en el mismo Y. ✅ Ya lo hacemos.
2. **Subtree Compaction**: En vez de reservar el ancho máximo para cada rama, computar el contorno irregular de cada subárbol y acomodarlos más cerca.
3. **Nuclear Family Clustering**: Tratar la unidad familiar (padre+madre+hijos) como un bloque atómico que no se puede separar durante el layout.

---

## 🎨 Mejoras Aplicables a Nuestro Proyecto

### Prioridad 1 — Barra de Hermanos (ALTO IMPACTO)
Reemplazar las 3+ líneas smoothstep individuales por un Edge en formato "step" que conecte todos los hermanos de manera ortogonal.

### Prioridad 2 — Ajustar Spacing (ALTO IMPACTO, FÁCIL)
- HORIZONTAL_GAP entre hermanos: 24-30px
- TREE_GAP entre familias: 96-120px

### Prioridad 3 — Matrimonios Múltiples Inline
Para Teófilo: [Sofía] ❤₁ [Teófilo] ❤₂ [Bahíe] en vez de dos árboles separados.

### Prioridad 4 — Progressive Disclosure
- Mostrar solo 3-4 generaciones por defecto
- Badge +N descendientes en nodos colapsados
- Botón "Ver árbol desde acá" en cada persona
