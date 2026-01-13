import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SendEmail } from "./pages/send-email/send-email";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SendEmail],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}
