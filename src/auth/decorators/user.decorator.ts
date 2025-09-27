import { createParamDecorator, ExecutionContext, InternalServerErrorException } from "@nestjs/common";

export const User = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        if (!request.user) {
            throw new InternalServerErrorException('User not found in request (make sure that AuthGuard is used)');
        }

        return request.user;
    },
);