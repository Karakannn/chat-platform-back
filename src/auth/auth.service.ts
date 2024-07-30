import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IAuthService } from './auth';
import { Services } from 'src/utils/constants';
import { IUserService } from 'src/users/user';
import { UserCredentialDetails } from 'src/utils/types';
import { compareHash } from 'src/utils/helpers';

@Injectable()
export class AuthService implements IAuthService {
  constructor(@Inject(Services.USERS) private usersService: IUserService) {}

  async validateUser(userDetails: UserCredentialDetails) {
    const user = await this.usersService.findUser({ email: userDetails.email });

    if (!user)
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);

    return compareHash(userDetails.password, user.password);
  }
}
