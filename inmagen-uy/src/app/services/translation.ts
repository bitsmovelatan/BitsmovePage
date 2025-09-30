import { Injectable } from '@angular/core';
import esTranslations from '../../assets/i18n/es.json';
import enTranslations from '../../assets/i18n/en.json';
import ptTranslations from '../../assets/i18n/pt.json';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private currentLang = 'es';
  private translations: any = {
    es: esTranslations,
    en: enTranslations,
    pt: ptTranslations
  };

  setLanguage(lang: string): void {
    if (this.translations[lang]) {
      this.currentLang = lang;
    }
  }

  getCurrentLanguage(): string {
    return this.currentLang;
  }

  translate(key: string): string {
    const keys = key.split('.');
    let value = this.translations[this.currentLang];
    
    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        return key;
      }
    }
    
    return value;
  }

  get(key: string): string {
    return this.translate(key);
  }
}