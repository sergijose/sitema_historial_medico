<?php
// Ver el ejemplo de password_hash() para ver de dónde viene este hash.
$hash = '$2y$10$8awmXRCD8/wt3ouhDDM0I.aRm9K0B5wwAtWHj1FsuZg...';

if (password_verify('HPANIAGUA2020', $hash)) {
    echo '¡La contraseña es válida!';
} else {
    echo 'La contraseña no es válida.';
}
?>