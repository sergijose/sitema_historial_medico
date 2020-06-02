
var tablemedico;
function listar_medico() {
    tablemedico = $("#tabla_medico").DataTable({  //id de la tabla
        "ordering": false,
        "bLengthChange": false,
        "searching": { "regex": false },
        "lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
        "pageLength": 10,
        "destroy": true,
        "async": false,
        "processing": true,
        "ajax": {
            "url": "../controlador/medico/controlador_medico_listar.php",
            type: 'POST'
        },
        "order": [[1, 'asc']],
        "columns": [
            { "defaultContent": "" },
            { "data": "medico_nrodocumento" },
            { "data": "medico" },
            { "data": "medico_colegiatura" },
            { "data": "especialidad_nombre" },
            { "data": "medico_sexo" ,
           
                render: function (data, type, row) {
                    if (data == 'M') {
                        return "MASCULINO";
                    }
                    else {
                        return "FEMENINO";
                    }

                }
            },
            { "data": "medico_movil" },

            //zona de botones
            { "defaultContent": "<button style='font-size:13px;' type='button' class='editar btn btn-primary'><i class='fa fa-edit'></i></button>" }
        ],

        "language": idioma_espanol,
        select: true
    });
    document.getElementById("tabla_medico_filter").style.display = "none"; //para ocultar el buscador chico del datatable
    $('input.global_filter').on('keyup click', function () {
        filterGlobal();
    });
    $('input.column_filter').on('keyup click', function () {
        filterColumn($(this).parents('tr').attr('data-column'));
    });
    //para la enumeraciond el datatable
    tablemedico.on('draw.dt', function () {
        var PageInfo = $('#tabla_medico').DataTable().page.info();
        tablemedico.column(0, { page: 'current' }).nodes().each(function (cell, i) {//contador cero declaramos  clumn vacio osea cero
            cell.innerHTML = i + 1 + PageInfo.start;
        });
    });



}

$('#tabla_medico').on('click', '.editar', function () {  //al boton recuerda le nombramos editar por eso el .
    var data = tablemedico.row($(this).parents('tr')).data(); //detecta a que fila hago click y me captura los datos en la variable data
    if (tablemedico.row(this).child.isShown()) { //cuando esta en tamaño responsivo
        var data = tablemedico.row(this).data();
    }
    $("#modal_editar").modal({ backdrop: 'static', keyboard: false }) //para que no me ciere el modal
    $("#modal_editar").modal('show');
    $("#id_especialidad").val(data.especialidad_id);
    $("#txt_especialidad_actual_editar").val(data.especialidad_nombre);
    $("#txt_especialidad_nueva_editar").val(data.especialidad_nombre);
    $("#cbm_estatus_editar").val(data.especialidad_estatus).trigger("change");//si trabajo con el select2
})

function filterGlobal() {
    $('#tabla_medico').DataTable().search(
        $('#global_filter').val(),
    ).draw();
}
function AbrirModalRegistro() {
    $("#modal_registro").modal({ backdrop: 'static', keyboard: false }) //para que no me ciere el modal
    $("#modal_registro").modal('show');
}
listar_combo_rol();
listar_combo_especialidad();

function listar_combo_rol() {
    $.ajax({
        "url": "../controlador/usuario/controlador_combo_rol_listar.php",
        type: 'POST'
    }).done(function (resp) {
        var data = JSON.parse(resp);
        var cadena = "";
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                cadena += "<option value='" + data[i][0] + "'>" + data[i][1] + "</option>";
            }
            $("#cbm_rol").html(cadena);
         
        } else {
            cadena += "<option value=''>NO SE ENCONTRARON REGISTROS</option>";
            $("#cbm_rol").html(cadena);
         
        }
    })
}

function listar_combo_especialidad() {
    $.ajax({
        "url": "../controlador/medico/controlador_combo_especialidad_listar.php",
        type: 'POST'
    }).done(function (resp) {
        var data = JSON.parse(resp);
        var cadena = "";
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                cadena += "<option value='" + data[i][0] + "'>" + data[i][1] + "</option>";
            }
            $("#cbm_especialidad").html(cadena);
         
        } else {
            cadena += "<option value=''>NO SE ENCONTRARON REGISTROS</option>";
            $("#cbm_especialidad").html(cadena);
         
        }
    })
}