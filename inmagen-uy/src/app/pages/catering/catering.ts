import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { TranslationService } from '../../services/translation';

@Component({
  selector: 'app-catering',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatChipsModule,
    MatExpansionModule
  ],
  templateUrl: './catering.html',
  styleUrl: './catering.scss'
})
export class CateringComponent {
  quoteForm: FormGroup;
  isSubmitting = false;

  eventTypes = [
    { value: 'weddings', icon: 'favorite', imageUrl: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80' },
    { value: 'barMitzvah', icon: 'auto_stories', imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80' },
    { value: 'corporate', icon: 'business', imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80' },
    { value: 'holidays', icon: 'celebration', imageUrl: 'https://images.unsplash.com/photo-1482575832494-771f74bf6857?w=800&q=80' }
  ];

  packages = [
    {
      name: 'Básico',
      price: '$15000',
      guests: '50-100',
      features: ['Menú estándar', 'Montaje básico', '3 opciones de entrada', 'Vajilla descartable', 'Servicio 4 horas'],
      color: '#10B981'
    },
    {
      name: 'Premium',
      price: '$28000',
      guests: '100-200',
      features: ['Menú personalizado', 'Montaje completo', '5 opciones de entrada', 'Vajilla premium', 'Servicio 6 horas', 'Decoración incluida'],
      color: '#667eea',
      popular: true
    },
    {
      name: 'Luxury',
      price: '$45000',
      guests: '200+',
      features: ['Menú gourmet', 'Montaje deluxe', 'Menú ilimitado', 'Vajilla de porcelana', 'Servicio completo', 'Decoración premium', 'Coordinador de evento'],
      color: '#F59E0B'
    }
  ];

  features = [
    { key: 'planning', icon: 'event_note' },
    { key: 'custom', icon: 'restaurant_menu' },
    { key: 'professional', icon: 'groups' },
    { key: 'quality', icon: 'verified' }
  ];

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    public translate: TranslationService
  ) {
    this.quoteForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{8,15}$/)]],
      eventType: ['', Validators.required],
      eventDate: ['', Validators.required],
      guests: ['', [Validators.required, Validators.min(20)]],
      package: ['', Validators.required],
      message: ['', Validators.minLength(10)]
    });
  }

  t(key: string): string {
    return this.translate.get(key);
  }

  getEventTypeName(value: string): string {
    return this.translate.get(`catering.events.${value}`);
  }

  getFeatureTitle(key: string): string {
    return this.translate.get(`catering.features.${key}.title`);
  }

  getFeatureDescription(key: string): string {
    return this.translate.get(`catering.features.${key}.description`);
  }

  async onSubmit(): Promise<void> {
    if (this.quoteForm.invalid) {
      this.snackBar.open(
        'Por favor completa todos los campos obligatorios',
        'Cerrar',
        { duration: 5000, panelClass: ['error-snackbar'] }
      );
      return;
    }

    this.isSubmitting = true;

    try {
      const formData = {
        ...this.quoteForm.value,
        to: 'admin@bitsmove.com',
        timestamp: new Date().toISOString()
      };

      // Simulación - En producción conectar con backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Cotización de catering:', formData);

      this.snackBar.open(
        '¡Solicitud enviada! Nos pondremos en contacto pronto para coordinar los detalles.',
        'OK',
        { duration: 5000, panelClass: ['success-snackbar'] }
      );

      this.quoteForm.reset();

    } catch (error) {
      this.snackBar.open(
        'Error al enviar la solicitud. Por favor intenta nuevamente.',
        'Cerrar',
        { duration: 5000, panelClass: ['error-snackbar'] }
      );
    } finally {
      this.isSubmitting = false;
    }
  }

  getErrorMessage(fieldName: string): string {
    const field = this.quoteForm.get(fieldName);
    
    if (field?.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if (field?.hasError('email')) {
      return 'Email inválido';
    }
    if (field?.hasError('min')) {
      return `Mínimo ${field.errors?.['min'].min} invitados`;
    }
    if (field?.hasError('pattern')) {
      return 'Formato inválido';
    }
    
    return '';
  }
}