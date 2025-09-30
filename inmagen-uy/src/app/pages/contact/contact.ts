import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { TranslationService } from '../../services/translation';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatDividerModule
  ],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class ContactComponent {
  contactForm: FormGroup;
  isSubmitting = false;
  mapUrl: SafeResourceUrl;

  contactInfo = {
    address: 'Pedro Ricaldoni 3634 Bis, Entre Juan de Dios Peza y Comercio, La Unión, Montevideo, Uruguay',
    phone: '25083244',
    whatsapp: '097619894',
    email: 'admin@bitsmove.com',
    hours: {
      weekdays: 'Lunes a Sábado: 11:00 AM - 10:00 PM',
      sunday: 'Domingo: 11:00 AM - 6:00 PM'
    }
  };

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    public translate: TranslationService
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{8,15}$/)]],
      subject: ['', [Validators.required, Validators.minLength(5)]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });

    // Google Maps URL con la dirección exacta
    const address = 'Pedro Ricaldoni 3634 Bis, La Unión, Montevideo, Uruguay';
    const encodedAddress = encodeURIComponent(address);
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodedAddress}&zoom=16`
    );
  }

  t(key: string): string {
    return this.translate.get(key);
  }

  openWhatsApp(): void {
    const message = encodeURIComponent(this.translate.get('contact.whatsappMessage'));
    window.open(`https://wa.me/598${this.contactInfo.whatsapp}?text=${message}`, '_blank');
  }

  callPhone(): void {
    window.location.href = `tel:+598${this.contactInfo.phone}`;
  }

  sendEmail(): void {
    window.location.href = `mailto:${this.contactInfo.email}`;
  }

  openGoogleMaps(): void {
    const address = encodeURIComponent(this.contactInfo.address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank');
  }

  async onSubmit(): Promise<void> {
    if (this.contactForm.invalid) {
      this.snackBar.open(
        this.translate.get('contact.form.errorIncomplete'),
        this.translate.get('contact.form.close'),
        { duration: 5000, panelClass: ['error-snackbar'] }
      );
      return;
    }

    this.isSubmitting = true;

    try {
      const formData = {
        name: this.contactForm.value.name,
        email: this.contactForm.value.email,
        phone: this.contactForm.value.phone,
        subject: this.contactForm.value.subject,
        message: this.contactForm.value.message,
        to: 'admin@bitsmove.com',
        timestamp: new Date().toISOString()
      };

      await this.sendContactEmail(formData);

      this.snackBar.open(
        this.translate.get('contact.form.success'),
        this.translate.get('contact.form.ok'),
        { duration: 5000, panelClass: ['success-snackbar'] }
      );

      this.contactForm.reset();

    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
      this.snackBar.open(
        this.translate.get('contact.form.error'),
        this.translate.get('contact.form.close'),
        { duration: 5000, panelClass: ['error-snackbar'] }
      );
    } finally {
      this.isSubmitting = false;
    }
  }

  private async sendContactEmail(data: any): Promise<void> {
    // Simulación de envío - En producción, reemplaza esto con tu endpoint
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('Mensaje de contacto:', data);
        resolve();
        
        // Para producción, descomenta esto y crea tu endpoint:
        /*
        this.http.post('YOUR_BACKEND_URL/api/contact/send', data)
          .subscribe({
            next: () => resolve(),
            error: (err) => reject(err)
          });
        */
      }, 1000);
    });
  }

  getErrorMessage(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    
    if (field?.hasError('required')) {
      return this.translate.get('contact.validation.required');
    }
    if (field?.hasError('email')) {
      return this.translate.get('contact.validation.email');
    }
    if (field?.hasError('minlength')) {
      const minLength = field.errors?.['minlength'].requiredLength;
      return this.translate.get('contact.validation.minlength').replace('{{length}}', minLength);
    }
    if (field?.hasError('pattern')) {
      return this.translate.get('contact.validation.pattern');
    }
    
    return '';
  }
}