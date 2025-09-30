import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-catering',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, TranslateModule],
  templateUrl: './catering.html',
  styleUrl: './catering.scss'
})
export class CateringComponent {

}
