import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { AuthService } from '../../Services/auth.service'; 

@Component({
    selector:'app-UserLogin',
    templateUrl: 'UserLogin.component.html',
    styleUrl: 'UserLogin.component.css'
})
export class UserLoginComponent{
    private apiUrl = environment.apiUrl;
    UserLoginobj : Login;
    errorMessageVisible: boolean = false; 
    constructor(private authService: AuthService,private router: Router)
    {
        this.UserLoginobj = new Login();
    }
    validateForm() {
        debugger
        if (this.UserLoginobj.UserName.trim() === '' || this.UserLoginobj.SystemPassword.trim() === '') {
            this.errorMessageVisible = true; 
        } else {
            this.errorMessageVisible = false; 
            this.OnLogin();
        }
    }

    // async OnLogin() {
    //     console.log('OnLogin method called'); // Debugging statement
    //     try {
            
    //         const response = await fetch(`${this.apiUrl}/User/Login`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(this.UserLoginobj)
    //         });
    
    //         if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //         }
    
    //         const result = await response.json();
    //         if (result.result) {
    //             alert('Login success');
    //             localStorage.setItem('user', JSON.stringify(result.data));
    //             this.router.navigate(['/Dashboard']); 
    //         } else {
    //             alert(result.message);
    //         }
    //     } catch (error) {
    //         console.error('Error:', error);
    //     }
    // }
    OnLogin() {
        this.authService.login(this.UserLoginobj.UserName, this.UserLoginobj.SystemPassword)
          .subscribe({
            next: response  => {
                if (response.result) {
                    alert('Login success');
                    this.router.navigate(['/Dashboard']);
                  } else {
                    alert('Login failed: ' + response.message);
                  }
            },
            error: error => {
              alert('Login failed');
              console.error('Error:', error);
            }
          });
      }
    }
    
export class Login
{
    UserName: string;
    SystemPassword: string;
    constructor()
    {
        this.UserName = '';
        this.SystemPassword = '';
    }
}
