<?php
include(dirname(__FILE__).'/../config/config.php');
global $db;


$db->update('pokestop',['quest_conditions' => null, 'quest_rewards' => null, 'quest_target' => null, 'quest_template' => null, 'quest_type' => null]);
echo 'updated pokestops';
