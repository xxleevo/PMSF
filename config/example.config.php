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
$startingLat = 52.084992;													// Starting latitude
$startingLng = 5.302366;													// Starting longitude
$startingZoom = 15;															//Starting Zoom - should be between $maxZoomIn & $maxZoomOut

/* Boundaries */
$noBoundaries = true;                                               		// If enabled, only data from the boundaries (polygon) is pulled.
																			// NOTICE: Keep the Format and syntax as in the example, first & last point is the same
$boundaries =  '52.71147 13.03893,
				52.53501 12.89848,
				52.30793 13.09119,
				52.30393 13.68564,
				52.51513 13.80976,
				52.71345 13.59746,
				52.71147 13.03893';

/* Title and language */
$title = "PMSF-Leevo";                                                 		// Title to display in title bar
$locale = "de";                                                   			// Display language
$raidmapLogo = '';                                                			// Upload logo to custom folder, leave '' for empty ( $raidmapLogo = 'custom/logo.png'; )

/* MOTD */
$noMotd = true;																// Message of the Day - supporting html
$motdTitle = "Message of the Day";
$motdContent = "This is an example MOTD<br>Do whatever you like with it.";

/* Custom URL's */
$mapUrl = "";																// For the link from the nest sharing tool - not needed if nests are off
$paypalUrl = "";                                                    		// PayPal donation URL, leave "" for empty
$discordUrl = "https://discord.gg/INVITE_LINK";                     		// Discord URL, leave "" for empty
$telegramUrl = "";															// Telegram URL, leave "" for empty
$worldopoleUrl = "";                                                		// Link to Worldopole/RDM-o-Pole, leave "" for empty
$noLinkFullStats = false;													// Enable a link to worldopole in the stats sidebar
$worldopoleButtonTitle = "Statistiken";                             		// Display text for the button-link to worlopole in the Menu
//-----------------------------------------------------
// Login
//-----------------------------------------------------

/* Discord Login */
//Have a look in the example.access-config.php for instructions to use discord login, use the howto here to install discord login afterwards.
$forcedDiscordLogin = false;                                         		// If Users are forced to login with discord instantly 
$noDiscordLogin = true;                                             		// true/false - This will enable login through discord.
																			// 1. Create a discord bot here -> https://discordapp.com/developers/applications/me
																			// 2. Install composer with "apt-get install composer".
																			// 3. Navigate to your website's root folder and type "composer install" to install the dependencies.
																			// 4. Add your callback-page as a REDIRECT URI to your discord bot. Should be the same as $discordBotRedirectUri.
																			// 5. Enter Client ID, Client Secret and Redirect URI below.
$discordBotClientId = 0;
$discordBotClientSecret = "";
$discordBotRedirectUri = "https://example.com/discord-callback.php";
/* Blacklist Settings for Discord Login */
$userBlacklist = [''];														// Array of user ID's that are always blocked from accessing the map
$userWhitelist = [''];														// Array of user ID's that's allowed to bypass the server blacklist
$serverWhitelist = [''];													// Array of server ID's. Your users will need to be in at least one of them
$serverBlacklist = [''];													// Array of server ID's. A user that's a member of any of these and not in your user whitelist will be blocked
$logFailedLogin = '';														// File location of where to store a log file of blocked users

/* Other Login Systems (untested) */
$noNativeLogin = true;														// true/false - This will enable the built in login system.
$domainName = '';															// If this is empty, reset-password emails will use the domain name taken from the URL.
$adminUsers = array('admin@example.com', 'Superadmin#13337');				// You can add multiple admins by adding them to the array.
$logfile = '../members.log';												// Path to log file. Make sure this works as it will be your life saver if your db crashes.
$daysMembershipPerQuantity = 31;											// How many days membership one selly quantity will give.
$sellyPage = '';															// Link to selly purchase page for membership renewal.
$sellyWebhookSecret = '';													// Add a secret key at https://selly.gg/settings to make sure the payment webhook is sent from selly to prevent fake payments.
																			// Add the same key to the $sellyWebhookSecret variable.
//-----------------------------------------------------
// FRONTEND SETTINGS
//-----------------------------------------------------
/*---------General Frontend Settings---------*/
$hideCoords = [true,true,true,true,true];                        			// Array for: Pokemon, Gyms, Gyms(Sidebar), Pokestops, Nests 
$copyrightSafe = true;														// If you want to use icons, set to false (you will need your own icons)
$iconRepository = 'https://raw.githubusercontent.com/whitewillem/PogoAssets/resized/icons_large/';												// URLs or folder paths are allowed - if noMultipleRepos=false, this is also the default icon pack
																			// You can also use a relative path here for your icons!
																			// example: $iconRepository = 'static/icons/';
$rewardsIconsRepository = 'static/icons/';						    		// URL or folder paths to the "reward"-folder, containing the reward images and a "pokemon" folder containing the pokemon reward images.
																			// You can also use a an url here for your icons!
																			// example: $rewardsIconsRepository = 'https://raw.githubusercontent.com/user/repo/branch/.../';
$usePokeRewardsFromIconRepository = false;                          		// If true, the pokemon reward images are pulled from the $iconRepository
$noMultipleRepos = true;													// To enable Multiple icon packs:
																			// Each iconpack needs to be in a seperate folder
																			// for the menu icons, $iconRepository will be used always.
$iconRepos = [["Standard","$iconRepository"],								// Multiple Repos in here with the format ["Name","Link_To_Icons"] - Link can be a relative path for an iconfolder or a Link to a Repo.
			["Retro","static/icons/retro/"],								// Example for a Pack located on your server at static/icons/retro/, named "Retro" in the Frontend
			["Shuffle-ShinyEdition","https://raw.githubusercontent.com/geekygreek7/pkmn_shuffle_icons/master/optimized_for_PMSF_frontend/"],
			["Shuffle-Normal","https://raw.githubusercontent.com/nileplumb/PkmnShuffleMap/master/PMSF_icons_large/"],
			["Ingame","https://raw.githubusercontent.com/whitewillem/PogoAssets/resized/icons_large/"],
			["Ingame-Borderless","https://raw.githubusercontent.com/whitewillem/pogoassets/resized/no_border/"]
			]; // You May add different iconPacks here so mapusers can switch between them
$noMaplink = false; 														// Dont display the maplink option at gyms,pokemon,stops
$noExportImport = false;													// Enable/Disable the ability for users to Export/Import Settings
$noWhatsappLink = false;													// Enable/Disable the display of the Whatsapp share button to Raids
$noWhatsappLinkQuests = false;												// Enable/Disable the display of the Whatsapp share button to Quests

$noOverlayDesign = false;                                        			//Style for the Map - There is a various Set of predefined styles, you can set the default below
$overlayDesign = 'linear-gradient(to top, #686868 0%, #121212 100%)'; 		//Color design - sets the background-image (keep the linear-gradient-costruct here)


/*---------Pokemon Settings---------*/
$noPokemon = false;                                                 		// Enables/Disables Pokemon & the whole Pokemon Menu
$enablePokemon = 'true';                                            		// default value for users

$noBigKarp = true;															// Enables/Disables the option to filter big karps
$enableBigKarps = 'false';													// default value for users

$noTinyRat = true;															// Enables/Disables the option to filter tiny rats
$enableTinyRats = 'false';													// default value for users

$noHidePokemon = false;														//If False, the array below will be the hidden pokemon (users can changes this personally)
$hidePokemon = '[10, 13, 16, 19, 21, 29, 32, 41, 46, 48, 50, 52, 56, 74, 77, 96, 111, 133,
                  161, 163, 167, 177, 183, 191, 194, 168]';         		// [] for empty

$noPokemonNumbers = false;                                          		// For the Filters, hide or show Pokemon numbers 

$noWeatherIcons = false;													// If set to false, this option let users allow to enable/disable weather icons for pokemon
$enableWeatherIcons = 'false';												// default value for users for weather-icons


/*---------IV & CP Settings---------*/
$noHighLevelData = false;													// This will activate/deactivate all iv/cp/move data for monsters
$noMinIV = false;															// This will enable/disable the option for a global minIV
$minIV = '0';																// "0" for empty or a number
$noIv100Glow = false;														// Puts a glow on the 100% and put their z-index to highest, also restyles the IV-label part (in v1 and v2 only, not in classic label)
$Iv100GlowColor = 'rgba(255, 200, 44, 1)';									// Glow Color - supports rgba, hex, colorname

$noPokeIVIcons = false;										        		// If set to false, this option let users allow to enable/disable iv icons for pokemon on the map
$enablePokeIVIcons = 'false';                                       		// default value for users for iv icons

$noMinLevel = false;														// This will enable/disable the option for a global minLvl
$minLevel = '0';															// "0" for empty or a number

$noExcludeMinIV = false;													// This will activate/deactivate the possibility to keep specific pokemon on the map if global minIV is set for a user
$excludeMinIV = '[131, 143, 147, 148, 149, 248]';							// [] for empty

/*---------Gym Settings---------*/
$noGyms = false;                                                    		// Enables/Disables Gyms (& the whole Gym Menu if raids are also disabled)
$enableGyms = 'false';                                              		// default value for users

$noGymStyle = false;                                                		// Enables/Disables the ability for users to switch gym styles
$gymStyle = 'ingame';                                               		// default value for users - possible: beasts, classic, elements, idol, ingame, label, shield, tower

$noGymSidebar = false;                                              		// Enables/Disables the ability for users to enable the Gym Sidebar
$gymSidebar = 'true';                                               		// default value for users

$noExEligible = false;                                              		// Enables/Disables the ability for users to filter for Ex-Gym-Only
$exEligible = 'false';                                              		// default value for users

$noBattleStatus = false;													// Enable/Disable the ability for users to filter battle gyms
$battleStatus = 'false';													// default value for users

$noGymScannedText = false;													// Enables/Disables "Last seen" and "Last modified" at gyms
$noGymFirstseen = true;                                             		// Enables/Disables the display for first seen in gym label
$noGymTeamInfos = false;													// Enables/Disables every information about gym team
$noOutdatedGyms = false;													// If active, set GymTeams to Harmony when older than 4h(only frontend-side, no db-changes)
$noNewGymsFilter = true;                                            		// Enable/Disables filtering for new Gyms
$newGymsFilterStart = ['2019','08'];                                		// Year, Month

$noGymBadgeMode = true;														// Requires: Discord Login, $noSubmit = false, Manualdb(up to date)
$gymBadgeMode = 'false';													// Careful: The Badge-Mode has no anti-troll system, so use it carefully because it changes the values in the manualdb. (suggested: A proper paywall to only give premium users access)
$enableStandardBadges = 'false';									// Default for new users - Show badges on normal gym mode

$triggerGyms = '[]';                                                		// Add Gyms that the OSM-Query doesn't take care of like '["gym_id", "gym_id"]'
$onlyTriggerGyms = false;                                           		// Only show EX-Gyms that are defined in $triggerGyms
$passwatcherTriggeredGyms = false;                                  		// Needs passwatcher configured properly to work. (https://github.com/ccev/passwatcher)
																			// If enabled, it will take the triggered gyms from static/data/triggeredgyms.json
																			// to show those raids as a triggered ex gym
																			// For a quick tutorial, check out tutorials/passwatcherTriggered.txt 

$noExGyms = false;                                                  		// Do not display EX-Gyms on the map
$noParkInfo = false;                                                		// Do not display Park info on the map

/*---------Raid Settings---------*/
$noRaids = false;                                                   		// Enables/Disables Raids (& the whole raid Menu if gyms are also disabled)
$enableRaids = 'false';                                             		// default value for users enable raids
$activeRaids = 'false';                                             		// default value for users: only hatched eggs
$noFilterByRaidlevel = false;                                       		// Allows to filter by raidlevel
$filterByRaidlevel = 'false';                                       		// default value for users: Raidfilter-switch
$minRaidLevel = 1;															// default value for users: min raid lvl
$maxRaidLevel = 5;															// default value for users: max raid lvl
$noRaidTimer = false;														// Enables/Disables Raidtimers on the Map
$enableRaidTimer = 'false';													// default value for users: raidtimer
$noRaidMoves = false;														// Raid Moveset beeing displayed or not
$noRaidCounterGuide = false;                                        		// For hatched raidbosses, link a counterguide(pokebattler) on the bottom in the label.
$noRaidPokemonCP = false;                                           		// Display min/max cp for the boss catch(with and without weatherboost)
$noWhatsappRaidMoves = false;                                       		// Allow Moves from hatched boss to share via whatsapp
$denyRaidLevels = '[]';                                             		// Hide Raids & Eggs from specific Levels
																			// Gyms with denied raids will be hidden when turning on raids.
																			// Even when set filter to 1-5 for raidlevel, the raids will be hidden.	
$noRaidfilterList = false;                                          		// Allows to filter by raidboss id
$raidbossFilterlist = 'false';                                      		// default value for users
$generateRaidbossFilters = false;                                   		// Automatically generates possible raidbosses from the database (last 24 hours)
$noRaidfilterListNumbers = false;                                   		// Enable/Disable Numbers on the filter tab
$hideRaidPokemon = '[]';                                            		// hidden bosses by default
$excludeRaidPokemon = [];                                           		// exclude bosses from the list (for users not changeable)
$hideRaidEggs = '[]'; 													    // hidden eggs by default 
$excludeRaidEggs = [2,4];													// exclude eggs from the list (for users not changeable)- 2+4 hidden because we dont have 2 & 4 raids anymore											
/*---------Pokestop Settings---------*/
$noPokestops = false;                                               		// Enables/Disables Pokestops & the whole Pokestop menu
$enablePokestops = 'false';                                         		// default value for users

$noPokestopImages = false;													// Enables/Disables original pokestop images(swap with standard icons if disabled)
$noPokestopFirstseen = true;												// Enables/Disables the display for the first seen time in the stop label

$noLures = false;															// Enables/Disables Lures
$enableLured = 'false';                                             		// default value for users: Show Lures only

$noRocketInvasions = false;													// Enables/Disables Rocket Invasions
$enableInvasions = 'false';													// default value for users: Show Invasions only

$noInvasionEncounterData = true;											// Enable/Disable grunttype encounter data stored in static/data/grunttype.json (beta feature, grunttypes, encounters and rewards may change over time!)

$noInvasionTimer = false;													// Enables/Disables the ability to enable/disable the Invasion Timer
$enableInvasionTimer = 'false';												// default value for users: Invasion Timer

$noGrunts = false;
$noGruntNumbers = false;
$hideGrunts = '[1,2,3,42,45,46]';
$excludeGrunts = [1,2,3,42,45,46];
$generateExcludeGrunts = true;

$noQuests = false;															// Enables/Disables Quests
$enableQuests = 'false';                                            		// default value for users: Show Quests only

$noNewPokestopsFilter = true;                                       		// Enable/Disables filtering for new Pokestops
$newPokestopsFilterStart = ['2019','08'];                           		// Year, Month

$noQuestPokemonCP = false;                                          		// Enable/Disable min/max cp display for pokemon rewards

$noQuestsItemsAmounts = false;												// Enables/Disables the switch between Reward number Icons and standard
$enableQuestsItemsAmounts = 'false';										// default value for users: Show Item Amount in Icon

$noQuestsItems = false;														// Enables/Disables Quest Items
$noItemNumbers = true;														// Enables/Disables numbers at the item filter
$hideQuestsItem = '[4, 5, 301, 401, 402, 403, 404, 501, 502, 503, 504, 602, 603, 604, 702, 704, 707, 801, 901, 902, 903, 1001, 1002, 1401, 1402, 1402, 1403, 1404, 1405]';    // Item ids "See protos https://github.com/Furtif/POGOProtos/blob/master/src/POGOProtos/Inventory/Item/ItemId.proto"
$excludeQuestsItem = [4, 5, 301, 401, 402, 403, 404, 501, 502, 503, 504, 602, 603, 604, 702, 704, 707, 801, 901, 902, 903, 1001, 1002, 1401, 1402, 1402, 1403, 1404, 1405];   // All excluded item wil not be shown in the filter.
$generateExcludeItems = true;

$noQuestsEnergy = false;                                           // true/false - Mega Energy Quest filter
$noEnergyNumbers = true;
$hideQuestsEnergy = '[18,15,94,115,127,130,142,150,181,208,212,214,229,248,254,257,260,282,302,303,306,308,310,319,323,328,334,354,359,362,373,376,380,381,384,445,448,460,475,531,849]';  // Pokemon ids
$excludeQuestsEnergy = [18,15,94,115,127,130,142,150,181,208,212,214,229,248,254,257,260,282,302,303,306,308,310,319,323,328,334,354,359,362,373,376,380,381,384,445,448,460,475,531,849];
$generateExcludeEnergy = true;

$noQuestsPokemon = false;													// Enables/Disables Quest Pokemon
$generateExcludeQuestsPokemon = true;                               		// Generate $excludeQuestsPokemon based on active quests in database
//Dont change this if $generateExcludeQuestsPokemon is true
$excludeQuestsPokemon = [];													// All excluded pokemon wil not be shown in the filter.
$hideQuestsPokemon = '[]';													// Pokemon ids will default be hidden in the menu every user is able to change this personally


/*---------Notification Settings---------*/
$noNotifyPokemon = false;													// Enables/Disables notifications by Pokemon ID
$notifyPokemon = '[201]';                                           		// default value for users - "" = empty
$noNotifyIv = false;														// Enables/Disables notifications by Pokemon IV
$notifyIv = '""';                                                   		// default value for users - "" = empty
$noNotifyLevel = false;														// Enables/Disables notifications by Pokemon LVL
$notifyLevel = '""';                                                		// default value for users - "" = empty
$noNotifyRaid = false;														// Enables/Disables raid-notifications by raidLevel
$notifyRaid = 5;                                                    		// default value for users - 0 to disable
$noNotifySound = false;														// Enables/Disables notification with sound
$notifySound = 'false';														// default value for users
$noCriesSound = false;														// Enables/Disables notification with pokemon cry sound
$criesSound = 'false';														// default value for users
$noNotifyBounce = false;													// Enables/Disables bouncing notifications
$notifyBounce = 'true';														// default value for users
$noNotifyNotification = false;												// Enables/Disables browser notifications (mostly for Desktop)
$notifyNotification = 'true';												// default value for users

/*---------S2 Cell Settings---------*/
$noS2Cells = true;															// Enables/Disables S2-Cell Menu
$enableS2Cells = 'false';													// default value for users
$enableLevel13Cells = 'false';												// default value for users
$enableLevel14Cells = 'false';												// default value for users
$enableLevel17Cells = 'false';												// default value for users

$noFillCoveredPokestopCells = false;										// true/false - Enables the option to fill covered pokestop placement cells
$enableFillCoveredPokestopCells = 'false';

$noGymCellCalculations = true;												// true/false - Enables the gym cell calculations(not needed to display gym cells)
$enableGymCellCalculations = 'false';
/*---------Location & Polygons---------*/
$noSpawnPoints = false;													// Enables/Disables Spawnpoints
$enableSpawnPoints = 'false';                                       		// default value for users

$noRanges = false;															// Enables/Disables 70m Ranges at objects when zoomed in
$enableRanges = 'false';													// default value for users

$noSearchLocation = false;													// Enables/Disables the ability for users to search a Location in the menu

$noStartMe = false;															// Enables/Disables "start at my location" in menu
$enableStartMe = 'false';													// default value for users

$noStartLast = false;														// Enables/Disables "start at last location" in menu
$enableStartLast = 'false';													// default value for users

$noFollowMe = false;														// Enables/Disables "follow me" in menu
$enableFollowMe = 'false';													// default value for users
$noSpawnArea = false;														// Enables/Disables the ability for users to enable/disable the spawn area on "follow me"
$enableSpawnArea = 'false';													// default value for users

$noScanPolygon = true;														// Enables/Disables Scan Area/Polygon
$enableScanPolygon = 'false';												// default value for users
$geoJSONfile = 'geofences/scannerarea.json';								// path to geoJSON file create your own on http://geojson.io/ adjust filename

$noScanPolygonQuest = true;													// Enables/Disables Quest Area/Polygon
$enableScanPolygonQuest = 'false';											// default value for users
$geoJSONfileQuest = 'geofences/questarea.json';								// path to geoJSON file create your own on http://geojson.io/ adjust filename

$noScanPolygonPvp = true;													// Enables/Disables PvP Locations
$enableScanPolygonPvp = 'false';											// default value for users
$pvptext1 = '';																// font size 4 good for header - name your marker "1" in the geojson, this text will be the popup text. if no text is given, it will be "no further information"
$pvptext2 = '';																// font size 4 good for header - name your marker "2" in the geojson, this text will be the popup text. if no text is given, it will be "no further information"
$pvptext3 = '';																// font size 4 good for header - name your marker "3" in the geojson, this text will be the popup text. if no text is given, it will be "no further information"
$pvptext4 = '';																// font size 4 good for header - name your marker "4" in the geojson, this text will be the popup text. if no text is given, it will be "no further information"

$noLiveScanLocation = false;                                         		// Show scan devices on the map
$enableLiveScan = 'false';
$hideDeviceAfterMinutes = 0;                                       			// Hide scan devices from map after x amount of minutes not being updated in database. 0 to disable.
$deviceOfflineAfterSeconds = 300;                                   		// Mark scan devices offline (red color) after x amount of seconds not being updated in database.

/*--------- Custom Tileserver Setup ---------*/
// (Only tested with https://github.com/123FLO321/SwiftTileserverCache ) */

$customTileServers = '';													// Option for Tileservers (multiple layers supported) - For example check below
//$customTileServers = [
//						["Tileserver Basic","http://ipAddress:port/tile/klokantech-basic/{z}/{x}/{y}/1/png"],
//						["Tileserver Bright","http://ipAddress:port/tile/osm-bright/{z}/{x}/{y}/1/png"]
//					];
$forcedTileServer = false;													// if true, only tileservers from above will be shown. Default forced layer will be the first one

/*--------- Self-Hosted OSM Setup ---------*/
/* Tested with Switch2OSM docker setup found at https://switch2osm.org/serving-tiles/using-a-docker-container/ ,should work with any Apache mod_tile based tileserver, adjust URL as needed */
/* SETUP IS RESOURCE INTENSIVE, recommendations+tools at https://github.com/SenorKarlos/switch2OSMinfo */

$osmTileServer = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';		//CUSTOM URL ex: https://your.domain.com/tile/{z}/{x}/{y}.png
$maxNativeZoomOSM = 19;														// Leave at 19 for OSM Servers, or set to your higest rendered zoom level 


/*--------- Style Settings ---------*/
$noDarkMode = false;														// Enable/Disables the Darkmode-Option
$enableDarkMode = 'false';													// Default option for new users

$noPokemonLabelStyles = true;                                   			//enables/disables the choice for users to set their prefered pokemonLabel style
$pokemonLabelStyle = 'v2';                                					// classic, v1, v2,v3(New Years theme)

$noCostumeIcons = true;														// enable/disable costume forms (label only) (Note: only use icon-sets with costumes if using this)

$noMapStyle = false;														// Enables/Disables Mapstyle changing
$mapStyle = 'openstreetmap';                                        		// openstreetmap, darkmatter, styleblackandwhite, styletopo, stylesatellite, stylewikipedia, (tileserver)
																			// For Tileserver adresses also possible: tileservers1, tileservers2 [...]

$noDirectionProvider = false;												// Enables/Disables MapProvider changing
$directionProvider = 'google';                                      		// google, waze, apple, bing, google_pin

$noIconSize = false;														// Enables/Disables Iconsize changing
$iconSize = 0;                                                      		// -8, 0, 10, 20

$noIconNotifySizeModifier = false;											// Enables/Disables Notified Pokemon Iconsize changing
$iconNotifySizeModifier = 15;												// 0, 15, 30, 45

$noLocationStyle = false;													// Enables/Disables LocationStyle changing
$locationStyle = 'none';                                            		// none, google, red, red_animated, blue, blue_animated, yellow, yellow_animated, pokesition, pokeball


/*---------Scantimes Display in Menu---------*/
$noQuestscanInfotext = true;												//Enables/Disables the questscan-info menupoint in the menu
$questscanInfotext = "some text for quest information supporting<br>html";


//-----------------------------------------------------
// Manual Submissions
// In order to make Manual Raids and Quests work you need to have the $geoJSONfile set to a valid geoJSON.json file
//-----------------------------------------------------
$noSubmit = true;
$noDiscordSubmitLogChannel = true;											// Send webhooks to discord channel upon submission
$submitMapUrl = '';
$discordSubmitLogChannelUrl = 'https://discordapp.com/api/webhooks/<yourCHANNELhere>';  // Sends gym/pokestop submit & pokestop rename directly to discord can also be an array ['URL', 'URL'] or as many as you like.
$discordPOISubmitLogChannelUrl = 'https://discordapp.com/api/webhooks/<yourCHANNELhere>';  // Sends POI submit & edits directly to discord can also be an array ['URL', 'URL'] or as many as you like.
$noManualGyms = true;
$noManualPokestops = true;
$noRenamePokestops = true;
$noRenameGyms = true;
$noConvertPokestops = true;
$noManualQuests = true;

//-----------------------------------------------------
// Ingress portals
//-----------------------------------------------------
$enablePortals = 'false';
$enableNewPortals = 0;														// 0: all, 1: new portals only
$noPortals = true;
$noDeletePortal = true;
$noConvertPortal = true;

$markPortalsAsNew = 86400;													// Time in seconds to mark new imported portals as new ( 86400 for 1 day )
$noPoi = true;																// Allow users to view POI markers 
$noAddPoi = true;															// Allow to add POI markers (locations eligible for submitting Pokestops/Ingress portals)
$enablePoi = 'false';
$noDeletePoi = true;
$noMarkPoi = true;
$noEditPoi = true;
/* IMGUR API */
$imgurCID = "";

$pokemonReportTime = false;
$pokemonToExclude = [];

$noDeleteGyms = true;
$noToggleExGyms = true;
$noDeletePokestops = true;

$raidBosses = [1, 4, 7, 129, 138, 140, 147, 82, 108, 125, 126, 185, 303, 65, 68, 95, 106, 107, 123, 135, 142, 76, 112, 131, 143, 248, 359, 144, 145, 146, 377];

$sendWebhook = false;														// Sends Raids & Pokémon. Needs a 3th party program like pokealarm.
$webhookUrl = null;															// ['url-1','url-2']

//---------------------------------------------------
// Quest Webhooks
//---------------------------------------------------
$sendQuestWebhook = false;													// Experimental use only
$questWebhookUrl = null;													// Experimental use only
$webhookSystem = [''];														// Supported either 'pokealarm' or 'poracle'

$manualFiveStar = [
    'webhook' => false,														// If set to false no webhooks will be send on raid_cron.php
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
$noSearchPokestops = true;													// Wont work if $noSearch = true
$noSearchGyms = true;														// Wont work if $noSearch = true
$noSearchManualQuests = false;												// Wont work if $noSearch = true
$noSearchNests = true;
$noSearchPortals = true;
$defaultUnit = "km"; 														// mi/km
$maxSearchResults = 10;														//Max number of search results
$maxSearchNameLength = 0;													// 0 = Unlimited. Shorten pokestop names in reward search results if longer than this value to prevent UI layout issues

//-----------------------------------------------
// Community
// Manualdb required for this feature!
//-----------------------------------------------------
$noCommunity = true;														// Enables/Disables Nests
$enableCommunities = 'false';												//default value for users
$communityDescription = 'Display a text in your Community Container';
$noAddNewCommunity = true;
$noDeleteCommunity = true;
$noEditCommunity = true;

/* Community share configs */
$noWhatsappShareCommunities = true;                                 		// To Disable/Enable the Whatsapp-Share-Function for Communities
$communityShareHeader = "Communities in YOURCITY";							// Displays the first line (bold) of the shared text
$communityShareDescription = "(By ". $mapUrl .")";							// Displays the second line of the shared text
$communityShareFooter = "For more infos visit our Map %0A(Discord needed: ". $discordUrl .")"; // Disyplays the footer under the shared nests


//-----------------------------------------------
// Nests
// When using Madao's Nestscript, only use the first settings
//-----------------------------------------------------
/* Nests configuration */
$noNests = true;															// Enables/Disables Nests
$enableNests = 'false';                                             		// default value for users
$nestJSONfile = 'geofences/nest.json';

/* Nest share configs */
$noWhatsappShareNests = true;                                       		// To Disable/Enable the Whatsapp-Share-Function for Nests
$nestShareHeader = "Nests in YOURCITY";										// Displays the first line (bold) of the shared text
$nestShareDescription = "(By ". $mapUrl .")";								// Displays the second line of the shared text
$nestShareFooter = "For more infos visit our Map %0A(Discord needed: ". $discordUrl .")"; // Disyplays the footer under the shared nests

/* Additional settings (not needed if using Madao's nestscript) */
$excludeNestMons = [2,3,5,6,8,9,11,12,14,15,17,18,20,22,24,26,28,29,30,31,32,33,34,36,38,40,42,44,45,49,51,53,55,57,59,61,62,64,65,67,68,70,71,73,75,76,78,80,82,83,85,87,88,89,91,93,94,97,99,101,103,105,106,107,108,109,110,112,113,114,115,117,119,121,122,128,130,131,132,134,135,136,137,139,142,143,144,145,146,147,148,149,150,151,153,154,156,157,159,160,161,162,163,164,165,166,167,168,169,171,172,173,174,175,176,177,178,179,180,181,182,183,184,186,187,188,189,191,192,194,195,196,197,199,201,204,205,207,208,210,212,214,217,218,219,221,222,223,224,225,228,229,230,232,233,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,253,254,256,257,259,260,262,263,264,265,266,267,268,269,270,271,272,274,275,276,277,279,280,281,282,284,286,287,288,289,290,291,292,293,294,295,297,298,301,303,304,305,306,308,310,313,314,316,317,319,321,323,324,326,327,328,329,330,331,332,334,335,336,337,338,339,340,342,344,346,348,349,350,351,352,354,356,357,358,359,360,361,362,363,364,365,366,367,368,369,371,372,373,374,375,376,377,378,379,380,381,382,383,384,385,386];
$noDeleteNests = true;
$nestCoords = array();														//$nestCoords = array(array('lat1' => 42.8307723529682, 'lng1' => -88.7527692278689, 'lat2' => 42.1339901128552, 'lng2' => -88.0688703020877),array(    'lat1' => 42.8529250952743,'lng1' => -88.1292951067752,'lat2' => 41.7929306950085,'lng2' => -87.5662457903689));

//-----------------------------------------------------
// Areas
//-----------------------------------------------------

$noAreas = true;
$multiAreas = false;														// use multi-area design(to have headers for specific areas - see example below)
$areas = [];                                                        		// [[latitude,longitude,zoom,"name"],[latitude,longitude,zoom,"name"]]
//##SingleArea Example:## In this example you will just have the listed Areas ($multiAreas must be false here)
//$areas = [
//			[0.0,1.1,15,"area1"],
//			[1.0,2.1,15,"area2"],
//		];
//
//##multiArea example:## In this example you will have a area list of 2 points for each header ($multiAreas must be true here)
//$areas = [
//			["Subarea one",
//				[0.1,1.3,15,"subarea point 1"],
//				[0.2,1.4,15,"subarea point 2"]
//			],
//			["Subarea two",
//				[1.0,3.1,15,"subarea(2) point 1"],
//				[2.0,4.1,15,"subarea(2) point 2"]
//			]
//		];
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
$weatherCellsFillOpacity = 0.2;   											// FillOpacity of the weather cells. 10% = 0.1, 20% = 0.2 etc
//-----------------------------------------------------
// MISC
// Only change settings from this block if you know what they exactly do. Use some of them carefully!
//-----------------------------------------------------
/* Counts */
$numberOfPokemon = 890;
$numberOfItem = 1405;
$numberOfGrunt = 50;

/* Anti scrape Settings */
$enableCsrf = true;                                                 		// Don't disable this unless you know why you need to :)
$sessionLifetime = 604800;                                           		// Session lifetime, in seconds - default is 7 days now to prevent daily logouts
$blockIframe = true;                                                		// Block your map being loaded in an iframe

/* Zoom and Cluster Settings */
$maxLatLng = 1;                                                     		// Max latitude and longitude size (1 = ~110km, 0 to disable)
$maxZoomOut = 11;                                                   		// Max zoom out level (11 ~= $maxLatLng = 1, 0 to disable, lower = the further you can zoom out)
$maxZoomIn = 18;                                                    		// Max zoom in level 18
$disableClusteringAtZoom = 0;												// Disable clustering above this value. 0 to disable
$zoomToBoundsOnClick = 15;													// Zoomlevel on clusterClick
$maxClusterRadius = 30;														// The maximum radius that a cluster will cover from the central marker (in pixels).
$spiderfyOnMaxZoom = 'true';												// Spiderfy cluster markers on click

/* Google Settings & Analytics  */
$gmapsKey = "";																// ONLY USED FOR TILE LAYERS
$gAnalyticsId = "";															// "" for empty, "UA-XXXXX-Y" add your Google Analytics tracking ID

/* Mapbox */												
$mBoxKey = "";														//mapbox key

/* Piwik Analytics */
$piwikUrl = "";
$piwikSiteId = "";

/* Favicon */
$faviconPath = '';                                                  		// Upload favicon.ico to custom folder, leave '' for empty ( $faviconPath = 'custom/favicon.ico'; )

/* StatsToggle */
$noStatsToggle = false;                                             		// Enables or disables the stats button in the header.

/* Access-config Settings */
$accessLevelsInherit = false;												// Choose if the levels in the access-level config inherit access configurations from lower levels
																			// If true, the access level will inherit from the last updated configuration
																			// example: standard config: $noPokemon = false; -- accesslevel 0: $noPokemon = true; -- accesslevel 1: $noPokemon is unset: will inherit from accesslevel 0 instead of standard config.
/* Popup handling */
$openPopupOnHovering = false;                                       		// For Desktop version: if the popups/labels should be opened upon hovering
$onlyOnePopup = true;                                               		// Only allow one popup at once (recommended hover-opening false)

/* Debugging */
$enableDebug = false;

//-----------------------------------------------------
// Holiday Overlay
//-----------------------------------------------------

$letItSnow = true;                                                   		// Show snow overlay at 24, 25 and 26 December
$makeItBang = true;                                                  		// Show fireworks overlay at 31 December
$valentine = true;                                                   		// Show Hearts on Valentines Day (Feb 14)
$valentineSettings = [
    25,			// maxHeight
    25,			// maxWidth
    40,     	// maxAmount
    0.4         // minScale
];
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
    //'port' => 5432,                                               		// Comment out if not needed, just add // in front!
    //'socket' => /path/to/socket/,
]);

//$manualdb = new Medoo([// required
//    'database_type' => 'mysql',
//    'database_name' => 'rdmdb',
//    'server' => '127.0.0.1',
//    'username' => 'database_user',
//    'password' => 'database_password',
//    'charset' => 'utf8mb4',
//
//    // //(optional)
//    //'port' => 5432,                                               		// Comment out if not needed, just add // in front!
//    //'socket' => /path/to/socket/,
//]);

if(file_exists('config/access-config.php'))
    include 'config/access-config.php';
