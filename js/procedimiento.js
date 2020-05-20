//var tableprocedimiento;  //global
function listar_procedimiento() {
 var   tableprocedimiento = $("#tabla_procedimiento").DataTable({  //id de la tabla
        "ordering": false,
        "bLengthChange": false,
        "searching": { "regex": false },
        "lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
        "pageLength": 10,
        "destroy": true,
        "async": false,
        "processing": true,
        "ajax": {
            "url": "../controlador/procedimiento/controlador_procedimiento_listar.php",
            type:'POST'
        },
        "order":[[1,'asc']],
        "columns": [
            { "defaultContent":""},
            { "data": "procedimiento_nombre" },
            { "data": "procedimiento_fecregistro" },
            { "data": "procedimiento_estatus",
            render: function (data, type, row) {
                if (data =='ACTIVO') {
                    return "<span class='label label-success'>" + data + "</span>";
                } else {
                    return "<span class='label label-danger'>" + data + "</span>";
               
                }
            }
            },

            //zona de botones
            { "defaultContent": "<button style='font-size:13px;' type='button' class='editar btn btn-primary'><i class='fa fa-edit'></i></button>" }
        ],

        "language": idioma_espanol,
        select: true
    });
    document.getElementById("tabla_procedimiento_filter").style.display = "none"; //para ocultar el buscador chico del datatable
    $('input.global_filter').on('keyup click', function () {
        filterGlobal();
    });
    $('input.column_filter').on('keyup click', function () {
        filterColumn($(this).parents('tr').attr('data-column'));
    });
    //para la enumeraciond el datatable
    tableprocedimiento.on( 'draw.dt', function () {
        var PageInfo = $('#tabla_procedimiento').DataTable().page.info();
        tableprocedimiento.column(0, { page: 'current' }).nodes().each( function (cell, i) {//contador cero declaramos  clumn vacio osea cero
                cell.innerHTML = i + 1 + PageInfo.start;
            } );
        } );



}


function AbrirModalRegistro(){
    $("#modal_registro").modal({ backdrop: 'static', keyboard: false }) //para que no me ciere el modal
    $("#modal_registro").modal('show');


}
function Registro_Procedimiento(){
    var procedimiento=$("#txt_procedimiento").val();
    var estatus=$("#cbm_estatus").val();

    if(procedimiento.length==0){
        Swal.fire("Mensaje de Advertencia","el campo procedimiento debe tener datos","warning");

    }

    $.ajax({
        url:"../controlador/procedimiento/controlador_procedimiento_registro.php",
        type:"post",
        data:{
            p:procedimiento,
            e:estatus
        }


    }).done(function(resp){
       if(resp>0){
        if(resp==1){
            $("#modal_registro").modal('hide');//para cerrar
            listar_procedimiento();
            Swal.fire("Mensaje de Confirmacion","Datos Guardados Correctamente","success");
        }
          else{
            Swal.fire("Mensaje de Advertencia","procedimiento ya existe ","warning");
        }  
          }
       
    })

}