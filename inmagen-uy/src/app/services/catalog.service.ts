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
    {
      key: 'brownie',
      name: 'Brownie',
      nameEs: 'brownie',
      nameEn: 'brownie',
      description: 'Delicioso brownie de chocolate',
      glutenFree: false,
      imageUrl: 'https://images.unsplash.com/photo-1515037893149-de7f840978e2?w=800&q=80',
      category: 'sweets',
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
      price: '$42',
      aliases: ['trigona', 'trigonas de puerro', 'empanada de puerro']
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

