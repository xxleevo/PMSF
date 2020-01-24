<?php
include( 'config/config.php' );
global $noSubmit;

if ( $noSubmit === true) {
    http_response_code( 401 );
    die();
}

$useragent = isset($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : '';
if (preg_match("/curl|libcurl/", $useragent)) {
    http_response_code(400);
    die();
}

$action 		= ! empty( $_POST['action'] ) ? $_POST['action'] : '';
$lat    		= ! empty( $_POST['lat'] ) ? $_POST['lat'] : '';
$lon    		= ! empty( $_POST['lon'] ) ? $_POST['lon'] : '';
$pokemonId  		= ! empty( $_POST['pokemonId'] ) ? $_POST['pokemonId'] : 0;
$gymId      		= ! empty( $_POST['gymId'] ) ? $_POST['gymId'] : '';
$selectedBadgeLevel = ! empty( $_POST['selectedBadgeLevel'] ) ? $_POST['selectedBadgeLevel'] : '';
$eggTime    		= ! empty( $_POST['eggTime'] ) ? $_POST['eggTime'] : 0;
$monTime    		= ! empty( $_POST['monTime'] ) ? $_POST['monTime'] : 0;
$loggedUser 		= ! empty( $_SESSION['user']->user ) ? $_SESSION['user']->user : 'NOLOGIN';
$gymName    		= ! empty( $_POST['gymName'] ) ? $_POST['gymName'] : '';
$pokestopId 		= ! empty( $_POST['pokestopId'] ) ? $_POST['pokestopId'] : '';
$pokestopName 		= ! empty( $_POST['pokestopName'] ) ? $_POST['pokestopName'] : '';
$questType    		= ! empty( $_POST['questType'] ) ? $_POST['questType'] : '';
$questTarget   		= ! empty( $_POST['questTarget'] ) ? $_POST['questTarget'] : '';
$conditionType 		= ! empty( $_POST['conditionType'] ) ? $_POST['conditionType'] : '';
$catchPokemon		= ! empty( $_POST['catchPokemon'] ) ? $_POST['catchPokemon'] : '';
$catchPokemonCategory	= ! empty( $_POST['catchPokemonCategory'] ) ? $_POST['catchPokemonCategory'] : '';
$raidLevel   		= ! empty( $_POST['raidLevel'] ) ? $_POST['raidLevel'] : '';
$throwType   		= ! empty( $_POST['throwType'] ) ? $_POST['throwType'] : '';
$curveThrow   		= ! empty( $_POST['curveThrow'] ) ? $_POST['curveThrow'] : '';
$rewardType   		= ! empty( $_POST['rewardType'] ) ? $_POST['rewardType'] : '';
$encounter   		= ! empty( $_POST['encounter'] ) ? $_POST['encounter'] : '';
$item   		= ! empty( $_POST['item'] ) ? $_POST['item'] : '';
$itemAmount   		= ! empty( $_POST['itemamount'] ) ? $_POST['itemamount'] : '1';
$dust			= ! empty( $_POST['dust'] ) ? $_POST['dust'] : '';
$nestId     		= ! empty( $_POST['nestId'] ) ? $_POST['nestId'] : '';
$portalId   		= ! empty( $_POST['portalId'] ) ? $_POST['portalId'] : '';
$communityId   		= ! empty( $_POST['communityId'] ) ? $_POST['communityId'] : '';
$communityName 		= ! empty( $_POST['communityName'] ) ? $_POST['communityName'] : '';
$communityDescription 	= ! empty( $_POST['communityDescription'] ) ? $_POST['communityDescription'] : '';
$communityInvite 	= ! empty( $_POST['communityInvite'] ) ? $_POST['communityInvite'] : '';
$poiName		= ! empty( $_POST['poiName'] ) ? $_POST['poiName'] : '';
$poiDescription		= ! empty( $_POST['poiDescription'] ) ? $_POST['poiDescription'] : '';
$poiId			= ! empty( $_POST['poiId'] ) ? $_POST['poiId'] : '';

// set content type
header( 'Content-Type: application/json' );
$now = new DateTime();
$now->sub( new DateInterval( 'PT20S' ) );
$d           = array();
$d['status'] = "ok";
$d["timestamp"] = $now->getTimestamp();

//create Submit
$submit = new \Submit\RDM();


if ( $action === "raid" ) {
    $submit->submit_raid($pokemonId, $gymId, $eggTime, $monTime, $loggedUser);
}
if ( $action === "pokemon" ) {
    $submit->submit_pokemon($lat, $lon, $pokemonId);
}
if ( $action === "gym" ) {
    $submit->submit_gym($lat, $lon, $gymName, $loggedUser);
}
if ( $action === "toggle-ex-gym" ) {
    $submit->toggle_ex($gymId, $loggedUser);
}
if ( $action === "delete-gym" ) {
    $submit->delete_gym($gymId, $loggedUser);
}
if ( $action === "pokestop" ) {
    $submit->submit_pokestop($lat, $lon, $pokestopName, $loggedUser);
}
if ( $action === "renamepokestop" ) {
    $submit->modify_pokestop($pokestopId, $pokestopName, $loggedUser);
}
if ( $action === "changeBadge" && (!$noDiscordLogin) && !empty($_SESSION['user']->id)) {
	//Cause mysql cant default jsons to '[]' -_-
	$tmp_getter = $manualdb->query("
		SELECT gyms_bronze as bronze,gyms_silver as silver, gyms_gold as gold FROM users
		WHERE id = :id", [":id" => $_SESSION['user']->id])->fetch();
	if(is_null($tmp_getter["gold"])){
	$tmp_setter = $manualdb->query("
		UPDATE users 
		SET gyms_gold = '[]'
		WHERE id = :id", [":id" => $_SESSION['user']->id])->fetch();
	}
	if(is_null($tmp_getter["silver"])){
	$tmp_setter = $manualdb->query("
		UPDATE users 
		SET gyms_silver = '[]'
		WHERE id = :id", [":id" => $_SESSION['user']->id])->fetch();
	}
	if(is_null($tmp_getter["bronze"])){
	$tmp_setter = $manualdb->query("
		UPDATE users 
		SET gyms_bronze = '[]'
		WHERE id = :id", [":id" => $_SESSION['user']->id])->fetch();
	}
	// Remove the requested Gym from each bronze,silver,gold column if it exists there(and isnt empty/default)
	if(!is_null($tmp_getter["gold"]) && $tmp_getter["gold"] !== "[]"){
		//Gold
		$result_gold = $manualdb->query("
			UPDATE users 
			SET gyms_gold = JSON_REMOVE(gyms_gold,REPLACE(JSON_UNQUOTE(JSON_SEARCH(gyms_gold, 'one', '$gymId')), '.id', ''))
			WHERE JSON_SEARCH(gyms_gold, 'one', '$gymId') IS NOT NULL AND
			id = :id", [":id" => $_SESSION['user']->id])->fetch();
	}
	if(!is_null($tmp_getter["silver"]) && $tmp_getter["silver"] !== "[]"){
		//Silver
		$result_silver = $manualdb->query("
			UPDATE users 
			SET gyms_silver = JSON_REMOVE(gyms_silver,REPLACE(JSON_UNQUOTE(JSON_SEARCH(gyms_silver, 'one', '$gymId')), '.id', ''))
			WHERE JSON_SEARCH(gyms_silver, 'one', '$gymId') IS NOT NULL AND
			id = :id", [":id" => $_SESSION['user']->id])->fetch();
	}
	if(!is_null($tmp_getter["bronze"]) && $tmp_getter["bronze"] !== "[]"){
		//Bronze
		$result_bronze = $manualdb->query("
			UPDATE users 
			SET gyms_bronze = JSON_REMOVE(gyms_bronze,REPLACE(JSON_UNQUOTE(JSON_SEARCH(gyms_bronze, 'one', '$gymId')), '.id', ''))
			WHERE JSON_SEARCH(gyms_bronze, 'one', '$gymId') IS NOT NULL AND
			id = :id", [":id" => $_SESSION['user']->id])->fetch();
	}
	switch($selectedBadgeLevel){ // Check the selected level and set it properly.
		case 'bronze':
			$change_bronze = $manualdb->query("
				UPDATE users 
				SET gyms_bronze=JSON_ARRAY_APPEND(gyms_bronze, '$', JSON_OBJECT('id','$gymId'))
				WHERE id = :id", [":id" => $_SESSION['user']->id])->fetch();
			break;
		case 'silver':
			$change_silver = $manualdb->query("
				UPDATE users 
				SET gyms_silver=JSON_ARRAY_APPEND(gyms_silver, '$', JSON_OBJECT('id','$gymId'))
				WHERE id = :id", [":id" => $_SESSION['user']->id])->fetch();
			break;
		case 'gold':
			$change_gold = $manualdb->query("
				UPDATE users 
				SET gyms_gold=JSON_ARRAY_APPEND(gyms_gold, '$', JSON_OBJECT('id','$gymId'))
				WHERE id = :id", [":id" => $_SESSION['user']->id])->fetch();
			break;
	}
}

if ( $action === "delete-pokestop" ) {
    $submit->delete_pokestop($pokestopId, $loggedUser);
}
if ( $action === "convertpokestop" ) {
    $submit->convert_pokestop($pokestopId, $loggedUser);
}
if ( $action === "quest" ) {
    $submit->submit_quest($pokestopId, $questType, $questTarget, $conditionType, $catchPokemonCategory, $catchPokemon, $raidLevel, $throwType, $curveThrow, $rewardType, $encounter, $item, $itemAmount, $dust, $loggedUser);
}
if ( $action === "convertportalpokestop" ) {
    $submit->convert_portal_pokestop($portalId, $loggedUser);
}
if ( $action === "convertportalgym" ) {
    $submit->convert_portal_gym($portalId, $loggedUser);
}
if ( $action === "markportal" ) {
    $submit->mark_portal($portalId, $loggedUser);
}
if ( $action === "delete-portal" ) {
    $submit->delete_portal($portalId, $loggedUser);
}
if ( $action === "nest" ) {
    $submit->modify_nest($nestId, $pokemonId, $loggedUser);
}
if ( $action === "new-nest" ) {
    $submit->submit_nest($lat, $lon, $pokemonId, $loggedUser);
}
if ( $action === "delete-nest" ) {
    $submit->delete_nest($nestId);
}
if ( $action === "community-add" ) {
    $submit->submit_community($lat, $lon, $communityName, $communityDescription, $communityInvite, $loggedUser);
}
if ( $action === "editcommunity" ) {
    $submit->modify_community($communityId, $communityName, $communityDescription, $communityInvite, $loggedUser);
}
if ( $action === "delete-community" ) {
    $submit->delete_community($communityId, $loggedUser);
}
if ( $action === "poi-add" ) {
    $submit->submit_poi($lat, $lon, $poiName, $poiDescription, $loggedUser);
}
if ( $action === "delete-poi" ) {
    $submit->delete_poi($poiId, $loggedUser);
}
if ( $action === "markpoisubmitted" ) {
    $submit->mark_poi_submitted($poiId, $loggedUser);
}
if ( $action === "markpoideclined" ) {
    $submit->mark_poi_declined($poiId, $loggedUser);
}
$jaysson = json_encode($d);
echo $jaysson;

