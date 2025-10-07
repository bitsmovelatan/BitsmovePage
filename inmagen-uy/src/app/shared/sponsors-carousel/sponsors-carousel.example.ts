/**
 * EJEMPLO DE CONFIGURACIÓN PERSONALIZADA
 * ======================================
 * 
 * Este archivo muestra diferentes configuraciones que puedes usar
 * para el carrusel de promotores.
 * 
 * Para usarlo, copia el código relevante a sponsors-carousel.ts
 */

// OPCIÓN 1: Logos desde assets locales
export const LOCAL_SPONSORS = [
  { name: 'Coca Cola', logo: '/assets/sponsors/coca-cola.png' },
  { name: 'Pepsi', logo: '/assets/sponsors/pepsi.png' },
  { name: 'McDonald\'s', logo: '/assets/sponsors/mcdonalds.png' },
  { name: 'Burger King', logo: '/assets/sponsors/burger-king.png' },
  { name: 'Subway', logo: '/assets/sponsors/subway.png' },
  { name: 'KFC', logo: '/assets/sponsors/kfc.png' },
];

// OPCIÓN 2: Logos desde URLs externas (CDN)
export const CDN_SPONSORS = [
  { 
    name: 'Google', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' 
  },
  { 
    name: 'Microsoft', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg' 
  },
  { 
    name: 'Amazon', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' 
  },
  { 
    name: 'Apple', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' 
  },
];

// OPCIÓN 3: Logos con información adicional
export const DETAILED_SPONSORS = [
  { 
    name: 'Sponsor 1',
    logo: '/assets/sponsors/sponsor1.png',
    url: 'https://www.sponsor1.com',
    type: 'gold'
  },
  { 
    name: 'Sponsor 2',
    logo: '/assets/sponsors/sponsor2.png',
    url: 'https://www.sponsor2.com',
    type: 'silver'
  },
  { 
    name: 'Sponsor 3',
    logo: '/assets/sponsors/sponsor3.png',
    url: 'https://www.sponsor3.com',
    type: 'bronze'
  },
];

// OPCIÓN 4: Logos con categorías
export const CATEGORIZED_SPONSORS = {
  platino: [
    { name: 'Sponsor Platino 1', logo: '/assets/sponsors/platino1.png' },
    { name: 'Sponsor Platino 2', logo: '/assets/sponsors/platino2.png' },
  ],
  oro: [
    { name: 'Sponsor Oro 1', logo: '/assets/sponsors/oro1.png' },
    { name: 'Sponsor Oro 2', logo: '/assets/sponsors/oro2.png' },
    { name: 'Sponsor Oro 3', logo: '/assets/sponsors/oro3.png' },
  ],
  plata: [
    { name: 'Sponsor Plata 1', logo: '/assets/sponsors/plata1.png' },
    { name: 'Sponsor Plata 2', logo: '/assets/sponsors/plata2.png' },
  ],
};

// EJEMPLO: Componente con logos clicables
export const CLICKABLE_CAROUSEL_EXAMPLE = `
// En sponsors-carousel.html, reemplaza el div por:

<div class="sponsor-item">
  <a [href]="sponsor.url" target="_blank" rel="noopener noreferrer">
    <img [src]="sponsor.logo" [alt]="sponsor.name" />
  </a>
</div>

// Y en sponsors-carousel.ts, actualiza el array:

sponsors = [
  { name: 'Sponsor 1', logo: '/assets/sponsors/1.png', url: 'https://sponsor1.com' },
  { name: 'Sponsor 2', logo: '/assets/sponsors/2.png', url: 'https://sponsor2.com' },
  // ...
];
`;

// EJEMPLO: Carrusel con diferentes velocidades por sponsor
export const VARIABLE_SPEED_EXAMPLE = `
// Puedes crear clases CSS diferentes para grupos de sponsors

.sponsor-item.vip {
  img {
    height: 60px; // Más grandes
    filter: brightness(1) !important; // Sin filtro
  }
}

.sponsor-item.standard {
  img {
    height: 40px;
  }
}
`;

// TIPS PARA PREPARAR LOGOS
export const LOGO_PREPARATION_TIPS = `
1. Formato recomendado: PNG con transparencia o SVG
2. Tamaño óptimo: 300x150px (2:1 ratio)
3. Fondo: Transparente
4. Colores: Versión en blanco o logo original
5. Peso: Menor a 50KB por logo
6. Nombres: usar kebab-case (mi-empresa.png)

Estructura sugerida en assets:
/assets/
  /sponsors/
    /gold/
      - sponsor1.png
      - sponsor2.png
    /silver/
      - sponsor3.png
      - sponsor4.png
    /bronze/
      - sponsor5.png
      - sponsor6.png
`;

export default {
  LOCAL_SPONSORS,
  CDN_SPONSORS,
  DETAILED_SPONSORS,
  CATEGORIZED_SPONSORS,
  CLICKABLE_CAROUSEL_EXAMPLE,
  VARIABLE_SPEED_EXAMPLE,
  LOGO_PREPARATION_TIPS
};


