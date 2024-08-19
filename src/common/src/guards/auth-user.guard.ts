import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { Observable, lastValueFrom } from "rxjs";
import { MasterJwtAuthGuard } from "./master-jwt-auth.guard";
import { AgentJwtAuthGuard } from "./agent-jwt-auth.guard";

@Injectable()
export class AuthUserGuard implements CanActivate {
  constructor(
    private readonly masterJwtAuthGuard: MasterJwtAuthGuard,
    private readonly agentJwtAuthGuard: AgentJwtAuthGuard
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const [masterResult, agentResult] = await Promise.allSettled([
      this.isActiveGuard(this.masterJwtAuthGuard, context),
      this.isActiveGuard(this.agentJwtAuthGuard, context),
    ]);

    const masterSuccess =
      masterResult.status === "fulfilled" && masterResult.value === true;
    const agentSuccess =
      agentResult.status === "fulfilled" && agentResult.value === true;

    if (masterSuccess || agentSuccess) {
      return true;
    }

    throw new UnauthorizedException();
  }

  private async isActiveGuard(
    guard: CanActivate,
    context: ExecutionContext
  ): Promise<boolean> {
    try {
      const result = guard.canActivate(context);
      if (result instanceof Observable) {
        return await lastValueFrom(result);
      }
      return result;
    } catch (e) {
      if (e instanceof UnauthorizedException) {
        return false;
      }
      throw e;
    }
  }
}
