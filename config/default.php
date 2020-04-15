<?php

//======================================================================
// DO NOT EDIT THIS FILE!
//======================================================================

//======================================================================
// PMSF - DEFAULT CONFIG FILE
// https://github.com/whitewillem/PMSF
//======================================================================
session_start();
require_once(__DIR__ . '/../utils.php');

$libs[] = "Scanner.php";
$libs[] = "RDM.php";
$libs[] = "search/Search.php";
$libs[] = "search/Search.rdm.php";
$libs[] = "submit/Submit.php";
$libs[] = "submit/Submit.rdm.php";

// Include libraries
foreach ($libs as $file) {
    include(__DIR__ . '/../lib/' . $file);
}
setSessionCsrfToken();

//-----------------------------------------------------
// MAP SETTINGS
//-----------------------------------------------------

/* Access-config Settings */
$accessLevelsInherit = false;

/* Location Settings */

$startingLat = 52.084992;                                          // Starting latitude
$startingLng = 5.302366;                                        // Starting longitude
$startingZoom = 15;												//Starting Zoom

/* Zoom and Cluster Settings */

$maxLatLng = 1;                                                     // Max latitude and longitude size (1 = ~110km, 0 to disable)
$maxZoomOut = 0;                                                    // Max zoom out level (11 ~= $maxLatLng = 1, 0 to disable, lower = the further you can zoom out)
$maxZoomIn = 18;                                                    // Max zoom in level 18 
$disableClusteringAtZoom = 0;					    // Disable clustering above this value. 0 to disable
$zoomToBoundsOnClick = 15;					    // Zoomlevel on clusterClick
$maxClusterRadius = 30;						    // The maximum radius that a cluster will cover from the central marker (in pixels).
$spiderfyOnMaxZoom = 'true';					    // Spiderfy cluster markers on click

/* Anti scrape Settings */
$enableCsrf = true;                                                 // Don't disable this unless you know why you need to :)
$sessionLifetime = 43200;                                           // Session lifetime, in seconds
$blockIframe = true;                                                // Block your map being loaded in an iframe

/* Map Title + Language */

$title = "PMSF Alt";                                                // Title to display in title bar
$locale = "en";                                                     // Display language

/* Google Maps ONLY USED FOR TILE LAYERS */

$gmapsKey = "";

/* Google Analytics */

$gAnalyticsId = "";                                                 // "" for empty, "UA-XXXXX-Y" add your Google Analytics tracking ID

/* Piwik Analytics */

$piwikUrl = "";
$piwikSiteId = "";

/* Map Url */

$mapUrl = "";   //For the link from the nest sharing tool - not needed if nests are off

/* PayPal */

$paypalUrl = "";                                                    // PayPal donation URL, leave "" for empty

/* Discord/Telegram */

$discordUrl = "";                                                   // Discord URL, leave "" for empty
$telegramUrl = "";												// Telegram URL, leave "" for empty

/* Worldopole */

$worldopoleUrl = "";                                                // Link to Worldopole/RDM-o-Pole, leave "" for empty
$noLinkFullStats = false;                                              // Enable a link to worldopole in the stats sidebar
$worldopoleButtonTitle = "Statistiken";                             // Display text for the button-link to worlopole in the Menu

/* StatsToggle */
$noStatsToggle = false;                                             // Enables or disables the stats button in the header.

/* MOTD */
$noMotd = true;
$motdTitle = "";
$motdContent = "";

/* Share links */
$noWhatsappLink = true;
$noWhatsappLinkQuests = false;

//-----------------------------------------------------
// Login  - You need to create the two tables referenced in sql.sql
//-----------------------------------------------------

$noNativeLogin = true;                                              // true/false - This will enable the built in login system.
$domainName = '';                                                   // If this is empty, reset-password emails will use the domain name taken from the URL.
$forcedDiscordLogin = false;
$noDiscordLogin = true;                                             // true/false - This will enable login through discord.
                                                                    // 1. Create a discord bot here -> https://discordapp.com/developers/applications/me
                                                                    // 2. Install composer with "apt-get install composer".
                                                                    // 3. Navigate to your website's root folder and type "composer install" to install the dependencies.
                                                                    // 4. Add your callback-page as a REDIRECT URI to your discord bot. Should be the same as $discordBotRedirectUri.
                                                                    // 5. Enter Client ID, Client Secret and Redirect URI below.
$discordBotClientId = 0;
$discordBotClientSecret = "";
$discordBotRedirectUri = "https://example.com/discord-callback.php";

$adminUsers = array('admin@example.com', 'Superadmin#13337');       // You can add multiple admins by adding them to the array.
$logfile = '../members.log';                                        // Path to log file. Make sure this works as it will be your life saver if your db crashes.
$daysMembershipPerQuantity = 31;                                    // How many days membership one selly quantity will give.
$sellyPage = '';                                                    // Link to selly purchase page for membership renewal.
$sellyWebhookSecret = '';                                           // Add a secret key at https://selly.gg/settings to make sure the payment webhook is sent from selly to prevent fake payments.
                                                                    // Add the same key to the $sellyWebhookSecret variable.
/* Blacklist Settings - Only available with Discord login */
$userBlacklist = [''];                                                                // Array of user ID's that are always blocked from accessing the map
$userWhitelist = [''];                                              // Array of user ID's that's allowed to bypass the server blacklist
$serverWhitelist = [''];                                            // Array of server ID's. Your users will need to be in at least one of them
$serverBlacklist = [''];                                            // Array of server ID's. A user that's a member of any of these and not in your user whitelist will be blocked
$logFailedLogin = '';                                               // File location of where to store a log file of blocked users

//-----------------------------------------------------
// FRONTEND SETTINGS
//-----------------------------------------------------

/* Marker Settings */
$noExcludeMinIV = true;                                        // true/false
$noMinIV = true;                                               // true/false
$noMinLevel = true;                                            // true/false
$noHighLevelData = true;                                       // true/false
$noWeatherIcons = false;
$enableWeatherIcons = 'false';                                 // true/false
$noPokeIVIcons = false;										   // true/false
$enablePokeIVIcons = 'false';                                  // true/false


/* Hide Specific content */
$noGymScannedText = false;
$noRaidMoves = false;
$noMaplink = false; 
$noGymTeamInfos = false;
$noPokestopImages = false;
$denyRaidLevels = '[]';
$noOutdatedGyms = false;;
$noExportImport = false;
$noBattleStatus = false;
$battleStatus = 'false';

/* Notification Settings */
$noNotifyPokemon = false;                                       // true/false
$noNotifyIv = false;                                            // true/false
$noNotifyLevel = false;                                         // true/false
$noNotifyRaid = false;                                          // true/false
$noNotifySound = false;                                         // true/false
$noCriesSound = false;                                          // true/false
$noNotifyBounce = false;                                        // true/false
$noNotifyNotification = false;                                  // true/false

/* Style Settings */
$noPokemonLabelStyles = true;                                   //enables/disables the choice for users to set their prefered pokemonLabel style
$pokemonLabelStyle = 'classic';                                 // classic, v1, v2

$iconNotifySizeModifier = 15;                                   // 0, 15, 30, 45
$noOverlayDesign = true;                                        // true/false
$overlayDesign = 'linear-gradient(to top, #686868 0%, #121212 100%)'; //Color design - sets the background-image (linear-gradient for normal colors is also possible here)


/* Marker Settings */

$noPokemon = false;                                                 // true/false
$enablePokemon = 'true';                                            // true/false
$noPokemonNumbers = false;                                          // true/false
$noHidePokemon = false;                                             // true/false
$hidePokemon = '[10, 13, 16, 19, 21, 29, 32, 41, 46, 48, 50, 52, 56, 74, 77, 96, 111, 133,
                  161, 163, 167, 177, 183, 191, 194, 168]';         // [] for empty
$hidePokemonCoords = false;                                         // true/false

$excludeMinIV = '[131, 143, 147, 148, 149, 248]';                   // [] for empty

$minIV = '0';                                                       // "0" for empty or a number
$minLevel = '0';                                                    // "0" for empty or a number
$noIv100Glow = false;
$Iv100GlowColor = 'rgba(255, 200, 44, 1)';							// Glow Color

$noBigKarp = true;                                                 // true/false
$noTinyRat = true;                                                 // true/false

$noGyms = false;                                                    // true/false
$enableGyms = 'false';                                              // true/false
$noGymSidebar = false;                                              // true/false
$gymSidebar = 'true';                                               // true/false
$noExEligible = false;                                              // true/false
$exEligible = 'false';                                              // true/false
$noGymFirstseen = true;                                             // true/false
$noNewGymsFilter = true;
$newGymsFilterStart = ['2019','08'];

$noGymBadgeMode = true;
$gymBadgeMode = 'false';

$noRaids = false;                                                   // true/false
$enableRaids = 'false';                                             // true/false
$noRaidTimer = false;
$enableRaidTimer = 'false';
$activeRaids = 'false';                                             // true/false
$noFilterByRaidlevel = false;                                       //Allows to filter by raidlevel
$filterByRaidlevel = 'false';
$minRaidLevel = 1;
$maxRaidLevel = 5;
$noRaidCounterGuide = false;
$noRaidPokemonCP = false;                                           // true/false
$noWhatsappRaidMoves = false;

$noRaidfilterList = false;                                          // Allows to filter by raidboss id
$raidbossFilterlist = 'false';
$generateRaidbossFilters = false;
$noRaidfilterListNumbers = false;
$hideRaidPokemon = '[]';
$excludeRaidPokemon = [];
$hideRaidEggs = '[]';
$excludeRaidEggs = [];

$noPokestops = false;                                               // true/false
$enablePokestops = 'false';                                         // true/false

$noPokestopFirstseen = true;
$noNewPokestopsFilter = true;
$newPokestopsFilterStart = ['2019','08'];

$noLures = false;                                                   // true/false
$enableLured = 'false';                                             // true/false

$noRocketInvasions = false;
$enableInvasions = 'false';                                             // true/false
$noInvasionEncounterData = true;
$noInvasionTimer = false;
$enableInvasionTimer = 'false';
$noGrunts = false;
$noGruntNumbers = false;
$hideGrunts = '[]';
$excludeGrunts = [];
$generateExcludeGrunts = true;

$noQuests = false;                                                  // true/false
$noQuestPokemonCP = false;                                          // true/false
$enableQuests = 'false';                                            // true/false
$noQuestsItemsAmounts = false;										// true/false
$enableQuestsItemsAmounts = 'false';
$noQuestsItems = false;
$noQuestsPokemon = false;
$hideQuestsPokemon = '[]';  // Pokemon ids
$excludeQuestsPokemon = [];  // Pokemon ids
$hideQuestsItem = '[4, 5, 301, 401, 402, 403, 404, 501, 602, 603, 604, 702, 704, 708, 801, 901, 902, 903, 1001, 1002, 1401, 1402, 1403, 1404, 1405]';    // Item ids "See protos https://github.com/Furtif/POGOProtos/blob/master/src/POGOProtos/Inventory/Item/ItemId.proto"
$excludeQuestsItem = [4, 5, 301, 401, 402, 403, 404, 501, 602, 603, 604, 702, 704, 708, 801, 901, 902, 903, 1001, 1002, 1401, 1402, 1403, 1404, 1405];
$noItemNumbers = true;                                             // true/false
$generateExcludeItems = true;

// Manual quest hide options
$hideQuestTypes = [0, 1, 2, 3, 12, 18, 19, 22, 24, 25];
$hideRewardTypes = [0, 1, 4, 5, 6];
$hideConditionTypes = [0, 4, 5, 11, 12, 13, 16, 17, 19, 20];
// Manual quest show options
$showEncounters = [201];
$showItems = [1, 2, 3, 101, 102, 103, 104, 201, 202, 701, 703, 705, 706, 707, 1301];

$noSpawnPoints = true;                                              // true/false
$enableSpawnPoints = 'false';                                       // true/false

$noRanges = false;                                                  // true/false
$enableRanges = 'false';                                            // true/false

$noScanPolygon = true;
$enableScanPolygon = 'false';
$geoJSONfile = 'geofences/scannerarea.json';			    // path to geoJSON file create your own on http://geojson.io/ adjust filename

/* Scanner Location */
$noLiveScanLocation = true;                                         // Show scan devices on the map
$enableLiveScan = 'false';
$hideDeviceAfterMinutes = 0;                                        // Hide scan devices from map after x amount of minutes not being updated in database. 0 to disable.
$deviceOfflineAfterSeconds = 300;    
                               // Mark scan devices offline (red color) after x amount of seconds not being updated in database.
/* Location & Search Settings */

$noSearchLocation = false;                                          // true/false

$noStartMe = false;                                                 // true/false
$enableStartMe = 'false';                                           // true/false

$noStartLast = false;                                               // true/false
$enableStartLast = 'false';                                         // true/false

$noFollowMe = false;                                                // true/false
$enableFollowMe = 'false';                                          // true/false

$noSpawnArea = false;                                               // true/false
$enableSpawnArea = 'false';                                         // true/false

/* Notification Settings */

$notifyPokemon = '[]';                                           // [] for empty
$notifyIv = '""';                                                   // "" for empty or a number
$notifyLevel = '""';                                                // "" for empty or a number
$notifyRaid = 5;                                                    // O to disable
$notifySound = 'false';                                             // true/false
$criesSound = 'false';                                              // true/false
$notifyBounce = 'true';                                             // true/false
$notifyNotification = 'true';                                       // true/false

/* Questscan Menu Settings */
$noQuestscanInfotext = true; // true/false - enables the questscan-info menupoint in the menu
$questscanInfotext = "some text for quest information supporting<br>html";

/* Custom Tileserver.  */
// (Only tested with https://github.com/123FLO321/SwiftTileserverCache ) */

$noCustomTileServer = true;                                         // Enable/Disable Custom TileServer
$customTileServerAddress = '';                                      // TileServer URL: http://ipAddress:port/tile/klokantech-basic/{z}/{x}/{y}/1/png
$forcedTileServer = false;

/* Style Settings */

$copyrightSafe = true;
$iconRepository = 'https://raw.githubusercontent.com/whitewillem/PogoAssets/resized/icons_large/';#
$noMultipleRepos = true;
$rewardsIconsRepository = 'static/icons/';
$usePokeRewardsFromIconRepository = false;
$iconRepos = [["Standard","$iconRepository"]];
$noCostumeIcons = true;											// enable/disable costume forms (label only) (Note: use icon-sets with costumes if using this)

$noMapStyle = false;                                                // true/false
$mapStyle = 'openstreetmap';                                        // openstreetmap, darkmatter, styleblackandwhite, styletopo, stylesatellite, stylewikipedia, (tileserver)

$noDirectionProvider = false;                                       // true/false
$directionProvider = 'google';                                      // google, waze, apple, bing, google_pin

$noIconSize = false;                                                // true/false
$iconSize = 0;                                                      // -8, 0, 10, 20

$noIconNotifySizeModifier = false;                                  // true/false | Increase size of notified Pokemon

$noGymStyle = false;                                                // true/false
$gymStyle = 'ingame';                                               // ingame, shield

$noLocationStyle = false;                                           // true/false
$locationStyle = 'none';                                            // none, google, red, red_animated, blue, blue_animated, yellow, yellow_animated, pokesition, pokeball

$osmTileServer = 'tile.openstreetmap.org';                          // osm tile server (no trailing slash)

$triggerGyms = '[]';                                                // Add Gyms that the OSM-Query doesn't take care of like '["gym_id", "gym_id"]'
$onlyTriggerGyms = false;                                           // Only show EX-Gyms that are defined in $triggerGyms
$passwatcherTriggeredGyms = false;                                  // Needs passwatcher configured properly to work. (https://github.com/ccev/passwatcher)
                                                                    // If enabled, it will take the triggered gyms from static/data/triggeredgyms.json
                                                                    // to show those raids as a triggered ex gym
																	

$noExGyms = false;                                                  // Do not display EX-Gyms on the map
$noParkInfo = false;                                                // Do not display Park info on the map

//-----------------------------------------------------
// Manual Submissions
//-----------------------------------------------------
$noSubmit = true;
$hideIfManual = false;
$noManualRaids = true;
$noManualPokemon = true;
$pokemonTimer = 900;                                                // Time in seconds before a submitted Pokémon despawns.
$noManualGyms = true;
$noManualPokestops = true;
$noRenamePokestops = true;
$noConvertPokestops = true;
$noManualQuests = true;

//-----------------------------------------------------
// Ingress portals
//-----------------------------------------------------
$enablePortals = 'false';
$enableNewPortals = 0;                                                   // O: all, 1: new portals only
$noPortals = true;
$noDeletePortal = true;
$noConvertPortal = true;
$noS2Cells = true;
$enableS2Cells = 'false';
$enableLevel13Cells = 'false';
$enableLevel14Cells = 'false';
$enableLevel17Cells = 'false';
$noFillCoveredPokestopCells = false;										//true/false - Enables the option to fill covered pokestop placement cells
$enableFillCoveredPokestopCells = 'false';
$noGymCellCalculations = true;										//true/false - Enables the gym cell calculations(not needed to display gym cells)
$enableGymCellCalculations = 'false';
$markPortalsAsNew = 86400;                                         // Time in seconds to mark new imported portals as new ( 86400 for 1 day )
$noPoi = true;
$noAddPoi = true;
$enablePoi = 'false';
$noDeletePoi = true;
$noMarkPoi = true;
$noEditPoi = true;
/* IMGUR API */
$imgurCID = "";

$noDiscordSubmitLogChannel = true;                                        // Send webhooks to discord channel upon submission

$pokemonReportTime = false;
$pokemonToExclude = [];

$noDeleteGyms = true;
$noToggleExGyms = true;
$noDeletePokestops = true;

$raidBosses = [];

$sendWebhook = false;
$webhookUrl = null;                                             //['url-1','url-2']
//---------------------------------------------------
// Quest Webhooks
//---------------------------------------------------
$sendQuestWebhook = false;                                          // Experimental use only
$questWebhookUrl = null;                                            // Experimental use only
$webhookSystem = [''];						    // Supported are either 'pokealarm' or 'poracle'

$manualFiveStar = [
    'webhook' => false,
    'pokemon_id' => 391,
    'cp' => 0,
    'move_1' => null,
    'move_2' => null,
    'form' => 0
];

//-----------------------------------------------
// Search
//-----------------------------------------------------

$noSearch = false;
$noSearchPokestops = true;     //Wont work if noSearch = false
$noSearchGyms = false;          //Wont work if noSearch = false
$noSearchManualQuests = false;  //Wont work if noSearch = false
$noSearchNests = true;
$noSearchPortals = true;
$defaultUnit = "km";                                            // mi/km
$maxSearchResults = 10;
$maxSearchNameLength = 0;	// 0 = Unlimited. Shorten pokestop names in reward search results if longer than this value to prevent UI layout issues
//-----------------------------------------------
// Community
//-----------------------------------------------------
$noCommunity = true;
$enableCommunities = 'false';
$communityDescription = 'Display a text in your Community Container';
$noAddNewCommunity = true;
$noDeleteCommunity = true;
$noEditCommunity = true;

//Custom Nestshare configs
$noWhatsappShareCommunities = true;
$communityShareHeader = "Communities in YOURCITY"; // Displays the first line (bold) of the shared text
$communityShareDescription = "(By ". $mapUrl .")"; // Displays the second line of the shared text
$communityShareFooter = "For more infos visit our Map %0A(Discord needed: ". $discordUrl .")"; // Disyplays the footer under the shared nests

//-----------------------------------------------
// Nests
//-----------------------------------------------------
$noNests = true;                                                   // true/false
$enableNests = 'false';                                             // true/false
$noManualNests = true;
$noDeleteNests = true;
$nestVerifyLevel = 1;						    // 1 = Verified 2 = 1 + Unverified 3 = 1 + 2 + Revoked 4 = Get all nests
$deleteNestsOlderThan = 42;					    // days after not updated nests are removed from database by nest cron
$migrationDay = strtotime('5 April 2018');                          // Adjust day value after non consitent 14 day migration
$noAddNewNests = false;
$excludeNestMons = [2,3,5,6,8,9,11,12,14,15,17,18,20,22,24,26,28,29,30,31,32,33,34,36,38,40,42,44,45,49,51,53,55,57,59,61,62,64,65,67,68,70,71,73,75,76,78,80,82,83,85,87,88,89,91,93,94,97,99,101,103,105,106,107,108,109,110,112,113,114,115,117,119,121,122,128,130,131,132,134,135,136,137,139,142,143,144,145,146,147,148,149,150,151,153,154,156,157,159,160,161,162,163,164,165,166,167,168,169,171,172,173,174,175,176,177,178,179,180,181,182,183,184,186,187,188,189,191,192,194,195,196,197,199,201,204,205,207,208,210,212,214,217,218,219,221,222,223,224,225,228,229,230,232,233,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,253,254,256,257,259,260,262,263,264,265,266,267,268,269,270,271,272,274,275,276,277,279,280,281,282,284,286,287,288,289,290,291,292,293,294,295,297,298,301,303,304,305,306,308,310,313,314,316,317,319,321,323,324,326,327,328,329,330,331,332,334,335,336,337,338,339,340,342,344,346,348,349,350,351,352,354,356,357,358,359,360,361,362,363,364,365,366,367,368,369,371,372,373,374,375,376,377,378,379,380,381,382,383,384,385,386];
$nestCoords = array();                                           //$nestCoords = array(array('lat1' => 42.8307723529682, 'lng1' => -88.7527692278689, 'lat2' => 42.1339901128552, 'lng2' => -88.0688703020877),array(    'lat1' => 42.8529250952743,'lng1' => -88.1292951067752,'lat2' => 41.7929306950085,'lng2' => -87.5662457903689));
$nestJSONfile = 'geofences/nest.json';

//Custom Nestshare configs
$noWhatsappShareNests = true;
$nestShareHeader = "Nests in YOURCITY"; // Displays the first line (bold) of the shared text
$nestShareDescription = "(By ". $mapUrl .")"; // Displays the second line of the shared text
$nestShareFooter = "For more infos visit our Map %0A(Discord needed: ". $discordUrl .")"; // Disyplays the footer under the shared nests


//-----------------------------------------------------
// Areas
//-----------------------------------------------------

$noAreas = true;
$areas = [];                                                        // [[latitude,longitude,zoom,"name"],[latitude,longitude,zoom,"name"]]

//-----------------------------------------------------
// Weather Config
//-----------------------------------------------------
$noWeatherOverlay = false;
$enableWeatherOverlay = 'false';
$weatherColors = [
    'grey',         // no weather
    '#fdfd96',      // clear
    'darkblue',     // rain
    'grey',         // partly cloudy
    'darkgrey',     // cloudy
    'purple',       // windy
    'white',        // snow
    'black'         // fog
];
$weatherCellsFillOpacity = 0.2;
//-----------------------------------------------------
// Holiday Overlay
//-----------------------------------------------------
$letItSnow = true;                                                   // Show snow overlay at 24, 25 and 26 December
$makeItBang = true;                                                  // Show fireworks overlay at 31 December
$valentine = true;                                                   // Show Hearts on Valentines Day (Feb 14)

//-----------------------------------------------------
// DEBUGGING - MISC
//-----------------------------------------------------
/* Counts */
$numberOfPokemon = 649;
$numberOfItem = 1405;
$numberOfGrunt = 50;

/* Popup handling */
$openPopupOnHovering = false;                                       // For Desktop version: if the popups/labels should be opened upon hovering
$onlyOnePopup = true;                                               // Only allow one popup at once (recommended hover-opening false)

$noLoadingScreen = true;
$loadingStyle = '';

// Do not enable unless requested
$enableDebug = false;

//-----------------------------------------------------
// DATABASE CONFIG
//-----------------------------------------------------
