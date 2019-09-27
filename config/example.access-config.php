<?php

//Access-config file
//Make sure that you have a second, manualdb (besides your scanning db) and applied the sql's from sql/manualdb/ to that manual db 
//(first file for the table creations and then apply the update sqls afterwards=

/* User levels */
// The part below requires the bot Chuckleslove wrote https://github.com/jepke/PMSF-Discord-AuthBot
// This bot is included when you pull PMSF so no need to pull it separately
// IDs must match the bots config
//
//#########THIS PART IS NOT PMSF CONFIG ###############################
//"guilds": {
//    "guildID": {		// Change GuildID into the discord server ID
//        "roleID":1,		// Change roleID into the role ID of the desired role
//        "roleID2":2		// Change roleID into the role ID of the desired role
//    },
//    "guildID2": {		// If only one server is used remove this.
//        "roleID": 3
//    }
//}
//#####################################################################

$userLevel = 0;
$donorLevel = 1;
$helperLevel = 2;
$adminLevel = 3;
$ownerLevel = 4;

// if you are brave enough and now what you are doing you can add as many as levels you want
// If variable is the same as in config.php it may be removed from that specific level

// If $accessLevelsInherit = true then only enter your configs that are not set by the levels above
// If $accessLevelsInherit = false then you need to specify then the configuration will only inherit from the standard config.
// (Default is $accessLevelsInherit = false )

if ($noNativeLogin === true && $noDiscordLogin === true ||  (($noNativeLogin === false || $noDiscordLogin === false) && !empty($_SESSION['user']->expire_timestamp) && $_SESSION['user']->expire_timestamp > time()))  {
    $userAccessLevel = $manualdb->get( "users", [ 'access_level' ], [ 'expire_timestamp' => $_SESSION['user']->expire_timestamp ] );
	if (($userAccessLevel['access_level'] == $userLevel && !$accessLevelsInherit)
		|| ($userAccessLevel['access_level'] >= $userLevel && $accessLevelsInherit)) {

		
		//##################################################
		//# USER LEVEL(Login without any specific roles) ###
		//##################################################
		//(If $$accessLevelsInherit=true then only enter your configs that are not set by the levels above)
		
		//Motd
		$motdTitle = "User Access Level";
		$motdContent = "Dein Access Level ist: User";
		
		//Other
		//$someConfigHere = true;
		//$someOtherConfigHere = false;
		//##################################################
		}
		if (($userAccessLevel['access_level'] == $donorLevel && !$accessLevelsInherit)
		|| ($userAccessLevel['access_level'] >= $donorLevel && $accessLevelsInherit)) {
		//##################################################
		//##########    SUPPORTER LEVEL      ###############
		//##################################################
		//(If $$accessLevelsInherit=true then only enter your configs that are not set by the levels above)
		
		//Motd
		$noMotd = false;
		$motdTitle = "Donor Access Level";
		$motdContent = "Dein Access Level ist: Donor";
		
		//Other
		//$someConfigHere = true;
		//$someOtherConfigHere = false;
		//##################################################


    }
	if (($userAccessLevel['access_level'] == $helperLevel && !$accessLevelsInherit)
		|| ($userAccessLevel['access_level'] >= $helperLevel && $accessLevelsInherit)) {
		//##################################################
		//#########       HELPER LEVEL        ##############
		//##################################################
		
		//Communities
		$noSubmit = false;
		$noAddNewCommunity = false;
		$noDeleteCommunity = false;
		$noEditCommunity = false;
		
		//##################################################
    }
	if (($userAccessLevel['access_level'] == $adminLevel && !$accessLevelsInherit)
		|| ($userAccessLevel['access_level'] >= $adminLevel && $accessLevelsInherit)) {
		//##################################################
		//#########        ADMIN LEVEL        ##############
		//##################################################
		//(If $$accessLevelsInherit=true then only enter your configs that are not set by the levels above)
		
		//$someConfigHere = true;
		//$someOtherConfigHere = false;
		//##################################################
    }
	if (($userAccessLevel['access_level'] == $ownerLevel && !$accessLevelsInherit)
		|| ($userAccessLevel['access_level'] >= $ownerLevel && $accessLevelsInherit)) {
		//##################################################
		//####        OWNER LEVEL        ###################
		//##################################################
		//(If $$accessLevelsInherit=true then only enter your configs that are not set by the levels above)
		
		//$someConfigHere = true;
		//$someOtherConfigHere = false;
		//##################################################
    }
}
