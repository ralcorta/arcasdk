export interface RegisterParameterDto {
  id: string;
  description?: string;
  attributes: Record<string, string | undefined>;
}

export interface ParameterCollectionDto {
  name: string;
  fechaHora?: string;
  parameters: RegisterParameterDto[];
}
