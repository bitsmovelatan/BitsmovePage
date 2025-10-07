# 🎨 Guía de Personalización del Carrusel de Promotores

## 📋 Índice
1. [Esquemas de Color](#esquemas-de-color)
2. [Variantes de Diseño](#variantes-de-diseño)
3. [Efectos y Animaciones](#efectos-y-animaciones)
4. [Configuraciones Populares](#configuraciones-populares)

---

## 🎨 Esquemas de Color

### Tema Oscuro Elegante (Actual)
```scss
.sponsors-carousel-container {
  background: linear-gradient(90deg, #1a237e 0%, #283593 50%, #1a237e 100%);
}
```

### Tema Claro Profesional
```scss
.sponsors-carousel-container {
  background: linear-gradient(90deg, #f5f5f5 0%, #ffffff 50%, #f5f5f5 100%);
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
}

.sponsor-item img {
  filter: none; // Mostrar logos en colores originales
  opacity: 0.7;
}
```

### Tema Dorado Premium
```scss
.sponsors-carousel-container {
  background: linear-gradient(90deg, #c9a961 0%, #f4e4b7 50%, #c9a961 100%);
  box-shadow: 0 -4px 16px rgba(201, 169, 97, 0.3);
}

.sponsor-item img {
  filter: brightness(0) invert(1);
  opacity: 0.9;
}
```

### Tema Gradiente Moderno
```scss
.sponsors-carousel-container {
  background: linear-gradient(
    90deg,
    #667eea 0%,
    #764ba2 25%,
    #f093fb 50%,
    #764ba2 75%,
    #667eea 100%
  );
}
```

### Tema Corporativo Azul
```scss
.sponsors-carousel-container {
  background: linear-gradient(90deg, #0052cc 0%, #0065ff 50%, #0052cc 100%);
}
```

### Tema Verde Ecológico
```scss
.sponsors-carousel-container {
  background: linear-gradient(90deg, #1b5e20 0%, #2e7d32 50%, #1b5e20 100%);
}
```

---

## 🎭 Variantes de Diseño

### Diseño 1: Borde Superior con Sombra
```scss
.sponsors-carousel-container {
  border-top: 3px solid #ff9800;
  box-shadow: 0 -6px 20px rgba(0, 0, 0, 0.2);
}
```

### Diseño 2: Carrusel Semi-Transparente
```scss
.sponsors-carousel-container {
  background: rgba(26, 35, 126, 0.95);
  backdrop-filter: blur(10px);
}
```

### Diseño 3: Con Línea Divisoria
```scss
.sponsors-carousel-container {
  background: linear-gradient(90deg, #1a237e 0%, #283593 50%, #1a237e 100%);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, 
      transparent 0%, 
      #ffffff 50%, 
      transparent 100%
    );
  }
}
```

### Diseño 4: Carrusel con Patrón
```scss
.sponsors-carousel-container {
  background: #1a237e;
  background-image: 
    repeating-linear-gradient(
      45deg,
      transparent,
      transparent 35px,
      rgba(255, 255, 255, 0.05) 35px,
      rgba(255, 255, 255, 0.05) 70px
    );
}
```

---

## ✨ Efectos y Animaciones

### Efecto 1: Logos con Escala al Hover
```scss
.sponsor-item img {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    transform: scale(1.2) rotate(2deg);
    opacity: 1;
    filter: drop-shadow(0 4px 8px rgba(255, 255, 255, 0.3));
  }
}
```

### Efecto 2: Glow al Pasar el Mouse
```scss
.sponsor-item img:hover {
  filter: brightness(0) invert(1) drop-shadow(0 0 10px #fff);
  transform: scale(1.15);
}
```

### Efecto 3: Animación de Pulso
```scss
@keyframes pulse {
  0%, 100% { opacity: 0.85; }
  50% { opacity: 1; }
}

.sponsor-item img {
  animation: pulse 3s ease-in-out infinite;
  
  &:hover {
    animation: none;
  }
}
```

### Efecto 4: Rotación Suave Continua
```scss
.sponsor-item img {
  transition: transform 0.6s ease;
  
  &:hover {
    transform: rotate(360deg) scale(1.1);
  }
}
```

### Efecto 5: Desenfoque a Enfoque
```scss
.sponsor-item img {
  filter: brightness(0) invert(1) blur(1px);
  
  &:hover {
    filter: brightness(0) invert(1) blur(0);
  }
}
```

---

## 🔥 Configuraciones Populares

### Configuración 1: E-commerce / Tienda Online
```scss
// Colores vibrantes y llamativos
.sponsors-carousel-container {
  background: linear-gradient(90deg, #ff6b6b 0%, #ff8e53 50%, #ff6b6b 100%);
  height: 70px;
}

.sponsor-item {
  padding: 0 25px;
  
  img {
    height: 45px;
    filter: brightness(0) invert(1);
    transition: all 0.3s ease;
    
    &:hover {
      transform: scale(1.15) translateY(-3px);
      filter: brightness(0) invert(1) drop-shadow(0 4px 8px rgba(255,255,255,0.5));
    }
  }
}
```

### Configuración 2: Corporativo / Empresarial
```scss
// Estilo profesional y sobrio
.sponsors-carousel-container {
  background: #ffffff;
  border-top: 1px solid #e0e0e0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
  height: 90px;
}

.sponsor-item {
  padding: 0 40px;
  
  img {
    height: 60px;
    filter: grayscale(100%);
    opacity: 0.6;
    transition: all 0.3s ease;
    
    &:hover {
      filter: grayscale(0%);
      opacity: 1;
    }
  }
}

.carousel-gradient-left,
.carousel-gradient-right {
  background: none;
}
```

### Configuración 3: Evento / Conferencia
```scss
// Estilo dinámico y energético
.sponsors-carousel-container {
  background: linear-gradient(
    90deg,
    #8e2de2 0%,
    #4a00e0 25%,
    #8e2de2 50%,
    #4a00e0 75%,
    #8e2de2 100%
  );
  height: 85px;
  border-top: 3px solid #ffd700;
}

.sponsor-item {
  padding: 0 35px;
  
  img {
    height: 55px;
    filter: brightness(0) invert(1);
    
    &:hover {
      animation: bounce 0.6s;
    }
  }
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
```

### Configuración 4: Tech / Startups
```scss
// Estilo tech moderno con glassmorphism
.sponsors-carousel-container {
  background: rgba(13, 17, 23, 0.9);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  height: 75px;
}

.sponsor-item {
  padding: 0 30px;
  
  img {
    height: 48px;
    filter: brightness(0) invert(1);
    opacity: 0.7;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    
    &:hover {
      opacity: 1;
      transform: scale(1.1);
      filter: brightness(0) invert(1) drop-shadow(0 0 15px rgba(0, 195, 255, 0.8));
    }
  }
}
```

### Configuración 5: Restaurante / Gastronomía
```scss
// Cálido y acogedor
.sponsors-carousel-container {
  background: linear-gradient(90deg, #c17f4e 0%, #d4a574 50%, #c17f4e 100%);
  height: 80px;
  box-shadow: 0 -4px 15px rgba(0, 0, 0, 0.2);
}

.sponsor-item {
  padding: 0 28px;
  
  img {
    height: 52px;
    filter: brightness(0) invert(1);
    opacity: 0.9;
    
    &:hover {
      opacity: 1;
      transform: scale(1.08);
      filter: brightness(0) invert(1) sepia(1) hue-rotate(-10deg);
    }
  }
}
```

---

## 🎬 Animaciones Avanzadas

### Animación 1: Onda Continua
```scss
@keyframes wave {
  0%, 100% { transform: translateX(0) translateY(0); }
  25% { transform: translateX(0) translateY(-3px); }
  75% { transform: translateX(0) translateY(3px); }
}

.sponsor-item {
  &:nth-child(3n) {
    animation: wave 2s ease-in-out infinite;
  }
  &:nth-child(3n+1) {
    animation: wave 2s ease-in-out infinite 0.2s;
  }
  &:nth-child(3n+2) {
    animation: wave 2s ease-in-out infinite 0.4s;
  }
}
```

### Animación 2: Velocidad Variable
```scss
.carousel-track {
  animation: scroll 40s linear infinite;
  
  &:hover {
    animation-play-state: running; // Continúa en hover
    animation-duration: 60s; // Pero más lento
  }
}
```

---

## 📱 Ajustes Responsive Avanzados

```scss
// Extra pequeño (< 480px)
@media (max-width: 480px) {
  .sponsors-carousel-container {
    height: 50px;
  }
  
  .sponsor-item {
    padding: 0 15px;
    img { height: 30px; }
  }
  
  .carousel-track {
    animation-duration: 20s;
  }
}

// Pequeño (480px - 768px)
@media (min-width: 481px) and (max-width: 768px) {
  .sponsors-carousel-container {
    height: 60px;
  }
  
  .sponsor-item {
    padding: 0 20px;
    img { height: 35px; }
  }
  
  .carousel-track {
    animation-duration: 25s;
  }
}

// Mediano (768px - 1024px)
@media (min-width: 769px) and (max-width: 1024px) {
  .sponsors-carousel-container {
    height: 70px;
  }
  
  .sponsor-item {
    padding: 0 25px;
    img { height: 45px; }
  }
  
  .carousel-track {
    animation-duration: 30s;
  }
}

// Grande (> 1024px)
@media (min-width: 1025px) {
  .sponsors-carousel-container {
    height: 80px;
  }
  
  .sponsor-item {
    padding: 0 30px;
    img { height: 50px; }
  }
  
  .carousel-track {
    animation-duration: 40s;
  }
}
```

---

## 🚀 Tips de Performance

```scss
// Optimización para mejor rendimiento
.carousel-track {
  will-change: transform;
  transform: translateZ(0);
  backface-visibility: hidden;
}

.sponsor-item img {
  will-change: transform, filter;
  transform: translateZ(0);
}

// Reducir motion para usuarios con preferencias de accesibilidad
@media (prefers-reduced-motion: reduce) {
  .carousel-track {
    animation: none;
  }
  
  .sponsor-item img {
    transition: none;
  }
}
```

---

## 📝 Notas Finales

- **Testing**: Prueba siempre en diferentes dispositivos
- **Performance**: No uses más de 10-12 logos para mantener buen rendimiento
- **Accesibilidad**: Incluye alt text descriptivo en todas las imágenes
- **SEO**: Usa nombres de archivo descriptivos para los logos
- **Optimización**: Comprime las imágenes antes de usarlas

---

**¿Necesitas más ayuda?** Consulta `SPONSORS_CAROUSEL_README.md` para la documentación completa.


