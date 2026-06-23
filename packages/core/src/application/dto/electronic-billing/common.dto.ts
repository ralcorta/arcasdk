import { ErrorInfo } from "@domain/types/electronic-billing.types";

export interface AfipErrorsDto {
  err?: ErrorInfo[];
}

export interface AfipResultDto<T> {
  resultGet?: T;
  errors?: AfipErrorsDto;
}

export type ResultWithAfipErrors<T> = T & {
  errors?: AfipErrorsDto;
};
