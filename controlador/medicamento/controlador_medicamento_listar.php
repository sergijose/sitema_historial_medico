<?php
    require '../../modelo/modelo_medicamento.php';
    $MM = new Modelo_Medicamento();
    $consulta = $MM->listar_medicamento();
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