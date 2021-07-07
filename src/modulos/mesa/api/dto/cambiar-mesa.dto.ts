import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';
export class CambiarMesaDto {
  @IsOptional()
  readonly PedidoID: number | null;

  @IsNotEmpty({ message: 'El estadi ocupado no debe ir vacio!' })
  @IsBoolean()
  readonly Ocupado: boolean;
}
