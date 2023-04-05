import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page.component';
import { UserModule } from 'src/app/features/user/user.module';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [CommonModule, UserModule],
  exports: [LoginPageComponent],
})
export class LoginPageModule {}
