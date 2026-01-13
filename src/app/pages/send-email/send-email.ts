import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { throwError } from 'rxjs';
import { catchError, finalize, timeout } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-send-email',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './send-email.html',
  styleUrls: ['./send-email.css']
})
export class SendEmail {
  form = {
    // to: '',
    // subject: '',
    message: ''
  };

  success = false;
  error = false;
  loading = false;

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  timeoutLimit = 10000; 

  sendEmail() {
    this.loading = true;
    this.success = false;
    this.error = false;

    this.http.post(`${environment.apiUrl}/ReviewMe/send-email`, this.form)
    .pipe(
      timeout(this.timeoutLimit),
      catchError(err => {
        if (err.name === 'TimeoutError') {
          console.error('Request timed out');
        }else {
          console.error('Error:', err);
        }
        this.error = true;
        return throwError(() => err);

      }),
      finalize(() => {
        this.loading = false;
        this.cdr.detectChanges();
      })
    )
    .subscribe({ 
       next: () => {
        this.success = true;
        this.loading = false;
        this.error = false;
        this.cdr.detectChanges();
       },
        error: (err) => {
          console.error('Error sending email:', err);
        }
    })

  }
}
