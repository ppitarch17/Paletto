import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-palette',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './palette.component.html',
  styleUrl: './palette.component.css'
})
export class PaletteComponent {

  colorPalette = ['#135351', '#1A936F', '#88D498', '#E6F69D', '#FFFAA1'];

  addColor() {
    const lastColor = this.colorPalette[this.colorPalette.length - 1];
    const similarColor = '#' + lastColor.substr(1, 6).split('').map(c => {
      const value = parseInt(c, 16);
      const newValue = Math.min(15, Math.max(0, value - Math.floor(Math.random() * 3 - 1)));
      return newValue.toString(16).toUpperCase();
    }).join('');
    this.colorPalette.push(similarColor);
  }

  onRightClick(event: MouseEvent, color: string) {
    event.preventDefault();
    this.colorPalette = this.colorPalette.filter(c => c !== color);


  }

  generatePalette() {
    const randomColor = this.colorPalette[Math.floor(Math.random() * this.colorPalette.length)];
    const length = this.colorPalette.length - 1;
    this.colorPalette = this.colorPalette.filter(c => c == randomColor);
    for (let i = 0; i < length; i++) {
      this.addColor();
    }
  }

  copyToClipboard(item: string) {
    navigator.clipboard.writeText(item).then(() => {
    });
    const x = document.getElementById("snackbar");
    // Add the "show" class to DIV
    if (x) {
      x.className = "show";
      
      // After 3 seconds, remove the show class from DIV
      setTimeout(function () { x.className = x.className.replace("show", ""); }, 2000);
    }
  }



}
