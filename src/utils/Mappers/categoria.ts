import { EditarCategoriaDto } from '@modulos/categoria/api/dto';
import { CategoriaModel } from '@modulos/categoria/categoria-caso-uso/models/categoria';
import { Variables } from '@utils/manejo-variables/variables';

export class CategoriaMapper {
  public static editar(categoria: EditarCategoriaDto): CategoriaModel {
    const partiaCategoria: EditarCategoriaDto = {
      Nombre: categoria.Nombre ?? null,
    };
    Object.keys(partiaCategoria).forEach(
      key => partiaCategoria[key] === null && delete partiaCategoria[key],
    );
    const categoriaLimpio: CategoriaModel = Variables.limpiarVariables(
      partiaCategoria,
    );

    return categoriaLimpio;
  }

  public static crear(categoria: EditarCategoriaDto): CategoriaModel {
    const partiaCategoria: EditarCategoriaDto = {
      Nombre: categoria.Nombre ?? null,
    };
    Object.keys(partiaCategoria).forEach(
      key => partiaCategoria[key] === null && delete partiaCategoria[key],
    );
    const categoriaLimpio: CategoriaModel = Variables.limpiarVariables(
      partiaCategoria,
    );

    return categoriaLimpio;
  }
}
