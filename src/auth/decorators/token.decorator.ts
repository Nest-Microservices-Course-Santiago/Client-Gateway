import { createParamDecorator, ExecutionContext, InternalServerErrorException } from "@nestjs/common";

export const Token = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        if (!request.token) {
            throw new InternalServerErrorException('Token not found in request (make sure that AuthGuard is used)');
        }

        return request.token;
    },
);