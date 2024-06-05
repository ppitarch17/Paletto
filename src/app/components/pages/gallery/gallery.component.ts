import { Component, inject } from '@angular/core';
import { colorPalettes } from '../../palette/palettes';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent {

  colorPalettes = colorPalettes as typeof colorPalettes & { [key: string]: string[] };
  paletteKeys = Object.keys(colorPalettes);
  palettes = [] as any[];
  router = inject(Router);

  ngOnInit() {

    this.paletteKeys.forEach(key  => {
      this.colorPalettes[key].forEach((color: any) => { // Add type annotation to color parameter
      });
      this.palettes.push({ name: key, colors: this.colorPalettes[key] });
    });
    this.palettes.sort(() => Math.random() - 0.5);
    console.log(this.palettes);
  }
    
  editPalette(palette: any) {
    this.router.navigate(['/home'], { queryParams: { palette: palette.name } });
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
