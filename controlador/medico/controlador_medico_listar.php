<?php
    require '../../modelo/modelo_medico.php';
    $MM = new Modelo_Medico();
    $consulta = $MM->listar_medico();
    if($consulta){
        echo json_encode($consulta);
        
    }else{
        //para error cuando el datatable esta vacio
        echo '{
		    "sEcho": 1,
		    "iTotalRecords": "0",
		    "iTotalDisplayRecords": "0",
		    "aaData": []
		}';
    }

?>