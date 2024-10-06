import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/user/entities/user.schema';
import { Model } from 'mongoose';
import { MailerService } from '@nestjs-modules/mailer';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { SendMailInfo } from './send-mail-info.interface';
const mjml2html = require('mjml');
import * as argon2 from "argon2";

@Injectable()
export class EmailServiceService {
  
  constructor(@InjectModel(User.name) private readonly usuarioModel: Model<UserDocument>,
    private readonly mailerService: MailerService,
    private userService: UserService,
    
  ) {}

  //Función con la que enviaremos un correo de confirmación de la cuenta para ser activada. (Más adelante añadiremos JWT, para que la API del registro se autentifique)
  async emailAccount(emailAccount: CreateUserDto) {
    const { email, password, ...userData } = emailAccount;
    const user = await this.userService.findOne(email);

    if (user.length == 1) return {      //si existe usuario devolvemos mensaje sin enviar correo.
      message: 'User already exists',
    };

    try { 
      const passEncrypted = await argon2.hash(password);
      console.log(passEncrypted);
      const mjmlTemplate = `
      <mjml>
  <mj-head>
    <mj-title>Confirmación de Cuenta</mj-title>
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
    </mj-style>
  </mj-head>
  <mj-body background-color="#f4f4f4">
    <mj-section background-color="#ffffff" padding-bottom="20px" padding-top="20px">
      <mj-column width="100%">
        <mj-image src="" alt="Logo" align="center" width="150px" />
      </mj-column>
    </mj-section>
    <mj-section background-color="#ffffff" padding-bottom="0px" padding-top="0">
      <mj-column width="100%">
        <mj-text font-size="24px" color="#000000" align="center">
          Confirma tu cuenta
        </mj-text>
        <mj-text font-size="16px" color="#000000" align="center">
          Gracias por registrarte. Por favor, confirma tu cuenta haciendo clic en el botón de abajo.
        </mj-text>
        <mj-text align="center" font-size="24px">
          <span class="vibrating-lock">🔒</span>
        </mj-text>
      </mj-column>
    </mj-section>
    <mj-section background-color="#ffffff" padding-bottom="20px" padding-top="20px">
      <mj-column width="100%">
        <mj-button background-color="#000000" color="#ffffff" href="" font-size="16px">
          Confirmar Cuenta
        </mj-button>
      </mj-column>
    </mj-section>
    <mj-section background-color="#ffffff" padding-bottom="20px" padding-top="0px">
      <mj-column width="100%">
        <mj-text font-size="14px" color="#000000" align="center">
          Si no has creado una cuenta, puedes ignorar este correo.
        </mj-text>
      </mj-column>
    </mj-section>
    <mj-section background-color="#f4f4f4" padding-bottom="20px" padding-top="20px">
      <mj-column width="100%">
        <mj-text font-size="12px" color="#000000" align="center">
          © 2023 Tu Empresa. Todos los derechos reservados.
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
      console.log(error);
      this.handleDBErrors(error);
    }
  }
  //Función envío correos.
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
