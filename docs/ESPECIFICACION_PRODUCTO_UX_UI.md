# 🎨 Especificación de Producto y Experiencia UX/UI

> **Proyecto**: Raíces y Rumbos  
> **Fecha**: Agosto 2026  
> **Autor**: Agente Diseñador de Producto & UX/UI  

---

## 1. Módulos de la Aplicación

### Módulo 1: Visualización del Árbol Genealógico (Infinite Canvas UX)
- **Navegación**: Pan & zoom libre de 360°, minimap en esquina inferior derecha, recentrado con lerp de cámara al seleccionar un nodo.
- **Nodos de Persona**: Portrait con avatar circular, nombre completo, apodo, años de vida, píldora de generación, e indicadores de contenido (`🎙️ 2 audios`, `💬 4 hechos`).
- **Nodos de Unión Matrimonial**: Conector visual con icono de corazón y fechas de matrimonio.
- **Paleta de Colores por Generación**:
  - *Gen 1 (Ancestros):* Sepia/Café Cobre (`#d97706`)
  - *Gen 2 (Abuelos):* Verde Oliva (`#059669`)
  - *Gen 3 (Padres/Actual):* Azul Slate (`#2563eb`)
  - *Gen 4+ (Descendientes):* Esmeralda (`#10b981`)

### Módulo 2: Ficha de Persona (Drawer de Legado)
- Drawer emergente con 4 pestañas:
  1. **Historia & Vida**: Biografía con marcas de veracidad (✔/💬/📜).
  2. **Galería & Audios**: Reproductor de audio con onda sonora y transcripción sincronizada.
  3. **Testimonios Cruzados (Contrapuntos)**: Vista comparativa a dos columnas.
  4. **Valores & Manifiesto**: Lecciones de vida.

### Módulo 3: Feed Social de Recuerdos ("Compartió un recuerdo contigo")
- Stream privado de recuerdos con notificaciones intergeneracionales.
- Etiquetado de personas, fechas y temas (`#TrabajoDuro`, `#RecetaFamiliar`).
- Privacidad a 3 niveles: `PÚBLICO_FAMILIA`, `RAMA_PRIVADA`, `DIRECTO_DM`.

### Módulo 4: Herramientas Avanzadas
- **Línea de Tiempo Síncrona**: Carril de eventos familiares en paralelo con el carril de contexto histórico mundial.
- **Mapa Interactivo de Migración**: Rutas animadas y scrubber temporal de décadas.
- **Filtros por Habilidades & Valores**: Filtrado del árbol por oficios (músicos, educadores) o virtudes.

---

## 2. Mapa del Sitio (Sitemap)

```
 🏠 INICIO / DASHBOARD
 ├── 🌳 ÁRBOL INTERACTIVO (Infinite Canvas + Auto-Layout)
 │    ├── [Ficha de Persona] -> (Biografía, Galería, Audios, Contrapuntos, Valores)
 │    └── [Nodo de Unión] -> (Historia del matrimonio, Hijos)
 ├── 📰 FEED DE RECUERDOS ("Compartió un recuerdo contigo")
 ├── 🗺️ HERRAMIENTAS DE CONTEXTO (Timeline Síncrona & Mapa Migratorio)
 └── 📚 CENTRO DE EXPORTACIÓN (Libro Físico POD con QR & PDF Interactivo)
```
