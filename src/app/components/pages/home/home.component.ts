import { Component } from '@angular/core';
import { PaletteComponent } from '../../palette/palette.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PaletteComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
