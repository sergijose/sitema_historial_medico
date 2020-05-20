<?php
    class Modelo_Procedimiento{
        private $conexion;
        function __construct(){
            require_once 'modelo_conexion.php';
            $this->conexion = new conexion();
            $this->conexion->conectar();
        }
		
       
        function listar_procedimiento(){
            $sql = "call SP_LISTAR_PROCEDIMIENTO()";
			$arreglo = array();
			if ($consulta = $this->conexion->conexion->query($sql)) {
				while ($consulta_VU = mysqli_fetch_assoc($consulta)) {
                    $arreglo["data"][]=$consulta_VU;
                //matris data en el otro corchete nombre de cada atributo
				}
				return $arreglo;
				$this->conexion->cerrar();
			}
        }

        function Registrar_Procedimiento($procedimiento,$estatus){
            $sql = "call SP_REGISTRAR_PROCEDIMIENTO('$procedimiento','$estatus')";
			if ($consulta = $this->conexion->conexion->query($sql)) {
				if ($row = mysqli_fetch_array($consulta)) {
                        return $id= trim($row[0]);//para treer un dato posicion 0
				}
				$this->conexion->cerrar();
			}

        }
		
	
		
		
		



    }




    
?>