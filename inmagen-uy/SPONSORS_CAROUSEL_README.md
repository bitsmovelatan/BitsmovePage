# Carrusel de Promotores - Documentación

## 📍 Descripción

Componente de carrusel que se mantiene fijo en la parte inferior de la página durante el scroll, mostrando los logos de los promotores/patrocinadores en una animación continua.

## 🎨 Características

- **Posición fija**: Se mantiene visible en la parte inferior durante el scroll
- **Animación infinita**: Los logos se mueven continuamente en bucle
- **Pausa al hover**: La animación se detiene al pasar el mouse sobre los logos
- **Responsive**: Adaptado para móviles y tablets
- **Gradientes laterales**: Efecto de fade-in/fade-out en los bordes
- **Standalone**: No afecta el código existente

## 📂 Archivos Creados

```
src/app/shared/sponsors-carousel/
├── sponsors-carousel.ts          # Componente TypeScript
├── sponsors-carousel.html        # Template HTML
└── sponsors-carousel.scss        # Estilos SCSS
```

## 🚀 Cómo Usar

### El carrusel está ACTIVO por defecto

El componente ya está integrado en el layout principal. Si quieres **desactivarlo**:

1. Abre `/src/app/layout/layout.html`
2. Comenta la línea 53:
   ```html
   <!-- <app-sponsors-carousel></app-sponsors-carousel> -->
   ```

### Personalizar los Logos

1. Abre `/src/app/shared/sponsors-carousel/sponsors-carousel.ts`
2. Modifica el array `sponsors`:

```typescript
sponsors = [
  { name: 'Mi Empresa', logo: '/assets/sponsors/empresa1.png' },
  { name: 'Socio 2', logo: '/assets/sponsors/empresa2.png' },
  // ... más logos
];
```

### Cambiar Colores

Edita `/src/app/shared/sponsors-carousel/sponsors-carousel.scss`:

```scss
.sponsors-carousel-container {
  background: linear-gradient(90deg, #TuColor1 0%, #TuColor2 50%, #TuColor1 100%);
}
```

### Ajustar Velocidad de Animación

En el archivo SCSS, cambia la duración:

```scss
.carousel-track {
  animation: scroll 40s linear infinite; // Cambia 40s a tu preferencia
}
```

## 🎯 Opciones de Configuración

### Altura del Carrusel

**Desktop**: 80px (línea 9 del SCSS)
**Mobile**: 60px (línea 57 del SCSS)
**Mobile pequeño**: 50px (línea 77 del SCSS)

### Velocidad por Dispositivo

- **Desktop**: 40 segundos
- **Mobile**: 25 segundos
- **Mobile pequeño**: 20 segundos

### Tamaño de Logos

**Desktop**: 
- Altura: 50px
- Ancho máximo: 140px

**Mobile**:
- Altura: 35px
- Ancho máximo: 100px

## 🎨 Personalización Avanzada

### Cambiar Filtro de Imágenes

Por defecto, los logos se muestran en blanco. Para cambiar esto:

```scss
img {
  filter: brightness(0) invert(1); // Quita esta línea para usar colores originales
  // O usa: filter: grayscale(1); para escala de grises
}
```

### Ajustar Espaciado

```scss
.sponsor-item {
  padding: 0 30px; // Aumenta/disminuye el espacio entre logos
}
```

### Modificar Gradientes

```scss
.carousel-gradient-left,
.carousel-gradient-right {
  width: 100px; // Aumenta para un fade más suave
}
```

## 📱 Responsividad

El carrusel se adapta automáticamente a:
- 🖥️ Desktop (>768px): Carrusel completo
- 📱 Tablet (≤768px): Carrusel optimizado
- 📱 Mobile (≤480px): Carrusel compacto

## ⚙️ Comportamiento

1. **Animación Continua**: Los logos se mueven de derecha a izquierda
2. **Loop Infinito**: Al llegar al final, vuelve al inicio sin saltos
3. **Interacción**: La animación se pausa al hacer hover sobre un logo
4. **Performance**: Usa `will-change` para optimización de GPU

## 🔧 Desinstalar/Remover

Si quieres eliminar completamente el componente:

1. Elimina la carpeta: `src/app/shared/sponsors-carousel/`
2. En `src/app/layout/layout.ts`, elimina la línea 14:
   ```typescript
   import { SponsorsCarouselComponent } from '../shared/sponsors-carousel/sponsors-carousel';
   ```
3. En el mismo archivo, elimina de la línea 30:
   ```typescript
   SponsorsCarouselComponent // Quitar esta línea del array imports
   ```
4. En `src/app/layout/layout.html`, elimina la línea 53:
   ```html
   <app-sponsors-carousel></app-sponsors-carousel>
   ```
5. En `src/app/layout/layout.scss`, restaura el padding original:
   - Línea 134: cambiar a `padding-bottom: 32px;`
   - Línea 154: cambiar a `padding-bottom: 16px;`

## 💡 Consejos

- **Logos uniformes**: Usa imágenes PNG con fondo transparente
- **Tamaño consistente**: Mantén proporciones similares en todos los logos
- **Cantidad óptima**: 5-8 logos para mejor visualización
- **Formato**: SVG o PNG de alta calidad para mejor escalabilidad

## 📝 Notas

- El componente es **standalone** y no requiere módulos adicionales
- Los placeholders actuales usan `via.placeholder.com` (reemplázalos con logos reales)
- El z-index es 999 para mantenerse sobre el contenido pero bajo modales

---

**Versión**: 1.0.0  
**Última actualización**: Octubre 2025


