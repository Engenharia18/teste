import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UsersService } from '../../users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const { authorization } = req.headers;

    try {
      const data = this.authService.checkToken(
        (authorization ?? '').split(' ')[1],
      );

      req.tokenPayload = data;

      const user = await this.usersService.findByID(data.id);
      if (user === null) {
        return false;
      }
      req.user = {
        id: user.id,
        username: user.username,
        role: user.role,
      };

      return true;
    } catch (e) {
      return false;
    }
  }
}
