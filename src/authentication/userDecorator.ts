import { createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator((data, req) => {
  req.body.username = req.user.username;
  req.body.id = req.user.id;
  return req.body;
});
