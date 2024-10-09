import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/user/entities/user.schema';
import { Model } from 'mongoose';
import { MailerService } from '@nestjs-modules/mailer';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { SendMailInfo } from './send-mail-info.interface';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
const mjml2html = require('mjml');


@Injectable()
export class EmailServiceService {

  constructor(@InjectModel(User.name) private readonly usuarioModel: Model<UserDocument>,
    private readonly mailerService: MailerService,
    private userService: UserService,

  ) { }

  //Send Email to put 2FA code. We check too if user exists.
  async emailAccount(emailAccount: CreateUserDto) {
    const { email, password, twoFa, ...userData } = emailAccount;
    const user = await this.userService.findOne(email);

    if (user.length == 1) return {      //User exists? Yes-> Error code with text, and don't send email.
      message: 'User already exists',
    };

    try {
      const mjmlTemplate = `
      <mjml>
  <mj-head>
    <mj-title>Confirmación de Cuenta y Código 2FA</mj-title>
    <mj-font name="Roboto" href="https://fonts.googleapis.com/css?family=Roboto" />
    <mj-attributes>
      <mj-all font-family="Roboto, Helvetica, sans-serif" />
    </mj-attributes>
    <mj-style inline="inline">
      @keyframes vibrate {
        0% { transform: rotate(0deg); }
        25% { transform: rotate(3deg); }
        50% { transform: rotate(0deg); }
        75% { transform: rotate(-3deg); }
        100% { transform: rotate(0deg); }
      }
      .vibrating-lock {
        animation: vibrate 0.3s infinite;
        display: inline-block;
      }
      .digit-box {
        display: inline-block;
        width: 40px;
        height: 50px;
        margin: 0 5px;
        background-color: #f0f0f0;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 24px;
        line-height: 50px;
        text-align: center;
      }
    </mj-style>
  </mj-head>
  <mj-body background-color="#f4f4f4">
    <mj-section background-color="#ffffff" padding-bottom="20px" padding-top="20px">
      <mj-column width="100%">
        <mj-image src="https://via.placeholder.com/150x50" alt="Logo" align="center" width="150px" />
      </mj-column>
    </mj-section>
    <mj-section background-color="#ffffff" padding-bottom="0px" padding-top="0">
      <mj-column width="100%">
        <mj-text font-size="24px" color="#000000" align="center">
          Confirma tu cuenta
        </mj-text>
        <mj-text font-size="16px" color="#000000" align="center">
          Gracias por registrarte. Por favor, utiliza el siguiente código para completar la autenticación de doble factor.
        </mj-text>
        <mj-text align="center" font-size="24px">
          <span class="vibrating-lock">🔒</span>
        </mj-text>
      </mj-column>
    </mj-section>
    <mj-section background-color="#ffffff" padding-bottom="20px" padding-top="20px">
      <mj-column width=80%">
        <mj-text align="center" font-size="14px" font-weight="bold">
          Tu código de autenticación de doble factor:
        </mj-text>
        <mj-text align="center" padding-top="10px">
          <span class="digit-box">${twoFa[0]}</span>
          <span class="digit-box">${twoFa[1]}</span>
          <span class="digit-box">${twoFa[2]}</span>
          <span class="digit-box">${twoFa[3]}</span>
          <span class="digit-box">${twoFa[4]}</span>
          <span class="digit-box">${twoFa[5]}</span>
        </mj-text>
      </mj-column>
    </mj-section>
    <mj-section background-color="#ffffff" padding-bottom="20px" padding-top="0px">
      <mj-column width="100%">
        <mj-text font-size="14px" color="#000000" align="center">
          Si no has solicitado este código, por favor ignora este correo o contacta con nuestro equipo de soporte.
        </mj-text>
      </mj-column>
    </mj-section>
    <mj-section background-color="#f4f4f4" padding-bottom="20px" padding-top="20px">
      <mj-column width="100%">
        <mj-text font-size="12px" color="#000000" align="center">
          © 2024 HelpHub.
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
    `;

      const { html } = mjml2html(mjmlTemplate);
      this.sendMail({
        to: email,
        from: process.env.MAIL_USER,
        subject: 'Confirm your account',
        html: html,
      });
      return {
        message: 'Email sent successfull.',
      };
    } catch (error) {
      this.handleDBErrors(error);
    }
  }


  //Send Email to put login 2FA.
  async loginEmail(loginEmail: LoginUserDto) {
    const { email, twoFa } = loginEmail;
    const user = await this.userService.findOne(email);

    if (user.length == 0) return {      //User exists? No-> Error code with text, and don't send email.
      message: 'User does not exist',
    }

    try {
      const mjmlTemplate = `
    <mjml>
<mj-head>
  <mj-title>Confirmación de Cuenta y Código 2FA</mj-title>
  <mj-font name="Roboto" href="https://fonts.googleapis.com/css?family=Roboto" />
  <mj-attributes>
    <mj-all font-family="Roboto, Helvetica, sans-serif" />
  </mj-attributes>
  <mj-style inline="inline">
    @keyframes vibrate {
      0% { transform: rotate(0deg); }
      25% { transform: rotate(3deg); }
      50% { transform: rotate(0deg); }
      75% { transform: rotate(-3deg); }
      100% { transform: rotate(0deg); }
    }
    .vibrating-lock {
      animation: vibrate 0.3s infinite;
      display: inline-block;
    }
    .digit-box {
      display: inline-block;
      width: 40px;
      height: 50px;
      margin: 0 5px;
      background-color: #f0f0f0;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 24px;
      line-height: 50px;
      text-align: center;
    }
  </mj-style>
</mj-head>
<mj-body background-color="#f4f4f4">
  <mj-section background-color="#ffffff" padding-bottom="20px" padding-top="20px">
    <mj-column width="100%">
      <mj-image src="https://via.placeholder.com/150x50" alt="Logo" align="center" width="150px" />
    </mj-column>
  </mj-section>
  <mj-section background-color="#ffffff" padding-bottom="0px" padding-top="0">
    <mj-column width="100%">
      <mj-text font-size="24px" color="#000000" align="center">
        Confirma tu cuenta
      </mj-text>
      <mj-text font-size="16px" color="#000000" align="center">
        Login con 2FA. Por favor, utiliza el siguiente código para completar la autenticación de doble factor.
      </mj-text>
      <mj-text align="center" font-size="24px">
        <span class="vibrating-lock">🔒</span>
      </mj-text>
    </mj-column>
  </mj-section>
  <mj-section background-color="#ffffff" padding-bottom="20px" padding-top="20px">
    <mj-column width=80%">
      <mj-text align="center" font-size="14px" font-weight="bold">
        Tu código de autenticación de doble factor:
      </mj-text>
      <mj-text align="center" padding-top="10px">
        <span class="digit-box">${twoFa[0]}</span>
        <span class="digit-box">${twoFa[1]}</span>
        <span class="digit-box">${twoFa[2]}</span>
        <span class="digit-box">${twoFa[3]}</span>
        <span class="digit-box">${twoFa[4]}</span>
        <span class="digit-box">${twoFa[5]}</span>
      </mj-text>
    </mj-column>
  </mj-section>
  <mj-section background-color="#ffffff" padding-bottom="20px" padding-top="0px">
    <mj-column width="100%">
      <mj-text font-size="14px" color="#000000" align="center">
        Si no has solicitado este código, por favor ignora este correo o contacta con nuestro equipo de soporte.
      </mj-text>
    </mj-column>
  </mj-section>
  <mj-section background-color="#f4f4f4" padding-bottom="20px" padding-top="20px">
    <mj-column width="100%">
      <mj-text font-size="12px" color="#000000" align="center">
        © 2024 HelpHub.
      </mj-text>
    </mj-column>
  </mj-section>
</mj-body>
</mjml>
  `;

      const { html } = mjml2html(mjmlTemplate);
      this.sendMail({
        to: email,
        from: process.env.MAIL_USER,
        subject: 'Login confirm',
        html: html,
      });
      return {
        message: 'Email sent successfull.',
      };
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  //Send Email to reset password.
  async resetEmail(resetEmail: LoginUserDto) {
    const { email, twoFa } = resetEmail;
    const user = await this.userService.findOne(email);

    if (user.length == 0) return {      //User exists? No-> Error code with text, and don't send email.
      message: 'User does not exist',
    }

    try {
      const mjmlTemplate = `
    <mjml>
<mj-head>
  <mj-title>Reseteo Password Código 2FA</mj-title>
  <mj-font name="Roboto" href="https://fonts.googleapis.com/css?family=Roboto" />
  <mj-attributes>
    <mj-all font-family="Roboto, Helvetica, sans-serif" />
  </mj-attributes>
  <mj-style inline="inline">
    @keyframes vibrate {
      0% { transform: rotate(0deg); }
      25% { transform: rotate(3deg); }
      50% { transform: rotate(0deg); }
      75% { transform: rotate(-3deg); }
      100% { transform: rotate(0deg); }
    }
    .vibrating-lock {
      animation: vibrate 0.3s infinite;
      display: inline-block;
    }
    .digit-box {
      display: inline-block;
      width: 40px;
      height: 50px;
      margin: 0 5px;
      background-color: #f0f0f0;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 24px;
      line-height: 50px;
      text-align: center;
    }
  </mj-style>
</mj-head>
<mj-body background-color="#f4f4f4">
  <mj-section background-color="#ffffff" padding-bottom="20px" padding-top="20px">
    <mj-column width="100%">
      <mj-image src="https://via.placeholder.com/150x50" alt="Logo" align="center" width="150px" />
    </mj-column>
  </mj-section>
  <mj-section background-color="#ffffff" padding-bottom="0px" padding-top="0">
    <mj-column width="100%">
      <mj-text font-size="24px" color="#000000" align="center">
        Confirma tu cuenta
      </mj-text>
      <mj-text font-size="16px" color="#000000" align="center">
         Por favor, utiliza el siguiente código para completar el proceso de recuperación de su contraseña.
      </mj-text>
      <mj-text align="center" font-size="24px">
        <span class="vibrating-lock">🔒</span>
      </mj-text>
    </mj-column>
  </mj-section>
  <mj-section background-color="#ffffff" padding-bottom="20px" padding-top="20px">
    <mj-column width=80%">
      <mj-text align="center" font-size="14px" font-weight="bold">
        Tu código de autenticación de doble factor:
      </mj-text>
      <mj-text align="center" padding-top="10px">
        <span class="digit-box">${twoFa[0]}</span>
        <span class="digit-box">${twoFa[1]}</span>
        <span class="digit-box">${twoFa[2]}</span>
        <span class="digit-box">${twoFa[3]}</span>
        <span class="digit-box">${twoFa[4]}</span>
        <span class="digit-box">${twoFa[5]}</span>
      </mj-text>
    </mj-column>
  </mj-section>
  <mj-section background-color="#ffffff" padding-bottom="20px" padding-top="0px">
    <mj-column width="100%">
      <mj-text font-size="14px" color="#000000" align="center">
        Si no has solicitado este código, por favor ignora este correo o contacta con nuestro equipo de soporte.
      </mj-text>
    </mj-column>
  </mj-section>
  <mj-section background-color="#f4f4f4" padding-bottom="20px" padding-top="20px">
    <mj-column width="100%">
      <mj-text font-size="12px" color="#000000" align="center">
        © 2024 HelpHub.
      </mj-text>
    </mj-column>
  </mj-section>
</mj-body>
</mjml>
  `;

      const { html } = mjml2html(mjmlTemplate);
      this.sendMail({
        to: email,
        from: process.env.MAIL_USER,
        subject: 'Reset credentials',
        html: html,
      });
      return {
        message: 'Email sent successfull.',
      };
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  //Sent emails function.
  private async sendMail(mailInfo: SendMailInfo) {

    const emailData = {
      ...mailInfo,

    };
    await this.mailerService.sendMail(emailData);
  }
  //Exceptions.
  private handleDBErrors(error: any) {
    if (error.code === '23505')
      throw new BadRequestException(error.detail);

    if (error.code === 'EAUTH')
      throw new ConflictException('Mail service error, email not sent');

    throw new InternalServerErrorException('Please check server logs');
  }
}
