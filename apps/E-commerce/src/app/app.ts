import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, FileIcon } from 'lucide-angular';

@Component({
  imports: [RouterModule, LucideAngularModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'E-commerce';
  readonly FileIcon = FileIcon;
}
