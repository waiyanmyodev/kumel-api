export type JwtPayload = {
  username: string;
  token_type: TokenEnum;
};

export enum TokenEnum {
  ACCESS = "ACCESS",
  REFRESH = "REFRESH",
}

export type AgentJwtPayload = {
  masterCode: string;
  username: string;
  token_type: TokenEnum;
};