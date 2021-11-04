import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { Configuration } from './config/config.keys';
import { ConfigService } from './config/config.service';
import { DatabaseModule } from './database/database.module';
import { UsuarioModule } from './modulos/usuario/usuario.module';
import { ConfigModule } from '@src/config/config.module';
import { SharedModule } from './modulos/shared/shared.module';
import { AuthModule } from './modulos/auth/auth.module';
import { AlmacenModule } from './modulos/almacen/almacen.module';
import { UsuarioAlmacenModule } from './modulos/usuario-almacen/usuario-almacen.module';
import { RolModule } from './modulos/rol/rol.module';
import { ClienteModule } from './modulos/cliente/cliente.module';
import { CategoriaModule } from './modulos/categoria/categoria.module';
import { ProductoModule } from './modulos/producto/producto.module';
import { MenuModule } from './modulos/menu/menu.module';

import { PedidoModule } from '@modulos/pedido/pedido.module';
import { MesaModule } from '@modulos/mesa/Mesa.module';
import { MenuAlmacenModule } from '@modulos/menu-almacen/menu-almacen.module';
import { DespacharModule } from '@modulos/despachar/despachar.module';
import { ProductoAlmacenModule } from '@modulos/producto-almacen/producto-almacen.module';
import { ProveedorModule } from '@modulos/proveedor/proveedor.module';
import { IngresoModule } from '@modulos/ingreso/ingreso.module';

const fileup = require('express-fileupload');

@Module({
  imports: [
    DatabaseModule,
    UsuarioModule,
    ConfigModule,
    SharedModule,
    AuthModule,
    AlmacenModule,
    UsuarioAlmacenModule,
    RolModule,
    ClienteModule,
    ProductoModule,
    CategoriaModule,
    MenuModule,
    PedidoModule,
    MesaModule,
    MenuAlmacenModule,
    DespacharModule,
    ProductoAlmacenModule,
    ProveedorModule,
    IngresoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  static port: number | string;
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(fileup())
      // .forRoutes({ path: 'usuario/avatar/:userId', method: RequestMethod.PUT });
      .forRoutes(
        { path: 'usuario/crear', method: RequestMethod.POST },
        // { path: 'usuario/avatar/:userId', method: RequestMethod.PATCH },
        { path: 'usuario/editar/:id', method: RequestMethod.PATCH },

        { path: 'categoria/crear', method: RequestMethod.POST },
        // { path: 'usuario/avatar/:userId', method: RequestMethod.PATCH },
        { path: 'categoria/editar/:CategoriaID', method: RequestMethod.PATCH },
        {
          path: 'producto/crear/imagen/:ProductoID/:tipo',
          method: RequestMethod.PATCH,
        },
        // { path: 'producto/:id', method: RequestMethod.PATCH },
        // { path: 'producto', method: RequestMethod.POST },
        // { path: 'producto/guardar/imagen/:id', method: RequestMethod.PUT },
      );
  }

  constructor(private readonly _configService: ConfigService) {
    AppModule.port = this._configService.get(Configuration.PORT_SERVER);
  }
}
