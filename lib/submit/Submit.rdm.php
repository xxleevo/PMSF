<?php
namespace Submit;
class RDM extends Submit {
	public function submit_gym($lat, $lon, $gymName, $loggedUser) {
		global $db, $noManualGyms, $noGyms, $noDiscordSubmitLogChannel, $discordSubmitLogChannelUrl, $submitMapUrl;
		if ( $noManualGyms === true || $noGyms === true ) {
			http_response_code( 401 );
			die();
		}
		if ( ! empty( $lat ) && ! empty( $lon ) && ! empty( $gymName ) ) {
			$gymId = randomGymId();
			$cols  = [
				'id' 	      => $gymId,
				'lat'         => $lat,
				'lon'         => $lon,
				'name'        => $gymName
			];
			$db->insert( 'gym', $cols );
			if ( $noDiscordSubmitLogChannel === false ) {
				$data = array("content" => '```Added gym with id "' . $gymId . '" and name: "' . $gymName . '"```' . $submitMapUrl . '/?lat=' . $lat . '&lon=' . $lon . '&zoom=18', "username" => $loggedUser);
				sendToWebhook($discordSubmitLogChannelUrl, ($data));
			}
		}
	}
	public function toggle_ex($gymId, $loggedUser) {
		global $db, $noToggleExGyms, $noGyms, $noDiscordSubmitLogChannel, $discordSubmitLogChannelUrl;
		if ( $noToggleExGyms === true || $noGyms === true ) {
			http_response_code( 401 );
			die();
		}
		if ( ! empty( $gymId ) ) {
			$fortName = $db->get( "gym", [ 'name' ], [ 'id' => $gymId ] );
			$park = $db->get( "gym", [ 'ex_raid_eligible' ], [ 'id' => $gymId ] );
			if ( intval($park['ex_raid_eligible']) === 0 ) {
				$cols = [
					'ex_raid_eligible'       => 1
				];
				$where    = [
					'id' => $gymId
				];
				$db->update( "gym", $cols, $where );
				if ( $noDiscordSubmitLogChannel === false ) {
					$data = array("content" => '```Marked gym with id "' . $gymId . '" and name: "' . $fortName['name'] . '" as EX eligible```', "username" => $loggedUser);
					sendToWebhook($discordSubmitLogChannelUrl, ($data));
				}
			} else {
				$cols = [
					'ex_raid_eligible'       => 0
				];
				$where    = [
					'id' => $gymId
				];
				$db->update( "gym", $cols, $where );
				if ( $noDiscordSubmitLogChannel === false ) {
					$data = array("content" => '```Marked gym with id "' . $gymId . '" and name: "' . $fortName['name'] . '" as non EX eligible```', "username" => $loggedUser);
					sendToWebhook($discordSubmitLogChannelUrl, ($data));
				}
			}
		}
	}
	public function delete_gym($gymId, $loggedUser) {
		global $db, $noDeleteGyms, $noGyms, $noDiscordSubmitLogChannel, $discordSubmitLogChannelUrl;
		if ( $noDeleteGyms === true || $noGyms === true ) {
			http_response_code( 401 );
			die();
		}
		if ( ! empty( $gymId ) ) {
			$fortName = $db->get( "gym", [ 'name' ], [ 'id' => $gymId ] );    
			$db->delete( 'gym', [
				"AND" => [
					'id' => $gymId
				]
			] );
			if ( $noDiscordSubmitLogChannel === false ) {
				$data = array("content" => '```Deleted gym with id "' . $gymId . '" and name: "' . $fortName['name'] . '"```', "username" => $loggedUser);
				sendToWebhook($discordSubmitLogChannelUrl, ($data));
			}
		}
	}
    public function modify_gym($gymId, $gymName, $loggedUser) {
        global $db, $noRenameGyms, $noGyms, $noDiscordSubmitLogChannel, $discordSubmitLogChannelUrl;
        if ( $noRenameGyms === true || $noGyms === true ) {
            http_response_code( 401 );
            die();
        }
        if ( ! empty( $gymName ) && ! empty( $gymId ) ) {
            $cols     = [
                'name'        => $gymName,
                'updated'     => time()
            ];
            $where    = [
                'id' => $gymId
            ];
            $db->update("gym", $cols, $where);
            if ( $noDiscordSubmitLogChannel === false ) {
                $data = array("content" => '```Updated gym with id "' . $gymId . '" and gave it the new name: "' . $gymName . '" . ```', "username" => $loggedUser);
                sendToWebhook($discordSubmitLogChannelUrl, ($data));
            }
        }
    }
	public function submit_pokestop($lat, $lon, $pokestopName, $loggedUser) {
		global $db, $noManualPokestops, $noPokestops, $noDiscordSubmitLogChannel, $discordSubmitLogChannelUrl, $submitMapUrl;
		if ( $noManualPokestops === true || $noPokestops === true ) {
			http_response_code( 401 );
			die();
		}
		if ( ! empty( $lat ) && ! empty( $lon ) && ! empty( $pokestopName ) ) {
			$pokestopId = randomGymId();
			$cols       = [
				'id'          			=> $pokestopId,
				'lat'         			=> $lat,
				'lon'         			=> $lon,
				'lure_expire_timestamp'		=> 0,
				'last_modified_timestamp'	=> time(),
				'enabled'      			=> 0,
				'name'        			=> $pokestopName,
				'updated'     			=> time()
			];
			$db->insert( "pokestop", $cols );
			if ( $noDiscordSubmitLogChannel === false ) {
				$data = array("content" => '```Added pokestop with id "' . $pokestopId . '" and gave it the new name: "' . $pokestopName . '"```' . $submitMapUrl . '/?lat=' . $lat . '&lon=' . $lon . '&zoom=18 ', "username" => $loggedUser);
				sendToWebhook($discordSubmitLogChannelUrl, ($data));
			}
		}
	}
	public function modify_pokestop($pokestopId, $pokestopName, $loggedUser) {
		global $db, $noRenamePokestops, $noPokestops, $noDiscordSubmitLogChannel, $discordSubmitLogChannelUrl;
		if ( $noRenamePokestops === true || $noPokestops === true ) {
			http_response_code( 401 );
			die();
		}
		if ( ! empty( $pokestopName ) && ! empty( $pokestopId ) ) {
			$cols     = [
				'name'        => $pokestopName,
				'updated'     => time()
			];
			$where    = [
				'id' => $pokestopId
			];
			$db->update( "pokestop", $cols, $where );
			if ( $noDiscordSubmitLogChannel === false ) {
				$data = array("content" => '```Updated pokestop with id "' . $pokestopId . '" and gave it the new name: "' . $pokestopName . '" . ```', "username" => $loggedUser);
				sendToWebhook($discordSubmitLogChannelUrl, ($data));
			}
		}
	}
	public function delete_pokestop($pokestopId, $loggedUser) {
		global $db, $noDeletePokestops, $noPokestops, $noDiscordSubmitLogChannel, $discordSubmitLogChannelUrl;
		if ( $noDeletePokestops === true || $noPokestops === true ) {
			http_response_code( 401 );
			die();
		}
		$pokestopName = $db->get( "pokestop", [ 'name' ], [ 'id' => $pokestopId ] );
		if ( ! empty( $pokestopId ) ) {
			$db->delete( 'pokestop', [
				"AND" => [
					'id' => $pokestopId
				]
			] );
			if ( $noDiscordSubmitLogChannel === false ) {
				$data = array("content" => '```Deleted pokestop with id "' . $pokestopId . '" and name: "' . $pokestopName['name'] . '"```', "username" => $loggedUser);
				sendToWebhook($discordSubmitLogChannelUrl, ($data));
			}
		}
	}
	public function convert_pokestop($pokestopId, $loggedUser) {
		global $db, $noConvertPokestops, $noPokestops, $noDiscordSubmitLogChannel, $discordSubmitLogChannelUrl;
		if ( $noConvertPokestops === true || $noPokestops === true ) {
			http_response_code( 401 );
			die();
		}
		$gym = $db->get( "pokestop", [ 'lat', 'lon', 'name', 'url' ], [ 'id' => $pokestopId ] );
		if ( ! empty( $pokestopId ) ) {
			$cols     = [
				'id'  => $pokestopId,
				'lat'          => $gym['lat'],
				'lon'          => $gym['lon'],
				'name'         => $gym['name'],
				'url'          => $gym['url']
			];
			$db->insert( "gym", $cols );
			$db->delete( 'pokestop', [
				"AND" => [
					'id' => $pokestopId
				]
			] );
			if ( $noDiscordSubmitLogChannel === false ) {
				$data = array("content" => '```Converted pokestop with id "' . $pokestopId . '." New Gym: "' . $gym['name'] . '". ```' . $submitMapUrl . '/?lat=' . $gym['lat'] . '&lon=' . $gym['lon'] . '&zoom=18 ', "username" => $loggedUser);
				sendToWebhook($discordSubmitLogChannelUrl, ($data));
			}
		}
	}
	public function submit_quest($pokestopId, $questType, $questTarget, $conditionType, $catchPokemonType, $catchPokemon, $raidLevel, $throwType, $curveThrow, $rewardType, $encounter, $item, $itemAmount, $dust, $loggedUser) {
		global $db, $noManualQuests, $noPokestops, $noDiscordSubmitLogChannel, $discordSubmitLogChannelUrl;
		if ( $noManualQuests === true || $noPokestops === true ) {
			http_response_code( 401 );
			die();
		}
		$pokestopName = $db->get( "pokestop", [ 'name', 'lat', 'lon', 'url', 'id' ], [ 'id' => $pokestopId ] );
		if ( ! empty( $pokestopId ) && ! empty( $questType ) && ! empty( $rewardType ) ) {
			if ($conditionType === '1') {
				$jsonCondition = json_encode(array(
					'info' => array(
						'pokemon_type_ids' => $catchPokemonType
					),
					'type' => intval($conditionType)
					)
				);
			} else if ($conditionType === '2') {
				$jsonCondition = json_encode(array(
					'info' => array(
						'pokemon_ids' => $catchPokemon
					),
					'type' => intval($conditionType)
					)
				);
			} else if ($conditionType === '6' || $conditionType === '7') {
				$jsonCondition = json_encode(array(
					'info' => array(
						'raid_levels' => $raidLevel
					),
					'type' => intval($conditionType)
					)
				);
			} else if ($conditionType === '8') {
				$jsonCondition = json_encode(array(
					'info' => array(
						'throw_type_id' => intval($throwType),
						'hit' => false
					),
					'type' => intval($conditionType)
					)
				);
				if ($curveThrow === '1') {
					$jsonCondition .= ',' . json_encode(array(
						'type' => 15
						)
					);
				}
			} else if ($conditionType === '14') {
				$jsonCondition = json_encode(array(
					'info' => array(
						'throw_type_id' => intval($throwType),
						'hit' => false
					),
					'type' => intval($conditionType)
					)
				);
				if ($curveThrow === '1') {
					$jsonCondition .= ',' . json_encode(array(
						'type' => 15
						)
					);
				}
			} else if ( ! empty( $conditionType ) ) {
				$jsonCondition = json_encode(array(
					'type' => intval($conditionType)
					)
				);
			}

			if ($rewardType === '2') {
				$jsonRewards = json_encode(array(
					'info' => array(
						'amount' => intval($itemAmount),
						'item_id' => intval($item)
					),
					'type' => intval($rewardType)
				));
			} else if ($rewardType === '3') {
				$jsonRewards = json_encode(array(
					'info' => array(
						'amount' => intval($dust)
					),
					'type' => intval($rewardType)
				));
			} else if ($rewardType === '7') {
				$jsonRewards = json_encode(array(
					'info' => array(
						'pokemon_id' => intval($encounter),
						'form_id' => 0,
						'shiny' => false,
						'costume_id' => 0,
						'gender_id' => 0
					),
					'type' => intval($rewardType)
				));
			}
			$cols = [
				'updated'		=> time(),
				'quest_type'		=> $questType,
				'quest_timestamp'	=> time(),
				'quest_target'		=> $questTarget,
				'quest_conditions'	=> ! empty($jsonCondition) ? '[' . $jsonCondition . ']' : '[]',
				'quest_rewards'		=> '[' . $jsonRewards . ']',
				'quest_template'	=> 'manual_added_challenge'
			];
			$where = [
				'id'			=> $pokestopId
			];
			$db->update( "pokestop", $cols, $where );

		}
	}
	public function convert_portal_pokestop($portalId, $loggedUser) {
		global $db, $manualdb, $noPortals, $noDiscordSubmitLogChannel, $discordSubmitLogChannelUrl;
		if ( $noPortals === true ) {
			http_response_code( 401 );
			die();
		}
		$portal = $manualdb->get( "ingress_portals", [ 'lat', 'lon', 'name', 'url' ], [ 'external_id' => $portalId ] );
		if ( ! empty( $portalId ) ) {
			$cols     = [
				'id'  	       => $portalId,
				'lat'          => $portal['lat'],
				'lon'          => $portal['lon'],
				'name'         => $portal['name'],
				'url'          => $portal['url'],
				'updated'      => time()
			];
			$db->insert( "pokestop", $cols );
			if ( $noDiscordSubmitLogChannel === false ) {
				$data = array("content" => '```Converted portal with id "' . $portalId . '." New Pokestop: "' . $portal['name'] . '". ```' . $submitMapUrl . '/?lat=' . $portal['lat'] . '&lon=' . $portal['lon'] . '&zoom=18 ', "username" => $loggedUser);
				sendToWebhook($discordSubmitLogChannelUrl, ($data));
			}
		}
	}
	public function convert_portal_gym($portalId, $loggedUser) {
		global $db, $manualdb, $noPortals, $noDiscordSubmitLogChannel, $discordSubmitLogChannelUrl;
		if ( $noPortals === true ) {
			http_response_code( 401 );
			die();
		}
		$portal = $manualdb->get( "ingress_portals", [ 'lat', 'lon', 'name', 'url' ], [ 'external_id' => $portalId ] );
		if ( ! empty( $portalId ) ) {
			$cols     = [
				'id'  	       => $portalId,
				'lat'          => $portal['lat'],
				'lon'          => $portal['lon'],
				'name'         => $portal['name'],
				'url'          => $portal['url'],
				'updated'      => time()
			];
			$db->insert( "gym", $cols );
			if ( $noDiscordSubmitLogChannel === false ) {
				$data = array("content" => '```Converted portal with id "' . $portalId . '." New Gym: "' . $portal['name'] . '". ```' . $submitMapUrl . '/?lat=' . $portal['lat'] . '&lon=' . $portal['lon'] . '&zoom=18 ', "username" => $loggedUser);
				sendToWebhook($discordSubmitLogChannelUrl, ($data));
			}
		}
	}
	public function mark_portal($portalId, $loggedUser) {
		global $manualdb, $noPortals, $noDiscordSubmitLogChannel, $discordSubmitLogChannelUrl;
		if ( $noPortals === true ) {
			http_response_code( 401 );
			die();
		}
		$portalName = $manualdb->get( "ingress_portals", [ 'name' ], [ 'external_id' => $portalId ] );
		if ( ! empty( $portalId ) ) {
			$cols     = [
				'updated'      => time(),
				'checked'      => 1
			];
			$where    = [
				'external_id' => $portalId
			];
			$manualdb->update( "ingress_portals", $cols, $where );
			if ( $noDiscordSubmitLogChannel === false ) {
				$data = array("content" => '```Marked portal with id "' . $portalId . '." As no Pokestop or Gym. PortalName: "' . $portalName['name'] . '". ```', "username" => $loggedUser);
				sendToWebhook($discordSubmitLogChannelUrl, ($data));
			}
		}
	}
	public function delete_portal($portalId, $loggedUser) {
		global $manualdb, $noPortals, $noDeletePortal, $noDiscordSubmitLogChannel, $discordSubmitLogChannelUrl;
		if ( $noPortals === true || $noDeletePortal === true) {
			http_response_code( 401 );
			die();
		}
		$portalName = $manualdb->get( "ingress_portals", [ 'name' ], [ 'external_id' => $portalId ] );
		if ( ! empty( $portalId ) ) {
			$manualdb->delete( 'ingress_portals', [
				"AND" => [
					'external_id' => $portalId
				]
			] );
		}
		if ( $noDiscordSubmitLogChannel === false ) {
			$data = array("content" => '```Deleted portal with id "' . $portalId . '" and name: "' . $portalName['name'] . '" . ```', "username" => $loggedUser);
			sendToWebhook($discordSubmitLogChannelUrl, ($data));
		}
	}
	public function delete_nest($nestId) {
		global $manualdb, $noDeleteNests, $noNests, $noDiscordSubmitLogChannel, $discordSubmitLogChannelUrl;
		if ( $noDeleteNests === true || $noNests === true ) {
			http_response_code( 401 );
			die();
		}
		if ( ! empty( $nestId ) ) {
			$manualdb->delete( 'nests', [
				"AND" => [
					'nest_id' => $nestId
				]
			] );
		}
	}
	public function submit_community($lat, $lon, $communityName, $communityDescription, $communityInvite, $loggedUser) {
		global $manualdb, $noCommunity, $noAddNewCommunity, $noDiscordSubmitLogChannel, $discordSubmitLogChannelUrl, $submitMapUrl;
		if ( $noCommunity === true || $noAddNewCommunity === true ) {
			http_response_code( 401 );
			die();
		}
		if (strpos($communityInvite, 'https://discord.gg') !== false) {
			$communityType = 3;
		} elseif (strpos($communityInvite, 'https://t.me') !== false) {
			$communityType = 4;
		} elseif (strpos($communityInvite, 'https://chat.whatsapp.com') !== false) {
			$communityType = 5;
		} elseif (strpos($communityInvite, 'https://m.me/join') !== false) {
			$communityType = 6;
		} elseif (strpos($communityInvite, 'https://facebook.com/groups') !== false) {
			$communityType = 7;
		} elseif (strpos($communityInvite, 'https://groupme.com/join_group') !== false) {
			$communityType = 8;
		} else {
			http_response_code( 401 );
			die();
		}
		if ( ! empty( $lat ) && ! empty( $lon ) && ! empty( $communityName ) && ! empty( $communityDescription ) && ! empty( $communityInvite ) ) {
			$communityId = randomNum();
			$cols       = [
				'community_id'        => $communityId,
				'title'               => $communityName,
				'description'         => $communityDescription,
				'type'                => $communityType,
				'image_url'           => null,
				'team_instinct'       => 1,
				'team_mystic'         => 1,
				'team_valor'          => 1,
				'has_invite_url'      => 1,
				'invite_url'          => $communityInvite,
				'lat'                 => $lat,
				'lon'                 => $lon,
				'updated'             => time(),
				'source'              => 1,
				'submitted_by'        => $loggedUser 
			];
			$manualdb->insert( "communities", $cols );
			if ( $noDiscordSubmitLogChannel === false ) {
				$data = array("content" => '```Added community with id "' . $communityId . '" and gave it the new name: "' . $communityName . '"```' . $submitMapUrl . '/?lat=' . $lat . '&lon=' . $lon . '&zoom=18 ', "username" => $loggedUser);
				sendToWebhook($discordSubmitLogChannelUrl, ($data));
			}
		}
	}
	public function modify_community($communityId, $communityName, $communityDescription, $communityInvite, $loggedUser) {
		global $manualdb, $noCommunity, $noEditCommunity, $noDiscordSubmitLogChannel, $discordSubmitLogChannelUrl;
		if ( $noCommunity === true || $noEditCommunity === true ) {
			http_response_code( 401 );
			die();
		}
		if (strpos($communityInvite, 'https://discord.gg') !== false) {
			$communityType = 3;
		} elseif (strpos($communityInvite, 'https://t.me') !== false) {
			$communityType = 4;
		} elseif (strpos($communityInvite, 'https://chat.whatsapp.com') !== false) {
			$communityType = 5;
		} elseif (strpos($communityInvite, 'https://m.me/join') !== false) {
			$communityType = 6;
		} elseif (strpos($communityInvite, 'https://facebook.com/groups') !== false) {
			$communityType = 7;
		} elseif (strpos($communityInvite, 'https://groupme.com/join_group') !== false) {
			$communityType = 8;
		} else {
			http_response_code( 401 );
			die();
		}
		if ( ! empty( $communityId ) && ! empty( $communityName ) && ! empty( $communityDescription ) && ! empty( $communityInvite ) ) {
			$cols       = [
				'title'               => $communityName,
				'description'         => $communityDescription,
				'type'                => $communityType,
				'team_instinct'       => 1,
				'team_mystic'         => 1,
				'team_valor'          => 1,
				'has_invite_url'      => 1,
				'invite_url'          => $communityInvite,
				'updated'             => time(),
				'source'              => 1,
				'submitted_by'        => $loggedUser 
			];
			$where    = [
				'community_id' => $communityId
			];
			$manualdb->update( "communities", $cols, $where );
			if ( $noDiscordSubmitLogChannel === false ) {
				$data = array("content" => '```Updated community with id "' . $communityId . '" and gave it the new name: "' . $communityName . '" . ```', "username" => $loggedUser);
				sendToWebhook($discordSubmitLogChannelUrl, ($data));
			}
		}
	}
	public function delete_community($communityId, $loggedUser) {
		global $manualdb, $noCommunity, $noDeleteCommunity, $noDiscordSubmitLogChannel, $discordSubmitLogChannelUrl;
		if ( $noCommunity === true || $noDeleteCommunity === true ) {
			http_response_code( 401 );
			die();
		}
		if ( ! empty( $communityId ) ) {
			$manualdb->delete( 'communities', [
				"AND" => [
					'community_id' => $communityId
				]
			] );
		}
		if ( $noDiscordSubmitLogChannel === false ) {
			$data = array("content" => '```Deleted community with id "' . $communityId . '" and name: "' . $communityName['title'] . '" . ```', "username" => $loggedUser);
			sendToWebhook($discordSubmitLogChannelUrl, ($data));
		}
	}
    public function submit_poi($lat, $lon, $poiName, $poiDescription, $poiNotes, $poiImage, $poiSurrounding, $loggedUser) {
        global $manualdb, $noPoi, $noAddPoi, $noDiscordSubmitLogChannel, $discordPOISubmitLogChannelUrl, $submitMapUrl, $imgurCID;
        if ($noPoi === true || $noAddPoi === true) {
            http_response_code(401);
            die();
        }
        $poiImageUrl = null;
        $poiImageDeleteHash = null;
        $poiSurroundingUrl = null;
        $poiSurroundingDeleteHash = null;
        if (! empty($poiImage)) {
            $payload    = [
                'image'		=> $poiImage,
                'name'		=> 'POI-' . $poiName
            ];
			$response = uploadImage($imgurCID, $payload);
			$info = json_decode($response, true);
			$poiImageUrl = $info['data']['link'];
			$poiImageDeleteHash = $info['data']['deletehash'];
        };
        if (! empty($poiSurrounding)) {
            $payload    = [
                'image'     => $poiSurrounding,
                'name'      => 'Surrounding-' . $poiName
            ];
			$response = uploadImage($imgurCID, $payload);
			$info = json_decode($response, true);
			$poiSurroundingUrl = $info['data']['link'];
			$poiSurroundingDeleteHash = $info['data']['deletehash'];
        };
        if (!empty($lat) && ! empty($lon) && !empty($poiName) && !empty($poiDescription)) {
            $poiExists = $manualdb->get("poi", [ "poi_id" ]);
            $poiId = randomNum();
            while (array_key_exists($poiId, $poiExists)){
                    $poiId = randomNum();
            };
            $cols       = [
                'poi_id'                    => $poiId,
                'name'                      => $poiName,
                'description'               => $poiDescription,
                'notes'                     => $poiNotes,
                'poiimageurl'               => $poiImageUrl,
                'poiimagedeletehash'        => $poiImageDeleteHash,
                'poisurroundingurl'         => $poiSurroundingUrl,
                'poisurroundingdeletehash'  => $poiSurroundingDeleteHash,
                'lat'                       => $lat,
                'lon'                       => $lon,
                'status'                    => 1,
                'submitted_by'              => $loggedUser,
                'submitted'                 => time()
            ];
            $manualdb->insert("poi", $cols);
            if ($noDiscordSubmitLogChannel === false) {
                $data = array(
                    "username" => $loggedUser,
                    "embeds" => array(array(
                        "color" => 65280,
                        "image" => array(
                                "url" => $poiImageUrl
                        ),
                        "thumbnail" => array(
                                "url" => $poiSurroundingUrl
                        ),
                        "fields" => array(
                            array(
                                "name" => 'Manual Action:',
                                "value" => 'New Potential Waystop (not sent to Wayfarer)'
                            ),
                            array(
                                "name" => 'Waystop Title:',
                                "value" => $poiName
                            ),
                            array(
                                "name" => 'Waystop Description:',
                                "value" => $poiDescription
                            ),
                            array(
                                "name" => 'Map link',
                                "value" => '[View Waystop on Map](' . $submitMapUrl . '/?lat=' . $lat . '&lon=' . $lon . '&zoom=18)'
                            )
                        )
                    ))
                );
                sendToWebhook($discordPOISubmitLogChannelUrl, ($data));
            }
        }
    }
    public function modify_poi($lat, $lon, $poiId, $poiName, $poiDescription, $poiNotes, $poiImage, $poiSurrounding, $loggedUser) {
        global $manualdb, $noPoi, $noEditPoi, $noDiscordSubmitLogChannel, $discordPOISubmitLogChannelUrl, $submitMapUrl, $imgurCID;
        if ($noPoi === true || $noEditPoi === true) {
            http_response_code(401);
            die();
        }
        $CPoi = $manualdb->get("poi", [ "poiimageurl", "poiimagedeletehash", "poisurroundingurl", "poisurroundingdeletehash" ], [ 'poi_id' => $poiId ]);
        if (! empty($poiImage)) {
            if (! empty($Cpoi['poiimagedeletehash'])) {
                deleteImage($imgurCID, $Cpoi['poiimagedeletehash']);
            };
            $payload    = [
                'image'     => $poiImage,
                'name'      => 'POI-' . $poiName
            ];
            $response = uploadImage($imgurCID, $payload);
            $info = json_decode($response, true);
            $poiImageUrl = $info['data']['link'];
            $poiImageDeleteHash = $info['data']['deletehash'];
        };
        if (!empty($poiSurrounding)) {
            if (! empty($Cpoi['poisurroundingdeletehash'])) {
                deleteImage($imgurCID, $Cpoi['poisurroundingdeletehash']);
            };
            $payload    = [
                'image'     => $poiSurrounding,
                'name'      => 'Surrounding-' . $poiName
            ];
            $response = uploadImage($imgurCID, $payload);
            $info = json_decode($response, true);
            $poiSurroundingUrl = $info['data']['link'];
            $poiSurroundingDeleteHash = $info['data']['deletehash'];
        };
        $poiImageUrl                    = ! empty($poiImageUrl) ? $poiImageUrl : $Cpoi['poiimageurl'];
        $poiImageDeleteHash             = ! empty($poiImageDeleteHash) ? $poiImageDeleteHash : $Cpoi['poiimagedeletehash'];
        $poiSurroundingUrl              = ! empty($poiSurroundingUrl) ? $poiSurroundingUrl : $Cpoi['poisurroundingurl'];
        $poiSurroundingDeleteHash       = ! empty($poiSurroundingDeleteHash) ? $poiSurroundingDeleteHash : $Cpoi['poisurroundingdeletehash'];
        if (!empty($poiId) && ! empty($poiName) && !empty($poiDescription)) {
            $cols       = [
                'name'                     => $poiName,
                'description'              => $poiDescription,
                'notes'                    => $poiNotes,
                'poiimageurl'              => $poiImageUrl,
                'poiimagedeletehash'       => $poiImageDeleteHash,
                'poisurroundingurl'        => $poiSurroundingUrl,
                'poisurroundingdeletehash' => $poiSurroundingDeleteHash,
                'updated'                  => time(),
                'edited_by'                => $loggedUser
            ];
            $where    = [
                'poi_id' => $poiId
            ];
            $manualdb->update("poi", $cols, $where);
        };
        if ($noDiscordSubmitLogChannel === false) {
            $data = array(
                "username" => $loggedUser,
                "embeds" => array(array(
                    "color" => 15105570,
                    "image" => array(
                            "url" => $poiImageUrl
                    ),
                    "thumbnail" => array(
                            "url" => $poiSurroundingUrl
                    ),
                    "fields" => array(
                        array(
                            "name" => 'Manual Action:',
                            "value" => 'Edit Waystop'
                        ),
                        array(
                            "name" => 'Waystop Title:',
                            "value" => $poiName
                        ),
                        array(
                            "name" => 'Waystop Description:',
                            "value" => $poiDescription
                        ),
                        array(
                            "name" => 'Map link',
                            "value" => '[View Waystop on Map](' . $submitMapUrl . '/?lat=' . $lat . '&lon=' . $lon . '&zoom=18)'
                        )
                    )
                ))
            );
            sendToWebhook($discordPOISubmitLogChannelUrl, ($data));
        }
    }
    public function delete_poi($poiId, $loggedUser) {
        global $manualdb, $noPoi, $noDeletePoi, $noDiscordSubmitLogChannel, $discordPOISubmitLogChannelUrl, $submitMapUrl, $imgurCID;
        if ($noPoi === true || $noDeletePoi === true) {
            http_response_code(401);
            die();
        }
        $poi = $manualdb->get("poi", [ "poiimagedeletehash", "poisurroundingdeletehash", "poiimageurl", "poisurroundingurl", "name", "description", "notes", "lat", "lon" ], [ 'poi_id' => $poiId ]);
        if (! empty($poiId)) {
            $manualdb->delete('poi', [
                "AND" => [
                        'poi_id' => $poiId
                ]
            ]);
            if (! empty($poi['poiimagedeletehash'])) {
                deleteImage($imgurCID, $poi['poiimagedeletehash']);
            };
            if (! empty($poi['poisurroundingdeletehash'])) {
                deleteImage($imgurCID, $poi['surroundingdeletehash']);
            };
        }
        if ($noDiscordSubmitLogChannel === false) {
            $data = array(
                "username" => $loggedUser,
                "embeds" => array(array(
                    "color" => 15158332,
                        "image" => array(
                            "url" => $poi['poiimageurl']
                        ),
                        "thumbnail" => array(
                            "url" => $poi['poisurroundingurl']
                        ),
                        "fields" => array(
                        array(
                            "name" => 'Manual Action:',
                            "value" => 'Delete Waystop'
                        ),
                        array(
                            "name" => 'Waystop Title:',
                            "value" => $poi['name']
                        ),
                        array(
                            "name" => 'Waystop Description:',
                            "value" => $poi['description']
                        ),
                        array(
                            "name" => 'Map link',
                            "value" => '[View Former Location on Map](' . $submitMapUrl . '/?lat=' . $poi['lat'] . '&lon=' . $poi['lon'] . '&zoom=18)'
                        )
                    )
                ))
            );
            sendToWebhook($discordPOISubmitLogChannelUrl, ($data));
        }
    }
    public function mark_poi_submitted($poiId, $loggedUser) {
        global $manualdb, $noPoi, $noMarkPoi, $noDiscordSubmitLogChannel, $discordPOISubmitLogChannelUrl, $submitMapUrl;
        if ($noPoi === true || $noMarkPoi === true) {
            http_response_code(401);
            die();
        }
        $poi = $manualdb->get("poi", [ "poiimageurl", "poisurroundingurl", "name", "description", "lat", "lon" ], [ 'poi_id' => $poiId ]);
        if (! empty($poiId)) {
            $cols     = [
                'updated'      => time(),
                'status'       => 2,
                'edited_by'   => $loggedUser
            ];
            $where    = [
                'poi_id' => $poiId
            ];
            $manualdb->update("poi", $cols, $where);
            if ($noDiscordSubmitLogChannel === false) {
                $data = array(
                    "username" => $loggedUser,
                    "embeds" => array(array(
                        "color" => 65280,
                        "image" => array(
                            "url" => $poi['poiimageurl']
                        ),
                        "thumbnail" => array(
                            "url" => $poi['poisurroundingurl']
                        ),
                        "fields" => array(
                            array(
                                "name" => 'Manual Action:',
                                "value" => 'Waystop Candidate Submitted to Wayfarer'
                            ),
                            array(
                                "name" => 'Waystop Title:',
                                "value" => $poi['name']
                            ),
                            array(
                                "name" => 'Waystop Description:',
                                "value" => $poi['description']
                            ),
                            array(
                                "name" => 'Map link',
                                "value" => '[View Waystop on Map](' . $submitMapUrl . '/?lat=' . $poi['lat'] . '&lon=' . $poi['lon'] . '&zoom=18)'
                            )
                        )
                    ))
                );
                sendToWebhook($discordPOISubmitLogChannelUrl, ($data));
            }
        }
    }
    public function mark_poi_declined($poiId, $loggedUser) {
        global $manualdb, $noPoi, $noMarkPoi, $noDiscordSubmitLogChannel, $discordPOISubmitLogChannelUrl, $submitMapUrl;
        if ($noPoi === true || $noMarkPoi === true) {
                http_response_code(401);
                die();
        }
        $poi = $manualdb->get("poi", [ "poiimageurl", "poisurroundingurl", "name", "description", "lat", "lon" ], [ 'poi_id' => $poiId ]);
        if (! empty($poiId)) {
            $cols     = [
            'updated'      => time(),
            'status'       => 3,
            'edited_by'   => $loggedUser
            ];
            $where    = [
                    'poi_id' => $poiId
            ];
            $manualdb->update("poi", $cols, $where);
            if ($noDiscordSubmitLogChannel === false) {
                $data = array(
                    "username" => $loggedUser,
                    "embeds" => array(array(
                            "color" => 15158332,
                            "image" => array(
                                    "url" => $poi['poiimageurl']
                            ),
                            "thumbnail" => array(
                                    "url" => $poi['poisurroundingurl']
                            ),
                            "fields" => array(
                                array(
                                    "name" => 'Manual Action:',
                                    "value" => 'Waystop Declined by Wayfarer'
                                ),
                                array(
                                    "name" => 'Waystop Title:',
                                    "value" => $poi['name']
                                ),
                                array(
                                    "name" => 'Waystop Description:',
                                    "value" => $poi['description']
                                ),
                                array(
                                    "name" => 'Map link',
                                    "value" => '[View Waystop on Map](' . $submitMapUrl . '/?lat=' . $poi['lat'] . '&lon=' . $poi['lon'] . '&zoom=18)'
                                )
                            )
                    ))
                );
                sendToWebhook($discordPOISubmitLogChannelUrl, ($data));
            }
        }
    }
}
