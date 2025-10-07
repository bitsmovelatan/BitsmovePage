# 🚀 Quick Start - Carrusel de Promotores

## ⚡ Inicio Rápido (2 minutos)

### ✅ ¿Qué se ha creado?

El carrusel ya está **ACTIVO** y funcionando. Solo necesitas personalizar los logos.

### 📍 Archivos Importantes

```
src/app/shared/sponsors-carousel/
├── sponsors-carousel.ts          ← Aquí cambias los logos
├── sponsors-carousel.html        ← Template HTML
└── sponsors-carousel.scss        ← Aquí cambias colores/estilos

Documentación:
├── SPONSORS_CAROUSEL_README.md   ← Documentación completa
├── CAROUSEL_CUSTOMIZATION.md     ← Guía de personalización
├── sponsors-carousel.example.ts  ← Ejemplos de configuración
└── toggle-carousel.sh            ← Script on/off
```

---

## 🎯 3 Pasos para Personalizar

### 1️⃣ Agrega tus Logos (1 min)

Abre: `src/app/shared/sponsors-carousel/sponsors-carousel.ts`

```typescript
sponsors = [
  { name: 'Mi Empresa', logo: '/assets/sponsors/empresa1.png' },
  { name: 'Socio 2', logo: '/assets/sponsors/empresa2.png' },
  { name: 'Socio 3', logo: '/assets/sponsors/empresa3.png' },
  // Agrega más...
];
```

### 2️⃣ Coloca las Imágenes (30 seg)

Crea la carpeta y coloca tus logos:
```bash
mkdir -p src/assets/sponsors
# Copia tus logos PNG/SVG aquí
```

### 3️⃣ Ajusta Colores (opcional, 30 seg)

Abre: `src/app/shared/sponsors-carousel/sponsors-carousel.scss`

```scss
.sponsors-carousel-container {
  background: linear-gradient(90deg, #TU_COLOR 0%, #TU_COLOR2 50%, #TU_COLOR 100%);
}
```

---

## 🎨 Temas Pre-configurados

Copia y pega uno de estos en el archivo SCSS:

### Tema Claro
```scss
.sponsors-carousel-container {
  background: linear-gradient(90deg, #f5f5f5 0%, #ffffff 50%, #f5f5f5 100%);
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
}
.sponsor-item img {
  filter: none;
  opacity: 0.7;
}
```

### Tema Dorado
```scss
.sponsors-carousel-container {
  background: linear-gradient(90deg, #c9a961 0%, #f4e4b7 50%, #c9a961 100%);
}
```

### Tema Tech
```scss
.sponsors-carousel-container {
  background: rgba(13, 17, 23, 0.9);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}
```

---

## 🎛️ Controles Rápidos

### Activar/Desactivar

**Opción 1: Script (Recomendado)**
```bash
./toggle-carousel.sh off  # Desactivar
./toggle-carousel.sh on   # Activar
```

**Opción 2: Manual**
En `src/app/layout/layout.html` línea 53:
```html
<!-- Comentar para desactivar: -->
<!-- <app-sponsors-carousel></app-sponsors-carousel> -->

<!-- Descomentar para activar: -->
<app-sponsors-carousel></app-sponsors-carousel>
```

---

## ⚙️ Ajustes Comunes

### Cambiar Velocidad
```scss
// En sponsors-carousel.scss
.carousel-track {
  animation: scroll 40s linear infinite; // Cambia 40s
}
```

### Cambiar Altura
```scss
.sponsors-carousel-container {
  height: 80px; // Cambia este valor
}
```

### Cambiar Tamaño de Logos
```scss
.sponsor-item img {
  height: 50px; // Cambia este valor
}
```

---

## 🔥 Casos de Uso Comunes

### Usar Logos Externos (Sin descargar)
```typescript
sponsors = [
  { name: 'Google', logo: 'https://ejemplo.com/logo.png' },
];
```

### Logos con Links Clicables

**Paso 1** - Actualiza el TypeScript:
```typescript
sponsors = [
  { 
    name: 'Sponsor 1', 
    logo: '/assets/sponsors/1.png',
    url: 'https://sponsor1.com' 
  },
];
```

**Paso 2** - Actualiza el HTML:
```html
<div class="sponsor-item">
  <a [href]="sponsor.url" target="_blank" rel="noopener">
    <img [src]="sponsor.logo" [alt]="sponsor.name" />
  </a>
</div>
```

---

## 📱 Vista Previa

Para ver los cambios:
```bash
npm start
```

Abre: `http://localhost:4200`

El carrusel estará en la **parte inferior** de la página.

---

## 🆘 Solución de Problemas

### ❌ No veo el carrusel
- Verifica que esté descomentado en `layout.html`
- Revisa la consola del navegador (F12)

### ❌ Los logos no se ven
- Verifica las rutas de las imágenes
- Asegúrate de que las imágenes existan en `/assets/sponsors/`

### ❌ El carrusel tapa el contenido
- El padding ya está configurado automáticamente
- Si lo desactivaste, restaura las líneas 134 y 154 en `layout.scss`

### ❌ Animación muy rápida/lenta
- Ajusta la duración en línea 17 del archivo SCSS:
  ```scss
  animation: scroll 40s linear infinite; // Más segundos = más lento
  ```

---

## 📚 Documentación Completa

- **README Principal**: `SPONSORS_CAROUSEL_README.md`
- **Personalización Avanzada**: `CAROUSEL_CUSTOMIZATION.md`
- **Ejemplos de Código**: `sponsors-carousel.example.ts`

---

## 💡 Tips Profesionales

1. **Logos uniformes**: Usa el mismo tamaño/proporción
2. **Fondo transparente**: PNG con transparencia funciona mejor
3. **Cantidad óptima**: 5-8 logos se ven mejor
4. **Peso ligero**: Comprime las imágenes (<50KB cada una)
5. **Nombres descriptivos**: `mi-empresa-logo.png` en lugar de `logo1.png`

---

## ✅ Checklist de Implementación

- [ ] Agregar logos en `sponsors-carousel.ts`
- [ ] Colocar archivos en `/assets/sponsors/`
- [ ] Probar en navegador (`npm start`)
- [ ] Ajustar colores si es necesario
- [ ] Probar en móvil/tablet
- [ ] Verificar velocidad de animación
- [ ] (Opcional) Agregar links a sponsors
- [ ] (Opcional) Personalizar efectos hover

---

**🎉 ¡Listo! Tu carrusel está funcionando.**

¿Preguntas? Revisa la documentación completa o el código comentado.


