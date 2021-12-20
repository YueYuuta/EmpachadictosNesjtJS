export enum UsuarioAlias {
  UsuarioCrear = 'usuario/crear-usuario',
  UsuarioEditar = 'usuario/editar-usuario',
  UsuarioResContra = 'usuario/restaurar-password-usuario',
  // UsuarioObtenerPorID = 'usuario/obtener/id',
  UsuarioPaginado = 'usuario/usuarios',
  // UsuarioObener = 'usuario/obtener',
  // UsuarioValidar = 'usuario/validar',
  UsuarioElmininar = 'usuario/eliminar-usuario',
}

export enum ClienteAlias {
  ClienteCrear = 'cliente/crear-cliente',
  ClienteEditar = 'cliente/editar-cliente',
  ClientePaginado = 'cliente/clientes',
  ClienteElmininar = 'cliente/eliminar-cliente',

  ProveedorCrear = 'cliente/crear-proveedor',
  ProveedorEditar = 'cliente/editar-proveedor',
  ProveedorPaginado = 'cliente/proveedores',
  ProveedorElmininar = 'cliente/eliminar-proveedor',
}

// export enum ProveedorAlias {
//   ProveedorCrear = 'proveedor/crear-proveedor',
//   ProveedorEditar = 'proveedor/editar-proveedor',
//   ProveedorPaginado = 'proveedor/proveedores',
//   ProveedorElmininar = 'proveedor/eliminar-proveedor',
// }

export enum AlmacenAlias {
  AlmacenCrear = 'almacen/crear-almacen',
  AlmacenEditar = 'almacen/editar-almacen',
  // AlmacenObtenerPorID = 'almacen/obtener/id',
  AlmacenPaginado = 'almacen/almacenes',
  // AlmacenObtener = 'almacen/obtener',
  AlmacenElmininar = 'almacen/eliminar-almacen',
}

export enum AntiguoAlias {
  AntiguoCrear = 'antiguo/crear-antiguo',
  AntiguoEditar = 'antiguo/editar-antiguo',
  // AntiguoObtenerPorID = 'antiguo/obtener/id',
  AntiguoPaginado = 'antiguo/antiguos',
  // AntiguoObtener = 'antiguo/obtener',
  AntiguoElmininar = 'antiguo/eliminar-antiguo',
}

export enum ProductoAlias {
  ProductoCrear = 'producto/crear-producto',
  ProductoEditar = 'producto/editar-producto',
  // ProductoObtenerPorID = 'producto/obtener/id',
  ProductoPaginado = 'producto/productos',
  // ProductoObtener = 'producto/obtener',
  ProductoElmininar = 'producto/eliminar-producto',

  MenuAlmacenCrear = 'producto/crear-menu-almacen',
  MenuAlmacenEditar = 'producto/editar-menu-almacen',
  // MenuAlmacenObtenerPorID = 'producto/obtener/id',
  MenuAlmacenPaginado = 'producto/menus-almacen',
  // MenuAlmacenObtener = 'producto/obtener',
  MenuAlmacenElmininar = 'producto/eliminar-menu-almacen',

  ProductoAlmacenCrear = 'producto/crear-producto-almacen',
  ProductoAlmacenEditar = 'producto/editar-producto-almacen',
  ProductoAlmacenPaginado = 'producto/productos-almacen',
  ProductoAlmacenElmininar = 'producto/eliminar-producto-almacen',

  CategoriaCrear = 'producto/crear-categoria',
  CategoriaEditar = 'producto/editar-categoria',
  // CategoriaObtenerPorID = 'producto/obtener/id',
  CategoriaPaginado = 'producto/categorias',
  // CategoriaObtener = 'producto/obtener',
  CategoriaElmininar = 'producto/eliminar-categoria',

  MenuCrear = 'producto/crear-menu',
  MenuEditar = 'producto/editar-menu',
  // MenuObtenerPorID = 'producto/obtener/id',
  MenuPaginado = 'producto/menus',
  // MenuObtener = 'producto/obtener',
  MenuElmininar = 'producto/eliminar-menu',

  IngresoCrear = 'producto/crear-ingreso',
  IngresoEditar = 'producto/editar-ingreso',
  // IngresoObtenerPorID = 'producto/obtener/id',
  IngresoPaginado = 'producto/ingresos',
  // IngresoObtener = 'producto/obtener',
  IngresoElmininar = 'producto/eliminar-ingreso',
}

export enum IngresoAlias {
  IngresoCrear = 'ingreso/crear-ingreso',
  IngresoEditar = 'ingreso/editar-ingreso',
  // IngresoObtenerPorID = 'ingreso/obtener/id',
  IngresoPaginado = 'ingreso/ingresos',
  // IngresoObtener = 'ingreso/obtener',
  IngresoElmininar = 'ingreso/eliminar-ingreso',
}
export enum UbicacionAlias {
  ProvinciaCrear = 'ubicacion/crear-provincia',
  ProvinciaEditar = 'ubicacion/editar-provincia',
  ProvinciaPaginado = 'ubicacion/provincias',
  ProvinciaElmininar = 'ubicacion/eliminar-provincia',

  //
  CantonCrear = 'ubicacion/crear-canton',
  CantonEditar = 'ubicacion/editar-canton',
  CantonPaginado = 'ubicacion/cantones',
  CantonElmininar = 'ubicacion/eliminar-canton',

  //

  ParroquiaCrear = 'ubicacion/crear-parroquia',
  ParroquiaEditar = 'ubicacion/editar-parroquia',
  ParroquiaPaginado = 'ubicacion/parroquiaes',
  ParroquiaElmininar = 'ubicacion/eliminar-parroquia',
}

export enum PlanAlias {
  PlanCrear = 'plan/crear-plan',
  PlanEditar = 'plan/editar-plan',
  PlanPaginado = 'plan/planes',
  PlanElmininar = 'plan/eliminar-plan',

  //

  EnlaceCrear = 'plan/crear-enlace',
  EnlaceEditar = 'plan/editar-enlace',
  EnlacePaginado = 'plan/enlaces',
  EnlaceElmininar = 'plan/eliminar-enlace',

  //

  TerminoCrear = 'plan/crear-termino',
  TerminoEditar = 'plan/editar-termino',
  TerminoPaginado = 'plan/terminos',
  TerminoElmininar = 'plan/eliminar-termino',
}

export enum ConfiguracionAlias {
  MesaCrear = 'mesa/crear-mesa',
  MesaEditar = 'mesa/editar-mesa',
  MesaPaginado = 'mesa/mesas',
  MesaElmininar = 'mesa/eliminar-mesa',

  UsuarioAlmacenCrear = 'configuracion/crear-usuario-almacen',
  UsuarioAlmacenEditar = 'configuracion/editar-usuario-almacen',
  // UsuarioAlmacenObtenerPorID = 'configuracion/obtener/id',
  UsuarioAlmacenPaginado = 'configuracion/usuario-almacen',
  // UsuarioAlmacenObtener = 'configuracion/obtener',
  UsuarioAlmacenElmininar = 'configuracion/eliminar-usuario-almacen',
  UsuarioAlmacenPorUsuario = 'configuracion/almacenes-asignados',

  RolCrear = 'configuracion/crear-rol',
  RolEditar = 'configuracion/editar-rol',
  // RolObtenerPorID = 'configuracion/obtener/id',
  RolPaginado = 'configuracion/roles',
  // RolObtener = 'configuracion/obtener',
  RolElmininar = 'configuracion/eliminar-rol',
  // RolObtenerPermiso = 'configuracion/permiso/lista',
}

export enum RolAlias {
  RolCrear = 'rol/crear',
  RolEditar = 'rol/editar',
  RolObtenerPorID = 'rol/obtener/id',
  RolPaginado = 'rol/lista',
  RolObtener = 'rol/obtener',
  RolElmininar = 'rol/eliminar',
  RolObtenerPermiso = 'rol/permiso/lista',
}
