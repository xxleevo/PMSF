<?php

namespace Scanner;

class RDM extends Scanner
{
    public function get_active($eids, $minIv, $minLevel, $exMinIv, $bigKarp, $tinyRat, $swLat, $swLng, $neLat, $neLng, $tstamp = 0, $oSwLat = 0, $oSwLng = 0, $oNeLat = 0, $oNeLng = 0, $encId = 0)
    {
        global $db;
        $conds = array();
        $params = array();
        $float = $db->info()['driver'] == 'pgsql' ? "::float" : "";
		
	    $select = "pokemon_id, expire_timestamp AS disappear_time, id AS encounter_id, spawn_id, lat AS latitude, lon AS longitude, gender, form, weather AS weather_boosted_condition, costume, expire_timestamp_verified AS is_verified_despawn, display_pokemon_id";

        global $noHighLevelData;
        if (!$noHighLevelData) {
            $select .= ", weight,size AS height, atk_iv AS individual_attack, def_iv AS individual_defense, sta_iv AS individual_stamina, move_1, move_2, cp, level";
        }
		
        $conds[] = "lat > :swLat AND lon > :swLng AND lat < :neLat AND lon < :neLng AND expire_timestamp > :time";
        $params[':swLat'] = $swLat;
        $params[':swLng'] = $swLng;
        $params[':neLat'] = $neLat;
        $params[':neLng'] = $neLng;
        $params[':time'] = time();

        if ($oSwLat != 0) {
            $conds[] = "NOT (lat > :oswLat AND lon > :oswLng AND lat < :oneLat AND lon < :oneLng)";
            $params[':oswLat'] = $oSwLat;
            $params[':oswLng'] = $oSwLng;
            $params[':oneLat'] = $oNeLat;
            $params[':oneLng'] = $oNeLng;
        }
        if ($tstamp > 0) {
            $conds[] = "updated > :lastUpdated";
            $params[':lastUpdated'] = $tstamp;
        }
        $tmpSQL = '';
        if (!empty($tinyRat) && $tinyRat === 'true' && ($key = array_search("19", $eids)) === false) {
            $tmpSQL .= ' OR (pokemon_id = 19 AND weight' . $float . ' < 2.41)';
            $eids[] = "19";
        }
        if (!empty($bigKarp) && $bigKarp === 'true' && ($key = array_search("129", $eids)) === false) {
            $tmpSQL .= ' OR (pokemon_id = 129 AND weight' . $float . ' > 13.13)';
            $eids[] = "129";
        }
        if (count($eids)) {
            $pkmn_in = '';
            $i = 1;
            foreach ($eids as $id) {
                $params[':qry_' . $i . "_"] = $id;
                $pkmn_in .= ':qry_' . $i . "_,";
                $i++;
            }
            $pkmn_in = substr($pkmn_in, 0, -1);
            $conds[] = "(pokemon_id NOT IN ( $pkmn_in )" . $tmpSQL . ")";
        }
        if (!empty($minIv) && !is_nan((float)$minIv) && $minIv != 0) {
            $minIv = $minIv * .45;
            if (empty($exMinIv)) {
                $conds[] = '(atk_iv' . $float . ' + def_iv' . $float . ' + sta_iv' . $float . ') >= ' . $minIv;
            } else {
                $conds[] = '((atk_iv' . $float . ' + def_iv' . $float . ' + sta_iv' . $float . ') >= ' . $minIv . ' OR pokemon_id IN(' . $exMinIv . ') )';
            }
        }
        if (!empty($minLevel) && !is_nan((float)$minLevel) && $minLevel != 0) {
            if (empty($exMinIv)) {
                $conds[] = 'level >= ' . $minLevel;
            } else {
                $conds[] = '(level >= ' . $minLevel . ' OR pokemon_id IN(' . $exMinIv . ') )';
            }
        }
		
		
        $encSql = '';
        if ($encId != 0) {
            $encSql = " OR (id = " . $encId . " AND lat > '" . $swLat . "' AND lon > '" . $swLng . "' AND lat < '" . $neLat . "' AND lon < '" . $neLng . "' AND expire_timestamp > '" . $params[':time'] . "')";
        }
        return $this->query_active($select, $conds, $params, $encSql);
    }

    public function get_active_by_id($ids, $minIv, $minLevel, $exMinIv, $bigKarp, $tinyRat, $swLat, $swLng, $neLat, $neLng)
    {
        global $db;
        $conds = array();
        $params = array();
        $float = $db->info()['driver'] == 'pgsql' ? "::float" : "";

        $select = "pokemon_id, expire_timestamp AS disappear_time, id AS encounter_id, spawn_id, lat AS latitude, lon AS longitude, gender, form, weather AS weather_boosted_condition, costume, expire_timestamp_verified AS is_verified_despawn, display_pokemon_id";

        global $noHighLevelData;
        if (!$noHighLevelData) {
            $select .= ", weight, size AS height, atk_iv AS individual_attack, def_iv AS individual_defense, sta_iv AS individual_stamina, move_1, move_2, cp, level";
        }
		
        $conds[] = "lat > :swLat AND lon > :swLng AND lat < :neLat AND lon < :neLng AND expire_timestamp > :time";
        $params[':swLat'] = $swLat;
        $params[':swLng'] = $swLng;
        $params[':neLat'] = $neLat;
        $params[':neLng'] = $neLng;
        $params[':time'] = time();
        if (count($ids)) {
            $tmpSQL = '';
            if (!empty($tinyRat) && $tinyRat === 'true' && ($key = array_search("19", $ids)) !== false) {
                $tmpSQL .= ' OR (pokemon_id = 19 AND weight' . $float . ' < 2.41)';
                unset($ids[$key]);
            }
            if (!empty($bigKarp) && $bigKarp === 'true' && ($key = array_search("129", $ids)) !== false) {
                $tmpSQL .= ' OR (pokemon_id = 129 AND weight' . $float . ' > 13.13)';
                unset($ids[$key]);
            }
            $pkmn_in = '';
            $i = 1;
            foreach ($ids as $id) {
                $params[':qry_' . $i . "_"] = $id;
                $pkmn_in .= ':qry_' . $i . "_,";
                $i++;
            }
            if (count($ids)) {
                $pkmn_in = substr($pkmn_in, 0, -1);
                $conds[] = "(pokemon_id IN ( $pkmn_in )" . $tmpSQL . ")";
            } else {
                $conds[] = str_replace("OR", "", $tmpSQL);
            }
        }

        if (!empty($minIv) && !is_nan((float)$minIv) && $minIv != 0) {
            $minIv = $minIv * .45;
            if (empty($exMinIv)) {
                $conds[] = '(atk_iv' . $float . ' + def_iv' . $float . ' + sta_iv' . $float . ') >= ' . $minIv;
            } else {
                $conds[] = '((atk_iv' . $float . ' + def_iv' . $float . ' + sta_iv' . $float . ') >= ' . $minIv . ' OR pokemon_id IN(' . $exMinIv . ') )';
            }
        }
        if (!empty($minLevel) && !is_nan((float)$minLevel) && $minLevel != 0) {
            if (empty($exMinIv)) {
                $conds[] = 'level >= ' . $minLevel;
            } else {
                $conds[] = '(level >= ' . $minLevel . ' OR pokemon_id IN(' . $exMinIv . ') )';
            }
        }
        return $this->query_active($select, $conds, $params);
    }

    public function query_active($select, $conds, $params, $encSql = '')
    {
        global $db;

        $query = "SELECT :select
        FROM pokemon 
        WHERE :conditions ORDER BY lat,lon ";

        $query = str_replace(":select", $select, $query);
        $query = str_replace(":conditions", '(' . join(" AND ", $conds) . ')' . $encSql, $query);
        $pokemons = $db->query($query, $params)->fetchAll(\PDO::FETCH_ASSOC);
        $data = array();
        $i = 0;
        $lastlat = 0;
        $lastlon=0;
        $lasti = 0;
        
        foreach ($pokemons as $pokemon) {
            // Jitter pokemon when they have no spawn_id
            if ( empty($pokemon['spawn_id'])) {
                $pokemon["latitude"] = floatval($pokemon["latitude"]);
                $pokemon["longitude"] = floatval($pokemon["longitude"]);
                $lastlat = floatval($pokemon["latitude"]);
                $lastlon = floatval($pokemon["longitude"]);
                if (abs($pokemon["latitude"] - $lastlat) < 0.0001 && abs($pokemon["longitude"] - $lastlon) < 0.0001) {
                    $lasti = $lasti + 1;
                } else {
                    $lasti = 0;
                }
                $pokemon["latitude"] = $pokemon["latitude"] + 0.0003*cos(deg2rad($lasti*45));
				$pokemon["longitude"] = $pokemon["longitude"] + 0.0003*sin(deg2rad($lasti*45));
            } else {
                $pokemon["latitude"] = floatval($pokemon["latitude"]);
				$pokemon["longitude"] = floatval($pokemon["longitude"]);
            }
            $pokemon["disappear_time"] = $pokemon["disappear_time"] * 1000;
            $pokemon["weight"] = isset($pokemon["weight"]) ? floatval($pokemon["weight"]) : null;
            $pokemon["height"] = isset($pokemon["height"]) ? floatval($pokemon["height"]) : null;
            $pokemon["individual_attack"] = isset($pokemon["individual_attack"]) ? intval($pokemon["individual_attack"]) : null;
            $pokemon["individual_defense"] = isset($pokemon["individual_defense"]) ? intval($pokemon["individual_defense"]) : null;
            $pokemon["individual_stamina"] = isset($pokemon["individual_stamina"]) ? intval($pokemon["individual_stamina"]) : null;
            $pokemon["weather_boosted_condition"] = isset($pokemon["weather_boosted_condition"]) ? intval($pokemon["weather_boosted_condition"]) : 0;
            $pokemon["pokemon_id"] = intval($pokemon["pokemon_id"]);
            $pokemon["is_verified_despawn"] = intval($pokemon["is_verified_despawn"]);
            $pokemon["pokemon_name"] = i8ln($this->data[$pokemon["pokemon_id"]]['name']);
			if (isset($pokemon["display_pokemon_id"]) && $pokemon["display_pokemon_id"] > 0) {
				$pokemon["display_pokemon_name"] = i8ln($this->data[$pokemon["display_pokemon_id"]]['name']);
			}
            if (isset($pokemon["form"]) && $pokemon["form"] > 0) {
                $forms = $this->data[$pokemon["pokemon_id"]]["forms"];
                foreach ($forms as $f => $v) {
                    if ($pokemon["form"] === $v['protoform']) {
                        $types = $v['formtypes'];
						$pokemon["form_name"] = $v['nameform'];
                        foreach ($v['formtypes'] as $ft => $v) {
                            $types[$ft]['type'] = i8ln($v['type']);
                        }
                        $pokemon["pokemon_types"] = $types;
                    } else if ($pokemon["form"] === $v['assetsform']) {
                        $types = $v['formtypes'];
                        foreach ($v['formtypes'] as $ft => $v) {
                            $types[$ft]['type'] = i8ln($v['type']);
                        }
                        $pokemon["pokemon_types"] = $types;
                    }
                }
            } else {
                $types = $this->data[$pokemon["pokemon_id"]]["types"];
                foreach ($types as $k => $v) {
                    $types[$k]['type'] = i8ln($v['type']);
                }
                $pokemon["pokemon_types"] = $types;
            }

            $data[] = $pokemon;

            unset($pokemons[$i]);
            $i++;
        }
        return $data;
    }

    public function get_stops($geids, $qpeids, $qieids, $swLat, $swLng, $neLat, $neLng, $tstamp = 0, $oSwLat = 0, $oSwLng = 0, $oNeLat = 0, $oNeLng = 0, $lures, $quests, $dustamount)
    {
        $conds = array();
        $params = array();
        $conds[] = "lat > :swLat AND lon > :swLng AND lat < :neLat AND lon < :neLng";
        $params[':swLat'] = $swLat;
        $params[':swLng'] = $swLng;
        $params[':neLat'] = $neLat;
        $params[':neLng'] = $neLng;
        if (!empty($quests) && $quests === 'true') {
            $pokemonSQL = '';
			if (count($qpeids)) {
                $pkmn_in = '';
                $p = 1;
                foreach ($qpeids as $qpeid) {
                    $params[':pqry_' . $p . "_"] = $qpeid;
                    $pkmn_in .= ':pqry_' . $p . "_,";
                    $p++;
                }
                $pkmn_in = substr($pkmn_in, 0, -1);
                $pokemonSQL .= "quest_pokemon_id NOT IN ( $pkmn_in )";
            } else {
                $pokemonSQL .= "quest_pokemon_id IS NOT NULL";
            }
            $itemSQL = '';
            if (count($qieids)) {
                $item_in = '';
                $i = 1;
                foreach ($qieids as $qieid) {
                    $params[':iqry_' . $i . "_"] = $qieid;
                    $item_in .= ':iqry_' . $i . "_,";
                    $i++;
                }
                $item_in = substr($item_in, 0, -1);
                $itemSQL .= "quest_item_id NOT IN ( $item_in )";
            } else {
                $itemSQL .= "quest_item_id IS NOT NULL";
			}
			$dustSQL = '';
            if (!empty($dustamount) && !is_nan((float)$dustamount) && $dustamount > 0) {
                $dustSQL .= "OR (json_extract(json_extract(`quest_rewards`,'$[*].type'),'$[0]') = 3 AND json_extract(json_extract(`quest_rewards`,'$[*].info.amount'),'$[0]') > :amount)";
                $params[':amount'] = intval($dustamount);
            }
            $conds[] = "(" . $pokemonSQL . " OR " . $itemSQL . ")" . $dustSQL . "";
        }
        if (!empty($rocket) && $rocket === 'true') {
            $rocketSQL = '';
            if (count($geids)) {
                $rocket_in = '';
                $r = 1;
                foreach ($geids as $geid) {
                    $params[':rqry_' . $r . "_"] = $geid;
                    $rocket_in .= ':rqry_' . $r . "_,";
                    $r++;
                }
                $rocket_in = substr($rocket_in, 0, -1);
                $rocketSQL .= "grunt_type NOT IN ( $rocket_in )";
            } else {
                $rocketSQL .= "grunt_type IS NOT NULL";
            }
            $conds[] = "" . $rocketSQL . "";
        }
        if ($oSwLat != 0) {
            $conds[] = "NOT (lat > :oswLat AND lon > :oswLng AND lat < :oneLat AND lon < :oneLng)";
            $params[':oswLat'] = $oSwLat;
            $params[':oswLng'] = $oSwLng;
            $params[':oneLat'] = $oNeLat;
            $params[':oneLng'] = $oNeLng;
		}
        if (!empty($lures) && $lures === 'true') {
            $conds[] = "lure_expire_timestamp > :time";
            $params[':time'] = time();
        }
        if ($tstamp > 0) {
            $conds[] = "updated > :lastUpdated";
            $params[':lastUpdated'] = $tstamp;
        }
        return $this->query_stops($conds, $params);
    }


    public function get_stops_quest($greids, $qpreids, $qireids, $swLat, $swLng, $neLat, $neLng, $tstamp = 0, $oSwLat = 0, $oSwLng = 0, $oNeLat = 0, $oNeLng = 0, $lures, $quests, $dustamount, $reloaddustamount)
    {
        $conds = array();
        $params = array();
        $conds[] = "lat > :swLat AND lon > :swLng AND lat < :neLat AND lon < :neLng";
        $params[':swLat'] = $swLat;
        $params[':swLng'] = $swLng;
        $params[':neLat'] = $neLat;
        $params[':neLng'] = $neLng;
        if (!empty($quests) && $quests === 'true') {
            $tmpSQL = '';
			if (count($qpreids)) {
                $pkmn_in = '';
                $p = 1;
                foreach ($qpreids as $qpreid) {
                    $params[':pqry_' . $p . "_"] = $qpreid;
                    $pkmn_in .= ':pqry_' . $p . "_,";
                    $p++;
                }
                $pkmn_in = substr($pkmn_in, 0, -1);
                $tmpSQL .= "quest_pokemon_id IN ( $pkmn_in )";
            } else {
                $tmpSQL .= "";
            }
            if (count($qireids)) {
                $item_in = '';
                $i = 1;
                foreach ($qireids as $qireid) {
                    $params[':iqry_' . $i . "_"] = $qireid;
                    $item_in .= ':iqry_' . $i . "_,";
                    $i++;
                }
                $item_in = substr($item_in, 0, -1);
                $tmpSQL .= "quest_item_id IN ( $item_in )";
            } else {
                $tmpSQL .= "";
            }
            if ($reloaddustamount == "true") {
                $tmpSQL .= "(json_extract(json_extract(`quest_rewards`,'$[*].type'),'$[0]') = 3 AND json_extract(json_extract(`quest_rewards`,'$[*].info.amount'),'$[0]') > :amount)";
                $params[':amount'] = intval($dustamount);
			} else {
                $tmpSQL .= "";
            }
            $conds[] = $tmpSQL;
        }
        if (!empty($rocket) && $rocket === 'true') {
            $tmpSQL = '';
            if (count($greids)) {
                $rocket_in = '';
                $r = 1;
                foreach ($greids as $greid) {
                    $params[':rqry_' . $r . "_"] = $greid;
                    $rocket_in .= ':rqry_' . $r . "_,";
                    $r++;
                }
                $rocket_in = substr($rocket_in, 0, -1);
                $tmpSQL .= "grunt_type IN ( $rocket_in )";
            }
            $conds[] = $tmpSQL;
        }
        return $this->query_stops($conds, $params);
    }

    public function query_stops($conds, $params)
    {
        global $db, $noManualQuests;

        $query = "SELECT id AS pokestop_id,
        lat AS latitude,
        lon AS longitude,
        name AS pokestop_name,
        url,
        lure_expire_timestamp AS lure_expiration,
		lure_id,
		grunt_type,
        quest_type,
        quest_timestamp,
        quest_target,
        quest_rewards,
        quest_pokemon_id,
        quest_item_id,
		pokestop_display AS invasion,
		first_seen_timestamp as first_seen,
		incident_expire_timestamp AS invasion_expiration,
        json_extract(json_extract(`quest_conditions`,'$[*].type'),'$[0]') AS quest_condition_type,
        json_extract(json_extract(`quest_conditions`,'$[*].type'),'$[1]') AS quest_condition_type_1,
        json_extract(json_extract(`quest_conditions`,'$[*].info'),'$[0]') AS quest_condition_info,
        json_extract(json_extract(`quest_rewards`,'$[*].type'),'$[0]') AS quest_reward_type,
        json_extract(json_extract(`quest_rewards`,'$[*].info'),'$[0]') AS quest_reward_info,
        json_extract(json_extract(`quest_rewards`,'$[*].info.amount'),'$[0]') AS quest_reward_amount,
        json_extract(json_extract(`quest_rewards`,'$[*].info.form_id'),'$[0]') AS quest_pokemon_form
		FROM pokestop
        WHERE :conditions";

        $query = str_replace(":conditions", join(" AND ", $conds), $query);
        $pokestops = $db->query($query, $params)->fetchAll(\PDO::FETCH_ASSOC);

        $data = array();
        $i = 0;

        foreach ($pokestops as $pokestop) {
            $pokestop["latitude"] = floatval($pokestop["latitude"]);
            $pokestop["longitude"] = floatval($pokestop["longitude"]);
            $pokestop["quest_type"] = intval($pokestop["quest_type"]);
            $pokestop["quest_condition_type"] = intval($pokestop["quest_condition_type"]);
            $pokestop["quest_condition_type_1"] = intval($pokestop["quest_condition_type_1"]);
            $pokestop["quest_reward_type"] = intval($pokestop["quest_reward_type"]);
            $pokestop["quest_target"] = intval($pokestop["quest_target"]);
            $pokestop["quest_pokemon_id"] = intval($pokestop["quest_pokemon_id"]);
            $pokestop["quest_item_id"] = intval($pokestop["quest_item_id"]);
            $pokestop["quest_reward_amount"] = intval($pokestop["quest_reward_amount"]);
            $grunttype_pid = $pokestop["grunt_type"];
            if ($grunttype_pid == "0") {
                $grunttype_pid = null;
                $pokestop["grunt_type"] = null;
            }
			$pokestop["url"] = ! empty($pokestop["url"]) ? str_replace("http://", "https://images.weserv.nl/?url=", $pokestop["url"]) : null;
            //$pokestop["url"] = str_replace("http://", "https://images.weserv.nl/?url=", $pokestop["url"]);
			$pokestop["url"] = ! empty($pokestop["url"]) ? preg_replace("/^http:/i", "https:", $pokestop["url"]) : null;
            $pokestop["lure_id"] = intval($pokestop["lure_id"]);
			$pokestop["lure_expiration"] = $pokestop["lure_expiration"] * 1000;
            $pokestop["first_seen"] = $pokestop["first_seen"] * 1000;
            $pokestop["invasion"] = intval($pokestop["invasion"]);
			$pokestop["invasion_expiration"] = $pokestop["invasion_expiration"] * 1000;
            $pokestop["grunt_type_name"] = empty($grunttype_pid) ? null : i8ln($this->grunttype[$grunttype_pid]["type"]);
            $pokestop["grunt_type_gender"] = empty($grunttype_pid) ? null : i8ln($this->grunttype[$grunttype_pid]["grunt"]);
			$pokestop["encounters"] = empty($this->grunttype[$grunttype_pid]["encounters"]) ? null : $this->grunttype[$grunttype_pid]["encounters"];
            $pokestop["second_reward"] = empty($this->grunttype[$grunttype_pid]["second_reward"]) ? null : $this->grunttype[$grunttype_pid]["second_reward"];

			//Get Stats of Reward Pokemon
			if(!empty($pokestop["quest_pokemon_id"])){
                if($pokestop["quest_pokemon_form"] == 0){
				        $pokestop["reward_pokemon_base_atk"] = 3;
                        $pokestop["reward_pokemon_base_atk"] = $this->data[$pokestop["quest_pokemon_id"]]["baseAttack"];
                        $pokestop["reward_pokemon_base_def"] = $this->data[$pokestop["quest_pokemon_id"]]["baseDefense"];
                        $pokestop["reward_pokemon_base_sta"] = $this->data[$pokestop["quest_pokemon_id"]]["baseStamina"];
                }else{
                    $forms = $this->data[$pokestop["quest_pokemon_id"]]["forms"];
                    foreach ($forms as $f => $v) {
                        if($pokestop["quest_pokemon_form"] === $v['protoform']) {
                            $pokestop["reward_pokemon_base_atk"] = 4;
                            $pokestop["reward_pokemon_base_atk"] = $v["baseAttack"];
                            $pokestop["reward_pokemon_base_def"] = $v["baseDefense"];
                            $pokestop["reward_pokemon_base_sta"] = $v["baseStamina"];
                        }
                    }
			    }
            }
			$data[] = $pokestop;

            unset($pokestops[$i]);
            $i++;
        }
        return $data;
    }

    public function get_gym($gymId)
    {
        $conds = array();
        $params = array();

        $conds[] = "id = :gymId";
        $params[':gymId'] = $gymId;

        $gyms = $this->query_gyms($conds, $params);
        $gym = $gyms[0];

        return $gym;
    }

    public function get_gyms($reeids, $rbeids, $raids, $swLat, $swLng, $neLat, $neLng, $exEligible = false, $tstamp = 0, $oSwLat = 0, $oSwLng = 0, $oNeLat = 0, $oNeLng = 0)
    {
        $conds = array();
        $params = array();

        $conds[] = "lat > :swLat AND lon > :swLng AND lat < :neLat AND lon < :neLng";
        $params[':swLat'] = $swLat;
        $params[':swLng'] = $swLng;
        $params[':neLat'] = $neLat;
        $params[':neLng'] = $neLng;

        if ($oSwLat != 0) {
            $conds[] = "NOT (lat > :oswLat AND lon > :oswLng AND lat < :oneLat AND lon < :oneLng)";
            $params[':oswLat'] = $oSwLat;
            $params[':oswLng'] = $oSwLng;
            $params[':oneLat'] = $oNeLat;
            $params[':oneLng'] = $oNeLng;
        }
        if ($tstamp > 0) {
            $conds[] = "updated > :lastUpdated";
            $params[':lastUpdated'] = $tstamp;
        }
        if (!empty($raids) && $raids === 'true') {
            $raidsSQL = '';
            if (count($rbeids)) {
                $raid_in = '';
                $r = 1;
                foreach ($rbeids as $rbeid) {
                    $params[':rqry_' . $r . "_"] = $rbeids;
                    $raid_in .= ':rqry_' . $r . "_,";
                    $r++;
                }
                $raid_in = substr($raid_in, 0, -1);
                $raidsSQL .= "raid_pokemon_id NOT IN ( $raid_in )";
            } else {
                $raidsSQL .= "raid_pokemon_id IS NOT NULL";
            }
            $eggsSQL = '';
            if (count($reeids)) {
                $egg_in = '';
                $r = 1;
                foreach ($reeids as $reeid) {
                    $params[':rqry_' . $r . "_"] = $reeids;
                    $egg_in .= ':rqry_' . $r . "_,";
                    $r++;
                }
                $egg_in = substr($egg_in, 0, -1);
                $eggsSQL .= "raid_level NOT IN ( $egg_in )";
            } else {
                $eggsSQL .= "raid_level IS NOT NULL";
            }
            $conds[] = "" . $raidsSQL . "";
			$conds[] = "" . $eggsSQL . "";
        }
        if ($exEligible === "true") {
            $conds[] = "(ex_raid_eligible IS NOT NULL AND ex_raid_eligible != '0')";
        }

        return $this->query_gyms($conds, $params);
    }

    public function query_gyms($conds, $params)
    {
        global $db;

        $query = "SELECT id AS gym_id,
        lat AS latitude,
        lon AS longitude,
        name,
        url,
        last_modified_timestamp AS last_modified,
		first_seen_timestamp as first_seen,
        raid_end_timestamp AS raid_end,
        raid_battle_timestamp AS raid_start,
        updated AS last_scanned,
        raid_pokemon_id,
        guarding_pokemon_id AS guard_pokemon_id,
        availble_slots AS slots_available,
        team_id,
		total_cp,
        raid_level,
        raid_pokemon_move_1,
        raid_pokemon_move_2,
        raid_pokemon_form AS form,
        raid_pokemon_cp,
        ex_raid_eligible AS park,
		in_battle as battle_status,
		raid_is_exclusive as is_exclusive
        FROM gym
        WHERE :conditions";

        $query = str_replace(":conditions", join(" AND ", $conds), $query);
        $gyms = $db->query($query, $params)->fetchAll(\PDO::FETCH_ASSOC);

        $data = array();
        $i = 0;

        foreach ($gyms as $gym) {
            $guard_pid = $gym["guard_pokemon_id"];
            if ($guard_pid == "0") {
                $guard_pid = null;
                $gym["guard_pokemon_id"] = null;
            }
            $raid_pid = $gym["raid_pokemon_id"];
            if ($raid_pid == "0") {
                $raid_pid = null;
                $gym["raid_pokemon_id"] = null;
            }
            $gym["team_id"] = intval($gym["team_id"]);
            $gym["pokemon"] = [];
            $gym["guard_pokemon_name"] = empty($guard_pid) ? null : i8ln($this->data[$guard_pid]["name"]);
            $gym["raid_pokemon_name"] = empty($raid_pid) ? null : i8ln($this->data[$raid_pid]["name"]);
            $gym["raid_pokemon_name_en"] = empty($raid_pid) ? null : ($this->data[$raid_pid]["name"]);
            $gym["latitude"] = floatval($gym["latitude"]);
            $gym["longitude"] = floatval($gym["longitude"]);
            $gym["slots_available"] = intval($gym["slots_available"]);
            $gym["park"] = intval($gym["park"]);
            $gym["battle_status"] = intval($gym["battle_status"]);
            $gym["is_exclusive"] = intval($gym["is_exclusive"]);
            $gym["last_modified"] = $gym["last_modified"] * 1000;
            $gym["last_scanned"] = $gym["last_scanned"] * 1000;
            $gym["first_seen"] = $gym["first_seen"] * 1000;
            $gym["raid_start"] = $gym["raid_start"] * 1000;
            $gym["raid_end"] = $gym["raid_end"] * 1000;
            $gym["sponsor"] = !empty($gym["sponsor"]) ? $gym["sponsor"] : null;
            $gym["url"] = ! empty($gym["url"]) ? preg_replace("/^http:/i", "https:", $gym["url"]) : null;
			
			if(!empty($raid_pid)){
                if($gym["form"] == 0){
                        $gym["raidboss_base_atk"] = $this->data[$gym["raid_pokemon_id"]]["baseAttack"];
                        $gym["raidboss_base_def"] = $this->data[$gym["raid_pokemon_id"]]["baseDefense"];
                        $gym["raidboss_base_sta"] = $this->data[$gym["raid_pokemon_id"]]["baseStamina"];
                }else{
                    $forms = $this->data[$gym["raid_pokemon_id"]]["forms"];
                    foreach ($forms as $f => $v) {
                        if($gym["form"] === $v['protoform']) {
                            $gym["raidboss_base_atk"] = $v["baseAttack"];
                            $gym["raidboss_base_def"] = $v["baseDefense"];
                            $gym["raidboss_base_sta"] = $v["baseStamina"];
                        }
                    }
			    }
            }
			
            $data[] = $gym;

            unset($gyms[$i]);
            $i++;
        }
        return $data;
    }

    public function get_nests($swLat, $swLng, $neLat, $neLng, $tstamp = 0, $oSwLat = 0, $oSwLng = 0, $oNeLat = 0, $oNeLng = 0)
    {
        $conds = array();
        $params = array();

        $conds[] = "lat > :swLat AND lon > :swLng AND lat < :neLat AND lon < :neLng";
        $params[':swLat'] = $swLat;
        $params[':swLng'] = $swLng;
        $params[':neLat'] = $neLat;
        $params[':neLng'] = $neLng;

        if ($oSwLat != 0) {
            $conds[] = "NOT (lat > :oswLat AND lon > :oswLng AND lat < :oneLat AND lon < :oneLng)";
            $params[':oswLat'] = $oSwLat;
            $params[':oswLng'] = $oSwLng;
            $params[':oneLat'] = $oNeLat;
            $params[':oneLng'] = $oNeLng;
        }
        if ($tstamp > 0) {
            $conds[] = "updated > :lastUpdated";
            $params[':lastUpdated'] = $tstamp;
        }

        return $this->query_nests($conds, $params);
    }

    public function query_nests($conds, $params)
    {
        global $manualdb;

        $query = "SELECT nest_id,
        lat,
        lon,
        pokemon_id,
        type,
		name,
		pokemon_count,
		pokemon_avg
        FROM nests
        WHERE :conditions";

        $query = str_replace(":conditions", join(" AND ", $conds), $query);
        $nests = $manualdb->query($query, $params)->fetchAll(\PDO::FETCH_ASSOC);

        $data = array();
        $i = 0;
        foreach ($nests as $nest) {
            $nest["lat"] = floatval($nest["lat"]);
            $nest["lon"] = floatval($nest["lon"]);
            $nest["type"] = intval($nest["type"]);
            if($nest['pokemon_id'] > 0 ){
                $nest["pokemon_name"] = i8ln($this->data[$nest["pokemon_id"]]['name']);
                $types = $this->data[$nest["pokemon_id"]]["types"];
                $etypes = $this->data[$nest["pokemon_id"]]["types"];
                foreach ($types as $k => $v) {
                    $types[$k]['type'] = i8ln($v['type']);
                    $etypes[$k]['type'] = $v['type'];
                }
                $nest["pokemon_types"] = $types;
                $nest["english_pokemon_types"] = $etypes;
            }
            $data[] = $nest;

            unset($nests[$i]);
            $i++;
        }
        return $data;
    }

    public function get_communities($swLat, $swLng, $neLat, $neLng, $tstamp = 0, $oSwLat = 0, $oSwLng = 0, $oNeLat = 0, $oNeLng = 0)
    {
        $conds = array();
        $params = array();

        $conds[] = "lat > :swLat AND lon > :swLng AND lat < :neLat AND lon < :neLng";
        $params[':swLat'] = $swLat;
        $params[':swLng'] = $swLng;
        $params[':neLat'] = $neLat;
        $params[':neLng'] = $neLng;

        if ($oSwLat != 0) {
            $conds[] = "NOT (lat > :oswLat AND lon > :oswLng AND lat < :oneLat AND lon < :oneLng)";
            $params[':oswLat'] = $oSwLat;
            $params[':oswLng'] = $oSwLng;
            $params[':oneLat'] = $oNeLat;
            $params[':oneLng'] = $oNeLng;
        }
        if ($tstamp > 0) {
            $conds[] = "updated > :lastUpdated";
            $params[':lastUpdated'] = $tstamp;
        }

        return $this->query_communities($conds, $params);
    }

    public function query_communities($conds, $params)
    {
        global $manualdb;

        $query = "SELECT community_id,
        title,
        description,
        type,
        image_url,
        size,
        team_instinct,
        team_mystic,
        team_valor,
        has_invite_url,
        invite_url,
        lat,
        lon,
        source
        FROM communities
        WHERE :conditions";

        $query = str_replace(":conditions", join(" AND ", $conds), $query);
        $communities = $manualdb->query($query, $params)->fetchAll(\PDO::FETCH_ASSOC);

        $data = array();
        $i = 0;
        foreach ($communities as $community) {
            $community["type"] = intval($community["type"]);
            $community["size"] = intval($community["size"]);
            $community["team_instinct"] = intval($community["team_instinct"]);
            $community["team_mystic"] = intval($community["team_mystic"]);
            $community["team_valor"] = intval($community["team_valor"]);
            $community["has_invite_url"] = intval($community["has_invite_url"]);
            $community["lat"] = floatval($community["lat"]);
            $community["lon"] = floatval($community["lon"]);
            $community["source"] = intval($community["source"]);
            $data[] = $community;

            unset($communities[$i]);
            $i++;
        }
        return $data;
    }

    public function get_portals($swLat, $swLng, $neLat, $neLng, $tstamp = 0, $oSwLat = 0, $oSwLng = 0, $oNeLat = 0, $oNeLng = 0)
    {
        $conds = array();
        $params = array();

        $conds[] = "lat > :swLat AND lon > :swLng AND lat < :neLat AND lon < :neLng";
        $params[':swLat'] = $swLat;
        $params[':swLng'] = $swLng;
        $params[':neLat'] = $neLat;
        $params[':neLng'] = $neLng;

        if ($oSwLat != 0) {
            $conds[] = "NOT (lat > :oswLat AND lon > :oswLng AND lat < :oneLat AND lon < :oneLng)";
            $params[':oswLat'] = $oSwLat;
            $params[':oswLng'] = $oSwLng;
            $params[':oneLat'] = $oNeLat;
            $params[':oneLng'] = $oNeLng;
        }
        if ($tstamp > 0) {
            $conds[] = "updated > :lastUpdated";
            $params[':lastUpdated'] = $tstamp;
        }

        return $this->query_portals($conds, $params);
    }

    public function query_portals($conds, $params)
    {
        global $manualdb;

        $query = "SELECT external_id,
        lat,
        lon,
        name,
	url,
	updated,
	imported
        FROM ingress_portals
        WHERE :conditions";

        $query = str_replace(":conditions", join(" AND ", $conds), $query);
        $portals = $manualdb->query($query, $params)->fetchAll(\PDO::FETCH_ASSOC);

        $data = array();
        $i = 0;
        foreach ($portals as $portal) {
            $portal["lat"] = floatval($portal["lat"]);
            $portal["lon"] = floatval($portal["lon"]);
            $portal["url"] = str_replace("http://", "https://images.weserv.nl/?url=", $portal["url"]);
            $data[] = $portal;

            unset($portals[$i]);
            $i++;
        }
        return $data;
    }

    public function get_poi($swLat, $swLng, $neLat, $neLng, $tstamp = 0, $oSwLat = 0, $oSwLng = 0, $oNeLat = 0, $oNeLng = 0)
    {
        $conds = array();
        $params = array();

        $conds[] = "lat > :swLat AND lon > :swLng AND lat < :neLat AND lon < :neLng";
        $params[':swLat'] = $swLat;
        $params[':swLng'] = $swLng;
        $params[':neLat'] = $neLat;
        $params[':neLng'] = $neLng;

        if ($oSwLat != 0) {
            $conds[] = "NOT (lat > :oswLat AND lon > :oswLng AND lat < :oneLat AND lon < :oneLng)";
            $params[':oswLat'] = $oSwLat;
            $params[':oswLng'] = $oSwLng;
            $params[':oneLat'] = $oNeLat;
            $params[':oneLng'] = $oNeLng;
        }
        if ($tstamp > 0) {
            $conds[] = "updated > :lastUpdated";
            $params[':lastUpdated'] = $tstamp;
        }

        return $this->query_poi($conds, $params);
    }


    public function query_poi($conds, $params)
    {
        global $manualdb;

        $query = "SELECT poi_id,
        lat,
        lon,
        name,
	description,
	updated,
	submitted_by,
	status
        FROM poi
        WHERE :conditions";

        $query = str_replace(":conditions", join(" AND ", $conds), $query);
        $pois = $manualdb->query($query, $params)->fetchAll(\PDO::FETCH_ASSOC);

        $data = array();
        $i = 0;
        foreach ($pois as $poi) {
            $poi["lat"] = floatval($poi["lat"]);
            $poi["lon"] = floatval($poi["lon"]);
            $data[] = $poi;

            unset($pois[$i]);
            $i++;
        }
        return $data;
    }

    public function get_spawnpoints($swLat, $swLng, $neLat, $neLng, $tstamp = 0, $oSwLat = 0, $oSwLng = 0, $oNeLat = 0, $oNeLng = 0)
    {
        $conds = array();
        $params = array();
        $conds[] = "lat > :swLat AND lon > :swLng AND lat < :neLat AND lon < :neLng";
        $params[':swLat'] = $swLat;
        $params[':swLng'] = $swLng;
        $params[':neLat'] = $neLat;
        $params[':neLng'] = $neLng;
        if ($oSwLat != 0) {
            $conds[] = "NOT (lat > :oswLat AND lon > :oswLng AND lat < :oneLat AND lon < :oneLng)";
            $params[':oswLat'] = $oSwLat;
            $params[':oswLng'] = $oSwLng;
            $params[':oneLat'] = $oNeLat;
            $params[':oneLng'] = $oNeLng;
        }
        if ($tstamp > 0) {
            $conds[] = "updated > :lastUpdated";
            $params[':lastUpdated'] = $tstamp;
        }
        return $this->query_spawnpoints($conds, $params);
    }

    private function query_spawnpoints($conds, $params)
    {
        global $db;
        $query = "SELECT lat AS latitude,
        lon AS longitude,
        id AS spawnpoint_id,
		despawn_sec AS despawn_sec
        FROM spawnpoint
        WHERE :conditions";
        $query = str_replace(":conditions", join(" AND ", $conds), $query);
        $spawnpoints = $db->query($query, $params)->fetchAll(\PDO::FETCH_ASSOC);
        $data = array();
        $i = 0;
        foreach ($spawnpoints as $spawnpoint) {
            $spawnpoint["latitude"] = floatval($spawnpoint["latitude"]);
            $spawnpoint["longitude"] = floatval($spawnpoint["longitude"]);
            $spawnpoint["time"] = !empty($spawnpoint["despawn_time"]) ? $spawnpoint["despawn_time"] : null;
            $spawnpoint["duration"] = !empty($spawnpoint["duration"]) ? $spawnpoint["duration"] : null;
            $data[] = $spawnpoint;
            unset($spawnpoints[$i]);
            $i++;
        }
        return $data;
    }
    public function get_weather_by_cell_id($cell_id)
    {
        global $db;
        $query = "SELECT id AS s2_cell_id, gameplay_condition AS gameplay_weather FROM weather WHERE id = :cell_id";
        $params = [':cell_id' => intval((float)$cell_id)]; // use float to intval because RDM is signed int
        $weather_info = $db->query($query, $params)->fetchAll(\PDO::FETCH_ASSOC);
        if ($weather_info) {
            // force re-bind of gameplay_weather to condition
            $weather_info[0]['condition'] = $weather_info[0]['gameplay_weather'];
            unset($weather_info[0]['gameplay_weather']);
            return $weather_info[0];
        } else {
            return null;
        }
    }
    public function get_weather($updated = null)
    {
        global $db;
        $query = "SELECT id AS s2_cell_id, gameplay_condition AS gameplay_weather FROM weather";
        $weathers = $db->query($query)->fetchAll(\PDO::FETCH_ASSOC);
        $data = array();
        foreach ($weathers as $weather) {
            $data["weather_" . $weather['s2_cell_id']] = $weather;
            $data["weather_" . $weather['s2_cell_id']]['condition'] = $data["weather_" . $weather['s2_cell_id']]['gameplay_weather'];
            unset($data["weather_" . $weather['s2_cell_id']]['gameplay_weather']);
        }
        return $data;
    }
    public function generated_exclude_list($type)
    {
        global $db;
	if ($type === 'pokemonlist') {
            $pokestops = $db->query( "SELECT distinct quest_pokemon_id FROM pokestop WHERE quest_pokemon_id > 0 AND DATE(FROM_UNIXTIME(quest_timestamp)) = CURDATE() order by quest_pokemon_id;")->fetchAll(\PDO::FETCH_ASSOC);
            $data = array();
	    foreach ($pokestops as $pokestop) {
                $data[] = $pokestop['quest_pokemon_id'];
            }
	} else if ($type === 'itemlist') {
            $pokestops = $db->query( "SELECT distinct quest_item_id FROM pokestop WHERE quest_item_id > 0 AND DATE(FROM_UNIXTIME(quest_timestamp)) = CURDATE() order by quest_item_id;")->fetchAll(\PDO::FETCH_ASSOC);
            $data = array();
	    foreach ($pokestops as $pokestop) {
                $data[] = $pokestop['quest_item_id'];
            }
        } else if ($type === 'gruntlist') {
            $pokestops = $db->query( "SELECT distinct grunt_type FROM pokestop WHERE grunt_type > 0 AND incident_expire_timestamp > UNIX_TIMESTAMP() order by grunt_type;")->fetchAll(\PDO::FETCH_ASSOC);
            $data = array();
	    foreach ($pokestops as $pokestop) {
                $data[] = $pokestop['grunt_type'];
            }
        }
	return $data;
    }
}
