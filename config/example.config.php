<?php
// Do not touch this!
namespace Config;
require 'default.php';
require __DIR__ . '/../Medoo.php';
use Medoo\Medoo;
//-----------------------------------------------------
// PMSF(fork xxleevo) - CONFIG FILE
//
// DEFAULT MAP SETTINGS
//-----------------------------------------------------

/* Location Settings */
$startingLat = 52.084992;											// Starting latitude
$startingLng = 5.302366;											// Starting longitude
$startingZoom = 15;													//Starting Zoom - should be between $maxZoomIn & $maxZoomOut

/* Title and language */
$title = "POGOmap";                                                 // Title to display in title bar
$locale = "de";                                                     // Display language
$raidmapLogo = '';                                                  // Upload logo to custom folder, leave '' for empty ( $raidmapLogo = 'custom/logo.png'; )

/* MOTD */
$noMotd = true;														// Message of the Day - supporting html
$motdTitle = "Message of the Day";
$motdContent = "This is an example MOTD<br>Do whatever you like with it.";

/* Custom URL's */
$mapUrl = "";														// For the link from the nest sharing tool - not needed if nests are off
$paypalUrl = "";                                                    // PayPal donation URL, leave "" for empty
$discordUrl = "https://discord.gg/INVITE_LINK";                     // Discord URL, leave "" for empty
$worldopoleUrl = "";                                                // Link to Worldopole, leave "" for empty
$infopageUrl = ""; 													// A page which is shown at the bottom of the menu 

//-----------------------------------------------------
// Login
//-----------------------------------------------------

/* Discord Login */
$noDiscordLogin = true;                                             // true/false - This will enable login through discord.
                                                                    // 1. Create a discord bot here -> https://discordapp.com/developers/applications/me
                                                                    // 2. Install composer with "apt-get install composer".
                                                                    // 3. Navigate to your website's root folder and type "composer install" to install the dependencies.
                                                                    // 4. Add your callback-page as a REDIRECT URI to your discord bot. Should be the same as $discordBotRedirectUri.
                                                                    // 5. Enter Client ID, Client Secret and Redirect URI below.
$discordBotClientId = 0;
$discordBotClientSecret = "";
$discordBotRedirectUri = "https://example.com/discord-callback.php";
/* Blacklist Settings for Discord Login */
$userBlacklist = [''];												// Array of user ID's that are always blocked from accessing the map
$userWhitelist = [''];												// Array of user ID's that's allowed to bypass the server blacklist
$serverWhitelist = [''];											// Array of server ID's. Your users will need to be in at least one of them
$serverBlacklist = [''];											// Array of server ID's. A user that's a member of any of these and not in your user whitelist will be blocked
$logFailedLogin = '';												// File location of where to store a log file of blocked users

/* Other Login Systems (untested) */
$noNativeLogin = true;												// true/false - This will enable the built in login system.
$domainName = '';													// If this is empty, reset-password emails will use the domain name taken from the URL.
$adminUsers = array('admin@example.com', 'Superadmin#13337');		// You can add multiple admins by adding them to the array.
$logfile = '../members.log';										// Path to log file. Make sure this works as it will be your life saver if your db crashes.
$daysMembershipPerQuantity = 31;									// How many days membership one selly quantity will give.
$sellyPage = '';													// Link to selly purchase page for membership renewal.
$sellyWebhookSecret = '';											// Add a secret key at https://selly.gg/settings to make sure the payment webhook is sent from selly to prevent fake payments.
																	// Add the same key to the $sellyWebhookSecret variable.
//-----------------------------------------------------
// FRONTEND SETTINGS
//-----------------------------------------------------
/*---------General Frontend Settings---------*/
$copyrightSafe = true;												// If you want to use icons, set to false (you will need your own icons)
$iconRepository = 'https://raw.githubusercontent.com/whitewillem/PogoAssets/resized/icons_large/';												// URLs or folder paths are allowed - if noMultipleRepos=false, this is also the default icon pack
																	//You can also use a relative path here for your icons!
																	//example: $iconRepository = 'static/icons/';
																									
$noMultipleRepos = true;											// To enable Multiple icon packs:
																	// Each iconpack needs to be in a seperate folder
																	// for the menu icons, $iconRepository will be used always.
$iconRepos = [["Standard","$iconRepository"],						// Multiple Repos in here with the format ["Name","Link_To_Icons"] - Link can be a relative path for an iconfolder or a Link to a Repo.
			["Retro","static/icons/retro/"],						// Example for a Pack located on your server at static/icons/retro/, named "Retro" in the Frontend
			["Shuffle-ShinyEdition","https://raw.githubusercontent.com/geekygreek7/pkmn_shuffle_icons/master/optimized_for_PMSF_frontend/"],
			["Shuffle-Normal","https://raw.githubusercontent.com/nileplumb/PkmnShuffleMap/master/PMSF_icons_large/"],
			["Ingame","https://raw.githubusercontent.com/whitewillem/PogoAssets/resized/icons_large/"],
			["Ingame-Borderless","https://raw.githubusercontent.com/whitewillem/pogoassets/resized/no_border/"]
			]; // You May add different iconPacks here so mapusers can switch between them
$noMaplink = false; 												// Dont display the maplink option at gyms,pokemon,stops
$noExportImport = false;											// Enable/Disable the ability for users to Export/Import Settings
$noWhatsappLink = false;											// Enable/Disable the display of the Whatsapp share button to Raids
$noWhatsappLinkQuests = false;										// Enable/Disable the display of the Whatsapp share button to Quests

$noOverlayDesign = false;                                        	//Style for the Map - There is a various Set of predefined styles, you can set the default below
$overlayDesign = 'linear-gradient(to top, #686868 0%, #121212 100%)'; //Color design - sets the background-image (keep the linear-gradient-costruct here)


/*---------Pokemon Settings---------*/
$noPokemon = false;                                                 // Enables/Disables Pokemon & the whole Pokemon Menu
$enablePokemon = 'true';                                            // default value for users

$noBigKarp = true;													// Enables/Disables the option to filter big karps
$enableBigKarps = 'false';											// default value for users

$noTinyRat = true;													// Enables/Disables the option to filter tiny rats
$enableTinyRats = 'false';											// default value for users

$noHidePokemon = false;												//If False, the array below will be the hidden pokemon (users can changes this personally)
$hidePokemon = '[10, 13, 16, 19, 21, 29, 32, 41, 46, 48, 50, 52, 56, 74, 77, 96, 111, 133,
                  161, 163, 167, 177, 183, 191, 194, 168]';         // [] for empty

$hidePokemonCoords = true;											// Against Spoofer: Hide the coordinates, put "Navigation" instead of coords
$noRarityDisplay = true;											// Enables/Disables the rarity Display (not stable)
$noPokemonNumbers = false;                                          // For the Filters, hide or show Pokemon numbers 

$noWeatherIcons = false;											// If set to false, this option let users allow to enable/disable weather icons for pokemon
$enableWeatherIcons = 'false';										// default value for users for weather-icons


/*---------IV & CP Settings---------*/
$noHighLevelData = false;											// This will activate/deactivate all iv/cp/move data for monsters
$noMinIV = false;													// This will enable/disable the option for a global minIV
$minIV = '0';														// "0" for empty or a number
$noIv100Glow = false;												// Puts a glow on the 100% and put their z-index to highest, also restyles the IV-label part
$Iv100GlowColor = 'rgba(255, 200, 44, 1)';							// Glow Color - supports rgba, hex, colorname

$noMinLevel = false;												// This will enable/disable the option for a global minLvl
$minLevel = '0';													// "0" for empty or a number

$noExcludeMinIV = false;											// This will activate/deactivate the possibility to keep specific pokemon on the map if global minIV is set for a user
$excludeMinIV = '[131, 143, 147, 148, 149, 248]';					// [] for empty

$noDittoDetection = false;											// Turn on/off detection of dittos: weather & level circumstances give information about if this should be a ditto, if so, it is treated as a ditto on the map
$possibleDittos = [13, 46, 48, 163, 165, 167, 187, 223, 273, 293, 300, 316, 322, 399]; // Possible Ditto Mon IDs

/*---------Gym Settings---------*/
$noGyms = false;                                                    // Enables/Disables Gyms (& the whole Gym Menu if raids are also disabled)
$enableGyms = 'false';                                              // default value for users

$noGymStyle = false;                                                // Enables/Disables the ability for users to switch gym styles
$gymStyle = 'ingame';                                               // default value for users - possible: beasts, classic, elements, idol, ingame, label, shield, tower

$noGymSidebar = false;                                              // Enables/Disables the ability for users to enable the Gym Sidebar
$gymSidebar = 'true';                                               // default value for users

$noExEligible = false;                                              // Enables/Disables the ability for users to filter for Ex-Gym-Only
$exEligible = 'false';                                              // default value for users

$noBattleStatus = false;											// Enable/Disable the ability for users to filter battle gyms
$battleStatus = 'false';											// default value for users

$noGymScannedText = false;											// Enables/Disables "Last seen" and "Last modified" at gyms
$noGymFirstseen = true;                                             // Enables/Disables the display for first seen in gym label
$noGymTeamInfos = false;											// Enables/Disables every information about gym team
$noOutdatedGyms = false;											// If active, set GymTeams to Harmony when older than 4h(only frontend-side, no db-changes)

$triggerGyms = '[]';                                                // Add Gyms that the OSM-Query doesn't take care of like '["gym_id", "gym_id"]'
$onlyTriggerGyms = false;                                           // Only show EX-Gyms that are defined in $triggerGyms
$noExGyms = false;                                                  // Do not display EX-Gyms on the map
$noParkInfo = false;                                                // Do not display Park info on the map

/*---------Raid Settings---------*/
$noRaids = false;                                                   // Enables/Disables Raids (& the whole raid Menu if gyms are also disabled)
$enableRaids = 'false';                                             // default value for users enable raids
$activeRaids = 'false';                                             // default value for users: only hatched eggs
$minRaidLevel = 1;													// default value for users: min raid lvl
$maxRaidLevel = 5;													// default value for users: max raid lvl
$noRaidTimer = false;												// Enables/Disables Raidtimers on the Map
$enableRaidTimer = 'false';											//default value for users: raidtimer
$noRaidMoves = false;												// Raid Moveset beeing displayed or not
$denyRaidLevelsBelow = 0;											// Deny raid levels beeing shown under this value (0-6)(5 = only show level 5 raids) - 0 to disable
																	// In addition you may want to adjust $minRaidLevel and $maxRaidLevel;
																	// To prevent displaying gyms with denied raids on it.													
/*---------Pokestop Settings---------*/
$noPokestops = false;                                               // Enables/Disables Pokestops & the whole Pokestop menu
$enablePokestops = 'false';                                         // default value for users

$noPokestopImages = false;											// Enables/Disables original pokestop images(swap with standard icons if disabled)
$noPokestopFirstseen = true;										// Enables/Disables the display for the first seen time in the stop label

$noLures = false;													// Enables/Disables Lures
$enableLured = 'false';                                             // default value for users: Show Lures only

$noRocketInvasions = false;											// Enables/Disables Rocket Invasions
$enableInvasions = 'false';											// default value for users: Show Invasions only

$noInvasionEncounterData = true;									//Enable/Disable grunttype encounter data stored in static/data/grunttype.json (beta feature, grunttypes, encounters and rewards may change over time!)

$noInvasionTimer = false;											// Enables/Disables the ability to enable/disable the Invasion Timer
$enableInvasionTimer = 'false';										// default value for users: Invasion Timer

$noQuests = false;													// Enables/Disables Quests
$enableQuests = 'false';                                            // default value for users: Show Quests only

$noQuestsItemsAmounts = false;										// Enables/Disables the switch between Reward number Icons and standard
$enableQuestsItemsAmounts = 'false';								// default value for users: Show Item Amount in Icon

$noQuestsItems = false;												// Enables/Disables Quest Items
$noItemNumbers = true;												// Enables/Disables numbers at the item filter
$hideQuestsItem = '[4, 5, 301, 401, 402, 403, 404, 501, 502, 503, 504, 602, 603, 604, 702, 704, 707, 801, 901, 902, 903, 1001, 1002, 1401, 1402, 1402, 1403, 1404, 1405]';    // Item ids "See protos https://github.com/Furtif/POGOProtos/blob/master/src/POGOProtos/Inventory/Item/ItemId.proto"
$excludeQuestsItem = [4, 5, 301, 401, 402, 403, 404, 501, 502, 503, 504, 602, 603, 604, 702, 704, 707, 801, 901, 902, 903, 1001, 1002, 1401, 1402, 1402, 1403, 1404, 1405];   // All excluded item wil not be shown in the filter.

$noQuestsPokemon = false;											// Enables/Disables Quest Pokemon
$generateExcludeQuestsPokemon = true;                               // Generate $excludeQuestsPokemon based on active quests in database
//Dont change this if $generateExcludeQuestsPokemon is true
$excludeQuestsPokemon = [];											// All excluded pokemon wil not be shown in the filter.
$hideQuestsPokemon = '[]';											// Pokemon ids will default be hidden in the menu every user is able to change this personally


/*---------Notification Settings---------*/
$noNotifyPokemon = false;											// Enables/Disables notifications by Pokemon ID
$notifyPokemon = '[201]';                                           // default value for users - "" = empty
$noNotifyRarity = true;												// Enables/Disables notifications by Pokemon rarity
$notifyRarity = '[]';												// default value for users; Possible: "Common", "Uncommon", "Rare", "Very Rare", "Ultra Rare"
$noNotifyIv = false;												// Enables/Disables notifications by Pokemon IV
$notifyIv = '""';                                                   // default value for users - "" = empty
$noNotifyLevel = false;												// Enables/Disables notifications by Pokemon LVL
$notifyLevel = '""';                                                // default value for users - "" = empty
$noNotifyRaid = false;												// Enables/Disables raid-notifications by raidLevel
$notifyRaid = 5;                                                    // default value for users - 0 to disable
$noNotifySound = false;												// Enables/Disables notification with sound
$notifySound = 'false';												// default value for users
$noCriesSound = false;												// Enables/Disables notification with pokemon cry sound
$criesSound = 'false';												// default value for users
$noNotifyBounce = false;											// Enables/Disables bouncing notifications
$notifyBounce = 'true';												// default value for users
$noNotifyNotification = false;										// Enables/Disables browser notifications (mostly for Desktop)
$notifyNotification = 'true';										// default value for users

/*---------S2 Cell Settings---------*/
$noS2Cells = true;													// Enables/Disables S2-Cell Menu
$enableS2Cells = 'false';											// default value for users
$enableLevel13Cells = 'false';										// default value for users
$enableLevel14Cells = 'false';										// default value for users
$enableLevel17Cells = 'false';										// default value for users

/*---------Location & Polygons---------*/
$noSpawnPoints = false;												// Enables/Disables Spawnpoints
$enableSpawnPoints = 'false';                                       // default value for users

$noRanges = false;													// Enables/Disables 70m Ranges at objects when zoomed in
$enableRanges = 'false';											// default value for users

$noSearchLocation = false;											// Enables/Disables the ability for users to search a Location in the menu

$noStartMe = false;													// Enables/Disables "start at my location" in menu
$enableStartMe = 'false';											// default value for users

$noStartLast = false;												// Enables/Disables "start at last location" in menu
$enableStartLast = 'false';											// default value for users

$noFollowMe = false;												// Enables/Disables "follow me" in menu
$enableFollowMe = 'false';											// default value for users
$noSpawnArea = false;												// Enables/Disables the ability for users to enable/disable the spawn area on "follow me"
$enableSpawnArea = 'false';											// default value for users

$noScanPolygon = true;												// Enables/Disables Scan Area/Polygon
$enableScanPolygon = 'false';										// default value for users
$geoJSONfile = 'geofences/scannerarea.json';							// path to geoJSON file create your own on http://geojson.io/ adjust filename

$noScanPolygonQuest = true;											// Enables/Disables Quest Area/Polygon
$enableScanPolygonQuest = 'false';									// default value for users
$geoJSONfileQuest = 'geofences/questarea.json';						// path to geoJSON file create your own on http://geojson.io/ adjust filename

$noScanPolygonPvp = true;											// Enables/Disables PvP Locations
$enableScanPolygonPvp = 'false';									// default value for users
$pvptext1 = '';								// font size 4 good for header - name your marker "1" in the geojson, this text will be the popup text. if no text is given, it will be "no further information"
$pvptext2 = '';								// font size 4 good for header - name your marker "2" in the geojson, this text will be the popup text. if no text is given, it will be "no further information"
$pvptext3 = '';								// font size 4 good for header - name your marker "3" in the geojson, this text will be the popup text. if no text is given, it will be "no further information"
$pvptext4 = '';								// font size 4 good for header - name your marker "4" in the geojson, this text will be the popup text. if no text is given, it will be "no further information"

/*---------Style Settings---------*/
$noCostumeIcons = true;												// enable/disable costume forms (label only) (Note: only use icon-sets with costumes if using this)

$noMapStyle = false;												// Enables/Disables Mapstyle changing
$mapStyle = 'openstreetmap';                                        // openstreetmap, darkmatter, styleblackandwhite, styletopo, stylesatellite, stylewikipedia

$noDirectionProvider = false;										// Enables/Disables MapProvider changing
$directionProvider = 'google';                                      // google, waze, apple, bing, google_pin

$noIconSize = false;												// Enables/Disables Iconsize changing
$iconSize = 0;                                                      // -8, 0, 10, 20

$noIconNotifySizeModifier = false;									// Enables/Disables Notified Pokemon Iconsize changing
$iconNotifySizeModifier = 15;										// 0, 15, 30, 45

$noLocationStyle = false;											// Enables/Disables LocationStyle changing
$locationStyle = 'none';                                            // none, google, red, red_animated, blue, blue_animated, yellow, yellow_animated, pokesition, pokeball


/*---------Scantimes Display in Menu---------*/
$noQuestscanInfotext = true;										//Enables/Disables the questscan-info menupoint in the menu
$questscanInfotext = "some text for quest information supporting<br>html";


//-----------------------------------------------------
// Manual Submissions
// In order to make Manual Raids and Quests work you need to have the $geoJSONfile set to a valid geoJSON.json file
//-----------------------------------------------------
$noSubmit = true;
$hideIfManual = false;
$noManualRaids = true;												// Enable/Disable ManualRaids permanently ( Comment this line if you want to use the block below )
$noDiscordSubmitLogChannel = true;									// Send webhooks to discord channel upon submission
$submitMapUrl = '';
$discordSubmitLogChannelUrl = 'https://discordapp.com/api/webhooks/<yourCHANNELhere>';  // Sends gym/pokestop submit & pokestop rename directly to discord
$noManualPokemon = true;
$pokemonTimer = 900;												// Time in seconds before a submitted Pokémon despawns.
$noManualGyms = true;
$noManualPokestops = true;
$noRenamePokestops = true;
$noConvertPokestops = true;
$noManualQuests = true;

//-----------------------------------------------------
// Ingress portals
//-----------------------------------------------------
$enablePortals = 'false';
$enableNewPortals = 0;												// O: all, 1: new portals only
$noPortals = true;
$noDeletePortal = true;
$noConvertPortal = true;

$markPortalsAsNew = 86400;											// Time in seconds to mark new imported portals as new ( 86400 for 1 day )
$noPoi = true;														// Allow users to view POI markers 
$noAddPoi = true;													// Allow to add POI markers (locations eligible for submitting Pokestops/Ingress portals)
$enablePoi = 'false';
$noDeletePoi = true;
$noMarkPoi = true;

$pokemonReportTime = false;
$pokemonToExclude = [];

$noDeleteGyms = false;
$noToggleExGyms = false;
$noDeletePokestops = false;

$raidBosses = [1, 4, 7, 129, 138, 140, 147, 82, 108, 125, 126, 185, 303, 65, 68, 95, 106, 107, 123, 135, 142, 76, 112, 131, 143, 248, 359, 144, 145, 146, 377];

$sendWebhook = false;												// Sends Raids & Pokémon. Needs a 3th party program like pokealarm.
$webhookUrl = null;													//['url-1','url-2']

//---------------------------------------------------
// Quest Webhooks
//---------------------------------------------------
$sendQuestWebhook = false;											// Experimental use only
$questWebhookUrl = null;											// Experimental use only
$webhookSystem = [''];												// Supported either 'pokealarm' or 'poracle'

$manualFiveStar = [
    'webhook' => false,												// If set to false no webhooks will be send on raid_cron.php
    'pokemon_id' => 377,
    'cp' => 41777,
    'move_1' => null,
    'move_2' => null,
    'form' => 0
];

//-----------------------------------------------
// Search
//-----------------------------------------------------
$noSearch = false;
$noSearchPokestops = true;											//Wont work if $noSearch = true
$noSearchGyms = true;												//Wont work if $noSearch = true
$noSearchManualQuests = false;										//Wont work if $noSearch = true
$noSearchNests = true;
$noSearchPortals = true;
$defaultUnit = "km"; 												// mi/km
$maxSearchResults = 10;												//Max number of search results
$maxSearchNameLength = 0;											// 0 = Unlimited. Shorten pokestop names in reward search results if longer than this value to prevent UI layout issues

//-----------------------------------------------
// Community
// Manualdb required for this feature!
//-----------------------------------------------------
$noCommunity = true;												// Enables/Disables Nests
$enableCommunities = 'false';										//default value for users
$communityDescription = 'Display a text in your Community Container';
$noAddNewCommunity = true;
$noDeleteCommunity = true;
$noEditCommunity = true;

/* Community share configs */
$communityShareHeader = "Communities in YOURCITY";					// Displays the first line (bold) of the shared text
$communityShareDescription = "(By ". $mapUrl .")";					// Displays the second line of the shared text
$communityShareFooter = "For more infos visit our Map %0A(Discord needed: ". $discordUrl .")"; // Disyplays the footer under the shared nests


//-----------------------------------------------
// Nests
// When using Madao's Nestscript, only use the first settings
//-----------------------------------------------------
/* Nests configuration */
$noNests = true;													// Enables/Disables Nests
$enableNests = 'false';                                             // default value for users
$nestJSONfile = 'geofences/nest.json';

/* Nest share configs */
$nestShareHeader = "Nests in YOURCITY";								// Displays the first line (bold) of the shared text
$nestShareDescription = "(By ". $mapUrl .")";						// Displays the second line of the shared text
$nestShareFooter = "For more infos visit our Map %0A(Discord needed: ". $discordUrl .")"; // Disyplays the footer under the shared nests

/* Additional settings (not needed if using Madao's nestscript) */
$excludeNestMons = [2,3,5,6,8,9,11,12,14,15,17,18,20,22,24,26,28,29,30,31,32,33,34,36,38,40,42,44,45,49,51,53,55,57,59,61,62,64,65,67,68,70,71,73,75,76,78,80,82,83,85,87,88,89,91,93,94,97,99,101,103,105,106,107,108,109,110,112,113,114,115,117,119,121,122,128,130,131,132,134,135,136,137,139,142,143,144,145,146,147,148,149,150,151,153,154,156,157,159,160,161,162,163,164,165,166,167,168,169,171,172,173,174,175,176,177,178,179,180,181,182,183,184,186,187,188,189,191,192,194,195,196,197,199,201,204,205,207,208,210,212,214,217,218,219,221,222,223,224,225,228,229,230,232,233,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,253,254,256,257,259,260,262,263,264,265,266,267,268,269,270,271,272,274,275,276,277,279,280,281,282,284,286,287,288,289,290,291,292,293,294,295,297,298,301,303,304,305,306,308,310,313,314,316,317,319,321,323,324,326,327,328,329,330,331,332,334,335,336,337,338,339,340,342,344,346,348,349,350,351,352,354,356,357,358,359,360,361,362,363,364,365,366,367,368,369,371,372,373,374,375,376,377,378,379,380,381,382,383,384,385,386];
$noManualNests = true;
$noDeleteNests = true;
$nestVerifyLevel = 1;												// 1 = Verified 2 = 1 + Unverified 3 = 1 + 2 + Revoked 4 = Get all nests
$deleteNestsOlderThan = 42;											// days after not updated nests are removed from database by nest cron
$noAddNewNests = true;
$migrationDay = strtotime('5 April 2018');							// Adjust day value after non consitent 14 day migration
$nestCoords = array();												//$nestCoords = array(array('lat1' => 42.8307723529682, 'lng1' => -88.7527692278689, 'lat2' => 42.1339901128552, 'lng2' => -88.0688703020877),array(    'lat1' => 42.8529250952743,'lng1' => -88.1292951067752,'lat2' => 41.7929306950085,'lng2' => -87.5662457903689));

//-----------------------------------------------------
// Areas
//-----------------------------------------------------

$noAreas = true;
$areas = [];                                                        // [[latitude,longitude,zoom,"name"],[latitude,longitude,zoom,"name"]]

//-----------------------------------------------------
// MISC
// Only change settings from this block if you know what they exactly do. Use some of them carefully!
//-----------------------------------------------------

/* Anti scrape Settings */
$enableCsrf = true;                                                 // Don't disable this unless you know why you need to :)
$sessionLifetime = 43200;                                           // Session lifetime, in seconds
$blockIframe = true;                                                // Block your map being loaded in an iframe

/* Zoom and Cluster Settings */
$maxLatLng = 1;                                                     // Max latitude and longitude size (1 = ~110km, 0 to disable)
$maxZoomOut = 11;                                                   // Max zoom out level (11 ~= $maxLatLng = 1, 0 to disable, lower = the further you can zoom out)
$maxZoomIn = 18;                                                    // Max zoom in level 18
$disableClusteringAtZoom = 0;										// Disable clustering above this value. 0 to disable
$zoomToBoundsOnClick = 15;											// Zoomlevel on clusterClick
$maxClusterRadius = 30;												// The maximum radius that a cluster will cover from the central marker (in pixels).
$spiderfyOnMaxZoom = 'true';										// Spiderfy cluster markers on click

/* Google Settings & Analytics  */
$gmapsKey = "";														// ONLY USED FOR TILE LAYERS
$gAnalyticsId = "";													// "" for empty, "UA-XXXXX-Y" add your Google Analytics tracking ID

/* Piwik Analytics */
$piwikUrl = "";
$piwikSiteId = "";

/* Favicon */
$faviconPath = '';                                                  // Upload favicon.ico to custom folder, leave '' for empty ( $faviconPath = 'custom/favicon.ico'; )

/* StatsToggle */
$noStatsToggle = false;                                             // Enables or disables the stats button in the header.

/* OSM */
$osmTileServer = 'tile.openstreetmap.org';                          // osm tile server (no trailing slash)

/* Access-config Settings */
$accessLevelsInherit = false;										// Choose if the levels in the access-level config inherit access configurations from lower levels
																	// If true, the access level will inherit from the last updated configuration
																	//example: standard config: $noPokemon = false; -- accesslevel 0: $noPokemon = true; -- accesslevel 1: $noPokemon is unset: will inherit from accesslevel 0 instead of standard config.
/* Debugging */
$enableDebug = false;

//-----------------------------------------------------
// DATABASE CONFIG
//-----------------------------------------------------
$db = new Medoo([// required
    'database_type' => 'mysql',                                    
    'database_name' => 'rdmdb',
    'server' => '127.0.0.1',
    'username' => 'database_user',
    'password' => 'database_password',
    'charset' => 'utf8',

    // [optional]
    //'port' => 5432,                                               // Comment out if not needed, just add // in front!
    //'socket' => /path/to/socket/,
]);

//$manualdb = new Medoo([// required
//    'database_type' => 'mysql',
//    'database_name' => 'rdmdb',
//    'server' => '127.0.0.1',
//    'username' => 'database_user',
//    'password' => 'database_password',
//    'charset' => 'utf8mb4',

    // [optional]
    //'port' => 5432,                                               // Comment out if not needed, just add // in front!
    //'socket' => /path/to/socket/,
//]);

if(file_exists('config/access-config.php'))
    include 'config/access-config.php';
