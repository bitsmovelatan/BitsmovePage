import { Injectable } from '@angular/core';
import { TranslationService } from './translation';

export interface CatalogProduct {
  key: string;
  name: string;
  nameEs: string; // Nombre en español para matching
  nameEn: string; // Nombre en inglés
  description: string;
  glutenFree: boolean;
  imageUrl: string;
  category: string;
  region: string; // jewish, uruguayan, venezuelan, mexican, italian
  price: string;
  aliases?: string[]; // Nombres alternativos para mejor matching
}

export interface ValidationResult {
  found: boolean;
  product?: CatalogProduct;
  similarity?: number;
  suggestions?: CatalogProduct[];
}

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  
  private catalog: CatalogProduct[] = [
    // ========== COMIDA JUDÍA ==========
    {
      key: 'brownie',
      name: 'Brownie',
      nameEs: 'brownie',
      nameEn: 'brownie',
      description: 'Delicioso brownie de chocolate',
      glutenFree: false,
      imageUrl: 'https://images.unsplash.com/photo-1515037893149-de7f840978e2?w=800&q=80',
      category: 'sweets',
      region: 'jewish',
      price: '$990',
      aliases: ['brownies', 'browni', 'chocolate brownie']
    },
    {
      key: 'cookies',
      name: 'Cookies',
      nameEs: 'galletas',
      nameEn: 'cookies',
      description: 'Galletas tradicionales',
      glutenFree: false,
      imageUrl: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80',
      category: 'sweets',
      region: 'jewish',
      price: '$40',
      aliases: ['galleta', 'cookie', 'galletitas']
    },
    {
      key: 'knish',
      name: 'Knish',
      nameEs: 'knish',
      nameEn: 'knish',
      description: 'Masa rellena tradicional judía',
      glutenFree: false,
      imageUrl: 'https://images.unsplash.com/photo-1568471173248-eb9aba2f5e77?w=800&q=80',
      category: 'pastries',
      region: 'jewish',
      price: '$42',
      aliases: ['knishes', 'kniches']
    },
    {
      key: 'masita',
      name: 'Masita',
      nameEs: 'masita',
      nameEn: 'petit four',
      description: 'Masitas dulces variadas',
      glutenFree: false,
      imageUrl: 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=800&q=80',
      category: 'sweets',
      region: 'jewish',
      price: '$990',
      aliases: ['masitas', 'petit fours', 'bocaditos']
    },
    {
      key: 'pionono',
      name: 'Pionono',
      nameEs: 'pionono',
      nameEn: 'pionono',
      description: 'Bizcocho enrollado relleno',
      glutenFree: false,
      imageUrl: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&q=80',
      category: 'pastries',
      region: 'jewish',
      price: '$990',
      aliases: ['piononos', 'arrollado']
    },
    {
      key: 'pletzalaj',
      name: 'Pletzalaj',
      nameEs: 'pletzalaj',
      nameEn: 'pletzalaj',
      description: 'Pan plano tradicional',
      glutenFree: false,
      imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80',
      category: 'breads',
      region: 'jewish',
      price: '$25',
      aliases: ['pletzalach', 'pletzale', 'pletzl']
    },
    {
      key: 'pletzalaj_rellena',
      name: 'Pletzalaj Rellena',
      nameEs: 'pletzalaj rellena',
      nameEn: 'stuffed pletzalaj',
      description: 'Pletzalaj con relleno',
      glutenFree: false,
      imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80',
      category: 'breads',
      region: 'jewish',
      price: '$65',
      aliases: ['pletzalach rellena', 'pletzalaj con relleno']
    },
    {
      key: 'rol_canela',
      name: 'Rol de Canela',
      nameEs: 'rol de canela',
      nameEn: 'cinnamon roll',
      description: 'Delicioso rollo de canela',
      glutenFree: false,
      imageUrl: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=800&q=80',
      category: 'pastries',
      region: 'jewish',
      price: '$100',
      aliases: ['rollo de canela', 'cinnamon roll', 'rolls de canela']
    },
    {
      key: 'strudel',
      name: 'Strudel',
      nameEs: 'strudel',
      nameEn: 'strudel',
      description: 'Strudel de manzana tradicional',
      glutenFree: false,
      imageUrl: 'https://images.unsplash.com/photo-1587241321921-91a834d6d191?w=800&q=80',
      category: 'pastries',
      region: 'jewish',
      price: '$650',
      aliases: ['strudel de manzana', 'apple strudel', 'apfelstrudel']
    },
    {
      key: 'tarta_manzana',
      name: 'Tarta de Manzana',
      nameEs: 'tarta de manzana',
      nameEn: 'apple pie',
      description: 'Tarta de manzana casera',
      glutenFree: false,
      imageUrl: 'https://images.unsplash.com/photo-1535920527002-b35e96722eb9?w=800&q=80',
      category: 'pastries',
      region: 'jewish',
      price: '$650',
      aliases: ['apple pie', 'pie de manzana', 'tarta manzana']
    },
    {
      key: 'trigona_puerro',
      name: 'Trigona de Puerro',
      nameEs: 'trigona de puerro',
      nameEn: 'leek trigona',
      description: 'Empanada triangular de puerro',
      glutenFree: false,
      imageUrl: 'https://images.unsplash.com/photo-1601000938259-9e92002320b2?w=800&q=80',
      category: 'pastries',
      region: 'jewish',
      price: '$42',
      aliases: ['trigona', 'trigonas de puerro', 'empanada de puerro']
    },

    // ========== COMIDA URUGUAYA ==========
    {
      key: 'chivito',
      name: 'Chivito',
      nameEs: 'chivito',
      nameEn: 'chivito',
      description: 'Sándwich uruguayo con carne, jamón, queso y huevo',
      glutenFree: false,
      imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80',
      category: 'main',
      region: 'uruguayan',
      price: '$450',
      aliases: ['chivito uruguayo', 'sandwich chivito']
    },
    {
      key: 'empanada_carne',
      name: 'Empanada de Carne',
      nameEs: 'empanada de carne',
      nameEn: 'beef empanada',
      description: 'Empanada criolla rellena de carne picada',
      glutenFree: false,
      imageUrl: 'https://images.unsplash.com/photo-1599974792900-006a9df7a0d5?w=800&q=80',
      category: 'pastries',
      region: 'uruguayan',
      price: '$80',
      aliases: ['empanada criolla', 'empanada de res']
    },
    {
      key: 'alfajor',
      name: 'Alfajor',
      nameEs: 'alfajor',
      nameEn: 'alfajor',
      description: 'Dulce tradicional con dulce de leche',
      glutenFree: false,
      imageUrl: 'https://images.unsplash.com/photo-1628500899446-6155a65f78e4?w=800&q=80',
      category: 'sweets',
      region: 'uruguayan',
      price: '$60',
      aliases: ['alfajores', 'alfajor de dulce de leche']
    },
    {
      key: 'torta_frita',
      name: 'Torta Frita',
      nameEs: 'torta frita',
      nameEn: 'fried bread',
      description: 'Masa frita tradicional uruguaya',
      glutenFree: false,
      imageUrl: 'https://images.unsplash.com/photo-1515037893149-de7f840978e2?w=800&q=80',
      category: 'breads',
      region: 'uruguayan',
      price: '$35',
      aliases: ['tortas fritas', 'sopaipilla']
    },
    {
      key: 'asado',
      name: 'Asado',
      nameEs: 'asado',
      nameEn: 'barbecue',
      description: 'Carne a la parrilla estilo uruguayo',
      glutenFree: true,
      imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80',
      category: 'main',
      region: 'uruguayan',
      price: '$900',
      aliases: ['asado uruguayo', 'parrillada', 'carne a la parrilla', 'bbq']
    },

    // ========== COMIDA VENEZOLANA ==========
    {
      key: 'hallaca',
      name: 'Hallaca',
      nameEs: 'hallaca',
      nameEn: 'hallaca',
      description: 'Tamal venezolano relleno de carne, aceitunas y pasas',
      glutenFree: false,
      imageUrl: 'https://images.unsplash.com/photo-1545093149-618ce3bcf49d?w=800&q=80',
      category: 'main',
      region: 'venezuelan',
      price: '$300',
      aliases: ['hallacas', 'ayaca', 'hayaca']
    },
    {
      key: 'cachapa',
      name: 'Cachapa',
      nameEs: 'cachapa',
      nameEn: 'cachapa',
      description: 'Panqueca de maíz tierno con queso',
      glutenFree: true,
      imageUrl: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80',
      category: 'main',
      region: 'venezuelan',
      price: '$150',
      aliases: ['cachapas', 'cachapa con queso']
    },
    {
      key: 'arepa',
      name: 'Arepa',
      nameEs: 'arepa',
      nameEn: 'arepa',
      description: 'Pan de maíz venezolano relleno',
      glutenFree: true,
      imageUrl: 'https://images.unsplash.com/photo-1628191010210-a59de3136506?w=800&q=80',
      category: 'breads',
      region: 'venezuelan',
      price: '$120',
      aliases: ['arepas', 'arepa rellena']
    },
    {
      key: 'tequeño',
      name: 'Tequeño',
      nameEs: 'tequeño',
      nameEn: 'tequeño',
      description: 'Deditos de queso envueltos en masa',
      glutenFree: false,
      imageUrl: 'https://images.unsplash.com/photo-1619644797590-d036ee80e0dc?w=800&q=80',
      category: 'pastries',
      region: 'venezuelan',
      price: '$45',
      aliases: ['tequeños', 'deditos de queso']
    },

    // ========== COMIDA MEXICANA ==========
    {
      key: 'taco',
      name: 'Taco',
      nameEs: 'taco',
      nameEn: 'taco',
      description: 'Tortilla con carne, cilantro y cebolla',
      glutenFree: true,
      imageUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80',
      category: 'main',
      region: 'mexican',
      price: '$90',
      aliases: ['tacos', 'taco mexicano']
    },
    {
      key: 'burrito',
      name: 'Burrito',
      nameEs: 'burrito',
      nameEn: 'burrito',
      description: 'Tortilla grande rellena de carne, frijoles y arroz',
      glutenFree: false,
      imageUrl: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800&q=80',
      category: 'main',
      region: 'mexican',
      price: '$250',
      aliases: ['burritos', 'burrito mexicano']
    },
    {
      key: 'quesadilla',
      name: 'Quesadilla',
      nameEs: 'quesadilla',
      nameEn: 'quesadilla',
      description: 'Tortilla con queso derretido',
      glutenFree: false,
      imageUrl: 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=800&q=80',
      category: 'main',
      region: 'mexican',
      price: '$150',
      aliases: ['quesadillas', 'queso fundido']
    },
    {
      key: 'churros',
      name: 'Churros',
      nameEs: 'churros',
      nameEn: 'churros',
      description: 'Masa frita con azúcar y canela',
      glutenFree: false,
      imageUrl: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&q=80',
      category: 'sweets',
      region: 'mexican',
      price: '$70',
      aliases: ['churro', 'churros con chocolate']
    },

    // ========== COMIDA ITALIANA ==========
    {
      key: 'pizza',
      name: 'Pizza Margherita',
      nameEs: 'pizza margherita',
      nameEn: 'margherita pizza',
      description: 'Pizza clásica con tomate, mozzarella y albahaca',
      glutenFree: false,
      imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80',
      category: 'main',
      region: 'italian',
      price: '$400',
      aliases: ['pizza', 'pizza italiana', 'margherita']
    },
    {
      key: 'pasta_carbonara',
      name: 'Pasta Carbonara',
      nameEs: 'pasta carbonara',
      nameEn: 'carbonara pasta',
      description: 'Pasta con salsa cremosa de huevo y panceta',
      glutenFree: false,
      imageUrl: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&q=80',
      category: 'main',
      region: 'italian',
      price: '$350',
      aliases: ['carbonara', 'spaghetti carbonara', 'pasta italiana']
    },
    {
      key: 'lasagna',
      name: 'Lasaña',
      nameEs: 'lasaña',
      nameEn: 'lasagna',
      description: 'Capas de pasta con carne y salsa bechamel',
      glutenFree: false,
      imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&q=80',
      category: 'main',
      region: 'italian',
      price: '$380',
      aliases: ['lasagna', 'lasaña italiana', 'lasagne']
    },
    {
      key: 'tiramisu',
      name: 'Tiramisú',
      nameEs: 'tiramisú',
      nameEn: 'tiramisu',
      description: 'Postre italiano con café y mascarpone',
      glutenFree: false,
      imageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&q=80',
      category: 'sweets',
      region: 'italian',
      price: '$200',
      aliases: ['tiramisu', 'postre italiano']
    },
    {
      key: 'cannoli',
      name: 'Cannoli',
      nameEs: 'cannoli',
      nameEn: 'cannoli',
      description: 'Rollo crujiente relleno de ricotta dulce',
      glutenFree: false,
      imageUrl: 'https://images.unsplash.com/photo-1612203985729-70726954388c?w=800&q=80',
      category: 'sweets',
      region: 'italian',
      price: '$120',
      aliases: ['cannolis', 'cannolo']
    }
  ];

  constructor(private translate: TranslationService) {}

  /**
   * Obtiene todos los productos del catálogo
   */
  getAllProducts(): CatalogProduct[] {
    return this.catalog;
  }

  /**
   * Obtiene productos filtrados por región
   */
  getProductsByRegion(region: string): CatalogProduct[] {
    return this.catalog.filter(p => p.region === region);
  }

  /**
   * Obtiene todas las regiones disponibles
   */
  getRegions(): string[] {
    const regions = [...new Set(this.catalog.map(p => p.region))];
    return regions.sort();
  }

  /**
   * Busca un producto por su key exacta
   */
  getProductByKey(key: string): CatalogProduct | undefined {
    return this.catalog.find(p => p.key === key);
  }

  /**
   * Valida un nombre de producto contra el catálogo
   * Retorna el producto si se encuentra o sugerencias si no
   */
  validateProduct(productName: string): ValidationResult {
    const normalizedSearch = this.normalizeString(productName);
    
    // 1. Búsqueda exacta
    const exactMatch = this.catalog.find(p => 
      this.normalizeString(p.name) === normalizedSearch ||
      this.normalizeString(p.nameEs) === normalizedSearch ||
      this.normalizeString(p.nameEn) === normalizedSearch
    );
    
    if (exactMatch) {
      return { found: true, product: exactMatch, similarity: 1.0 };
    }

    // 2. Búsqueda en aliases
    const aliasMatch = this.catalog.find(p => 
      p.aliases?.some(alias => this.normalizeString(alias) === normalizedSearch)
    );
    
    if (aliasMatch) {
      return { found: true, product: aliasMatch, similarity: 0.95 };
    }

    // 3. Búsqueda por similitud (fuzzy matching)
    const matches = this.catalog.map(product => {
      const similarities = [
        this.calculateSimilarity(normalizedSearch, this.normalizeString(product.name)),
        this.calculateSimilarity(normalizedSearch, this.normalizeString(product.nameEs)),
        this.calculateSimilarity(normalizedSearch, this.normalizeString(product.nameEn)),
        ...(product.aliases?.map(alias => 
          this.calculateSimilarity(normalizedSearch, this.normalizeString(alias))
        ) || [])
      ];
      
      return {
        product,
        similarity: Math.max(...similarities)
      };
    }).sort((a, b) => b.similarity - a.similarity);

    // Si hay un match muy probable (> 70% similar)
    if (matches[0].similarity > 0.7) {
      return { 
        found: true, 
        product: matches[0].product, 
        similarity: matches[0].similarity 
      };
    }

    // Retornar sugerencias (top 3)
    return {
      found: false,
      suggestions: matches.slice(0, 3).map(m => m.product)
    };
  }

  /**
   * Normaliza un string para comparación
   */
  private normalizeString(str: string): string {
    return str.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Elimina acentos
      .trim();
  }

  /**
   * Calcula similitud entre dos strings usando Levenshtein distance
   */
  private calculateSimilarity(str1: string, str2: string): number {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    
    if (longer.length === 0) {
      return 1.0;
    }
    
    // Si uno contiene al otro, alta similitud
    if (longer.includes(shorter)) {
      return 0.85;
    }
    
    const editDistance = this.levenshteinDistance(str1, str2);
    return (longer.length - editDistance) / longer.length;
  }

  /**
   * Calcula la distancia de Levenshtein entre dos strings
   */
  private levenshteinDistance(str1: string, str2: string): number {
    const matrix: number[][] = [];

    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }

    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }

    return matrix[str2.length][str1.length];
  }

  /**
   * Busca productos por categoría
   */
  getProductsByCategory(category: string): CatalogProduct[] {
    return this.catalog.filter(p => p.category === category);
  }

  /**
   * Busca productos por texto libre
   */
  searchProducts(query: string): CatalogProduct[] {
    const normalized = this.normalizeString(query);
    
    return this.catalog.filter(product => {
      const searchIn = [
        product.name,
        product.nameEs,
        product.nameEn,
        product.description,
        ...(product.aliases || [])
      ].map(s => this.normalizeString(s));
      
      return searchIn.some(text => text.includes(normalized));
    });
  }
}


