var tableinsumo;//var tableprocedimiento;  //global
function listar_insumo() {
    tableinsumo = $("#tabla_insumo").DataTable({  //id de la tabla
        "ordering": false,
        "bLengthChange": false,
        "searching": { "regex": false },
        "lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
        "pageLength": 10,
        "destroy": true,
        "async": false,
        "processing": true,
        "ajax": {
            "url": "../controlador/insumo/controlador_insumo_listar.php",
            type: 'POST'
        },
        "order": [[1, 'asc']],
        "columns": [
            { "defaultContent": "" },
            { "data": "insumo_nombre" },
            { "data": "insumo_stock" },
            { "data": "insumo_fregistro" },
            {
                "data": "insumo_estatus",
                render: function (data, type, row) {
                    if (data == 'ACTIVO') {
                        return "<span class='label label-success'>" + data + "</span>";
                    }
                    if (data == 'INACTIVO') {
                        return "<span class='label label-danger'>" + data + "</span>";
                    }
                    if (data == 'AGOTADO') {
                        return "<span class='label label-black' style='background:black'>" + data + "</span>";
                    }
                }
            },

            //zona de botones
            { "defaultContent": "<button style='font-size:13px;' type='button' class='editar btn btn-primary'><i class='fa fa-edit'></i></button>" }
        ],

        "language": idioma_espanol,
        select: true
    });
    document.getElementById("tabla_insumo_filter").style.display = "none"; //para ocultar el buscador chico del datatable
    $('input.global_filter').on('keyup click', function () {
        filterGlobal();
    });
    $('input.column_filter').on('keyup click', function () {
        filterColumn($(this).parents('tr').attr('data-column'));
    });
    //para la enumeraciond el datatable
    tableinsumo.on('draw.dt', function () {
        var PageInfo = $('#tabla_insumo').DataTable().page.info();
        tableinsumo.column(0, { page: 'current' }).nodes().each(function (cell, i) {//contador cero declaramos  clumn vacio osea cero
            cell.innerHTML = i + 1 + PageInfo.start;
        });
    });



}

//para el buscador del datatable
function filterGlobal() {
    $('#tabla_insumo').DataTable().search(
        $('#global_filter').val(),
    ).draw();
}

function Registrar_Insumo() {
    var insumo = $("#txt_insumo").val();
    var stock = $("#txt_stock").val();
    var estatus = $("#cbm_estatus").val();

    if (stock < 0) {
        Swal.fire("Mensaje de advertencia", "el stock no puede ser negativo", "warning");
    }
    if (insumo.length == 0 || stock.length == 0 || estatus.length == 0) {
        Swal.fire("Mensaje de advertencia", "llene los campos vacios", "warning");
    }

    $.ajax({
        "url": "../controlador/insumo/controlador_insumo_registro.php",
        type: 'POST',
        data: {
            in: insumo,
            st: stock,
            es: estatus
        }

    }).done(function (resp) {
        if (resp > 0) {
            if (resp == 1) {
                $("#modal_registro").modal('hide');
                listar_insumo();
                LimpiarCampos();
                Swal.fire("Mensaje de Confirmacion", "datos guardados", "success");
            } else {
                Swal.fire("Mensaje de advertencia", "el insumo ya se encuentra en la bd", "warning");
            }

        } else {
            LimpiarCampos();
            Swal.fire("Mensaje de Error", "No se pudo agregar", "error");
        }


    })
}
function LimpiarCampos() {
    $("#txt_insumo").val("");
    $("#txt_stock").val("");

}