<?php
    class Modelo_Insumo{
        private $conexion;
        function __construct(){
            require_once 'modelo_conexion.php';
            $this->conexion = new conexion();
            $this->conexion->conectar();
        }
		
       
        function listar_insumo(){
            $sql = "call SP_LISTAR_INSUMO()";
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

        function Registrar_Insumo($insumo,$stock,$estatus){
            $sql = "call SP_REGISTRAR_INSUMO('$insumo','$stock','$estatus')";
			if ($consulta = $this->conexion->conexion->query($sql)) {
				if ($row = mysqli_fetch_array($consulta)) {
                        return $id= trim($row[0]);//para treer un dato posicion 0
				}
				$this->conexion->cerrar();
			}

        }
		
        
        function Modificar_Procedimiento($id,$procedimientoactual,$procedimientonuevo,$estatus){
            $sql = "call SP_MODIFICAR_PROCEDIMIENTO('$id','$procedimientoactual','$procedimientonuevo','$estatus')";
			if ($consulta = $this->conexion->conexion->query($sql)) {
				if ($row = mysqli_fetch_array($consulta)) {
                        return $id= trim($row[0]);//para treer un dato posicion 0
				}
				$this->conexion->cerrar();
			}

        }
		
		



    }