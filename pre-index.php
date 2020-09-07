<?php
if ( ! file_exists( 'config/config.php' ) ) {
	http_response_code( 500 );
	die( "<h1>Config file missing</h1><p>Please ensure you have created your config file (<code>config/config.php</code>).</p>" );
}
include( 'config/config.php' );
$zoom        = ! empty( $_GET['zoom'] ) ? $_GET['zoom'] : null;
$encounterId = ! empty( $_GET['encId'] ) ? $_GET['encId'] : null;
if ( ! empty( $_GET['lat'] ) && ! empty( $_GET['lon'] ) ) {
    $startingLat = $_GET['lat'];
    $startingLng = $_GET['lon'];
    $locationSet = 1;
} else {
    $locationSet = 0;
}
if ( $blockIframe ) {
    header( 'X-Frame-Options: DENY' );
}
$getList = new \Scanner\RDM();
?>
<!DOCTYPE html>
<html lang="<?= $locale ?>">
<head>
    <meta charset="utf-8">
    <title><?= $title ?></title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, minimal-ui">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="apple-mobile-web-app-title" content="PokeMap">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="theme-color" content="#3b3b3b">
    <!-- Favicon -->
    <?php
    if ( $faviconPath != "" ) {
       echo '<link rel="shortcut icon" href="' . $faviconPath . '" type="image/x-icon">';
    } else {
       echo '<link rel="shortcut icon" href="static/appicons/favicon.ico" type="image/x-icon">';
    }
    ?>
    <link rel="apple-touch-icon" href="static/appicons/114x114.png" sizes="57x57"> <!-- non-retina iPhone pre iOS 7 -->
    <link rel="apple-touch-icon" href="static/appicons/144x144.png" sizes="72x72"> <!-- non-retina iPad pre iOS 7 -->
    <link rel="apple-touch-icon" href="static/appicons/152x152.png" sizes="76x76"> <!-- non-retina iPad iOS 7 -->
    <link rel="apple-touch-icon" href="static/appicons/114x114.png" sizes="114x114"> <!-- retina iPhone pre iOS 7 -->
    <link rel="apple-touch-icon" href="static/appicons/120x120.png" sizes="120x120"> <!-- retina iPhone iOS 7 -->
    <link rel="apple-touch-icon" href="static/appicons/144x144.png" sizes="144x144"> <!-- retina iPad pre iOS 7 -->
    <link rel="apple-touch-icon" href="static/appicons/152x152.png" sizes="152x152"> <!-- retina iPad iOS 7 -->
    <link rel="apple-touch-icon" href="static/appicons/180x180.png" sizes="180x180"> <!-- retina iPhone 6 iOS 7 -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/list.js/1.5.0/list.js"></script>
    <?php
    function pokemonFilterImages( $noPokemonNumbers, $onClick = '', $pokemonToExclude = array(), $num = 0 ) {
        global $mons, $copyrightSafe, $iconRepository;
        if (empty($mons)) {
            $json = file_get_contents( 'static/dist/data/pokemon.min.json' );
            $mons = json_decode( $json, true );
        }
        echo '<div class="pokemon-list-cont" id="pokemon-list-cont-' . $num . '"><input type="hidden" class="search-number" value="' . $num . '" /><input class="search search-input" placeholder="' . i8ln( "Search Name, ID & Type" ) . '" /><div class="pokemon-list list">';
        $i = $z = 0;
        foreach ( $mons as $k => $pokemon ) {
            $type = '';
            $name = $pokemon['name'];
            foreach ( $pokemon['types'] as $t ) {
                $type .= $t['type'];
            }
            if ( ! in_array( $k, $pokemonToExclude ) ) {
                if ( $k > 890 ) {
                    break;
				}
				if ( $k <= 9 ) {
                    $id = "00$k";
                } else if ( $k <= 99 ) {
                    $id = "0$k";
                } else {
                    $id = $k;
				}
				if (!$copyrightSafe) {
                    echo '<span class="pokemon-icon-sprite" data-value="' . $k . '" onclick="' . $onClick . '"><span style="display:none" class="types">' . i8ln( $type ) . '</span><span style="display:none" class="name">' . i8ln( $name ) . '</span><span style="display:none" class="id">$k</span><img src="' . $iconRepository . 'pokemon_icon_' . $id . '_00.png" style="width:48px;height:48px;"/>';
				} else {
                    echo '<span class="pokemon-icon-sprite" data-value="' . $k . '" onclick="' . $onClick . '"><span style="display:none" class="types">' . i8ln( $type ) . '</span><span style="display:none" class="name">' . i8ln( $name ) . '</span><span style="display:none" class="id">$k</span><img src="static/icons-safe/pokemon_icon_' . $id . '_00.png" style="width:48px;height:48px;"/>';
                }
                if (!$noPokemonNumbers) {
                    echo "<span class='pokemon-number'>" . $k . "</span>";
                }
                echo "</span>";
            }
        }
        echo '</div></div>';
        ?>
        <script>
            var options = {
                valueNames: ['name', 'types', 'id']
            };
            var monList = new List('pokemon-list-cont-<?php echo $num;?>', options);
        </script>
        <?php
    }
    function itemFilterImages($noItemNumbers, $onClick = '', $itemsToExclude = array(), $energyToExclude = array(), $num = 0) {
        global $items, $copyrightSafe, $iconRepository, $rewardsIconsRepository;
        if (empty($items)) {
            $json = file_get_contents( 'static/dist/data/items.min.json' );
            $items = json_decode( $json, true );
        }
        echo '<div class="item-list-cont" id="item-list-cont-' . $num . '"><input type="hidden" class="search-number" value="' . $num . '" /><input class="search search-input" placeholder="' . i8ln( "Search Name & ID" ) . '" /><div class="item-list list">';
        $i = $z = 0;
        foreach ($items as $k => $item) {
            $name = $item['name'];

            if (!in_array( $k, $itemsToExclude)) {
				if (!$copyrightSafe) {
                    echo '<span class="item-icon-sprite" data-value="' . $k . '" onclick="' . $onClick . '"><span style="display:none" class="name">' . i8ln( $name ) . '</span><span style="display:none" class="id">$k</span><img src="' . $rewardsIconsRepository . 'rewards/reward_' . $k . '_1.png" style="width:48px;height:48px;"/>';
				} else {
                    echo '<span class="item-icon-sprite" data-value="' . $k . '" onclick="' . $onClick . '"><span style="display:none" class="name">' . i8ln( $name ) . '</span><span style="display:none" class="id">$k</span><img src="static/icons-safe/rewards/reward_' . $k . '_1.png" style="width:48px;height:48px;"/>';
                }
                if (!$noItemNumbers) {
                    echo '<span class="item-number">' . $k . '</span>';
                }
                echo "</span>";
            }
			
        }
        echo '</div></div>';
        ?>
        <script>
            var options = {
                valueNames: ['name', 'id']
            };
            var itemList = new List('item-list-cont-<?php echo $num;?>', options);
        </script>
        <?php
    }
    function energyFilterImages($noEnergyNumbers,$onClick = '', $energyToExclude = array(), $num = 0) {
        global $copyrightSafe, $iconRepository, $rewardsIconsRepository;
		$energyPokemonIds = [3,6,9,18,15,94,115,127,130,142,150,181,208,212,214,229,248,254,257,260,282,302,303,306,308,310,319,323,328,334,354,359,362,373,376,380,381,384,445,448,460,475,531,849];

        echo '<div class="energy-list-cont" id="energy-list-cont-' . $num . '"><input type="hidden" class="search-number" value="' . $num . '" /><input class="search search-input" placeholder="' . i8ln( "Search Name & ID" ) . '" /><div class="energy-list list">';
        foreach ($energyPokemonIds as $energy_pokemon_id) {
            if (!in_array( $energy_pokemon_id, $energyToExclude)) {
				echo $energy_pokemon_id;
				if (!$copyrightSafe) {
                    echo '<span class="energy-icon-sprite" data-value="' . $energy_pokemon_id . '" onclick="' . $onClick . '"><span style="display:none" class="name">' . i8ln( 'Mega Energy' ) . '</span><span style="display:none" class="id">$energy_pokemon_id</span><img src="' . $rewardsIconsRepository . 'rewards/mega_energy/reward_mega_energy_' . $energy_pokemon_id . '.png" style="width:48px;height:48px;"/>';
				} else {
                    echo '<span class="energy-icon-sprite" data-value="' . $energy_pokemon_id . '" onclick="' . $onClick . '"><span style="display:none" class="name">' . i8ln( 'Mega Energy' ) . '</span><span style="display:none" class="id">$energy_pokemon_id</span><img src="static/icons-safe/rewards/mega_energy/reward_mega_energy_' . $energy_pokemon_id . '.png" style="width:48px;height:48px;"/>';
                }
                if (!$noEnergyNumbers) {
                    echo '<span class="energy-number">' . $energy_pokemon_id . '</span>';
                }
                echo "</span>";
            }
        }
        echo '</div></div>';
        ?>
        <script>
            var options = {
                valueNames: ['name, id']
            };
            var energyList = new List('energy-list-cont-<?php echo $num;?>', options);
        </script>
        <?php
    }
    function gruntFilterImages($noGruntNumbers, $onClick = '', $gruntsToExclude = array(), $num = 0) {
        global $grunts;
        if (empty($grunts)) {
            $json = file_get_contents('static/dist/data/grunttype.min.json');
            $grunts = json_decode($json, true);
        }
        echo '<div class="grunt-list-cont" id="grunt-list-cont-' . $num . '"><input type="hidden" class="search-number" value="' . $num . '" /><input class="search search-input" placeholder="' . i8ln("Search Name & ID") . '" /><div class="grunt-list list">';
        $i = $z = 0;
        foreach ($grunts as $g => $grunt) {
            $type = $grunt['type'];
            $gender = $grunt['grunt'];
            if (! in_array($g, $gruntsToExclude)) {
                echo '<span class="grunt-icon-sprite" data-value="' . $g . '" onclick="' . $onClick . '"><span style="display:none" class="gender">' . i8ln($gender) . '</span><span style="display:none" class="type">' . i8ln($type) . '</span><span style="display:none" class="id">' . $g . '</span><img src="static/forts/gruntType/' . $g . '.png" style="width:48px;height:48px;"/>';
                if (! $noGruntNumbers) {
                    echo '<span class="grunt-number">' . $g . '</span>';
                }
                echo "</span>";
            }
        }
        echo '</div></div>'; ?>
        <script>
            var options = {
                valueNames: ['type', 'gender', 'id']
            };
            var gruntList = new List('grunt-list-cont-<?php echo $num; ?>', options);
        </script>
        <?php
    }
	function raidbossFilterImages($noRaidfilterListNumbers, $onClick = '', $raidbossesToExclude = array(), $num = 0){
        global $raids, $copyrightSafe, $iconRepository;
        if (empty($raids)) {
            $json = file_get_contents('static/dist/data/pokemon.min.json');
            $raidbosses = json_decode($json, true);
        }
        echo '<div class="raidboss-list-cont" id="raidboss-list-cont-' . $num . '"><input type="hidden" class="search-number" value="' . $num . '" /><input class="search search-input" placeholder="' . i8ln("Search Name & ID") . '" /><div class="raidboss-list list">';
        $i = $z = 0;
        foreach ($raidbosses as $rb => $raidboss) {
            $type = '';
            $name = $raidboss['name'];
            foreach ( $raidboss['types'] as $t ) {
                $type .= $t['type'];
            }
            if (! in_array($rb, $raidbossesToExclude)) {
                if ($rb > 649) {
                    break;
				}
				if ($rb <= 9) {
                    $id = "00$rb";
                } else if ($rb <= 99) {
                    $id = "0$rb";
                } else {
                    $id = $rb;
				}
				if (!$copyrightSafe) {
                    echo '<span class="raidboss-icon-sprite" data-value="' . $rb . '" onclick="' . $onClick . '"><span style="display:none" class="types">' . i8ln( $type ) . '</span><span style="display:none" class="name">' . i8ln( $name ) . '</span><span style="display:none" class="id">' . $id . '</span><img src="' . $iconRepository . 'pokemon_icon_' . $id . '_00.png" style="width:48px;height:48px;"/>';
				} else {
                    echo '<span class="raidboss-icon-sprite" data-value="' . $rb . '" onclick="' . $onClick . '"><span style="display:none" class="types">' . i8ln( $type ) . '</span><span style="display:none" class="name">' . i8ln( $name ) . '</span><span style="display:none" class="id">' . $id . '</span><img src="static/icons-safe/pokemon_icon_' . $id . '_00.png" style="width:48px;height:48px;"/>';
                }
                if (!$noRaidfilterListNumbers) {
                    echo '<span class="raidboss-number">' . $rb . '</span>';
                }
                echo "</span>";
            }
        }
        echo '</div></div>'; ?>
        <script>
            var options = {
                valueNames: ['name', 'types', 'id']
            };
            var raidbossList = new List('raidboss-list-cont-<?php echo $num; ?>', options);
        </script>
        <?php
    }
	function raidEggsFilterImages($noRaidfilterListNumbers, $onClick = '', $raidEggsToExclude = array(), $num = 0){
        global $raids, $copyrightSafe, $iconRepository;
        echo '<div class="raidbeggs-list-cont" id="raideggs-list-cont-' . $num . '"><input type="hidden" class="search-number" value="' . $num . '" /><input class="search search-input" placeholder="' . i8ln("Search Level") . '" /><div class="raideggs-list list">';
        $i = $z = 0;
		for ($e = 1; $e <= 6; $e++) {
			$level = $e;
            if (!in_array($e, $raidEggsToExclude)) {
                echo '<span class="raideggs-icon-sprite" data-value="' . $e . '" onclick="' . $onClick . '"><span style="display:none" class="level">' . $level . '</span><img src="static/raids/egg_' . $level . '.png" style="width:48px;height:56px;"/>';
                if (!$noRaidfilterListNumbers) {
                    echo '<span class="raidboss-number">' . $e . '</span>';
                }
                echo "</span>";
            }
		}
        echo '</div></div>'; ?>
        <script>
            var options = {
                valueNames: ['level']
            };
            var raideggsList = new List('raideggs-list-cont-<?php echo $num; ?>', options);
        </script>
        <?php
    }
    if ( $gAnalyticsId != "" ) { // Google Analytics
        echo '<script>
				window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
				ga("create", "' . $gAnalyticsId . '", "auto");
				ga("send", "pageview");
			</script>
            <script async src="https://www.google-analytics.com/analytics.js"></script>';
    }
    if ( $piwikUrl != "" && $piwikSiteId != "" ) { // Piwik
        echo '<script type="text/javascript">
				var _paq = _paq || [];
				_paq.push(["trackPageView"]);
				_paq.push(["enableLinkTracking"]);
				(function() {
					var u="//' . $piwikUrl . '/";
					_paq.push(["setTrackerUrl", u+"piwik.php"]);
					_paq.push(["setSiteId", "' . $piwikSiteId . '"]);
					var d=document, g=d.createElement("script"), s=d.getElementsByTagName("script")[0];
					g.type="text/javascript"; g.async=true; g.defer=true; g.src=u+"piwik.js"; s.parentNode.insertBefore(g,s);
				})();
            </script>';
    }
    ?>
    <script>
        var token = '<?php echo ( ! empty( $_SESSION['token'] ) ) ? $_SESSION['token'] : ""; ?>';
    </script>
    <link href="node_modules/leaflet-geosearch/assets/css/leaflet.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.0/jquery-ui.min.css">
    <link rel="stylesheet" href="node_modules/datatables/media/css/jquery.dataTables.min.css">
    <script src="static/js/vendor/modernizr.custom.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css"> <!-- Toastr -->
    <link rel="stylesheet" href="node_modules/leaflet/dist/leaflet.css" /> <!-- Leaflet -->
    <link rel="stylesheet" href="static/dist/css/app.min.css">
    <link rel="stylesheet" href="node_modules/leaflet.markercluster/dist/MarkerCluster.css" />
    <link rel="stylesheet" href="node_modules/leaflet.markercluster/dist/MarkerCluster.Default.css" />
    <link href='static/css/leaflet.fullscreen.css' rel='stylesheet' />
    <?php if (file_exists('static/css/custom.css')) {
		if(!$noCustomCss){
			echo '<link rel="stylesheet" href="static/css/custom.css?' . time() . '">';
		}
	} ?>
	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous"> <!-- font awesome -->
</head>
<?php
if (!$noLoadingScreen) {
    echo '<app-root><p class="spinner" VALIGN="CENTER">';
    if ($loadingStyle == '') {
        $loadingStyle = '<i class="fa fas fa-cog fa-spin fa-2x" aria-hidden="true"></i>';
    }
    echo $loadingStyle . '&nbsp;' . i8ln('Loading') . '...</p></app-root>';
} ?>
<body id="top">
	<div class="wrapper">
		<!-- Header -->
		<header id="header" style = "background-image: <?php echo $overlayDesign ?>">
			<a href="#nav"><b><span class="label" style="color:white"><?php echo i8ln('Menu') ?></span></b></a>
			<h1><a href="#"><?= $title ?><img src="<?= $raidmapLogo ?>" height="35" width="auto" border="0" style="float: right; margin-left: 5px; margin-top: 10px;"></a></h1>
			<?php
			if ( $discordUrl != "" ) {
				echo '<a href="' . $discordUrl . '" target="_blank" style="margin-bottom: 5px; vertical-align: middle;padding:0 2px;">
					<img src="static/images/header/discord126x.png" border="0" style="float: right; width: 42px; height: auto;">
				</a>';
			}
			if ( $telegramUrl != "" ) {
				echo '<a href="' . $telegramUrl . '" target="_blank" style="margin-bottom: 5px; vertical-align: middle;padding:0 2px;">
					<img src="static/images/header/telegram126x.png" border="0" style="float: right; width: 42px; height: auto;">
				</a>';
			}
			if ( $paypalUrl != "" ) {
				echo '<a href="' . $paypalUrl . '" target="_blank" style="margin-bottom: 5px; vertical-align: middle; padding:0 2px;">
					<img src="static/images/header/paypal126x.png" border="0" alt="Donate" style="float: right;width: 42px; height: auto;">
				</a>';
			}
			if (!$noWeatherOverlay) {
				echo '<div id="currentWeather"></div>';
			}
			if ($noNativeLogin === false || $noDiscordLogin === false) {
				if (isset($_COOKIE["LoginCookie"])) {
					if (validateCookie($_COOKIE["LoginCookie"]) === false) {
						header("Location: .");
					}
				}
				if (!empty($_SESSION['user']->id)) {
					$info = $manualdb->query(
						"SELECT expire_timestamp FROM users WHERE id = :id AND login_system = :login_system", [
							":id" => $_SESSION['user']->id,
							":login_system" => $_SESSION['user']->login_system
						]
					)->fetch();
	
					$_SESSION['user']->expire_timestamp = $info['expire_timestamp'];
	
					if (($noNativeLogin === false || $noDiscordLogin === false) && $info['expire_timestamp'] > time()) {
					//If the session variable does not exist, presume that user suffers from a bug and access config is not used.
					//If you don't like this, help me fix it.
						if (!isset($_SESSION['already_refreshed'])) {
							$refreshAfter = 2; //Number of seconds to refresh the page after.
							header('Refresh: ' . $refreshAfter); //Send a Refresh header.
							$_SESSION['already_refreshed'] = true; //Set the session variable so that we don't refresh again.
						}
					}
	
					if (!empty($_SESSION['user']->updatePwd) && $_SESSION['user']->updatePwd === 1) {
						header("Location: ./user");
						die();
					}
	
					if ($info['expire_timestamp'] < time()) {
						header('Location: ./logout.php');
					}
					$userAccessLevel = $manualdb->get( "users", [ 'access_level' ], [ 'expire_timestamp' => $_SESSION['user']->expire_timestamp ] );
					if ($userAccessLevel['access_level'] >= 3) {
						echo "<span style='color: green;'><i class='fa fa-check fa-fw'></i><i class='fa fa-unlock-alt fa-fw' style='font-weight:normal;'></i></span>";
					} elseif ($userAccessLevel['access_level'] == 2) {
						echo "<span style='color: green;'><i class='fa fa-check fa-fw'></i><i class='fa fa-pencil fa-fw' style='font-weight:normal;'></i></span>";
					} elseif ($userAccessLevel['access_level'] == 1) {
						echo "<span style='color: green;'><i class='fa fa-check fa-fw'></i></span>";
					} elseif ($userAccessLevel['access_level'] == 0) {
						echo "<span style='color: yellow;'><i class='fa fa-check fa-fw'></i></span>";
					} else{
						echo "<span style='color: red;'><i class='fa fa-times fa-fw'></i></span>";
					}
				} elseif ($forcedDiscordLogin === true) {
					header("Location: ./discord-login");
				} else {
					echo "<a href='./user' style='display:inline;border: 1px solid white;border-radius:6px;padding:2px 6px 2px 6px;font-weight:bold;'> Login </a>";
				}
			}
			if ( ! $noStatsToggle ) {
            ?>
			<a href="#stats" id="statsToggle" class="statsNav" style="float: right;">
				<span class="label"><?php echo i8ln( 'Stats' ) ?></span>
			</a>
            <?php
			} ?>
		</header>
    <!-- NAV -->
    <nav id="nav">
        <div id="nav-accordion">
            <?php
            if ( ! $noPokemon || ! $noNests ) {
                if ( ! $noNests && ! $noPokemon) {
					echo '<h3 style="font-weight: bold;"><i class="fa fa-map-marker fa-fw"></i>&nbsp;' . i8ln("Pokemon") . ' &amp; ' . i8ln("Nests") . '</h3>';
                } else if (!$noNests){ 
					echo '<h3 style="font-weight: bold;"><i class="fa fa-map-marker fa-fw"></i>&nbsp;' . i8ln("Nests") . '</h3>';
                } else if (!$noPokemon){ 
					echo '<h3 style="font-weight: bold;"><i class="fa fa-map-marker fa-fw"></i>&nbsp;' . i8ln("Pokemon") . '</h3>';
				}
				?>
                <div>
                <?php
                if ( ! $noNests ) {
                    echo '<div class="form-control switch-container" style="float:none;height:35px;margin-bottom:0px;">
						<h3>' . i8ln("Nests") . '</h3>
						<div class="onoffswitch">
							<input id="nests-switch" type="checkbox" name="nests-switch" class="onoffswitch-checkbox" checked>
							<label class="onoffswitch-label" for="nests-switch">
								<span class="switch-label" data-on="On" data-off="Off"></span>
								<span class="switch-handle"></span>
							</label>
						</div>
					</div>
					<div id="nests-content-wrapper" style="display:none">';
					if(!$noWhatsappShareNests){
						echo '
						<div>
							<center>
								<u><h3 style="margin:0 0 0.5em 0;"> ' . i8ln("Share Nests(Whatsapp)") . '</h3></u>
								<a class="settings btn-share-whatsapp" id="shareNests0" href="#" data-action="share/whatsapp/share" onclick="shareNestsWhatsapp(0,\''. $nestShareHeader .'\',\''. $nestShareDescription .'\',\''. $nestShareFooter .'\')">
									<span style="float:left;"><i class="fa fa-upload" aria-hidden="true"></i></span>' . i8ln("Park") . ', ' . i8ln("Species") . '
								</a>
								<a class="settings btn-share-whatsapp" id="shareNests1" href="#" data-action="share/whatsapp/share" onclick="shareNestsWhatsapp(1,\''. $nestShareHeader .'\',\''. $nestShareDescription .'\',\''. $nestShareFooter .'\')">
									<span style="float:left;"><i class="fa fa-upload" aria-hidden="true"></i></span>' . i8ln("Park") . ', ' . i8ln("Species") . ', ' . i8ln("Adress") . '
								</a>
								<a class="settings btn-share-whatsapp" id="shareNests2" href="#" data-action="share/whatsapp/share" onclick="shareNestsWhatsapp(2,\''. $nestShareHeader .'\',\''. $nestShareDescription .'\',\''. $nestShareFooter .'\')">
									<span style="float:left;"><i class="fa fa-upload" aria-hidden="true"></i></span> ' . i8ln("Park") . ', ' . i8ln("Species") . ', ' . i8ln("Amount") . '
								</a>
								<a class="settings btn-share-whatsapp" id="shareNests3" href="#" data-action="share/whatsapp/share" onclick="shareNestsWhatsapp(3,\''. $nestShareHeader .'\',\''. $nestShareDescription .'\',\''. $nestShareFooter .'\')">
									<span style="float:left;"><i class="fa fa-upload" aria-hidden="true"></i></span> ' . i8ln("Park") . ', ' . i8ln("Spec.") . ', ' . i8ln("Adr.") . ', ' . i8ln("Amount") . '
								</a>
							</center>
						</div>
						<div>
							<b>' . i8ln("Info") . ':</b> ' . i8ln("Only current visible nests on the map will be shared.") . '
						</div>
						<hr style="margin:0px;margin-top:10px" />';
					}
					echo '
					</div>
				';
                } ?>
				<?php
				if ( ! $noMultipleRepos ) {
				echo '<div class="form-control switch-container" style="float:none;height:35px;margin-bottom:35px;">
					<h3> ' . i8ln("Icon Style") . '</h3>';
					$count = sizeof( $iconRepos );
					if ( $count > 0 ) {
						echo '
						<div>
							<select name="icon-style" id="icon-style">';
						for ( $i = 0; $i <= $count - 1; $i ++ ) {
							echo '<option value="'. $iconRepos[$i][1] .'">'. $iconRepos[$i][0] .'</option>';
						}
						echo '</select>
						</div>
						</div>';
					} else{
						echo '</div>';
						echo '<div><p>' . i8ln("404 No Icon Packs found") . '</p></div>';
					}
				}
				?>
                <?php
                if ( ! $noPokemon ) {
                    echo '<div class=" form-control switch-container" style="float:none;height:35px;margin-bottom:0px;">
                    <h3>' . i8ln("Pokemon") . '</h3>
                    <div class="onoffswitch">
                        <input id="pokemon-switch" type="checkbox" name="pokemon-switch" class="onoffswitch-checkbox"
                               checked>
                        <label class="onoffswitch-label" for="pokemon-switch">
                            <span class="switch-label" data-on="On" data-off="Off"></span>
                            <span class="switch-handle"></span>
                        </label>
                    </div>
				</div>';
                } ?>
                    <div id="pokemon-filter-wrapper" style="display:none">
                        <?php
                        if ( ! $noTinyRat ) {
                            ?>
                            <div class="form-control switch-container">
                                <font size="3"><?php echo i8ln( 'Tiny Rats' ) ?></font>
                                <div class="onoffswitch">
                                    <input id="tiny-rat-switch" type="checkbox" name="tiny-rat-switch"
                                           class="onoffswitch-checkbox" checked>
                                    <label class="onoffswitch-label" for="tiny-rat-switch">
                                        <span class="switch-label" data-on="On" data-off="Off"></span>
                                        <span class="switch-handle"></span>
                                    </label>
                                </div>
                            </div>
                            <?php
                        } ?>
                        <?php
                        if ( ! $noBigKarp ) {
                            ?>
                            <div class="form-control switch-container">
                                <font size="3"><?php echo i8ln( 'Big Karp' ) ?></font>
                                <div class="onoffswitch">
                                    <input id="big-karp-switch" type="checkbox" name="big-karp-switch"
                                           class="onoffswitch-checkbox" checked>
                                    <label class="onoffswitch-label" for="big-karp-switch">
                                        <span class="switch-label" data-on="On" data-off="Off"></span>
                                        <span class="switch-handle"></span>
                                    </label>
                                </div>
                            </div>
                            <?php
                        } ?>
                        <?php
                        if ( ! $noWeatherIcons ) {
                            ?>
                            <div class="form-control switch-container">
                                <font size="3"><?php echo i8ln( 'Weather Icons' ) ?></font>
                                <div class="onoffswitch">
                                    <input id="weather-icon-switch" type="checkbox" name="weather-icon-switch" class="onoffswitch-checkbox" checked>
                                    <label class="onoffswitch-label" for="weather-icon-switch">
                                        <span class="switch-label" data-on="On" data-off="Off"></span>
                                        <span class="switch-handle"></span>
                                    </label>
                                </div>
                            </div>
                            <?php
                        }
                        if (! $noHighLevelData && ! $noPokeIVIcons ) {
                            ?>
                            <div class="form-control switch-container">
                                <font size="3"><?php echo i8ln( 'IV Icons' ) ?></font>
                                <div class="onoffswitch">
                                    <input id="iv-icon-switch" type="checkbox" name="iv-icon-switch" class="onoffswitch-checkbox">
                                    <label class="onoffswitch-label" for="iv-icon-switch">
                                        <span class="switch-label" data-on="On" data-off="Off"></span>
                                        <span class="switch-handle"></span>
                                    </label>
                                </div>
                            </div>
                            <?php
                        }
                        if (! $noHighLevelData && ! $noPokePVPStats ) {
                            ?>
                            <div class="form-control switch-container">
                                <font size="3"><?php echo i8ln( 'PVP Stats' ) ?></font>
                                <div class="onoffswitch">
                                    <input id="pvp-stats-switch" type="checkbox" name="pvp-stats-switch" class="onoffswitch-checkbox">
                                    <label class="onoffswitch-label" for="pvp-stats-switch">
                                        <span class="switch-label" data-on="On" data-off="Off"></span>
                                        <span class="switch-handle"></span>
                                    </label>
                                </div>
                            </div>
                            <?php
                        } ?>
                        <div class="form-row min-stats-row">
                            <?php
                            if ( ! $noMinIV ) {
                                echo '<div class="form-control" >
									<label for="min-iv">
										<h3>' . i8ln("Min. IV") . '</h3>
										<input id="min-iv" type="number" min="0" max="100" name="min-iv" placeholder="' . i8ln( 'Min IV' ) . '"/>
									</label>
								</div>';
                            }
                            if ( ! $noMinLevel ) {
                                echo '<div class="form-control">
									<label for="min-level">
										<h3>' . i8ln("Min. Lvl") . '</h3>
										<input id="min-level" type="number" min="0" max="100" name="min-level" placeholder="' . i8ln( 'Min Lvl' ) . '"/>
									</label>
								</div>';
                            }
							?>
                        </div>
                        <div class="form-row min-stats-row">
                            <?php
                            if ( ! $noMinPVPPerc ) {
                                echo '<div class="form-control">
									<label for="min-pvp">
										<h3>' . i8ln("Min. PVP %") . '</h3>
										<input id="min-pvp" type="number" min="0" max="100" name="min-pvp" placeholder="' . i8ln( 'Min PVP %' ) . '"/>
									</label>
								</div>';
                            }
							?>
                        </div>
                        <div id="tabs">
                            <ul>
                                <?php
                                if ( ! $noHidePokemon ) {
                                    echo '<li><a href="#tabs-1">' . i8ln("Hide") . '</a></li>';
                                } ?>
                                <?php
                                if ( ! $noExcludeMinIV ) {
                                    echo '<li><a href="#tabs-2">' . i8ln("Ign. Min IV/Lvl") . '</a></li>';
                                } ?>
                            </ul>
                            <?php
                            if ( ! $noHidePokemon ) {
                                ?>
                                <div id="tabs-1">
                                    <div class="form-control hide-select-2">
                                        <label for="exclude-pokemon">
                                            <div class="pokemon-container">
                                                <input id="exclude-pokemon" type="text" readonly="true">
                                                <?php
                                                pokemonFilterImages( $noPokemonNumbers, '', [], 2 ); ?>
                                            </div>
											<?php
											echo '
											<a href="#" class="select-all">' . i8ln("All") . '</a>
											<a href="#" class="hide-all">' . i8ln('None') . '</a>';
											?>
                                        </label>
                                    </div>
                                </div>
                                <?php
                            } ?>
                            <?php
                            if ( ! $noExcludeMinIV ) {
                                ?>
                                <div id="tabs-2">
                                    <div class="form-control hide-select-2">
                                        <label for="exclude-min-iv">
                                            <div class="pokemon-container">
                                                <input id="exclude-min-iv" type="text" readonly="true">
                                                <?php
                                                pokemonFilterImages( $noPokemonNumbers, '', [], 3 ); ?>
                                            </div>
											<?php
											echo '
											<a href="#" class="select-all">' . i8ln("All") . '</a>
											<a href="#" class="hide-all">' . i8ln('None') . '</a>';
											?>
                                        </label>
                                    </div>
                                </div>
                                <?php
                            } ?>
                        </div>
                    </div>
					<?php
					if(!$noPokemon){
						echo '<p style="font-size:13px">
						<br>'
						 . i8ln("The more Pokemon you hide, the less traffic the map will use and loading time will be faster.") . '<br><br>';
						if( !$noHighLevelData && !$noExcludeMinIV){
							echo i8ln("At 'Ign. Min IV/Lvl' you can select Pokemon that will ignore the level & iv filter.'");
						}
						echo '</p>';
					} ?>

                </div>
                <?php
            }
            ?>
            <?php
			if ( ! $noPokestops ) {
				if ( ! $noQuests ) {
					echo '<h3 style="font-weight: bold"><i class="fa fa-map-pin fa-fw"></i>&nbsp;' . i8ln("Pokestops") . ' &amp; ' . i8ln("Quests") . '</h3>';
				} else {
					echo '<h3 style="font-weight: bold"><i class="fa fa-map-pin fa-fw"></i>&nbsp;' . i8ln("Stops") . '</h3>';
				}
				?>
				<div>
					<?php
					if ( ! $noPokestops ) {
						echo '
						<div class="form-control switch-container" style="float:none;height:35px;margin-bottom:0px;">
							<h3>' . i8ln("Pokestops") . '</h3>
							<div class="onoffswitch">
							<input id="pokestops-switch" type="checkbox" name="pokestops-switch" class="onoffswitch-checkbox" checked>
								<label class="onoffswitch-label" for="pokestops-switch">
									<span class="switch-label" data-on="On" data-off="Off"></span>
									<span class="switch-handle"></span>
								</label>
							</div>
						</div>';
					} ?>
					<div id="pokestops-filter-wrapper" style="display:none">
						<?php
						if ( ! $noLures ) {
							echo '
							<div class="form-control switch-container" style="float:none;height:35px;margin-bottom:0px;">
								<font size="3">' . i8ln("Only Lures") . '</font>
								<div class="onoffswitch">
								<input id="lures-switch" type="checkbox" name="lures-switch" class="onoffswitch-checkbox" checked>
									<label class="onoffswitch-label" for="lures-switch">
										<span class="switch-label" data-on="On" data-off="Off"></span>
										<span class="switch-handle"></span>
									</label>
								</div>
							</div>
							<hr style="padding:0px;margin:10px;" />';
						} ?>
						<?php
						if ( ! $noRocketInvasions ) {
							echo '
							<div class="form-control switch-container" style="float:none;height:35px;margin-bottom:0px;">
								<font size="3">' . i8ln("Only Team Rocket") . '</font>
								<div class="onoffswitch">
									<input id="invasions-switch" type="checkbox" name="invasions-switch" class="onoffswitch-checkbox" checked>
									<label class="onoffswitch-label" for="invasions-switch">
										<span class="switch-label" data-on="On" data-off="Off"></span>
										<span class="switch-handle"></span>
									</label>
								</div>
							</div>';
						} ?>
						<?php
						if ( ! $noInvasionTimer && ! $noRocketInvasions ) {
							echo '
							<div class="form-control switch-container" style="float:none;height:35px;margin-bottom:0px;">
								<font size="3">' . i8ln("Team Rocket Timer") . '</font>
								<div class="onoffswitch">
									<input id="invasion-timer-switch" type="checkbox" name="invasion-timer-switch" class="onoffswitch-checkbox" checked>
									<label class="onoffswitch-label" for="invasion-timer-switch">
										<span class="switch-label" data-on="On" data-off="Off"></span>
										<span class="switch-handle"></span>
									</label>
								</div>
							</div>
							';
						} ?>
						<div id="rocket-wrapper" style="display:none">
							<div id="grunt-tabs">
								<ul>
									<li><a href="#tabs-1"><?php echo i8ln('Team Rocket') ?></a></li>
								</ul>
								<div id="tabs-1">
								<div class="form-control hide-select-2">
									<label for="exclude-grunts">
										<div class="grunts-container">
											<input id="exclude-grunts" type="text" readonly="true">
											<?php
                                            if ($generateExcludeGrunts === true) {
                                                gruntFilterImages($noGruntNumbers, '', array_diff(range(1, $numberOfGrunt), $getList->generated_exclude_list('gruntlist')), 10);
                                            } else {
                                                gruntFilterImages($noGruntNumbers, '', $excludeGrunts, 10);
                                            } ?>
										</div>
										<?php
										echo '
										<a href="#" class="select-all-grunt">' . i8ln("All") . '</a>
										<a href="#" class="hide-all-grunt">' . i8ln('None') . '</a>';
										?>
									</label>
								</div>
								</div>
							</div>
						</div>
						<hr style="padding:0px;margin:10px;" />
						<?php
						if ( ! $noQuests ) {
							echo '
							<div class="form-control switch-container" style="float:none;height:35px;margin-bottom:0px;">
								<font size="3">' . i8ln("Only Quests") . '</font>
								<div class="onoffswitch">
									<input id="quests-switch" type="checkbox" name="quests-switch" class="onoffswitch-checkbox" checked>
									<label class="onoffswitch-label" for="quests-switch">
										<span class="switch-label" data-on="On" data-off="Off"></span>
										<span class="switch-handle"></span>
									</label>
								</div>
							</div>';
							?>
							<?php
							if ( ! $noQuestsItems && ! $noQuestsItemsAmounts) {
								echo '<div class="form-control switch-container" style="float:none;height:35px;margin-bottom:0px;">
								<font size="3">' . i8ln("Reward amount") . '</font>
								<div class="onoffswitch">
									<input id="quests-amount-icon-switch" type="checkbox" name="quests-amount-icon-switch" class="onoffswitch-checkbox" checked>
									<label class="onoffswitch-label" for="quests-amount-icon-switch">
										<span class="switch-label" data-on="On" data-off="Off"></span>
										<span class="switch-handle"></span>
									</label>
								</div>
							</div>';
							} ?>
							<div id="quests-filter-wrapper" style="display:none">
								<div id="quests-tabs">
									<ul>
										<?php
										if ( ! $noQuestsPokemon ) {
											echo '<li><a href="#tabs-1">' . i8ln("Monster") . '</a></li>';
										} ?>
										<?php
										if ( ! $noQuestsItems ) {
											echo '<li><a href="#tabs-2">' . i8ln("Items") . '</a></li>';
										} ?>
										<?php
										if ( ! $noQuestsItems ) {
											echo '<li><a href="#tabs-3">' . i8ln("Energy") . '</a></li>';
										} ?>
									</ul>
									<?php
									if ( ! $noQuestsPokemon ) {
										?>
										<div id="tabs-1">
											<div class="form-control hide-select-2">
												<label for="exclude-quests-pokemon">
													<div class="quest-pokemon-container">
														<input id="exclude-quests-pokemon" type="text" readonly="true">
														<?php
															if ($generateExcludeQuestsPokemon === true) {
																pokemonFilterImages($noPokemonNumbers, '', array_diff(range(1, $numberOfPokemon), $getList->generated_exclude_list('pokemonlist')), 8);
															} else {
																pokemonFilterImages( $noPokemonNumbers, '', $excludeQuestsPokemon, 8 );
															}
														?>
														
													</div>
													<?php
														echo '<a href="#" class="select-all">' . i8ln("All") . '</a>
														<a href="#" class="hide-all">' . i8ln("None") . '</a>';
													?>
												</label>
											</div>
										</div>
										<?php
									} ?>
									<?php
									if ( ! $noQuestsItems ) {
										?>
										<div id="tabs-2">
											<div class="form-control hide-select-2">
												<label for="exclude-quests-item">
													<div class="quest-item-container">
														<input id="exclude-quests-item" type="text" readonly="true">
														<?php
															if($generateExcludeItems){
																itemFilterImages($noItemNumbers, '', array_diff(range(1, $numberOfItem), $getList->generated_exclude_list('itemlist')), array_diff([3,6,9,18,15,94,115,127,130,142,150,181,208,212,214,229,248,254,257,260,282,302,303,306,308,310,319,323,328,334,354,359,362,373,376,380,381,384,445,448,460,475,531,849], $getList->generated_exclude_list('energyList')), 9);
															} else {
																itemFilterImages($noItemNumbers, '', $excludeQuestsItem, 9 );
															}
															?>
													</div>
													<?php
														echo '<a href="#" class="select-all-item">' . i8ln("All") . '</a>
														<a href="#" class="hide-all-item">' . i8ln("None") . '</a>';
													?>
													
												</label>
											</div>
										</div>
										<div id="tabs-3">
											<div class="form-control hide-select-2">
												<label for="exclude-quests-energy">
													<div class="quest-energy-container">
														<input id="exclude-quests-energy" type="text" readonly="true">
														<?php
															if($generateExcludeEnergy){
																energyFilterImages($noEnergyNumbers, '', array_diff([3,6,9,18,15,94,115,127,130,142,150,181,208,212,214,229,248,254,257,260,282,302,303,306,308,310,319,323,328,334,354,359,362,373,376,380,381,384,445,448,460,475,531,849], $getList->generated_exclude_list('energyList')), 13);
															} else {
																energyFilterImages($noEnergyNumbers, '', $excludeEnergyItems, 13 );
															}
															?>
													</div>
													<?php
														echo '<a href="#" class="select-all-energy">' . i8ln("All") . '</a>
														<a href="#" class="hide-all-energy">' . i8ln("None") . '</a>';
													?>
													
												</label>
											</div>
										</div>
										<?php
									} ?>
								</div>
								<?php
									echo '<div class="dustslider">
										<input type="range" min="0" max="2000" value="500" class="slider" id="dustrange">
										<p>' . i8ln("Min. Stardust") . ': <span id="dustvalue"></span></p>
									</div>';
								?>
							</div>
						<?php
						}
					if ( !$noNewPokestopsFilter) {
						$currentMonth = date("m");
						$currentYear = intval(date("Y"));
						echo '
						<hr style="padding:0px;margin:10px;" />
						<div class="form-control switch-container" id="new-pokestops-wrapper">
							<font size="3">' . i8ln("New Pokestops Since") . ':</font>
							<select name="new-pokestops-switch" id="new-pokestops-switch">
								<option value="" disabled selected></option>
								<option value="0">' . i8ln("No Filter") . '</option>';
						for($i = intval($newPokestopsFilterStart[0]); $i <= $currentYear; $i++) {
							// Starting Year
							if($i == intval($newPokestopsFilterStart[0])){
								for($j = 1; $j <=12; $j++){
									if($j >= intval($newPokestopsFilterStart[1])) {
										$targetMonth = DateTime::createFromFormat('!m', $j) ->format('F');
										echo '<option value="' . $i . '-' . $j . '-01">'. i8ln($targetMonth) . ' ' . $i . '</option>';
									}
								}
							}
							// For all Middle Years
							else if($i < $currentYear && $i > intval($newPokestopsFilterStart[0])){
								for($j = 1; $j <=12; $j++){
									$targetMonth = DateTime::createFromFormat('!m', $j) ->format('F');
									echo '<option value="' . $i . '-' . $j . '-01">'. i8ln($targetMonth) . '-' . $i . '</option>';
								}
							} else{ //For current Year
								for($j = 1; $j <=12; $j++) {
									if($j <= $currentMonth) {
										$targetMonth = DateTime::createFromFormat('!m', $j) ->format('F');
										echo '<option value="' . $i . '-' . $j . '-01">'. i8ln($targetMonth) . ' ' . $i . '</option>';
									}
								}
							}
						}
						echo '
							</select>
						</div>';
					}?>
					</div>
				</div>
                <?php
            }
            if ( ! $noCommunity ) {
                echo '<h3 style="font-weight: bold;"><i class="fa fa-users fa-fw"></i>&nbsp;' . i8ln("Communities") . '</h3>
				<div>';
                if ( ! $noCommunity ) {
                    echo '<div class="form-control switch-container">
						<h3>' . i8ln( 'Communities' ) . '</h3>
						<div class="onoffswitch">
							<input id="communities-switch" type="checkbox" name="communities-switch" class="onoffswitch-checkbox" checked>
							<label class="onoffswitch-label" for="communities-switch">
								<span class="switch-label" data-on="On" data-off="Off"></span>
								<span class="switch-handle"></span>
							</label>
						</div>
					</div>
					<div id="community-content-wrapper" style="display:none">
						<div>
						'. $communityDescription .'
						</div>';
						
						if(!$noWhatsappShareCommunities){
							echo '
							<hr style="margin:0px;" />
							<div>
								<center>
									<u><h3 style="margin:0 0 0.5em 0;">' . i8ln('Share Groups') . '</h3></u>
									<a class="settings btn-share-whatsapp" id="shareCommunities" href="#" data-action="share/whatsapp/share" onclick="shareCommunitiesWhatsapp(\''. $communityShareHeader .'\',\''. $communityShareDescription .'\',\''. $communityShareFooter .'\')">
										<span style="float:left;"><i class="fa fa-upload" aria-hidden="true"></i></span> Whatsapp
									</a>
								</center>
							</div>
							<div>
								<b>' . i8ln("Info") . ':</b> ' . i8ln("Only current visible communities on the map will be shared.") . '
							</div>';
						}
					echo '
					</div>';
				}
				echo '</div>';
            }
            if ( ! $noRaids || ! $noGyms ) {
				echo '<h3 style="font-weight: bold"><i class="fa fa-shield fa-fw"></i>&nbsp;' . i8ln("Gyms") . ' &amp; ' . i8ln("Raids") . '</h3>';
				?>
                <div>
                    <?php
                    if ( ! $noRaids ) {
                        echo '
						<div class="form-control switch-container" id="raids-wrapper" style="float:none;height:35px;margin-bottom:0px;">
							<h3>' . i8ln( 'Raids' ) . '</h3>
							<div class="onoffswitch">
								<input id="raids-switch" type="checkbox" name="raids-switch" class="onoffswitch-checkbox" checked>
								<label class="onoffswitch-label" for="raids-switch">
									<span class="switch-label" data-on="On" data-off="Off"></span>
									<span class="switch-handle"></span>
								</label>
							</div>
						</div>';
						echo '
						<div id="raids-filter-wrapper" style="display:none">';
						if ( ! $noRaidTimer ) {
							echo '
							<div class="form-control switch-container" style="float:none;height:35px;margin-bottom:0px;">
								<font size="3">' . i8ln("Raid Timer") . '</font>
								<div class="onoffswitch">
									<input id="raid-timer-switch" type="checkbox" name="raid-timer-switch" class="onoffswitch-checkbox" checked>
									<label class="onoffswitch-label" for="raid-timer-switch">
										<span class="switch-label" data-on="On" data-off="Off"></span>
										<span class="switch-handle"></span>
									</label>
								</div>
							</div>';
						}
						echo '
							<div class="form-control switch-container" id="active-raids-wrapper" style="float:none;height:35px;margin-bottom:0px;">
								<font size="3">' . i8ln("Only Active Raids") . '</font>
								<div class="onoffswitch">
									<input id="active-raids-switch" type="checkbox" name="active-raids-switch"
										class="onoffswitch-checkbox" checked>
									<label class="onoffswitch-label" for="active-raids-switch">
										<span class="switch-label" data-on="On" data-off="Off"></span>
										<span class="switch-handle"></span>
									</label>
								</div>
							</div>';
						if (!$noFilterByRaidlevel) {
							echo '
							<div class="form-control switch-container" style="float:none;height:35px;margin-bottom:0px;">
								<font size="3">' . i8ln('Filter By Level') . '</font>
								<div class="onoffswitch">
									<input id="raid-level-filter-switch" type="checkbox" name="raid-level-filter-switch" class="onoffswitch-checkbox" >
									<label class="onoffswitch-label" for="raid-level-filter-switch">
										<span class="switch-label" data-on="On" data-off="Off"></span>
										<span class="switch-handle"></span>
									</label>
								</div>
							</div>';
						}
						if (!$noRaidfilterList) {
							echo '
							<div class="form-control switch-container" style="float:none;height:35px;margin-bottom:0px;">
								<font size="3">' . i8ln('Filter By Raidboss') . '</font>
								<div class="onoffswitch">
									<input id="raidboss-filter-switch" type="checkbox" name="raidboss-filter-switch" class="onoffswitch-checkbox" >
									<label class="onoffswitch-label" for="raidboss-filter-switch">
										<span class="switch-label" data-on="On" data-off="Off"></span>
										<span class="switch-handle"></span>
									</label>
								</div>
							</div>';
						}
						if (!$noFilterByRaidlevel){
							echo '
							<div id="raid-level-filter-wrapper" style="display:none">
								<div class="form-control switch-container" id="min-level-raids-filter-wrapper" style="float:none;height:35px;margin-bottom:0px;">
									<font size="3">' . i8ln("Min. Raid Level") . '</font>
									<select name="min-level-raids-filter-switch" id="min-level-raids-filter-switch">
										<option value="" disabled selected></option>
										<option value="1">1</option>
										<option value="2">2</option>
										<option value="3">3</option>
										<option value="4">4</option>
										<option value="5">5</option>
										<option value="6">6 (MegaRaids)</option>
									</select>
								</div>
								<div class="form-control switch-container" id="max-level-raids-filter-wrapper" style="float:none;height:75px;margin-bottom:0px;">
									<font size="3">' . i8ln("Max. Raid Level") . '</font>
									<select name="max-level-raids-filter-switch" id="max-level-raids-filter-switch">
										<option value="" disabled selected></option>
										<option value="1">1</option>
										<option value="2">2</option>
										<option value="3">3</option>
										<option value="4">4</option>
										<option value="5">5</option>
										<option value="6">6 (MegaRaids)</option>
									</select>
								</div>
							</div>';
						}
						if (!$noRaidfilterList) { ?>
							<div id="raidboss-filter-wrapper" style="display:none;">
								<div id="raidboss-tabs">
									<ul>
										<li><a href="#tabs-1"><?php echo i8ln('Raidfilter') ?></a></li>
										<li><a href="#tabs-2"><?php echo i8ln('Eggs') ?></a></li>
									</ul>
									<div id="tabs-1">
										<div class="form-control hide-select-2">
											<label for="exclude-raidbosses">
												<div class="raidbosses-container">
													<input id="exclude-raidbosses" type="text" readonly="true">
													<?php
														if ($generateRaidbossFilters === true) {
															pokemonFilterImages($noRaidfilterListNumbers, '', array_diff(range(1, $numberOfPokemon), $getList->generated_exclude_list('raidlist')), 11);
														} else {
															raidbossFilterImages($noRaidfilterListNumbers, '', $excludeRaidPokemon, 11); 
														}
													?>
													
												</div>
												<a href="#" class="select-all-raidboss"><?php echo i8ln('All') ?>
												</a><a href="#" class="hide-all-raidboss"><?php echo i8ln('None') ?> </a>
											</label>
										</div>
									</div>
									<div id="tabs-2">
										<div class="form-control hide-select-2">
											<label for="exclude-raideggs">
												<div class="raideggs-container">
													<input id="exclude-raideggs" type="text" readonly="true">
													<?php
													raidEggsFilterImages($noRaidfilterListNumbers, '', $excludeRaidEggs, 12); 
													?>
												</div>
												<a href="#" class="select-all-raideggs"><?php echo i8ln('All') ?>
												</a><a href="#" class="hide-all-raideggs"><?php echo i8ln('None') ?> </a>
											</label>
										</div>
									</div>
								</div>
							</div>
						<?php
						} ?>
						
						<?php
						echo '
						</div>';
					}
                    if ( ! $noGymSidebar && ( ! $noGyms || ! $noRaids ) ) {
                        echo '
						<div id="gym-sidebar-wrapper" class="form-control switch-container">
						<hr style="margin:15px;" />
							<font size="3">' . i8ln( 'Use Gym Sidebar' ) . '</font>
							<div class="onoffswitch">
								<input id="gym-sidebar-switch" type="checkbox" name="gym-sidebar-switch"class="onoffswitch-checkbox" checked>
								<label class="onoffswitch-label" for="gym-sidebar-switch">
									<span class="switch-label" data-on="On" data-off="Off"></span>
									<span class="switch-handle"></span>
								</label>
							</div>
							<br><hr style="margin:15px;" />
						</div>
						';
                    } ?>
					<?php
					if ( ! $noGymStyle && ( ! $noGyms || ! $noRaids )) {
						echo '<div class="form-control switch-container">
						<h3>' . i8ln("Gym Style") . '</h3>
						<select name="gym-marker-style" id="gym-marker-style">
							<option value="classic">' . i8ln("Classic") . '</option>
							<option value="shield">' . i8ln("Shield") . '</option>
							<option value="tower">' . i8ln("Tower") . '</option>
							<option value="comictower">' . i8ln("ComicTower") . '</option>
							<option value="beasts">' . i8ln("Beast") . '</option>
							<option value="idol">' . i8ln("Idol") . '</option>
							<option value="elements">' . i8ln("Element") . '</option>
							<option value="ingame">' . i8ln("Standard") . '</option>
						</select>
					</div>
					';
					}
					?>
                    <?php
                    if ( ! $noGyms ) {
                        echo '<div class="form-control switch-container">
							<h3>' . i8ln( 'Gyms' ) . '</h3>
								<div class="onoffswitch">
									<input id="gyms-switch" type="checkbox" name="gyms-switch" class="onoffswitch-checkbox" checked>
									<label class="onoffswitch-label" for="gyms-switch">
										<span class="switch-label" data-on="On" data-off="Off"></span>
										<span class="switch-handle"></span>
									</label>
								</div>
						</div>';
					} 
                    if ( ! $noGymBadgeMode) {
                        echo '<div class="form-control switch-container" id="badge-mode-wrapper">
                            <font size="3">' . i8ln("Gym Badge Mode") . '</font>
                            <div class="onoffswitch">
                                <input id="badge-mode-switch" type="checkbox" name="badge-mode-switch" class="onoffswitch-checkbox" checked>
                                <label class="onoffswitch-label" for="badge-mode-switch">
                                    <span class="switch-label" data-on="On" data-off="Off"></span>
                                    <span class="switch-handle"></span>
                                </label>
                            </div>
                        </div>';
                    }
					?>
			
                    <?php
                    if ( (!$hideIfManual && !$noGymTeamInfos) || !$noGymScannedText || !$noNewGymsFilter) {
						echo '<div id="gyms-filter-wrapper" style="display:none">';
						
						if ( ! $hideIfManual && !$noGymTeamInfos) {
							echo '<div class="form-control switch-container" id="team-gyms-only-wrapper">
								<font size="3">Team</font>
								<select name="team-gyms-filter-switch" id="team-gyms-only-switch">
									<option value="0">' . i8ln("All") . '</option>
									<option value="1">' . i8ln("Mystic") . '</option>
									<option value="2">' . i8ln("Valor") . '</option>
									<option value="3">' . i8ln("Instinct") . '</option>
								</select>
							</div>
							<div class="form-control switch-container" id="open-gyms-only-wrapper">
								<font size="3">' . i8ln("Free Slots") . '</font>
								<div class="onoffswitch">
									<input id="open-gyms-only-switch" type="checkbox" name="open-gyms-only-switch"
										class="onoffswitch-checkbox" checked>
									<label class="onoffswitch-label" for="open-gyms-only-switch">
										<span class="switch-label" data-on="On" data-off="Off"></span>
										<span class="switch-handle"></span>
									</label>
								</div>
							</div>
							<div class="form-control switch-container" id="min-level-gyms-filter-wrapper">
								<font size="3">' . i8ln("Min. Free Slots") . '</font>
								<select name="min-level-gyms-filter-switch" id="min-level-gyms-filter-switch">
									<option value="0">0</option>
									<option value="1">1</option>
									<option value="2">2</option>
									<option value="3">3</option>
									<option value="4">4</option>
									<option value="5">5</option>
									<option value="6">6</option>
								</select>
							</div>
							<div class="form-control switch-container" id="max-level-gyms-filter-wrapper">
								<font size="3">' . i8ln("Max. Free Slots") . '</font>
								<select name="max-level-gyms-filter-switch" id="max-level-gyms-filter-switch">
									<option value="0">0</option>
									<option value="1">1</option>
									<option value="2">2</option>
									<option value="3">3</option>
									<option value="4">4</option>
									<option value="5">5</option>
									<option value="6">6</option>
								</select>
							</div>';
						}
						if ( !$noGymScannedText) {
							echo '<div class="form-control switch-container" id="last-update-gyms-wrapper">
								<font size="3">' . i8ln("Last Scanned") . '</font>
								<select name="last-update-gyms-switch" id="last-update-gyms-switch">
									<option value="0">' . i8ln("All") . '</option>
									<option value="1">' . i8ln("Last Hour") . '</option>
									<option value="6">' . i8ln("Last 6 Hours") . '</option>
									<option value="12">' . i8ln("Last 12 Hours") . '</option>
									<option value="24">' . i8ln("Last 24 Hours") . '</option>
									<option value="168">' . i8ln("Last Week") . '</option>
								</select>
							</div>';
						}
						if ( !$noNewGymsFilter) {
						
						$currentMonth = date("m");
						$currentYear = intval(date("Y"));
						echo '<div class="form-control switch-container" id="new-gyms-wrapper">
							<font size="3">' . i8ln("New Gyms Since") . '</font>
							<select name="new-gyms-switch" id="new-gyms-switch">
								<option value="" disabled selected></option>
								<option value="0">' . i8ln("No Filter") . '</option>';
						for($i = intval($newGymsFilterStart[0]); $i <= $currentYear; $i++) {
							// Starting Year
							if($i == intval($newGymsFilterStart[0])){
								for($j = 1; $j <=12; $j++){
									if($j >= intval($newGymsFilterStart[1])) {
										$targetMonth = DateTime::createFromFormat('!m', $j) ->format('F');
										echo '<option value="' . $i . '-' . $j . '-01">'. i8ln($targetMonth) . ' ' . $i . '</option>';
									}
								}
							}
							// For all Middle Years
							else if($i < $currentYear && $i > intval($newGymsFilterStart[0])){
								for($j = 1; $j <=12; $j++){
									$targetMonth = DateTime::createFromFormat('!m', $j) ->format('F');
									echo '<option value="' . $i . '-' . $j . '-01">'. i8ln($targetMonth) . ' ' . $i . '</option>';
								}
							} else{ //For current Year
								for($j = 1; $j <=12; $j++) {
									if($j <= $currentMonth) {
										$targetMonth = DateTime::createFromFormat('!m', $j) ->format('F');
										echo '<option value="' . $i . '-' . $j . '-01">'. i8ln($targetMonth) . ' ' . $i . '</option>';
									}
								}
							}
						}
						
						
						
							echo '
								</select>
							</div>';
						}
						echo '</div>';
					}?>
                    <div id="gyms-raid-filter-wrapper" style="display:none">
                        <?php
                        if (! $noExEligible ) {
                            echo '<div class="form-control switch-container" id="ex-eligible-wrapper">
                                <font size="3">' . i8ln("EX Eligible Only") . '</font>
                                <div class="onoffswitch">
                                    <input id="ex-eligible-switch" type="checkbox" name="ex-eligible-switch"
                                           class="onoffswitch-checkbox" checked>
                                    <label class="onoffswitch-label" for="ex-eligible-switch">
                                        <span class="switch-label" data-on="On" data-off="Off"></span>
                                        <span class="switch-handle"></span>
                                    </label>
                                </div>
                            </div>';
                        }
                        if ( ! $noBattleStatus ) {
                            echo '<div class="form-control switch-container" id="battle-status-wrapper">
                                <font size="3">' . i8ln("Only Gyms under Attack") . '</font>
                                <div class="onoffswitch">
                                    <input id="battle-status-switch" type="checkbox" name="battle-status-switch" class="onoffswitch-checkbox" checked>
                                    <label class="onoffswitch-label" for="battle-status-switch">
                                        <span class="switch-label" data-on="On" data-off="Off"></span>
                                        <span class="switch-handle"></span>
                                    </label>
                                </div>
                            </div>';
                        }
						?>
                    </div>
						<?php
						if(!empty($triggerGyms) || $passwatcherTriggeredGyms){
							echo i8ln("Already triggered gyms are marked with a <b>golden</b> 'EX'");
						} ?>
                </div>
                <?php
            }
            if (!$noPortals || ! $noS2Cells || ! $noWeatherOverlay || !$noPoi) {
				if(!$noWeatherOverlay && !$noS2Cells && !$noPoi){
					echo '<h3 style="font-weight: bold"><i class="fa fa-hashtag fa-fw"></i>&nbsp;' . i8ln("Weather") . ' / ' . i8ln("Cells") . ' / ' . i8ln("Wayfarer") . '</h3>';
				} else if(!$noWeatherOverlay && !$noS2Cells){
					echo '<h3 style="font-weight: bold"><i class="fa fa-hashtag fa-fw"></i>&nbsp;' . i8ln("Weather") . ' &amp; ' . i8ln("S2 Cells") . '</h3>';
				} else if(!$noWeatherOverlay && !$noPoi){
					echo '<h3 style="font-weight: bold"><i class="fa fa-hashtag fa-fw"></i>&nbsp;' . i8ln("Weather") . ' &amp; ' . i8ln("Wayfarer") . '</h3>';
				} else if(!$noS2Cells && !$noPoi){
					echo '<h3 style="font-weight: bold"><i class="fa fa-hashtag fa-fw"></i>&nbsp;' . i8ln("S2 Cells") . ' &amp; ' . i8ln("Wayfarer") . '</h3>';
				} else if(!$noWeatherOverlay){
					echo '<h3 style="font-weight: bold"><i class="fa fa-hashtag fa-fw"></i>&nbsp;' . i8ln("Weather") . '</h3>';
				} else if(!$noS2Cells){
					echo '<h3 style="font-weight: bold"><i class="fa fa-hashtag fa-fw"></i>&nbsp;' . i8ln("S2 Cells") . '</h3>';
				} else if(!$noPoi){
					echo '<h3 style="font-weight: bold"><i class="fa fa-hashtag fa-fw"></i>&nbsp;' . i8ln("Wayfarer") . '</h3>';
				} else if(!$noPortals){
					echo '<h3 style="font-weight: bold"><i class="fa fa-hashtag fa-fw"></i>&nbsp;' . i8ln("Portals") . '</h3>';
				} else{
					echo '<h3 style="font-weight: bold"><i class="fa fa-hashtag fa-fw"></i>&nbsp;' . i8ln("Misc") . '</h3>';
				} ?>
				<div>
                <?php
					if ( ! $noPortals ) {
						echo '
						<div class="form-control switch-container">
							<h3>' . i8ln( 'Portals' ) . '</h3>
							<div class="onoffswitch">
								<input id="portals-switch" type="checkbox" name="portals-switch" class="onoffswitch-checkbox" checked>
								<label class="onoffswitch-label" for="portals-switch">
									<span class="switch-label" data-on="On" data-off="Off"></span>
									<span class="switch-handle"></span>
								</label>
							</div>
						</div>
						<div class="form-control switch-container" id = "new-portals-only-wrapper" style = "display:none">
						<select name = "new-portals-only-switch" id = "new-portals-only-switch">
							<option value = "0"> ' . i8ln( 'All' ) . '</option>
							<option value = "1"> ' . i8ln( 'Only new' ) . ' </option>
						</select>
						</div>';
					} ?>
					<?php
					if ( ! $noPoi ) {
						echo '
						<div class="form-control switch-container">
							<h3>' . i8ln( 'Waystops' ) . ' &amp; ' . i8ln( 'Candidates' ) .'</h3>
							<div class="onoffswitch">
								<input id="poi-switch" type="checkbox" name="poi-switch" class="onoffswitch-checkbox" checked>
								<label class="onoffswitch-label" for="poi-switch">
									<span class="switch-label" data-on="On" data-off="Off"></span>
									<span class="switch-handle"></span>
								</label>
							</div>
						</div>';
					} ?>
					<?php
					if ( ! $noS2Cells ) {
						echo '
						<div class="form-control switch-container">
							<h3>' . i8ln( 'Show S2 Cells' ) . '</h3>
							<div class="onoffswitch">
								<input id="s2-switch" type="checkbox" name="s2-switch" class="onoffswitch-checkbox" checked>
								<label class="onoffswitch-label" for="s2-switch">
									<span class="switch-label" data-on="On" data-off="Off"></span>
									<span class="switch-handle"></span>
								</label>
							</div>
						</div>
						<div class="form-control switch-container" id = "s2-switch-wrapper" style = "display:none">
							<div class="form-control" style="font-size:13px;margin-top: 6px;">
								(' . i8ln('Some options need a specific zoom') . ')
							</div>
							<div class="form-control switch-container">
								<font size="3"><b>' . i8ln( 'EX Trigger Cells' ) . '</b></font>
								<div class="onoffswitch">
									<input id="s2-level13-switch" type="checkbox" name="s2-level13-switch" class="onoffswitch-checkbox" checked>
									<label class="onoffswitch-label" for="s2-level13-switch">
										<span class="switch-label" data-on="On" data-off="Off"></span>
										<span class="switch-handle"></span>
									</label>
								</div>
							</div>
							<div class="form-control switch-container">
								<font size="3"><b>' . i8ln( 'Gym Placement Cells' ) . '</b></font>
								<div class="onoffswitch">
									<input id="s2-level14-switch" type="checkbox" name="s2-level14-switch" class="onoffswitch-checkbox" checked>
									<label class="onoffswitch-label" for="s2-level14-switch">
										<span class="switch-label" data-on="On" data-off="Off"></span>
										<span class="switch-handle"></span>
									</label>
								</div>
							</div>';
							if ( ! $noGymCellCalculations) {
								echo '
								<div id="fill-busy-gym-cell-wrapper" class="form-control switch-container" >
									<font size="3">' . i8ln('Calculate Gym Cell Objects') . '</font>
									<div class="onoffswitch">
										<input id="fill-busy-gym-cell-switch" type="checkbox" name="fill-busy-gym-cell-switch" class="onoffswitch-checkbox" checked>
										<label class="onoffswitch-label" for="fill-busy-gym-cell-switch">
											<span class="switch-label" data-on="On" data-off="Off"></span>
											<span class="switch-handle"></span>
										</label>
									</div><br>
									<div class="form-control" style="font-size:13px;margin-top: 6px;">' .
										i8ln('Only visible objects are calculated') .
									'</div>
								</div>';
							}
							echo '
							<div class="form-control switch-container">
								<font size="3"><b>' . i8ln( 'Pokestop Placement Cells' ) . '</b></font>
								<div class="onoffswitch">
									<input id="s2-level17-switch" type="checkbox" name="s2-level17-switch" class="onoffswitch-checkbox" checked>
									<label class="onoffswitch-label" for="s2-level17-switch">
										<span class="switch-label" data-on="On" data-off="Off"></span>
										<span class="switch-handle"></span>
									</label>
								</div>
							</div>';
							if ( ! $noFillCoveredPokestopCells) {
								echo '
								<div id="fill-busy-pokestop-cell-wrapper" class="form-control switch-container" style="float:none;height:35px;margin-bottom:1px;">
									<font size="3">' . i8ln('Mark Occupied Stopcells') . '</font>
									<div class="onoffswitch">
										<input id="fill-busy-pokestop-cell-switch" type="checkbox" name="fill-busy-pokestop-cell-switch" class="onoffswitch-checkbox" checked>
										<label class="onoffswitch-label" for="fill-busy-pokestop-cell-switch">
											<span class="switch-label" data-on="On" data-off="Off"></span>
											<span class="switch-handle"></span>
										</label>
									</div><br>
									<div class="form-control" style="font-size:13px;margin-top: 6px;">' .
										i8ln('Cells are only marked for enabled gyms/stops on the map') .
									'</div>
								</div>';
							}
						echo'
						</div>';
					} ?>
					<?php
					if ( ! $noWeatherOverlay ) {
						echo '
						<div class="form-control switch-container">
							<h3> ' . i8ln( 'Weather Conditions' ) . ' </h3>
							<div class="onoffswitch">
								<input id="weather-switch" type="checkbox" name="weather-switch" class="onoffswitch-checkbox">
								<label class="onoffswitch-label" for="weather-switch">
									<span class="switch-label" data-on="On" data-off="Off"></span>
									<span class="switch-handle"></span>
								</label>
							</div>
						</div>';
					} ?>
                </div>
                <?php
            }
            if ( ! $noSearchLocation || ! $noNests || ! $noStartMe || ! $noStartLast || ! $noFollowMe || ! $noPokestops || ! $noSpawnPoints || ! $noRanges || ! $noWeatherOverlay || ! $noSpawnArea || ! $noScanPolygon || ! $noScanPolygonQuest || ! $noScanPolygonPvp) {
                if ( ! $noScanPolygon || ! $noScanPolygonQuest || ! $noScanPolygonPvp ) {
					echo '<h3 style="font-weight: bold"><i class="fa fa-location-arrow fa-fw"></i>&nbsp;' . i8ln("Location") . ' &amp; ' . i8ln("Areas") . '</h3>
                    <div>';
                } else {
					echo '<h3 style="font-weight: bold"><i class="fa fa-location-arrow fa-fw"></i>&nbsp;' . i8ln("Location") . '</h3>
                    <div>';
				}
                if ( ! $noSpawnPoints ) {
                    echo '<div class="form-control switch-container">
						<h3>' . i8ln("Spawn Points") . '</h3>
						<div class="onoffswitch">
							<input id="spawnpoints-switch" type="checkbox" name="spawnpoints-switch" class="onoffswitch-checkbox">
							<label class="onoffswitch-label" for="spawnpoints-switch">
								<span class="switch-label" data - on="On" data - off="Off"></span>
								<span class="switch-handle"></span>
							</label>
						</div>
					</div>';
                }
                if ( ! $noRanges ) {
                    echo '<div class="form-control switch-container">
						<h3>' . i8ln("Ranges") . '</h3>
						<div class="onoffswitch">
							<input id="ranges-switch" type="checkbox" name="ranges-switch" class="onoffswitch-checkbox">
							<label class="onoffswitch-label" for="ranges-switch">
								<span class="switch-label" data-on="On" data-off="Off"></span>
								<span class="switch-handle"></span>
							</label>
						</div>
					</div>';
                }
                if ( ! $noSearchLocation ) {
                    echo '<div class="form-control switch-container" style="display:{{is_fixed}}">
						<label for="next-location">
							<h3>' . i8ln("Change Map Location") . '</h3>
							<form id ="search-places">
								<input id="next-location" type="text" name="next-location" placeholder="' . i8ln("Search Adress") . '..">
								<ul id="search-places-results" class="search-results places-results"></ul>
							</form>
						</label>
					</div>';
                }
                if ( ! $noStartMe ) {
                    echo '<div class="form-control switch-container">
						<h3>' . i8ln("Start at my Location") . '</h3>
						<div class="onoffswitch">
							<input id = "start-at-user-location-switch" type = "checkbox" name = "start-at-user-location-switch" class="onoffswitch-checkbox"/>
							<label class="onoffswitch-label" for="start-at-user-location-switch">
								<span class="switch-label" data - on = "On" data - off = "Off"></span>
								<span class="switch-handle"></span>
							</label>
						</div>
					</div>';
                }
                if ( ! $noStartLast ) {
                    echo '<div class="form-control switch-container">
						<h3>' . i8ln("Save Last Loc.") . '</h3>
						<div class="onoffswitch">
							<input id = "start-at-last-location-switch" type = "checkbox" name = "start-at-last-location-switch" class="onoffswitch-checkbox"/>
							<label class="onoffswitch-label" for="start-at-last-location-switch">
								<span class="switch-label" data - on = "On" data - off = "Off"></span>
								<span class="switch-handle"></span>
							</label>
						</div>
					</div>';
                }
                if ( ! $noFollowMe ) {
                    echo '<div class="form-control switch-container">
						<h3>' . i8ln("Follow my Loc.") . '</h3>
						<div class="onoffswitch">
							<input id = "follow-my-location-switch" type = "checkbox" name = "follow-my-location-switch" class="onoffswitch-checkbox"/>
							<label class="onoffswitch-label" for="follow-my-location-switch">
								<span class="switch-label" data - on = "On" data - off = "Off"></span>
								<span class="switch-handle"></span>
							</label>
						</div>
					</div>';
                } 
                if ( ! $noSpawnArea ) {
                    echo '
					<div id="spawn-area-wrapper" class="form-control switch-container">
						<font size="3"> ' . i8ln("Spawn Area") . ' </font>
						<div class="onoffswitch">
							<input id = "spawn-area-switch" type = "checkbox" name = "spawn-area-switch" class="onoffswitch-checkbox"/>
							<label class="onoffswitch-label" for="spawn-area-switch">
								<span class="switch-label" data - on = "On" data - off = "Off"></span>
								<span class="switch-handle"></span>
							</label>
						</div>
					</div>
					<div id="follow-me-map-wrapper" class="form-control switch-container">
						<font size="3"> ' . i8ln("Keep Map Centered") . ' </font>
						<div class="onoffswitch">
							<input id = "follow-me-map-switch" type = "checkbox" name = "follow-me-map-switch" class="onoffswitch-checkbox"/>
							<label class="onoffswitch-label" for="follow-me-map-switch">
								<span class="switch-label" data - on = "On" data - off = "Off"></span>
								<span class="switch-handle"></span>
							</label>
						</div>
					</div>';
				}
                if (! $noLiveScanLocation) {
                    echo '<div class="form-control switch-container">
                    <h3>' . i8ln('Live Scanner Location') . '</h3>
                    <div class="onoffswitch">
                        <input id="scan-location-switch" type="checkbox" name="scan-location-switch" class="onoffswitch-checkbox">
                        <label class="onoffswitch-label" for="scan-location-switch">
                            <span class="switch-label" data-on="On" data-off="Off"></span>
                            <span class="switch-handle"></span>
                        </label>
                    </div>
                </div>';
                }
				if ( ! $noScanPolygonQuest || ! $noScanPolygonPvp || ! $noScanPolygon){
					echo '<div>
						<h3><center><u>' . i8ln("Areas") . '</u></center></h3>
					</div>';
				}
                if ( ! $noScanPolygon ) {
                    echo '<div class="form-control switch-container">
						<h3>' . i8ln("Scan Area") . ' </h3><font size="2">(' . i8ln("Pkmn, Gyms, Stops, Raid") . ')</font>
						<div class="onoffswitch">
							<input id="scan-area-switch" type="checkbox" name="scan-area-switch" class="onoffswitch-checkbox">
							<label class="onoffswitch-label" for="scan-area-switch">
								<span class="switch-label" data-on="On" data-off="Off"></span>
								<span class="switch-handle"></span>
							</label>
						</div>
					</div>';
                }
                if ( ! $noScanPolygonQuest ) {
                    echo '<div class="form-control switch-container">
						<h3>' . i8ln("Scan Area") . ' </h3><font size="2">(' . i8ln("Quests") . ')</font>
						<div class="onoffswitch">
							<input id="scan-area-quest-switch" type="checkbox" name="scan-area-quest-switch" class="onoffswitch-checkbox">
							<label class="onoffswitch-label" for="scan-area-quest-switch">
								<span class="switch-label" data-on="On" data-off="Off"></span>
								<span class="switch-handle"></span>
							</label>
						</div>
					</div>';
                }
                if ( ! $noScanPolygonPvp ) {
                    echo '<div class="form-control switch-container">
						<h3>' . i8ln("PVP Areas") . '</h3>
						<div class="onoffswitch">
							<input id="scan-area-pvp-switch" type="checkbox" name="scan-area-pvp-switch" class="onoffswitch-checkbox">
							<label class="onoffswitch-label" for="scan-area-pvp-switch">
								<span class="switch-label" data-on="On" data-off="Off"></span>
								<span class="switch-handle"></span>
							</label>
						</div>
					</div>';
                }
                echo '</div>';
            }
            if ( ! $noNotifyPokemon || ! $noNotifyIv || ! $noNotifyLevel || ! $noNotifySound || ! $noNotifyRaid || ! $noNotifyBounce || ! $noNotifyNotification ) {
                echo '<h3 style="font-weight: bold"><i class="fa fa-star fa-fw"></i>&nbsp;' . i8ln("Favorites") . '</h3>
				<div>';
            }
            if ( ! $noNotifyPokemon ) {
                echo '<div class="form-control hide-select-2">
                    <label for="notify-pokemon">
                        <h3>' . i8ln("Favorite Selection") . '</h3><br>
						<a href="#" class="select-all" style="background-color:#3b3b3b;border-radius:3px;padding: 5px 10px;border-color: white;color:white">
							' . i8ln("All") . '
						</a>&nbsp;&nbsp;
						<a href="#" class="hide-all" style="background:#3b3b3b;border-radius:3px;padding: 5px 10px;border-color: white;color:white">
							' . i8ln("None") . '
						</a><br><br>
                        <div style="max-height:165px;overflow-y:auto;">
                            <input id="notify-pokemon" type="text" readonly="true"/>';
							pokemonFilterImages( $noPokemonNumbers, '', [], 4 );
						echo '</div>
                    </label>
                </div>';
            }
            if ( ! $noNotifyIv ) {
                echo '<div class="form-control">
					<label for="notify-perfection">
						<h3>' . i8ln( "IV Favs" ) . '</h3>
						<input id="notify-perfection" type="text" name="notify-perfection" placeholder="Min %" style="float: right;width: 75px;text-align:center"/>
					</label>
				</div>';
            }
            if ( ! $noNotifyLevel ) {
                echo '<div class="form-control">
					<label for="notify-level">
						<h3 style="float:left;">' . i8ln( "Level Favs" ) . '</h3>
						<input id="notify-level" min="1" max="35" type="number" name="notify-level" placeholder="Min Lvl" style="float: right;width: 75px;text-align:center"/>
					</label>
				</div>';
            }
            if ( ! $noNotifyRaid ) {
                echo '<div class="form-control switch-container" id="notify-raid-wrapper">
                        <h3>' . i8ln("Min Raid Level Favs") . '</h3>
                        <select name="notify-raid" id="notify-raid">
                            <option value="0">' . i8ln("Disabled") . '</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6(MegaRaids)</option>
                        </select>
                    </div>';
            }
            if ( ! $noNotifySound ) {
                echo '<div class="form-control switch-container">
					<h3>' . i8ln("Notify with Sound") . '</h3>
					<div class="onoffswitch">
						<input id="sound-switch" type="checkbox" name="sound-switch" class="onoffswitch-checkbox" checked>
						<label class="onoffswitch-label" for="sound-switch">
							<span class="switch-label" data-on="On" data-off="Off"></span>
							<span class="switch-handle"></span>
						</label>
					</div>';
					if ( ! $noCriesSound ) {
						echo '<div class="form-control switch-container" id="cries-switch-wrapper">
							<h3>' . i8ln( 'Use Pokemon Cries' ) . '</h3>
							<div class="onoffswitch">
								<input id="cries-switch" type="checkbox" name="cries-switch" class="onoffswitch-checkbox" checked>
								<label class="onoffswitch-label" for="cries-switch">
									<span class="switch-label" data-on="On" data-off="Off"></span>
									<span class="switch-handle"></span>
								</label>
							</div>
						</div>';
					}
                echo '</div>';
            }
            if ( ! $noNotifyBounce ) {
                echo '<div class="form-control switch-container">
					<h3>' . i8ln("Jumping Favs") . '</h3>
					<div class="onoffswitch">
						<input id="bounce-switch" type="checkbox" name="bounce-switch" class="onoffswitch-checkbox" checked>
						<label class="onoffswitch-label" for="bounce-switch">
							<span class="switch-label" data-on="On" data-off="Off"></span>
							<span class="switch-handle"></span>
						</label>
					</div>
				</div>';
            }
            if ( ! $noNotifyNotification ) {
                echo '<div class="form-control switch-container">
					<h3>' . i8ln("Push Notifications") . ' </h3>(' . i8ln("Desktop") . ')
					<div class="onoffswitch">
						<input id="notification-switch" type="checkbox" name="notification-switch" class="onoffswitch-checkbox" checked>
						<label class="onoffswitch-label" for="notification-switch">
							<span class="switch-label" data-on="On" data-off="Off"></span>
							<span class="switch-handle"></span>
						</label>
					</div>
				</div>';
            }
            if ( !$noNotifyPokemon || !$noNotifyIv || !$noNotifyLevel || !$noNotifySound || !$noNotifyRaid || !$noNotifyBounce || !$noNotifyNotification ) {
                echo '</div>';
            }

			# Styling
            if ( !$noMapStyle || !$noDirectionProvider || !$noIconSize || !$noIconNotifySizeModifier || !$noGymStyle || !$noLocationStyle ) {
                echo '<h3 style="font-weight: bold"><i class="fa fa-map-o fa-fw"></i>&nbsp;' . i8ln("Style") . '</h3>
				<div>';
            }
            if ( !$noMapStyle) {
                echo '<div class="form-control switch-container">
					<h3>' . i8ln("Map Style") . '</h3>
					<select id="map-style"></select>
				</div>';
            }
            if ( ! $noDirectionProvider ) {
                echo '<div class="form-control switch-container">
					<h3>' . i8ln("Navigation via") . ':</h3>
					<select name="direction-provider" id="direction-provider">
						<option value="apple">' . i8ln( 'Apple' ) . '</option>
						<option value="google">' . i8ln( 'Google (Directions)' ) . '</option>
						<option value="google_pin">' . i8ln( 'Google (Pin)' ) . '</option>
						<option value="waze">' . i8ln( 'Waze' ) . '</option>
						<option value="bing">' . i8ln( 'Bing' ) . '</option>
					</select>
				</div>';
            }
            if ( ! $noIconSize ) {
                echo '<div class="form-control switch-container">
					<h3>' . i8ln("Icon Size") . '</h3>
					<select name="pokemon-icon-size" id="pokemon-icon-size">
						<option value="-8">' . i8ln( 'Small' ) . '</option>
						<option value="0">' . i8ln( 'Normal' ) . '</option>
						<option value="10">' . i8ln( 'Large' ) . '</option>
						<option value="20">' . i8ln( 'X-Large' ) . '</option>
					</select>
				</div>';
            }
            if ( ! $noIconNotifySizeModifier ) {
                echo '<div class="form-control switch-container">
					<h3>' . i8ln("Fav Iconsize Modifier") . '</h3>
					<select name="pokemon-icon-notify-size" id="pokemon-icon-notify-size">
						<option value="0">' . i8ln( 'Disable' ) . '</option>
						<option value="15">' . i8ln( 'Large' ) . '</option>
						<option value="30">' . i8ln( 'X-Large' ) . '</option>
						<option value="45">' . i8ln( 'XX-Large' ) . '</option>
					</select>
				</div>';
            }
            if ( ! $noLocationStyle ) {
                echo '<div class="form-control switch-container">
					<h3>' . i8ln("Location Style") . '</h3>
					<select name="locationmarker-style" id="locationmarker-style"></select>
				</div>';
            }
            if ( ! $noOverlayDesign ) {
				echo '<div class="form-control switch-container">
					<h3>' . i8ln("Overlay Design") . '</h3>
					<div>
						<select name="design-style" id="design-style">
							<option value="'. $overlayDesign .'">Classic</option>
							<option value="linear-gradient(to top, black 1%,white 2%,white 25%, black 50%, #cc0000 85%)">Pokeball</option>
							<option value="linear-gradient(to top, yellow 0%,black 80%)">BVB</option>
							<option value="linear-gradient(to top, yellow 20%,red 50%,black 80%)">Germany</option>
							<option value="linear-gradient(319deg,skyblue 0%, yellow 57%, red 80%, white 110%)">Rainbow</option>
							<option value="linear-gradient(to top, red 0%, black 110%)">Deep Red</option>
							<option value="linear-gradient(to top, orange 0%, black 110%)">Orange</option>
							<option value="linear-gradient(to top, #ffd633 5%, black 140%)">Gold</option>
							<option value="linear-gradient(to top, #80ff80 0%, green 100%)">Light Green</option>
							<option value="linear-gradient(to top, green 0%, black 110%)">Deep Green</option>
							<option value="linear-gradient(to top, #00ffff -25%, black 125%)">Light Blue</option>
							<option value="linear-gradient(to top, blue 0%, black 100%)">Deep Blue</option>
							<option value="linear-gradient(to top, #7a0099 0%, black 110%)">Deep Purple</option>
							<option value="linear-gradient(to top, hotpink 0%, black 120%)">Deep Pink</option>
							<option value="linear-gradient(to top, pink 0%, deeppink 120%)">Light Pink</option>
						</select>
					</div>
				</div>';
			}
            if ( !$noPokemonLabelStyles ) {
				echo '<div class="form-control switch-container">
					<h3>' . i8ln("Pokemon Label Design") . '</h3>
					<div>
						<select name="pokemon-label-style" id="pokemon-label-style">
							<option value="classic">Classic</option>
							<option value="v1">Restyled(v1)</option>
							<option value="v2">Restyled(v2)</option>
							<option value="v3">New Years Edition</option>
						</select>
					</div>
				</div>';
			}
            if ( ! $noMapStyle || ! $noDirectionProvider || ! $noIconSize || ! $noIconNotifySizeModifier || ! $noGymStyle || ! $noLocationStyle ) {
                echo '</div>';
            }
			if (!$noExportImport){
				echo '
				<h3 style="font-weight: bold"><i class="fa fa-sliders fa-fw"></i>&nbsp;' . i8ln("Settings") . '</h3>
				<div>
					<span style="color: #3b3b3b"><b style="font-size:17px">' . i8ln("Reset") . ':</b><br>' . i8ln("All settings will be reset to factory settings") . '</span>
					<div>
						<center>
							<button id="reset-button" class="settings" onclick="confirm(\'' . i8ln("Are you sure you want to reset all settings?") . '\') ? (localStorage.clear(), window.location.reload()) : false">
								<i class="fa fa-refresh" aria-hidden="true"></i> ' . i8ln("Reset") . '
							</button>
						</center>
					</div>
					<br>
					<span style="color: #3b3b3b"><b style="font-size:17px">' . i8ln("Export") . ':</b><br>' . i8ln("Save your current settings by downloading them as a file") . '<br><br></span>
					<span style="color: #3b3b3b"><b style="font-size:17px">' . i8ln("Import") . ':</b><br>' . i8ln("Upload a setting file to restore your settings") . '</span>
					<div>
						<center>
							<button id="export-button" class="settings"
								onclick="download(\''. addslashes( $title ) .'\', JSON.stringify(JSON.stringify(localStorage)))">
								<i class="fa fa-upload" aria-hidden="true"></i> ' . i8ln("Export") . '
							</button>
						</center>
					</div>
					<div>
						<center>
							<input id="fileInput" type="file" style="display:none;" onchange="openFile(event)"/>
							<button id="import-button" class="settings"
									onclick="document.getElementById(\'fileInput\').click()">
								<i class="fa fa-download" aria-hidden="true"></i> ' . i8ln("Import") . '
							</button>
						</center>
					</div>
				</div>';
			}
			# Scanning Times
			if (!$noQuestscanInfotext){
                echo '<h3 style="font-weight: bold"><i class="fa fa-clock-o fa-fw"></i>&nbsp;' . i8ln("Scanning Times") . '</h3>
				<div>
					' . $questscanInfotext .'
				</div>';
			}
			# Auth
			if (($noDiscordLogin === false) && !empty($_SESSION['user']->id)) {
                echo '<h3 style="font-weight: bold"><i class="fa fa-key fa-fw"></i>&nbsp;' . i8ln("Auth") . '</h3>
				<div>
					<div>
						<center>
							<p>
								<b>' . i8ln("You are currently logged in") . '</b><br>
								<b>' . i8ln("User") . ':</b> ' . $_SESSION['user']->user . "" . '
							</p>
						</center>
					</div>
					<div>
						<center>
							<button class="settings"onclick="document.location.href=\'logout.php\'">
								<i class="fa" aria-hidden="true"></i>' . i8ln("Logout") . '
							</button>
						</center>
					</div><br>
				</div>';
			}
			# Map Locations / Areas
            if ( ! $noAreas ) {
			echo '<h3 style="font-weight: bold"><i class="fa fa-globe fa-fw"></i>&nbsp;' . i8ln("Map Locations") . '</h3>';
                $count = sizeof( $areas );
                if ( $count > 0 ) {
					echo '<div class="form-control switch-container area-container">';
					if($multiAreas){
						for ( $j = 0; $j <= $count - 1; $j ++) {
							echo '<div class="area-header">' . $areas[$j][0] . '</div>';
							$innerCount = sizeOf($areas[$j]);
							echo '<ul>';
							for ( $i = 1; $i <= $innerCount - 1; $i ++ ) {
								echo '<li><a href="" data-lat="' . $areas[$j][$i][0] . '" data-lng="' . $areas[$j][$i][1] . '" data-zoom="' . $areas[$j][$i][2] . '" class="area-go-to">' . $areas[$j][$i][3] . '</a></li>';
							}
							echo '</ul>';
						}
					}
					else{
						echo '<ul>';
						for ( $i = 0; $i <= $count - 1; $i ++ ) {
							echo '<li><a href="" data-lat="' . $areas[ $i ][0] . '" data-lng="' . $areas[ $i ][1] . '" data-zoom="' . $areas[ $i ][2] . '" class="area-go-to">' . $areas[ $i ][3] . '</a></li>';
						}
						echo '</ul>';
					}
					echo '</div>';
                }
            }
        ?>
        </div>
        <?php
        if ( $worldopoleUrl != "" ) {
            echo '<p>
				<center>
					<a href="' . $worldopoleUrl . '" target="_blank" style="background-image:'. $overlayDesign . ';border: 1px solid;border-color: black;color: white;text-align: center;text-decoration: none;display: inline-block;font-size: 16px;padding: 6px 12px;border-radius: 16px;" class="settings">
						<i class="fa fa-info-circle fa-fw"></i>'. $worldopoleButtonTitle .'
					</a>
				</center>
			</p>';
        }
        if (($noNativeLogin === false) && !empty($_SESSION['user']->id)) {
            ?>
            <div>
                <center>
                    <button class="settings"
                            onclick="document.location.href='user'">
                        <i class="fa" aria-hidden="true"></i> <?php echo i8ln('Activate Key'); ?>
                    </button>
                </center>
            </div>
            <div>
                <center>
                    <button class="settings"
                            onclick="document.location.href='logout.php'">
                        <i class="fa" aria-hidden="true"></i> <?php echo i8ln('Logout'); ?>
                    </button>
                </center>
            </div><br>
            <div><center><p>
            <?php
            $time = date("Y-m-d", $_SESSION['user']->expire_timestamp);
            
            echo $_SESSION['user']->user . "<br>";
            if ($_SESSION['user']->expire_timestamp < time()) {
                echo "<span style='color: green;'>" . i8ln('Membership expires on') . " {$time}</span>";
            } else {
                echo "<span style='color: red;'>" . i8ln('Membership expired on') . " {$time}</span>";
            } ?>
            </p></center></div>
        <?php
        }
        ?>
    </nav>
    <nav id="stats">
        <div class="switch-container">
            <?php
            if ( $worldopoleUrl !== "" && !$noLinkFullStats) {
                ?>
                <div class="switch-container">
                    <div>
                        <center><a href="<?= $worldopoleUrl ?>"><?php echo i8ln('Full Stats')?></a></center>
                    </div>
                </div>
                <?php
            }
            ?>
            <div class="switch-container">
                <center><h1 id="stats-ldg-label"><?php echo i8ln( 'Loading' ) ?>...</h1></center>
            </div>
            <div class="stats-label-container">
                <center><h1 id="stats-pkmn-label"></h1></center>
            </div>
            <div id="pokemonList" style="color: black;">
                <table id="pokemonList_table" class="display" cellspacing="0" width="100%">
                    <thead>
                    <tr>
					<?php
                        echo '
						<th>' . i8ln("Icon") . '</th>
                        <th>' . i8ln("Name") . '</th>
                        <th>' . i8ln("Amount") . '</th>
                        <th>%</th>'
					?>
                    </tr>
                    </thead>
                    <tbody></tbody>
                </table>
                <div id="pokeStatStatus" style="color: black;"></div>
            </div>
			
            <div class="stats-label-container">
                <center><h1 id="stats-gym-label"></h1></center>
            </div>
            <div id="arenaList" style="color: black;"></div>
			
            <div class="stats-label-container">
                <center><h1 id="stats-raid-label"></h1></center>
            </div>
            <div id="raidList" style="color: black;"></div>
			
            <div class="stats-label-container">
                <center><h1 id="stats-pkstop-label"></h1></center>
            </div>
            <div id="pokestopList" style="color: black;"></div>
        </div>
    </nav>
    <nav id="gym-details">
        <center><h1><?php echo i8ln( 'Loading' ) ?>...</h1></center>
    </nav>

    <div id="motd" title=""></div>

    <div id="map"></div>
    <div class="global-raid-modal">

    </div>
    <?php if ( ! $noManualNests ) { ?>
        <div class="global-nest-modal" style="display:none;">
            <input type="hidden" name="pokemonID" class="pokemonID"/>
            <?php pokemonFilterImages( $noPokemonNumbers, 'pokemonSubmitFilter(event)', $excludeNestMons, 5 ); ?>
            <div class="button-container">
                <button type="button" onclick="manualNestData(event);" class="submitting-nests"><i
                        class="fa fa-binoculars"
                        style="margin-right:10px;"></i><?php echo i8ln( 'Submit Nest' ); ?>
                </button>
            </div>
        </div>
    <?php } ?>
    <?php if ( ! $noRenamePokestops ) { ?>
        <div class="rename-modal" style="display: none;">
	   <input type="text" id="pokestop-name" name="pokestop-name"
		  placeholder="<?php echo i8ln( 'Enter New Pokéstop Name' ); ?>" data-type="pokestop"
                  class="search-input">
             <div class="button-container">
                <button type="button" onclick="renamePokestopData(event);" class="renamepokestopid"><i
                        class="fa fa-edit"
                        style="margin-right:10px; vertical-align: middle; font-size: 1.5em;"></i><?php echo i8ln( 'Rename Pokestop' ); ?>
                </button>
            </div>
        </div>
    <?php } ?>
    <?php if ( ! $noGymBadgeMode ) { ?>
        <div class="changeGymBadge-modal" style="display: none;">
		<?php echo i8ln( 'Select the Badge Level' ) . ":"; ?>
			<div>
				<input type="radio" id="u" name="badgeType" value="none" selected>
				<label for="u"> <?php echo i8ln( 'Unset' ); ?></label><br>
				<input type="radio" id="b" name="badgeType" value="bronze">
				<label for="b"> <?php echo i8ln( 'Bronze' ); ?></label><br>
				<input type="radio" id="s" name="badgeType" value="silver">
				<label for="s"> <?php echo i8ln( 'Silver' ); ?></label><br>
				<input type="radio" id="g" name="badgeType" value="gold">
				<label for="g"> <?php echo i8ln( 'Gold' ); ?></label>
			</div>
			<div class="button-container">
                <button type="button" onclick="changeGymBadgeData(event);" class="changebadgegymid">
					<i class="fa fa-edit" style="margin-right:10px; vertical-align: middle; font-size: 1.5em;"></i><?php echo i8ln( 'Change Badge' ); ?>
                </button>
            </div>
        </div>
    <?php } ?>
    <?php if ( ! $noConvertPokestops ) { ?>
        <div class="convert-modal" style="display: none;">
             <div class="button-container">
                <button type="button" onclick="convertPokestopData(event);" class="convertpokestopid"><i
                        class="fa fa-refresh"
                        style="margin-right:10px; vertical-align: middle; font-size: 1.5em;"></i><?php echo i8ln( 'Convert to gym' ); ?>
                </button>
            </div>
        </div>
    <?php } ?>
    <?php if ( ! $noEditCommunity ) { ?>
        <div class="editcommunity-modal" style="display: none;">
	   <input type="text" id="community-name" name="community-name"
		  placeholder="<?php echo i8ln( 'Enter New community Name' ); ?>" data-type="community-name"
		  class="search-input">
	   <input type="text" id="community-description" name="community-description"
		  placeholder="<?php echo i8ln( 'Enter New community Description' ); ?>" data-type="community-description"
		  class="search-input">
	   <input type="text" id="community-invite" name="community-invite"
		  placeholder="<?php echo i8ln( 'Enter New community Invite link' ); ?>" data-type="community-invite"
		  class="search-input">
	     <div class="button-container">
                <button type="button" onclick="editCommunityData(event);" class="editcommunityid"><i
                        class="fa fa-edit"
                        style="margin-right:10px; vertical-align: middle; font-size: 1.5em;"></i><?php echo i8ln( 'Save Changes' ); ?>
                </button>
            </div>
        </div>
    <?php } ?>
    <?php if (! $noEditPoi) { ?>
        <div class="editpoi-modal" style="display: none;">
            <input type="text" id="poi-name" name="poi-name" placeholder="<?php echo i8ln('Enter New Waystop Name'); ?>" data-type="poi-name" class="search-input">
            <input type="text" id="poi-description" name="poi-description" placeholder="<?php echo i8ln('Enter New Waystop Description'); ?>" data-type="poi-description" class="search-input">
            <input type="text" id="poi-notes" name="poi-notes"placeholder="<?php echo i8ln('Enter New Waystop Notes'); ?>" data-type="poi-notes" class="search-input">
                <?php if (! empty($imgurCID)) {
                ?>
                    <div class="upload-button-container">
                         <button type="button"><i class="fa fa-upload"></i> <?php echo i8ln('Upload Waystop Image') ?></button>
                         <input type="file" id="poi-image" name="poi-image" accept="image/*" class="poi-image" data-type="poi-image" class="search-input" onchange='previewPoiImage(event)' >
                    </div>
                    <center><img id='preview-poi-image' name='preview-poi-image' width="50px" height="auto"></center>
                    <div class="upload-button-container">
                         <button type="button"><i class="fa fa-upload"></i> <?php echo i8ln('Upload Surrounding Image') ?></button>
                         <input type="file" id="poi-surrounding" name="poi-surrounding" accept="image/*" class="poi-surrounding" data-type="poi-surrounding" class="search-input" onchange='previewPoiSurrounding(event)'>
                    </div>
                    <center><img id='preview-poi-surrounding' name='preview-poi-surrounding' width="50px" height="auto"></center>
                <?php
                } ?>
            <div class="button-container">
                <button type="button" onclick="editPoiData(event);" class="editpoiid"><i class="fa fa-save"></i> <?php echo i8ln('Save Changes'); ?></button>
            </div>
        </div>
    <?php } ?>
    <?php if ( ! $noPortals ) { ?>
        <div class="convert-portal-modal" style="display: none;">
             <div class="button-container">
                <button type="button" onclick="convertPortalToPokestopData(event);" class="convertportalid"><i
                        class="fa fa-refresh"
                        style="margin-right:10px; vertical-align: middle; font-size: 1.5em;"></i><?php echo i8ln( 'Convert to pokestop' ); ?>
		</button>
                <button type="button" onclick="convertPortalToGymData(event);" class="convertportalid"><i
                        class="fa fa-refresh"
                        style="margin-right:10px; vertical-align: middle; font-size: 1.5em;"></i><?php echo i8ln( 'Convert to gym' ); ?>
		</button>
                <button type="button" onclick="markPortalChecked(event);" class="convertportalid"><i
                        class="fa fa-times"
                        style="margin-right:10px; vertical-align: middle; font-size: 1.5em;"></i><?php echo i8ln( 'No Pokestop or Gym' ); ?>
		</button>
            </div>
        </div>
    <?php } ?>
    <?php if ( ! $noPoi ) { ?>
        <div class="mark-poi-modal" style="display: none;">
             <div class="button-container">
                <button type="button" onclick="markPoiSubmitted(event);" class="markpoiid"><i
                        class="fa fa-refresh"
                        style="margin-right:10px; vertical-align: middle; font-size: 1.5em;"></i><?php echo i8ln( 'Submitted' ); ?>
		</button>
                <button type="button" onclick="markPoiDeclined(event);" class="markpoiid"><i
                        class="fa fa-times"
                        style="margin-right:10px; vertical-align: middle; font-size: 1.5em;"></i><?php echo i8ln( 'Declined' ); ?>
		</button>
            </div>
        </div>
    <?php } ?>
    <?php if ( ! $noDiscordLogin ) { ?>
        <div class="accessdenied-modal" style="display: none;">
            <center><?php echo i8ln('Access Denied!')?></center>
            <br>
			<?php 
			echo i8ln('It seems that you did not join our Discord Server.') . '<br>';
			if(!empty($discordUrl)){
				echo i8ln('Click') . ' <a href="' .$discordUrl .'">' . i8ln('here') . '</a> ' . i8ln('to join our Server') . '<br>';
			}
			echo '<br>' . i8ln('If you think this is a bug, please contact an administrator on the Discord.');
			?>
            <?php if ( $copyrightSafe === false ) { ?>
                <img src="static/images/accessdenied.png" alt="PikaSquad" width="250">
            <?php } ?>
        </div>
    <?php } ?>
    <?php if ( ! $noManualQuests ) { ?>
        <div class="quest-modal" style="display: none;">
            <input type="hidden" value="" name="questPokestop" class="questPokestop"/>
            <?php
            $json   = file_get_contents( 'static/dist/data/questtype.min.json' );
            $questtypes  = json_decode( $json, true );

            $json    = file_get_contents( 'static/dist/data/rewardtype.min.json' );
            $rewardtypes   = json_decode( $json, true );

            $json    = file_get_contents( 'static/dist/data/conditiontype.min.json' );
            $conditiontypes   = json_decode( $json, true );

	    $json    = file_get_contents( 'static/dist/data/pokemon.min.json' );
	    $encounters = json_decode( $json, true );

	    $json    = file_get_contents( 'static/dist/data/items.min.json' );
	    $items = json_decode( $json, true );
            ?>
            <label for="questTypeList"><?php echo i8ln( 'Quest' ); ?>
            <select id="questTypeList" name="questTypeList" class="questTypeList">
                <option />
                <?php
                foreach ( $questtypes as $key => $value ) {
                    if ( ! in_array( $key, $hideQuestTypes ) ) {
                    ?>
                        <option value="<?php echo $key; ?>"><?php echo i8ln( $value['text'] ); ?></option>
                    <?php
                    }
                }
                ?>
	    </select>
            <select id="questAmountList" name="questAmountList" class="questAmountList">
                <option />
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
	    </select>
            </label>
            <label for="conditionTypeList"><?php echo i8ln( 'Conditions' ); ?>
            <select id="conditionTypeList" name="conditionTypeList" class="conditionTypeList">
                <option />
                <?php
                foreach ( $conditiontypes as $key => $value ) {
                    if ( ! in_array( $key, $hideConditionTypes ) ) {
                    ?>
                        <option value="<?php echo $key; ?>"><?php echo i8ln( $value['text'] ); ?></option>
                    <?php
                    }
                }
                ?>
	    </select>
            <select id="pokeCatchList" name="pokeCatchList" class="pokeCatchList" multiple></select>
	    <select id="typeCatchList" name="typeCatchList" class="typeCatchList" multiple>
                <option value="1"><?php echo i8ln( 'Normal' ); ?></option>
                <option value="2"><?php echo i8ln( 'Fighting' ); ?></option>
                <option value="3"><?php echo i8ln( 'Flying' ); ?></option>
                <option value="4"><?php echo i8ln( 'Poison' ); ?></option>
                <option value="5"><?php echo i8ln( 'Ground' ); ?></option>
                <option value="6"><?php echo i8ln( 'Rock' ); ?></option>
                <option value="7"><?php echo i8ln( 'Bug' ); ?></option>
                <option value="8"><?php echo i8ln( 'Ghost' ); ?></option>
                <option value="9"><?php echo i8ln( 'Steel' ); ?></option>
                <option value="10"><?php echo i8ln( 'Fire' ); ?></option>
                <option value="11"><?php echo i8ln( 'Water' ); ?></option>
                <option value="12"><?php echo i8ln( 'Grass' ); ?></option>
                <option value="13"><?php echo i8ln( 'Electric' ); ?></option>
                <option value="14"><?php echo i8ln( 'Psychic' ); ?></option>
                <option value="15"><?php echo i8ln( 'Ice' ); ?></option>
                <option value="16"><?php echo i8ln( 'Dragon' ); ?></option>
                <option value="17"><?php echo i8ln( 'Dark' ); ?></option>
                <option value="18"><?php echo i8ln( 'Fairy' ); ?></option>
            </select>
            <select id="raidLevelList" name="raidLevelList" class="raidLevelList">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
	    </select>
	    <select id="throwTypeList" name="throwTypeList" class="throwTypeList">
		<option />
                <option value="10"><?php echo i8ln( 'Nice' ); ?></option>
                <option value="11"><?php echo i8ln( 'Great' ); ?></option>
                <option value="12"><?php echo i8ln( 'Excellent' ); ?></option>
            </select>
            <select id="curveThrow" class="curveThrow" class="curveThrow">
		<option />
                <option value="0"><?php echo i8ln( 'Without curve throw' ); ?></option>
                <option value="1"><?php echo i8ln( 'With curve throw' ); ?></option>
            </select>
            </label>
            <label for="rewardTypeList"><?php echo i8ln( 'Reward' ); ?>
            <select id="rewardTypeList" name="rewardTypeList" class="rewardTypeList">
                <option />
                <?php
                foreach ( $rewardtypes as $key => $value ) {
                    if ( ! in_array( $key, $hideRewardTypes ) ) {
                    ?>
                        <option value="<?php echo $key; ?>"><?php echo i8ln( $value['text'] ); ?></option>
                    <?php
                    }
                }
                ?>
	    </select>
            <select id="pokeQuestList" name="pokeQuestList" class="pokeQuestList">
                <option />
                <?php
                foreach ( $encounters as $key => $value ) {
                    if ( in_array( $key, $showEncounters ) ) {
                    ?>
                        <option value="<?php echo $key; ?>"><?php echo i8ln( $value['name'] ); ?></option>
                    <?php
                    }
                }
                ?>
	    </select>
            <select id="itemQuestList" name="itemQuestList" class="itemQuestList">
                <option />
                <?php
                foreach ( $items as $key => $value ) {
                    if ( in_array( $key, $showItems ) ) {
                    ?>
                        <option value="<?php echo $key; ?>"><?php echo i8ln( $value['name'] ); ?></option>
                    <?php
                    }
                }
                ?>
	    </select>
            <select id="itemAmountList" name="itemAmountList" class="itemAmountList">
                <option />
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>
            <select id="dustQuestList" name="dustQuestList" class="dustQuestList">
                <option />
                <option value="200">200</option>
                <option value="500">500</option>
                <option value="1000">1000</option>
                <option value="1500">1500</option>
                <option value="2000">2000</option>
	    </select>
            </label>
            <div class="button-container">
                <button type="button" onclick="manualQuestData(event);" class="submitting-quest"><i
                        class="fa fa-binoculars"
                        style="margin-right:10px;"></i><?php echo i8ln( 'Submit Quest' ); ?>
                </button>
            </div>
        </div>
    <?php } ?>
    <div class="fullscreen-toggle">
        <button class="map-toggle-button" onClick="toggleFullscreenMap();"><i class="fa fa-expand" aria-hidden="true"></i></button>
    </div>
    <?php if ( ( ! $noGyms || ! $noPokestops ) && ! $noSearch ) { ?>
        <div class="search-container">
            <button class="search-modal-button" id="search-button"onClick="openSearchModal(event);"><i class="fa fa-search"
                                                                                     aria-hidden="true"></i></button>
            <div class="search-modal" style="display:none;">
                <div id="search-tabs">
                    <ul>
                        <?php if ( ! $noQuests && ! $noSearchManualQuests ) { ?>
                            <li ><a href="#tab-rewards"><img src="static/images/reward.png"/></a></li>
                        <?php }
                        if ( ! $noSearchPokestops ) { ?>
                            <li><a href="#tab-pokestop"><img src="static/forts/Pstop-large.png"/></a></li>
                        <?php }
                        if ( ! $noSearchGyms ) { ?>
                            <li><a href="#tab-gym"><img src="static/forts/classic/Uncontested.png"/></a></li>
                        <?php }
                        if ( ! $noSearchNests ) { ?>
                            <li><a href="#tab-nests"><img src="static/images/nest.png"/></a></li>
                        <?php }
                        if ( ! $noSearchPortals ) { ?>
                            <li><a href="#tab-portals"><img src="static/images/portal.png"/></a></li>
			<?php } ?>
                    </ul>
                    <?php if ( ! $noQuests && ! $noSearchManualQuests ) { ?>
                        <div id="tab-rewards">
                            <input type="search" id="reward-search" name="reward-search"
                                   placeholder="<?php echo i8ln( 'Enter Reward Name' ); ?>"
                                   data-type="reward" class="search-input"/>
                            <ul id="reward-search-results" class="search-results reward-results"></ul>
                        </div>
                    <?php } ?>
                    <?php if ( ! $noSearchNests ) { ?>
                        <div id="tab-nests">
                            <input type="search" id="nest-search" name="nest-search"
                                   placeholder="<?php echo i8ln( 'Enter Pokemon or Type' ); ?>"
                                   data-type="nests" class="search-input"/>
                            <ul id="nest-search-results" class="search-results nest-results"></ul>
                        </div>
                    <?php } ?>
                    <?php if ( ! $noSearchGyms ) { ?>
                        <div id="tab-gym">
                            <input type="search" id="gym-search" name="gym-search"
                                   placeholder="<?php echo i8ln( 'Enter Gym Name' ); ?>"
                                   data-type="forts" class="search-input"/>
                            <ul id="gym-search-results" class="search-results gym-results"></ul>
                        </div>
		    <?php } ?>
		    <?php if ( ! $noSearchPokestops ) { ?>
                        <div id="tab-pokestop">
                            <input type="search" id="pokestop-search" name="pokestop-search"
                                   placeholder="<?php echo i8ln( 'Enter Pokestop Name' ); ?>" data-type="pokestops"
                                   class="search-input"/>
                            <ul id="pokestop-search-results" class="search-results pokestop-results"></ul>
                        </div>
		    <?php } ?>
		    <?php if ( ! $noSearchPortals ) { ?>
                        <div id="tab-portals">
                            <input type="search" id="portals-search" name="portals-search"
                                   placeholder="<?php echo i8ln( 'Enter Portal Name' ); ?>" data-type="portals"
                                   class="search-input"/>
                            <ul id="portals-search-results" class="search-results portals-results"></ul>
                        </div>
		    <?php } ?>
                </div>
            </div>
        </div>
    <?php } ?>
    <?php
    if ( ( ! $noPokemon && ! $noManualPokemon ) || ( ! $noGyms && ! $noManualGyms ) || ( ! $noPokestops && ! $noManualPokestops ) || ( ! $noAddNewNests && ! $noNests ) || ( !$noAddNewCommunity && ! $noCommunity ) || ( !$noAddPoi && ! $noPoi ) ) {
        ?>
        <button class="submit-on-off-button" onclick="$('.submit-on-off-button').toggleClass('on');">
            <i class="fa fa-map-marker submit-to-map" aria-hidden="true"></i>
        </button>
        <div class="submit-modal" style="display:none;">
            <input type="hidden" value="" name="submitLatitude" class="submitLatitude"/>
            <input type="hidden" value="" name="submitLongitude" class="submitLongitude"/>
            <div id="submit-tabs">
                <ul>
                    <?php if ( ! $noManualPokemon && !$noPokemon ) {
                        ?>
                        <li><a href="#tab-pokemon"><img src="static/images/pokeball.png"/></a></li>
                    <?php } ?>
                    <?php if ( ! $noManualGyms && !$noGyms ) {
                        ?>
                        <li><a href="#tab-gym"><img src="static/forts/ingame/Uncontested.png"/></a></li>
                    <?php } ?>
                    <?php if ( ! $noManualPokestops && !$noPokestops) {
                        ?>
                        <li><a href="#tab-pokestop"><img src="static/forts/Pstop-large.png"/></a></li>
                    <?php } ?>
                    <?php if ( ! $noAddNewNests && !$noNests ) {
                        ?>
                        <li><a href="#tab-nests"><img src="static/images/nest.png"/></a></li>
		    <?php } ?>
                    <?php if ( ! $noAddNewCommunity && !$noCommunity ) {
                        ?>
                        <li><a href="#tab-communities"><img src="static/images/community.png"/></a></li>
                    <?php } ?>
                    <?php if ( ! $noAddPoi && !$noPoi ) {
                        ?>
                        <li><a href="#tab-poi"><img src="static/images/waystop-red.png"/></a></li>
                    <?php } ?>
                </ul>
                <?php if ( ! $noManualPokemon && !$noPokemon  ) {
                    ?>
                    <div id="tab-pokemon">
                        <input type="hidden" name="pokemonID" class="pokemonID"/>
                        <?php pokemonFilterImages( $noPokemonNumbers, 'pokemonSubmitFilter(event)', $pokemonToExclude, 6 ); ?>
                        <div class="button-container">
                            <button type="button" onclick="manualPokemonData(event);" class="submitting-pokemon"><i
                                    class="fa fa-binoculars"
                                    style="margin-right:10px;"></i><?php echo i8ln( 'Submit Pokemon' ); ?>
                            </button>
                        </div>
                    </div>
                <?php } ?>
                <?php if ( ! $noManualGyms && !$noGyms ) {
                    ?>
                    <div id="tab-gym">
                        <input type="text" id="gym-name" name="gym-name"
                               placeholder="<?php echo i8ln( 'Enter Gym Name' ); ?>" data-type="forts"
                               class="search-input">
                        <div class="button-container">
                            <button type="button" onclick="manualGymData(event);" class="submitting-gym"><i
                                    class="fa fa-binoculars"
                                    style="margin-right:10px;"></i><?php echo i8ln( 'Submit Gym' ); ?>
                            </button>
                        </div>
                    </div>
                <?php } ?>
                <?php if ( ! $noManualPokestops && !$noPokestops ) {
                    ?>
                    <div id="tab-pokestop">
                        <input type="text" id="pokestop-name" name="pokestop-name"
                               placeholder="<?php echo i8ln( 'Enter Pokestop Name' ); ?>" data-type="pokestop"
                               class="search-input">
                        <div class="button-container">
                            <button type="button" onclick="manualPokestopData(event);" class="submitting-pokestop"><i
                                    class="fa fa-binoculars"
                                    style="margin-right:10px;"></i><?php echo i8ln( 'Submit Pokestop' ); ?>
                            </button>
                        </div>
                    </div>
                <?php } ?>
                <?php if ( ! $noAddNewNests && !$noNests ) {
                    ?>
                    <div id="tab-nests">
                        <input type="hidden" name="pokemonID" class="pokemonID"/>
                        <?php pokemonFilterImages( $noPokemonNumbers, 'pokemonSubmitFilter(event)', $excludeNestMons, 7 ); ?>
                        <div class="button-container">
                            <button type="button" onclick="submitNewNest(event);" class="submitting-nest"><i
                                    class="fa fa-binoculars"
                                    style="margin-right:10px;"></i><?php echo i8ln( 'Submit Nest' ); ?>
                            </button>
                        </div>
                    </div>
                <?php } ?>
                <?php if ( ! $noAddNewCommunity && !$noCommunity ) {
                    ?>
                    <div id="tab-communities">
                        <input type="text" name="community-name" class="community-name"
                               placeholder="<?php echo i8ln( 'Enter Community Name' ); ?>" data-type="name"
			       class="search-input">
                        <input type="text" name="community-description" class="community-description"
                               placeholder="<?php echo i8ln( 'Enter description' ); ?>" data-type="description"
			       class="search-input">
                        <input type="text" name="community-invite" class="community-invite"
                               placeholder="<?php echo i8ln( 'Whatsapp, Telegram, Discord Link' ); ?>" data-type="invite-link"
			       class="search-input">
			<h6><center><?php echo i8ln( 'Link must be valid and start with https://' ); ?></center></h6>
                        <div class="button-container">
                            <button type="button" onclick="submitNewCommunity(event);" class="submitting-community"><i
                                    class="fa fa-comments"
                                    style="margin-right:10px;"></i><?php echo i8ln( 'Submit Community' ); ?>
                            </button>
                        </div>
                    </div>
                <?php } ?>
                <?php if ( ! $noAddPoi && !$noPoi ) {
                    ?>
                    <div id="tab-poi">
                        <input type="text" name="poi-name" class="poi-name"
                               placeholder="<?php echo i8ln( 'Enter Waystop Name' ); ?>" data-type="name"
			       class="search-input">
                        <input type="text" name="poi-description" class="poi-description"
                               placeholder="<?php echo i8ln( 'Enter Waystop Description' ); ?>" data-type="description"
			       class="search-input">
                        <?php if (! empty($imgurCID)) {
                             ?>
                            <div class="upload-button-container">
                                <button type="button"><i class="fa fa-upload"></i> <?php echo i8ln('Upload Waystop Image') ?></button>
                                <input type="file" id="poi-image" name="poi-image" accept="image/*" class="poi-image" data-type="poi-image" class="search-input" onchange='previewPoiImage(event)'>
                            </div>
                            <center><img id='preview-poi-image' name='preview-poi-image' width="50px" height="auto"></center>
                            <div class="upload-button-container">
                                <button type="button"><i class="fa fa-upload"></i> <?php echo i8ln('Upload Surrounding Image') ?></button>
                                <input type="file" id="poi-surrounding" name="poi-surrounding" accept="image/*" class="poi-surrounding" data-type="poi-surrounding" class="search-input" onchange='previewPoiSurrounding(event)'>
                            </div>
                            <center><img id='preview-poi-surrounding' name='preview-poi-surrounding' width="50px" height="auto" ></center>
                        <?php
                            } ?>
                        <div class="button-container">
			<h6><center><?php echo i8ln( 'If you submit a Waystop Candidate you agree that your discord username will be shown in the marker label' ); ?></center></h6>
                            <button type="button" onclick="submitPoi(event);" class="submitting-poi"><i
                                    class="fa fa-comments"
                                    style="margin-right:10px;"></i><?php echo i8ln( 'Submit Waystop Candidate' ); ?>
                            </button>
                        </div>
                    </div>
                <?php } ?>
            </div>
        </div>
        <?php
    }
    ?>
</div>
<!-- Scripts -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.9.1/polyfill.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.0/jquery-ui.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/skel/3.0.1/skel.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.10/js/select2.full.min.js"></script>
<script src="node_modules/datatables/media/js/jquery.dataTables.min.js"></script>
<script src="node_modules/moment/min/moment-with-locales.min.js"></script>
<script src="https://code.createjs.com/soundjs-0.6.2.min.js"></script>
<script src="node_modules/push.js/bin/push.min.js"></script>
<script src="node_modules/long/src/long.js"></script>
<script src="node_modules/leaflet/dist/leaflet.js"></script>
<script src="node_modules/leaflet-geosearch/dist/bundle.min.js"></script>
<script src="static/js/vendor/s2geometry.js"></script>
<script src="static/dist/js/app.min.js"></script>
<script src="static/js/vendor/classie.js"></script>
<script src="node_modules/leaflet.markercluster/dist/leaflet.markercluster.js"></script>
<script src='static/js/vendor/Leaflet.fullscreen.min.js'></script>
<script src="static/js/vendor/smoothmarkerbouncing.js"></script>
<script src='https://maps.googleapis.com/maps/api/js?key=<?= $gmapsKey ?> ' async defer></script>
<script src="static/js/vendor/Leaflet.GoogleMutant.js"></script>
<script src="static/js/vendor/turf.min.js"></script>
<script>
    var centerLat = <?= $startingLat; ?>;
    var centerLng = <?= $startingLng; ?>;
    var locationSet = <?= $locationSet; ?>;
    var motd = <?php echo $noMotd ? 'false' : 'true' ?>;
    var zoom<?php echo $zoom ? " = " . $zoom : null; ?>;
    var initialZoom = <?php echo $startingZoom; ?>;
    var encounterId<?php echo $encounterId ? " = '" . $encounterId . "'" : null; ?>;
    var maxZoom = <?= $maxZoomIn; ?>;
    var minZoom = <?= $maxZoomOut; ?>;
    var maxLatLng = <?= $maxLatLng; ?>;
    var disableClusteringAtZoom = <?= $disableClusteringAtZoom; ?>;
    var zoomToBoundsOnClick = <?= $zoomToBoundsOnClick; ?>;
    var maxClusterRadius = <?= $maxClusterRadius; ?>;
    var spiderfyOnMaxZoom = <?= $spiderfyOnMaxZoom; ?>;
    var osmTileServer = '<?php echo $osmTileServer; ?>';
    var maxNativeZoomOSM = <?= $maxNativeZoomOSM; ?>;
    var mapStyle = '<?php echo $mapStyle ?>';
    var gmapsKey = '<?php echo $gmapsKey ?>';
	var mBoxKey = '<?php echo $mBoxKey ?>';
    var hidePokemon = <?php echo $noHidePokemon ? '[]' : $hidePokemon ?>;
    var excludeMinIV = <?php echo $noExcludeMinIV ? '[]' : $excludeMinIV ?>;
    var minIV = <?php echo $noMinIV ? '""' : $minIV ?>;
    var minLevel = <?php echo $noMinLevel ? '""' : $minLevel ?>;
    var minPVP = <?php echo $noMinPVPPerc ? '""' : $minPVP ?>;
    var notifyPokemon = <?php echo $noNotifyPokemon ? '[]' : $notifyPokemon ?>;
    var notifyIv = <?php echo $noNotifyIv ? '""' : $notifyIv ?>;
    var notifyLevel = <?php echo $noNotifyLevel ? '""' : $notifyLevel ?>;
    var notifyRaid = <?php echo $noNotifyRaid ? 0 : $notifyRaid ?>;
    var notifyBounce = <?php echo $notifyBounce ?>;
    var notifyNotification = <?php echo $notifyNotification ?>;
    var enableRaids = <?php echo $noRaids ? 'false' : $enableRaids ?>;
    var activeRaids = <?php echo $activeRaids ?>;
    var minRaidLevel = <?php echo $minRaidLevel ?>;
    var maxRaidLevel = <?php echo $maxRaidLevel ?>;
    var enableGyms = <?php echo $noGyms ? 'false' : $enableGyms ?>;
    var enableNests = <?php echo $noNests ? 'false' : $enableNests ?>;
    var enableCommunities = <?php echo $noCommunity ? 'false' : $enableCommunities ?>;
    var gymSidebar = <?php echo $noGymSidebar ? 'false' : $gymSidebar ?>;
    var enablePokemon = <?php echo $noPokemon ? 'false' : $enablePokemon ?>;
    var enablePokestops = <?php echo $noPokestops ? 'false' : $enablePokestops ?>;
    var noLures = <?php echo $noLures === true ? 'true' : 'false' ?>;
    var enableLured = <?php echo $noLures ? 'false' : $enableLured ?>;
    var noInvasions = <?php echo $noRocketInvasions === true ? 'true' : 'false' ?>;
    var enableInvasions = <?php echo $noRocketInvasions ? 'false' : $enableInvasions ?>;
	var hideGrunts = <?php echo $noRocketInvasions ? '[]' : $hideGrunts ?>;
    var noInvasionTimer = <?php echo $noInvasionTimer === true ? 'true' : 'false' ?>;
    var enableInvasionTimer = <?php echo $noInvasionTimer ? 'false' : $enableInvasionTimer ?>;
    var noQuests = <?php echo $noQuests === true ? 'true' : 'false' ?>;
    var enableQuests = <?php echo $noQuests ? 'false' : $enableQuests ?>;
    var enableQuestsItemsAmounts = <?php echo $noQuestsItemsAmounts ? 'false' : $enableQuestsItemsAmounts ?>;
    var hideQuestsPokemon = <?php echo $noQuestsPokemon ? '[]' : $hideQuestsPokemon ?>;
    var hideQuestsItem = <?php echo $noQuestsItems ? '[]' : $hideQuestsItem ?>;
    var hideQuestsEnergy = <?php echo $noQuestsEnergy ? '[]' : $hideQuestsEnergy ?>;
    var enableNewPortals = <?php echo $enableNewPortals ?>;
    var enableWeatherOverlay = <?php echo ! $noWeatherOverlay ? $enableWeatherOverlay : 'false' ?>;
    var enableSpawnpoints = <?php echo $noSpawnPoints ? 'false' : $enableSpawnPoints ?>;
    var enableRanges = <?php echo $noRanges ? 'false' : $enableRanges ?>;
    var enableScanPolygon = <?php echo $noScanPolygon ? 'false' : $enableScanPolygon ?>;
    var enableScanPolygonQuest = <?php echo $noScanPolygonQuest ? 'false' : $enableScanPolygonQuest ?>;
    var enableScanPolygonPvp = <?php echo $noScanPolygonPvp ? 'false' : $enableScanPolygonPvp ?>;
    var geoJSONfile = '<?php echo $noScanPolygon ? '' : $geoJSONfile ?>';
    var nestJSONfile = '<?php echo $noNests ? '' : $nestJSONfile ?>';
    var geoJSONfileQuest = '<?php echo $noScanPolygonQuest ? '' : $geoJSONfileQuest ?>';
    var geoJSONfilePvp = '<?php echo $noScanPolygonPvp ? '' : $geoJSONfilePvp ?>';
    var pvptext1 = '<?php echo $noScanPolygonPvp ? '' : $pvptext1 ?>';
    var pvptext2 = '<?php echo $noScanPolygonPvp ? '' : $pvptext2 ?>';
    var pvptext3 = '<?php echo $noScanPolygonPvp ? '' : $pvptext3 ?>';
    var pvptext4 = '<?php echo $noScanPolygonPvp ? '' : $pvptext4 ?>';
    var notifySound = <?php echo $noNotifySound ? 'false' : $notifySound ?>;
    var criesSound = <?php echo $noCriesSound ? 'false' : $criesSound ?>;
    var enableStartMe = <?php echo $noStartMe ? 'false' : $enableStartMe ?>;
    var enableStartLast = <?php echo ( ! $noStartLast && $enableStartMe === 'false' ) ? $enableStartLast : 'false' ?>;
    var enableFollowMe = <?php echo $noFollowMe ? 'false' : $enableFollowMe ?>;
    var enableSpawnArea = <?php echo $noSpawnArea ? 'false' : $enableSpawnArea ?>;
    var iconSize = <?php echo $iconSize ?>;
    var iconNotifySizeModifier = <?php echo $iconNotifySizeModifier ?>;
    var locationStyle = '<?php echo $locationStyle ?>';
    var gymStyle = '<?php echo $gymStyle ?>';
    var spriteFileLarge = '<?php echo $copyrightSafe ? 'static/icons-safe-1-bigger.png' : 'static/icons-im-1-bigger.png' ?>';
    var weatherSpritesSrc = '<?php echo $copyrightSafe ? 'static/sprites-safe/' : 'static/sprites-pokemon/' ?>';
    var icons = '<?php echo $copyrightSafe ? 'static/icons-safe/' : $iconRepository ?>';
    var rewardIcons = '<?php echo $copyrightSafe ? 'static/icons-safe/' : $rewardsIconsRepository ?>';
    var weatherColors = <?php echo json_encode( $weatherColors ); ?>;
    var weatherCellsFillOpacity = <?php echo $noWeatherOverlay === true ? 0 : $weatherCellsFillOpacity ?>;
    var mapType = '<?php echo 'rdm'; ?>';
    var triggerGyms = <?php echo $triggerGyms ?>;
    var noExGyms = <?php echo $noExGyms === true ? 'true' : 'false' ?>;
    var noParkInfo = <?php echo $noParkInfo === true ? 'true' : 'false' ?>;
    var onlyTriggerGyms = <?php echo $onlyTriggerGyms === true ? 'true' : 'false' ?>;
    var showBigKarp = <?php echo $noBigKarp === true ? 'true' : 'false' ?>;
    var enableBigKarps = <?php echo $noBigKarp ? 'false' : $enableBigKarps ?>;
    var showTinyRat = <?php echo $noTinyRat === true ? 'true' : 'false' ?>;
	var enableTinyRats = <?php echo $noTinyRat ? 'false' : $enableTinyRats ?>;
    var hidePokemonCoords = <?php echo $hidePokemonCoords === true ? 'true' : 'false' ?>;
    var directionProvider = '<?php echo $noDirectionProvider === true ? $directionProvider : 'google' ?>';
    var exEligible = <?php echo $noExEligible === true ? 'false' : $exEligible  ?>;
    var raidBossActive = <?php echo json_encode( $raidBosses ); ?>;
    var manualRaids = <?php echo $noManualRaids === true ? 'false' : 'true' ?>;
    var pokemonReportTime = <?php echo $pokemonReportTime === true ? 'true' : 'false' ?>;
    var noDeleteGyms = <?php echo $noDeleteGyms === true ? 'true' : 'false' ?>;
    var noToggleExGyms = <?php echo $noToggleExGyms === true ? 'true' : 'false' ?>;
    var defaultUnit = '<?php echo $defaultUnit ?>';
    var noDeletePokestops = <?php echo $noDeletePokestops === true ? 'true' : 'false' ?>;
    var noDeleteNests = <?php echo $noDeleteNests === true ? 'true' : 'false' ?>;
    var noManualNests = <?php echo $noManualNests === true ? 'true' : 'false' ?>;
    var noManualQuests = <?php echo $noManualQuests === true ? 'true' : 'false' ?>;
    var noAddNewCommunity = <?php echo $noAddNewCommunity === true ? 'true' : 'false' ?>;
    var noDeleteCommunity = <?php echo $noDeleteCommunity === true ? 'true' : 'false' ?>;
    var noEditCommunity = <?php echo $noEditCommunity === true ? 'true' : 'false' ?>;
    var login = <?php echo $noNativeLogin === false || $noDiscordLogin === false  ? 'true' : 'false' ?>;
    var expireTimestamp = <?php echo isset($_SESSION['user']->expire_timestamp) ? $_SESSION['user']->expire_timestamp : 0 ?>;
    var timestamp = <?php echo time() ?>;
    var noRenamePokestops = <?php echo $noRenamePokestops === true ? 'true' : 'false' ?>;
    var noConvertPokestops = <?php echo $noConvertPokestops === true ? 'true' : 'false' ?>;
    var noWhatsappLink = <?php echo $noWhatsappLink === true ? 'true' : 'false' ?>;
    var noWhatsappLinkQuests = <?php echo $noWhatsappLinkQuests === true ? 'true' : 'false' ?>;
    var enablePoi = <?php echo $noPoi ? 'false' : $enablePoi ?>;
    var enablePortals = <?php echo $noPortals ? 'false' : $enablePortals ?>;
    var noDeletePoi = <?php echo $noDeletePoi === true ? 'true' : 'false' ?>;
    var noEditPoi = <?php echo $noEditPoi === true ? 'true' : 'false' ?>;
    var noMarkPoi = <?php echo $noMarkPoi === true ? 'true' : 'false' ?>;
    var noPortals = <?php echo $noPortals === true ? 'true' : 'false' ?>;
    var enableS2Cells = <?php echo $noS2Cells ? 'false' : $enableS2Cells ?>;
    var enableLevel13Cells = <?php echo $noS2Cells ? 'false' : $enableLevel13Cells ?>;
    var enableLevel14Cells = <?php echo $noS2Cells ? 'false' : $enableLevel14Cells ?>;
    var enableLevel17Cells = <?php echo $noS2Cells ? 'false' : $enableLevel17Cells ?>;
    var enableFillCoveredPokestopCells = <?php echo $enableFillCoveredPokestopCells ? 'false' : $enableFillCoveredPokestopCells ?>;
    var enableGymCellCalculations = <?php echo $enableGymCellCalculations ? 'false' : $enableGymCellCalculations ?>;
    var noDeletePortal = <?php echo $noDeletePortal === true ? 'true' : 'false' ?>;
    var noConvertPortal = <?php echo $noConvertPortal === true ? 'true' : 'false' ?>;
    var markPortalsAsNew = <?php echo $markPortalsAsNew ?>;
    var copyrightSafe = <?php echo $copyrightSafe === true ? 'true' : 'false' ?>;
    var noWeatherIcons = <?php echo $noWeatherIcons === true ? 'true' : 'false' ?>;
    var enableWeatherIcons = <?php echo $noWeatherIcons ? 'false' : $enableWeatherIcons ?>;
    var noPokeIVIcons = <?php echo $noPokeIVIcons === true ? 'true' : 'false' ?>;
    var enablePokeIVIcons = <?php echo $noPokeIVIcons ? 'false' : $enablePokeIVIcons ?>;
    var noGymScannedText = <?php echo $noGymScannedText === true ? 'true' : 'false' ?>;
    var noMaplink = <?php echo $noMaplink === true ? 'true' : 'false' ?>;
    var noGymTeamInfos = <?php echo $noGymTeamInfos === true ? 'true' : 'false' ?>;
    var noOutdatedGyms = <?php echo $noOutdatedGyms === true ? 'true' : 'false' ?>;
    var $noExportImport = <?php echo $noOutdatedGyms === true ? 'true' : 'false' ?>;
    var noBattleStatus = <?php echo $noBattleStatus === true ? 'true' : 'false' ?>;
    var battleStatus = <?php echo $noBattleStatus === true ? 'false' : $battleStatus  ?>;
    var $noOverlayDesign = <?php echo $noOverlayDesign === true ? 'true' : 'false' ?>;
    var overlayDesign = '<?php echo $overlayDesign ?>';
    var noPokestopImages = <?php echo $noPokestopImages === true ? 'true' : 'false' ?>;
    var noRaidMoves  = <?php echo $noRaidMoves === true ? 'true' : 'false' ?>;
    var noCostumeIcons = <?php echo $noCostumeIcons === true ? 'true' : 'false' ?>;
    var noInvasionEncounterData = <?php echo $noInvasionEncounterData === true ? 'true' : 'false' ?>;
    var noRaidTimer = <?php echo $noRaidTimer === true ? 'true' : 'false' ?>;
    var enableRaidTimer = <?php echo $noRaidTimer ? 'false' : $enableRaidTimer ?>;
    var noPokestopFirstseen = <?php echo $noPokestopFirstseen === true ? 'true' : 'false' ?>;
    var noGymFirstseen = <?php echo $noGymFirstseen === true ? 'true' : 'false' ?>;
    var noIvGlow = <?php echo $noIv100Glow === true ? 'true' : 'false' ?>;
    var glowColor = '<?php echo $Iv100GlowColor ?>';
	var noRaidCounterGuide = <?php echo $noRaidCounterGuide === true ? 'true' : 'false' ?>;
	var noQuestPokemonCP = <?php echo $noQuestPokemonCP === true ? 'true' : 'false' ?>;
	var noRaidPokemonCP = <?php echo $noRaidPokemonCP === true ? 'true' : 'false' ?>;
	var noWhatsappRaidMoves = <?php echo $noWhatsappRaidMoves === true ? 'true' : 'false' ?>;
    var numberOfPokemon = <?php echo $numberOfPokemon; ?>;
    var numberOfItem = <?php echo $numberOfItem; ?>;
    var numberOfGrunt = <?php echo $numberOfGrunt; ?>;
    var noRaids = <?php echo $noRaids === true ? 'true' : 'false' ?>;
	var hideRaidPokemon = <?php echo $noRaids ? '[]' : $hideRaidPokemon ?>;
	var raidbossFilterlist = <?php echo $noRaidfilterList === true ? 'true' : $raidbossFilterlist ?>;
	var filterByRaidlevel = <?php echo $noFilterByRaidlevel === true ? 'true' : $filterByRaidlevel ?>;
	var hideRaidEggs = <?php echo $noRaids ? '[]' : $hideRaidEggs ?>;
	var customTileServers = <?php echo json_encode($customTileServers);?>;
    var forcedTileServer = <?php echo $forcedTileServer === true ? 'true' : 'false' ?>;
    var pokemonLabelStyle = '<?php echo $pokemonLabelStyle ?>';
	var useIconRepoPokeRewards = <?php echo $usePokeRewardsFromIconRepository === true ? 'true' : 'false' ?>;
    var letItSnow = <?php echo $letItSnow === true ? 'true' : 'false' ?>;
    var makeItBang = <?php echo $makeItBang === true ? 'true' : 'false' ?>;
    var valentine = <?php echo $valentine === true ? 'true' : 'false' ?>;
    var noGymBadgeMode = <?php echo $noGymBadgeMode === true ? 'true' : 'false' ?>;
    var gymBadgeMode = <?php echo $noGymBadgeMode === true ? 'false' : $gymBadgeMode ?>;
    var openPopupOnHovering = <?php echo $openPopupOnHovering === true ? 'true' : 'false' ?>;
    var onlyOnePopup = <?php echo $onlyOnePopup === true ? 'true' : 'false' ?>;
	var denyRaidLevels = <?php echo $noRaids ? '[1,2,3,4,5,6]' : $denyRaidLevels ?>;
    var enableLiveScan = <?php echo $noLiveScanLocation ? 'false' : $enableLiveScan ?>;
    var deviceOfflineAfterSeconds = <?php echo $deviceOfflineAfterSeconds ?>;
    var noPokePVPStats = <?php echo $noPokePVPStats === true ? 'true' : 'false' ?>;
    var enablePokePVPStats = <?php echo $noPokePVPStats ? 'false' : $enablePokePVPStats ?>;
	
</script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>
<script src="static/dist/js/map.common.min.js"></script>
<script src="static/dist/js/map.min.js"></script>
<script src="static/dist/js/stats.min.js"></script>
<script>
$( document ).ready(function() {
    initMap()
})
</script>
</body>
</html>
