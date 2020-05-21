var tableprocedimiento;//var tableprocedimiento;  //global
function listar_procedimiento() {
        tableprocedimiento = $("#tabla_procedimiento").DataTable({  //id de la tabla
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



$('#tabla_procedimiento').on('click', '.editar', function () {  //al boton recuerda le nombramos editar por eso el .
    var data = tableprocedimiento.row($(this).parents('tr')).data(); //detecta a que fila hago click y me captura los datos en la variable data
    if (tableprocedimiento.row(this).child.isShown()) { //cuando esta en tamaño responsivo
        var data = tableprocedimiento.row(this).data();
    }
    $("#modal_editar").modal({ backdrop: 'static', keyboard: false }) //para que no me ciere el modal
    $("#modal_editar").modal('show');
    $("#txt_idprocedimiento").val(data.procedimiento_id);
    $("#txt_procedimiento_actual_editar").val(data.procedimiento_nombre);
    $("#txt_procedimiento_nuevo_editar").val(data.procedimiento_nombre);
    $("#cbm_estatus_editar").val(data.procedimiento_estatus).trigger("change");//si trabajo con el select2
})



function Modificar_Procedimiento(){
//vamos a llevar el actual y el nuevo,para en el sp hacer condicional
//si el sp es igual a nuevo entonces esolo que actualize el status y si es diferente que busque en la bd si existe o no vorar un mensaje si repite existe sino registre
var id=  $("#txt_idprocedimiento").val();
 var procedimientoactual=$("#txt_procedimiento_actual_editar").val();
 var procedimientonuevo=$("#txt_procedimiento_nuevo_editar").val();
var estatus = $("#cbm_estatus_editar").val();

if(id.length==0){
Swal.fire("mensaje de advertencia","el id del campo esta vacio","warming");
}
if(procedimientonuevo.length==0){
    Swal.fire("mensaje de advertencia","debe ingresar un procedimiento","warming");

}

$.ajax({
    url:'../controlador/procedimiento/controlador_procedimiento_modificar.php',
        type:'POST',
        data:{
            id:id,
            procedimientoactual:procedimientoactual,
            procedimientonuevo:procedimientonuevo,
            estatus:estatus
        }

}).done(function(resp){
    if(resp>0){
      
        $("#modal_editar").modal('hide');

        if(resp==1){
            listar_procedimiento();
            Swal.fire("Mensaje de Confirmacion","datos actualizados","success");
        }else{
            Swal.fire("Mensaje de advertencia","el procedimiento ya se encuenra en la bd","warning");
        }


    }else{
        Swal.fire("Mensaje de error","lo sentimos nos e pudo completar la actualidazcion","error");
    }

    
})


}

