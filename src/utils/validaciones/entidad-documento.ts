/**
 *
 * @package     validarDocumentos
 * @subpackage
 * @author      Ing. Jose Gusñay <jcjunior308@gmail.com>
 * @copyright   2020 Ing. Jose Gusáy (SysTech)
 * @license     MIT License
 * @link        ..........
 * @version     @@1.0@@
 */

/**
 * ValidarIdentificacion contiene metodos para validar cédula, RUC de persona natural, RUC de sociedad privada y
 * RUC de socieda pública en el Ecuador.
 *
 * Los métodos públicos para realizar validaciones son:
 *
 * validarCedula()
 * validarRucPersonaNatural()
 * validarRucSociedadPrivada()
 */
export class ValidarIdentificacion {
  /**
   * Error
   *
   * Contiene errores globales de la clase
   *
   * @var string
   * @access public
   */
  protected error = '';
  /**
   * Validar cédula
   *
   * @param  string  numero  Número de cédula
   *
   * @return Boolean
   */
  public validarCedula(numero: string = '') {
    // borro por si acaso errores de llamadas anteriores.
    this.setError('');
    // validaciones
    try {
      this.validarInicial(numero, 10);
      this.validarCodigoProvincia(numero.substr(0, 2));
      this.validarTercerDigito(numero[2], 'cedula');
      this.algoritmoModulo10(numero.substr(0, 9), numero[9]);
    } catch (err) {
      this.setError(err);
      return false;
    }
    return true;
  }
  /**
   * Validar RUC persona natural
   *
   * @param  string  numero  Número de RUC persona natural
   *
   * @return Boolean
   */
  public validarRucPersonaNatural(numero: string = '') {
    // borro por si acaso errores de llamadas anteriores.
    this.setError('');
    // validaciones
    try {
      this.validarInicial(numero, 13);
      this.validarCodigoProvincia(numero.substr(0, 2));
      this.validarTercerDigito(numero[2], 'ruc_natural');
      this.validarCodigoEstablecimiento(numero.substr(10, 3));
      this.algoritmoModulo10(numero.substr(0, 9), numero[9]);
    } catch (err) {
      this.setError(err);
      return false;
    }
    return true;
  }
  /**
   * Validar RUC sociedad privada
   *
   * @param  string  numero  Número de RUC sociedad privada
   *
   * @return Boolean
   */
  public validarRucSociedadPrivada(numero: string = '') {
    // borro por si acaso errores de llamadas anteriores.
    this.setError('');
    // validaciones
    try {
      this.validarInicial(numero, 13);
      this.validarCodigoProvincia(numero.substr(0, 2));
      this.validarTercerDigito(numero[2], 'ruc_privada');
      this.validarCodigoEstablecimiento(numero.substr(10, 3));
      this.algoritmoModulo11(numero.substr(0, 9), numero[9], 'ruc_privada');
    } catch (err) {
      this.setError(err);
      return false;
    }
    return true;
  }
  /**
   * Validar RUC sociedad publica
   *
   * @param  string  numero  Número de RUC sociedad publica
   *
   * @return Boolean
   */
  public validarRucSociedadPublica(numero: string = '') {
    // borro por si acaso errores de llamadas anteriores.
    this.setError('');
    // validaciones
    try {
      this.validarInicial(numero, 13);
      this.validarCodigoProvincia(numero.substr(0, 2));
      this.validarTercerDigito(numero[2], 'ruc_publica');
      this.validarCodigoEstablecimiento(numero.substr(9, 4));
      this.algoritmoModulo11(numero.substr(0, 8), numero[8], 'ruc_publica');
    } catch (err) {
      this.setError(err);
      return false;
    }
    return true;
  }
  /**
   * Validaciones iniciales para CI y RUC
   *
   * @param  string  numero      CI o RUC
   * @param  integer caracteres  Cantidad de caracteres requeridos
   *
   * @return Boolean
   *
   * @throws exception Cuando valor esta vacio, cuando no es dígito y
   * cuando no tiene cantidad requerida de caracteres
   */
  protected validarInicial(numero: string, caracteres: number) {
    if (!numero) {
      throw new Error('Valor no puede estar vacio');
    }
    if (isNaN(Number(numero))) {
      throw new Error('Valor ingresado solo puede tener dígitos');
    }
    if (numero.length != caracteres) {
      throw new Error(`Valor ingresado debe tener ${caracteres} caracteres`);
    }
    return true;
  }
  /**
   * Validación de código de provincia (dos primeros dígitos de CI/RUC)
   *
   * @param  string  numero  Dos primeros dígitos de CI/RUC
   *
   * @return boolean
   *
   * @throws exception Cuando el código de provincia no esta entre 00 y 24
   */
  protected validarCodigoProvincia(numero: string) {
    if (Number(numero) < 0 || Number(numero) > 24) {
      throw new Error(
        'Codigo de Provincia (dos primeros dígitos) no deben ser mayor a 24 ni menores a 0',
      );
    }
    return true;
  }
  /**
   * Validación de tercer dígito
   *
   * Permite validad el tercer dígito del documento. Dependiendo
   * del campo tipo (tipo de identificación) se realizan las validaciones.
   * Los posibles valores del campo tipo son: cedula, ruc_natural, ruc_privada
   *
   * Para Cédulas y RUC de personas naturales el terder dígito debe
   * estar entre 0 y 5 (0,1,2,3,4,5)
   *
   * Para RUC de sociedades privadas el terder dígito debe ser
   * igual a 9.
   *
   * Para RUC de sociedades públicas el terder dígito debe ser
   * igual a 6.
   *
   * @param  string numero  tercer dígito de CI/RUC
   * @param  string tipo  tipo de identificador
   *
   * @return boolean
   *
   * @throws exception Cuando el tercer digito no es válido. El mensaje
   * de error depende del tipo de Idenficiación.
   */
  protected validarTercerDigito(numero: string, tipo: string) {
    switch (tipo) {
      case 'cedula':
      case 'ruc_natural':
        if (Number(numero) < 0 || Number(numero) > 5) {
          throw new Error(
            'Tercer dígito debe ser mayor o igual a 0 y menor a 6 para cédulas y RUC de persona natural',
          );
        }
        break;
      case 'ruc_privada':
        if (Number(numero) != 9) {
          throw new Error(
            'Tercer dígito debe ser igual a 9 para sociedades privadas',
          );
        }
        break;
      case 'ruc_publica':
        if (Number(numero) != 6) {
          throw new Error(
            'Tercer dígito debe ser igual a 6 para sociedades públicas',
          );
        }
        break;
      default:
        throw new Error('Tipo de Identificación no existe.');
        break;
    }
    return true;
  }
  /**
   * Validación de código de establecimiento
   *
   * @param  string numero  tercer dígito de CI/RUC
   *
   * @return boolean
   *
   * @throws exception Cuando el establecimiento es menor a 1
   */
  protected validarCodigoEstablecimiento(numero: string) {
    if (Number(numero) < 1) {
      throw new Error('Código de establecimiento no puede ser 0');
    }
    return true;
  }
  /**
   * Algoritmo Modulo10 para validar si CI y RUC de persona natural son válidos.
   *
   * Los coeficientes usados para verificar el décimo dígito de la cédula,
   * mediante el algoritmo “Módulo 10” son:  2. 1. 2. 1. 2. 1. 2. 1. 2
   *
   * Paso 1: Multiplicar cada dígito de los digitosIniciales por su respectivo
   * coeficiente.
   *
   *  Ejemplo
   *  digitosIniciales posicion 1  x 2
   *  digitosIniciales posicion 2  x 1
   *  digitosIniciales posicion 3  x 2
   *  digitosIniciales posicion 4  x 1
   *  digitosIniciales posicion 5  x 2
   *  digitosIniciales posicion 6  x 1
   *  digitosIniciales posicion 7  x 2
   *  digitosIniciales posicion 8  x 1
   *  digitosIniciales posicion 9  x 2
   *
   * Paso 2: Sí alguno de los resultados de cada multiplicación es mayor a o igual a 10,
   * se suma entre ambos dígitos de dicho resultado. Ex. 12.1+2.3
   *
   * Paso 3: Se suman los resultados y se obtiene total
   *
   * Paso 4: Divido total para 10, se guarda residuo. Se resta 10 menos el residuo.
   * El valor obtenido debe concordar con el digitoVerificador
   *
   * Nota: Cuando el residuo es cero(0) el dígito verificador debe ser 0.
   *
   * @param  string digitosIniciales   Nueve primeros dígitos de CI/RUC
   * @param  string digitoVerificador  Décimo dígito de CI/RUC
   *
   * @return boolean
   *
   * @throws exception Cuando los digitosIniciales no concuerdan contra
   * el código verificador.
   */
  protected algoritmoModulo10(
    digitosIniciales: string,
    digitoVerificador: string,
  ) {
    let resultado: number;
    const arrayCoeficientes: number[] = [2, 1, 2, 1, 2, 1, 2, 1, 2];
    const Verificador = Number(digitoVerificador);
    const Iniciales = [...digitosIniciales];
    let total = 0;
    for (let key = 0; key < Iniciales.length; key++) {
      const value = Iniciales[key];

      let valorPosicion: any = Number(value) * arrayCoeficientes[key];
      if (valorPosicion >= 10) {
        valorPosicion = [...valorPosicion.toString()];
        valorPosicion = valorPosicion.reduce(
          (a: string, b: string) => Number(a) + Number(b),
          0,
        );
        console.log(valorPosicion);
        valorPosicion = Number(valorPosicion);
      }
      total = total + valorPosicion;
    }
    const residuo = total % 10;
    if (residuo == 0) {
      resultado = 0;
    } else {
      resultado = 10 - residuo;
    }
    if (resultado != Verificador) {
      throw new Error('Dígitos iniciales no validan contra Dígito Idenficador');
    }
    return true;
  }
  /**
   * Algoritmo Modulo11 para validar RUC de sociedades privadas y públicas
   *
   * El código verificador es el decimo digito para RUC de empresas privadas
   * y el noveno dígito para RUC de empresas públicas
   *
   * Paso 1: Multiplicar cada dígito de los digitosIniciales por su respectivo
   * coeficiente.
   *
   * Para RUC privadas el coeficiente esta definido y se multiplica con las siguientes
   * posiciones del RUC:
   *
   *  Ejemplo
   *  digitosIniciales posicion 1  x 4
   *  digitosIniciales posicion 2  x 3
   *  digitosIniciales posicion 3  x 2
   *  digitosIniciales posicion 4  x 7
   *  digitosIniciales posicion 5  x 6
   *  digitosIniciales posicion 6  x 5
   *  digitosIniciales posicion 7  x 4
   *  digitosIniciales posicion 8  x 3
   *  digitosIniciales posicion 9  x 2
   *
   * Para RUC privadas el coeficiente esta definido y se multiplica con las siguientes
   * posiciones del RUC:
   *
   *  digitosIniciales posicion 1  x 3
   *  digitosIniciales posicion 2  x 2
   *  digitosIniciales posicion 3  x 7
   *  digitosIniciales posicion 4  x 6
   *  digitosIniciales posicion 5  x 5
   *  digitosIniciales posicion 6  x 4
   *  digitosIniciales posicion 7  x 3
   *  digitosIniciales posicion 8  x 2
   *
   * Paso 2: Se suman los resultados y se obtiene total
   *
   * Paso 3: Divido total para 11, se guarda residuo. Se resta 11 menos el residuo.
   * El valor obtenido debe concordar con el digitoVerificador
   *
   * Nota: Cuando el residuo es cero(0) el dígito verificador debe ser 0.
   *
   * @param  string digitosIniciales   Nueve primeros dígitos de RUC
   * @param  string digitoVerificador  Décimo dígito de RUC
   * @param  string tipo Tipo de identificador
   *
   * @return boolean
   *
   * @throws exception Cuando los digitosIniciales no concuerdan contra
   * el código verificador.
   */
  protected algoritmoModulo11(
    digitosIniciales: string,
    digitoVerificador: string,
    tipo: string,
  ) {
    let resultado: number;
    let arrayCoeficientes: number[];
    switch (tipo) {
      case 'ruc_privada':
        arrayCoeficientes = [4, 3, 2, 7, 6, 5, 4, 3, 2];
        break;
      case 'ruc_publica':
        arrayCoeficientes = [3, 2, 7, 6, 5, 4, 3, 2];
        break;
      default:
        throw new Error('Tipo de Identificación no existe.');
        break;
    }
    const Verificador = Number(digitoVerificador);
    const Iniciales = [...digitosIniciales];
    let total = 0;
    for (let key = 0; key < Iniciales.length; key++) {
      const value = Iniciales[key];
      let valorPosicion: any = Number(value) * arrayCoeficientes[key];
      total = total + valorPosicion;
    }
    const residuo = total % 11;
    if (residuo == 0) {
      resultado = 0;
    } else {
      resultado = 11 - residuo;
    }
    if (resultado != Verificador) {
      throw new Error('Dígitos iniciales no validan contra Dígito Idenficador');
    }
    return true;
  }
  /**
   * Get error
   *
   * @return string Mensaje de error
   */
  public getError() {
    return this.error;
  }
  /**
   * Set error
   *
   * @param  string newError
   * @return object this.error
   */
  public setError(newError: any) {
    this.error = newError;
    return this.error;
  }
}
