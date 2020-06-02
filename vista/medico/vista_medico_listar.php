<script type="text/javascript" src="../js/medico.js?rev=<?php echo time(); ?>"></script>
<div class="col-md-12">
    <div class="box box-warning box-solid">
        <div class="box-header with-border">
            <h3 class="box-title">MANTENIMIENTO DE MEDICO</h3>

            <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                </button>
            </div>
            <!-- /.box-tools -->
        </div>
        <!-- /.box-header -->
        <div class="box-body">
            <div class="form-group">
                <div class="col-lg-10">
                    <div class="input-group">
                        <input type="text" class="global_filter form-control" id="global_filter" placeholder="Ingresar dato a buscar">
                        <span class="input-group-addon"><i class="fa fa-search"></i></span>
                    </div>
                </div>
                <div class="col-lg-2">
                    <!-- /llamar funcion abrirmodal -->
                    <button class="btn btn-danger" style="width:100%" onclick="AbrirModalRegistro()"><i class="glyphicon glyphicon-plus"></i>Nuevo Registro</button>
                </div>
            </div>
            <table id="tabla_medico" class="display responsive nowrap" style="width:100%">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nro Doc</th>
                        <th>Medico</th>
                        <th>Nro Colegiatura</th>
                        <th>Especialidad</th>
                        <th>Sexo</th>
                        <th>Celular</th>
                        <th>Acci&oacute;n</th>
                    </tr>
                </thead>
                <tfoot>
                    <tr>
                    <th>#</th>
                        <th>Nro Doc</th>
                        <th>Medico</th>
                        <th>Nro Colegiatura</th>
                        <th>Especialidad</th>
                        <th>Sexo</th>
                        <th>Celular</th>
                        <th>Acci&oacute;n</th>
                    </tr>
                </tfoot>
            </table>
        </div>
        <!-- /.box-body -->
    </div>
    <!-- /.box -->
</div>
<!-- para que no se autocomplete -->
<div class="modal fade" id="modal_registro" role="dialog">
    <!-- id del modal -->
    <div class="modal-dialog modal-lm">
        <div class="modal-content">
            <div class="modal-header" style="text-align:center;">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title"><b>Registro de Medico </b></h4>
            </div>
            <div class="modal-body">
                <div class="col-lg-12">
                    <label for="">Nombre</label> <!-- body del modal -->
                    <input type="text" class="form-control" id="txt_nombres" placeholder="Ingrese especidalidad" maxlength="50" onkeypress="return soloLetras(event)"><br>
                </div>

                <div class="col-lg-6">
                    <label for="">Apellido Paterno</label> <!-- body del modal -->
                    <input type="text" class="form-control" id="txt_apepat" placeholder="Ingrese apellido paterno" maxlength="50" onkeypress="return soloLetras(event)"><br>
                </div>

                <div class="col-lg-6">
                    <label for="">Apellido Materno</label> <!-- body del modal -->
                    <input type="text" class="form-control" id="txt_apemat" placeholder="Ingrese apellido materno" maxlength="50" onkeypress="return soloLetras(event)"><br>
                </div>

                <div class="col-lg-12">
                    <label for="">Direccion</label> <!-- body del modal -->
                    <input type="text" class="form-control" id="txt_direccion" placeholder="Ingrese direccion" maxlength="50" onkeypress="return soloLetras(event)"><br>
                </div>
                <div class="col-lg-4">
                    <label for="">Movil</label> <!-- body del modal -->
                    <input type="text" class="form-control" id="txt_movil" placeholder="Ingrese movil" maxlength="50" onkeypress="return soloNumeros(event)"><br>
                </div>
                <div class="col-lg-4">
                    <label for="">Sexo</label>
                    <select class="js-example-basic-single" name="state" id="cbm_sexo" style="width:100%;">
                        <option value="M">MASCULINO</option>
                        <option value="F">FEMENINO</option>
                    </select><br><br>
                </div>

                <div class="col-lg-4">
                    <label for="">Fecha Nacimiento</label> <!-- body del modal -->
                    <input type="date" class="form-control" id="txt_fnac" ><br>
                </div>
                <div class="col-lg-12">
                </div>
                <div class="col-lg-4">
                    <label for="">Nro documento</label> <!-- body del modal -->
                    <input type="text" class="form-control" id="txt_ndoc" placeholder="Ingrese numero de documento" maxlength="50" onkeypress="return soloNumeros(event)"><br>
                </div>
               
                <div class="col-lg-4">
                    <label for="">Nro Colegiatura</label> <!-- body del modal -->
                    <input type="text" class="form-control" id="txt_ncol" placeholder="Ingrese numero de colegiatura" maxlength="50" onkeypress="return soloNumeros(event)"><br>
                </div>



                <div class="col-lg-4">
                    <label for="">Especialidad</label>
                    <select class="js-example-basic-single" name="state" id="cbm_especialidad" style="width:100%;">
                      
                    </select><br><br>

                </div>
                <div class="col-lg-12" style="text-align: center;">
                   <b>DATOS DEL USUARIO</b><br>
                </div>
                <div class="col-lg-4">
                    <label for="">Usuario</label> <!-- body del modal -->
                    <input type="text" class="form-control" id="txt_usu" placeholder="Ingrese numero de usuario" maxlength="50" ><br>
                </div>
               
                <div class="col-lg-4">
                    <label for="">Contraseña</label> <!-- body del modal -->
                    <input type="text" class="form-control" id="txt_contra" placeholder="Ingresar contraseña" maxlength="50" ><br>
                </div>
                <div class="col-lg-4">
                    <label for="">rol</label>
                    <select class="js-example-basic-single" name="state" id="cbm_rol" style="width:100%;">
                      
                    </select><br><br>

                </div>
                <div class="col-lg-12">
                <label for="">Email</label>
                    <input type="text" class="form-control" id="txt_mail" placeholder="ingresar email" maxlength="50" ><br>
                </div>


            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" onclick="Registrar_Especialidad()"><i class="fa fa-check"><b>&nbsp;Registrar</b></i></button>
                <button type="button" class="btn btn-danger" data-dismiss="modal"><i class="fa fa-close"><b>&nbsp;Cerrar</b></i></button>
            </div>
        </div>
    </div>
</div>



<!-- inicio modal editar -->

<script>
    $(document).ready(function() {
        listar_medico();

        $('.js-example-basic-single').select2();

        $("#modal_registro").on('shown.bs.modal', function() { //
            $("#txt_especialidad").focus();
        })
    });

    $('box').boxWidget({
        animationSpeed: 500,
        collapseTrigger: '[data-widget="collapse"]',
        removeTrigger: '[data-widget="remove"]',
        collapseIcon: 'fa-minus',
        expandIcon: 'fa-plus',
        removeIcon: 'fa-times'
    })
</script>