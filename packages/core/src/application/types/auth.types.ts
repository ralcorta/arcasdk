
export interface AuthParams {
  Token: string;
  Sign: string;
  Cuit: number;
}

export type WSAuthParam = {
  Auth: AuthParams;
};
