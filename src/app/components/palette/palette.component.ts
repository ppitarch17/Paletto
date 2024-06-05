import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { colorPalettes } from './palettes';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-palette',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './palette.component.html',
  styleUrl: './palette.component.css'
})
export class PaletteComponent {

  colorPalette = colorPalettes.oceanBlues;
  colorPalettes = colorPalettes;
  router = inject(ActivatedRoute);

  ngOnInit() {
    console.log(this.router.queryParams);
    this.router.queryParams.subscribe(params => {
      const paramValue = params['palette'] as keyof typeof colorPalettes;
      if (paramValue) {
        this.colorPalette = colorPalettes[paramValue];
      }
      else {
        const keys = Object.keys(colorPalettes);
        const randomKey = keys[Math.floor(Math.random() * keys.length)] as keyof typeof colorPalettes;
        this.colorPalette = colorPalettes[randomKey];
      }
    });
  }

  addColor() {
    const last = this.colorPalette[this.colorPalette.length - 1];
    if (!last) {
      let color = '#' + Math.floor(Math.random() * 16777215).toString(16);
      this.colorPalette.push({ color });
      console.log(this.colorPalette);
    }
    const lastColor = last.color;
    const similarColor = '#' + lastColor.substr(1, 6).split('').map(c => {
      const value = parseInt(c, 16);
      const newValue = Math.min(15, Math.max(0, value - Math.floor(Math.random() * 3 - 1)));
      return newValue.toString(16).toUpperCase();
    }).join('');
    this.colorPalette.push({ color: similarColor });
  }

  onRightClick(event: MouseEvent, color: string) {
    event.preventDefault();
    console.log(color);
    console.log(this.colorPalette);
    this.colorPalette = this.colorPalette.filter(c => c.color !== color);
  }

  generatePalette() {
    const randomColor = this.colorPalette[Math.floor(Math.random() * this.colorPalette.length)];
    if (!randomColor) {
      this.addColor();
    }
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
