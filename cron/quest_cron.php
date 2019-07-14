<?php
include(dirname(__FILE__).'/../config/config.php');
global $db, $noManualQuests;

if($noManualQuests === true){
    http_response_code(401);
    die();
}

$db->update('pokestops',['quest_id' => null, 'reward_id' => null]);
echo 'updated pokestops';
