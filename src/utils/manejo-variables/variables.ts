import { TipoVariable } from '../enums';
export class Variables {
  static limpiarVariables(variables: any): any {
    const fechaLocal = new Date().toLocaleString('es-EC', {
      timeZone: 'America/Guayaquil',
    });

    for (var key in variables) {
      if (typeof variables[key] === TipoVariable.STRING) {
        variables[key] = variables[key].trim();
      }
    }
    variables['Fecha'] = fechaLocal;
    return variables;
  }
}
