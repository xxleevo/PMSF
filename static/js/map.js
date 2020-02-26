//
// Global map.js variables
//

var login
var expireTimestamp

var $selectExclude
var $selectExcludeMinIV
var $selectPokemonNotify
var $textPerfectionNotify
var $textLevelNotify
var $textMinIV
var $textMinLevel
var $raidNotify
var $selectStyle
var $selectIconSize
var $selectIconNotifySizeModifier
var $switchOpenGymsOnly
var $selectTeamGymsOnly
var $selectLastUpdateGymsOnly
var $selectNewGymsOnly
var $selectNewPokestopsOnly
var $switchActiveRaids
var $selectMinGymLevel
var $selectMaxGymLevel
var $selectMinRaidLevel
var $selectMaxRaidLevel
var $selectNewPortalsOnly
var $selectGymMarkerStyle
var $selectPokemonLabelStyle
var $selectOverlayStyle
var $selectIconStyle
var $selectLocationIconMarker
var $switchGymSidebar
var $switchTinyRat
var $switchBigKarp
var $selectDirectionProvider
var $switchExEligible
var $switchBattleStatus
var $switchWeatherIcons
var $switchPokeIVIcons
var $switchBadgeMode
var $questsExcludePokemon
var $questsExcludeItem
var $excludeGrunts
var $excludeRaidbosses
var $excludeRaideggs

var language = document.documentElement.lang === '' ? 'en' : document.documentElement.lang
var languageSite = 'en'
var idToPokemon = {}
var idToItem = {}
var idToGrunt = {}
var i8lnDictionary = {}
var languageLookups = 0
var languageLookupThreshold = 3

var searchMarkerStyles

var timestamp
var excludedPokemon = []
var excludedMinIV = []
var notifiedPokemon = []
var questsExcludedPokemon = []
var questsExcludedItem = []
var excludedGrunts = []
var excludedRaidbosses = []
var excludedRaideggs = []
var notifiedMinPerfection = null
var notifiedMinLevel = null
var minIV = null
var prevMinIV = null
var prevMinLevel = null
var onlyPokemon = 0
var directionProvider

var buffer = []
var reincludedPokemon = []
var reincludedQuestsPokemon = []
var reincludedQuestsItem = []
var reincludedGrunts = []
var reincludedRaidbosses = []
var reincludedRaideggs = []
var reids = []
var qpreids = []
var qireids = []
var greids = []
var rbreids = []
var rereids = []
var dustamount
var reloaddustamount

var L
var map
var markers
var markersnotify
var _oldlayer = 'openstreetmap'
var rawDataIsLoading = false
var locationMarker
var rangeMarkers = ['pokemon', 'pokestop', 'gym']
var storeZoom = true
var scanPath
var moves
var weather
var boostedMons // eslint-disable-line no-unused-vars

var oSwLat
var oSwLng
var oNeLat
var oNeLng

var lastpokestops
var lastgyms
var lastnests
var lastcommunities
var lastportals
var lastpois
var lastpokemon
var lastslocs
var lastspawns

var markPortalsAsNew

var selectedStyle = 'openstreetmap'

var updateWorker
var lastUpdateTime
var lastWeatherUpdateTime

var token

var cries

var pokeList = []
var raidBoss = {} // eslint-disable-line no-unused-vars
var itemList = []
var gruntList = []
var raidbossList = []
var raideggsList = []
var questtypeList = []
var rewardtypeList = []
var conditiontypeList = []
var gymId

var personalBadges = []
personalBadges['gold'] = []
personalBadges['silver'] = []
personalBadges['bronze'] = []

var assetsPath = 'static/sounds/'
var iconpath = null

var gymTypes = ['Uncontested', 'Mystic', 'Valor', 'Instinct']

var triggerGyms = Store.get('triggerGyms')
var onlyTriggerGyms
var noExGyms
var noParkInfo
var toastrOptions = {
    'closeButton': true,
    'debug': false,
    'newestOnTop': true,
    'progressBar': false,
    'positionClass': 'toast-top-right',
    'preventDuplicates': true,
    'onclick': null,
    'showDuration': '300',
    'hideDuration': '1000',
    'timeOut': '25000',
    'extendedTimeOut': '1000',
    'showEasing': 'swing',
    'hideEasing': 'linear',
    'showMethod': 'fadeIn',
    'hideMethod': 'fadeOut'
}

createjs.Sound.registerSound('static/sounds/ding.mp3', 'ding')

var pokemonTypes = [i8ln('unset'), i8ln('Normal'), i8ln('Fighting'), i8ln('Flying'), i8ln('Poison'), i8ln('Ground'), i8ln('Rock'), i8ln('Bug'), i8ln('Ghost'), i8ln('Steel'), i8ln('Fire'), i8ln('Water'), i8ln('Grass'), i8ln('Electric'), i8ln('Psychic'), i8ln('Ice'), i8ln('Dragon'), i8ln('Dark'), i8ln('Fairy')]
var gruntCharacterTypes = [i8ln('unset'), i8ln('Team Leader'), i8ln('Grunt'), i8ln('Arlo'), i8ln('Cliff'), i8ln('Sierra'), i8ln('Giovanni')]
var genderType = ['♂', '♀', 'N/A']
var forms = ['unset', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '!', '?', i8ln('Normal'), i8ln('Sunny'), i8ln('Rainy'), i8ln('Snowy'), i8ln('Normal'), i8ln('Attack'), i8ln('Defense'), i8ln('Speed'), i8ln('1'), i8ln('2'), i8ln('3'), i8ln('4'), i8ln('5'), i8ln('6'), i8ln('7'), i8ln('8'), i8ln('Normal'), i8ln('Alola'), i8ln('Normal'), i8ln('Alola'), i8ln('Normal'), i8ln('Alola'), i8ln('Normal'), i8ln('Alola'), i8ln('Normal'), i8ln('Alola'), i8ln('Normal'), i8ln('Alola'), i8ln('Normal'), i8ln('Alola'), i8ln('Normal'), i8ln('Alola'), i8ln('Normal'), i8ln('Alola'), i8ln('Normal'), i8ln('Alola'), i8ln('Normal'), i8ln('Alola'), i8ln('Normal'), i8ln('Alola'), i8ln('Normal'), i8ln('Alola'), i8ln('Normal'), i8ln('Alola'), i8ln('Normal'), i8ln('Alola'), i8ln('Normal'), i8ln('Alola'), i8ln('Normal'), i8ln('Alola'), i8ln('Normal'), i8ln('Alola'), i8ln('Normal'), i8ln('Frost'), i8ln('Fan'), i8ln('Mow'), i8ln('Wash'), i8ln('Heat'), i8ln('Plant'), i8ln('Sandy'), i8ln('Trash'), i8ln('Altered'), i8ln('Origin'), i8ln('Sky'), i8ln('Land'), i8ln('Overcast'), i8ln('Sunny'), i8ln('West sea'), i8ln('East sea'), i8ln('West sea'), i8ln('East sea'), i8ln('Arceus Normal'), i8ln('Archeus Fighting'), i8ln('Archeus Flying'), i8ln('Archeus Poison'), i8ln('Archeus Ground'), i8ln('Archeus Rock'), i8ln('Archeus Bug'), i8ln('Archeus Ghost'), i8ln('Archeus Steel'), i8ln('Archeus Fire'), i8ln('Archeus Water'), i8ln('Archeus Grass'), i8ln('Archeus Electric'), i8ln('Archeus Psychic'), i8ln('Archeus Ice'), i8ln('Archeus Dragon'), i8ln('Archeus Dark'), i8ln('Archeus Fairy'), i8ln('Plant'), i8ln('Sandy'), i8ln('Trash'), i8ln('8'), i8ln('9'), i8ln('10'), i8ln('11'), i8ln('12'), i8ln('13'), i8ln('14'), i8ln('15'), i8ln('16'), i8ln('17'), i8ln('18'), i8ln('19'), i8ln('Armored'), i8ln('A-intro'), i8ln('Normal'), i8ln('Red Striped'), i8ln('Blue Striped'), i8ln('Normal'), i8ln('Zen'), i8ln('Incarnate'), i8ln('Therian'), i8ln('Incarnate'), i8ln('Therian'), i8ln('Incarnate'), i8ln('Therian'), i8ln('Normal'), i8ln('Black'), i8ln('White'), i8ln('Ordinary'), i8ln('Resolute'), i8ln('Aria'), i8ln('Pirouette'), i8ln('Shadow'), i8ln('Purified'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Shadow'), i8ln('Purified'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Spring'), i8ln('Summer'), i8ln('Autumn'), i8ln('Winter'), i8ln('Spring'), i8ln('Summer'), i8ln('Autumn'), i8ln('Winter'), i8ln('Normal'), i8ln('Schock'), i8ln('Burn'), i8ln('Chill'), i8ln('Douse'), i8ln('Normal'), i8ln('Unknown'), i8ln('Normal'), i8ln('Unknown'), i8ln('Normal'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Unknown'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Shadow'), i8ln('Purified'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Shadow'), i8ln('Purified'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Shadow'), i8ln('Purified'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Shadow'), i8ln('Purified'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Shadow'), i8ln('Purified'), i8ln('Shadow'), i8ln('Purified'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Fall'), i8ln('Fall'), i8ln('Fall'), i8ln('Fall'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('VS 2019'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Normal'), i8ln('Shadow'), i8ln('Purified'), i8ln('Galarian'), i8ln('Normal'), i8ln('Galarian'), i8ln('Normal'), i8ln('Galarian'), i8ln('Unknown'), i8ln('Clone'), i8ln('Clone'), i8ln('Clone')]
var formsEn = ['unset', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '!', '?', 'Normal', 'Sunny', 'Rainy', 'Snowy', 'Normal', 'Attack', 'Defense', 'Speed', '1', '2', '3', '4', '5', '6', '7', '8', 'Normal', 'Alola', 'Normal', 'Alola', 'Normal', 'Alola', 'Normal', 'Alola', 'Normal', 'Alola', 'Normal', 'Alola', 'Normal', 'Alola', 'Normal', 'Alola', 'Normal', 'Alola', 'Normal', 'Alola', 'Normal', 'Alola', 'Normal', 'Alola', 'Normal', 'Alola', 'Normal', 'Alola', 'Normal', 'Alola', 'Normal', 'Alola', 'Normal', 'Alola', 'Normal', 'Alola', 'Normal', 'Frost', 'Fan', 'Mow', 'Wash', 'Heat', 'Plant', 'Sandy', 'Trash', 'Altered', 'Origin', 'Sky', 'Land', 'Overcast', 'Sunny', 'West sea', 'East sea', 'West sea', 'East sea', 'Arceus Normal', 'Fighting', 'Flying', 'Poison', 'Ground', 'Rock', 'Bug', 'Ghost', 'Steel', 'Fire', 'Water', 'Grass', 'Electric', 'Psychic', 'Ice', 'Dragon', 'Dark', 'Fairy', 'Plant', 'Sandy', 'Trash', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', 'Armored', 'A-intro', 'Normal', 'Red Striped', 'Blue Striped', 'Normal', 'Zen', 'Incarnate', 'Therian', 'Incarnate', 'Therian', 'Incarnate', 'Therian', 'Normal', 'Black', 'White', 'Ordinary', 'Resolute', 'Aria', 'Pirouette', 'Shadow', 'Purified', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Shadow', 'Purified', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Spring', 'Summer', 'Autumn', 'Winter', 'Spring', 'Summer', 'Autumn', 'Winter', 'Normal', 'Schock', 'Burn', 'Chill', 'Douse', 'Normal', 'Unknown', 'Normal', 'Unknown', 'Normal', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Shadow', 'Purified', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Shadow', 'Purified', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Shadow', 'Purified', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Shadow', 'Purified', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Shadow', 'Purified', 'Shadow', 'Purified', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Fall', 'Fall', 'Fall', 'Fall', 'Normal', 'Shadow', 'Purified', 'VS 2019', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Normal', 'Shadow', 'Purified', 'Galarian', 'Normal', 'Galarian', 'Normal', 'Galarian', '', '', '', '']
var cpMultiplier = [0.094, 0.16639787, 0.21573247, 0.25572005, 0.29024988, 0.3210876, 0.34921268, 0.37523559, 0.39956728, 0.42250001, 0.44310755, 0.46279839, 0.48168495, 0.49985844, 0.51739395, 0.53435433, 0.55079269, 0.56675452, 0.58227891, 0.59740001, 0.61215729, 0.62656713, 0.64065295, 0.65443563, 0.667934, 0.68116492, 0.69414365, 0.70688421, 0.71939909, 0.7317, 0.73776948, 0.74378943, 0.74976104, 0.75568551, 0.76156384, 0.76739717, 0.7731865, 0.77893275, 0.7846369, 0.79030001]
var throwType = JSON.parse('{"10": "good", "11": "great", "12": "excellent"}')
var weatherLayerGroup = new L.LayerGroup()
var weatherArray = []
var weatherPolys = []
var weatherMarkers = []
var weatherColors

var S2
var exLayerGroup = new L.LayerGroup()
var gymLayerGroup = new L.LayerGroup()
var stopLayerGroup = new L.LayerGroup()
var scanAreaGroup = new L.LayerGroup()
var scanAreaGroupQuest = new L.LayerGroup()
var scanAreaGroupPvp = new L.LayerGroup()
var nestPolygonGroup = new L.LayerGroup()
var scanAreas = []
/*
 text place holders:
 <pkm> - pokemon name
 <prc> - iv in percent without percent symbol
 <atk> - attack as number
 <def> - defense as number
 <sta> - stamnia as number
 */
var notifyIvTitle = '<pkm> <prc>% (<atk>/<def>/<sta>)'
var notifyNoIvTitle = '<pkm>'

/*
 text place holders:
 <dist>  - disappear time
 <udist> - time until disappear
 */
var notifyText = i8ln('Until Approx.') + '<dist> (<udist>)'

var OpenStreetMapProvider = window.GeoSearch.OpenStreetMapProvider
var searchProvider = new OpenStreetMapProvider()
//
// Extras
//
L.Marker.addInitHook(function () {
    if (this.options.virtual) {
        this.on('add', function () {
            this._updateIconVisibility = function () {
                if (!this._map) {
                    return
                }
                var map = this._map
                var isVisible = map.getBounds().contains(this.getLatLng())
                var wasVisible = this._wasVisible
                var icon = this._icon
                var iconParent = this._iconParent
                var shadow = this._shadow
                var shadowParent = this._shadowParent

                if (!iconParent) {
                    iconParent = this._iconParent = icon.parentNode
                }
                if (shadow && !shadowParent) {
                    shadowParent = this._shadowParent = shadow.parentNode
                }

                if (isVisible !== wasVisible) {
                    if (isVisible) {
                        iconParent.appendChild(icon)
                        if (shadow) {
                            shadowParent.appendChild(shadow)
                        }
                    } else {
                        iconParent.removeChild(icon)
                        if (shadow) {
                            shadowParent.removeChild(shadow)
                        }
                    }
                    this._wasVisible = isVisible
                }
            }

            this._map.on('resize moveend zoomend', this._updateIconVisibility, this)
            this._updateIconVisibility()
        }, this)
    }
})
//
// Functions
//
if (location.search.indexOf('login=true') > 0) {
    $('#nav').load(window.location.href + '#nav')
    window.location.href = '/'
}
if (location.search.indexOf('login=false') > 0) {
    openAccessDeniedModal()
}
if (forcedTileServer) {
    Store.set('map_style', 'tileserver')
}
if (noRaids && Store.get('showRaids')) {
    Store.set('showRaids', false)
}
function openAccessDeniedModal(event) { // eslint-disable-line no-unused-vars
    $('.ui-dialog').remove()
    $('.accessdenied-modal').clone().dialog({
        modal: true,
        maxHeight: 600,
        buttons: {},
        title: i8ln('Your access is denied'),
        classes: {
            'ui-dialog': 'ui-dialog raid-widget-popup'
        }
    })
}
function formatDate(date) {
    var monthNames = [
        'January', 'February', 'March',
        'April', 'May', 'June', 'July',
        'August', 'September', 'October',
        'November', 'December'
    ]

    var day = date.getDate()
    var monthIndex = date.getMonth()
    var year = date.getFullYear()
    var hours = date.getHours()
    var minutes = date.getMinutes()
    if (minutes < 10) {
        minutes = '0' + minutes
    } else {
        minutes = minutes + ''
    }

    return day + ' ' + monthNames[monthIndex] + ' ' + year + ' ' + hours + ':' + minutes
}

function excludePokemon(id) { // eslint-disable-line no-unused-vars
    $selectExclude.val(
        $selectExclude.val().split(',').concat(id).join(',')
    ).trigger('change')
    $('label[for="exclude-pokemon"] .pokemon-list .pokemon-icon-sprite[data-value="' + id + '"]').addClass('active')
    clearStaleMarkers()
}

function excludePokemonQuest(id) { // eslint-disable-line no-unused-vars
    $questsExcludePokemon.val(
        $questsExcludePokemon.val().split(',').concat(id).join(',')
    ).trigger('change')
    $('label[for="exclude-quests-pokemon"] .pokemon-list .pokemon-icon-sprite[data-value="' + id + '"]').addClass('active')
    updatePokestops()
}

function excludeItemQuest(id) { // eslint-disable-line no-unused-vars
    $questsExcludeItem.val(
        $questsExcludeItem.val().split(',').concat(id).join(',')
    ).trigger('change')
    $('label[for="exclude-quests-item"] .item-list .item-icon-sprite[data-value="' + id + '"]').addClass('active')
    updatePokestops()
}
function excludeDustQuest() { // eslint-disable-line no-unused-vars
    dustamount = 0
    Store.set('showDustAmount', dustamount)
    $('#dustvalue').text(i8ln('Disabled'))
    setTimeout(function () { updateMap() }, 2000)
    updatePokestops()
}


function notifyAboutPokemon(id) { // eslint-disable-line no-unused-vars
    $selectPokemonNotify.val(
        $selectPokemonNotify.val().split(',').concat(id).join(',')
    ).trigger('change')
    $('label[for="notify-pokemon"] .pokemon-list .pokemon-icon-sprite[data-value="' + id + '"]').addClass('active')
}

function removePokemonMarker(encounterId) { // eslint-disable-line no-unused-vars
    if (mapData.pokemons[encounterId].marker.rangeCircle) {
        markers.removeLayer(mapData.pokemons[encounterId].marker.rangeCircle)
        markersnotify.removeLayer(mapData.pokemons[encounterId].marker.rangeCircle)
        delete mapData.pokemons[encounterId].marker.rangeCircle
    }
    markers.removeLayer(mapData.pokemons[encounterId].marker)
    markersnotify.removeLayer(mapData.pokemons[encounterId].marker)
    mapData.pokemons[encounterId].hidden = true
}
// temp remove stop from map
function removePokestopMarker(pokestopId) { // eslint-disable-line no-unused-vars
    if (mapData.pokestops[pokestopId].marker.rangeCircle) {
        markers.removeLayer(mapData.pokestops[pokestopId].marker.rangeCircle)
        markersnotify.removeLayer(mapData.pokestops[pokestopId].marker.rangeCircle)
        delete mapData.pokestops[pokestopId].marker.rangeCircle
    }
    markers.removeLayer(mapData.pokestops[pokestopId].marker)
    markersnotify.removeLayer(mapData.pokestops[pokestopId].marker)
    mapData.pokestops[pokestopId].hidden = true
}
// temp remove gym from map
function removeGymMarker(gymId) { // eslint-disable-line no-unused-vars
    if (mapData.gyms[gymId].marker.rangeCircle) {
        markers.removeLayer(mapData.gyms[gymId].marker.rangeCircle)
        markersnotify.removeLayer(mapData.gyms[gymId].marker.rangeCircle)
        delete mapData.gyms[gymId].marker.rangeCircle
    }
    markers.removeLayer(mapData.gyms[gymId].marker)
    markersnotify.removeLayer(mapData.gyms[gymId].marker)
    mapData.gyms[gymId].hidden = true
}

function createServiceWorkerReceiver() {
    navigator.serviceWorker.addEventListener('message', function (event) {
        const data = JSON.parse(event.data)
        if (data.action === 'centerMap' && data.lat && data.lon) {
            centerMap(data.lat, data.lon, 20)
        }
    })
}

function initMap() { // eslint-disable-line no-unused-vars
    map = L.map('map', {
        center: [centerLat, centerLng],
        zoom: zoom == null ? Store.get('zoomLevel') : zoom,
        minZoom: minZoom,
        maxZoom: maxZoom,
        zoomControl: false,
        preferCanvas: true,
        layers: [weatherLayerGroup, exLayerGroup, gymLayerGroup, stopLayerGroup, scanAreaGroup, scanAreaGroupQuest, scanAreaGroupPvp, nestPolygonGroup]
    })

    setTileLayer(Store.get('map_style'))
    markers = L.markerClusterGroup({
        disableClusteringAtZoom: disableClusteringAtZoom,
        spiderfyOnMaxZoom: spiderfyOnMaxZoom,
        zoomToBoundsOnClick: zoomToBoundsOnClick,
        showCoverageOnHover: true,
        maxClusterRadius: maxClusterRadius,
        removeOutsideVisibleBounds: true
    })
    L.control.zoom({
        position: 'bottomright'
    }).addTo(map)

    var d = new Date()
    if (letItSnow && d.getMonth() === 11 && d.getDate() >= 24 && d.getDate() <= 26) {
        const snow = '<div class="winter-is-coming">\n' +
            '<div class="snow snow--near"></div>\n' +
            '<div class="snow snow--near snow--alt"></div>\n' +
            '<div class="snow snow--mid"></div>\n' +
            '<div class="snow snow--mid snow--alt"></div>\n' +
            '<div class="snow snow--far"></div>\n' +
            '<div class="snow snow--far snow--alt"></div>\n' +
            '</div>'
        $('#map').append(snow)
    }
    if (makeItBang && d.getMonth() === 11 && d.getDate() === 31) {
        const fireworks = '<div class="pyro">' +
            '<div class="before"></div>' +
            '<div class="after"></div>' +
            '</div>'
        $('#map').append(fireworks)
    }

    map.addLayer(markers)
    markersnotify = L.layerGroup().addTo(map)
    map.on('zoom', function () {
        if (storeZoom === true) {
            Store.set('zoomLevel', map.getZoom())
        } else {
            storeZoom = true
        }

        updateGymIcons()
        if (this.getZoom() > 13) {
            // hide weather markers
            $.each(weatherMarkers, function (index, marker) {
                markers.removeLayer(marker)
            })
            // show header weather
            $('#currentWeather').fadeIn()
        } else {
            // show weather markers
            $.each(weatherMarkers, function (index, marker) {
                markers.addLayer(marker)
            })
            // hide header weather
            $('#currentWeather').fadeOut()
        }
    })
    map.createPane('portals')
    map.getPane('portals').style.zIndex = 450
    createMyLocationButton()
    initSidebar()

    var locale = window.navigator.userLanguage || window.navigator.language
    moment.locale(locale)

    if (language === 'jp') {
        languageSite = 'ja'
    } else if (language === 'pt_br') {
        languageSite = 'pt-br'
    } else if (language === 'zh_tw') {
        languageSite = 'zh-tw'
    } else {
        languageSite = language
    }

    if (Push._agents.chrome.isSupported()) {
        createServiceWorkerReceiver()
    }

    updateWeatherOverlay()
    updateS2Overlay()
    buildScanPolygons()
    buildScanPolygonQuest()
    buildScanPolygonPvp()
    buildNestPolygons()
    createHearts() // Only if enabled for Val-Day

    map.on('moveend', function () {
        updateS2Overlay()
    })

    map.on('click', function (e) {
        if ($('.submit-on-off-button').hasClass('on')) {
            $('.submitLatitude').val(e.latlng.lat)
            $('.submitLongitude').val(e.latlng.lng)
            $('.ui-dialog').remove()
            $('.submit-modal').clone().dialog({
                modal: true,
                maxHeight: 600,
                buttons: {},
                title: i8ln('Submit Data to Map'),
                classes: {
                    'ui-dialog': 'ui-dialog submit-widget-popup'
                },
                open: function (event, ui) {
                    $('.submit-widget-popup #submit-tabs').tabs()
                    $('.submit-widget-popup .pokemon-list-cont').each(function (index) {
                        $(this).attr('id', 'pokemon-list-cont-6' + index)
                        var options = {
                            valueNames: ['name', 'types', 'id']
                        }
                        var monList = new List('pokemon-list-cont-6' + index, options) // eslint-disable-line no-unused-vars
                    })
                }
            })
        }
    })

    // Pokemon Label Style
    $selectPokemonLabelStyle = $('#pokemon-label-style')
    $selectPokemonLabelStyle.select2({
        placeholder: 'Select Style',
        minimumResultsForSearch: Infinity
    })
    $selectPokemonLabelStyle.on('change', function (e) {
        Store.set('pokemonLabelStyle', this.value)
        // Redraw Pokemon when changing the label
        redrawPokemon(mapData.pokemons)
    })
}

function toggleFullscreenMap() { // eslint-disable-line no-unused-vars
    map.toggleFullscreen()
}
var openstreetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}) // eslint-disable-line no-unused-vars

var darkmatter = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {attribution: '&copy; <a href="https://carto.com/">Carto</a>'}) // eslint-disable-line no-unused-vars

var styleblackandwhite = L.tileLayer('https://korona.geog.uni-heidelberg.de/tiles/roadsg/x={x}&y={y}&z={z}', {attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}) // eslint-disable-line no-unused-vars

var styletopo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}) // eslint-disable-line no-unused-vars

var stylesatellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'}) // eslint-disable-line no-unused-vars

var stylewikipedia = L.tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png', {attribution: '<a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">Wikimedia</a>'}) // eslint-disable-line no-unused-vars

var googlemapssat = L.gridLayer.googleMutant({type: 'satellite'}) // eslint-disable-line no-unused-vars
var googlemapsroad = L.gridLayer.googleMutant({type: 'roadmap'}) // eslint-disable-line no-unused-vars

var tileserver = L.tileLayer(customTileServerAddress, {attribution: 'Tileserver'}) // eslint-disable-line no-unused-vars

function setTileLayer(layername) {
    if (map.hasLayer(window[_oldlayer])) { map.removeLayer(window[_oldlayer]) }
    map.addLayer(window[layername])
    _oldlayer = layername
}

function updateLocationMarker(style) {
    var locationIcon
    if (style in searchMarkerStyles) {
        var url = searchMarkerStyles[style].icon
        if (url) {
            locationIcon = L.icon({
                iconUrl: url,
                iconSize: [24, 24]
            })
            locationMarker.setIcon(locationIcon)
        } else {
            locationIcon = new L.Icon.Default()
            locationMarker.setIcon(locationIcon)
        }
        Store.set('locationMarkerStyle', style)
    }
    return locationMarker
}

function createLocationMarker() {
    var position = Store.get('followMyLocationPosition')
    var lat = 'lat' in position ? position.lat : centerLat
    var lng = 'lng' in position ? position.lng : centerLng

    var locationMarker = L.marker([lat, lng]).addTo(markersnotify)
    addListeners(locationMarker)

    locationMarker.on('dragend', function () {
        var newLocation = locationMarker.getPosition()
        Store.set('followMyLocationPosition', {
            lat: newLocation.lat,
            lng: newLocation.lng
        })
    })

    return locationMarker
}
function pointInPolygon(x, y, cornersX, cornersY) {
    var i
    var j = cornersX.length - 1
    var odd = 0
    var pX = cornersX
    var pY = cornersY

    for (i = 0; i < cornersX.length; i++) {
        if (((pY[i] < y && pY[j] >= y) || (pY[j] < y && pY[i] >= y)) && (pX[i] <= x || pX[j] <= x)) {
            odd ^= (pX[i] + (y - pY[i]) * (pX[j] - pX[i]) / (pY[j] - pY[i])) < x
        }
        j = i
    }
    return odd === 1
}

function showS2Cells(level, style) {
    const bounds = map.getBounds()
    const swPoint = bounds.getSouthWest()
    const nePoint = bounds.getNorthEast()
    const swLat = swPoint.lat
    const swLng = swPoint.lng
    const neLat = nePoint.lat
    const neLng = nePoint.lng

    function addPoly(cell) {
        const vertices = cell.getCornerLatLngs()
        var s2Lats = []
        var s2Lons = []
        for (let j = 0; j < vertices.length; j++) {
            s2Lats[j] = vertices[j]['lat']
            s2Lons[j] = vertices[j]['lng']
        }
        var stopCount = 0
        var sponsoredStopCount = 0
        var sponsoredGymCount = 0
        var gymCount = 0
        var totalCount = 0
        if ((cell.level === 14 || cell.level === 17) && Store.get('showGymCellCalculations')) {
            $.each(mapData.pokestops, function (key, value) {
                if (pointInPolygon(value['latitude'], value['longitude'], s2Lats, s2Lons)) {
                    if (value['pokestop_id'].includes('.')) {
                        stopCount++
                        totalCount++
                    } else {
                        sponsoredStopCount++
                    }
                }
            })
            $.each(mapData.gyms, function (key, value) {
                if (pointInPolygon(value['latitude'], value['longitude'], s2Lats, s2Lons)) {
                    if (value['gym_id'].includes('.')) {
                        gymCount++
                        totalCount++
                    } else {
                        sponsoredGymCount++
                    }
                }
            })
        }

        var nextGymLevel = ''
        var html = ''
        var filledStyle = {color: 'black', fillOpacity: 0.0}
        if ((cell.level === 14 && Store.get('showGymCellCalculations')) && (totalCount === 1 || totalCount === 5 || totalCount === 19)) {
            filledStyle = {fillColor: 'green', fillOpacity: 0.3}
            nextGymLevel = '<div><center><b>' + i8ln('1 more Pokéstop until new gym') + '</b></center></div>'
        } else if ((cell.level === 14 && Store.get('showGymCellCalculations')) && (totalCount === 4 || totalCount === 18)) {
            filledStyle = {fillColor: 'orange', fillOpacity: 0.3}
            nextGymLevel = '<div><center><b>' + i8ln('2 more Pokéstops until new gym') + '</b></center></div>'
        } else if (cell.level === 14 && totalCount >= 20 && Store.get('showGymCellCalculations')) {
            filledStyle = {fillColor: 'black', fillOpacity: 0.3}
            nextGymLevel = '<div><center><b>' + i8ln('Max amount of Gyms reached') + '</b></center></div>'
        }
        if (cell.level === 17 && Store.get('showCoveredPokestopCells')) {
            $.each(mapData.pokestops, function (key, value) {
                if (pointInPolygon(value['latitude'], value['longitude'], s2Lats, s2Lons) && value['pokestop_id'].includes('.')) {
                    filledStyle = {fillColor: 'red', fillOpacity: 0.3}
                }
            })
            $.each(mapData.gyms, function (key, value) {
                if (pointInPolygon(value['latitude'], value['longitude'], s2Lats, s2Lons) && value['gym_id'].includes('.')) {
                    filledStyle = {fillColor: 'red', fillOpacity: 0.3}
                }
            })
        }
        const poly = L.polygon(vertices, Object.assign({color: 'black', opacity: 0.5, weight: 0.5, fillOpacity: 0.0}, style, filledStyle))
        if (cell.level === 14 && Store.get('showGymCellCalculations')) {
            html += '<div><b><u>' + i8ln('Gym cell') + '</u></b></div>' +
                nextGymLevel +
                '<hr style="margin:10px;">' +
                '<div>' + i8ln('Gyms in cell') + ': <b>' + gymCount + '</b></div>' +
                '<div>' + i8ln('Pokéstops in cell') + ': <b>' + stopCount + '</b></div>'
            if (sponsoredStopCount > 0) {
                html += '<div>' + i8ln('Sponsored Pokéstops in cell') + ': <b>' + sponsoredStopCount + '</b></div>'
            }
            if (sponsoredGymCount > 0) {
                html += '<div>' + i8ln('Sponsored Gyms in cell') + ': <b>' + sponsoredGymCount + '</b></div>'
            }
            if (sponsoredStopCount > 0 || sponsoredGymCount > 0) {
                html += '<div>' + i8ln('Total (excluding sponsored)') + ': <b>' + totalCount + '</b></div>'
            } else {
                html += '<div>' + i8ln('Total') + ': <b>' + totalCount + '</b></div>'
            }
            if (!$('.submit-on-off-button').hasClass('on')) {
                poly.bindPopup(html, {autoPan: false, closeOnClick: true, autoClose: false})
            }
        }
        if (cell.level === 13) {
            exLayerGroup.addLayer(poly)
        } else if (cell.level === 14) {
            gymLayerGroup.addLayer(poly)
        } else if (cell.level === 17) {
            stopLayerGroup.addLayer(poly)
        }
    }

    let processedCells = {}
    let stack = []

    const centerCell = S2.S2Cell.FromLatLng(bounds.getCenter(), level)
    processedCells[centerCell.toString()] = true
    stack.push(centerCell)
    addPoly(centerCell)

    // Find all cells within view with a slighty modified version of the BFS algorithm.
    while (stack.length > 0) {
        const cell = stack.pop()
        const neighbors = cell.getNeighbors()
        neighbors.forEach(function (ncell, index) {
            if (processedCells[ncell.toString()] !== true) {
                const cornerLatLngs = ncell.getCornerLatLngs()
                for (let i = 0; i < 4; i++) {
                    const item = cornerLatLngs[i]
                    if (item.lat >= swLat && item.lng >= swLng &&
                            item.lat <= neLat && item.lng <= neLng) {
                        processedCells[ncell.toString()] = true
                        stack.push(ncell)
                        addPoly(ncell)
                        break
                    }
                }
            }
        })
    }
}
function buildScanPolygons() {
    if (!Store.get(['showScanPolygon'])) {
        return false
    }

    $.getJSON(geoJSONfile, function (data) {
        var geoPolys = L.geoJson(data, {
            onEachFeature: function (features, featureLayer) {
                featureLayer.setStyle({color: features.properties.stroke, fillColor: features.properties.fill})
            }
        })
        scanAreaGroup.addLayer(geoPolys)
    })
}

function buildNestPolygons() {
    if (!Store.get(['showNests'])) {
        return false
    }

    $.getJSON(nestJSONfile, function (data) {
        var nestPolys = L.geoJson(data, {
            onEachFeature: function (features, featureLayer) {
                featureLayer.setStyle({color: features.properties.stroke, fillColor: features.properties.fill})
            }
        })
        nestPolygonGroup.addLayer(nestPolys)
    })
}
function buildScanPolygonQuest() {
    if (!Store.get(['showScanPolygonQuest'])) {
        return false
    }
    $.getJSON(geoJSONfileQuest, function (data) {
        var geoPolyQuest = L.geoJson(data, {
            onEachFeature: function (features, featureLayer) {
                featureLayer.setStyle({color: features.properties.stroke, fillColor: features.properties.fill})
            }
        })
        scanAreaGroupQuest.addLayer(geoPolyQuest)
    })
}
function buildScanPolygonPvp() {
    if (!Store.get(['showScanPolygonPvp'])) {
        return false
    }
    $.getJSON(geoJSONfilePvp, function (data) {
        var geoPolyPvp = L.geoJson(data, {
            onEachFeature: function (features, featureLayer) {
                if (features.properties.name === 1) {
                    if (pvptext1 !== null && pvptext1 !== '') {
                        featureLayer.bindPopup(pvptext1, {autoPan: false, closeOnClick: true})
                    } else {
                        featureLayer.bindPopup('no additional information found.', {autoPan: false, closeOnClick: true})
                    }
                } else if (features.properties.name === 2) {
                    if (pvptext2 !== null && pvptext2 !== '') {
                        featureLayer.bindPopup(pvptext2, {autoPan: false, closeOnClick: true})
                    } else {
                        featureLayer.bindPopup('no additional information found.', {autoPan: false, closeOnClick: true})
                    }
                } else if (features.properties.name === 3) {
                    if (pvptext3 !== null && pvptext3 !== '') {
                        featureLayer.bindPopup(pvptext3, {autoPan: false, closeOnClick: true})
                    } else {
                        featureLayer.bindPopup('no additional information found.', {autoPan: false, closeOnClick: true})
                    }
                } else if (features.properties.name === 4) {
                    if (pvptext4 !== null && pvptext4 !== '') {
                        featureLayer.bindPopup(pvptext4, {autoPan: false, closeOnClick: true})
                    } else {
                        featureLayer.bindPopup('no additional information found.', {autoPan: false, closeOnClick: true})
                    }
                }
            }
        })
        scanAreaGroupPvp.addLayer(geoPolyPvp)
    })
}

function createHearts() {
    if (!valentine) {
        return false
    }
    var d = new Date()
    if (d.getMonth() === 1 && d.getDate() === 14) {
        const valentines = '<canvas id="valentine-canvas"></canvas>'
        $('#map').append(valentines)
        var hearts = {
            heartHeight: 25,
            heartWidth: 25,
            hearts: [],
            heartImage: 'static/images/misc/heart-0.png',
            heartImageAlt: 'static/images/misc/heart-1.png',
            maxHearts: 50,
            minScale: 0.4,
            draw: function () {
                this.setCanvasSize()
                this.ctx.clearRect(0, 0, this.w, this.h)
                for (var i = 0; i < this.hearts.length; i++) {
                    var heart = this.hearts[i]
                    heart.image = new Image()
                    heart.image.style.height = heart.height
                    if (i % 2 === 1) {
                        heart.image.src = this.heartImageAlt
                    } else {
                        heart.image.src = this.heartImage
                    }
                    this.ctx.globalAlpha = heart.opacity
                    this.ctx.drawImage(heart.image, heart.x, heart.y, heart.width, heart.height)
                }
                this.move()
            },
            move: function () {
                for (var b = 0; b < this.hearts.length; b++) {
                    var heart = this.hearts[b]
                    heart.y += heart.ys
                    if (heart.y > this.h) {
                        heart.x = Math.random() * this.w
                        heart.y = -1 * this.heartHeight
                    }
                }
            },
            setCanvasSize: function () {
                this.canvas.width = window.innerWidth
                this.canvas.height = window.innerHeight
                this.w = this.canvas.width
                this.h = this.canvas.height
            },
            initialize: function () {
                this.canvas = $('#valentine-canvas')[0]
                if (!this.canvas.getContext) {
                    return
                }
                this.setCanvasSize()
                this.ctx = this.canvas.getContext('2d')
                for (var a = 0; a < this.maxHearts; a++) {
                    var scale = (Math.random() * (1 - this.minScale)) + this.minScale
                    this.hearts.push({
                        x: Math.random() * this.w,
                        y: Math.random() * this.h,
                        ys: Math.random() + 1,
                        height: scale * this.heartHeight,
                        width: scale * this.heartWidth,
                        opacity: scale
                    })
                }
                setInterval($.proxy(this.draw, this), 30)
            }
        }
        hearts.initialize()
    }
}

function initSidebar() {
    $('#gyms-switch').prop('checked', Store.get('showGyms'))
    $('#nests-switch').prop('checked', Store.get('showNests'))
    $('#communities-switch').prop('checked', Store.get('showCommunities'))
    $('#portals-switch').prop('checked', Store.get('showPortals'))
    $('#poi-switch').prop('checked', Store.get('showPoi'))
    $('#s2-switch').prop('checked', Store.get('showCells'))
    $('#s2-switch-wrapper').toggle(Store.get('showCells'))
    $('#s2-level13-switch').prop('checked', Store.get('showExCells'))
    $('#s2-level14-switch').prop('checked', Store.get('showGymCells'))
    $('#s2-level17-switch').prop('checked', Store.get('showStopCells'))
    $('#fill-busy-pokestop-cell-wrapper').toggle(Store.get('showStopCells'))
    $('#fill-busy-pokestop-cell-switch').prop('checked', Store.get('showCoveredPokestopCells'))
    $('#fill-busy-gym-cell-wrapper').toggle(Store.get('showGymCells'))
    $('#fill-busy-gym-cell-switch').prop('checked', Store.get('showGymCellCalculations'))
    $('#new-portals-only-switch').val(Store.get('showNewPortalsOnly'))
    $('#new-portals-only-wrapper').toggle(Store.get('showPortals'))
    $('#gym-sidebar-switch').prop('checked', Store.get('useGymSidebar'))
    $('#ex-eligible-switch').prop('checked', Store.get('exEligible'))
    $('#battle-status-switch').prop('checked', Store.get('battleStatus'))
    $('#badge-mode-switch').prop('checked', Store.get('badgeMode'))
    $('#badge-mode-wrapper').toggle(Store.get('showGyms'))
    $('#weather-icon-switch').prop('checked', Store.get('showWeatherIcons'))
    $('#iv-icon-switch').prop('checked', Store.get('showIVIcons'))
    $('#gym-sidebar-wrapper').toggle(Store.get('showGyms') || Store.get('showRaids'))
    $('#gyms-filter-wrapper').toggle(Store.get('showGyms'))
    $('#team-gyms-only-switch').val(Store.get('showTeamGymsOnly'))
    $('#open-gyms-only-switch').prop('checked', Store.get('showOpenGymsOnly'))
    $('#raids-switch').prop('checked', Store.get('showRaids'))
    $('#raidboss-filter-switch').prop('checked', Store.get('filterRaidboss'))
    $('#raid-level-filter-switch').prop('checked', Store.get('filterRaidlevel'))
    $('#raid-timer-switch').prop('checked', Store.get('showRaidTimer'))
    $('#raids-filter-wrapper').toggle(Store.get('showRaids'))
    $('#raidboss-filter-wrapper').toggle(Store.get('filterRaidboss'))
    $('#raid-level-filter-wrapper').toggle(Store.get('filterRaidlevel'))
    $('#rocket-wrapper').toggle(Store.get('showInvasions'))
    $('#active-raids-switch').prop('checked', Store.get('activeRaids'))
    $('#min-level-gyms-filter-switch').val(Store.get('minGymLevel'))
    $('#max-level-gyms-filter-switch').val(Store.get('maxGymLevel'))
    $('#min-level-raids-filter-switch').val(Store.get('minRaidLevel'))
    $('#max-level-raids-filter-switch').val(Store.get('maxRaidLevel'))
    $('#last-update-gyms-switch').val(Store.get('showLastUpdatedGymsOnly'))
    $('#new-gyms-switch').val(Store.get('showNewGymsOnly'))
    $('#new-pokestops-switch').val(Store.get('showNewPokestopsOnly'))
    $('#pokemon-switch').prop('checked', Store.get('showPokemon'))
    $('#pokemon-filter-wrapper').toggle(Store.get('showPokemon'))
    $('#big-karp-switch').prop('checked', Store.get('showBigKarp'))
    $('#tiny-rat-switch').prop('checked', Store.get('showTinyRat'))
    $('#pokestops-switch').prop('checked', Store.get('showPokestops'))
    $('#pokestops-filter-wrapper').toggle(Store.get('showPokestops'))
    $('#lures-switch').prop('checked', Store.get('showLures'))
    $('#quests-switch').prop('checked', Store.get('showQuests'))
    $('#invasions-switch').prop('checked', Store.get('showInvasions'))
    $('#invasion-timer-switch').prop('checked', Store.get('showInvasionTimer'))
    $('#quests-amount-icon-switch').prop('checked', Store.get('showItemAmounts'))
    $('#quests-filter-wrapper').toggle(Store.get('showQuests'))
    $('#dustvalue').text(Store.get('showDustAmount'))
    $('#dustrange').val(Store.get('showDustAmount'))
    $('#start-at-user-location-switch').prop('checked', Store.get('startAtUserLocation'))
    $('#start-at-last-location-switch').prop('checked', Store.get('startAtLastLocation'))
    $('#follow-my-location-switch').prop('checked', Store.get('followMyLocation'))
    $('#spawn-area-switch').prop('checked', Store.get('spawnArea'))
    $('#spawn-area-wrapper').toggle(Store.get('followMyLocation'))
    $('#follow-me-map-wrapper').toggle(Store.get('followMyLocation'))
    $('#follow-me-map-switch').prop('checked', Store.get('spawnArea'))
    $('#weather-switch').prop('checked', Store.get('showWeather'))
    $('#spawnpoints-switch').prop('checked', Store.get('showSpawnpoints'))
    $('#direction-provider').val(Store.get('directionProvider'))
    $('#ranges-switch').prop('checked', Store.get('showRanges'))
    $('#scan-area-switch').prop('checked', Store.get('showScanPolygon'))
    $('#scan-area-quest-switch').prop('checked', Store.get('showScanPolygonQuest'))
    $('#scan-area-pvp-switch').prop('checked', Store.get('showScanPolygonPvp'))
    $('#sound-switch').prop('checked', Store.get('playSound'))
    $('#cries-switch').prop('checked', Store.get('playCries'))
    $('#cries-switch-wrapper').toggle(Store.get('playSound'))
    $('#cries-type-filter-wrapper').toggle(Store.get('playCries'))
    $('#bounce-switch').prop('checked', Store.get('remember_bounce_notify'))
    $('#notification-switch').prop('checked', Store.get('remember_notification_notify'))

    if (Store.get('showDustAmount') === 0) {
        $('#dustvalue').text(i8ln('Disabled'))
    }
    if (Store.get('showGyms') === true || Store.get('showRaids') === true) {
        $('#gyms-raid-filter-wrapper').toggle(true)
    }
    if (Store.get('showNests') === true) {
        $('#nests-content-wrapper').toggle(true)
    }
    if (Store.get('showCommunities') === true) {
        $('#community-content-wrapper').toggle(true)
    }
    if (document.getElementById('next-location')) {
        const searchform = document.getElementById('search-places')
        const input = searchform.querySelector('input')
        searchform.addEventListener('input', async (event) => {
            $('#search-places-results li').remove()
            event.preventDefault()
            const results = await searchProvider.search({ query: input.value })
            $.each(results, function (key, val) {
                $('#search-places-results').append('<li class="place-result" data-lat="' + val.y + '" data-lon="' + val.x + '"><span class="place-result" onclick="centerMapOnCoords(event);">' + val.label + '</span></li>')
            })
        })
    }

    $('#pokemon-icon-size').val(Store.get('iconSizeModifier'))
    $('#pokemon-icon-notify-size').val(Store.get('iconNotifySizeModifier'))

    var port = ''
    if (window.location.port.length > 0) {
        port = ':' + window.location.port
    }
    var path = window.location.protocol + '//' + window.location.hostname + port + window.location.pathname
    var r = new RegExp('^(?:[a-z]+:)?//', 'i')
    iconpath = r.test(Store.get('icons')) ? Store.get('icons') : path + Store.get('icons')
}

function getTypeSpan(type) {
    return '<span style="padding: 2px 5px; text-transform: uppercase; color: white; margin-right: 2px; border-radius: 4px; font-size: 0.8em; vertical-align: text-bottom; background-color: ' + type['color'] + ';">' + type['type'] + '</span>'
}

function openMapDirections(lat, lng) { // eslint-disable-line no-unused-vars
    var url = 'https://www.google.com/maps/dir/?api=1&destination=' + lat + ',' + lng
    switch (directionProvider) {
        case 'google_pin':
            url = 'https://maps.google.com/maps?q=' + lat + ',' + lng
            break
        case 'apple':
            url = 'https://maps.apple.com/?daddr=' + lat + ',' + lng
            break
        case 'waze':
            url = 'https://waze.com/ul?ll=' + lat + ',' + lng
            break
        case 'bing':
            url = 'https://www.bing.com/maps/?v=2&where1=' + lat + ',' + lng
            break
    }
    window.open(url, '_blank')
}

// Converts timestamp to readable String
function getDateStr(t) { // eslint-disable-line no-unused-vars
    var dateStr = 'Unknown'
    if (t) {
        dateStr = moment(t).format('L')
    }
    return dateStr
}
// Converts timestamp to readable String (
function getDateStrFull(t) { // eslint-disable-line no-unused-vars
    var dateStr = 'Unknown'
    if (t) {
        dateStr = moment(t).format('LL')
    }
    return dateStr
}

// Converts timestamp to readable String
function getTimeStr(t) {
    var dateStr = 'Unknown'
    if (t) {
        dateStr = moment(t).format('LTS')
    }
    return dateStr
}

function toggleOtherPokemon(pokemonId) { // eslint-disable-line no-unused-vars
    onlyPokemon = onlyPokemon === 0 ? pokemonId : 0
    if (onlyPokemon === 0) {
        // reload all Pokemon
        lastpokemon = false
        updateMap()
    } else {
        // remove other Pokemon
        clearStaleMarkers()
    }
}

function isTemporaryHidden(pokemonId) {
    return onlyPokemon !== 0 && pokemonId !== onlyPokemon
}

function pokemonLabel(item) {
    var name = item['pokemon_name']
    var types = item['pokemon_types']
    var typesDisplay = ''
    var encounterId = item['encounter_id']
    var id = item['pokemon_id']
    var latitude = item['latitude']
    var longitude = item['longitude']
    var disappearTime = item['disappear_time']
    var verifiedDespawn = item['is_verified_despawn']
    var dittoDisguise = item['display_pokemon_name']
    var reportTime = disappearTime - 1800000
    var atk = item['individual_attack']
    var def = item['individual_defense']
    var sta = item['individual_stamina']
    var pMove1 = moves[item['move_1']] !== undefined ? i8ln(moves[item['move_1']]['name']) : 'gen/unknown'
    var pMove2 = moves[item['move_2']] !== undefined ? i8ln(moves[item['move_2']]['name']) : 'gen/unknown'
    var weight = item['weight']
    var height = item['height']
    var gender = item['gender']
    var form = item['form']
    var cp = item['cp']
    var cpMultiplier = item['cp_multiplier']
    var weatherBoostedCondition = item['weather_boosted_condition']
    var level = item['level']
    var formStr = ''
    var labelStyle = Store.get('pokemonLabelStyle')

    if (form === 0 || form === '0' || form == null) {
        formStr = '00'
    } else {
        formStr = form
    }
    var pokeForm = ''
    if (form !== null && form > 0 && item['form_name'] !== 'Normal') {
        pokeForm = ' (' + i8ln(item['form_name']) + ')'
    }
    var pokemonidStr = ''
    if (id <= 9) {
        pokemonidStr = '00' + id
    } else if (id <= 99) {
        pokemonidStr = '0' + id
    } else {
        pokemonidStr = id
    }
    $.each(types, function (index, type) {
        typesDisplay += getTypeSpan(type)
    })
    var details = ''
    var iv
    var contentstring = ''
    if (labelStyle !== 'classic') { // If LabelStyle is anything but classic
        // Start of the label
        if (atk != null && def != null && sta != null) {
            iv = getIv(atk, def, sta)
            details =
                // IV
                '<div style="clear:both;margin-bottom:0px;'
            if (!noIvGlow && iv === 100) {
                details += 'background-color: ' + glowColor + ';border-radius: 6px;box-shadow: 0px 0px 10px 2px ' + glowColor + ';'
            }
            details += '">' +
                '<span style="padding-left: 5px;font-size: 15px;font-weight: bold;">IV</span><img src="static/images/label/' + labelStyle + '/iv.png" style="height:23px;float:left;" />' +
                '<span style="font-size: 11px;border-radius:10px;float:right;padding-top:2px;padding-right:3px;" >(' + atk + '/' + def + '/' + sta + ')</span>' +
                '<span style="margin-right: 3px;font-size: 14px;font-weight: bold;border-radius:10px;float:right;" >' + iv.toFixed(1) + '%</span><br>' +
                '</div>'
            if (cp != null && (cpMultiplier != null || level != null)) {
                details +=
                    // WP + LVL
                    '<div style="clear:both;margin-bottom:10px;">' +
                    '<span style="font-size: 14px;font-weight: bold;border-radius:10px;float:right;" >' + cp + ' ' + i8ln('CP') + '</span>' +
                    '<span style="margin-right: 3px;font-size: 14px;font-weight: bold;border-radius:10px;float:right;" >' + i8ln('Lv') + ' ' + level + ' - </span><br>' +
                    '</div>'
            }
            if (moves[item['move_1']] !== undefined || moves[item['move_2']] !== undefined) {
                details +=
                    // Moveset
                    '<div style="clear:both;">' +
                    '<span style="padding-left: 5px;font-size: 14px;font-weight: bold;">Set</span><img src="static/images/label/' + labelStyle + '/swords.png" style="height:23px;float:left;" />' +
                    '<span style="font-size: 12px;font-weight: bold;border-radius:10px;float:right;padding: 1px 6px 1px 6px;" >' + pMove1 + ' / ' + pMove2 + '</span>' +
                    '</div>'
            }
        }
        if (weatherBoostedCondition !== 0) {
            details +=
                // Weather
                '<div style="clear:both;margin-top:">' +
                '<b>' + i8ln('Weather') + ':</b> ' + i8ln(weather[weatherBoostedCondition]) +
                '</div>'
        }
        if (gender != null) {
            details +=
                '<div style="clear:both;margin-top:">'
            if (weight != null && height != null && id !== 132) {
                details +=
                    // Details
                    '<b>' + i8ln('Details') + ':</b> ' + height.toFixed(2) + 'm - ' + weight.toFixed(2) + 'kg</span>'
            }
            details +=
                '</div>'
        }
        var costumeString = ''
        if (item['costume'] > 0 && noCostumeIcons === false) {
            costumeString = '_' + item['costume']
        }
        contentstring =
            '<center><div style="background-color:rgba(0,0,0,0.4);margin: 0px -10px -5px -10px;border-radius:6px;box-shadow: inset 0 0 2px #fff;">' +
            '<b><font size="3" color="white">' + name + pokeForm
            // If its a Ditto, show the real Pokemons name too.
        if (id === 132) {
            contentstring += ' (' + dittoDisguise + ')'
        }

        contentstring += '</font></b>'
        contentstring += '<span style="color:white;"> - </span>' +
            '<small>' +
            '<a href="https://pokemon.gameinfo.io/' + languageSite + '/pokemon/' + id + '" target="_blank" title="' + i8ln('View in Pokedex') + ' " style="font-size:15px;color:white;"><i class="fa fa-slack" aria-hidden="true"></i>' + id + '</a>' +
            '</small>' +
            '<span><font style="color:white;font-weight:bold"> '
        if (genderType[gender - 1] === '♂') {
            contentstring += '<i class="fa fa-mars fa-fw">'
        } else if (genderType[gender - 1] === '♀') {
            contentstring += '<i class="fa fa-venus fa-fw">'
        } else {
            contentstring += '<i class="fa fa-genderless fa-fw">'
        }
        contentstring += '</i></font></span>' +
            '<span> - </span>' +
            '</div></center>'
        // handle the icon, add weather icon if enabled
        if (Store.get('showWeatherIcons') && weatherBoostedCondition !== 0 && !noWeatherIcons) { // show weather icon if enabled
            contentstring +=
                '<center><img style="width: 80px;filter: drop-shadow(5px 5px 5px #222);margin:10px;" src="' + iconpath + 'pokemon_icon_' + pokemonidStr + '_' + formStr + costumeString + '.png"/> ' +
                '<img src="static/weather/i-' + weatherBoostedCondition + '.png" style="width:45px;height:auto;position:absolute;top:38px;left:140px;"/>' +
                '</center>'
        } else {
            contentstring +=
                '<center><img style="width: 80px;filter: drop-shadow(5px 5px 5px #222);margin:10px;" src="' + iconpath + 'pokemon_icon_' + pokemonidStr + '_' + formStr + costumeString + '.png"/></center>'
        }
        if (pokemonReportTime === true) {
            contentstring += '<div style="background:rgba(255,255,255,0.8);border-radius:12px;box-shadow: inset 0 0 4px #000;padding: 5px;margin: 0px -10px -5px -10px;">'
            contentstring += '<div><center><b>' +
            i8ln('Reported at') + ' ' + getTimeStr(reportTime) +
            '</b></center></div>'
        } else {
            // Type
            contentstring += '<div style="background:rgba(255,255,255,0.8);border-radius:12px;box-shadow: inset 0 0 4px #000;padding: 5px;margin: 0px -10px -5px -10px;">' +
                '<center><small>' + typesDisplay + '</small></center>' +
                '<div style="padding-top:5px;padding-bottom: 7px;">' +
                '<span style="padding-left: 5px;font-size: 14px;font-weight: bold;">' + i8ln('Despawn') + '</span><img src="static/images/label/' + labelStyle + '/clock.png" style="height:23px;float:left;" />'
            if (verifiedDespawn === 1) {
                // Verified Timer
                contentstring +=
                    '<span class="label-countdown" style="background-color: #fffaaa;font-size: 14px;font-weight: bold;border-radius:10px;float:right" disappears-at="' + disappearTime + '">(00m00s)</span><br>' +
                    '<div style="clear:both;"><font size="1" style="font-weight: normal;">(' + i8ln('Despawn at') + ' ' + getTimeStr(disappearTime) + ')' + '</font>' +
                    '<span style="float:right"><span style="padding-bottom: 8px;">' + i8ln('Verified') + '</span><img src="static/images/label/' + labelStyle + '/check.png" style="height:16px;vertical-align:middle;margin-bottom: 3px;padding-left: 3px;" /></span></div>'
            } else {
                // Unverified Timer
                contentstring +=
                    '<span class="label-countdown" style="background-color: #fffaaa;font-size: 14px;font-weight: bold;border-radius:10px;float:right" disappears-at="' + disappearTime + '">(00m00s)</span><br>' +
                    '<div style="clear:both;"><font size="1" style="font-weight: normal;">(' + i8ln('Until Approx.') + ' ' + getTimeStr(disappearTime) + ')' + '</font>' +
                    '<span style="float:right"><span style="padding-bottom: 8px;">' + i8ln('Not Verified') + '</span><img src="static/images/label/' + labelStyle + '/cross.png" style="height:16px;vertical-align:middle;margin-bottom: 3px;padding-left: 3px;" /></span></div>'
            }
            contentstring += '</div>'
        }
        contentstring +=
            details +
            '<div style="margin-top:10px;">' +
            '<a href="javascript:excludePokemon(' + id + ')" title="' + i8ln('Exclude this species') + '"><img src="static/images/label/' + labelStyle + '/exclude.png" height="32" width="auto" /></a>&nbsp' +
            '<a href="javascript:notifyAboutPokemon(' + id + ')" title="' + i8ln('Favorize') + '"><img src="static/images/label/' + labelStyle + '/fav.png" height="32" width="auto" /></a>&nbsp' +
            '<a href="javascript:removeNotifyAboutPokemon(' + id + ')" title="' + i8ln('Delete Favorite') + '"><img src="static/images/label/' + labelStyle + '/removefav.png" height="32" width="auto" /></a>&nbsp' +
            '<a href="javascript:removePokemonMarker(\'' + encounterId + '\')" title="' + i8ln('Delete only this') + '"><img src="static/images/label/' + labelStyle + '/trash.png" height="32" width="auto" /></a>&nbsp' +
            '<a href="javascript:void(0);" onclick="javascript:toggleOtherPokemon(' + id + ');" title="' + i8ln('Toggle Species Only (temp)') + '"><img src="static/images/label/' + labelStyle + '/flip.png" height="32" width="auto" /></a>&nbsp' +
            '<a href="javascript:void(0)" onclick="javascript:openMapDirections(' + latitude + ', ' + longitude + ')" title="' + i8ln('Route') + '"><img src="static/images/label/' + labelStyle + '/map.png" height="32" width="auto" /></a>' +
            '</div>' +
            '</div>'
    } else { // Classic labelStyle
        var pMoveType1 = ''
        var pMoveType2 = ''
        if (atk != null && def != null && sta != null) {
            iv = getIv(atk, def, sta)
            var pokemonLevel
            if (level != null) {
                pokemonLevel = level
            } else {
                pokemonLevel = getPokemonLevel(cpMultiplier)
            }
            if (pMove1 !== 'unknown') {
                pMoveType1 = '<img style="position:relative;top:3px;left:2px;height:15px;" src="static/images/label/types/' + moves[item['move_1']]['type'] + '.png">'
            }
            if (pMove2 !== 'unknown') {
                pMoveType2 = '<img style="position:relative;top:3px;left:2px;height:15px;" src="static/images/label/types/' + moves[item['move_2']]['type'] + '.png">'
            }
            // IV, CP, Moves & Details
            details +=
                '<div style="position:absolute;top:90px;left:100px;">' +
                '<div style="font-size:14px;">' + i8ln('IV') + ': <b>' + iv.toFixed(1) + '%</b> (<b>' + atk + '</b>/<b>' + def + '</b>/<b>' + sta + '</b>)' +
                '</div>' +
                '<div style="font-size:14px;">' + i8ln('CP') + ': <b>' + cp + '</b> | ' + i8ln('Level') + ': <b>' + pokemonLevel + '</b></div>' +
                '</div><br>' +
                '<div style="position:absolute;top:135px;font-size:14px;">' +
                '<div>' + i8ln('Quick') + ': <b>' + pMove1 + '</b>' + pMoveType1 + '</div>' +
                '<div>' + i8ln('Charge') + ': <b>' + pMove2 + '</b>' + pMoveType2 + '</div>' +
                '<div>' + i8ln('Weight') + ': <b>' + weight.toFixed(3) + '</b>' + ' | ' + i8ln('Height') + ': <b>' + height.toFixed(3) + '</b></div>' +
                '</div>'
        }

        // Weather
        if (weatherBoostedCondition !== 0) {
            details +=
                '<img style="height:30px;position:absolute;top:20px;left:10px;" src="static/weather/i-' + weatherBoostedCondition + '.png"></div>'
        }

        // Name
        contentstring =
            '<div style="font-size:15px;"><center>' +
            '<b>' + name + '</b>'
        if (form !== null && form > 0 && item['form_name'] !== 'Normal') {
            contentstring += ' (' + i8ln(item['form_name']) + ')'
        }

        // Gender
        if (gender != null) {
            contentstring += ' ' + genderType[gender - 1]
        }

        // Coords
        var coordText = latitude.toFixed(6) + ', ' + longitude.toFixed(7)
        if (hidePokemonCoords === true) {
            coordText = i8ln('Route')
        }

        // Header Formatting
        contentstring += '<span> - </span>' +
            '<small>' +
            '<a href="https://pokemon.gameinfo.io/' + languageSite + '/pokemon/' + id + '" target="_blank" title="' + i8ln('View in Pokedex') + '">#' + id + '</a>' +
            '</small>'
        // Types & Pokemon Image
        contentstring +=
            '</center></div>' +
            '<div><center><small>' + typesDisplay + '</small></center></div>' +
            '<div><img src="' + iconpath + 'pokemon_icon_' + pokemonidStr + '_' + formStr
        // Costume
        if (item['costume'] > 0 && noCostumeIcons === false) {
            contentstring += '_' + item['costume']
        }
        contentstring += '.png" style="width:70px;margin-top:5px;"/>'

        // Despawn timer
        if (verifiedDespawn === 1) {
            contentstring += '<span style="top:63px;left:95px;position:absolute;font-size:13px;">' +
                ' <img src="static/images/label/v2/clock.png" height="16" width="auto" style="vertical-align:middle;" />' + ' ' + getTimeStr(disappearTime) +
                ' <b><span class="label-countdown" disappears-at="' + disappearTime + '">(00m00s)</span>' +
                ' <img src="static/images/label/v2/check.png" height="12" width="auto" title="' + i8ln('Despawntime verified') + '" style="vertical-align:middle;" />' +
                '</b></span></div>'
        } else if (pokemonReportTime === true) {
            contentstring += '<b style="top:-20px;position:relative;font-size:13px;">' +
                ' <img src="static/images/label/v2/clock.png" height="16" width="auto" style="vertical-align:middle;" />' + ' ' + getTimeStr(reportTime) +
                '</b></div>'
        } else {
            contentstring += '<span style="top:63px;left:95px;position:absolute;font-size:13px;">' +
                ' <img src="static/images/label/v2/clock.png" height="16" width="auto" style="vertical-align:middle;" />' + ' ' + getTimeStr(disappearTime) +
                ' <b><span class="label-countdown" disappears-at="' + disappearTime + '">(00m00s)</span>' +
                ' <img src="static/images/label/v2/cross.png" height="12" width="auto" title="' + i8ln('Despawntime not verified') + '" style="vertical-align:middle;" />' +
                '</b></span></div>'
        }

        //
        contentstring += '<br>' + details
        if (atk != null && def != null && sta != null) {
            contentstring += '<div style="position:relative;top:45px;font-size:21px;"><center>'
        } else {
            contentstring += '<div style="font-position:relative;font-size:21px;"><center>'
        }
        contentstring += '<a href="javascript:excludePokemon(' + id + ')"  title="' + i8ln('Exclude this species') + '"><img src="static/images/label/v2/exclude.png" height="24" width="auto" style="vertical-align:middle;" /></a>' +
        ' | <a href="javascript:notifyAboutPokemon(' + id + ')" title="' + i8ln('Favorize') + '"><img src="static/images/label/v2/fav.png" height="24" width="auto" style="vertical-align:middle;" /></a>' +
        ' | <a href="javascript:removeNotifyAboutPokemon(' + id + ')" title="' + i8ln('Delete Favorite') + '"><img src="static/images/label/v2/removefav.png" height="24" width="auto" style="vertical-align:middle;" /></a>' +
        ' | <a href="javascript:removePokemonMarker(\'' + encounterId + '\')" title="' + i8ln('Delete only this') + '"><img src="static/images/label/v2/trash.png" height="24" width="auto" style="vertical-align:middle;" /></a>' +
        ' | <a href="javascript:void(0);" onclick="javascript:toggleOtherPokemon(' + id + ');" title="' + i8ln('Toggle Species Only (temp)') + '"><img src="static/images/label/v2/flip.png" height="24" width="auto" style="vertical-align:middle;" /></a>' +
        '</center></div>'
        if (atk != null && def != null && sta != null) {
            contentstring += '<div style="position:relative;top:55px;font-size:15px;"><center>'
        } else {
            contentstring += '<div style="position:relative;font-size:15px;margin-top:5px;"><center>'
        }
        contentstring +=
        '<a href="javascript:void(0)" onclick="javascript:openMapDirections(' + latitude + ', ' + longitude + ')" title="' + i8ln('View in Maps') + '">' +
        '<i class="fa fa-road"></i> ' + coordText + '</a>' +
        '</a></center></div>'
        if (atk != null && def != null && sta != null) {
            contentstring += '<br><br><br>'
        }
    }
    return contentstring
}

function gymLabel(item) {
    var teamName = gymTypes[item['team_id']]
    var teamId = item['team_id']
    var latitude = item['latitude']
    var longitude = item['longitude']
    var lastScanned = item['last_scanned']
    var lastModified = item['last_modified']
    var name = item['name']
    /* var url = item['url'] */
    var form = item['form']
    var isInBattle = item['battle_status']
    var gymColor = ['0, 0, 0, .4', '74, 138, 202, .6', '240, 68, 58, .6', '254, 217, 40, .6']
    var gymColorBadge = ['0, 0, 0, .5', '74, 138, 202, .7', '255, 14, 0, .7', '202, 167, 1, 1']
    var badgeClasses = ['', 'badgeLabelBgMystic', 'badgeLabelBgValor', 'badgeLabelBgInstinct']
    var hr = '<hr style="margin:10px;" />'
    var raidSpawned = item['raid_level'] != null
    var raidStarted = item['raid_pokemon_id'] != null
    var raidStr = ''
    var raidIcon = ''
    var i = 0
    var raidCounterGuideStr = ''

    var outdated = ''
    if (((lastScanned / 1000) < ((Date.now() / 1000) - 14400)) && !noOutdatedGyms) {
        teamName = 'Harmony'
        outdated = '<b>' + i8ln('Last scan older than 4 hours !') + '</b>'
    }

    var teamLabel = ''
    var teamImage = ''
    var freeSlotsText = ''
    if (!noGymTeamInfos && (((lastScanned / 1000) > ((Date.now() / 1000) - 14400)) || noOutdatedGyms)) {
        var freeSlots = item['slots_available']
        teamLabel = '<b style="color:rgba(' + gymColor[teamId] + ')">' + i8ln('Team') + ' ' + i8ln(teamName) + '</b><br>'
        teamImage = '<img width="200px" style="padding: 5px;" src="static/forts/label/' + teamName + '_normal.png">'
        freeSlotsText = '<div><b>' + freeSlots + ' ' + i8ln('Free Slots') + '</b></div>'
    } else {
        teamLabel = i8ln('Gym') + '<br>'
        teamImage = '<img height="70px" style="padding: 5px;" src="static/forts/Harmony_large.png">'
        if (item['raid_level'] < denyRaidLevelsBelow) {
            raidIcon = ''
            raidStr = ''
        }
    }
    if (raidSpawned && item.raid_end > Date.now() && item['raid_level'] >= denyRaidLevelsBelow) {
        if (!noGymTeamInfos) {
            teamImage = '<img width="140px" style="padding: 5px;margin-left:-50px" src="static/forts/label/' + teamName + '_raw.png">'
        } else {
            teamImage = '<img width="140px" style="padding: 5px;margin-left:-50px" src="static/forts/label/Harmony_raw.png">'
        }
        var levelStr = ''
        for (i = 0; i < item['raid_level']; i++) {
            levelStr += '★'
        }
        raidStr = '<h3 style="margin-bottom: 0">' + i8ln('Raid') + ' ' + levelStr
        if (item.is_exclusive !== null && item.is_exclusive === 1) {
            raidStr += '<span style="background-color:gold;border-radius:10px"><br>' + i8ln('Exclusive Raid') + '</span>'
        }
        var pokemonid = item['raid_pokemon_id']

        var pokemonidStr = ''
        if (pokemonid <= 9) {
            pokemonidStr = '00' + pokemonid
        } else if (pokemonid <= 99) {
            pokemonidStr = '0' + pokemonid
        } else {
            pokemonidStr = pokemonid
        }

        var raidForm = item['form']
        var formStr = ''
        if (raidForm <= 10 || raidForm == null || raidForm === '0') {
            formStr = '00'
        } else {
            formStr = raidForm
        }

        if (raidStarted) {
            var cpStr = ''
            if (item.raid_pokemon_cp > 0) {
                cpStr = ' ' + i8ln('CP') + ' ' + item.raid_pokemon_cp
            }
            raidStr += '<br>' + item.raid_pokemon_name
            if (form !== null && form > 0 && forms.length > form) {
                if (item['raid_pokemon_id'] === 132) {
                    raidStr += ' (' + idToPokemon[item['form']].name + ')'
                } else {
                    raidStr += ' (' + forms[item['form']] + ')'
                }
            }
            raidStr += cpStr
            if (!noRaidPokemonCP) {
                var cpMin = getPokemonCP(pokemonid, raidForm, item['raidboss_base_atk'], item['raidboss_base_def'], item['raidboss_base_sta'], 20, 10, 10, 10)
                var cpMax = getPokemonCP(pokemonid, raidForm, item['raidboss_base_atk'], item['raidboss_base_def'], item['raidboss_base_sta'], 20, 15, 15, 15)
                var cpMinBoosted = getPokemonCP(pokemonid, raidForm, item['raidboss_base_atk'], item['raidboss_base_def'], item['raidboss_base_sta'], 25, 10, 10, 10)
                var cpMaxBoosted = getPokemonCP(pokemonid, raidForm, item['raidboss_base_atk'], item['raidboss_base_def'], item['raidboss_base_sta'], 25, 15, 15, 15)
                raidStr += '<h4 style="margin-bottom: 1px;">' + i8ln('Catch CP') + ': ' + cpMin + '-' + cpMax + ' (' + cpMinBoosted + '-' + cpMaxBoosted + ')</h4>'
            }
        }
        raidStr += '</h3>'
        if (raidStarted && item.raid_pokemon_move_1 > 0 && item.raid_pokemon_move_1 !== '133' && item.raid_pokemon_move_2 > 0 && item.raid_pokemon_move_2 !== '133' && !noRaidMoves) {
            var pMove1 = (moves[item['raid_pokemon_move_1']] !== undefined) ? i8ln(moves[item['raid_pokemon_move_1']]['name']) : 'gen/unknown'
            var pMove2 = (moves[item['raid_pokemon_move_2']] !== undefined) ? i8ln(moves[item['raid_pokemon_move_2']]['name']) : 'gen/unknown'
            raidStr += '<div><b>' + pMove1 + ' / ' + pMove2 + '</b></div>'
        }
        var raidStartStr = getTimeStr(item['raid_start'])
        var raidEndStr = getTimeStr(item['raid_end'])
        raidStr += '<div>' + i8ln('Start') + ': <b>' + raidStartStr + '</b> <span class="label-countdown" disappears-at="' + item['raid_start'] + '" start>(00m00s)</span></div>'
        raidStr += '<div>' + i8ln('End') + ': <b>' + raidEndStr + '</b> <span class="label-countdown" disappears-at="' + item['raid_end'] + '" end>(00m00s)</span></div>'

        if (raidStarted) {
            raidIcon = '<img style="width: 68px;margin-left:-105px;margin-bottom: 50px; --webkit-filter: drop-shadow(5px 5px 5px #222); filter: drop-shadow(5px 5px 5px #222);" src="' + iconpath + 'pokemon_icon_' + pokemonidStr + '_' + formStr + '.png"/>'
            if (form !== null && form > 0 && forms.length > form && formsEn[item['form']] != '') {
                raidCounterGuideStr = '<a href="https://www.pokebattler.com/raids/defenders/' + item['raid_pokemon_name_en'].toUpperCase() + '_' + (formsEn[item['form']]).toUpperCase() + '_FORM/levels/RAID_LEVEL_' + item['raid_level'] + '/attackers/levels/30/strategies/CINEMATIC_ATTACK_WHEN_POSSIBLE/DEFENSE_RANDOM_MC?sort=ESTIMATOR&weatherCondition=NO_WEATHER&dodgeStrategy=DODGE_REACTION_TIME&aggregation=AVERAGE&randomAssistants=-1" target="_blank" >' + i8ln('Raid Counter Guide') + '</a>'
            } else {
                raidCounterGuideStr = '<a href="https://www.pokebattler.com/raids/defenders/' + item['raid_pokemon_name_en'].toUpperCase() + '/levels/RAID_LEVEL_' + item['raid_level'] + '/attackers/levels/30/strategies/CINEMATIC_ATTACK_WHEN_POSSIBLE/DEFENSE_RANDOM_MC?sort=ESTIMATOR&weatherCondition=NO_WEATHER&dodgeStrategy=DODGE_REACTION_TIME&aggregation=AVERAGE&randomAssistants=-1" target="_blank" >' + i8ln('Raid Counter Guide') + '</a>'
            }
        } else if (item.raid_start <= Date.now()) {
            var hatchedEgg = ''
            if (item['raid_level'] <= 2) {
                hatchedEgg = 'hatched_normal'
            } else if (item['raid_level'] <= 4) {
                hatchedEgg = 'hatched_rare'
            } else {
                hatchedEgg = 'hatched_legendary'
            }
            raidIcon = '<img src="static/raids/egg_' + hatchedEgg + '.png" style="width:60px;margin-left:-100px;margin-bottom: 50px;">'
        } else {
            var raidEgg = ''
            if (item['raid_level'] <= 2) {
                raidEgg = 'normal'
            } else if (item['raid_level'] <= 4) {
                raidEgg = 'rare'
            } else {
                raidEgg = 'legendary'
            }
            raidIcon = '<img src="static/raids/egg_' + raidEgg + '.png" style="margin-left:-102px;margin-bottom: 35px;width:60px;">'
        }
    }
    if (manualRaids && item['scanArea'] === false) {
        raidStr += '<div class="raid-container">' + i8ln('Add raid ') + '<i class="fa fa-binoculars submit-raid" onclick="openRaidModal(event);" data-id="' + item['gym_id'] + '"></i>' +
            '</div>'
    }
    if (!noDeleteGyms) {
        raidStr += '<i class="fa fa-trash-o delete-gym" onclick="deleteGym(event);" data-id="' + item['gym_id'] + '"></i>'
    }
    if (!noToggleExGyms) {
        raidStr += '<i class="fa fa-trophy toggle-ex-gym" onclick="toggleExGym(event);" data-id="' + item['gym_id'] + '"></i>'
    }
    var park = ''
    if ((item['park'] !== '0' && item['park'] !== 'None' && item['park'] !== undefined && item['park']) && (noParkInfo === false)) {
        if (item['park'] === 1) {
            // RM only stores boolean, so just call it "Park Gym"
            park = '<div>' + i8ln('Park Gym (Ex Eligible)') + '</div>'
        } else {
            park = '<div>' + i8ln('Park') + ': ' + item['park'] + '</div>'
        }
    }
    var lastScannedStr = ''
    if (lastScanned != null && !noGymScannedText) {
        lastScannedStr =
            '<div>' +
            i8ln('Last Scanned') + ' : ' + getDateStr(lastScanned) + ' ' + getTimeStr(lastScanned) +
            '</div>'
    }
    var lastModifiedText = ''
    var lastModifiedStr = ''
    if (!noGymScannedText) {
        lastModifiedStr = getDateStr(lastModified) + ' ' + getTimeStr(lastModified)
        lastModifiedText = i8ln('Last Modified') + ' : ' + lastModifiedStr
    }
    var maplinkText = ''
    if (!noMaplink) {
        maplinkText = '- <a href="./?lat=' + latitude + '&lon=' + longitude + '&zoom=16">' + i8ln('Maplink') + '</a>'
    }
    var battleStr = ''
    if (!noBattleStatus && isInBattle === 1 && ((lastScanned / 1000) > ((Date.now() / 1000) - 900))) {
        battleStr = '<div>' + i8ln('Gym currently under attack!') + '</div>'
    }
    var gymCp = ''
    if (item['total_cp'] != null && !noGymTeamInfos) {
        gymCp = '<div>' + i8ln('Total Gym CP') + ' : <b>' + item['total_cp'] + '</b></div>'
    }
    var nameStr = (name ? '<div><b>' + name + '</b></div>' : '')
    var str
    var firstSeen = ''
    if (!noGymFirstseen && item['first_seen'] !== null && item['first_seen'] !== 0) {
        firstSeen = '<div><center>' +
            i8ln('Gym First Seen') + ': ' + getDateStrFull(item['first_seen']) +
            '</center></div>'
    }

    if (Store.get('badgeMode')) {
        var gymName = name !== null ? name : i8ln('Unknown Gymname')
        if (gymName.length > 20) {
            gymName = gymName.substring(0, 20) + '..'
        }
        var freeSlotsBadge = ''
        var nameBadge = ''
        var backgroundClass = ''
        if (!noGymTeamInfos && (((lastScanned / 1000) > ((Date.now() / 1000) - 14400)) || noOutdatedGyms)) {
            freeSlotsBadge = '<div><span class="badgeText"><span class="badgeTextBold">' + i8ln('Spots') + ':</span> ' + freeSlots + '</span></div>'
            nameBadge = '<div class="badgeTextName" style="color:rgba(' + gymColorBadge[teamId] + ')">' + gymName + '</div>'
            backgroundClass = badgeClasses[teamId]
        } else {
            nameBadge = '<div class="badgeTextName" style="color:rgba(22, 145, 73, 0.6)">' + gymName + '</div>'
            backgroundClass = 'badgeLabelBgHarmony'
        }

        var badgeStatus = 'none'
        var badgeText = '<div><span class="badgeText"><span class="badgeTextBold">' + i8ln('Rank') + ':</span> ' + i8ln('none_badge') + '</span></div>'
        if (personalBadges['gold'] !== null && personalBadges['gold'].includes(item['gym_id'])) {
            badgeStatus = 'gold'
            badgeText = '<div><span class="badgeText"><span class="badgeTextBold">' + i8ln('Rank') + ': <span style="color: #d5b24b">' + i8ln(badgeStatus[0].toUpperCase() + badgeStatus.slice(1)) + '</span></span></div>'
        } else if (personalBadges['silver'] !== null && personalBadges['silver'].includes(item['gym_id'])) {
            badgeStatus = 'silver'
            badgeText = '<div><span class="badgeText"><span class="badgeTextBold">' + i8ln('Rank') + ': <span style="color: #97999c">' + i8ln(badgeStatus[0].toUpperCase() + badgeStatus.slice(1)) + '</span></span></div>'
        } else if (personalBadges['bronze'] !== null && personalBadges['bronze'].includes(item['gym_id'])) {
            badgeStatus = 'bronze'
            badgeText = '<div><span class="badgeText"><span class="badgeTextBold">' + i8ln('Rank') + ': <span style="color: #937153">' + i8ln(badgeStatus[0].toUpperCase() + badgeStatus.slice(1)) + '</span></span></div>'
        }

        if ((item['park'] !== '0' && item['park'] !== 'None' && item['park'] !== undefined && item['park']) && (noParkInfo === false)) {
            if (item['park'] === 1) {
                park = '<div class="badgeText badgeTextBold" style="color: purple;">' + i8ln('Ex-Raid Eligible') + '</div>'
            }
        }

        var gymImage = '<img class="gym-round-img" src="' + item['url'] + '">'
        var badgeImg = '<img style="position:relative;" width="100px" src="static/forts/badges/' + badgeStatus + '_badge_empty.png">'
        var badgeRoute = '<a href="javascript:void(0);" onclick="javascript:openMapDirections(' + latitude + ',' + longitude + ');" title="' + i8ln('View in Maps') + '"><img src="static/forts/badges/routes.png" style="margin-right:25px;" width="36" height="auto" /></a>'
        var buttonEdit = '<a onclick="openChangeGymBadgeModal(event);"><img data-id="' + item['gym_id'] + '" src="static/forts/badges/edit.png" width="36" height="auto" /></a>'
        if (!noMaplink) {
            maplinkText = '<a href="./?lat=' + latitude + '&lon=' + longitude + '&zoom=16"><img src="static/forts/badges/maplink.png" style="margin-right:25px;" width="36" height="auto" /></a>'
        }
        str =
            '<div class="' + backgroundClass + '"><center>' +
            nameBadge +
            gymImage +
            badgeImg +
            badgeText +
            freeSlotsBadge +
            park +
            '<div style="margin-top: 10px;">' +
            badgeRoute +
            maplinkText +
            buttonEdit +
            '</div>' +
            '</center></div>'
    } else if (teamId === 0 || (((lastScanned / 1000) > ((Date.now() / 1000) - 14400)) || noOutdatedGyms)) {
        str =
            '<div class="gym-label">' +
            '<center>' +
            nameStr +
            '<div>' +
            teamLabel +
            teamImage +
            raidIcon +
            '</div>' + raidStr +
            gymCp +
            park +
            battleStr +
            hr +
            '<div>' +
            i8ln('Location') + ': <a href="javascript:void(0);" onclick="javascript:openMapDirections(' + latitude + ',' + longitude + ');" title="' + i8ln('View in Maps') + '">' + i8ln('Route') + '</a>' + maplinkText +
            '</div>' +
            '<div>' + lastModifiedText + '</div>' +
            '<div>' + lastScannedStr + '</div>' +
            firstSeen +
            '</center>' +
            '</div>'
        if (!noWhatsappLink || !noRaidCounterGuide) {
            var hyphen = ' - '
            if ((raidSpawned && item.raid_end > Date.now()) && (item.raid_pokemon_id > 1 && item.raid_pokemon_id < numberOfPokemon)) {
                str += hr
            }
            str +=
                '<center>' +
                '<div>'
            if ((!noWhatsappLink && (raidSpawned && item.raid_end > Date.now())) && (item.raid_pokemon_id > 1 && item.raid_pokemon_id < numberOfPokemon)) {
                if (!noWhatsappRaidMoves) {
                    str += '<a href="whatsapp://send?text=' + '📌%20%2A' + i8ln('Gym') + ':%2A%20%0A' + encodeURIComponent(item.name) + '%0A%0A⭐%20%2A' + i8ln('Raid') + ':%2A%20%0A' + i8ln('Level') + '%20' + item.raid_level + '%20' + item.raid_pokemon_name + '%0A%0A👊%20%2A' + i8ln('Moveset') + ':%2A%20%0A' + pMove1 + '/' + pMove2 + '%0A%0A🔛%20%2A' + i8ln('Raidtime') + ':%2A%20%0A' + i8ln('Start') + ':%20' + raidStartStr + '%0A' + i8ln('End') + ':%20' + raidEndStr + '%0A%0A🗺%20%2A' + i8ln('Route') + ':%2A%0Ahttps://maps.google.com/?q=' + item.latitude + ',' + item.longitude + '" data-action="share/whatsapp/share">' + i8ln('Whatsapp Link') + '</a>'
                } else {
                    str += '<a href="whatsapp://send?text=' + '📌%20%2A' + i8ln('Gym') + ':%2A%20%0A' + encodeURIComponent(item.name) + '%0A%0A⭐%20%2A' + i8ln('Raid') + ':%2A%20%0A' + i8ln('Level') + '%20' + item.raid_level + '%20' + item.raid_pokemon_name + '%0A%0A🔛%20%2A' + i8ln('Raidtime') + ':%2A%20%0A' + i8ln('Start') + ':%20' + raidStartStr + '%0A' + i8ln('End') + ':%20' + raidEndStr + '%0A%0A🗺%20%2A' + i8ln('Route') + ':%2A%0Ahttps://maps.google.com/?q=' + item.latitude + ',' + item.longitude + '" data-action="share/whatsapp/share">' + i8ln('Whatsapp Link') + '</a>'
                }
            } else if ((!noWhatsappLink) && (raidSpawned && item.raid_end > Date.now())) {
                str += '<a href="whatsapp://send?text=' + '📌%20%2A' + i8ln('Gym') + ':%2A%20%0A' + encodeURIComponent(item.name) + '%0A%0A⭐%20%2A' + i8ln('Raid') + ':%2A%20%0A' + i8ln('Level') + '%20' + item.raid_level + '%20Ei%20🥚%0A%0A🔛%20%2A' + i8ln('Raidtime') + ':%2A%20%0A' + i8ln('Start') + ':%20' + raidStartStr + '%0A' + i8ln('End') + ':%20' + raidEndStr + '%0A%0A🗺%20%2A' + i8ln('Route') + ':%2A%0Ahttps://maps.google.com/?q=' + item.latitude + ',' + item.longitude + '" data-action="share/whatsapp/share">' + i8ln('Whatsapp Link') + '</a>'
            }
            if (!noRaidCounterGuide && ((raidSpawned && item.raid_end > Date.now()) && (item.raid_pokemon_id > 1 && item.raid_pokemon_id < numberOfPokemon))) {
                if (!noWhatsappLink) {
                    str += hyphen
                }
                str += raidCounterGuideStr
            }
            if ((!noWhatsappLink) || (!noRaidCounterGuide && ((raidSpawned && item.raid_end > Date.now()) && (item.raid_pokemon_id > 1 && item.raid_pokemon_id < numberOfPokemon)))) {
                str += hyphen
            }
            str +=
                '<a href="javascript:removeGymMarker(\'' + item['gym_id'] + '\')" title="' + i8ln('Remove Gym (temp.)') + '"><i class="fa fa-check" aria-hidden="true" style="font-size:18px;vertical-align: middle;"></i></a>' +
                '</div>' +
                '</center>'
        }
    } else {
        str =
            '<div class="gym-label">' +
            '<center>' +
            '<div style="padding-bottom: 2px">' +
            nameStr +
            '</div>' +
            '<div>' +
            teamLabel +
            teamImage +
            raidIcon +
            '</div>' +
            raidStr +
            freeSlotsText +
            park +
            '<div>' + outdated + '</div>' +
            hr +
            '<div>' +
            i8ln('Location') + ': <a href="javascript:void(0);" onclick="javascript:openMapDirections(' + latitude + ',' + longitude + ');" title="' + i8ln('View in Maps') + '">Route ansehen</a>' + maplinkText +
            '</div>' +
            '<div>' +
            lastModifiedText +
            '</div>' +
            '<div>' +
            lastScannedStr +
            '</div>' +
            '</center>' +
            firstSeen +
            '</div>'
        if (((!noWhatsappLink) && (raidSpawned && item.raid_end > Date.now())) && (item.raid_pokemon_id > 1 && item.raid_pokemon_id < numberOfPokemon)) {
            str += '<center>' +
                '<div>' +
                '<a href="whatsapp://send?text=' + '%2AArena:%2A%20' + encodeURIComponent(item.name) + '%0A%2ARaid:%2A%20Level%20' + item.raid_level + '%20' + item.raid_pokemon_name + '%0A%2AStart:%2A%20' + raidStartStr + '%0A%2AEnde:%2A%20' + raidEndStr + '%0A%2ANavi:%2A%0Ahttps://maps.google.com/?q=' + item.latitude + ',' + item.longitude + '" data-action="share/whatsapp/share">' + i8ln('Whatsapp Link') + '</a>' +
                '</div>' +
                '</center>'
        } else if ((!noWhatsappLink) && (raidSpawned && item.raid_end > Date.now())) {
            str += '<center>' +
                '<div>' +
                '<a href="whatsapp://send?text=' + '%2AArena:%2A%20' + encodeURIComponent(item.name) + '%0A%2ARaid:%2A%20Level%20' + item.raid_level + '%20Ei%0A%2AStart:%2A%20' + raidStartStr + '%0A%2AEnde:%2A%20' + raidEndStr + '%0A%2ANavi:%2A%0Ahttps://maps.google.com/?q=' + item.latitude + ',' + item.longitude + '" data-action="share/whatsapp/share">' + i8ln('Whatsapp Link') + '</a>' +
                '</div>' +
                '</center>'
        }
    }

    return str
}

function getReward(item) {
    var rewardImage
    var reward = JSON.parse(item['quest_reward_info'])
    var pokemonIdStr = ''
    var formStr = ''
    var shinyStr = ''
    if (item['quest_reward_type'] === 7) {
        if (reward['pokemon_id'] <= 9) {
            pokemonIdStr = '00' + reward['pokemon_id']
        } else if (reward['pokemon_id'] <= 99) {
            pokemonIdStr = '0' + reward['pokemon_id']
        } else {
            pokemonIdStr = reward['pokemon_id']
        }
        if (reward['form_id'] === 0) {
            formStr = '00'
        } else {
            formStr = reward['form_id']
        }
        if (reward['shiny'] === true) {
            shinyStr = '_shiny'
        }
        if (useIconRepoPokeRewards) {
            rewardImage = '<img height="70px" style="padding: 5px;" src="' + iconpath + '/pokemon_icon_' + pokemonIdStr + '_' + formStr + shinyStr + '.png"/>'
        } else {
            rewardImage = '<img height="70px" style="padding: 5px;" src="' + rewardIcons + 'rewards/pokemon/' + pokemonIdStr + '_' + formStr + shinyStr + '.png"/>'
        }
    } else if (item['quest_reward_type'] === 3) {
        rewardImage = '<img height="70px" style="padding: 5px;" src="' + rewardIcons + 'rewards/reward_stardust.png"/>'
    } else if (item['quest_reward_type'] === 2) {
        rewardImage = '<img height="70px" style="padding: 5px;" src="' + rewardIcons + 'rewards/reward_' + reward['item_id'] + '_1.png"/>'
    }
    return rewardImage
}

function getRawReward(item) {
    var str = ''
    var questinfo // eslint-disable-line no-unused-vars
    var rewardinfo
    var reward
    var questAmount

    var questType = JSON.parse(item['quest_reward_type'])
    if (questType === 1) { // XP Reward
        questAmount = JSON.parse(item['quest_reward_amount'])
        str = questAmount + 'XP'
    }
    if (questType === 2) { // Item Reward
        reward = JSON.parse(item['quest_rewards'])
        rewardinfo = reward[0]['info']
        questinfo = JSON.parse(item['quest_condition_info'])
        questAmount = JSON.parse(item['quest_reward_amount'])
        str = questAmount + 'x ' + i8ln(idToItem[rewardinfo['item_id']].name)
    }
    if (questType === 3) { // Stardust Reward
        questAmount = JSON.parse(item['quest_reward_amount'])
        str = questAmount + ' Sternenstaub'
    }
    if (questType === 4) { // Candy Reward
        questAmount = JSON.parse(item['quest_reward_amount'])
        str = questAmount + ' Sonderbonbons'
    }
    if (questType === 5) { // Avatar Clothing
        str = 'Avatar Kleidung'
    }
    if (questType === 6) { // Quest
        str = 'Quest'
    }
    if (questType === 7) { // Pokemon Reward
        reward = JSON.parse(item['quest_rewards'])
        rewardinfo = reward[0]['info']
        questinfo = JSON.parse(item['quest_condition_info'])
        str = i8ln(idToPokemon[rewardinfo['pokemon_id']].name)
    }
    return str
}

function getRawQuest(item) { // eslint-disable-line no-unused-vars
    var str
    var raidLevel
    if (item['quest_condition_type'] !== null) {
        var questinfo = JSON.parse(item['quest_condition_info'])
        var questStr = i8ln(questtypeList[item['quest_type']])
        str = '' + questStr.replace('{0}', item['quest_target']) + ''

        if (item['quest_condition_type'] === 1) {
            var tstr = ''
            if (questinfo['pokemon_type_ids'].length > 1) {
                $.each(questinfo['pokemon_type_ids'], function (index, typeId) {
                    tstr += pokemonTypes[typeId] + ' '
                })
            } else {
                tstr = pokemonTypes[questinfo['pokemon_type_ids']]
            }
            str = str.replace('pokémon', tstr + ' type(s)')
        } else if (item['quest_condition_type'] === 2) {
            var pstr = ''
            if (questinfo['pokemon_ids'].length > 1) {
                $.each(questinfo['pokemon_ids'], function (index, id) {
                    pstr += idToPokemon[id].name + ' '
                })
            } else {
                pstr = idToPokemon[questinfo['pokemon_ids']].name
            }
            str = str.replace('pokémon', pstr)
        } else if (item['quest_condition_type'] === 3) {
            str = str.replace('pokémon', 'pokémon with weather boost')
        } else if (item['quest_condition_type'] === 6) {
            str = str.replace('Complete', 'Win')
        } else if (item['quest_condition_type'] === 7) {
            raidLevel = Math.min.apply(null, questinfo['raid_levels'])
            if (raidLevel > 1) {
                str = str.replace('raid battle(s)', 'level ' + raidLevel + ' raid or higher')
            }
            if (item['quest_condition_type_1'] === 6) {
                str = str.replace('Complete', 'Win')
            }
        } else if (item['quest_condition_type'] === 8) {
            str = str.replace('throw(s)', i8ln(throwType[questinfo['throw_type_id']] + ' throw(s)'))
            if (item['quest_condition_type_1'] === 15) {
                str = str.replace('throw(s)', 'curve throw(s)')
            }
        } else if (item['quest_condition_type'] === 9) {
            str = str.replace('Complete', 'Win')
        } else if (item['quest_condition_type'] === 10) {
            str = str.replace('Complete', 'Use a super effective charge move in ')
        } else if (item['quest_condition_type'] === 11 && questinfo !== null) {
            str = str.replace('berrie(s)', i8ln(idToItem[questinfo['item_id']].name))
        } else if (item['quest_condition_type'] === 11) {
            str = str.replace('Evolve', 'Use a evolution item to evolve')
        } else if (item['quest_condition_type'] === 14 && typeof questinfo['throw_type_id'] === 'undefined') {
            str = str.replace('throw(s)', 'throw(s) in a row')
            if (item['quest_condition_type_1'] === 15) {
                str = str.replace('throw(s)', 'curve throw(s)')
            }
        } else if (item['quest_condition_type'] === 14) {
            str = str.replace('throw(s)', i8ln(throwType[questinfo['throw_type_id']] + ' throw(s) in a row'))
            if (item['quest_condition_type_1'] === 15) {
                str = str.replace('throw(s)', 'curve throw(s)')
            }
        } else if (item['quest_condition_type'] === 12) {
            str = str.replace('Pokéstops', i8ln('new Pokéstops'))
        } else if (item['quest_condition_type'] !== 0) {
            console.log('Undefined condition type ' + item['quest_condition_type'])
            str += 'Undefined condition'
        }
    } else if (item['quest_type'] !== null) {
        questStr = i8ln(questtypeList[item['quest_type']])
        str += '' + questStr.replace('{0}', item['quest_target']) + ''
    }
    return str
}

function getQuest(item) {
    var str
    var raidLevel
    if (item['quest_condition_type'] !== null) {
        var questinfo = JSON.parse(item['quest_condition_info'])
        var questStr = '' + i8ln(questtypeList[item['quest_type']]) + ''
        str = '<div><center><b><u>' +
        i8ln('Task:') + '</b></u> ' +
        questStr.replace('{0}', item['quest_target']) +
        '</center></div>'
        if (item['quest_condition_type'] === 1) {
            var tstr = ''
            if (questinfo['pokemon_type_ids'].length > 1) {
                $.each(questinfo['pokemon_type_ids'], function (index, typeId) {
                    if (index === (questinfo['pokemon_type_ids'].length - 1)) {
                        tstr += pokemonTypes[typeId]
                    } else {
                        tstr += pokemonTypes[typeId] + '/'
                    }
                })
            } else {
                tstr = pokemonTypes[questinfo['pokemon_type_ids']]
            }
            str = str.replace('{1}', i8ln('{1} with type') + ' ' + tstr)
            str = str.replace('{2}', i8ln('{2} with type') + ' ' + tstr)
        } else if (item['quest_condition_type'] === 2) {
            var pstr = ''
            if (questinfo['pokemon_ids'].length > 1) {
                $.each(questinfo['pokemon_ids'], function (index, id) {
                    if (index === (questinfo['pokemon_ids'].length - 1)) {
                        pstr += idToPokemon[id].name
                    } else {
                        pstr += idToPokemon[id].name + '/'
                    }
                })
            } else {
                pstr = idToPokemon[questinfo['pokemon_ids']].name
            }
            str = str.replace('{1}', pstr)
        } else if (item['quest_condition_type'] === 3) {
            str = str.replace('{1}', i8ln('{1} with weatherboost'))
        } else if (item['quest_condition_type'] === 6) {
            str = str.replace('{3}', i8ln('Win'))
        } else if (item['quest_condition_type'] === 7) {
            raidLevel = Math.min.apply(null, questinfo['raid_levels'])
            if (raidLevel > 1) {
                str = str.replace('{4}', i8ln('Level') + ' ' + raidLevel + ' ' + i8ln('raid or higher'))
            }
            if (item['quest_condition_type_1'] === 6) {
                str = str.replace('{3}', i8ln('Win'))
            }
        } else if (item['quest_condition_type'] === 8) {
            str = str.replace('{5}', i8ln(throwType[questinfo['throw_type_id']]) + ' {5}')
            if (item['quest_condition_type_1'] === 15) {
                str = str.replace('{5}', i8ln('curveball {5}'))
            }
        } else if (item['quest_condition_type'] === 9) {
            str = str.replace('{3}', i8ln('Win'))
        } else if (item['quest_condition_type'] === 10) {
            str = str.replace('{3}', i8ln('Use a very effective charge move in') + ' ')
        } else if (item['quest_condition_type'] === 11 && questinfo !== null) {
            str = str.replace('{6}', i8ln('a ') + idToItem[questinfo['item_id']].name)
        } else if (item['quest_condition_type'] === 11) {
            str = str.replace('Entwickle', 'Nutze ein Entwicklungsitem und entwickle')
        } else if (item['quest_condition_type'] === 14 && typeof questinfo['throw_type_id'] === 'undefined') {
            str = str.replace('{5}', i8ln('{5} in a row'))
            if (item['quest_condition_type_1'] === 15) {
                str = str.replace('{5}', i8ln('curveball {5}'))
            }
        } else if (item['quest_condition_type'] === 14) {
            str = str.replace('{5}', i8ln(throwType[questinfo['throw_type_id']]) + ' ' + i8ln('{5} in a row'))
            if (item['quest_condition_type_1'] === 15) {
                str = str.replace('{5}', i8ln('curveball {5}'))
            }
        } else if (item['quest_condition_type'] === 12) {
            str = str.replace('{8}', i8ln('new {8}'))
        } else if (item['quest_condition_type'] === 22) {
            str = str.replace('{9}', 'NPC-{9}')
        } else if (item['quest_condition_type'] === 23) {
            str = str.replace('{9}', 'PVP-{9}')
        } else if (item['quest_condition_type'] === 27) { // Grunt Specific Characters
            var gstr = ''
            if (questinfo['character_category_ids'].length > 1) {
                if (questinfo['character_category_ids'].length === 3 && (questinfo['character_category_ids'].includes(3) && questinfo['character_category_ids'].includes(4) && questinfo['character_category_ids'].includes(5))) {
                    str = str.replace('{7}', i8ln('Team Leader'))
                } else {
                    $.each(questinfo['character_category_ids'], function (index, charId) {
                        if (index === (questinfo['character_category_ids'].length - 1)) {
                            gstr += gruntCharacterTypes[charId]
                        } else {
                            gstr += gruntCharacterTypes[charId] + '/'
                        }
                    })
                }
                str = str.replace('{7}', i8ln('Members') + ': ' + gstr)
            } else {
                gstr = gruntCharacterTypes[questinfo['character_category_ids']]
                str = str.replace('{7}', i8ln('Member') + ': ' + gstr)
            }
        } else if (item['quest_condition_type'] === 28) { // Snapshot of Buddy
            str = str.replace('{2}', i8ln('{2} of your Buddy'))
        } else if (item['quest_condition_type'] === 19) { // "new friend", but no string because its a default
        } else if (item['quest_condition_type'] === 25) {
            str = str.replace('{1}', i8ln('{1} with') + ' ' + questinfo['distance'].toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + ' ' + i8ln('km Entfernung'))
        } else if (item['quest_condition_type'] !== 0) {
            console.log('Undefined condition type ' + item['quest_condition_type'])
            str += '<div>Undefined condition</div>'
        }

        var rewardinfo
        var reward
        if (item['quest_reward_type'] === 2) {
            reward = JSON.parse(item['quest_rewards'])
            rewardinfo = reward[0]['info']
            str += '<div><center>' +
            '<b><u>' + i8ln('Reward') + ':</u></b> ' + i8ln(idToItem[rewardinfo['item_id']]).name + '<br>' +
            '<b><u>' + i8ln('Amount') + ':</u></b>' + ' ' + item['quest_reward_amount'] +
            '</center></div>'
        }
        if (item['quest_reward_type'] === 3) {
            str += '<div><center>' +
            '<b><u>' + i8ln('Reward') + ': </u></b>' + i8ln('Stardust') + '<br>' +
            '<b><u>' + i8ln('Amount') + ': </u></b>' + ' ' + item['quest_reward_amount'] +
            '</center></div>'
        }
        if (item['quest_reward_type'] === 7) {
            reward = JSON.parse(item['quest_rewards'])
            rewardinfo = reward[0]['info']
            // Min / Max cp Calculations for monster reward
            var pokemonCPStr = ''
            if (!noQuestPokemonCP) {
                var cpMin = getPokemonCP(rewardinfo['pokemon_id'], item['quest_pokemon_form'], item['reward_pokemon_base_atk'], item['reward_pokemon_base_def'], item['reward_pokemon_base_sta'], 15, 10, 10, 10)
                var cpMax = getPokemonCP(rewardinfo['pokemon_id'], item['quest_pokemon_form'], item['reward_pokemon_base_atk'], item['reward_pokemon_base_def'], item['reward_pokemon_base_sta'], 15, 15, 15, 15)
                pokemonCPStr = '<b>' + i8ln('CP') + ': </b>' + cpMin + '-' + cpMax
            }
            str += '<div><center>' +
            '<b><u>' + i8ln('Reward') + ':</u></b> ' + i8ln(idToPokemon[rewardinfo['pokemon_id']]).name + '<br>' +
            pokemonCPStr +
            '</center></div>'
        }

        // Replace the objects with their translated names
        if (str.includes('{1}') || str.includes('{2}') || str.includes('{3}') || str.includes('{4}') || str.includes('{5}') || str.includes('{6}') || str.includes('{7}') || str.includes('{8}') || str.includes('{9}')) {
            str = str.replace('{1}', i8ln('{1}'))
            str = str.replace('{2}', i8ln('{2}'))
            str = str.replace('{3}', i8ln('{3}'))
            str = str.replace('{4}', i8ln('{4}'))
            str = str.replace('{5}', i8ln('{5}'))
            str = str.replace('{6}', i8ln('{6}'))
            str = str.replace('{7}', i8ln('{7}'))
            str = str.replace('{8}', i8ln('{8}'))
            str = str.replace('{9}', i8ln('{9}'))
        }
        // If condition is only 1 item/pokemon/etc
        if (language === 'de') {
            if (item['quest_target'] === 1) { // hardcode singulary in german
                str = str.replace('Würfe', 'Wurf')
                str = str.replace('Raids', 'Raid')
                str = str.replace('Arenenkämpfe', 'Arenenkampf')
                str = str.replace('Eier', 'Ei')
                str = str.replace('Bonbons', 'Bonbon')
                str = str.replace('Pokéstops', 'Pokéstop')
                str = str.replace('Quests', 'Quest')
                str = str.replace('Medaillen', 'Medaille')
                str = str.replace('neue Freunde', 'neuen Freund')
                str = str.replace('gute', 'guten')
                str = str.replace('großartige', 'großartigen')
                str = str.replace('fabelhafte', 'fabelhaften')
                str = str.replace('neue Pokéstops', 'neuen Pokéstop')
                str = str.replace('Schnappschüsse', 'Schnappschuss')
                str = str.replace('Kämpfe', 'Kampf')
                str = str.replace('Herzen', 'Herz')
                // Condition 1: Pokemon,3:Pokemon,11:entwickle Pokemon
                if (str.includes('1 Pokémon') || str.includes('1 Ei') || str.includes('1 Herz') || str.includes('1 Team GO')) {
                    str = str.replace(item['quest_target'], 'ein')
                }
                if (str.includes('1 neuen') || str.includes('1 Arenenkampf') || str.includes('und höher') || str.includes('Wurf') || str.includes('1 Raid') || str.includes('1 Level') || str.includes('Pokéstop') || str.includes('Schnappschuss') || str.includes('Kampf')) {
                    str = str.replace(item['quest_target'], 'einen')
                }
            }
            if (item['quest_condition_type'] === 10) {
                str = str.replace('Arenenkämpfe', 'Arenenkämpfen')
            }
        } else if (language === 'en') { // Hardcode singularity in english
            if (item['quest_target'] === 1) {
                str = str.replace('(s)', '') // If its singulary, then remove the (s)
                str = str.replace(item['quest_target'], 'one')
            } else {
                str = str.replace('(s)', 's') // If its plural, then remove the brackets
                str = str.replace('Berrys', 'Berries')
            }
        }
    } else if (item['quest_type'] !== null) {
        questStr = i8ln(questtypeList[item['quest_type']])
        str += '<div>' +
        i8ln('Task:') + ' ' +
        questStr.replace('{0}', item['quest_target']) +
        '</div>'
        if (str.includes('{1}') || str.includes('{2}') || str.includes('{3}') || str.includes('{4}') || str.includes('{5}') || str.includes('{6}') || str.includes('{7}') || str.includes('{8}') || str.includes('{9}')) {
            str = str.replace('{1}', i8ln('{1}'))
            str = str.replace('{2}', i8ln('{2}'))
            str = str.replace('{3}', i8ln('{3}'))
            str = str.replace('{4}', i8ln('{4}'))
            str = str.replace('{5}', i8ln('{5}'))
            str = str.replace('{6}', i8ln('{6}'))
            str = str.replace('{7}', i8ln('{7}'))
            str = str.replace('{8}', i8ln('{8}'))
            str = str.replace('{9}', i8ln('{9}'))
        }
    }

    return str
}

function pokestopLabel(item) {
    var str
    var pokestopId = item['pokestop_id']
    var lureType = item['lure_id']
    if (item['pokestop_name'] === null) {
        item['pokestop_name'] = 'Pokéstop'
    }
    var invasion = item['invasion']
    var invasionExpire = item['invasion_expiration']
    var hr = '<hr style="margin:10px;" />'
    var encounters = ''
    var gruntReward = ''
    if (item['encounters'] !== null && !noInvasionEncounterData && !noInvasions) {
        //  Encounter data in a spoiler
        encounters += '<input name="button" type="button" onClick="showHideGruntEncounter(0)" value="' + i8ln('Grunt Data') + '" style="font-weight:normal;font-size:9pt;margin-right: 3px;">' +
            '<div class="grunt-encounters-wrapper" id="encounterSpoiler" style="display: none;background-color: #ccc;border-radius: 10px;border: 1px solid black;"><center>' +
            // data for mon#1
            '<div>' + i8ln('Grunt Pokemon') + ' #1:<br>'
        item['encounters']['first'].forEach(function (data) {
            encounters += '<img src="' + iconpath + 'pokemon_icon_' + data + '.png" style="width:38px;height:auto;"/>'
        })
        encounters += '</div>' +
            // data for mon#2
            '<div>' + i8ln('Grunt Pokemon') + ' #2:<br>'
        item['encounters']['second'].forEach(function (data) {
            encounters += '<img src="' + iconpath + 'pokemon_icon_' + data + '.png" style="width:38px;height:auto;"/>'
        })
        encounters += '</div>' +
            // data for mon#3
            '<div>' + i8ln('Grunt Pokemon') + ' #3:<br>'
        item['encounters']['third'].forEach(function (data) {
            encounters += '<img src="' + iconpath + 'pokemon_icon_' + data + '.png" style="width:38px;height:auto;"/>'
        })
        encounters += '</div>' +
            '<span style="border-radius:5px;padding:1px;font-size:7pt;background-color:white;">(' + i8ln('grunt data may change anytime') + ')</span>' +
            '</center></div>'
        // In addition make reward data if we know what can be a second reward.
        if (item['second_reward'] !== null) {
            // calculations for the rewards
            if (item['second_reward'] === 'false') { // if there is a possibility for
            // Reward data in a spoiler
                gruntReward += '<input name="button" type="button" onClick="showHideGruntEncounter(1)" value="' + i8ln('Grunt Rewards') + '" style="font-weight:normal;font-size:9pt;margin-left: 3px;">' +
                    '<div id="gruntRewardSpoiler" class="grunt-rewards-wrapper" style="display: none;background-color: #ccc;border-radius: 10px;border: 1px solid black;"><center>' +
                    '<div>100% ' + i8ln('chance for one of the following') + ':<br>'
                item['encounters']['first'].forEach(function (data) {
                    gruntReward += '<img src="' + iconpath + 'pokemon_icon_' + data + '.png" style="width:38px;height:auto;position:absolute;margin-top:4px;margin-left:4px;"/>' +
                    '<img src="static/images/shadow.png" style="width:44px;height:44px;"/>'
                })
                gruntReward += '</div>' +
                    '<span style="border-radius:5px;padding:1px;font-size:7pt;background-color:white;">(' + i8ln('grunt data may change anytime') + ')</span>' +
                    '</div></center>'
            } else if (item['second_reward'] === 'true') {
                gruntReward += '<input name="button" type="button" onClick="showHideGruntEncounter(1)" value="' + i8ln('Grunt Rewards') + '" style="font-weight:normal;font-size:9pt;margin-left: 3px;">' +
                    '<div id="gruntRewardSpoiler" class="grunt-rewards-wrapper" style="display: none;background-color: #ccc;border-radius: 10px;border: 1px solid black;"><center>' +
                    '<div>85% ' + i8ln('chance for one of the following') + ':<br>'
                item['encounters']['first'].forEach(function (data) {
                    gruntReward += '<img src="' + iconpath + 'pokemon_icon_' + data + '.png" style="width:38px;height:auto;position:absolute;margin-top:4px;margin-left:4px;"/>' +
                    '<img src="static/images/shadow.png" style="width:44px;height:44px;"/>'
                })
                gruntReward += '</div>' +
                    '<div>15% ' + i8ln('chance for one of the following') + ':<br>'
                item['encounters']['second'].forEach(function (data) {
                    gruntReward += '<img src="' + iconpath + 'pokemon_icon_' + data + '.png" style="width:38px;height:auto;position:absolute;margin-top:4px;margin-left:4px;"/>' +
                        '<img src="static/images/shadow.png" style="width:44px;height:44px;"/>'
                })
                gruntReward += '</div>' +
                    '<span style="border-radius:5px;padding:1px;font-size:7pt;background-color:white;">(' + i8ln('grunt data may change anytime') + ')</span>' +
                    '</div></center>'
            }
        }
    }
    var specialLure = ''
    if (!noLures) {
        if (lureType === 502 && item['lure_expiration'] > Date.now()) { // Special lure: Icy
            specialLure = '<b class="pokestop-lure-' + lureType + '-name">' + i8ln('Glacial Lure') + '</b>'
        } else if (lureType === 503 && item['lure_expiration'] > Date.now()) { // Special lure: Mossy
            specialLure = '<b class="pokestop-lure-' + lureType + '-name">' + i8ln('Mossy Lure') + '</b>'
        } else if (lureType === 504 && item['lure_expiration'] > Date.now()) { // Special lure: Electric
            specialLure = '<b class="pokestop-lure-' + lureType + '-name">' + i8ln('Magnetic Lure') + '</b>'
        }
    }
    var stopName = ''
    // Pick the Stops name with color based of lure,quest,normal
    if (invasion === 1 && invasionExpire > Date.now() && !noInvasions) {
        stopName = '<b class="pokestop-rocket-name">' + item['pokestop_name'] + '</b>'
    } else if (item['lure_expiration'] > Date.now() && !noLures) {
        if (lureType > 501) { // Lure name based on lure type
            stopName = '<b class="pokestop-lure-' + lureType + '-name">' + item['pokestop_name'] + '</b>'
        } else { // normal lure
            stopName = '<b class="pokestop-lure-name">' + item['pokestop_name'] + '</b>'
        }
    } else if (!noQuests && item['quest_type'] !== 0) {
        stopName = '<b class="pokestop-quest-name">' +
        item['pokestop_name'] +
        '</b>'
    } else {
        stopName = '<b class="pokestop-name">' +
        item['pokestop_name'] +
        '</b>'
    }
    var stopImage = ''
    var stopLabel = ''
    if (!noPokestopImages) {
        if (!noInvasions && item['invasion_expiration'] > Date.now() && item['url'] !== null) {
            stopImage = '<img class="pokestop-rocket-image" src="' + item['url'] + '">'
        } else if (item['lure_expiration'] > Date.now() && item['url'] !== null && !noLures) {
            if (lureType > 501) { // If the lure is special type
                stopImage = '<img class="pokestop-lure-' + lureType + '-image" src="' + item['url'] + '">'
            } else {
                stopImage = '<img class="pokestop-lure-image" src="' + item['url'] + '">'
            }
        } else if (!noQuests && item['quest_type'] !== 0 && item['url'] !== null) {
            stopImage = '<img class="pokestop-quest-image" src="' + item['url'] + '">'
        } else if (item['url'] !== null) {
            stopImage = '<img class="pokestop-image" src="' + item['url'] + '">'
        } else {
            stopImage = '<img height="80px" style="padding: 5px;" src="static/forts/stop.png">'
        }
    } else {
        stopImage = '<img height="80px" style="padding: 5px;" src="static/forts/stop.png">'
        stopLabel = 'Stop<br>'
    }
    var maplinkText = ''
    if (!noMaplink) {
        maplinkText = '- <a href="./?lat=' + item['latitude'] + '&lon=' + item['longitude'] + '&zoom=16">' + i8ln('Maplink') + '</a>'
    }
    var invasionImage = ''
    var invasionStr = ''
    var invasionEndStr = ''
    if (!noInvasions && item['invasion_expiration'] > Date.now()) { // Building the invasion image and the invasion expiration text
        invasionImage = '<img style="margin-top:0px;margin-bottom:55px;margin-left:-33px;height:40px;position:absolute" src="static/forts/rocket-invasion.png"/>'
        invasionEndStr = getTimeStr(item['invasion_expiration'])
        invasionStr +=
        '<div>' +
        i8ln('Team Rocket until') + ': ' + invasionEndStr +
        ' <span class="label-countdown" disappears-at="' + item['invasion_expiration'] + '">(00m00s)</span>' +
        '</div>'
        if (item['grunt_type'] !== null && item['url'] !== null) {
            invasionImage += '<img style="margin-top:45px;margin-bottom:55px;margin-left:-100px;height:50px;position:absolute" src="static/forts/gruntType/' + item['grunt_type'] + '.png"/>'
        } else {
            invasionImage += '<img style="margin-top:20px;margin-bottom:55px;margin-left:-90px;height:50px;position:absolute" src="static/forts/gruntType/' + item['grunt_type'] + '.png"/>'
        }
        if (item['grunt_type_name'] !== '') {
            invasionStr += '<div><b>' + i8ln('Grunt Type') + ':</b> ' + item['grunt_type_name'] + '</div>'
        } else if (item['grunt_type_gender'] !== '') {
            invasionStr += '<div><b>' + i8ln('Grunt Type') + ':</b> ' + i8ln('Extra') + '</div>'
        }
        if (item['grunt_type_gender'] !== '') {
            invasionStr += '<div><b>' + i8ln('Gender') + ':</b> ' + item['grunt_type_gender'] + '</div>'
        }
    }
    var lureImage = ''
    var lureStr = ''
    var lureEndStr = ''
    if (!noLures && item['lure_expiration'] > Date.now()) { // Building the lure module image and the lure expiration text
        lureImage = '<img style="margin-top:-15px;margin-bottom:55px;margin-left:-105px;height:65px;position:absolute" src="static/forts/LureModule_' + lureType + '.png"/>'
        lureEndStr = getTimeStr(item['lure_expiration'])
        lureStr =
        '<div style="font-weight:900;">' +
        i8ln('Lure until') + ': ' + lureEndStr +
        ' <span class="label-countdown" disappears-at="' + item['lure_expiration'] + '">(00m00s)</span>' +
        '</div>' +
        hr
    }
    var firstSeen = ''
    if (!noPokestopFirstseen && item['first_seen'] !== null && item['first_seen'] !== 0) {
        firstSeen = '<div><center>' +
            i8ln('Stop First Seen') + ': ' + getDateStrFull(item['first_seen']) +
            '</center></div>'
    }
    // Starting the Pokestop Label
    str =
        '<center><div class="pokestop-label">' +
        stopName + '<br>' +
        specialLure +
        '</div></center>'
    if (!noQuests && item['quest_type'] !== 0) {
        var excludeStr = ''
        var reward = JSON.parse(item['quest_reward_info'])
        var RewardId = ''
        if (Store.get('showQuests') === true) {
            if (item['quest_reward_type'] === 7) {
                RewardId = reward['pokemon_id']
                excludeStr = '<a href="javascript:excludePokemonQuest(' + RewardId + ')" title="' + i8ln('Exclude This Species Quests') + '">' + i8ln('Exclude Questtype') + '</a>'
            }
            if (item['quest_reward_type'] === 2) {
                RewardId = reward['item_id']
                excludeStr = '<a href="javascript:excludeItemQuest(' + RewardId + ')" title="' + i8ln('Exclude This Item Quests') + '">' + i8ln('Exclude Questtype') + '</a>'
            }
            if (item['quest_reward_type'] === 3) {
                excludeStr = '<a href="javascript:excludeDustQuest()" title="' + i8ln('Exclude Stardust Quests') + '">' + i8ln('Exclude Questtype') + '</a>'
            }
        }
        var rewardImg = '<div style="margin-top:-60px;margin-right:-60px">' +
                        getReward(item) +
                        '</div>'
        str +=
            '<div><center>' +
            stopImage
        if (item['invasion_expiration'] > Date.now()) {
            str +=
                invasionImage
        }
        if (item['lure_expiration'] > Date.now()) {
            str +=
                lureImage +
                rewardImg
        } else {
            str +=
                rewardImg
        }
        str +=
            '<div>' +
            invasionStr +
            encounters +
            gruntReward +
            hr +
            lureStr +
            getQuest(item) +
            '<center><a href="javascript:removePokestopMarker(\'' + pokestopId + '\')" title="' + i8ln('Remove Pokestop (temp.)') + '"><i class="fa fa-check" aria-hidden="true" style="font-size:32px"></i></a></center>' +
            '</center>' +
            hr +
            firstSeen +
            '</div>'
    } else {
        str =
            '<div class="pokestop-label">' +
            '<center>' +
            '<div>' +
            stopName + '<br>' +
            '</div>' +
            '<div>' +
            specialLure +
            '</div>' +
            '<div>' +
            stopLabel +
            '</div>' +
            '<div>' +
            stopImage +
            invasionImage +
            lureImage +
            '</div>' +
            '<div>' +
            lureStr +
            invasionStr +
            encounters +
            gruntReward +
            '</div>' +
            hr +
            firstSeen +
            '</center>' +
            '</div>'
    }
    if (!noDeletePokestops) {
        str += '<i class="fa fa-trash-o delete-pokestop" onclick="deletePokestop(event);" data-id="' + item['pokestop_id'] + '"></i>'
    }
    if (!noQuests && item['quest_type'] !== 0) {
        str += '<div><center>' +
        excludeStr +
        '</div></center>'
    }
    if (!noManualQuests && item['scanArea'] === false) {
        str += '<center><div>' + i8ln('Add Quest') + '<i class="fa fa-binoculars submit-quest" onclick="openQuestModal(event);" data-id="' + item['pokestop_id'] + '"></i></div></center>'
    }
    if (!noRenamePokestops) {
        str += '<center><div>' + i8ln('Rename Pokestop') + '<i class="fa fa-edit rename-pokestop" style="margin-top: 2px; vertical-align: middle; font-size: 1.5em;" onclick="openRenamePokestopModal(event);" data-id="' + item['pokestop_id'] + '"></i></div></center>'
    }
    if (!noConvertPokestops) {
        str += '<center><div>' + i8ln('Convert to Gym') + '<i class="fa fa-refresh convert-pokestop" style="margin-top: 2px; vertical-align: middle; font-size: 1.5em;" onclick="openConvertPokestopModal(event);" data-id="' + item['pokestop_id'] + '"></i></div></center>'
    }
    str += '<div><center>' +
        '<a href="javascript:void(0)" onclick="javascript:openMapDirections(' + item['latitude'] + ',' + item['longitude'] + ')" title="' + i8ln('View in Maps') + '">' + i8ln('Route') + '</a>' + maplinkText +
        '</center></div>'
    if ((!noWhatsappLinkQuests) && (item['quest_condition_type'] !== null && item['quest_type'] !== null)) {
        str += '<div>' +
            '<center>' +
            '<a href="whatsapp://send?text=' + '%2A' + i8ln('Pokestop') + ':%2A%20' + encodeURIComponent(item['pokestop_name']) + '%0A%2A' + i8ln('Quest') + ':%2A%20' + getRawQuest(item) + '%0A%2A' + i8ln('Reward') + ':%2A%20' + getRawReward(item) + '%0A%2A' + i8ln('Route') + ':%2A%0Ahttps://maps.google.com/?q=' + item['latitude'] + ',' + item['longitude'] + '" data-action="share/whatsapp/share">' + i8ln('Whatsapp Link') + '</a>' +
            '</center>' +
            '</div>'
    }
    str += '</div>'
    return str
}

function showHideGruntEncounter(type) { // eslint-disable-line no-unused-vars
    var x
    if (type === 0) { // Grunt encounter Data
        x = document.getElementsByClassName('grunt-encounters-wrapper')
    } else if (type === 1) {
        x = document.getElementsByClassName('grunt-rewards-wrapper')
    }
    var i
    for (i = 0; i < x.length; i++) {
        if (x[i].style.display === 'none') {
            x[i].style.display = 'block'
        } else {
            x[i].style.display = 'none'
        }
    }
}


function formatSpawnTime(seconds) {
    if (seconds < 0) {
        seconds += 3600
    }
    return ('0' + Math.floor(seconds / 60)).substr(-2) + ':' + ('0' + seconds % 60).substr(-2)
}
function spawnpointLabel(item) {
    var timeStr = ''
    if (item['despawn_sec'] && item['despawn_sec'] !== null) {
        timeStr = '<b>' + i8ln('Spawn') + '</b>(mm:ss): ' + formatSpawnTime(item['despawn_sec'] - 1800) + ' ' + i8ln('or') + ' ' + formatSpawnTime(item['despawn_sec']) +
        '<br>' +
        '<b>' + i8ln('Despawn') + '</b>(mm:ss): ' + formatSpawnTime(item['despawn_sec'])
    } else {
        timeStr = i8ln('Unknown spawnpoint data')
    }
    var str =
        '<div>' +
        '<b><u>' + i8ln('Spawn Point') + '</u></b>' +
        '</div>' +
        '<br>' +
        '<div>' +
        timeStr +
        '</div>'
    return str
}

function addRangeCircle(marker, map, type, teamId) {
    var markerPos = marker.getLatLng()
    var lat = markerPos.lat
    var lng = markerPos.lng
    var circleCenter = L.latLng(lat, lng)
    var gymColors = ['#999999', '#0051CF', '#FF260E', '#FECC23'] // 'Uncontested', 'Mystic', 'Valor', 'Instinct']
    var teamColor = gymColors[0]
    if (teamId) teamColor = gymColors[teamId]

    var range
    var circleColor

    // handle each type of marker and be explicit about the range circle attributes
    switch (type) {
        case 'pokemon':
            circleColor = '#C233F2'
            range = 40 // pokemon appear at 40m and then you can move away. still have to be 40m close to see it though, so ignore the further disappear distance
            break
        case 'pokestop':
            circleColor = '#3EB0FF'
            range = 40
            break
        case 'gym':
            circleColor = teamColor
            range = 40
            break
    }

    var rangeCircleOpts = {
        color: circleColor,
        radius: range, // meters
        strokeWeight: 1,
        strokeColor: circleColor,
        strokeOpacity: 0.9,
        center: circleCenter,
        fillColor: circleColor,
        fillOpacity: 0.4
    }
    var rangeCircle = L.circle(circleCenter, rangeCircleOpts)
    markers.addLayer(rangeCircle)
    return rangeCircle
}

function isRangeActive(map) {
    if (map.getZoom() < 16) return false
    return Store.get('showRanges')
}

function getIv(atk, def, stm) {
    if (atk !== null) {
        return 100.0 * (atk + def + stm) / 45
    }

    return false
}

function getPokemonCP(pokemonId, form, atkBase, defBase, staBase, level, atk, def, sta) {
    if (atkBase !== null && defBase !== null && staBase !== null) {
        var pokemonLevel = level - 1 // pulled from array, so decrease 1 to match for the multiplier-array
        return Math.floor(((atkBase + atk) * Math.pow(defBase + def, 0.5) * Math.pow(staBase + sta, 0.5) * Math.pow(cpMultiplier[pokemonLevel], 2)) / 10)
    } else {
        console.log('Unknown basestats for Pokemon #' + pokemonId + ':' + form + ' (' + i8ln(idToPokemon[pokemonId]).name + ')')
        return '?'
    }
}

function getPokemonLevel(cpMultiplier) { // eslint-disable-line no-unused-vars
    if (cpMultiplier < 0.734) {
        var pokemonLevel = 58.35178527 * cpMultiplier * cpMultiplier - 2.838007664 * cpMultiplier + 0.8539209906
    } else {
        pokemonLevel = 171.0112688 * cpMultiplier - 95.20425243
    }
    pokemonLevel = Math.round(pokemonLevel) * 2 / 2

    return pokemonLevel
}

function lpad(str, len, padstr) {
    return Array(Math.max(len - String(str).length + 1, 0)).join(padstr) + str
}

function repArray(text, find, replace) {
    for (var i = 0; i < find.length; i++) {
        text = text.replace(find[i], replace[i])
    }

    return text
}

function getTimeUntil(time) {
    var now = new Date()
    var tdiff = time - now

    var sec = Math.floor(tdiff / 1000 % 60)
    var min = Math.floor(tdiff / 1000 / 60 % 60)
    var hour = Math.floor(tdiff / (1000 * 60 * 60) % 24)

    return {
        'total': tdiff,
        'hour': hour,
        'min': min,
        'sec': sec,
        'now': now,
        'time': time
    }
}

function getNotifyText(item) {
    var iv = getIv(item['individual_attack'], item['individual_defense'], item['individual_stamina'])
    var find = ['<prc>', '<pkm>', '<atk>', '<def>', '<sta>']
    var replace = [iv ? iv.toFixed(1) : '', item['pokemon_name'], item['individual_attack'], item['individual_defense'], item['individual_stamina']]
    var ntitle = repArray(iv ? notifyIvTitle : notifyNoIvTitle, find, replace)
    var dist = new Date(item['disappear_time']).toLocaleString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    })
    var until = getTimeUntil(item['disappear_time'])
    var udist = until.hour > 0 ? until.hour + ':' : ''
    udist += lpad(until.min, 2, 0) + 'm' + lpad(until.sec, 2, 0) + 's'
    find = ['<dist>', '<udist>']
    replace = [dist, udist]
    var ntext = repArray(notifyText, find, replace)

    return {
        'fav_title': ntitle,
        'fav_text': ntext
    }
}

function customizePokemonMarker(marker, item, skipNotification) {
    marker.setBouncingOptions({
        bounceHeight: 20, // height of the bouncing
        bounceSpeed: 80, // bouncing speed coefficient
        elastic: false,
        shadowAngle: null
    })
    marker.on('mouseover', function () {
        this.stopBouncing()
        this.animationDisabled = true
    })
    var pokemonForm = item['form']
    var formStr = ''
    if (pokemonForm === '0' || pokemonForm === null || pokemonForm === 0) {
        formStr = '00'
    } else {
        formStr = pokemonForm
    }
    var pokemonId = item['pokemon_id']
    var pokemonIdStr = ''
    if (pokemonId <= 9) {
        pokemonIdStr = '00' + pokemonId
    } else if (pokemonId <= 99) {
        pokemonIdStr = '0' + pokemonId
    } else {
        pokemonIdStr = pokemonId
    }
    if (!marker.rangeCircle && isRangeActive(map)) {
        marker.rangeCircle = addRangeCircle(marker, map, 'pokemon')
    }
    // Label customization #01
    switch (Store.get('pokemonLabelStyle')) {
        case 'classic':
            marker.bindPopup(pokemonLabel(item), {autoPan: false, closeOnClick: true, maxWidth: 300, minWidth: 210})
            break
        case 'v1':
            marker.bindPopup(pokemonLabel(item), {className: 'pokeLabelv1', autoPan: false, closeOnClick: true, maxWidth: 300, minWidth: 210})
            break
        case 'v2':
            marker.bindPopup(pokemonLabel(item), {className: 'pokeLabelv2', autoPan: false, closeOnClick: true, maxWidth: 300, minWidth: 210})
            break
        case 'v3':
            marker.bindPopup(pokemonLabel(item), {className: 'pokeLabelv3', autoPan: false, closeOnClick: true, maxWidth: 300, minWidth: 210})
            break
        default:
            marker.bindPopup(pokemonLabel(item), {autoPan: false, closeOnClick: true, maxWidth: 300, minWidth: 210})
            break
    }
    if (notifiedPokemon.indexOf(item['pokemon_id']) > -1) {
        if (!skipNotification) {
            checkAndCreateSound(item['pokemon_id'])
            sendNotification(getNotifyText(item).fav_title, getNotifyText(item).fav_text, iconpath + 'pokemon_icon_' + pokemonIdStr + '_' + formStr + '.png', item['latitude'], item['longitude'])
        }
        if (marker.animationDisabled !== true && Store.get('remember_bounce_notify')) {
            marker.bounce()
        }
    }

    if (item['individual_attack'] != null) {
        var perfection = getIv(item['individual_attack'], item['individual_defense'], item['individual_stamina'])
        if (notifiedMinPerfection > 0 && perfection >= notifiedMinPerfection) {
            if (!skipNotification) {
                checkAndCreateSound(item['pokemon_id'])
                sendNotification(getNotifyText(item).fav_title, getNotifyText(item).fav_text, iconpath + 'pokemon_icon_' + pokemonIdStr + '_' + formStr + '.png', item['latitude'], item['longitude'])
            }
            if (marker.animationDisabled !== true && Store.get('remember_bounce_notify')) {
                marker.bounce()
            }
        }
    }

    if (item['level'] != null) {
        var level = item['level']
        if (notifiedMinLevel > 0 && level >= notifiedMinLevel) {
            if (!skipNotification) {
                checkAndCreateSound(item['pokemon_id'])
                sendNotification(getNotifyText(item).fav_title, getNotifyText(item).fav_text, iconpath + 'pokemon_icon_' + pokemonIdStr + '_' + formStr + '.png', item['latitude'], item['longitude'])
            }
            if (marker.animationDisabled !== true && Store.get('remember_bounce_notify')) {
                marker.bounce()
            }
        }
    }

    addListeners(marker)
}

function getGymMarkerIcon(item, badgeMode) {
    var park = item['park']
    var level = 6 - item['slots_available']
    var raidForm = item['form']
    var formStr = ''
    var lastScanned = item['last_scanned']
    var isInBattle = item['battle_status']
    var dateFirstSeen = new Date(item['first_seen'])
    var dateFirstSeenStr = dateFirstSeen.getDate() + '.' + (dateFirstSeen.getMonth() + 1) + '.' + dateFirstSeen.getFullYear()
    // Dynamic Sizes
    // Raid,Gym,Eggsizes
    // If you want to keep the scaling on mapzoom, dont touch these settings
    var dynamicRaidBossSize = (40 / 6) + ((40 / 6) * (map.getZoom() - 10)) // RaidbossSize - Depends on Zoom - 40=Initial
    var dynamicRaidBossPosRight = (12 / 6) + ((12 / 6) * (map.getZoom() - 10)) // Position from the raidboss from Right - Depends on Zoom - 12 = Initial
    var dynamicEggUnknownSize = (35 / 6) + ((35 / 6) * (map.getZoom() - 10)) // Unknown Egg Size - Depends on Zoom - 35=Initial
    var dynamicEggUnknownPosRight = (18 / 6) + ((18 / 6) * (map.getZoom() - 10)) // Unknown Egg right position - Depends on Zoom - 18=Initial
    var dynamicEggUnknownPosTop = (-11 / 6) + ((-11 / 6) * (map.getZoom() - 10)) // Unknown Egg Top position - Depends on Zoom - (-11)=Initial
    var dynamicGymSize = (48 / 6) + ((48 / 6) * (map.getZoom() - 10)) // Gym Size - Depends on Zoomlevel - 48=Initial
    // Egg icon Sizes
    var dynamicEggSize = (30 / 6) + ((30 / 6) * (map.getZoom() - 10)) // Depends on Zoomlevel
    var dynamicEggPosTop = (2 / 6) + ((2 / 6) * (map.getZoom() - 10)) // Depends on Zoomlevel
    var dynamicEggPosRight = (14 / 6) + ((14 / 6) * (map.getZoom() - 10)) // Depends on Zoomlevel
    // Ex icon sizes
    var dynamicExSize = (38 / 6) + ((38 / 6) * (map.getZoom() - 10)) // Depends on Zoomlevel
    var dynamicExPos = (25 / 6) + ((25 / 6) * (map.getZoom() - 10)) // Depends on Zoomlevel
    var dynamicExPosBot = (1 / 6) + ((1 / 6) * (map.getZoom() - 10)) // Depends on Zoomlevel
    // Exclusive Raid icon sizes
    var dynamicExclusiveSize = (50 / 6) + ((50 / 6) * (map.getZoom() - 10)) // Depends on Zoomlevel
    var dynamicExclusivePos = (-25 / 6) + ((-20 / 6) * (map.getZoom() - 10)) // Depends on Zoomlevel
    var dynamicExclusivePosBot = (25 / 6) + ((20 / 6) * (map.getZoom() - 10)) // Depends on Zoomlevel
    // Battle icon sizes
    var dynamicSwordSize = (24 / 6) + ((24 / 6) * (map.getZoom() - 10)) // Depends on Zoomlevel
    var dynamicSwordPos = (1 / 6) + ((1 / 6) * (map.getZoom() - 10)) // Depends on Zoomlevel
    var dynamicSwordPosBot = (30 / 6) + ((30 / 6) * (map.getZoom() - 10)) // Depends on Zoomlevel
    // RaidTimer
    var dynamicLeft = (-4 / 6) + ((-4 / 6) * (map.getZoom() - 10)) // Depends on Zoomlevel
    var dynamicTop = (46 / 6) + ((46 / 6) * (map.getZoom() - 10)) // Depends on Zoomlevel
    var dynamicFontSize = (12 / 6) + ((12 / 6) * (map.getZoom() - 10)) // Depends on Zoomlevel
    // FirstSeenDate
    var dynamicFirstseenLeft = (-6 / 6) + ((-6 / 6) * (map.getZoom() - 10)) // Depends on Zoomlevel
    var dynamicFirstseenTop = (-16 / 6) + ((-16 / 6) * (map.getZoom() - 10)) // Depends on Zoomlevel
    var dynamicFirstseenFontSize = (12 / 6) + ((12 / 6) * (map.getZoom() - 10)) // Depends on Zoomlevel

    var relativeIconSize = (50 / 6) + ((50 / 6) * (map.getZoom() - 10))

    if (raidForm <= 10 || raidForm == null || raidForm === '0') {
        formStr = '00'
    } else {
        formStr = raidForm
    }
    var pokemonid = item['raid_pokemon_id']
    var pokemonidStr = ''
    if (pokemonid <= 9) {
        pokemonidStr = '00' + pokemonid
    } else if (pokemonid <= 99) {
        pokemonidStr = '0' + pokemonid
    } else {
        pokemonidStr = pokemonid
    }

    var teamStr = ''
    var team = ''
    if (!noGymTeamInfos && (noOutdatedGyms || ((lastScanned / 1000) > ((Date.now() / 1000) - 14400)))) {
        team = item.team_id
        if (team === 0 || level === null) {
            teamStr = gymTypes[item['team_id']]
        } else {
            teamStr = gymTypes[item['team_id']] + '_' + level
        }
    } else {
        team = ''
        teamStr = 'Harmony'
    }

    var battleIcon = ''
    if (!noBattleStatus && isInBattle === 1 && ((lastScanned / 1000) > ((Date.now() / 1000) - 900))) {
        battleIcon = '<img src="static/images/swords.png" style="width:' + dynamicSwordSize + 'px;height:auto;position:absolute;right:' + dynamicSwordPos + 'px;bottom:' + dynamicSwordPosBot + 'px;"/>'
    }

    var exIcon = ''
    if ((((park !== '0' && park !== 'None' && park !== undefined && onlyTriggerGyms === false && park) || (item['sponsor'] !== undefined && item['sponsor'] > 0)) && noExGyms === false)) {
        exIcon = '<img src="static/images/ex_gym.png" style="width:' + dynamicExSize + 'px;height:auto;position:absolute;right:' + dynamicExPos + 'px;bottom:' + dynamicExPosBot + 'px;"/>'
    }
    if (((triggerGyms.includes(item['gym_id'])) || (item['triggered'] === 1 )) && (noExGyms === false) ) {
        exIcon = '<img src="static/images/ex_gym_triggered.png" style="width:' + dynamicExSize + 'px;height:auto;position:absolute;right:' + dynamicExPos + 'px;bottom:' + dynamicExPosBot + 'px;"/>'
    }

    var exclusiveIcon = ''
    if (noExGyms === false && item['is_exclusive'] === 1) {
        exclusiveIcon = '<img src="static/images/ex_gym_raid.png" style="width:' + dynamicExclusiveSize + 'px;height:auto;position:absolute;right:' + dynamicExclusivePos + 'px;bottom:' + dynamicExclusivePosBot + 'px;"/>'
    }
    var fortMarker = ''
    var html = ''
    if (badgeMode) {
        // Check which badge the gym has and update it properly
        var badgeStatus = 'none'
        if (personalBadges['gold'] !== null && personalBadges['gold'].includes(item['gym_id'])) {
            badgeStatus = 'gold'
        } else if (personalBadges['silver'] !== null && personalBadges['silver'].includes(item['gym_id'])) {
            badgeStatus = 'silver'
        } else if (personalBadges['bronze'] !== null && personalBadges['bronze'].includes(item['gym_id'])) {
            badgeStatus = 'bronze'
        }
        html = '<div style="position:relative;">' +
            '<img src="static/forts/badges/' + badgeStatus + '.png" style="width:' + dynamicGymSize + 'px;height:auto;"/>' +
            exIcon +
            '</div>'
        fortMarker = L.divIcon({
            iconSize: [relativeIconSize, relativeIconSize],
            iconAnchor: [dynamicGymSize / 2, dynamicGymSize / 2],
            popupAnchor: [0, -40],
            className: 'badge-marker',
            html: html
        })
    } else {
        if (item['raid_pokemon_id'] != null && item.raid_end > Date.now() && (item['raid_level'] >= denyRaidLevelsBelow || (denyRaidLevelsBelow === 0))) {
            html = '<div style="position:relative;">' +
                '<img src="static/forts/' + Store.get('gymMarkerStyle') + '/' + teamStr + '.png" style="width:' + dynamicGymSize + 'px;height:auto;"/>' +
                exIcon +
                '<img src="' + iconpath + 'pokemon_icon_' + pokemonidStr + '_' + formStr + '.png" style="width:' + dynamicRaidBossSize + 'px;height:auto;position:absolute;top:-6px;right:' + dynamicRaidBossPosRight + 'px;"/>' +
                exclusiveIcon +
                battleIcon +
                '</div>'
            if (noRaidTimer === false && Store.get('showRaidTimer') && map.getZoom() > 11) { // Raid Timer:Hatched-Known
                html += '<div><span style="font-size:' + dynamicFontSize + 'px;top:' + dynamicTop + 'px;left:' + dynamicLeft + 'px;padding: 0px 2px 0px 2px;border: 1px solid black;border-radius: 8px;" class="label-countdown-bracketless raid-icon-countdown-boss" disappears-at="' + item.raid_end + '" end>' + generateRemainingTimer(item.raid_end, 'end') + '</span></div>'
            }
            if (Store.get('showNewGymsOnly') !== '0' && map.getZoom() > 11) {
                html += '<div><span style="font-size:' + dynamicFirstseenFontSize + 'px;top:' + dynamicFirstseenTop + 'px;left:' + dynamicFirstseenLeft + 'px;" class="gym-firstseen-label">' + dateFirstSeenStr + '</span></div>'
            }
            fortMarker = L.divIcon({
                iconSize: [relativeIconSize, relativeIconSize],
                iconAnchor: [dynamicGymSize / 2, dynamicGymSize / 2],
                popupAnchor: [0, -40],
                className: 'raid-marker',
                html: html
            })
        } else if (item['raid_level'] !== null && item.raid_start <= Date.now() && item.raid_end > Date.now() && (item['raid_level'] >= denyRaidLevelsBelow || (denyRaidLevelsBelow === 0))) {
            var hatchedEgg = ''
            if (item['raid_level'] <= 2) {
                hatchedEgg = 'hatched_normal'
            } else if (item['raid_level'] <= 4) {
                hatchedEgg = 'hatched_rare'
            } else {
                hatchedEgg = 'hatched_legendary'
            }

            html = '<div style="position:relative;">' +
                '<img src="static/forts/' + Store.get('gymMarkerStyle') + '/' + teamStr + '.png" style="width:' + dynamicGymSize + 'px;height:auto;"/>' +
                exIcon +
                '<img src="static/raids/egg_' + hatchedEgg + '.png" style="width:' + dynamicEggUnknownSize + 'px;height:auto;position:absolute;top:' + dynamicEggUnknownPosTop + 'px;right:' + dynamicEggUnknownPosRight + 'px;"/>' +
                exclusiveIcon +
                battleIcon +
                '</div>'
            if (noRaidTimer === false && Store.get('showRaidTimer') && map.getZoom() > 11) { // Raid Timer:Hatched-unknown
                html += '<div><span style="font-size:' + dynamicFontSize + 'px;top:' + dynamicTop + 'px;left:' + dynamicLeft + 'px;padding: 0px 2px 0px 2px;border: 1px solid black;border-radius: 8px;" class="label-countdown-bracketless raid-icon-countdown-boss" disappears-at="' + item.raid_end + '" end>' + generateRemainingTimer(item.raid_end, 'end') + '</span></div>'
            }
            if (Store.get('showNewGymsOnly') !== '0' && map.getZoom() > 11) {
                html += '<div><span style="font-size:' + dynamicFirstseenFontSize + 'px;top:' + dynamicFirstseenTop + 'px;left:' + dynamicFirstseenLeft + 'px;" class="gym-firstseen-label">' + dateFirstSeenStr + '</span></div>'
            }
            fortMarker = L.divIcon({
                iconSize: [relativeIconSize, relativeIconSize],
                iconAnchor: [dynamicGymSize / 2, dynamicGymSize / 2],
                popupAnchor: [0, -40],
                className: 'active-egg-marker',
                html: html
            })
        } else if (item['raid_level'] !== null && item.raid_end > Date.now() && (item['raid_level'] >= denyRaidLevelsBelow || (denyRaidLevelsBelow === 0))) {
            var raidEgg = ''
            if (item['raid_level'] <= 2) {
                raidEgg = 'normal'
            } else if (item['raid_level'] <= 4) {
                raidEgg = 'rare'
            } else {
                raidEgg = 'legendary'
            }
            html = '<div style="position:relative;">' +
                '<img src="static/forts/' + Store.get('gymMarkerStyle') + '/' + teamStr + '.png" style="width:' + dynamicGymSize + 'px;height:auto;"/>' +
                exIcon +
                '<img src="static/raids/egg_' + raidEgg + '.png" style="width:' + dynamicEggSize + 'px;height:auto;position:absolute;top:' + dynamicEggPosTop + 'px;right:' + dynamicEggPosRight + 'px;"/>' +
                exclusiveIcon +
                battleIcon +
                '</div>'
            if (noRaidTimer === false && Store.get('showRaidTimer') && map.getZoom() > 11) { // Raid Timer:Egg
                html += '<div><span style="font-size:' + dynamicFontSize + 'px;top:' + dynamicTop + 'px;left:' + dynamicLeft + 'px;padding: 0px 2px 0px 2px;border: 1px solid black;border-radius: 8px;" class="label-countdown-bracketless raid-icon-countdown-egg" disappears-at="' + item.raid_start + '" start>' + generateRemainingTimer(item.raid_start, 'start') + '</span></div>'
            }
            if (Store.get('showNewGymsOnly') !== '0' && map.getZoom() > 11) {
                html += '<div><span style="font-size:' + dynamicFirstseenFontSize + 'px;top:' + dynamicFirstseenTop + 'px;left:' + dynamicFirstseenLeft + 'px;" class="gym-firstseen-label">' + dateFirstSeenStr + '</span></div>'
            }
            fortMarker = L.divIcon({
                iconSize: [relativeIconSize, relativeIconSize],
                iconAnchor: [dynamicGymSize / 2, dynamicGymSize / 2],
                popupAnchor: [0, -40],
                className: 'egg-marker',
                html: html
            })
        // If gyms are older than 4h - unscanned
        } else if ((lastScanned / 1000) < ((Date.now() / 1000) - 14400)) {
            html = '<div>' +
                '<img src="static/forts/' + Store.get('gymMarkerStyle') + '/' + teamStr + '.png" style="width:' + dynamicGymSize + 'px;height:auto;"/>' +
                exIcon
            if (Store.get('showNewGymsOnly') !== '0' && map.getZoom() > 11) {
                html += '<div><span style="font-size:' + dynamicFirstseenFontSize + 'px;top:' + dynamicFirstseenTop + 'px;left:' + dynamicFirstseenLeft + 'px;" class="gym-firstseen-label">' + dateFirstSeenStr + '</span></div>'
            }
            html +=
                '</div>'
            fortMarker = L.divIcon({
                iconSize: [relativeIconSize, relativeIconSize],
                iconAnchor: [dynamicGymSize / 2, dynamicGymSize / 2],
                popupAnchor: [0, -40],
                className: 'egg-marker',
                html: html
            })
        } else {
            html = '<div>' +
                '<img src="static/forts/' + Store.get('gymMarkerStyle') + '/' + teamStr + '.png" style="width:' + dynamicGymSize + 'px;height:auto;"/>' +
                exIcon +
                battleIcon
            if (Store.get('showNewGymsOnly') !== '0' && map.getZoom() > 11) {
                html += '<div><span style="font-size:' + dynamicFirstseenFontSize + 'px;top:' + dynamicFirstseenTop + 'px;left:' + dynamicFirstseenLeft + 'px;" class="gym-firstseen-label">' + dateFirstSeenStr + '</span></div>'
            }
            html +=
                '</div>'
            fortMarker = L.divIcon({
                iconSize: [relativeIconSize, relativeIconSize],
                iconAnchor: [dynamicGymSize / 2, dynamicGymSize / 2],
                popupAnchor: [0, -40],
                className: 'egg-marker',
                html: html
            })
        }
    }
    return fortMarker
}

function setupGymMarker(item) {
    var marker = L.marker([item['latitude'], item['longitude']], {icon: getGymMarkerIcon(item, Store.get('badgeMode')), zIndexOffset: 1060, virtual: true})
    markers.addLayer(marker)
    updateGymMarker(item, marker)

    if (!marker.rangeCircle && isRangeActive(map)) {
        marker.rangeCircle = addRangeCircle(marker, map, 'gym', item['team_id'])
    }


    var raidLevel = item.raid_level
    if (raidLevel >= Store.get('remember_raid_notify') && item.raid_end > Date.now() && Store.get('remember_raid_notify') !== 0) {
        var title = 'Raid level: ' + raidLevel

        var raidStartStr = getTimeStr(item['raid_start'])
        var raidEndStr = getTimeStr(item['raid_end'])
        var text = raidStartStr + ' - ' + raidEndStr

        var raidStarted = item['raid_pokemon_id'] != null
        var icon
        if (raidStarted) {
            var raidForm = item['form']
            var formStr = ''
            if (raidForm <= 10 || raidForm == null || raidForm === '0') {
                formStr = '00'
            } else {
                formStr = raidForm
            }
            var pokemonid = item.raid_pokemon_id
            var pokemonidStr = ''
            if (pokemonid <= 9) {
                pokemonidStr = '00' + pokemonid
            } else if (pokemonid <= 99) {
                pokemonidStr = '0' + pokemonid
            } else {
                pokemonidStr = pokemonid
            }

            icon = iconpath + 'pokemon_icon_' + pokemonidStr + '_' + formStr + '.png'
            checkAndCreateSound(item.raid_pokemon_id)
        } else if (item.raid_start <= Date.now()) {
            var hatchedEgg = ''
            if (item['raid_level'] <= 2) {
                hatchedEgg = 'hatched_normal'
            } else if (item['raid_level'] <= 4) {
                hatchedEgg = 'hatched_rare'
            } else {
                hatchedEgg = 'hatched_legendary'
            }
            icon = 'static/raids/egg_' + hatchedEgg + '.png'
        } else {
            var raidEgg = ''
            if (item['raid_level'] <= 2) {
                raidEgg = 'normal'
            } else if (item['raid_level'] <= 4) {
                raidEgg = 'rare'
            } else {
                raidEgg = 'legendary'
            }
            icon = 'static/raids/egg_' + raidEgg + '.png'
            checkAndCreateSound()
        }
        sendNotification(title, text, icon, item['latitude'], item['longitude'])
    }
    if (Store.get('useGymSidebar')) {
        marker.on('click', function () {
            var gymSidebar = document.querySelector('#gym-details')
            if (gymSidebar.getAttribute('data-id') === item['gym_id'] && gymSidebar.classList.contains('visible')) {
                gymSidebar.classList.remove('visible')
            } else {
                gymSidebar.setAttribute('data-id', item['gym_id'])
                showGymDetails(item['gym_id'])
            }
        })


        if (!isMobileDevice() && !isTouchDevice()) {
            if (Store.get('badgeMode')) {
                marker.bindPopup(gymLabel(item), {autoPan: false, closeOnClick: true, maxWidth: 200, minWidth: 200})
            } else {
                marker.bindPopup(gymLabel(item), {autoPan: false, closeOnClick: true})
            }
            marker.on('mouseover', function () {
                marker.openPopup()
                clearSelection()
                updateLabelDiffTime()
            })
        }

        marker.on('mouseout', function () {
            if (!marker.persist) {
                marker.closePopup()
            }
        })
    } else {
        if (Store.get('badgeMode')) {
            marker.bindPopup(gymLabel(item), {autoPan: false, closeOnClick: false, maxWidth: 200, minWidth: 200})
        } else {
            marker.bindPopup(gymLabel(item), {autoPan: false, closeOnClick: false})
        }
        addListeners(marker)
    }
    return marker
}

function updateGymMarker(item, marker) {
    marker.setIcon(getGymMarkerIcon(item, Store.get('badgeMode')))
    marker.setPopupContent(gymLabel(item))

    var raidLevel = item.raid_level
    if (raidLevel >= Store.get('remember_raid_notify') && item.raid_end > Date.now() && Store.get('remember_raid_notify') !== 0) {
        if (item.last_scanned > (Date.now() - 5 * 60)) {
            var title = 'Raid level: ' + raidLevel

            var raidStartStr = getTimeStr(item['raid_start'])
            var raidEndStr = getTimeStr(item['raid_end'])
            var text = raidStartStr + ' - ' + raidEndStr

            var raidStarted = item['raid_pokemon_id'] != null
            var icon
            if (raidStarted) {
                var raidForm = item['form']
                var formStr = ''
                if (raidForm <= 10 || raidForm == null || raidForm === '0') {
                    formStr = '00'
                } else {
                    formStr = raidForm
                }
                var pokemonid = item.raid_pokemon_id
                var pokemonidStr = ''
                if (pokemonid <= 9) {
                    pokemonidStr = '00' + pokemonid
                } else if (pokemonid <= 99) {
                    pokemonidStr = '0' + pokemonid
                } else {
                    pokemonidStr = pokemonid
                }
                icon = iconpath + 'pokemon_icon_' + pokemonidStr + '_' + formStr + '.png'
                checkAndCreateSound(item.raid_pokemon_id)
            } else if (item.raid_start <= Date.now()) {
                var hatchedEgg = ''
                if (item['raid_level'] <= 2) {
                    hatchedEgg = 'hatched_normal'
                } else if (item['raid_level'] <= 4) {
                    hatchedEgg = 'hatched_rare'
                } else {
                    hatchedEgg = 'hatched_legendary'
                }
                icon = 'static/raids/egg_' + hatchedEgg + '.png'
            } else {
                checkAndCreateSound()
                var raidEgg = ''
                if (item['raid_level'] <= 2) {
                    raidEgg = 'normal'
                } else if (item['raid_level'] <= 4) {
                    raidEgg = 'rare'
                } else {
                    raidEgg = 'legendary'
                }
                icon = 'static/raids/egg_' + raidEgg + '.png'
            }
            sendNotification(title, text, icon, item['latitude'], item['longitude'])
        }
    }

    return marker
}

function updateGymIcons() {
    $.each(mapData.gyms, function (key, value) {
        mapData.gyms[key]['marker'].setIcon(getGymMarkerIcon(mapData.gyms[key], Store.get('badgeMode')))
    })
}

function getPokestopMarkerIcon(item) {
    var reward = JSON.parse(item['quest_rewards'])
    var lure = item['lure_expiration']
    var lureType = item['lure_id']
    var invasion = item['invasion']
    var invasionExpiration = item['invasion_expiration']
    var stopMarker = ''
    var html = ''
    var width = 32
    var invasionString = ''
    var anchor = [15, 28]
    if (invasion === 1 && invasionExpiration > Date.now() && !noInvasions) {
        invasionString = '-tr'
        width = 50
        anchor = [24, 38]
    }

    var rewardImg = ''
    if (!noQuests && reward !== null) {
        var rewardinfo = reward[0]['info']
        if (reward[0]['type'] === 7) {
            var pokemonIdStr = ''
            if (rewardinfo['pokemon_id'] <= 9) {
                pokemonIdStr = '00' + rewardinfo['pokemon_id']
            } else if (rewardinfo['pokemon_id'] <= 99) {
                pokemonIdStr = '0' + rewardinfo['pokemon_id']
            } else {
                pokemonIdStr = rewardinfo['pokemon_id']
            }
            var formStr = ''
            if (rewardinfo['form_id'] === 0) {
                formStr = '00'
            } else {
                formStr = rewardinfo['form_id']
            }
            var shinyStr = ''
            if (rewardinfo['shiny'] === true) {
                shinyStr = '_shiny'
            }
            if (!noInvasions && invasion === 1 && invasionExpiration > Date.now() && Store.get('showInvasions') && item['grunt_type'] !== null) {
                rewardImg = '<img src="static/forts/gruntType/' + item['grunt_type'] + '.png" style="width:30px;height:auto;position:absolute;top:4px;left:0px;"/>'
            } else if (useIconRepoPokeRewards) {
                rewardImg = '<img src="' + iconpath + '/pokemon_icon_' + pokemonIdStr + '_' + formStr + shinyStr + '.png" style="width:30px;height:auto;position:absolute;top:4px;left:0px;"/>'
            } else {
                rewardImg = '<img src="' + rewardIcons + 'rewards/pokemon/' + pokemonIdStr + '_' + formStr + shinyStr + '.png" style="width:30px;height:auto;position:absolute;top:4px;left:0px;"/>'
            }
            if (lure > Date.now()) {
                html = '<div style="position:relative;">' +
                    '<img src="static/forts/Pstop-Lured_' + lureType + invasionString + '.png" style="width:50px;height:auto;top:-35px;right:10px;"/>' +
                    rewardImg +
                    '</div>'
            } else {
                html = '<div style="position:relative;">' +
                    '<img src="static/forts/Pstop-quest-small' + invasionString + '.png" style="width:50px;height:auto;top:-35px;right:10px;"/>' +
                    rewardImg +
                    '</div>'
            }
            if (noInvasionTimer === false && Store.get('showInvasionTimer') && invasion === 1 && invasionExpiration > Date.now()) {
                html += '<div><span style="padding: 0px 2px 0px 2px;border: 1px solid black;border-radius: 8px;" class="label-countdown-bracketless invasion-icon-countdown" disappears-at="' + item['invasion_expiration'] + '" end>' + generateRemainingTimer(item['invasion_expiration'], 'end') + '</span></div>'
            }
            stopMarker = L.divIcon({
                iconSize: [31, 31],
                iconAnchor: [24, 38],
                popupAnchor: [0, -35],
                className: 'stop-quest-marker',
                html: html
            })
        } else if (reward[0]['type'] === 3) {
            if (!noInvasions && invasion === 1 && invasionExpiration > Date.now() && Store.get('showInvasions') && item['grunt_type'] !== null) {
                rewardImg = '<img src="static/forts/gruntType/' + item['grunt_type'] + '.png" style="width:30px;height:auto;position:absolute;top:4px;left:0px;"/>'
            } else if (Store.get('showItemAmounts')) {
                rewardImg = '<img src="' + rewardIcons + 'rewards/reward_stardust_' + item['quest_reward_amount'] + '.png" style="width:30px;height:auto;position:absolute;top:4px;left:0px;"/>'
            } else {
                rewardImg = '<img src="' + rewardIcons + 'rewards/reward_stardust.png" style="width:30px;height:auto;position:absolute;top:4px;left:0px;"/>'
            }

            if (lure > Date.now()) {
                html = '<div style="position:relative;">' +
                    '<img src="static/forts/Pstop-Lured_' + lureType + invasionString + '.png" style="width:50px;height:auto;top:-35px;right:10px;"/>' +
                    rewardImg +
                    '</div>'
            } else {
                html = '<div style="position:relative;">' +
                    '<img src="static/forts/Pstop-quest-small' + invasionString + '.png" style="width:50px;height:auto;top:-35px;right:10px;"/>' +
                    rewardImg +
                    '</div>'
            }
            if (noInvasionTimer === false && Store.get('showInvasionTimer') && invasion === 1 && invasionExpiration > Date.now()) {
                html += '<div><span style="padding: 0px 2px 0px 2px;border: 1px solid black;border-radius: 8px;" class="label-countdown-bracketless invasion-icon-countdown" disappears-at="' + item['invasion_expiration'] + '" end>' + generateRemainingTimer(item['invasion_expiration'], 'end') + '</span></div>'
            }
            stopMarker = L.divIcon({
                iconSize: [31, 31],
                iconAnchor: [24, 38],
                popupAnchor: [0, -35],
                className: 'stop-quest-marker',
                html: html
            })
        } else if (reward[0]['type'] === 2) { // On Item Reward
            if (!noInvasions && invasion === 1 && invasionExpiration > Date.now() && Store.get('showInvasions') && item['grunt_type'] !== null) {
                rewardImg = '<img src="static/forts/gruntType/' + item['grunt_type'] + '.png" style="width:30px;height:auto;position:absolute;top:4px;left:0px;"/>'
            } else if (Store.get('showItemAmounts')) {
                rewardImg = '<img src="' + rewardIcons + 'rewards/reward_' + rewardinfo['item_id'] + '_' + item['quest_reward_amount'] + '.png" style="width:30px;height:auto;position:absolute;top:4px;left:0px;"/>'
            } else {
                rewardImg = '<img src="' + rewardIcons + 'rewards/reward_' + rewardinfo['item_id'] + '_1.png" style="width:30px;height:auto;position:absolute;top:4px;left:0px;"/>'
            }

            if (lure > Date.now()) {
                html = '<div style="position:relative;">' +
                    '<img src="static/forts/Pstop-Lured_' + lureType + invasionString + '.png" style="width:50px;height:auto;top:-35px;right:10px;"/>' +
                    rewardImg +
                    '</div>'
            } else {
                html = '<div style="position:relative;">' +
                    '<img src="static/forts/Pstop-quest-small' + invasionString + '.png" style="width:50px;height:auto;top:-35px;right:10px;"/>' +
                    rewardImg +
                    '</div>'
            }
            if (noInvasionTimer === false && Store.get('showInvasionTimer') && invasion === 1 && invasionExpiration > Date.now()) {
                html += '<div><span style="padding: 0px 2px 0px 2px;border: 1px solid black;border-radius: 8px;" class="label-countdown-bracketless invasion-icon-countdown" disappears-at="' + item['invasion_expiration'] + '" end>' + generateRemainingTimer(item['invasion_expiration'], 'end') + '</span></div>'
            }
            stopMarker = L.divIcon({
                iconSize: [31, 31],
                iconAnchor: [24, 38],
                popupAnchor: [0, -35],
                className: 'stop-quest-marker',
                html: html
            })
        } else {
            if (!noInvasions && invasion === 1 && invasionExpiration > Date.now() && Store.get('showInvasions') && item['grunt_type'] !== null) {
                rewardImg = '<img src="static/forts/gruntType/' + item['grunt_type'] + '.png" style="width:30px;height:auto;position:absolute;top:4px;left:0px;"/>'
            }

            if (lure > Date.now()) {
                html = '<div>' +
                    '<img src="static/forts/Pstop-Lured_' + lureType + invasionString + '.png" style="width:50px;height:auto;"' +
                    rewardImg +
                    '</div>'
            } else {
                html = '<div>' +
                    '<img src="static/forts/Pstop' + invasionString + '.png" style="width:' + width + 'px;height:auto;"' +
                    rewardImg +
                    '</div>'
            }
            if (noInvasionTimer === false && Store.get('showInvasionTimer') && invasion === 1 && invasionExpiration > Date.now()) {
                html += '<div><span style="padding: 0px 2px 0px 2px;border: 1px solid black;border-radius: 8px;" class="label-countdown-bracketless invasion-icon-countdown" disappears-at="' + item['invasion_expiration'] + '" end>' + generateRemainingTimer(item['invasion_expiration'], 'end') + '</span></div>'
            }
            stopMarker = L.divIcon({
                iconSize: [31, 31],
                iconAnchor: anchor,
                popupAnchor: [0, -35],
                className: 'stop-marker',
                html: html
            })
        }
    } else {
        if (!noInvasions && invasion === 1 && invasionExpiration > Date.now() && Store.get('showInvasions') && item['grunt_type'] !== null) {
            rewardImg = '<img src="static/forts/gruntType/' + item['grunt_type'] + '.png" style="width:30px;height:auto;position:absolute;top:4px;left:0px;"/>'
        }
        if (lure > Date.now()) {
            html = '<div>' +
        '<img src="static/forts/Pstop-Lured_' + lureType + invasionString + '.png" style="width:' + width + 'px;height:auto;" />' +
            rewardImg +
        '</div>'
        } else {
            html = '<div>' +
        '<img src="static/forts/Pstop' + invasionString + '.png" style="width:' + width + 'px;height:auto;" />' +
            rewardImg +
        '</div>'
        }
        if (noInvasionTimer === false && Store.get('showInvasionTimer') && invasion === 1 && invasionExpiration > Date.now()) {
            html += '<div><span style="padding: 0px 2px 0px 2px;border: 1px solid black;border-radius: 8px;" class="label-countdown-bracketless invasion-icon-countdown" disappears-at="' + item['invasion_expiration'] + '" end>' + generateRemainingTimer(item['invasion_expiration'], 'end') + '</span></div>'
        }
        stopMarker = L.divIcon({
            iconSize: [31, 31],
            iconAnchor: anchor,
            popupAnchor: [0, -35],
            className: 'stop-marker',
            html: html
        })
    }
    if (noPokestopImages) {
        if (!noInvasions && invasion === 1 && invasionExpiration > Date.now() && Store.get('showInvasions') && item['grunt_type'] !== null) {
            rewardImg = '<img src="static/forts/gruntType/' + item['grunt_type'] + '.png" style="width:30px;height:auto;position:absolute;top:4px;left:0px;"/>'
        }
        html = '<div>' +
        '<img src="static/forts/stop.png" style="width:16px;height:auto;" />' +
            rewardImg +
        '</div>'
        stopMarker = L.divIcon({
            iconSize: [15, 15],
            iconAnchor: [7, 14],
            popupAnchor: [0, -35],
            className: 'stop-marker',
            html: html
        })
    }
    return stopMarker
}

function setupPokestopMarker(item) {
    var pokestopMarkerIcon = getPokestopMarkerIcon(item)
    var reward = JSON.parse(item['quest_rewards'])
    var marker
    if (!noQuests && reward !== null) {
        var rewardInfo = JSON.parse(item['quest_reward_info'])
        if (rewardInfo['shiny'] === true) {
            marker = L.marker([item['latitude'], item['longitude']], {icon: pokestopMarkerIcon, zIndexOffset: 1050, virtual: true}).bindPopup(pokestopLabel(item), {className: 'leaflet-popup-content-wrapper shiny', autoPan: false, closeOnClick: true, maxWidth: 250})
        } else {
            marker = L.marker([item['latitude'], item['longitude']], {icon: pokestopMarkerIcon, zIndexOffset: 1050, virtual: true}).bindPopup(pokestopLabel(item), {className: 'leaflet-popup-content-wrapper normal', autoPan: false, closeOnClick: true, maxWidth: 250})
        }
    } else {
        marker = L.marker([item['latitude'], item['longitude']], {icon: pokestopMarkerIcon, zIndexOffset: 1050, virtual: true}).bindPopup(pokestopLabel(item), {className: 'leaflet-popup-content-wrapper normal', autoPan: false, closeOnClick: true, maxWidth: 250})
    }
    markers.addLayer(marker)

    if (!marker.rangeCircle && isRangeActive(map)) {
        marker.rangeCircle = addRangeCircle(marker, map, 'pokestop')
    }

    addListeners(marker)

    return marker
}
function setupNestMarker(item) {
    var getNestMarkerIcon = ''
    var pokemonCount = item.pokemon_avg
    var bigNest = ''
    var iconWidth = 48
    var pokemonPosTop = 6
    var pokemonPosLeft = 3
    var iconAnchor = [24, 60]
    if (item.pokemon_id > 0) {
        var pokemonIdStr = ''
        if (item.pokemon_id <= 9) {
            pokemonIdStr = '00' + item.pokemon_id
        } else if (item.pokemon_id <= 99) {
            pokemonIdStr = '0' + item.pokemon_id
        } else {
            pokemonIdStr = item.pokemon_id
        }
        if (pokemonCount > 10) {
            bigNest += '_big'
            iconWidth = 83
            pokemonPosTop = 33
            pokemonPosLeft = 20
            iconAnchor = [42, 90]
        }
        getNestMarkerIcon = '<div class="marker-nests">' +
            '<img src="static/images/nest-' + item.english_pokemon_types[0].type.toLowerCase() + bigNest + '.png" style="width:' + iconWidth + 'px;height: auto;"/>' +
            '<img src="' + iconpath + 'pokemon_icon_' + pokemonIdStr + '_00.png" style="position:absolute;width:40px;height:40px;top:' + pokemonPosTop + 'px;left:' + pokemonPosLeft + 'px"/>' +
            '</div>'
    } else {
        getNestMarkerIcon = '<div class="marker-nests">' +
            '<img src="static/images/nest-empty.png" style="width:36px;height:auto;"/>' +
            '</div>'
    }
    var nestMarkerIcon = L.divIcon({
        iconSize: [36, 48],
        iconAnchor: iconAnchor,
        popupAnchor: [0, -60],
        className: 'marker-nests',
        html: getNestMarkerIcon
    })
    var marker = L.marker([item['lat'], item['lon']], {icon: nestMarkerIcon, zIndexOffset: 1020, virtal: true}).bindPopup(nestLabel(item), {autoPan: false, closeOnClick: true})
    markers.addLayer(marker)
    addListeners(marker)

    return marker
}

function nestLabel(item) {
    var nameStr = ''
    var whatsappStr = ''
    if (item.name !== 'Unknown Areaname' && item.name !== null) { // Set the Nest's name if the db has a proper value for it
        // Handle the name if its too long
        if (item.name.length > 30) {
            nameStr = '<center><b>' + item.name.substring(0, 29) + '..' + '</b></center>'
        } else {
            nameStr = '<center><b>' + item.name + '</b></center>'
        }
        whatsappStr = '<a href="whatsapp://send?text=%2A' + i8ln('Nest') + ':%2A%20' + encodeURIComponent(item.pokemon_name) + '%0A%2A' + i8ln('Place') + ':%2A%20' + item.name + '%0A%2A' + i8ln('Spawn Density') + ':%2A%20~' + Math.round(item.pokemon_avg) + '/Stunde%0A%0A%2A' + i8ln('Route') + ':%2A%20https://maps.google.com/?q=' + item.lat.toFixed(4) + ',' + item.lon.toFixed(4) + '" data-action="share/whatsapp/share">' + i8ln('Whatsapp Link') + '</a>'
    } else {
        whatsappStr = '<a href="whatsapp://send?text=%2A' + i8ln('Nest') + ':%2A%20' + encodeURIComponent(item.pokemon_name) + '%0A%2A' + i8ln('Spawn Density') + ':%2A%20~' + Math.round(item.pokemon_avg) + '/Stunde%0A%0A%2A' + i8ln('Route') + ':%2A%20https://maps.google.com/?q=' + item.lat.toFixed(4) + ',' + item.lon.toFixed(4) + '" data-action="share/whatsapp/share">' + i8ln('Whatsapp Link') + '</a>'
    }
    var countAvgStr = ''
    if (item.pokemon_avg > 0 && item.pokemon_avg != null) { // Set the pokemon average spawn if the db has a proper value for it
        countAvgStr = '<div>' +
        '<hr width="50%" style="margin: 1em 0;border-bottom: solid 1px rgba(141, 141, 141, 0.43);">' +
        '<b>' + i8ln('Spawn Density') + ':</b> ' + i8ln('approx.') + ' ' + Math.round(item.pokemon_avg) + ' ' + i8ln('per hour') +
        '</div>'
    }
    var str = '<div>'
    if (item.pokemon_id > 0) {
        var types = item['pokemon_types']
        var typesDisplay = ''
        $.each(types, function (index, type) {
            typesDisplay += getTypeSpan(type)
        })
        var pokemonIdStr = ''
        if (item.pokemon_id <= 9) {
            pokemonIdStr = '00' + item.pokemon_id
        } else if (item.pokemon_id <= 99) {
            pokemonIdStr = '0' + item.pokemon_id
        } else {
            pokemonIdStr = item.pokemon_id
        }
        var imageTopOffset = 44
        if (nameStr !== '') {
            imageTopOffset = 58
        }
        str += nameStr +
                '<center><b>' + item.pokemon_name + '</b></center>' +
                '</div>' +
                '<center>' +
                '<div class="marker-nests">' +
                '<img src="static/images/nest-' + item.english_pokemon_types[0].type.toLowerCase() + '.png" style="width:80px;height:auto;"/>' +
                '<img src="' + iconpath + 'pokemon_icon_' + pokemonIdStr + '_00.png" style="position:absolute;width:65px;height:65px;top:' + imageTopOffset + 'px;left:80px;"/>' +
                '<br>' +
                '<div>' +
                typesDisplay +
                '</div>' +
                countAvgStr +
                '</center>' +
                '</div>'
    } else {
        str += '<div align="center" class="marker-nests">' +
            '<img src="static/images/nest-empty.png" align"middle" style="width:36px;height: auto;"/>' +
            '</div>' +
            '<b>' + i8ln('No Pokemon - Assign One Below') + '</b>'
    }
    if (item.type === 1) {
        str += '<center><div style="margin-bottom:5px; margin-top:5px;">' + i8ln('As found on thesilphroad.com') + '</div></center>'
    }
    if (!noDeleteNests) {
        str += '<i class="fa fa-trash-o delete-nest" onclick="deleteNest(event);" data-id="' + item['nest_id'] + '"></i>'
    }
    if (!noManualNests) {
        str += '<center><div>' + i8ln('Add Nest') + '<i class="fa fa-binoculars submit-nest" onclick="openNestModal(event);" data-id="' + item['nest_id'] + '"></i></div></center>'
    }
    str += '<div>' +
        '<center><a href="javascript:void(0)" onclick="javascript:openMapDirections(' + item.lat + ',' + item.lon + ')" title="' + i8ln('View in Maps') + '">' + i8ln('Route') + '</a> - <a href="./?lat=' + item.lat + '&lon=' + item.lon + '&zoom=16">' + i8ln('Maplink') + '</a></center>' +
        '</div>'

    if ((!noWhatsappLink) && (item.pokemon_id > 0)) {
        str += '<div>' +
            '<center>' +
            whatsappStr +
            '</center>' +
            '</div>'
    }
    return str
}

function setupCommunityMarker(item) {
    var icon = L.divIcon({
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        popupAnchor: [0, -47],
        className: 'marker-community',
        html: '<img src="static/images/marker-' + item.type + '.png" style="width:36px;height: 36px;"/>'
    })

    var marker = L.marker([item['lat'], item['lon']], {icon: icon, zIndexOffset: 1030, virtual: true}).bindPopup(communityLabel(item), {autoPan: false, closeOnClick: true, minWidth: 200})
    markers.addLayer(marker)

    addListeners(marker)

    return marker
}

function communityLabel(item) {
    var labelTitle = ''
    var titleImage = 'com-'
    if (item.type === 3) { // Discord
        titleImage += 'discord'
        labelTitle = 'Discord Community'
    } else if (item.type === 4) { // Telegram
        titleImage += 'telegram'
        labelTitle = 'Telegram Community'
    } else if (item.type === 5) { // Whatsapp
        titleImage += 'whatsapp'
        labelTitle = 'Whatsapp Community'
    } else if (item.type === 6) { // FB Msg Group
        titleImage += 'fbmessenger'
        labelTitle = 'FB Messenger Community'
    } else if (item.type === 7) { // FB Group
        titleImage += 'facebook'
        labelTitle = 'Facebook Community'
    } else if (item.type === 8) { // GroupMe
        titleImage += 'groupme'
        labelTitle = 'GroupMe Community'
    } else {
        labelTitle = 'Group'
    }

    var str = '<div align="center" style="padding-left:10px;padding-right:10px;">' +
                '<b>' + labelTitle + '</b>' +
                '</div>'
    if (item.type === 3 || item.type === 4 || item.type === 5) {
        str += '<center><img src="static/images/communities/' + titleImage + '.png" align"middle" style="width:200px;height: auto;border-radius:30px;"/></center>'
    }
    str +=
        '<center><h3><div><u>' + item.title + '</u></div></h3></center>' +
        '<center><div>' +
        '<u>' + i8ln('Description') + ':</u><br>' +
        item.description.slice(0, 70) + '</div></center><hr style="margin:1em 0"/>'
    if (item.team_instinct === 1 || item.team_mystic === 1 || item.team_valor === 1) {
        str += '<center><div>' + i8ln('Teams') + ':<br>'
        if (item.team_instinct === 1) {
            str +=
            '<img src="static/images/communities/instinct.png" align"middle" style="width:32px;height: auto;"/>'
        }
        if (item.team_mystic === 1) {
            str +=
            '<img src="static/images/communities/mystic.png" align"middle" style="width:32px;height: auto;"/>'
        }
        if (item.team_valor === 1) {
            str +=
            '<img src="static/images/communities/valor.png" align"middle" style="width:32px;height: auto;"/>'
        }
        str += '</center></div>'
    }
    if (item.size >= 10) {
        str +=
        '<center><div>' + item.size + ' Members</div></center>'
    }
    if (item.has_invite_url === 1 && (item.invite_url !== '#' || item.invite_url !== undefined)) {
        str +=
        '<center><div class="button-container">' +
            '<a class="button" href="' + item.invite_url + '">' + i8ln('Join Now') + '<i class="fa fa-comments" style="margin-left:10px;font-size:20px;vertical-align:middle;"></i>' +
            '</a>' +
        '</div></center>'
    }
    if (!noEditCommunity) {
        str +=
        '<center><div class="button-container">' +
        '<a class="button" onclick="openEditCommunityModal(event);" data-id="' + item.community_id + '" data-title="' + item.title + '" data-description="' + item.description + '" data-invite="' + item.invite_url + '">' + i8ln('Edit Community') + '<i class="fa fa-edit" style="margin-left:10px;font-size:20px;vertical-align:middle;"></i></center>' +
            '</a>' +
        '</div></center>'
    }
    if (item.source === 2) {
        str += '<center><div style="margin-bottom:5px; margin-top:5px;">' + i8ln('Join on  <a href="https://thesilphroad.com/map#18/' + item.lat + '/' + item.lon + '">thesilphroad.com</a>') + '</div></center>'
    }
    if (!noDeleteCommunity) {
        str += '<i class="fa fa-trash-o delete-community" onclick="deleteCommunity(event);" data-id="' + item.community_id + '"></i>'
    }
    return str
}

function setupPortalMarker(item) {
    var ts = Math.round(new Date().getTime() / 1000)
    var yesterday = ts - markPortalsAsNew
    if (item.checked === '1') {
        var circle = {
            color: 'red',
            radius: 10,
            fillOpacity: 0.4,
            fillColor: '#f00',
            weight: 1,
            pane: 'portals'
        }
    } else if (item.imported > yesterday) {
        circle = {
            color: 'green',
            radius: 10,
            fillOpacity: 0.4,
            fillColor: '#9f3',
            weight: 1,
            pane: 'portals'
        }
    } else {
        circle = {
            color: 'blue',
            radius: 10,
            fillOpacity: 0.4,
            fillColor: '#00f',
            weight: 1,
            pane: 'portals'
        }
    }
    var marker = L.circleMarker([item['lat'], item['lon']], circle).bindPopup(portalLabel(item), {autoPan: false, closeOnClick: true})
    markers.addLayer(marker)

    addListeners(marker)

    return marker
}

function setupPoiMarker(item) {
    if (item.status === '1') {
        var circle = {
            color: '#FFA500',
            radius: 5,
            fillOpacity: 1,
            fillColor: '#FFA500',
            weight: 1,
            pane: 'portals'
        }
    } else if (item.status === '2') {
        circle = {
            color: '#0000FF',
            radius: 5,
            fillOpacity: 1,
            fillColor: '#0000FF',
            weight: 1,
            pane: 'portals'
        }
    } else if (item.status === '3') {
        circle = {
            color: '#FF0000',
            radius: 5,
            fillOpacity: 1,
            fillColor: '#FF0000',
            weight: 1,
            pane: 'portals'
        }
    }
    var marker = L.circleMarker([item['lat'], item['lon']], circle).bindPopup(poiLabel(item), {autoPan: false, closeOnClick: true})
    markers.addLayer(marker)

    addListeners(marker)

    return marker
}

function portalLabel(item) {
    var updated = formatDate(new Date(item.updated * 1000))
    var imported = formatDate(new Date(item.imported * 1000))
    var str = '<img src="' + item.url + '" align"middle" style="width:175px;height:auto;margin-left:25px;"/>' +
        '<center><h4><div>' + item.name + '</div></h4></center>'
    if (!noConvertPortal) {
        str += '<center><div>Convert this portal<i class="fa fa-refresh convert-portal" style="margin-top: 2px; margin-left: 5px; vertical-align: middle; font-size: 1.5em;" onclick="openConvertPortalModal(event);" data-id="' + item.external_id + '"></i></div></center>'
    }
    str += '<center><div>Last updated: ' + updated + '</div></center>' +
        '<center><div>Date imported: ' + imported + '</div></center>'
    if (!noDeletePortal) {
        str += '<i class="fa fa-trash-o delete-portal" onclick="deletePortal(event);" data-id="' + item.external_id + '"></i>'
    }
    return str
}

function poiLabel(item) {
    var updated = formatDate(new Date(item.updated * 1000))
    var str = '<center><h3><div>' + item.name + '</div></h3></center>' +
        '<center><h4><div>' + item.description + '</div></h4></center>' +
        '<center><div>Added: ' + updated + '</div></center>' +
        '<center><div>Submitted by: ' + item.submitted_by + '</div></center>'
    if (!noDeletePoi) {
        str += '<i class="fa fa-trash-o delete-poi" onclick="deletePoi(event);" data-id="' + item.poi_id + '"></i>'
    }
    if (!noMarkPoi) {
        str += '<center><div>Mark this poi <i class="fa fa-refresh convert-poi" style="margin-top: 2px; margin-left: 5px; vertical-align: middle; font-size: 1.5em;" onclick="openMarkPoiModal(event);" data-id="' + item.poi_id + '"></i></div></center>'
    }
    return str
}

function deletePortal(event) { // eslint-disable-line no-unused-vars
    var button = $(event.target)
    var portalid = button.data('id')
    if (portalid && portalid !== '') {
        if (confirm(i8ln('I confirm that this portal does not longer exist. This is a permanent deleture'))) {
            return $.ajax({
                url: 'submit',
                type: 'POST',
                timeout: 300000,
                dataType: 'json',
                cache: false,
                data: {
                    'action': 'delete-portal',
                    'portalId': portalid
                },
                error: function error() {
                    // Display error toast
                    toastr['error'](i8ln('Oops something went wrong.'), i8ln('Error Deleting portal'))
                    toastr.options = toastrOptions
                },
                complete: function complete() {
                    jQuery('label[for="portals-switch"]').click()
                    jQuery('label[for="portals-switch"]').click()
                }
            })
        }
    }
}

function deletePoi(event) { // eslint-disable-line no-unused-vars
    var button = $(event.target)
    var poiid = button.data('id')
    if (poiid && poiid !== '') {
        if (confirm(i8ln('I confirm that this poi has been accepted through niantic or is not eligible as POI. This is a permanent deleture'))) {
            return $.ajax({
                url: 'submit',
                type: 'POST',
                timeout: 300000,
                dataType: 'json',
                cache: false,
                data: {
                    'action': 'delete-poi',
                    'poiId': poiid
                },
                error: function error() {
                    // Display error toast
                    toastr['error'](i8ln('Oops something went wrong.'), i8ln('Error Deleting poi'))
                    toastr.options = toastrOptions
                },
                complete: function complete() {
                    jQuery('label[for="poi-switch"]').click()
                    jQuery('label[for="poi-switch"]').click()
                }
            })
        }
    }
}

function getColorBySpawnTime(value) {
    if (value && value !== null) {
        var now = new Date()
        var seconds = now.getMinutes() * 60 + now.getSeconds()
        value = parseInt(value)
        // Make the Value not the despawntime but the spawntime
        if (value < 1800) {
            value += 3600
        }
        value -= 1800

        // New Roll-over
        if (seconds < value) {
            seconds += 3600
        }

        var diff = seconds - value
        // New Colorgrading
        var color = '#a0a0a0' // Standard - grey if not relevant

        if (diff >= 0 && diff <= 600) {
            color = 'green'
        } else if (diff >= 600 && diff <= 1200) {
            color = 'greenyellow'
        } else if (diff >= 1200 && diff <= 1500) {
            color = 'yellow'
        } else if (diff >= 1500 && diff <= 1680) {
            color = 'orange'
        } else if (diff >= 1680 && diff <= 1800) {
            color = 'red'
        }
        /* Display soon-spawning spawnpoints
        if (diff <= 3600 && diff >= 3540) {
            color = 'blue'
        } else if (diff < 3540 && diff >= 3300) {
            color = 'royalblue'
        }
        */
        return color
    } else {
        return '#000000'
    }
}

function setupSpawnpointMarker(item) {
    var hue = getColorBySpawnTime(item['despawn_sec'])

    var rangeCircleOpts = {
        radius: 4,
        weight: 1,
        color: 'black',
        opacity: 1,
        center: [item['latitude'], item['longitude']],
        fillColor: hue,
        fillOpacity: 0.8
    }
    var circle = L.circle([item['latitude'], item['longitude']], rangeCircleOpts).bindPopup(spawnpointLabel(item), {autoPan: false, closeOnclick: true})
    markersnotify.addLayer(circle)
    addListeners(circle)

    return circle
}

function clearSelection() {
    if (document.selection) {
        document.selection.empty()
    } else if (window.getSelection) {
        window.getSelection().removeAllRanges()
    }
}

function addListeners(marker) {
    marker.on('click', function () {
        if (!marker.infoWindowIsOpen) {
            marker.openPopup()
            clearSelection()
            updateLabelDiffTime()
            marker.persist = true
            marker.infoWindowIsOpen = true
        } else {
            marker.persist = null
            marker.closePopup()
            marker.infoWindowIsOpen = false
        }
    })

    if (openPopupOnHovering) {
        if (!isMobileDevice() && !isTouchDevice()) {
            marker.on('mouseover', function () {
                marker.openPopup()
                clearSelection()
                updateLabelDiffTime()
            })
        }
    }

    marker.on('mouseout', function () {
        if (!marker.persist) {
            marker.closePopup()
        }
    })

    marker.options.autoClose = false;
    if (onlyOnePopup){
        marker.options.autoClose = true;
    }

    return marker
}

function clearStaleMarkers() {
    $.each(mapData.pokemons, function (key, value) {
        if (((mapData.pokemons[key]['disappear_time'] < new Date().getTime() || ((excludedPokemon.indexOf(mapData.pokemons[key]['pokemon_id']) >= 0 || isTemporaryHidden(mapData.pokemons[key]['pokemon_id']) || ((((mapData.pokemons[key]['individual_attack'] + mapData.pokemons[key]['individual_defense'] + mapData.pokemons[key]['individual_stamina']) / 45 * 100 < minIV) || ((mapType === 'monocle' && mapData.pokemons[key]['level'] < minLevel) || (mapType === 'rm' && !isNaN(minLevel) && (mapData.pokemons[key]['cp_multiplier'] < cpMultiplier[minLevel - 1])))) && !excludedMinIV.includes(mapData.pokemons[key]['pokemon_id'])) || (Store.get('showBigKarp') === true && mapData.pokemons[key]['pokemon_id'] === 129 && (mapData.pokemons[key]['weight'] < 13.14 || mapData.pokemons[key]['weight'] === null)) || (Store.get('showTinyRat') === true && mapData.pokemons[key]['pokemon_id'] === 19 && (mapData.pokemons[key]['weight'] > 2.40 || mapData.pokemons[key]['weight'] === null))) && encounterId !== mapData.pokemons[key]['encounter_id'])) || (encounterId && encounterId === mapData.pokemons[key]['encounter_id'] && mapData.pokemons[key]['disappear_time'] < new Date().getTime()))) {
            if (mapData.pokemons[key].marker.rangeCircle) {
                markers.removeLayer(mapData.pokemons[key].marker.rangeCircle)
                markersnotify.removeLayer(mapData.pokemons[key].marker.rangeCircle)
                delete mapData.pokemons[key].marker.rangeCircle
            }
            markers.removeLayer(mapData.pokemons[key].marker)
            markersnotify.removeLayer(mapData.pokemons[key].marker)
            delete mapData.pokemons[key]
        }
    })
}

function showInBoundsMarkers(markersInput, type) {
    $.each(markersInput, function (key, value) {
        var marker = markersInput[key].marker
        var show = false
        if (!markersInput[key].hidden) {
            if (typeof marker.getLatLng === 'function') {
                if (map.getBounds().contains(marker.getLatLng())) {
                    show = true
                }
            }
        }
        // marker has an associated range
        if (show && rangeMarkers.indexOf(type) !== -1) {
            // no range circle yet...let's create one
            if (!marker.rangeCircle) {
                // but only if range is active
                if (isRangeActive(map)) {
                    if (type === 'gym') marker.rangeCircle = addRangeCircle(marker, map, type, markersInput[key].team_id)
                    else marker.rangeCircle = addRangeCircle(marker, map, type)
                }
            } else {
                // there's already a range circle
                if (isRangeActive(map)) {
                    markers.addLayer(marker.rangeCircle)
                } else {
                    markers.removeLayer(marker.rangeCircle)
                    markersnotify.removeLayer(marker.rangeCircle)
                    delete marker.rangeCircle
                }
            }
        }
    })
}

function loadRawData() {
    var loadPokemon = Store.get('showPokemon')
    var loadGyms = (Store.get('showGyms') || Store.get('showRaids')) ? 'true' : 'false'
    var loadBadges = Store.get('badgeMode')
    var loadPokestops = Store.get('showPokestops')
    var loadLures = Store.get('showLures')
    var loadQuests = Store.get('showQuests')
    var loadInvasions = Store.get('showInvasions')
    var loadDustamount = Store.get('showDustAmount')
    var loadNests = Store.get('showNests')
    var loadCommunities = Store.get('showCommunities')
    var loadPortals = Store.get('showPortals')
    var loadPois = Store.get('showPoi')
    var loadNewPortalsOnly = Store.get('showNewPortalsOnly')
    var loadSpawnpoints = Store.get('showSpawnpoints')
    var loadMinIV = Store.get('remember_text_min_iv')
    var loadMinLevel = Store.get('remember_text_min_level')
    var bigKarp = Boolean(Store.get('showBigKarp'))
    var tinyRat = Boolean(Store.get('showTinyRat'))
    var exEligible = Boolean(Store.get('exEligible'))
    var bounds = map.getBounds()
    var swPoint = bounds.getSouthWest()
    var nePoint = bounds.getNorthEast()
    var swLat = swPoint.lat
    var swLng = swPoint.lng
    var neLat = nePoint.lat
    var neLng = nePoint.lng
    return $.ajax({
        url: 'raw_data',
        type: 'POST',
        timeout: 300000,
        data: {
            'timestamp': timestamp,
            'login': login,
            'expireTimestamp': expireTimestamp,
            'pokemon': loadPokemon,
            'lastpokemon': lastpokemon,
            'pokestops': loadPokestops,
            'lures': loadLures,
            'quests': loadQuests,
            'dustamount': loadDustamount,
            'reloaddustamount': reloaddustamount,
            'nests': loadNests,
            'invasions': loadInvasions,
            'lastnests': lastnests,
            'communities': loadCommunities,
            'lastcommunities': lastcommunities,
            'portals': loadPortals,
            'pois': loadPois,
            'lastpois': lastpois,
            'newportals': loadNewPortalsOnly,
            'lastportals': lastportals,
            'lastpokestops': lastpokestops,
            'gyms': loadGyms,
            'lastgyms': lastgyms,
            'badges': loadBadges,
            'exEligible': exEligible,
            'lastslocs': lastslocs,
            'spawnpoints': loadSpawnpoints,
            'lastspawns': lastspawns,
            'minIV': loadMinIV,
            'prevMinIV': prevMinIV,
            'minLevel': loadMinLevel,
            'prevMinLevel': prevMinLevel,
            'bigKarp': bigKarp,
            'tinyRat': tinyRat,
            'swLat': swLat,
            'swLng': swLng,
            'neLat': neLat,
            'neLng': neLng,
            'oSwLat': oSwLat,
            'oSwLng': oSwLng,
            'oNeLat': oNeLat,
            'oNeLng': oNeLng,
            'reids': String(reincludedPokemon),
            'eids': String(excludedPokemon),
            'exMinIV': String(excludedMinIV),
            'qpreids': String(reincludedQuestsPokemon),
            'qpeids': String(questsExcludedPokemon),
            'qireids': String(reincludedQuestsItem),
            'qieids': String(questsExcludedItem),
            'geids': String(excludedGrunts),
            'greids': String(reincludedGrunts),
            'rbeids': String(excludedRaidbosses),
            'rbreids': String(reincludedRaidbosses),
            'reeids': String(excludedRaideggs),
            'rereids': String(reincludedRaideggs),
            'token': token,
            'encId': encounterId
        },
        dataType: 'json',
        cache: false,
        beforeSend: function beforeSend() {
            if (maxLatLng > 0 && (((neLat - swLat) > maxLatLng) || ((neLng - swLng) > maxLatLng))) {
                toastr['error'](i8ln('Please zoom in to get data.'), i8ln('Max zoom'))
                toastr.options = toastrOptions
                return false
            }
            if (rawDataIsLoading) {
                return false
            } else {
                rawDataIsLoading = true
            }
        },
        error: function error() {
            // Display error toast
            toastr['error'](i8ln('Please check connectivity or reduce marker settings.'), i8ln('Error getting data'))
            toastr.options = toastrOptions
        },
        complete: function complete() {
            rawDataIsLoading = false
        }
    })
}

function loadWeather() {
    return $.ajax({
        url: 'weather_data?all',
        type: 'POST',
        timeout: 300000,
        dataType: 'json',
        cache: false,
        error: function error() {
            // Display error toast
            toastr['error'](i8ln('Please check connectivity or reduce marker settings.'), i8ln('Error getting weather'))
            toastr.options = toastrOptions
        },
        complete: function complete() {

        }
    })
}

function loadWeatherCellData(cell) { // eslint-disable-line no-unused-vars
    return $.ajax({
        url: 'weather_data?cell',
        type: 'POST',
        timeout: 300000,
        dataType: 'json',
        cache: false,
        data: {
            'cell_id': cell
        },
        error: function error() {
            // Display error toast
            toastr['error'](i8ln('Please check connectivity or reduce marker settings.'), i8ln('Error getting weather'))
            toastr.options = toastrOptions
        },
        complete: function complete() {

        }
    })
}
function searchForItem(lat, lon, term, type, field) {
    if (term !== '') {
        $.ajax({
            url: 'search',
            type: 'POST',
            timeout: 300000,
            dataType: 'json',
            cache: false,
            data: {
                'action': type,
                'term': term,
                'lat': lat,
                'lon': lon
            },
            error: function error() {
                // Display error toast
                toastr['error'](i8ln('Please check connectivity or reduce marker settings.'), i8ln('Error searching'))
                toastr.options = toastrOptions
            }
        }).done(function (data) {
            if (data) {
                var par = field.parent()
                var sr = par.find('.search-results')
                sr.html('')
                $.each(data.reward, function (i, element) {
                    var pokemonIdStr = ''
                    if (element.quest_pokemon_id <= 9) {
                        pokemonIdStr = '00' + element.quest_pokemon_id
                    } else if (element.quest_pokemon_id <= 99) {
                        pokemonIdStr = '0' + element.quest_pokemon_id
                    } else {
                        pokemonIdStr = element.quest_pokemon_id
                    }
                    var scanArea
                    var latlng = turf.point([element.lon, element.lat])
                    $.each(scanAreas, function (index, poly) {
                        var insideScan = turf.booleanPointInPolygon(latlng, poly)
                        if (insideScan) {
                            scanArea = insideScan
                            return false
                        }
                    })
                    var html = '<li class="search-result ' + type + '" data-lat="' + element.lat + '" data-lon="' + element.lon + '"><div class="left-column" onClick="centerMapOnCoords(event);">'
                    if (sr.hasClass('reward-results')) {
                        if (element.quest_pokemon_id !== 0) {
                            html += '<span style="background:url(' + iconpath + 'pokemon_icon_' + pokemonIdStr + '_00.png) no-repeat;" class="i-icon" ></span>'
                        }
                        if (element.quest_item_id !== 0) {
                            html += '<span style="background:url(' + '' + rewardIcons + 'rewards/reward_' + element.quest_item_id + '_1.png) no-repeat;" class="i-icon" ></span>'
                        }
                    }
                    html += '<div class="cont">'
                    if (sr.hasClass('reward-results')) {
                        if (element.pokemon_name !== null) {
                            html += '<span class="reward" style="font-weight:bold">' + element.pokemon_name + '</span><span>&nbsp;-&#32;</span>'
                        }
                        if (element.item_name !== null) {
                            html += '<span class="reward" style="font-weight:bold">' + element.item_name + '</span><span>&nbsp;-&#32;</span>'
                        }
                    }
                    html += '<span class="name" style="font-weight:bold">' + element.name + '</span>' + '<span class="distance" style="font-weight:bold">&nbsp;-&#32;' + element.distance + defaultUnit + '</span>'
                    html += '</div></div>'
                    if (sr.hasClass('pokestop-results') && !noManualQuests && !scanArea) {
                        html += '<div class="right-column"><i class="fa fa-binoculars submit-quests"  onClick="openQuestModal(event);" data-id="' + element.external_id + '"></i></div>'
                    } else {
                        html += '<div class="right-column" onClick="centerMapOnCoords(event);"><span style="background:url(' + element.url + ') no-repeat;" class="i-icon" ></span></div>'
                    }
                    html += '</li>'
                    sr.append(html)
                })
                $.each(data.forts, function (i, element) {
                    var scanArea
                    var latlng = turf.point([element.lon, element.lat])
                    $.each(scanAreas, function (index, poly) {
                        var insideScan = turf.booleanPointInPolygon(latlng, poly)
                        if (insideScan) {
                            scanArea = insideScan
                            return false
                        }
                    })
                    var html = '<li class="search-result ' + type + '" data-lat="' + element.lat + '" data-lon="' + element.lon + '"><div class="left-column" onClick="centerMapOnCoords(event);">'
                    if (sr.hasClass('gym-results')) {
                        html += '<span style="background:url(' + element.url + ') no-repeat;" class="i-icon" ></span>'
                    }
                    html += '<div class="cont">' +
                    '<span class="name" style="font-weight:bold">' + element.name + '</span>' + '<span class="distance" style="font-weight:bold">&nbsp;-&#32;' + element.distance + defaultUnit + '</span>' +
                    '</div></div>'
                    if (sr.hasClass('gym-results') && manualRaids && !scanArea) {
                        html += '<div class="right-column"><i class="fa fa-binoculars submit-raid"  onClick="openRaidModal(event);" data-id="' + element.external_id + '"></i></div>'
                    }
                    html += '</li>'
                    sr.append(html)
                })
                $.each(data.pokestops, function (i, element) {
                    var scanArea
                    var latlng = turf.point([element.lon, element.lat])
                    $.each(scanAreas, function (index, poly) {
                        var insideScan = turf.booleanPointInPolygon(latlng, poly)
                        if (insideScan) {
                            scanArea = insideScan
                            return false
                        }
                    })
                    var html = '<li class="search-result ' + type + '" data-lat="' + element.lat + '" data-lon="' + element.lon + '"><div class="left-column" onClick="centerMapOnCoords(event);">'
                    if (sr.hasClass('pokestop-results')) {
                        html += '<span style="background:url(' + element.url + ') no-repeat;" class="i-icon" ></span>'
                    }
                    html += '<div class="cont">' +
                    '<span class="name" style="font-weight:bold">' + element.name + '</span>' + '<span class="distance" style="font-weight:bold">&nbsp;-&#32;' + element.distance + defaultUnit + '</span>' +
                    '</div></div>'
                    if (sr.hasClass('pokestop-results') && !noManualQuests && !scanArea) {
                        html += '<div class="right-column"><i class="fa fa-binoculars submit-quests"  onClick="openQuestModal(event);" data-id="' + element.external_id + '"></i></div>'
                    }
                    html += '</li>'
                    sr.append(html)
                })
                $.each(data.portals, function (i, element) {
                    var html = '<li class="search-result ' + type + '" data-lat="' + element.lat + '" data-lon="' + element.lon + '"><div class="left-column" onClick="centerMapOnCoords(event);">'
                    if (sr.hasClass('portals-results')) {
                        html += '<span style="background:url(' + element.url + ') no-repeat;" class="i-icon" ></span>'
                    }
                    html += '<div class="cont">' +
                    '<span class="name" style="font-weight:bold">' + element.name + '</span>' + '<span class="distance" style="font-weight:bold">&nbsp;-&#32;' + element.distance + defaultUnit + '</span>' +
                    '</div></div>' +
                    '</li>'
                    sr.append(html)
                })
                $.each(data.nests, function (i, element) {
                    var pokemonIdStr = ''
                    if (element.pokemon_id <= 9) {
                        pokemonIdStr = '00' + element.pokemon_id
                    } else if (element.pokemon_id <= 99) {
                        pokemonIdStr = '0' + element.pokemon_id
                    } else {
                        pokemonIdStr = element.pokemon_id
                    }
                    var html = '<li class="search-result ' + type + '" data-lat="' + element.lat + '" data-lon="' + element.lon + '"><div class="left-column" onClick="centerMapOnCoords(event);">'
                    if (sr.hasClass('nest-results')) {
                        html += '<span style="background:url(' + iconpath + 'pokemon_icon_' + pokemonIdStr + '_00.png) no-repeat;" class="i-icon" ></span>'
                    }
                    html += '<div class="cont">' +
                    '<span class="name" style="font-weight:bold">' + element.name + '</span>' + '<span class="distance" style="font-weight:bold">&nbsp;-&#32;' + element.distance + defaultUnit + '</span>' +
                    '</div></div>' +
                    '</li>'
                    sr.append(html)
                })
            }
        })
    }
}

function searchAjax(field) { // eslint-disable-line no-unused-vars
    var term = field.val()
    var type = field.data('type')
    navigator.geolocation.getCurrentPosition(function (position) {
        searchForItem(position.coords.latitude, position.coords.longitude, term, type, field)
    }, function (err) {
        if (err) {
            var center = map.getCenter()
            searchForItem(center.lat, center.lng, term, type, field)
        }
    })
}

function centerMapOnCoords(event) { // eslint-disable-line no-unused-vars
    var point = $(event.target)
    var zoom
    if (point.hasClass('place-result')) {
        point = point.parent()
        zoom = 15
    } else if (point.hasClass('left-column')) {
        point = point.parent()
        zoom = 18
    } else if (point.hasClass('cont')) {
        point = point.parent().parent().parent()
        zoom = 18
    } else if (point.hasClass('name') || point.hasClass('reward')) {
        point = point.parent().parent().parent()
        zoom = 16
    } else if (point.hasClass('pokemon-icon')) {
        point = point.parent().parent().parent()
        zoom = 18
    } else if (point.hasClass('distance')) {
        point = point.parent().parent().parent()
        zoom = 17
    } else if (!point.hasClass('search-result')) {
        point = point.parent().parent()
        zoom = 17
    } else {
        point = point.parent().parent().parent()
        zoom = 17
    }
    var latlng = new L.LatLng(point.data('lat'), point.data('lon'))
    map.setView(latlng, zoom)
    $('.ui-dialog-content').dialog('close')
}

function manualPokestopData(event) { // eslint-disable-line no-unused-vars
    var form = $(event.target).parent().parent()
    var pokestopName = form.find('[name="pokestop-name"]').val()
    var lat = $('.submit-modal.ui-dialog-content .submitLatitude').val()
    var lon = $('.submit-modal.ui-dialog-content .submitLongitude').val()
    var scanArea
    var latlng = turf.point([lon, lat])
    $.each(scanAreas, function (index, poly) {
        var insideScan = turf.booleanPointInPolygon(latlng, poly)
        if (insideScan) {
            scanArea = insideScan
            return false
        }
    })
    if (pokestopName && pokestopName !== '' && !scanArea) {
        if (confirm(i8ln('I confirm this is an accurate reporting of a new pokestop'))) {
            return $.ajax({
                url: 'submit',
                type: 'POST',
                timeout: 300000,
                dataType: 'json',
                cache: false,
                data: {
                    'action': 'pokestop',
                    'pokestopName': pokestopName,
                    'lat': lat,
                    'lon': lon
                },
                error: function error() {
                    // Display error toast
                    toastr['error'](i8ln('Please check connectivity or reduce marker settings.'), i8ln('Error Submitting Pokestop'))
                    toastr.options = toastrOptions
                },
                complete: function complete() {
                    lastpokestops = false
                    updateMap()
                    $('.ui-dialog-content').dialog('close')
                }
            })
        }
    } else if (scanArea) {
        if (confirm(i8ln('Adding a Pokéstop inside the scan area is not allowed'))) {
            $('.ui-dialog-content').dialog('close')
        }
    }
}

function manualGymData(event) { // eslint-disable-line no-unused-vars
    var form = $(event.target).parent().parent()
    var gymName = form.find('[name="gym-name"]').val()
    var lat = $('.submit-modal.ui-dialog-content .submitLatitude').val()
    var lon = $('.submit-modal.ui-dialog-content .submitLongitude').val()
    var scanArea
    var latlng = turf.point([lon, lat])
    $.each(scanAreas, function (index, poly) {
        var insideScan = turf.booleanPointInPolygon(latlng, poly)
        if (insideScan) {
            scanArea = insideScan
            return false
        }
    })
    if (gymName && gymName !== '' && !scanArea) {
        if (confirm(i8ln('I confirm this is an accurate reporting of a new gym'))) {
            return $.ajax({
                url: 'submit',
                type: 'POST',
                timeout: 300000,
                dataType: 'json',
                cache: false,
                data: {
                    'action': 'gym',
                    'gymName': gymName,
                    'lat': lat,
                    'lon': lon
                },
                error: function error() {
                    // Display error toast
                    toastr['error'](i8ln('Please check connectivity or reduce marker settings.'), i8ln('Error Submitting Gym'))
                    toastr.options = toastrOptions
                },
                complete: function complete() {
                    lastgyms = false
                    updateMap()
                    $('.ui-dialog-content').dialog('close')
                }
            })
        }
    } else if (scanArea) {
        if (confirm(i8ln('Adding a Gym inside the scan area is not allowed'))) {
            $('.ui-dialog-content').dialog('close')
        }
    }
}
function manualPokemonData(event) { // eslint-disable-line no-unused-vars
    var form = $(event.target).parent().parent().parent()
    var pokemonId = form.find('.pokemonID').val()
    var lat = $('.submit-modal.ui-dialog-content .submitLatitude').val()
    var lon = $('.submit-modal.ui-dialog-content .submitLongitude').val()
    var scanArea
    var latlng = turf.point([lon, lat])
    $.each(scanAreas, function (index, poly) {
        var insideScan = turf.booleanPointInPolygon(latlng, poly)
        if (insideScan) {
            scanArea = insideScan
            return false
        }
    })
    if (pokemonId && pokemonId !== '' && !scanArea) {
        if (confirm(i8ln('I confirm this is an accurate reporting of a new pokemon'))) {
            return $.ajax({
                url: 'submit',
                type: 'POST',
                timeout: 300000,
                dataType: 'json',
                cache: false,
                data: {
                    'action': 'pokemon',
                    'pokemonId': pokemonId,
                    'lat': lat,
                    'lon': lon
                },
                error: function error() {
                    // Display error toast
                    toastr['error'](i8ln('Please check connectivity or reduce marker settings.'), i8ln('Error Submitting Pokemon'))
                    toastr.options = toastrOptions
                },
                complete: function complete() {
                    lastpokemon = false
                    updateMap()
                    $('.ui-dialog-content').dialog('close')
                }
            })
        }
    } else if (scanArea) {
        if (confirm(i8ln('Adding a wild spawn inside the scan area is not allowed'))) {
            $('.ui-dialog-content').dialog('close')
        }
    }
}
function deleteGym(event) { // eslint-disable-line no-unused-vars
    var button = $(event.target)
    var gymId = button.data('id')
    if (gymId && gymId !== '') {
        if (confirm(i8ln('I confirm that I want to delete this gym. This is a permanent deleture'))) {
            return $.ajax({
                url: 'submit',
                type: 'POST',
                timeout: 300000,
                dataType: 'json',
                cache: false,
                data: {
                    'action': 'delete-gym',
                    'gymId': gymId
                },
                error: function error() {
                    // Display error toast
                    toastr['error'](i8ln('Please check connectivity or reduce marker settings.'), i8ln('Error Deleting Gym'))
                    toastr.options = toastrOptions
                },
                complete: function complete() {
                    jQuery('label[for="gyms-switch"]').click()
                    jQuery('label[for="gyms-switch"]').click()
                    jQuery('#gym-details').removeClass('visible')
                }
            })
        }
    }
}
function toggleExGym(event) { // eslint-disable-line no-unused-vars
    var button = $(event.target)
    var gymId = button.data('id')
    if (gymId && gymId !== '') {
        if (confirm(i8ln('I confirm that this gym is EX eligible.'))) {
            return $.ajax({
                url: 'submit',
                type: 'POST',
                timeout: 300000,
                dataType: 'json',
                cache: false,
                data: {
                    'action': 'toggle-ex-gym',
                    'gymId': gymId
                },
                error: function error() {
                    // Display error toast
                    toastr['error'](i8ln('Please check connectivity or reduce marker settings.'), i8ln('Error marking as EX Gym'))
                    toastr.options = toastrOptions
                },
                complete: function complete() {
                    jQuery('label[for="gyms-switch"]').click()
                    jQuery('label[for="gyms-switch"]').click()
                    jQuery('#gym-details').removeClass('visible')
                }
            })
        }
    }
}
function deletePokestop(event) { // eslint-disable-line no-unused-vars
    var button = $(event.target)
    var pokestopId = button.data('id')
    if (pokestopId && pokestopId !== '') {
        if (confirm(i8ln('I confirm that I want to delete this pokestop. This is a permanent deleture'))) {
            return $.ajax({
                url: 'submit',
                type: 'POST',
                timeout: 300000,
                dataType: 'json',
                cache: false,
                data: {
                    'action': 'delete-pokestop',
                    'pokestopId': pokestopId
                },
                error: function error() {
                    // Display error toast
                    toastr['error'](i8ln('Please check connectivity or reduce marker settings.'), i8ln('Error Deleting Pokestop'))
                    toastr.options = toastrOptions
                },
                complete: function complete() {
                    jQuery('label[for="pokestops-switch"]').click()
                    jQuery('label[for="pokestops-switch"]').click()
                }
            })
        }
    }
}
function renamePokestopData(event) { // eslint-disable-line no-unused-vars
    var form = $(event.target).parent().parent()
    var pokestopId = form.find('.renamepokestopid').val()
    var pokestopName = form.find('[name="pokestop-name"]').val()
    if (pokestopName && pokestopName !== '') {
        if (confirm(i8ln('I confirm this is an accurate new name for this pokestop'))) {
            return $.ajax({
                url: 'submit',
                type: 'POST',
                timeout: 300000,
                dataType: 'json',
                cache: false,
                data: {
                    'action': 'renamepokestop',
                    'pokestopId': pokestopId,
                    'pokestopName': pokestopName
                },
                error: function error() {
                    // Display error toast
                    toastr['error'](i8ln('Please check connectivity or reduce marker settings.'), i8ln('Error changing Pokestop name'))
                    toastr.options = toastrOptions
                },
                complete: function complete() {
                    jQuery('label[for="pokestops-switch"]').click()
                    jQuery('label[for="pokestops-switch"]').click()
                    lastpokestops = false
                    updateMap()
                    $('.ui-dialog-content').dialog('close')
                }
            })
        }
    }
}
function changeGymBadgeData(event) { // eslint-disable-line no-unused-vars
    var form = $(event.target).parent().parent()
    var gymId = form.find('.changebadgegymid').val()
    var selectedBadgeLevel = form.find('[name="badgeType"]:checked').val()
    if (selectedBadgeLevel && selectedBadgeLevel !== '') {
        return $.ajax({
            url: 'submit',
            type: 'POST',
            timeout: 300000,
            dataType: 'json',
            cache: false,
            data: {
                'action': 'changeBadge',
                'gymId': gymId,
                'selectedBadgeLevel': selectedBadgeLevel
            },
            error: function error() {
                // Display error toast
                toastr['error'](i8ln('Please check connectivity or reduce marker settings.'), i8ln('Error changing Badge Level'))
                toastr.options = toastrOptions
            },
            complete: function complete() {
                setTimeout(function () {
                    lastgyms = false
                    updateGymIcons()
                    redrawGyms(mapData.gyms)
                    jQuery('#gym-details').removeClass('visible')
                    $('.ui-dialog').remove()
                }, 1000)
            }
        })
    }
}
function convertPokestopData(event) { // eslint-disable-line no-unused-vars
    var form = $(event.target).parent().parent()
    var pokestopId = form.find('.convertpokestopid').val()
    if (pokestopId && pokestopId !== '') {
        if (confirm(i8ln('I confirm this pokestop is now a gym'))) {
            return $.ajax({
                url: 'submit',
                type: 'POST',
                timeout: 300000,
                dataType: 'json',
                cache: false,
                data: {
                    'action': 'convertpokestop',
                    'pokestopId': pokestopId
                },
                error: function error() {
                    // Display error toast
                    toastr['error'](i8ln('Pokestop ID got lost somewhere.'), i8ln('Error converting Pokestop'))
                    toastr.options = toastrOptions
                },
                complete: function complete() {
                    lastgyms = false
                    jQuery('label[for="pokestops-switch"]').click()
                    jQuery('label[for="pokestops-switch"]').click()
                    lastpokestops = false
                    updateMap()
                    $('.ui-dialog-content').dialog('close')
                }
            })
        }
    }
}
function convertPortalToPokestopData(event) { // eslint-disable-line no-unused-vars
    var form = $(event.target).parent().parent()
    var portalId = form.find('.convertportalid').val()
    if (portalId && portalId !== '') {
        if (confirm(i8ln('I confirm this portal is a pokestop'))) {
            return $.ajax({
                url: 'submit',
                type: 'POST',
                timeout: 300000,
                dataType: 'json',
                cache: false,
                data: {
                    'action': 'convertportalpokestop',
                    'portalId': portalId
                },
                error: function error() {
                    // Display error toast
                    toastr['error'](i8ln('Portal ID got lost somewhere.'), i8ln('Error converting to Pokestop'))
                    toastr.options = toastrOptions
                },
                complete: function complete() {
                    lastgyms = false
                    jQuery('label[for="pokestops-switch"]').click()
                    jQuery('label[for="pokestops-switch"]').click()
                    lastpokestops = false
                    updateMap()
                    $('.ui-dialog-content').dialog('close')
                }
            })
        }
    }
}
function convertPortalToGymData(event) { // eslint-disable-line no-unused-vars
    var form = $(event.target).parent().parent()
    var portalId = form.find('.convertportalid').val()
    if (portalId && portalId !== '') {
        if (confirm(i8ln('I confirm this portal is a gym'))) {
            return $.ajax({
                url: 'submit',
                type: 'POST',
                timeout: 300000,
                dataType: 'json',
                cache: false,
                data: {
                    'action': 'convertportalgym',
                    'portalId': portalId
                },
                error: function error() {
                    // Display error toast
                    toastr['error'](i8ln('Portal ID got lost somewhere.'), i8ln('Error converting to Gym'))
                    toastr.options = toastrOptions
                },
                complete: function complete() {
                    lastgyms = false
                    jQuery('label[for="pokestops-switch"]').click()
                    jQuery('label[for="pokestops-switch"]').click()
                    lastpokestops = false
                    updateMap()
                    $('.ui-dialog-content').dialog('close')
                }
            })
        }
    }
}
function markPortalChecked(event) { // eslint-disable-line no-unused-vars
    var form = $(event.target).parent().parent()
    var portalId = form.find('.convertportalid').val()
    if (portalId && portalId !== '') {
        if (confirm(i8ln('I confirm this portal is not a Pokestop or Gym'))) {
            return $.ajax({
                url: 'submit',
                type: 'POST',
                timeout: 300000,
                dataType: 'json',
                cache: false,
                data: {
                    'action': 'markportal',
                    'portalId': portalId
                },
                error: function error() {
                    // Display error toast
                    toastr['error'](i8ln('Portal ID got lost somewhere.'), i8ln('Error marking portal'))
                    toastr.options = toastrOptions
                },
                complete: function complete() {
                    lastportals = false
                    updateMap()
                    $('.ui-dialog-content').dialog('close')
                }
            })
        }
    }
}
function deleteNest(event) { // eslint-disable-line no-unused-vars
    var button = $(event.target)
    var nestid = button.data('id')
    if (nestid && nestid !== '') {
        if (confirm(i8ln('I confirm that I want to delete this nest. This is a permanent deleture'))) {
            return $.ajax({
                url: 'submit',
                type: 'POST',
                timeout: 300000,
                dataType: 'json',
                cache: false,
                data: {
                    'action': 'delete-nest',
                    'nestId': nestid
                },
                error: function error() {
                    // Display error toast
                    toastr['error'](i8ln('Please check connectivity or reduce marker settings.'), i8ln('Error Deleting nest'))
                    toastr.options = toastrOptions
                },
                complete: function complete() {
                    jQuery('label[for="nests-switch"]').click()
                    jQuery('label[for="nests-switch"]').click()
                }
            })
        }
    }
}

function submitNewNest(event) { // eslint-disable-line no-unused-vars
    var cont = $(event.target).parent().parent()
    var pokemonId = cont.find('.pokemonID').val()
    var lat = $('.submit-modal.ui-dialog-content .submitLatitude').val()
    var lon = $('.submit-modal.ui-dialog-content .submitLongitude').val()
    if (lat && lat !== '' && lon && lon !== '') {
        if (confirm(i8ln('I confirm this is an new nest'))) {
            return $.ajax({
                url: 'submit',
                type: 'POST',
                timeout: 300000,
                dataType: 'json',
                cache: false,
                data: {
                    'action': 'new-nest',
                    'lat': lat,
                    'lon': lon,
                    'pokemonId': pokemonId
                },
                error: function error() {
                    // Display error toast
                    toastr['error'](i8ln('Please check connectivity or reduce marker settings.'), i8ln('Error Submitting Nest'))
                    toastr.options = toastrOptions
                },
                complete: function complete() {
                    lastnests = false
                    updateMap()
                    jQuery('label[for="nests-switch"]').click()
                    jQuery('label[for="nests-switch"]').click()
                    $('.ui-dialog-content').dialog('close')
                }
            })
        }
    }
}

function manualNestData(event) { // eslint-disable-line no-unused-vars
    var cont = $(event.target).parent().parent().parent()
    var nestId = cont.find('.submitting-nests').data('nest')
    var pokemonId = cont.find('.pokemonID').val()
    if (nestId && nestId !== '' && pokemonId && pokemonId !== '') {
        if (confirm(i8ln('I confirm this is an accurate sighting of a quest'))) {
            return $.ajax({
                url: 'submit',
                type: 'POST',
                timeout: 300000,
                dataType: 'json',
                cache: false,
                data: {
                    'action': 'nest',
                    'nestId': nestId,
                    'pokemonId': pokemonId
                },
                error: function error() {
                    // Display error toast
                    toastr['error'](i8ln('Please check connectivity or reduce marker settings.'), i8ln('Error Submitting Nest'))
                    toastr.options = toastrOptions
                },
                complete: function complete() {
                    lastnests = false
                    updateMap()
                    jQuery('label[for="nests-switch"]').click()
                    jQuery('label[for="nests-switch"]').click()
                    $('.ui-dialog-content').dialog('close')
                }
            })
        }
    }
}

function manualQuestData(event) { // eslint-disable-line no-unused-vars
    var cont = $(event.target).parent().parent()
    var questType = cont.find('.questTypeList').val()
    var questTarget = cont.find('.questAmountList').val()
    var conditionType = cont.find('.conditionTypeList').val()
    var catchPokemon = cont.find('.pokeCatchList').val()
    var catchPokemonCategory = cont.find('.typeCatchList').val()
    var raidLevel = cont.find('.raidLevelList').val()
    var throwType = cont.find('.throwTypeList').val()
    var curveThrow = cont.find('.curveThrow').val()
    var rewardType = cont.find('.rewardTypeList').val()
    var encounter = cont.find('.pokeQuestList').val()
    var item = cont.find('.itemQuestList').val()
    var itemamount = cont.find('.itemAmountList').val()
    var dust = cont.find('.dustQuestList').val()
    var pokestopId = cont.find('.questPokestop').val()
    if (pokestopId && pokestopId !== '') {
        if (confirm(i8ln('I confirm this is an accurate sighting of a quest'))) {
            return $.ajax({
                url: 'submit',
                type: 'POST',
                timeout: 300000,
                dataType: 'json',
                cache: false,
                data: {
                    'action': 'quest',
                    'questType': questType,
                    'questTarget': questTarget,
                    'conditionType': conditionType,
                    'catchPokemon': catchPokemon,
                    'catchPokemonCategory': catchPokemonCategory,
                    'raidLevel': raidLevel,
                    'throwType': throwType,
                    'curveThrow': curveThrow,
                    'rewardType': rewardType,
                    'encounter': encounter,
                    'item': item,
                    'itemamount': itemamount,
                    'dust': dust,
                    'pokestopId': pokestopId
                },
                error: function error() {
                    // Display error toast
                    toastr['error'](i8ln('Please check connectivity or reduce marker settings.'), i8ln('Error Submitting Quest'))
                    toastr.options = toastrOptions
                },
                complete: function complete() {
                    lastpokestops = false
                    updateMap()
                    jQuery('label[for="pokestops-switch"]').click()
                    jQuery('label[for="pokestops-switch"]').click()
                    $('.ui-dialog-content').dialog('close')
                }
            })
        }
    }
}

function manualRaidData(event) { // eslint-disable-line no-unused-vars
    var form = $(event.target).parent().parent()
    var pokemonId = form.find('[name="pokemonId"]').val()
    gymId = form.find('[name="gymId"]').val()
    var monTime = form.find('[name="mon_time"]').val()
    var eggTime = form.find('[name="egg_time"]').val()
    if (pokemonId && pokemonId !== '' && gymId && gymId !== '' && eggTime && eggTime !== '' && monTime && monTime !== '') {
        if (confirm(i8ln('I confirm this is an accurate sighting of a raid'))) {
            return $.ajax({
                url: 'submit',
                type: 'POST',
                timeout: 300000,
                dataType: 'json',
                cache: false,
                data: {
                    'action': 'raid',
                    'pokemonId': pokemonId,
                    'gymId': gymId,
                    'monTime': monTime,
                    'eggTime': eggTime
                },
                error: function error() {
                    // Display error toast
                    toastr['error'](i8ln('Please check connectivity or reduce marker settings.'), i8ln('Error Submitting Raid'))
                    toastr.options = toastrOptions
                },
                complete: function complete() {
                    lastgyms = false
                    updateMap()
                    if (Store.get('useGymSidebar')) {
                        showGymDetails(form.find('[name="gymId"]').val())
                    }
                    $('.ui-dialog-content').dialog('close')
                }
            })
        }
    }
}
function submitNewCommunity(event) { // eslint-disable-line no-unused-vars
    var form = $(event.target).parent().parent()
    var lat = $('.submit-modal.ui-dialog-content .submitLatitude').val()
    var lon = $('.submit-modal.ui-dialog-content .submitLongitude').val()
    var communityName = form.find('[name="community-name"]').val()
    var communityDescription = form.find('[name="community-description"]').val()
    var communityInvite = form.find('[name="community-invite"]').val()
    if (communityName && communityName !== '' && communityDescription && communityDescription !== '' && communityInvite && communityInvite !== '') {
        if (confirm(i8ln('I confirm this is an active community'))) {
            return $.ajax({
                url: 'submit',
                type: 'POST',
                timeout: 300000,
                dataType: 'json',
                cache: false,
                data: {
                    'action': 'community-add',
                    'lat': lat,
                    'lon': lon,
                    'communityName': communityName,
                    'communityDescription': communityDescription,
                    'communityInvite': communityInvite
                },
                error: function error() {
                    // Display error toast
                    toastr['error'](i8ln('Make sure all fields are filled and the invite link is a valid Discord, Telegram or Whatsapp link.'), i8ln('Error Submitting community'))
                    toastr.options = toastrOptions
                },
                complete: function complete() {
                    lastcommunities = false
                    updateMap()
                    $('.ui-dialog-content').dialog('close')
                }
            })
        }
    }
}
function deleteCommunity(event) { // eslint-disable-line no-unused-vars
    var button = $(event.target)
    var communityid = button.data('id')
    if (communityid && communityid !== '') {
        if (confirm(i8ln('I confirm that I want to delete this community. This is a permanent deleture'))) {
            return $.ajax({
                url: 'submit',
                type: 'POST',
                timeout: 300000,
                dataType: 'json',
                cache: false,
                data: {
                    'action': 'delete-community',
                    'communityId': communityid
                },
                error: function error() {
                    // Display error toast
                    toastr['error'](i8ln('Oops something went wrong.'), i8ln('Error Deleting community'))
                    toastr.options = toastrOptions
                },
                complete: function complete() {
                    jQuery('label[for="communities-switch"]').click()
                    jQuery('label[for="communities-switch"]').click()
                }
            })
        }
    }
}
function editCommunityData(event) { // eslint-disable-line no-unused-vars
    var form = $(event.target).parent().parent()
    var communityId = form.find('.editcommunityid').val()
    var communityName = form.find('[name="community-name"]').val()
    var communityDescription = form.find('[name="community-description"]').val()
    var communityInvite = form.find('[name="community-invite"]').val()
    if ((communityName && communityName !== '') && (communityDescription && communityDescription !== '') && (communityInvite && communityInvite !== '')) {
        if (confirm(i8ln('I confirm this new info accurate for this community'))) {
            return $.ajax({
                url: 'submit',
                type: 'POST',
                timeout: 300000,
                dataType: 'json',
                cache: false,
                data: {
                    'action': 'editcommunity',
                    'communityId': communityId,
                    'communityName': communityName,
                    'communityDescription': communityDescription,
                    'communityInvite': communityInvite
                },
                error: function error() {
                    // Display error toast
                    toastr['error'](i8ln('No fields are filled or an invalid url is found, please check the form.'), i8ln('Error changing community'))
                    toastr.options = toastrOptions
                },
                complete: function complete() {
                    jQuery('label[for="communities-switch"]').click()
                    jQuery('label[for="communities-switch"]').click()
                    lastpokestops = false
                    updateMap()
                    $('.ui-dialog-content').dialog('close')
                }
            })
        }
    }
}
function submitPoi(event) { // eslint-disable-line no-unused-vars
    var form = $(event.target).parent().parent()
    var lat = $('.submit-modal.ui-dialog-content .submitLatitude').val()
    var lon = $('.submit-modal.ui-dialog-content .submitLongitude').val()
    var poiName = form.find('[name="poi-name"]').val()
    var poiDescription = form.find('[name="poi-description"]').val()
    if (poiName && poiName !== '' && poiDescription && poiDescription !== '') {
        if (confirm(i8ln('I confirm this is an eligible POI location'))) {
            return $.ajax({
                url: 'submit',
                type: 'POST',
                timeout: 300000,
                dataType: 'json',
                cache: false,
                data: {
                    'action': 'poi-add',
                    'lat': lat,
                    'lon': lon,
                    'poiName': poiName,
                    'poiDescription': poiDescription
                },
                error: function error() {
                    // Display error toast
                    toastr['error'](i8ln('Make sure all fields are filled.'), i8ln('Error Submitting poi'))
                    toastr.options = toastrOptions
                },
                complete: function complete() {
                    lastpois = false
                    updateMap()
                    $('.ui-dialog-content').dialog('close')
                }
            })
        }
    }
}

function markPoiSubmitted(event) { // eslint-disable-line no-unused-vars
    var form = $(event.target).parent().parent()
    var poiId = form.find('.markpoiid').val()
    if (poiId && poiId !== '') {
        if (confirm(i8ln('I confirm this POI is submitted to OPR'))) {
            return $.ajax({
                url: 'submit',
                type: 'POST',
                timeout: 300000,
                dataType: 'json',
                cache: false,
                data: {
                    'action': 'markpoisubmitted',
                    'poiId': poiId
                },
                error: function error() {
                    // Display error toast
                    toastr['error'](i8ln('POI id got lost somewhere.'), i8ln('Error marking portal'))
                    toastr.options = toastrOptions
                },
                complete: function complete() {
                    lastpois = false
                    updateMap()
                    $('.ui-dialog-content').dialog('close')
                }
            })
        }
    }
}

function markPoiDeclined(event) { // eslint-disable-line no-unused-vars
    var form = $(event.target).parent().parent()
    var poiId = form.find('.markpoiid').val()
    if (poiId && poiId !== '') {
        if (confirm(i8ln('I confirm this POI is declined by OPR'))) {
            return $.ajax({
                url: 'submit',
                type: 'POST',
                timeout: 300000,
                dataType: 'json',
                cache: false,
                data: {
                    'action': 'markpoideclined',
                    'poiId': poiId
                },
                error: function error() {
                    // Display error toast
                    toastr['error'](i8ln('POI id got lost somewhere.'), i8ln('Error marking portal'))
                    toastr.options = toastrOptions
                },
                complete: function complete() {
                    lastpois = false
                    updateMap()
                    $('.ui-dialog-content').dialog('close')
                }
            })
        }
    }
}

function openNestModal(event) { // eslint-disable-line no-unused-vars
    $('.ui-dialog').remove()
    var val = $(event.target).data('id')
    $('.submitting-nests').attr('data-nest', val)
    $('.global-nest-modal').clone().dialog({
        modal: true,
        maxHeight: 600,
        title: i8ln('Submit a Nest'),
        buttons: {},
        classes: {
            'ui-dialog': 'ui-dialog nest-widget-popup'
        },
        open: function (event, ui) {
            $('.nest-widget-popup .pokemon-list-cont').each(function (index) {
                $(this).attr('id', 'pokemon-list-cont-7' + index)
                var options = {
                    valueNames: ['name', 'types', 'id']
                }
                var monList = new List('pokemon-list-cont-7' + index, options) // eslint-disable-line no-unused-vars
            })
        }
    })
}
function openRaidModal(event) { // eslint-disable-line no-unused-vars
    $('.ui-dialog').remove()
    var val = $(event.target).data('id')
    $('#raidModalGymId').val(val)
    $('.raid-modal').clone().dialog({
        modal: true,
        maxHeight: 600,
        buttons: {},
        classes: {
            'ui-dialog': 'ui-dialog raid-widget-popup'
        }
    })
}

function openQuestModal(event) { // eslint-disable-line no-unused-vars
    $(function () {
        var $questTypeList = $('.quest-modal #questTypeList')
        $questTypeList.select2({
            placeholder: i8ln('Quest type'),
            closeOnSelect: true,
            minimumResultsForSearch: Infinity,
            maximumSelectionSize: 1
        })
        $questTypeList.change(function () {
            var questType = Number($(this).find('option:selected').val())
            if (questType > 0) {
                $('.quest-modal #questAmountList').show()
            } else {
                $('.quest-modal #questAmountList').hide()
            }
        })

        var $questAmountList = $('.quest-modal #questAmountList')
        $questAmountList.select2({
            placeholder: i8ln('Quest target amount'),
            closeOnSelect: true,
            minimumResultsForSearch: Infinity,
            maximumSelectionSize: 1
        })

        var $pokeCatchList = $('.quest-modal #pokeCatchList')
        $pokeCatchList.select2({
            placeholder: i8ln('Pokemon'),
            data: pokeList,
            multiple: true,
            maximumSelectionSize: 2
        })

        var $pokemonTypes = $('.quest-modal #typeCatchList')
        $pokemonTypes.select2({
            placeholder: i8ln('Pokemon type'),
            minimumResultsForSearch: Infinity,
            multiple: true,
            maximumSelectionSize: 3
        })

        var $raidLevelList = $('.quest-modal #raidLevelList')
        $raidLevelList.select2({
            placeholder: i8ln('Raid level'),
            closeOnSelect: true,
            minimumResultsForSearch: Infinity,
            multiple: true,
            maximumSelectionSize: 1
        })

        var $throwTypes = $('.quest-modal #throwTypeList')
        $throwTypes.select2({
            placeholder: i8ln('Throw type'),
            closeOnSelect: true,
            minimumResultsForSearch: Infinity,
            maximumSelectionSize: 1
        })
        var $curveThrow = $('.quest-modal #curveThrow')
        $curveThrow.select2({
            placeholder: i8ln('Curve throw'),
            closeOnSelect: true,
            minimumResultsForSearch: Infinity,
            maximumSelectionSize: 1
        })
        var $conditionTypeList = $('.quest-modal #conditionTypeList')
        $conditionTypeList.select2({
            placeholder: i8ln('Condition type'),
            closeOnSelect: true,
            minimumResultsForSearch: Infinity,
            maximumSelectionSize: 1
        })
        $('.quest-modal #pokeCatchList').next('.select2-container').hide()
        $('.quest-modal #typeCatchList').next('.select2-container').hide()
        $('.quest-modal #raidLevelList').next('.select2-container').hide()
        $('.quest-modal #throwTypeList').next('.select2-container').hide()
        $('.quest-modal #curveThrow').next('.select2-container').hide()
        $conditionTypeList.change(function () {
            var conditionType = Number($(this).find('option:selected').val())
            if (conditionType === 1) {
                $('.quest-modal #pokeCatchList').next('.select2-container').hide()
                $('.quest-modal #typeCatchList').next('.select2-container').show()
                $('.quest-modal #raidLevelList').next('.select2-container').hide()
                $('.quest-modal #throwTypeList').next('.select2-container').hide()
                $('.quest-modal #curveThrow').next('.select2-container').hide()
            } else if (conditionType === 2) {
                $('.quest-modal #pokeCatchList').next('.select2-container').show()
                $('.quest-modal #typeCatchList').next('.select2-container').hide()
                $('.quest-modal #raidLevelList').next('.select2-container').hide()
                $('.quest-modal #throwTypeList').next('.select2-container').hide()
                $('.quest-modal #curveThrow').next('.select2-container').hide()
            } else if (conditionType === 7) {
                $('.quest-modal #pokeCatchList').next('.select2-container').hide()
                $('.quest-modal #typeCatchList').next('.select2-container').hide()
                $('.quest-modal #raidLevelList').next('.select2-container').show()
                $('.quest-modal #throwTypeList').next('.select2-container').hide()
                $('.quest-modal #curveThrow').next('.select2-container').hide()
            } else if (conditionType === 8 || conditionType === 14) {
                $('.quest-modal #pokeCatchList').next('.select2-container').hide()
                $('.quest-modal #typeCatchList').next('.select2-container').hide()
                $('.quest-modal #raidLevelList').next('.select2-container').hide()
                $('.quest-modal #throwTypeList').next('.select2-container').show()
                $('.quest-modal #curveThrow').next('.select2-container').show()
            } else {
                $('.quest-modal #pokeCatchList').next('.select2-container').hide()
                $('.quest-modal #typeCatchList').next('.select2-container').hide()
                $('.quest-modal #raidLevelList').next('.select2-container').hide()
                $('.quest-modal #throwTypeList').next('.select2-container').hide()
                $('.quest-modal #curveThrow').next('.select2-container').hide()
            }
        })
        var $rewardTypeList = $('.quest-modal #rewardTypeList')
        $rewardTypeList.select2({
            placeholder: i8ln('Reward type'),
            closeOnSelect: true,
            minimumResultsForSearch: Infinity,
            maximumSelectionSize: 1
        })

        var $itemQuestList = $('.quest-modal #itemQuestList')
        $itemQuestList.select2({
            placeholder: i8ln('Reward Item'),
            closeOnSelect: true,
            minimumResultsForSearch: Infinity,
            maximumSelectionSize: 1
        })

        var $itemAmountList = $('.quest-modal #itemAmountList')
        $itemAmountList.select2({
            placeholder: i8ln('Reward Amount'),
            closeOnSelect: true,
            minimumResultsForSearch: Infinity,
            maximumSelectionSize: 1
        })

        var $dustQuestList = $('.quest-modal #dustQuestList')
        $dustQuestList.select2({
            placeholder: i8ln('Stardust amount'),
            closeOnSelect: true,
            minimumResultsForSearch: Infinity,
            maximumSelectionSize: 1
        })

        var $pokeQuestList = $('.quest-modal #pokeQuestList')
        $pokeQuestList.select2({
            placeholder: i8ln('Pokemon encounter'),
            closeOnSelect: true,
            maximumSelectionSize: 1
        })
        $('.quest-modal #itemQuestList').next('.select2-container').hide()
        $('.quest-modal #itemAmountList').next('.select2-container').hide()
        $('.quest-modal #dustQuestList').next('.select2-container').hide()
        $('.quest-modal #pokeQuestList').next('.select2-container').hide()

        $rewardTypeList.change(function () {
            var rewardType = $(this).find('option:selected').val()
            if (rewardType === '2') {
                $('.quest-modal #itemQuestList').next('.select2-container').show()
                $('.quest-modal #itemAmountList').next('.select2-container').show()
                $('.quest-modal #dustQuestList').next('.select2-container').hide()
                $('.quest-modal #pokeQuestList').next('.select2-container').hide()
            } else if (rewardType === '3') {
                $('.quest-modal #itemQuestList').next('.select2-container').hide()
                $('.quest-modal #itemAmountList').next('.select2-container').hide()
                $('.quest-modal #dustQuestList').next('.select2-container').show()
                $('.quest-modal #pokeQuestList').next('.select2-container').hide()
            } else if (rewardType === '7') {
                $('.quest-modal #itemQuestList').next('.select2-container').hide()
                $('.quest-modal #itemAmountList').next('.select2-container').hide()
                $('.quest-modal #dustQuestList').next('.select2-container').hide()
                $('.quest-modal #pokeQuestList').next('.select2-container').show()
            } else {
                $('.quest-modal #itemQuestList').next('.select2-container').hide()
                $('.quest-modal #itemAmountList').next('.select2-container').hide()
                $('.quest-modal #dustQuestList').next('.select2-container').hide()
                $('.quest-modal #pokeQuestList').next('.select2-container').hide()
            }
        })
    })
    $('.ui-dialog').remove()
    var val = $(event.target).data('id')
    $('.questPokestop').val(val)
    $('.quest-modal').clone().dialog({
        modal: true,
        maxHeight: 600,
        buttons: {},
        title: i8ln('Submit a Quest'),
        classes: {
            'ui-dialog': 'ui-dialog raid-widget-popup'
        }
    })
}

function openRenamePokestopModal(event) { // eslint-disable-line no-unused-vars
    $('.ui-dialog').remove()
    var val = $(event.target).data('id')
    console.log('picking Val:' + val)
    $('.renamepokestopid').val(val)
    $('.rename-modal').clone().dialog({
        modal: true,
        maxHeight: 600,
        buttons: {},
        title: i8ln('Rename Pokéstop'),
        classes: {
            'ui-dialog': 'ui-dialog raid-widget-popup'
        }
    })
}
function openChangeGymBadgeModal(event) { // eslint-disable-line no-unused-vars
    $('.ui-dialog').remove()
    var val = $(event.target).data('id')
    $('.changebadgegymid').val(val)
    $('.changeGymBadge-modal').clone().dialog({
        modal: true,
        maxHeight: 600,
        buttons: {},
        title: i8ln('Change Badge'),
        classes: {
            'ui-dialog': 'ui-dialog raid-widget-popup'
        }
    })
}

function openConvertPokestopModal(event) { // eslint-disable-line no-unused-vars
    $('.ui-dialog').remove()
    var val = $(event.target).data('id')
    $('.convertpokestopid').val(val)
    $('.convert-modal').clone().dialog({
        modal: true,
        maxHeight: 600,
        buttons: {},
        title: i8ln('Convert Pokéstop to Gym'),
        classes: {
            'ui-dialog': 'ui-dialog raid-widget-popup'
        }
    })
}

function openConvertPortalModal(event) { // eslint-disable-line no-unused-vars
    $('.ui-dialog').remove()
    var val = $(event.target).data('id')
    $('.convertportalid').val(val)
    $('.convert-portal-modal').clone().dialog({
        modal: true,
        maxHeight: 600,
        buttons: {},
        title: i8ln('Convert to Pokestop/Gym'),
        classes: {
            'ui-dialog': 'ui-dialog raid-widget-popup'
        }
    })
}

function openMarkPoiModal(event) { // eslint-disable-line no-unused-vars
    $('.ui-dialog').remove()
    var val = $(event.target).data('id')
    $('.markpoiid').val(val)
    $('.mark-poi-modal').clone().dialog({
        modal: true,
        maxHeight: 600,
        buttons: {},
        title: i8ln('Mark POI'),
        classes: {
            'ui-dialog': 'ui-dialog raid-widget-popup'
        }
    })
}

function openEditCommunityModal(event) { // eslint-disable-line no-unused-vars
    $('.ui-dialog').remove()
    var val = $(event.target).data('id')
    var title = $(event.target).data('title')
    var description = $(event.target).data('description')
    var invite = $(event.target).data('invite')
    $('.editcommunityid').val(val)
    $('#community-name').val(title)
    $('#community-description').val(description)
    $('#community-invite').val(invite)
    $('.editcommunity-modal').clone().dialog({
        modal: true,
        maxHeight: 600,
        buttons: {},
        title: i8ln('Edit Community'),
        classes: {
            'ui-dialog': 'ui-dialog raid-widget-popup'
        }
    })
}

function generateRaidModal() {
    var raidStr = '<form class="raid-modal" style="display:none;" title="' + i8ln('Submit a Raid Report') + '">'
    raidStr += '<input type="hidden" value="" id="raidModalGymId" name="gymId" autofocus>'
    raidStr += '<div class=" switch-container">' +
        generateRaidBossList() +
        '</div>' +
        '<div class="mon-name" style="display:none;"></div>' +
        '<div class="switch-container timer-cont" style="text-align:center;display:none">' +
        '<h5 class="timer-name" style="margin-bottom:0;"></h5>' +
        generateTimerLists() +
        '</div>' +
        '<button type="button" onclick="manualRaidData(event);" class="submitting-raid"><i class="fa fa-binoculars" style="margin-right:10px;"></i>' + i8ln('Submit Raid') + '</button>' +
        '<button type="button" onclick="$(\'.ui-dialog-content\').dialog(\'close\');" class="close-modal"><i class="fa fa-times" aria-hidden="true"></i></button>' +
        '</form>'
    return raidStr
}

function generateTimerLists() {
    var html = '<select name="egg_time" class="egg_time" style="display:none;">' +
        '<option value="60" selected>60</option>' +
        '<option value="59">59</option>' +
        '<option value="58">58</option>' +
        '<option value="57">57</option>' +
        '<option value="56">56</option>' +
        '<option value="55">55</option>' +
        '<option value="54">54</option>' +
        '<option value="53">53</option>' +
        '<option value="52">52</option>' +
        '<option value="51">51</option>' +
        '<option value="50">50</option>' +
        '<option value="49">49</option>' +
        '<option value="48">48</option>' +
        '<option value="47">47</option>' +
        '<option value="46">46</option>' +
        '<option value="45">45</option>' +
        '<option value="44">44</option>' +
        '<option value="43">43</option>' +
        '<option value="42">42</option>' +
        '<option value="41">41</option>' +
        '<option value="40">40</option>' +
        '<option value="39">39</option>' +
        '<option value="38">38</option>' +
        '<option value="37">37</option>' +
        '<option value="36">36</option>' +
        '<option value="35">35</option>' +
        '<option value="34">34</option>' +
        '<option value="33">33</option>' +
        '<option value="32">32</option>' +
        '<option value="31">31</option>' +
        '<option value="30">30</option>' +
        '<option value="29">29</option>' +
        '<option value="28">28</option>' +
        '<option value="27">27</option>' +
        '<option value="26">26</option>' +
        '<option value="25">25</option>' +
        '<option value="24">24</option>' +
        '<option value="23">23</option>' +
        '<option value="22">22</option>' +
        '<option value="21">21</option>' +
        '<option value="20">20</option>' +
        '<option value="19">19</option>' +
        '<option value="18">18</option>' +
        '<option value="17">17</option>' +
        '<option value="16">16</option>' +
        '<option value="15">15</option>' +
        '<option value="14">14</option>' +
        '<option value="13">13</option>' +
        '<option value="12">12</option>' +
        '<option value="11">11</option>' +
        '<option value="10">10</option>' +
        '<option value="9">9</option>' +
        '<option value="8">8</option>' +
        '<option value="7">7</option>' +
        '<option value="6">6</option>' +
        '<option value="5">5</option>' +
        '<option value="4">4</option>' +
        '<option value="3">3</option>' +
        '<option value="2">2</option>' +
        '<option value="1">1</option>' +
        '</select>' +
        '<select name="mon_time" class="mon_time" style="display:none;">' +
        '<option value="45" selected>45</option>' +
        '<option value="44">44</option>' +
        '<option value="43">43</option>' +
        '<option value="42">42</option>' +
        '<option value="41">41</option>' +
        '<option value="40">40</option>' +
        '<option value="39">39</option>' +
        '<option value="38">38</option>' +
        '<option value="37">37</option>' +
        '<option value="36">36</option>' +
        '<option value="35">35</option>' +
        '<option value="34">34</option>' +
        '<option value="33">33</option>' +
        '<option value="32">32</option>' +
        '<option value="31">31</option>' +
        '<option value="30">30</option>' +
        '<option value="29">29</option>' +
        '<option value="28">28</option>' +
        '<option value="27">27</option>' +
        '<option value="26">26</option>' +
        '<option value="25">25</option>' +
        '<option value="24">24</option>' +
        '<option value="23">23</option>' +
        '<option value="22">22</option>' +
        '<option value="21">21</option>' +
        '<option value="20">20</option>' +
        '<option value="19">19</option>' +
        '<option value="18">18</option>' +
        '<option value="17">17</option>' +
        '<option value="16">16</option>' +
        '<option value="15">15</option>' +
        '<option value="14">14</option>' +
        '<option value="13">13</option>' +
        '<option value="12">12</option>' +
        '<option value="11">11</option>' +
        '<option value="10">10</option>' +
        '<option value="9">9</option>' +
        '<option value="8">8</option>' +
        '<option value="7">7</option>' +
        '<option value="6">6</option>' +
        '<option value="5">5</option>' +
        '<option value="4">4</option>' +
        '<option value="3">3</option>' +
        '<option value="2">2</option>' +
        '<option value="1">1</option>' +
        '</select>'
    return html
}
function openSearchModal(event) { // eslint-disable-line no-unused-vars
    $('.ui-dialog').remove()
    var modal = $('.search-modal')
    var wwidth = $(window).width()
    var width = 300
    if (wwidth > 768) {
        width = 500
    }
    modal.clone().dialog({
        autoOpen: true,
        resizable: false,
        draggable: false,
        modal: true,
        title: i8ln('Search...'),
        classes: {
            'ui-dialog': 'ui-dialog search-widget-popup'
        },
        width: width,
        buttons: {},
        open: function (event, ui) {
            jQuery('input[name="gym-search"], input[name="pokestop-search"], input[name="reward-search"], input[name="nest-search"], input[name="portals-search"]').bind('input', function () {
                searchAjax($(this))
            })
            $('.search-widget-popup #search-tabs').tabs()
        }
    })
}

function processPokemons(i, item) {
    if (!Store.get('showPokemon')) {
        return false // in case the checkbox was unchecked in the meantime.
    }
    if (!(item['encounter_id'] in mapData.pokemons) && item['disappear_time'] > Date.now() && ((encounterId && encounterId === item['encounter_id']) || (excludedPokemon.indexOf(item['pokemon_id']) < 0 && !isTemporaryHidden(item['pokemon_id'])))) {
        // add marker to map and item to dict
        if (item.marker) {
            markers.removeLayer(item.marker)
            markersnotify.removeLayer(item.marker)
        }
        if (!item.hidden) {
            item.marker = setupPokemonMarker(item, map)
            customizePokemonMarker(item.marker, item)
            mapData.pokemons[item['encounter_id']] = item
        }
        if (encounterId && encounterId === item['encounter_id']) {
            if (!item.marker.infoWindowIsOpen) {
                item.marker.openPopup()
                clearSelection()
                updateLabelDiffTime()
                item.marker.persist = true
                item.marker.infoWindowIsOpen = true
            } else {
                item.marker.persist = null
                item.marker.closePopup()
                item.marker.infoWindowIsOpen = false
            }
        }
    }
}
function processNests(i, item) {
    if (!Store.get('showNests')) {
        return false
    }

    if (!mapData.nests[item['nest_id']]) {
        // new pokestop, add marker to map and item to dict
        if (item.marker && item.marker.rangeCircle) {
            markers.removeLayer(item.marker.rangeCircle)
        }
        if (item.marker) {
            markers.removeLayer(item.marker)
        }
        item.marker = setupNestMarker(item)
        mapData.nests[item['nest_id']] = item
    } else {
        // change existing pokestop marker to unlured/lured
        var item2 = mapData.nests[item['nest_id']]
        markers.removeLayer(item2.marker)
        item.marker = setupNestMarker(item)
        mapData.nests[item['nest_id']] = item
    }
}
function processCommunities(i, item) {
    if (!Store.get('showCommunities')) {
        return false
    }

    if (!mapData.communities[item['community_id']]) {
        // new pokestop, add marker to map and item to dict
        if (item.marker && item.marker.rangeCircle) {
            markers.removeLayer(item.marker.rangeCircle)
        }
        if (item.marker) {
            markers.removeLayer(item.marker)
        }
        item.marker = setupCommunityMarker(item)
        mapData.communities[item['community_id']] = item
    } else {
        // change existing pokestop marker to unlured/lured
        var item2 = mapData.communities[item['community_id']]
        markers.removeLayer(item2.marker)
        item.marker = setupCommunityMarker(item)
        mapData.communities[item['community_id']] = item
    }
}
function processPortals(i, item) {
    if (!Store.get('showPortals')) {
        return false
    }

    if (Store.get('showNewPortalsOnly') === 1 && !item['imported']) {
        return true
    }

    if (!mapData.portals[item['external_id']]) {
        // new portal, add marker to map and item to dict
        if (item.marker) {
            markers.removeLayer(item.marker)
        }
        item.marker = setupPortalMarker(item)
        mapData.portals[item['external_id']] = item
    } else {
        // change existing portal marker to old/new
        var item2 = mapData.portals[item['external_id']]
        if (!!item['imported'] !== !!item2['imported']) {
            markers.removeLayer(item2.marker)
            item.marker = setupPortalMarker(item)
            mapData.portals[item['external_id']] = item
        }
    }
}
function updatePortals() {
    if (!Store.get('showPortals')) {
        return false
    }

    var removePortals = []
    var ts = Math.round(new Date().getTime() / 1000)
    var diffTime = ts - markPortalsAsNew
    if (Store.get('showNewPortalsOnly') === 1) {
        $.each(mapData.portals, function (key, value) {
            if (value['imported'] < diffTime) {
                removePortals.push(key)
            }
        })
        $.each(removePortals, function (key, value) {
            if (mapData.portals[value] && mapData.portals[value].marker) {
                markers.removeLayer(mapData.portals[value].marker)
                markersnotify.removeLayer(mapData.portals[value].marker)
                delete mapData.portals[value]
            }
        })
    }
}
function processPois(i, item) {
    if (!Store.get('showPoi')) {
        return false
    }
    if (!mapData.pois[item['poi_id']]) {
        if (item.marker && item.marker.rangeCircle) {
            markers.removeLayer(item.marker.rangeCircle)
        }
        if (item.marker) {
            markers.removeLayer(item.marker)
        }
        item.marker = setupPoiMarker(item)
        mapData.pois[item['poi_id']] = item
    } else {
        // change existing pokestop marker to unlured/lured
        var item2 = mapData.pois[item['poi_id']]
        markers.removeLayer(item2.marker)
        item.marker = setupPoiMarker(item)
        mapData.pois[item['poi_id']] = item
    }
}
function processPokestops(i, item) {
    if (!Store.get('showPokestops')) {
        return false
    }
    if (Store.get('showLures') && !item['lure_expiration']) {
        return true
    }
    if (Store.get('showInvasions') && !item['invasion_expiration']) {
        return true
    }
    var removePokestopFromMap = function removePokestopFromMap(pokestopid) {
        if (mapData.pokestops[pokestopid] && mapData.pokestops[pokestopid].marker) {
            if (mapData.pokestops[pokestopid].marker.rangeCircle) {
                markers.removeLayer(mapData.pokestops[pokestopid].marker.rangeCircle)
                markersnotify.removeLayer(mapData.pokestops[pokestopid].marker.rangeCircle)
            }
            markers.removeLayer(mapData.pokestops[pokestopid].marker)
            markersnotify.removeLayer(mapData.pokestops[pokestopid].marker)
            delete mapData.pokestops[pokestopid]
        }
    }
    if (Store.get('showNewPokestopsOnly')) {
        var filterMonthDate
        if (Store.get('showNewPokestopsOnly') !== '0') {
            filterMonthDate = new Date(Store.get('showNewPokestopsOnly'))
        } else {
            filterMonthDate = new Date('1970-01-01')
        }
        if (item.first_seen == null) {
            if (item.first_seen < filterMonthDate.valueOf()) {
                removePokestopFromMap(item['pokestop_id'])
                return true
            }
        } else {
            if (item.first_seen < filterMonthDate.valueOf()) {
                removePokestopFromMap(item['pokestop_id'])
                return true
            }
        }
    }
    if (!mapData.pokestops[item['pokestop_id']]) {
        // new pokestop, add marker to map and item to dict
        if (item.marker && item.marker.rangeCircle) {
            markers.removeLayer(item.marker.rangeCircle)
        }
        if (item.marker) {
            markers.removeLayer(item.marker)
        }

        var latlng = turf.point([item['longitude'], item['latitude']])
        $.each(scanAreas, function (index, poly) {
            var insideScan = turf.booleanPointInPolygon(latlng, poly)
            if (insideScan) {
                item.scanArea = insideScan
                return false
            } else {
                item.scanArea = insideScan
            }
        })
        item.marker = setupPokestopMarker(item)
        mapData.pokestops[item['pokestop_id']] = item
    } else {
        // change existing pokestop marker to unlured/lured
        var item2 = mapData.pokestops[item['pokestop_id']]
        if (!!item['lure_expiration'] !== !!item2['lure_expiration']) {
            if (item2.marker && item2.marker.rangeCircle) {
                markers.removeLayer(item2.marker.rangeCircle)
            }
            markers.removeLayer(item2.marker)
            item.marker = setupPokestopMarker(item)
            mapData.pokestops[item['pokestop_id']] = item
        }
        if (!!item['invasion_expiration'] !== !!item2['invasion_expiration']) {
            if (item2.marker && item2.marker.rangeCircle) {
                markers.removeLayer(item2.marker.rangeCircle)
            }
            markers.removeLayer(item2.marker)
            item.marker = setupPokestopMarker(item)
            mapData.pokestops[item['pokestop_id']] = item
        }
    }
}

function updatePokestops() {
    if (!Store.get('showPokestops')) {
        return false
    }
    var removeStops = []
    var currentTime = Date.now()
    // change lured pokestop marker to unlured when expired
    $.each(mapData.pokestops, function (key, value) {
        if (value['lure_expiration'] && value['lure_expiration'] !== '0' && value['lure_expiration'] < currentTime) {
            if (value.marker && value.marker.rangeCircle) {
                markers.removeLayer(value.marker.rangeCircle)
                markersnotify.removeLayer(value.marker.rangeCircle)
            }
            markers.removeLayer(value.marker)
            markersnotify.removeLayer(value.marker)
            if (!value.hidden) {
                value.marker = setupPokestopMarker(value)
            }
        }
        if (value['invasion_expiration'] && value['invasion_expiration'] !== '0' && value['invasion_expiration'] < currentTime) {
            if (value.marker && value.marker.rangeCircle) {
                markers.removeLayer(value.marker.rangeCircle)
                markersnotify.removeLayer(value.marker.rangeCircle)
            }
            markers.removeLayer(value.marker)
            markersnotify.removeLayer(value.marker)
            if (!value.hidden) {
                value.marker = setupPokestopMarker(value)
            }
        }
    })
    if (Store.get('showLures')) {
        $.each(mapData.pokestops, function (key, value) {
            if (value['lure_expiration'] < currentTime) {
                removeStops.push(key)
            }
        })
        $.each(removeStops, function (key, value) {
            if (mapData.pokestops[value] && mapData.pokestops[value].marker) {
                if (mapData.pokestops[value].marker.rangeCircle) {
                    markers.removeLayer(mapData.pokestops[value].marker.rangeCircle)
                    markersnotify.removeLayer(mapData.pokestops[value].marker.rangeCircle)
                }
                markers.removeLayer(mapData.pokestops[value].marker)
                markersnotify.removeLayer(mapData.pokestops[value].marker)
                delete mapData.pokestops[value]
            }
        })
    }
    if (Store.get('showInvasions')) {
        $.each(mapData.pokestops, function (key, value) {
            if (value['invasion_expiration'] < currentTime || excludedGrunts.indexOf(Number(value['grunt_type'])) > -1) {
                removeStops.push(key)
            }
        })
        $.each(removeStops, function (key, value) {
            if (mapData.pokestops[value] && mapData.pokestops[value].marker) {
                if (mapData.pokestops[value].marker.rangeCircle) {
                    markers.removeLayer(mapData.pokestops[value].marker.rangeCircle)
                    markersnotify.removeLayer(mapData.pokestops[value].marker.rangeCircle)
                }
                markers.removeLayer(mapData.pokestops[value].marker)
                markersnotify.removeLayer(mapData.pokestops[value].marker)
                delete mapData.pokestops[value]
            }
        })
    }
    if (Store.get('showQuests')) {
        $.each(mapData.pokestops, function (key, value) {
            if (value['quest_type'] === 0 || ((value['quest_pokemon_id'] > 0 && questsExcludedPokemon.indexOf(value['quest_pokemon_id']) > -1) || (value['quest_item_id'] > 0 && questsExcludedItem.indexOf(value['quest_item_id']) > -1) || ((value['quest_reward_type'] === 3 && (Number(value['quest_reward_amount']) < Number(Store.get('showDustAmount')))) || (value['quest_reward_type'] === 3 && Store.get('showDustAmount') === 0)))) {
                removeStops.push(key)
            }
        })
        $.each(removeStops, function (key, value) {
            if (mapData.pokestops[value] && mapData.pokestops[value].marker) {
                if (mapData.pokestops[value].marker.rangeCircle) {
                    markers.removeLayer(mapData.pokestops[value].marker.rangeCircle)
                    markersnotify.removeLayer(mapData.pokestops[value].marker.rangeCircle)
                }
                markers.removeLayer(mapData.pokestops[value].marker)
                markersnotify.removeLayer(mapData.pokestops[value].marker)
                delete mapData.pokestops[value]
            }
        })
    }
}

function processBadges(i, item) {
    if (!Store.get('badgeMode')) {
        return false // in case the checkbox was unchecked in the meantime.
    }
    if (i === 'gold' || i === 'silver' || i === 'bronze') {
        personalBadges[i] = item
    }
}

function processGyms(i, item) {
    if (!Store.get('showGyms') && !Store.get('showRaids')) {
        return false // in case the checkbox was unchecked in the meantime.
    }
    var latlng = turf.point([item['longitude'], item['latitude']])
    $.each(scanAreas, function (index, poly) {
        var insideScan = turf.booleanPointInPolygon(latlng, poly)
        if (insideScan) {
            item.scanArea = insideScan
            return false
        } else {
            item.scanArea = insideScan
        }
    })
    var gymLevel = item.slots_available
    var raidLevel = item.raid_level
    var removeGymFromMap = function removeGymFromMap(gymid) {
        if (mapData.gyms[gymid] && mapData.gyms[gymid].marker) {
            if (mapData.gyms[gymid].marker.rangeCircle) {
                markers.removeLayer(mapData.gyms[gymid].marker.rangeCircle)
                markersnotify.removeLayer(mapData.gyms[gymid].marker.rangeCircle)
            }
            markers.removeLayer(mapData.gyms[gymid].marker)
            markersnotify.removeLayer(mapData.gyms[gymid].marker)
            delete mapData.gyms[gymid]
        }
    }

    if (!Store.get('showGyms') && Store.get('showRaids')) {
        if (item.raid_end === undefined) {
            removeGymFromMap(item['gym_id'])
            return true
        }
    }

    if (!Store.get('showGyms') && Store.get('showRaids')) {
        if (item.raid_end < Date.now() || ((Store.get('filterRaidboss')) && ((excludedRaidbosses.indexOf(Number(item.raid_pokemon_id)) > -1 && item.raid_pokemon_id !== null) || (excludedRaideggs.indexOf(Number(item.raid_level)) > -1 && item.raid_level !== null && item.raid_pokemon_id == null)))) {
            removeGymFromMap(item['gym_id'])
            return true
        }
    }

    if (!Store.get('showGyms') && Store.get('showRaids')) {
        if (item.raid_level < denyRaidLevelsBelow) {
            removeGymFromMap(item['gym_id'])
            return true
        }
    }

    if (Store.get('showGyms') && !Store.get('showRaids')) {
        item.raid_end = 0
        item.raid_level = item.raid_pokemon_cp = item.raid_pokemon_id = item.raid_pokemon_move_1 = item.raid_pokemon_move_1 = item.raid_pokemon_name = null
    }

    if (Store.get('activeRaids') && item.raid_end > Date.now()) {
        if ((item.raid_pokemon_id === undefined) || (item.raid_pokemon_id === null)) {
            removeGymFromMap(item['gym_id'])
            return true
        }
    }

    if (Store.get('filterRaidlevel')) {
        if (raidLevel < Store.get('minRaidLevel') && item.raid_end > Date.now()) {
            removeGymFromMap(item['gym_id'])
            return true
        }
        if (raidLevel > Store.get('maxRaidLevel') && item.raid_end > Date.now()) {
            removeGymFromMap(item['gym_id'])
            return true
        }
    }

    if (Store.get('exEligible') && (item.park === null || item.park === 0) && (item.sponsor === 0 || item.sponsor === undefined)) {
        removeGymFromMap(item['gym_id'])
        return true
    }

    if (Store.get('battleStatus')) {
        if (item.battle_status === 0 || ((Date.now() / 1000) - 900) > (item.last_scanned / 1000)) {
            removeGymFromMap(item['gym_id'])
            return true
        }
    }

    if (Store.get('showOpenGymsOnly')) {
        if (item.slots_available === 0 && (item.raid_end === undefined || item.raid_end < Date.now())) {
            removeGymFromMap(item['gym_id'])
            return true
        }
    }

    if (Store.get('showTeamGymsOnly') && Store.get('showTeamGymsOnly') !== item.team_id && (item.raid_end === undefined || item.raid_end < Date.now())) {
        removeGymFromMap(item['gym_id'])
        return true
    }


    if (Store.get('showLastUpdatedGymsOnly')) {
        var now = new Date()
        if (item.last_scanned == null) {
            if (Store.get('showLastUpdatedGymsOnly') * 3600 * 1000 + item.last_modified < now.getTime() && (item.raid_end === undefined || item.raid_end < Date.now())) {
                removeGymFromMap(item['gym_id'])
                return true
            }
        } else {
            if (Store.get('showLastUpdatedGymsOnly') * 3600 * 1000 + item.last_scanned < now.getTime() && (item.raid_end === undefined || item.raid_end < Date.now())) {
                removeGymFromMap(item['gym_id'])
                return true
            }
        }
    }
    if (Store.get('showNewGymsOnly')) {
        var filterMonthDate
        if (Store.get('showNewGymsOnly') !== '0') {
            filterMonthDate = new Date(Store.get('showNewGymsOnly'))
        } else {
            filterMonthDate = new Date('1970-01-01')
        }
        if (item.first_seen == null) {
            if (item.first_seen < filterMonthDate.valueOf()) {
                removeGymFromMap(item['gym_id'])
                return true
            }
        } else {
            if (item.first_seen < filterMonthDate.valueOf()) {
                removeGymFromMap(item['gym_id'])
                return true
            }
        }
    }

    if (gymLevel < Store.get('minGymLevel') && (item.raid_end === undefined || item.raid_end < Date.now())) {
        removeGymFromMap(item['gym_id'])
        return true
    }

    if (gymLevel > Store.get('maxGymLevel') && (item.raid_end === undefined || item.raid_end < Date.now())) {
        removeGymFromMap(item['gym_id'])
        return true
    }
    if (item['gym_id'] in mapData.gyms) {
        item.marker = updateGymMarker(item, mapData.gyms[item['gym_id']].marker)
    } else {
        // add marker to map and item to dict
        item.marker = setupGymMarker(item)
    }
    if (item.raid_start !== undefined && item.raid_start > Date.now()) {
        var delayStart = item.raid_start - Date.now()
        setTimeOut(item['gym_id'], item, delayStart)
    } else if (item.raid_end !== undefined && item.raid_end > Date.now()) {
        var delayEnd = item.raid_end - Date.now()
        setTimeOut(item['gym_id'], item, delayEnd)
    }
    mapData.gyms[item['gym_id']] = item
}

var timeoutHandles = []

function setTimeOut(id, item, time) {
    if (id in timeoutHandles) {
        clearTimeout(timeoutHandles[id])
    }
    timeoutHandles[id] = setTimeout(function () {
        processGyms(null, item)
    }, time + 1000)
}

function processSpawnpoints(i, item) {
    if (!Store.get('showSpawnpoints')) {
        return false
    }

    var id = item['spawnpoint_id']

    if (!(id in mapData.spawnpoints)) {
        // add marker to map and item to dict
        if (item.marker) {
            markersnotify.removeLayer(item.marker)
        }
        item.marker = setupSpawnpointMarker(item)
        mapData.spawnpoints[id] = item
    }
}

function updateSpawnPoints() {
    if (!Store.get('showSpawnpoints')) {
        return false
    }

    $.each(mapData.spawnpoints, function (key, value) {
        if (map.getBounds().contains(value.marker.getLatLng())) {
            var hue = getColorBySpawnTime(value['despawn_sec'])
            value.marker.setStyle({color: 'black', fillColor: hue})
        }
    })
}

function updateMap() {
    var position = map.getCenter()
    Store.set('startAtLastLocationPosition', {
        lat: position.lat,
        lng: position.lng
    })
    // lets try and get the s2 cell id in the middle
    var s2CellCenter = S2.keyToId(S2.latLngToKey(position.lat, position.lng, 10))
    if ((s2CellCenter) && (String(s2CellCenter) !== $('#currentWeather').data('current-cell')) && (map.getZoom() > 13)) {
        loadWeatherCellData(s2CellCenter).done(function (cellWeather) {
            var currentWeather = cellWeather.weather
            var currentCell = $('#currentWeather').data('current-cell')
            if ((currentWeather) && (currentCell !== currentWeather.s2_cell_id)) {
                $('#currentWeather').data('current-cell', currentWeather.s2_cell_id)
                $('#currentWeather').html('<img src="static/weather/' + currentWeather.condition + '.png" alt="" height="55px"">')
            } else if (!currentWeather) {
                $('#currentWeather').data('current-cell', '')
                $('#currentWeather').html('')
            }
        })
    }

    loadRawData().done(function (result) {
        $.each(result.pokemons, processPokemons)
        $.each(result.pokestops, processPokestops)
        $.each(result.badges, processBadges)
        $.each(result.gyms, processGyms)
        $.each(result.spawnpoints, processSpawnpoints)
        $.each(result.nests, processNests)
        $.each(result.communities, processCommunities)
        $.each(result.portals, processPortals)
        $.each(result.pois, processPois)
        showInBoundsMarkers(mapData.pokemons, 'pokemon')
        showInBoundsMarkers(mapData.gyms, 'gym')
        showInBoundsMarkers(mapData.pokestops, 'pokestop')
        showInBoundsMarkers(mapData.spawnpoints, 'inbound')

        clearStaleMarkers()

        /* if (Store.get('showCoveredPokestopCells') === true) {
            updateS2Overlay()
        } */

        updateSpawnPoints()
        updatePokestops()
        updatePortals()

        if ($('#stats').hasClass('visible')) {
            countMarkers(map)
        }

        oSwLat = result.oSwLat
        oSwLng = result.oSwLng
        oNeLat = result.oNeLat
        oNeLng = result.oNeLng

        lastgyms = result.lastgyms
        lastpokestops = result.lastpokestops
        lastpokemon = result.lastpokemon
        lastslocs = result.lastslocs
        lastspawns = result.lastspawns
        lastnests = result.lastnests
        lastcommunities = result.lastcommunities
        lastportals = result.lastportals
        lastpois = result.lastpois

        prevMinIV = result.preMinIV
        prevMinLevel = result.preMinLevel
        reids = result.reids
        qpreids = result.qpreids
        qireids = result.qireids
        greids = result.greids
        rbreids = result.rbreids
        rereids = result.rereids
        if (reids instanceof Array) {
            reincludedPokemon = reids.filter(function (e) {
                return this.indexOf(e) < 0
            }, reincludedPokemon)
        }
        if (qpreids instanceof Array) {
            reincludedQuestsPokemon = qpreids.filter(function (e) {
                return this.indexOf(e) < 0
            }, reincludedQuestsPokemon)
        }
        if (qireids instanceof Array) {
            reincludedQuestsItem = qireids.filter(function (e) {
                return this.indexOf(e) < 0
            }, reincludedQuestsItem)
        }
        if (greids instanceof Array) {
            reincludedGrunts = greids.filter(function (e) {
                return this.indexOf(e) < 0
            }, reincludedGrunts)
        }
        if (rbreids instanceof Array) {
            reincludedRaidbosses = rbreids.filter(function (e) {
                return this.indexOf(e) < 0
            }, reincludedRaidbosses)
        }
        if (rereids instanceof Array) {
            reincludedRaideggs = rereids.filter(function (e) {
                return this.indexOf(e) < 0
            }, reincludedRaideggs)
        }
        reloaddustamount = false
        timestamp = result.timestamp
        lastUpdateTime = Date.now()
        token = result.token
    })
}

function updateWeatherOverlay() {
    if (Store.get('showWeather')) {
        loadWeather().done(function (result) {
            if (weatherPolys.length === 0) {
                drawWeatherOverlay(result.weather)
            } else {
                // update layers
                destroyWeatherOverlay()
                drawWeatherOverlay(result.weather)
            }
            lastWeatherUpdateTime = Date.now()
        })
    }
}

function updateS2Overlay() {
    if ((Store.get('showCells'))) {
        if (Store.get('showExCells') && (map.getZoom() > 13)) {
            exLayerGroup.clearLayers()
            showS2Cells(13, {color: 'black', weight: 5, dashOffset: '8', dashArray: '2 6'})
        } else if (Store.get('showExCells') && (map.getZoom() <= 12)) {
            exLayerGroup.clearLayers()
        }
        if (Store.get('showGymCells') && (map.getZoom() > 14)) {
            gymLayerGroup.clearLayers()
            showS2Cells(14, {color: 'black', weight: 3, dashOffset: '4', dashArray: '2 6'})
        } else if (Store.get('showGymCells') && (map.getZoom() <= 14)) {
            gymLayerGroup.clearLayers()
        }
        if (Store.get('showStopCells') && (map.getZoom() > 16)) {
            stopLayerGroup.clearLayers()
            showS2Cells(17, {color: 'black'})
        } else if (Store.get('showStopCells') && (map.getZoom() <= 16)) {
            stopLayerGroup.clearLayers()
        }
    }
}

function drawWeatherOverlay(weather) {
    if (weather) {
        $.each(weather, function (idx, item) {
            weatherArray.push(S2.idToCornerLatLngs(item.s2_cell_id))
            var poly = L.polygon(weatherArray, {
                color: weatherColors[item.condition],
                opacity: 1,
                weight: 1,
                fillOpacity: weatherCellsFillOpacity
            })
            var bounds = new L.LatLngBounds()
            var i, center

            for (i = 0; i < weatherArray[0].length; i++) {
                bounds.extend(weatherArray[0][i])
            }
            center = bounds.getCenter()
            var icon = L.icon({
                iconSize: [30, 30],
                iconAnchor: [15, 15],
                iconUrl: 'static/weather/i-' + item.condition + '.png'
            })
            var marker = L.marker([center.lat, center.lng], {icon})
            weatherPolys.push(poly)
            weatherMarkers.push(marker)
            weatherLayerGroup.addLayer(poly)
            weatherArray = []
        })
        if (map.getZoom() <= 13) {
            $.each(weatherMarkers, function (index, marker) {
                markers.addLayer(marker)
            })
        }
    }
}

function destroyWeatherOverlay() {
    weatherLayerGroup.clearLayers()
    $.each(weatherMarkers, function (idx, marker) {
        markers.removeLayer(marker)
    })
    weatherPolys = []
    weatherMarkers = []
}

function drawScanPath(points) { // eslint-disable-line no-unused-vars
    var scanPathPoints = []
    $.each(points, function (idx, point) {
        scanPathPoints.push({
            lat: point['latitude'],
            lng: point['longitude']
        })
    })
    if (scanPath) {
        scanPath.setMap(null)
    }
    scanPath = new google.maps.Polyline({
        path: scanPathPoints,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2,
        map: map
    })
}

function redrawPokemon(pokemonList) {
    var skipNotification = true
    $.each(pokemonList, function (key, value) {
        var item = pokemonList[key]
        if (!item.hidden) {
            if (item.marker.rangeCircle) markers.removeLayer(item.marker.rangeCircle)
            var newMarker = setupPokemonMarker(item, map, this.marker.animationDisabled)
            customizePokemonMarker(newMarker, item, skipNotification)
            markers.removeLayer(item.marker)
            markersnotify.removeLayer(item.marker)
            pokemonList[key].marker = newMarker
        }
    })
}
function redrawGyms(gymList) {
    $.each(gymList, function (key, value) {
        var item = gymList[key]
        if (item.marker.rangeCircle) markers.removeLayer(item.marker.rangeCircle)
        var newMarker = setupGymMarker(item)
        markers.removeLayer(item.marker)
        gymList[key].marker = newMarker
    })
}

var updateLabelDiffTime = function updateLabelDiffTime() {
    $('.label-countdown').each(function (index, element) {
        var disappearsAt = getTimeUntil(parseInt(element.getAttribute('disappears-at')))

        var hours = disappearsAt.hour
        var minutes = disappearsAt.min
        var seconds = disappearsAt.sec
        var timestring = ''

        if (disappearsAt.time < disappearsAt.now) {
            if (element.hasAttribute('start')) {
                timestring = '(' + i8ln('started') + ')'
            } else if (element.hasAttribute('end')) {
                timestring = '(' + i8ln('ended') + ')'
            } else {
                timestring = '(' + i8ln('expired') + ')'
            }
        } else {
            timestring = '('
            if (hours > 0) {
                timestring += hours + 'h'
            }

            timestring += lpad(minutes, 2, 0) + 'm'
            timestring += lpad(seconds, 2, 0) + 's'
            timestring += ')'
        }

        $(element).text(timestring)
    })
    $('.label-countdown-bracketless').each(function (index, element) {
        var disappearsAt = getTimeUntil(parseInt(element.getAttribute('disappears-at')))

        var hours = disappearsAt.hour
        var minutes = disappearsAt.min
        var seconds = disappearsAt.sec
        var timestring = ''

        if (disappearsAt.time < disappearsAt.now) {
            if (element.hasAttribute('start')) {
                timestring = i8ln('started')
            } else if (element.hasAttribute('end')) {
                timestring = i8ln('ended')
            } else {
                timestring = i8ln('expired')
            }
        } else {
            timestring = ''
            if (hours > 0) {
                timestring += hours + 'h'
            }

            timestring += lpad(minutes, 2, 0) + 'm'
            timestring += lpad(seconds, 2, 0) + 's'
        }

        $(element).text(timestring)
    })
}

function generateRemainingTimer(timestamp, type) {
    var disappearsAt = getTimeUntil(parseInt(timestamp))
    var hours = disappearsAt.hour
    var minutes = disappearsAt.min
    var seconds = disappearsAt.sec
    var timestring = ''
    if (disappearsAt.time < disappearsAt.now) {
        if (type === 'start') {
            timestring = i8ln('started')
        } else if (type === 'end') {
            timestring = i8ln('ended')
        } else {
            timestring = i8ln('expired')
        }
    } else {
        if (hours > 0) {
            timestring += hours + 'h'
        }
        timestring += lpad(minutes, 2, 0) + 'm'
        timestring += lpad(seconds, 2, 0) + 's'
    }
    return timestring
}

function sendNotification(title, text, icon, lat, lon) {
    if (Store.get('remember_notification_notify')) {
        var notificationDetails = {
            icon: icon,
            body: text,
            data: {
                lat: lat,
                lon: lon
            }
        }

        if (Push._agents.desktop.isSupported()) {
            /* This will only run in browsers which support the old
             * Notifications API. Browsers supporting the newer Push API
             * are handled by serviceWorker.js. */
            notificationDetails.onClick = function (event) {
                if (Push._agents.desktop.isSupported()) {
                    window.focus()
                    event.currentTarget.close()
                    map.setView(new L.LatLng(lat, lon), 20)
                }
            }
        }

        /* Push.js requests the Notification permission automatically if
         * necessary. */
        Push.create(title, notificationDetails).catch(function () {
            sendToastrPokemonNotification(title, text, icon, lat, lon)
        })
    }
}

function sendToastrPokemonNotification(title, text, icon, lat, lon) {
    var notification = toastr.info(text, title, {
        closeButton: true,
        positionClass: 'toast-top-right',
        preventDuplicates: true,
        onclick: function () {
            centerMap(lat, lon, 20)
        },
        showDuration: '300',
        hideDuration: '500',
        timeOut: '6000',
        extendedTimeOut: '1500',
        showEasing: 'swing',
        hideEasing: 'linear',
        showMethod: 'fadeIn',
        hideMethod: 'fadeOut'
    })
    notification.removeClass('toast-info')
    notification.css({
        'padding-left': '74px',
        'background-image': `url('${icon}')`,
        'background-size': '48px',
        'background-color': '#0c5952'
    })
}

//
// Page Ready Execution
//

$(function () {
    /* If push.js is unsupported or disabled, fall back to toastr
     * notifications. */
    Push.config({
        serviceWorker: 'serviceWorker.min.js',
        fallback: function (notification) {
            sendToastrPokemonNotification(
                notification.title,
                notification.body,
                notification.icon,
                notification.data.lat,
                notification.data.lon
            )
        }
    })
})

function createMyLocationButton() {
    var _locationMarker = L.control({position: 'bottomright'})
    var locationContainer

    _locationMarker.onAdd = function (map) {
        locationContainer = L.DomUtil.create('div', '_locationMarker')

        var locationButton = document.createElement('button')
        locationButton.style.backgroundColor = '#fff'
        locationButton.style.border = 'none'
        locationButton.style.outline = 'none'
        locationButton.style.width = '28px'
        locationButton.style.height = '28px'
        locationButton.style.borderRadius = '15px'
        locationButton.style.boxShadow = '0 1px 4px rgba(0,0,0,0.3)'
        locationButton.style.cursor = 'pointer'
        locationButton.style.marginRight = '3px'
        locationButton.style.padding = '0px'
        locationButton.title = 'My Location'
        locationContainer.appendChild(locationButton)

        var locationIcon = document.createElement('div')
        locationIcon.style.margin = '5px'
        locationIcon.style.width = '18px'
        locationIcon.style.height = '18px'
        locationIcon.style.backgroundImage = 'url(static/mylocation-sprite-1x.png)'
        locationIcon.style.backgroundSize = '180px 18px'
        locationIcon.style.backgroundPosition = '0px 0px'
        locationIcon.style.backgroundRepeat = 'no-repeat'
        locationIcon.id = 'current-location'
        locationButton.appendChild(locationIcon)

        locationButton.addEventListener('click', function () {
            centerMapOnLocation()
        })

        return locationContainer
    }

    _locationMarker.addTo(map)
    locationContainer.index = 1

    map.on('dragend', function () {
        var currentLocation = document.getElementById('current-location')
        currentLocation.style.backgroundPosition = '0px 0px'
    })
}

function centerMapOnLocation() {
    var currentLocation = document.getElementById('current-location')
    if (currentLocation !== null) {
        var imgX = '0'
        var animationInterval = setInterval(function () {
            if (imgX === '-18') {
                imgX = '0'
            } else {
                imgX = '-18'
            }
            currentLocation.style.backgroundPosition = imgX + 'px 0'
        }, 500)
    }
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var latlng = new L.LatLng(position.coords.latitude, position.coords.longitude)
            locationMarker.setLatLng(latlng)
            map.setView(latlng)
            Store.set('followMyLocationPosition', {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            })
            clearInterval(animationInterval)
            if (currentLocation !== null) {
                currentLocation.style.backgroundPosition = '-144px 0px'
            }
        })
    } else {
        clearInterval(animationInterval)
        if (currentLocation !== null) {
            currentLocation.style.backgroundPosition = '0px 0px'
        }
    }
}

function centerMap(lat, lng, zoom) {
    var loc = new L.LatLng(lat, lng)

    map.setView(loc)

    if (zoom) {
        storeZoom = false
        map.setZoom(zoom)
    }
}

function i8ln(word) {
    if ($.isEmptyObject(i8lnDictionary) && languageLookups < languageLookupThreshold) {
        $.ajax({
            url: 'static/dist/locales/' + language + '.min.json',
            dataType: 'json',
            async: false,
            success: function success(data) {
                i8lnDictionary = data
            },
            error: function error(jqXHR, status, _error) {
                console.log('Error loading i8ln dictionary: ' + _error)
                languageLookups++
            }
        })
    }
    if (word in i8lnDictionary) {
        return i8lnDictionary[word]
    } else {
        // Word doesn't exist in dictionary return it as is
        return word
    }
}

function updateGeoLocation() {
    if (navigator.geolocation && Store.get('followMyLocation')) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var lat = position.coords.latitude
            var lng = position.coords.longitude
            var center = new L.LatLng(lat, lng)

            if (Store.get('followMyLocation')) {
                if (typeof locationMarker !== 'undefined') {
                    if (Store.get('followMap')) {
                        map.setView(center)
                    }
                    locationMarker.setLatLng(center)
                    if (Store.get('spawnArea')) {
                        if (locationMarker.rangeCircle) {
                            markers.removeLayer(locationMarker.rangeCircle)
                            markersnotify.removeLayer(locationMarker.rangeCircle)
                            delete locationMarker.rangeCircle
                        }
                        var rangeCircleOpts = {
                            color: '#FF9200',
                            radius: 35, // meters
                            center: center,
                            fillColor: '#FF9200',
                            fillOpacity: 0.4,
                            weight: 1
                        }
                        locationMarker.rangeCircle = L.circle(center, rangeCircleOpts)
                        markers.addLayer(locationMarker.rangeCircle)
                    }
                    Store.set('followMyLocationPosition', {
                        lat: lat,
                        lng: lng
                    })
                }
            }
        })
    }
}
function createUpdateWorker() {
    try {
        if (isMobileDevice() && window.Worker) {
            var updateBlob = new Blob(["onmessage = function(e) {\n                var data = e.data\n                if (data.name === 'backgroundUpdate') {\n                    self.setInterval(function () {self.postMessage({name: 'backgroundUpdate'})}, 5000)\n                }\n            }"])

            var updateBlobURL = window.URL.createObjectURL(updateBlob)

            updateWorker = new Worker(updateBlobURL)

            updateWorker.onmessage = function (e) {
                var data = e.data
                if (document.hidden && data.name === 'backgroundUpdate' && Date.now() - lastUpdateTime > 2500) {
                    updateMap()
                    updateGeoLocation()
                }
                if (document.hidden && data.name === 'backgroundUpdate' && Date.now() - lastWeatherUpdateTime > 60000) {
                    updateWeatherOverlay()
                }
            }

            updateWorker.postMessage({
                name: 'backgroundUpdate'
            })
        }
    } catch (ex) {
        console.log('Webworker error: ' + ex.message)
    }
}

function showGymDetails(id) { // eslint-disable-line no-unused-vars
    var sidebar = document.querySelector('#gym-details')
    var sidebarClose

    sidebar.classList.add('visible')

    var data = $.ajax({
        url: 'gym_data',
        type: 'POST',
        timeout: 300000,
        data: {
            'id': id,
            'token': token
        },
        dataType: 'json',
        cache: false
    })

    data.done(function (result) {
        var lastModifiedStr = getDateStr(result.last_modified) + ' ' + getTimeStr(result.last_modified)
        var lastScannedStr = ''
        if (result.last_scanned != null) {
            lastScannedStr =
                '<div style="font-size: .7em">' +
                i8ln('Last Scanned') + ' : ' + getDateStr(result.last_scanned) + ' ' + getTimeStr(result.last_scanned) +
                '</div>'
        }

        // var pokemon = result.pokemon !== undefined ? result.pokemon : []
        var freeSlots = result.slots_available
        var gymLevelStr = ''
        if (result.team_id !== 0) {
            gymLevelStr =
                '<center class="team-' + result.team_id + '-text">' +
                '<b class="team-' + result.team_id + '-text">' + freeSlots + ' ' + i8ln('Free Slots') + '</b>' +
                '</center>'
        }

        var battleStr = ''
        if (!noBattleStatus && result.battle_status === 1 && ((result.last_scanned / 1000) > ((Date.now() / 1000) - 900))) {
            battleStr = i8ln('Gym currently under attack!')
        }

        var park = ''
        if (((result['park'] !== '0' && result['park'] !== 'None' && result['park'] !== undefined && result['park']) && (noParkInfo === false))) {
            if (result['park'] === 1) {
                // RDM only stores boolean, so just call it "Park Gym"
                park = i8ln('Park Gym (Ex Eligible)')
            } else {
                park = i8ln('Park') + ': ' + result['park']
            }
        }

        var raidSpawned = result['raid_level'] != null
        var raidStarted = result['raid_pokemon_id'] != null
        var form = result['form']

        var raidStr = ''
        var raidIcon = ''
        if (manualRaids) {
            var rbList = generateRaidBossList()
        }
        if (raidSpawned && result.raid_end > Date.now()) {
            var levelStr = ''
            for (var i = 0; i < result['raid_level']; i++) {
                levelStr += '★'
            }
            raidStr = '<h3 style="margin-bottom: 0">Raid ' + levelStr
            if (raidStarted) {
                var cpStr = ''
                if (result.raid_pokemon_cp > 0) {
                    cpStr = ' WP ' + result.raid_pokemon_cp
                }
                raidStr += '<br>' + result.raid_pokemon_name
                if (form !== null && form > 0 && forms.length > form) {
                    // todo: check how rocket map handles this (if at all):
                    if (result['raid_pokemon_id'] === 132) {
                        raidStr += ' (' + idToPokemon[result['form']].name + ')'
                    } else {
                        raidStr += ' (' + forms[result['form']] + ')'
                    }
                }
                raidStr += cpStr
            }
            raidStr += '</h3>'
            if (raidStarted && result.raid_pokemon_move_1 > 0 && result.raid_pokemon_move_1 !== '133' && result.raid_pokemon_move_2 > 0 && result.raid_pokemon_move_2 !== '133') {
                var pMove1 = (moves[result['raid_pokemon_move_1']] !== undefined) ? i8ln(moves[result['raid_pokemon_move_1']]['name']) : 'gen/unknown'
                var pMove2 = (moves[result['raid_pokemon_move_2']] !== undefined) ? i8ln(moves[result['raid_pokemon_move_2']]['name']) : 'gen/unknown'
                raidStr += '<div><b>' + pMove1 + ' / ' + pMove2 + '</b></div>'
            }

            var raidStartStr = getTimeStr(result['raid_start'])
            var raidEndStr = getTimeStr(result['raid_end'])
            raidStr += '<div>' + i8ln('Start') + ': <b>' + raidStartStr + '</b> <span class="label-countdown" disappears-at="' + result['raid_start'] + '" start>(00m00s)</span></div>'
            raidStr += '<div>' + i8ln('End') + ': <b>' + raidEndStr + '</b> <span class="label-countdown" disappears-at="' + result['raid_end'] + '" end>(00m00s)</span></div>'

            if (raidStarted) {
                var raidForm = result['form']
                var formStr = ''
                if (raidForm <= 10 || raidForm == null || raidForm === '0') {
                    formStr = '00'
                } else {
                    formStr = raidForm
                }
                var pokemonid = result['raid_pokemon_id']
                var pokemonidStr = ''
                if (pokemonid <= 9) {
                    pokemonidStr = '00' + pokemonid
                } else if (pokemonid <= 99) {
                    pokemonidStr = '0' + pokemonid
                } else {
                    pokemonidStr = pokemonid
                }

                raidIcon = '<img style="width: 80px; -webkit-filter: drop-shadow(5px 5px 5px #222); filter: drop-shadow(5px 5px 5px #222);" src="' + iconpath + 'pokemon_icon_' + pokemonidStr + '_' + formStr + '.png"/>'
            } else if (result.raid_start <= Date.now()) {
                var hatchedEgg = ''
                if (result['raid_level'] <= 2) {
                    hatchedEgg = 'hatched_normal'
                } else if (result['raid_level'] <= 4) {
                    hatchedEgg = 'hatched_rare'
                } else {
                    hatchedEgg = 'hatched_legendary'
                }
                raidIcon = '<img style="width: 80px; -webkit-filter: drop-shadow(5px 5px 5px #222); filter: drop-shadow(5px 5px 5px #222);" src="static/raids/egg_' + hatchedEgg + '.png">'
            } else {
                var raidEgg = ''
                if (result['raid_level'] <= 2) {
                    raidEgg = 'normal'
                } else if (result['raid_level'] <= 4) {
                    raidEgg = 'rare'
                } else {
                    raidEgg = 'legendary'
                }
                raidIcon = '<img src="static/raids/egg_' + raidEgg + '.png">'
            }
        }
        if (!noDeleteGyms) {
            raidStr += '<i class="fa fa-trash-o delete-gym" onclick="deleteGym(event);" data-id="' + id + '"></i>'
        }
        if (!noToggleExGyms) {
            raidStr += '<i class="fa fa-trophy toggle-ex-gym" onclick="toggleExGym(event);" data-id="' + id + '"></i>'
        }
        if (manualRaids) {
            raidStr += '<i class="fa fa-binoculars submit-raid" onclick="$(this).toggleClass(\'open\');$(\'.raid-report\').slideToggle()" ></i>'
            raidStr += '<div class="raid-report">'
            raidStr += '<div style="margin:0px 10px;"><form>'
            raidStr += '<input type="hidden" value="' + id + '" id="gymId" name="gymId">'
            raidStr += '<div class=" switch-container">' +
                rbList +
                '</div>' +
                '<div class="mon-name" style="display:none;"></div>' +
                '<div class="switch-container timer-cont" style="display:none;">' +
                '<h5 class="timer-name" style="margin-bottom:0;"></h5>' +
                generateTimerLists() +
                '</div>' +
                '<button type="button" onclick="manualRaidData(event);" class="submitting-raid"><i class="fa fa-binoculars" style="margin-right:10px;"></i> ' + i8ln('Submit Raid') + '</button>' +
                '</form>' +
                '</div>' +
                '</div>'
        }

        var pokemonHtml = ''
        var headerHtml =
            '<center class="team-' + result.team_id + '-text">' +
            '<div>' +
            '<b class="team-' + result.team_id + '-text">' + (result.name || '') + '</b>' +
            '</div>' +
            '<div>' +
            '<img height="70px" style="padding: 5px;" src="static/forts/' + gymTypes[result.team_id] + '_large.png">' +
            raidIcon +
            '</div>' +
            raidStr +
            gymLevelStr +
            '<div>' +
            battleStr +
            '<br>' +
            park +
            '</div>' +
            '<div style="font-size: .7em">' +
            i8ln('Last Modified') + ' : ' + lastModifiedStr +
            '</div>' +
            lastScannedStr +
            '<div>' +
            '<a href=\'javascript:void(0)\' onclick=\'javascript:openMapDirections(' + result.latitude + ',' + result.longitude + ')\' title=\'' + i8ln('View in Maps') + '\'>' + i8ln('Route') + '</a> - <a href="./?lat=' + result.latitude + '&lon=' + result.longitude + '&zoom=16">' + i8ln('Maplink') + '</a>' +
            '</div>' +
            '</center>'

        var pokemonIdStr = ''
        if (result.guard_pokemon_id <= 9) {
            pokemonIdStr = '00' + result.guard_pokemon_id
        } else if (result.guard_pokemon_id <= 99) {
            pokemonIdStr = '0' + result.guard_pokemon_id
        } else {
            pokemonIdStr = result.guard_pokemon_id
        }
        var guardFormStr = ''
        if (result.guard_pokemon_form === '0' || result.guard_pokemon_form === null || result.guard_pokemon_form === 0 || result.guard_pokemon_form === undefined) {
            guardFormStr = '00'
        } else {
            guardFormStr = result.guard_pokemon_form
        }
        pokemonHtml =
                '<center class="team-' + result.team_id + '-text">' +
                i8ln('Defender') + ':<br>' +
                '<img src="' + iconpath + 'pokemon_icon_' + pokemonIdStr + '_' + guardFormStr + '.png"/><br>' +
                '<b class="team-' + result.team_id + '-text">' + result.guard_pokemon_name + '</b>' +
                '</center>'

        sidebar.innerHTML = headerHtml + pokemonHtml
        sidebarClose = document.createElement('a')
        sidebarClose.href = '#'
        sidebarClose.className = 'close'
        sidebarClose.tabIndex = 0
        sidebar.appendChild(sidebarClose)

        sidebarClose.addEventListener('click', function (event) {
            event.preventDefault()
            event.stopPropagation()
            sidebar.classList.remove('visible')
        })
        token = result.token
    })
}

function toggleGymPokemonDetails(e) { // eslint-disable-line no-unused-vars
    e.lastElementChild.firstElementChild.classList.toggle('fa-angle-double-up')
    e.lastElementChild.firstElementChild.classList.toggle('fa-angle-double-down')
    e.nextElementSibling.classList.toggle('visible')
}

function fetchCriesJson() {
    $.ajax({
        'global': false,
        'url': 'static/dist/data/cries.min.json',
        'dataType': 'json',
        'success': function (data) {
            cries = data
            createjs.Sound.alternateExtensions = ['mp3']
            createjs.Sound.registerSounds(cries, assetsPath)
        }
    })
}

function pokemonSubmitFilter(event) { // eslint-disable-line no-unused-vars
    var img = $(event.target).parent()
    var cont = img.parent().parent().parent()
    var select = cont.find('input.pokemonID')
    var id = img.data('value').toString()
    select.val(id)
    cont.find('.pokemon-icon-sprite').removeClass('active')
    img.addClass('active')
}

function pokemonRaidFilter(event) { // eslint-disable-line no-unused-vars
    var img = $(event.target).parent()
    var label = img.data('label')
    var cont = img.parent().parent()
    var select = cont.find('input')
    var id = img.data('value').toString()
    var par = cont.parent()
    par.find('.mon-name').text(label).show()
    par.find('.timer-cont').show()
    var text = i8ln('Time Remaining (mins)')
    if (id.includes('egg')) {
        text = i8ln('Time Until Hatch (mins)')
        par.find('.mon_time').hide()
        par.find('.egg_time').show()
    } else {
        par.find('.mon_time').show()
        par.find('.egg_time').hide()
    }
    par.find('.timer-name').text(i8ln(text))
    select.val(id)
    cont.find('.pokemon-icon-sprite').removeClass('active')
    img.addClass('active')
}
function generateRaidBossList() {
    var boss = raidBossActive
    var data = '<div class="pokemon-list raid-submission">'
    data += '<input type="hidden" name="pokemonId" value="">'
    data += '<span class="pokemon-icon-sprite" data-value="egg_1" data-label="Level 1" onclick="pokemonRaidFilter(event);"><span class="egg_1 inner-bg" style="background: url(\'static/raids/egg_normal.png\');background-size:100%"></span><span class="egg-number">1</span></span>'
    data += '<span class="pokemon-icon-sprite" data-value="egg_2" data-label="Level 2" onclick="pokemonRaidFilter(event);"><span class="egg_2 inner-bg" style="background: url(\'static/raids/egg_normal.png\');background-size:100%"></span><span class="egg-number">2</span></span>'
    data += '<span class="pokemon-icon-sprite" data-value="egg_3" data-label="Level 3" onclick="pokemonRaidFilter(event);"><span class="egg_3 inner-bg" style="background: url(\'static/raids/egg_rare.png\');background-size:100%"></span><span class="egg-number">3</span></span>'
    data += '<span class="pokemon-icon-sprite" data-value="egg_4" data-label="Level 4" onclick="pokemonRaidFilter(event);"><span class="egg_4 inner-bg" style="background: url(\'static/raids/egg_rare.png\');background-size:100%"></span><span class="egg-number">4</span></span>'
    data += '<span class="pokemon-icon-sprite" data-value="egg_5" data-label="Level 5" onclick="pokemonRaidFilter(event);"><span class="egg_5 inner-bg" style="background: url(\'static/raids/egg_legendary.png\');background-size:100%"></span><span class="egg-number">5</span></span>'
    boss.forEach(function (element) {
        var pokemonIdStr = ''
        if (element <= 9) {
            pokemonIdStr = '00' + element
        } else if (element <= 99) {
            pokemonIdStr = '0' + element
        } else {
            pokemonIdStr = element
        }
        data += '<span class="pokemon-icon-sprite" data-value="' + element + '" data-label="' + pokeList[element - 1].name + '" onclick="pokemonRaidFilter(event);"><img src="' + iconpath + 'pokemon_icon_' + pokemonIdStr + '_00.png" style="width:48px;height:48px;"/></span>'
    })
    data += '</div>'
    return data
}


function pokemonSpritesFilter() {
    jQuery('.pokemon-list').parent().find('.select2').hide()
    loadDefaultImages()
    jQuery('#nav .pokemon-list .pokemon-icon-sprite').on('click', function () {
        var img = jQuery(this)
        var select = jQuery(this).parent().parent().parent().find('.select2-hidden-accessible')
        var value = select.val().split(',')
        var id = img.data('value').toString()
        if (img.hasClass('active')) {
            select.val(value.filter(function (elem) {
                return elem !== id
            }).join(',')).trigger('change')
            img.removeClass('active')
        } else {
            select.val((value.concat(id).join(','))).trigger('change')
            img.addClass('active')
        }
    })
}

function itemSpritesFilter() {
    jQuery('.item-list').parent().find('.select2').hide()
    loadDefaultImages()
    jQuery('#nav .item-list .item-icon-sprite').on('click', function () {
        var img = jQuery(this)
        var select = jQuery(this).parent().parent().parent().find('.select2-hidden-accessible')
        var value = select.val().split(',')
        var id = img.data('value').toString()
        if (img.hasClass('active')) {
            select.val(value.filter(function (elem) {
                return elem !== id
            }).join(',')).trigger('change')
            img.removeClass('active')
        } else {
            select.val((value.concat(id).join(','))).trigger('change')
            img.addClass('active')
        }
    })
}

function gruntSpritesFilter() {
    jQuery('.grunt-list').parent().find('.select2').hide()
    loadDefaultImages()
    jQuery('#nav .grunt-list .grunt-icon-sprite').on('click', function () {
        var img = jQuery(this)
        var select = jQuery(this).parent().parent().parent().find('.select2-hidden-accessible')
        var value = select.val().split(',')
        var id = img.data('value').toString()
        if (img.hasClass('active')) {
            select.val(value.filter(function (elem) {
                return elem !== id
            }).join(',')).trigger('change')
            img.removeClass('active')
        } else {
            select.val((value.concat(id).join(','))).trigger('change')
            img.addClass('active')
        }
    })
}
function raidbossSpritesFilter() {
    jQuery('.raidboss-list').parent().find('.select2').hide()
    loadDefaultImages()
    jQuery('#nav .raidboss-list .raidboss-icon-sprite').on('click', function () {
        var img = jQuery(this)
        var select = jQuery(this).parent().parent().parent().find('.select2-hidden-accessible')
        var value = select.val().split(',')
        var id = img.data('value').toString()
        if (img.hasClass('active')) {
            select.val(value.filter(function (elem) {
                return elem !== id
            }).join(',')).trigger('change')
            img.removeClass('active')
        } else {
            select.val((value.concat(id).join(','))).trigger('change')
            img.addClass('active')
        }
    })
}
function raideggsSpritesFilter() {
    jQuery('.raideggs-list').parent().find('.select2').hide()
    loadDefaultImages()
    jQuery('#nav .raideggs-list .raideggs-icon-sprite').on('click', function () {
        var img = jQuery(this)
        var select = jQuery(this).parent().parent().parent().find('.select2-hidden-accessible')
        var value = select.val().split(',')
        var id = img.data('value').toString()
        if (img.hasClass('active')) {
            select.val(value.filter(function (elem) {
                return elem !== id
            }).join(',')).trigger('change')
            img.removeClass('active')
        } else {
            select.val((value.concat(id).join(','))).trigger('change')
            img.addClass('active')
        }
    })
}
function loadDefaultImages() {
    var ep = Store.get('remember_select_exclude')
    var eminiv = Store.get('remember_select_exclude_min_iv')
    var en = Store.get('remember_select_notify')
    var eqp = Store.get('remember_quests_exclude_pokemon')
    var eqi = Store.get('remember_quests_exclude_item')
    var eg = Store.get('remember_exclude_grunts')
    var erb = Store.get('remember_exclude_raidbosses')
    var ere = Store.get('remember_exclude_raideggs')
    $('label[for="exclude-pokemon"] .pokemon-icon-sprite').each(function () {
        if (ep.indexOf($(this).data('value')) !== -1) {
            $(this).addClass('active')
        }
    })
    $('label[for="exclude-min-iv"] .pokemon-icon-sprite').each(function () {
        if (eminiv.indexOf($(this).data('value')) !== -1) {
            $(this).addClass('active')
        }
    })
    $('label[for="notify-pokemon"] .pokemon-icon-sprite').each(function () {
        if (en.indexOf($(this).data('value')) !== -1) {
            $(this).addClass('active')
        }
    })
    $('label[for="exclude-quests-pokemon"] .pokemon-icon-sprite').each(function () {
        if (eqp.indexOf($(this).data('value')) !== -1) {
            $(this).addClass('active')
        }
    })
    $('label[for="exclude-quests-item"] .item-icon-sprite').each(function () {
        if (eqi.indexOf($(this).data('value')) !== -1) {
            $(this).addClass('active')
        }
    })
    $('label[for="exclude-grunts"] .grunt-icon-sprite').each(function () {
        if (eg.indexOf($(this).data('value')) !== -1) {
            $(this).addClass('active')
        }
    })
    $('label[for="exclude-raidbosses"] .raidboss-icon-sprite').each(function () {
        if (erb.indexOf($(this).data('value')) !== -1) {
            $(this).addClass('active')
        }
    })
    $('label[for="exclude-raideggs"] .raideggs-icon-sprite').each(function () {
        if (ere.indexOf($(this).data('value')) !== -1) {
            $(this).addClass('active')
        }
    })
}

//
// Page Ready Exection
//

$(function () {
    if (Push.Permission.has()) {
        console.log('Push has notification permission')
        return
    }

    Push.Permission.request()
})

$(function () {
    if (Store.get('playCries')) {
        fetchCriesJson()
    }
    // load MOTD, if set
    if (motd) {
        $.ajax({
            url: 'motd_data',
            type: 'POST',
            dataType: 'json',
            cache: false,
            success: function (data) {
                // set content of motd banner
                $('#motd').attr('title', data.title).html(data.content).dialog()
            },
            fail: function () {
                return false
            }
        })
    }
})

$(function () {
    // populate Navbar Style menu
    $selectStyle = $('#map-style')
    $selectDirectionProvider = $('#direction-provider')

    // Load Stylenames, translate entries, and populate lists
    $.getJSON('static/dist/data/mapstyle.min.json').done(function (data) {
        var styleList = []

        $.each(data, function (key, value) {
            var googleMaps
            if (gmapsKey === '') {
                googleMaps = false
            } else {
                googleMaps = true
            }
            var googleStyle = value.includes('Google')
            var customTileServer
            if (noCustomTileServer) {
                customTileServer = false
            } else {
                customTileServer = true
            }
            var customTileServerStyle = value.includes('Tileserver')
            if (customTileServer && customTileServerStyle) {
                styleList.push({
                    id: key,
                    text: i8ln(value)
                })
            } else if (!googleMaps && !googleStyle && !customTileServerStyle) {
                styleList.push({
                    id: key,
                    text: i8ln(value)
                })
            } else if (googleMaps) {
                styleList.push({
                    id: key,
                    text: i8ln(value)
                })
            }
        })

        // setup the stylelist
        $selectStyle.select2({
            placeholder: 'Select Style',
            data: styleList,
            minimumResultsForSearch: Infinity
        })
        $selectStyle.on('change', function (e) {
            selectedStyle = $selectStyle.val()
            setTileLayer(selectedStyle)
            Store.set('map_style', selectedStyle)
        })

        // recall saved mapstyle
        $selectStyle.val(Store.get('map_style')).trigger('change')
    })
    $selectDirectionProvider.select2({
        placeholder: 'Select Provider',
        minimumResultsForSearch: Infinity
    })

    $selectDirectionProvider.on('change', function () {
        directionProvider = $selectDirectionProvider.val()
        Store.set('directionProvider', directionProvider)
    })

    $selectDirectionProvider.val(Store.get('directionProvider')).trigger('change')

    $selectIconSize = $('#pokemon-icon-size')

    $selectIconSize.select2({
        placeholder: 'Select Icon Size',
        minimumResultsForSearch: Infinity
    })

    $selectIconSize.on('change', function () {
        Store.set('iconSizeModifier', this.value)
        redrawPokemon(mapData.pokemons)
    })

    $selectIconNotifySizeModifier = $('#pokemon-icon-notify-size')

    $selectIconNotifySizeModifier.select2({
        placeholder: 'Increase Size Of Notified',
        minimumResultsForSearch: Infinity
    })

    $selectIconNotifySizeModifier.on('change', function () {
        Store.set('iconNotifySizeModifier', this.value)
        redrawPokemon(mapData.pokemons)
    })

    $switchOpenGymsOnly = $('#open-gyms-only-switch')

    $switchOpenGymsOnly.on('change', function () {
        Store.set('showOpenGymsOnly', this.checked)
        lastgyms = false
        updateMap()
    })

    $selectTeamGymsOnly = $('#team-gyms-only-switch')

    $selectTeamGymsOnly.select2({
        placeholder: 'Only Show Gyms For Team',
        minimumResultsForSearch: Infinity
    })

    $selectTeamGymsOnly.on('change', function () {
        Store.set('showTeamGymsOnly', this.value)
        lastgyms = false
        updateMap()
    })

    $selectLastUpdateGymsOnly = $('#last-update-gyms-switch')

    $selectLastUpdateGymsOnly.select2({
        placeholder: 'Only Show Gyms Last Updated',
        minimumResultsForSearch: Infinity
    })

    $selectLastUpdateGymsOnly.on('change', function () {
        Store.set('showLastUpdatedGymsOnly', this.value)
        lastgyms = false
        updateMap()
    })

    $selectNewGymsOnly = $('#new-gyms-switch')

    $selectNewGymsOnly.select2({
        placeholder: Store.get('showNewGymsOnly'),
        minimumResultsForSearch: Infinity
    })

    $selectNewGymsOnly.on('change', function () {
        Store.set('showNewGymsOnly', this.value)
        lastgyms = false
        updateMap()
        updateGymIcons()
    })

    $selectNewPokestopsOnly = $('#new-pokestops-switch')

    $selectNewPokestopsOnly.select2({
        placeholder: Store.get('showNewPokestopsOnly'),
        minimumResultsForSearch: Infinity
    })

    $selectNewPokestopsOnly.on('change', function () {
        Store.set('showNewPokestopsOnly', this.value)
        lastpokestops = false
        updateMap()
        $.each(mapData.pokestops, function (key, value) {
            markers.removeLayer(value.marker)
            value.marker = setupPokestopMarker(value)
        })
    })

    $selectMinGymLevel = $('#min-level-gyms-filter-switch')

    $selectMinGymLevel.select2({
        placeholder: 'Minimum Gym Level',
        minimumResultsForSearch: Infinity
    })

    $selectMinGymLevel.on('change', function () {
        Store.set('minGymLevel', this.value)
        lastgyms = false
        updateMap()
    })

    $selectMaxGymLevel = $('#max-level-gyms-filter-switch')

    $selectMaxGymLevel.select2({
        placeholder: 'Maximum Gym Level',
        minimumResultsForSearch: Infinity
    })

    $selectMaxGymLevel.on('change', function () {
        Store.set('maxGymLevel', this.value)
        lastgyms = false
        updateMap()
    })

    $switchActiveRaids = $('#active-raids-switch')

    $switchActiveRaids.on('change', function () {
        Store.set('activeRaids', this.checked)
        lastgyms = false
        updateMap()
    })

    $selectMinRaidLevel = $('#min-level-raids-filter-switch')

    $selectMinRaidLevel.select2({
        placeholder: Store.get('minRaidLevel').toString(),
        minimumResultsForSearch: Infinity
    })

    $selectMinRaidLevel.on('change', function () {
        Store.set('minRaidLevel', this.value)
        lastgyms = false
        updateMap()
    })

    $selectMaxRaidLevel = $('#max-level-raids-filter-switch')

    $selectMaxRaidLevel.select2({
        placeholder: Store.get('maxRaidLevel').toString(),
        minimumResultsForSearch: Infinity
    })

    $selectMaxRaidLevel.on('change', function () {
        Store.set('maxRaidLevel', this.value)
        lastgyms = false
        updateMap()
    })

    $selectNewPortalsOnly = $('#new-portals-only-switch')

    $selectNewPortalsOnly.select2({
        placeholder: 'Only Show New Portals',
        minimumResultsForSearch: Infinity
    })

    $selectNewPortalsOnly.on('change', function () {
        Store.set('showNewPortalsOnly', this.value)
        lastportals = false
        updateMap()
    })

    $switchGymSidebar = $('#gym-sidebar-switch')

    $switchGymSidebar.on('change', function () {
        Store.set('useGymSidebar', this.checked)
        lastgyms = false
        $.each(['gyms'], function (d, dType) {
            $.each(mapData[dType], function (key, value) {
                // for any marker you're turning off, you'll want to wipe off the range
                if (mapData[dType][key].marker.rangeCircle) {
                    markers.removeLayer(mapData[dType][key].marker.rangeCircle)
                    delete mapData[dType][key].marker.rangeCircle
                }
                markers.removeLayer(mapData[dType][key].marker)
            })
            mapData[dType] = {}
        })
        updateMap()
    })
    $switchExEligible = $('#ex-eligible-switch')

    $switchExEligible.on('change', function () {
        Store.set('exEligible', this.checked)
        lastgyms = false
        $.each(['gyms'], function (d, dType) {
            $.each(mapData[dType], function (key, value) {
                // for any marker you're turning off, you'll want to wipe off the range
                if (mapData[dType][key].marker.rangeCircle) {
                    markers.removeLayer(mapData[dType][key].marker.rangeCircle)
                    delete mapData[dType][key].marker.rangeCircle
                }
                markers.removeLayer(mapData[dType][key].marker)
            })
            mapData[dType] = {}
        })
        updateMap()
    })

    $switchWeatherIcons = $('#weather-icon-switch')
    $switchWeatherIcons.on('change', function () {
        Store.set('showWeatherIcons', this.checked)
        redrawPokemon(mapData.pokemons)
    })

    $switchPokeIVIcons = $('#iv-icon-switch')
    $switchPokeIVIcons.on('change', function () {
        Store.set('showIVIcons', this.checked)
        redrawPokemon(mapData.pokemons)
    })

    $switchBattleStatus = $('#battle-status-switch')

    $switchBattleStatus.on('change', function () {
        Store.set('battleStatus', this.checked)
        lastgyms = false
        $.each(['gyms'], function (d, dType) {
            $.each(mapData[dType], function (key, value) {
                // for any marker you're turning off, you'll want to wipe off the range
                if (mapData[dType][key].marker.rangeCircle) {
                    markers.removeLayer(mapData[dType][key].marker.rangeCircle)
                    delete mapData[dType][key].marker.rangeCircle
                }
                markers.removeLayer(mapData[dType][key].marker)
            })
            mapData[dType] = {}
        })
        updateMap()
    })

    $switchBadgeMode = $('#badge-mode-switch')

    $switchBadgeMode.on('change', function () {
        Store.set('badgeMode', this.checked)
        lastgyms = false
        updateGymIcons()
        redrawGyms(mapData.gyms)
    })

    $selectLocationIconMarker = $('#locationmarker-style')

    $.getJSON('static/dist/data/searchmarkerstyle.min.json').done(function (data) {
        searchMarkerStyles = data
        var searchMarkerStyleList = []

        $.each(data, function (key, value) {
            searchMarkerStyleList.push({
                id: key,
                text: value.name
            })
        })

        locationMarker = createLocationMarker()

        if (Store.get('startAtUserLocation') && !locationSet) {
            centerMapOnLocation()
        }
        if (Store.get('startAtLastLocation') && !locationSet) {
            var position = Store.get('startAtLastLocationPosition')
            var lat = 'lat' in position ? position.lat : centerLat
            var lng = 'lng' in position ? position.lng : centerLng
            var latlng = new L.LatLng(lat, lng)
            map.setView(latlng)
        }

        $selectLocationIconMarker.select2({
            placeholder: 'Select Location Marker',
            data: searchMarkerStyleList,
            minimumResultsForSearch: Infinity
        })

        $selectLocationIconMarker.on('change', function (e) {
            Store.set('locationMarkerStyle', this.value)
            updateLocationMarker(this.value)
        })

        $selectLocationIconMarker.val(Store.get('locationMarkerStyle')).trigger('change')
    })

    $selectGymMarkerStyle = $('#gym-marker-style')

    $selectGymMarkerStyle.select2({
        placeholder: 'Select Style',
        minimumResultsForSearch: Infinity
    })

    $selectGymMarkerStyle.on('change', function (e) {
        Store.set('gymMarkerStyle', this.value)
        updateGymIcons()
    })

    $selectGymMarkerStyle.val(Store.get('gymMarkerStyle')).trigger('change')
    pokemonSpritesFilter()
    itemSpritesFilter()

    // Overlay Styling
    $selectOverlayStyle = $('#design-style')

    $selectOverlayStyle.select2({
        placeholder: 'Select Style',
        minimumResultsForSearch: Infinity
    })
    $selectOverlayStyle.on('change', function (e) {
        Store.set('designStyle', this.value)
        document.documentElement.style.setProperty('--overview-style', Store.get('designStyle'))
        if (document.getElementById('header') != null) document.getElementById('header').style.backgroundImage = Store.get('designStyle')
        if (document.getElementById('search-button') != null) document.getElementById('search-button').style.backgroundImage = Store.get('designStyle')
        if (document.getElementsByClassName('settings') != null) [].forEach.call(document.getElementsByClassName('settings'), function (button) { button.style.backgroundImage = Store.get('designStyle') })
    })
    $selectOverlayStyle.val(Store.get('designStyle')).trigger('change')

    // Icon Styling
    $selectIconStyle = $('#icon-style')

    $selectIconStyle.select2({
        placeholder: 'Select Style',
        minimumResultsForSearch: Infinity
    })

    $selectIconStyle.on('change', function (e) {
        Store.set('icons', this.value)
        var port = ''
        if (window.location.port.length > 0) {
            port = ':' + window.location.port
        }
        var path = window.location.protocol + '//' + window.location.hostname + port + window.location.pathname
        var r = new RegExp('^(?:[a-z]+:)?//', 'i')
        iconpath = r.test(Store.get('icons')) ? Store.get('icons') : path + Store.get('icons')
        redrawPokemon(mapData.pokemons)
    })
    $selectIconStyle.val(Store.get('icons')).trigger('change')
    gruntSpritesFilter()
    raidbossSpritesFilter()
    raideggsSpritesFilter()
})

$(function () {
    function formatState(state) {
        if (!state.id) {
            return state.text
        }
        var $state = $('<span><i class="pokemon-raid-sprite n' + state.element.value.toString() + '" style="display: inline-block;position: relative;top: 6px; right: 0px;"></i> ' + state.text + '</span>')
        return $state
    }

    $.getJSON('static/dist/data/moves.min.json').done(function (data) {
        moves = data
    })

    $.getJSON('static/dist/data/weather.min.json').done(function (data) {
        weather = data.weather
        boostedMons = data.boosted_mons
    })

    $.getJSON('static/dist/data/questtype.min.json').done(function (data) {
        $.each(data, function (key, value) {
            questtypeList[key] = value['text']
        })
    })

    $.getJSON('static/dist/data/rewardtype.min.json').done(function (data) {
        $.each(data, function (key, value) {
            rewardtypeList[key] = value['text']
        })
    })

    $.getJSON('static/dist/data/conditiontype.min.json').done(function (data) {
        $.each(data, function (key, value) {
            conditiontypeList[key] = value['text']
        })
    })

    $.getJSON(geoJSONfile).done(function (data) {
        $.each(data.features, function (key, value) {
            scanAreas.push(value)
        })
    })
    $selectExclude = $('#exclude-pokemon')
    $selectExcludeMinIV = $('#exclude-min-iv')
    $selectPokemonNotify = $('#notify-pokemon')
    $textPerfectionNotify = $('#notify-perfection')
    $textMinIV = $('#min-iv')
    $textMinLevel = $('#min-level')
    $textLevelNotify = $('#notify-level')
    $raidNotify = $('#notify-raid')
    $switchTinyRat = $('#tiny-rat-switch')
    $switchBigKarp = $('#big-karp-switch')
    $questsExcludePokemon = $('#exclude-quests-pokemon')
    $questsExcludeItem = $('#exclude-quests-item')
    $excludeGrunts = $('#exclude-grunts')
    $excludeRaidbosses = $('#exclude-raidbosses')
    $excludeRaideggs = $('#exclude-raideggs')

    $.getJSON('static/dist/data/grunttype.min.json').done(function (data) {
        $.each(data, function (key, value) {
            gruntList.push({
                id: key,
                name: i8ln(value['type']),
                gender: i8ln(value['grunt'])
            })
            value['type'] = i8ln(value['type'])
            value['grunt'] = i8ln(value['grunt'])
            idToGrunt[key] = value
        })
        $excludeGrunts.select2({
            placeholder: i8ln('Select Grunt'),
            data: gruntList,
            templateResult: formatState,
            multiple: true,
            maximumSelectionSize: 1
        })
        $excludeGrunts.on('change', function (e) {
            buffer = excludedGrunts
            excludedGrunts = $excludeGrunts.val().split(',').map(Number).sort(function (a, b) {
                return parseInt(a) - parseInt(b)
            })
            buffer = buffer.filter(function (e) {
                return this.indexOf(e) < 0
            }, excludedGrunts)
            reincludedGrunts = reincludedGrunts.concat(buffer).map(String)
            updateMap()
            Store.set('remember_exclude_grunts', excludedGrunts)
        })
        $excludeGrunts.val(Store.get('remember_exclude_grunts')).trigger('change')
    })
    $.getJSON('static/dist/data/items.min.json').done(function (data) {
        $.each(data, function (key, value) {
            itemList.push({
                id: key,
                name: i8ln(value['name'])
            })
            value['name'] = i8ln(value['name'])
            idToItem[key] = value
        })
        $questsExcludeItem.select2({
            placeholder: i8ln('Select Item'),
            data: itemList,
            templateResult: formatState,
            multiple: true,
            maximumSelectionSize: 1
        })
        $questsExcludeItem.on('change', function (e) {
            buffer = questsExcludedItem
            questsExcludedItem = $questsExcludeItem.val().split(',').map(Number).sort(function (a, b) {
                return parseInt(a) - parseInt(b)
            })
            buffer = buffer.filter(function (e) {
                return this.indexOf(e) < 0
            }, questsExcludedItem)
            reincludedQuestsItem = reincludedQuestsItem.concat(buffer).map(String)
            updateMap()
            Store.set('remember_quests_exclude_item', questsExcludedItem)
        })
        $questsExcludeItem.val(Store.get('remember_quests_exclude_item')).trigger('change')
    })

    $.getJSON('static/dist/data/pokemon.min.json').done(function (data) {
        // Raideggs
        var eggLevel = 1
        while (eggLevel <= 5) {
            raideggsList.push({
                level: eggLevel
            })
            eggLevel++
        }
        $.each(data, function (key, value) {
            if (key > numberOfPokemon) {
                return false
            }
            var _types = []
            raidbossList.push({
                id: key,
                name: i8ln(value['name'])
            })
            pokeList.push({
                id: key,
                text: i8ln(value['name']) + ' - #' + key,
                name: i8ln(value['name']),
                level: value['level'] !== undefined ? value['level'] : 1,
                cp: value['cp'] !== undefined ? value['cp'] : 1
            })
            value['name'] = i8ln(value['name'])
            $.each(value['types'], function (key, pokemonType) {
                _types.push({
                    'type': i8ln(pokemonType['type']),
                    'color': pokemonType['color']
                })
            })
            value['types'] = _types
            idToPokemon[key] = value
        })

        // setup the filter lists
        $selectExclude.select2({
            placeholder: i8ln('Select Pokémon'),
            data: pokeList,
            templateResult: formatState,
            multiple: true,
            maximumSelectionSize: 1
        })
        $selectPokemonNotify.select2({
            placeholder: i8ln('Select Pokémon'),
            data: pokeList,
            templateResult: formatState,
            multiple: true,
            maximumSelectionSize: 1
        })
        $selectExcludeMinIV.select2({
            placeholder: i8ln('Select Pokémon'),
            data: pokeList,
            templateResult: formatState
        })
        $questsExcludePokemon.select2({
            placeholder: i8ln('Select Pokémon'),
            data: pokeList,
            templateResult: formatState,
            multiple: true,
            maximumSelectionSize: 1
        })
        // setup list change behavior now that we have the list to work from
        $excludeRaidbosses.select2({
            placeholder: i8ln('Select Raidboss'),
            data: raidbossList,
            templateResult: formatState,
            multiple: true,
            maximumSelectionSize: 1
        })
        $excludeRaidbosses.on('change', function (e) {
            buffer = excludedRaidbosses
            excludedRaidbosses = $excludeRaidbosses.val().split(',').map(Number).sort(function (a, b) {
                return parseInt(a) - parseInt(b)
            })
            buffer = buffer.filter(function (e) {
                return this.indexOf(e) < 0
            }, excludedRaidbosses)
            reincludedRaidbosses = reincludedRaidbosses.concat(buffer).map(String)
            lastgyms = false
            updateMap()
            Store.set('remember_exclude_raidbosses', excludedRaidbosses)
        })
        $excludeRaideggs.select2({
            placeholder: i8ln('Select Raidegg'),
            data: raideggsList,
            templateResult: formatState,
            multiple: true,
            maximumSelectionSize: 1
        })
        $excludeRaideggs.on('change', function (e) {
            buffer = excludedRaideggs
            excludedRaideggs = $excludeRaideggs.val().split(',').map(Number).sort(function (a, b) {
                return parseInt(a) - parseInt(b)
            })
            buffer = buffer.filter(function (e) {
                return this.indexOf(e) < 0
            }, excludedRaideggs)
            reincludedRaideggs = reincludedRaideggs.concat(buffer).map(String)
            lastgyms = false
            updateMap()
            Store.set('remember_exclude_raideggs', excludedRaideggs)
        })
        $selectExclude.on('change', function (e) {
            buffer = excludedPokemon
            excludedPokemon = $selectExclude.val().split(',').map(Number).sort(function (a, b) {
                return parseInt(a) - parseInt(b)
            })
            buffer = buffer.filter(function (e) {
                return this.indexOf(e) < 0
            }, excludedPokemon)
            reincludedPokemon = reincludedPokemon.concat(buffer).map(String)
            clearStaleMarkers()
            Store.set('remember_select_exclude', excludedPokemon)
        })
        $selectExcludeMinIV.on('change', function (e) {
            buffer = excludedMinIV
            excludedMinIV = $selectExcludeMinIV.val().split(',').map(Number).sort(function (a, b) {
                return parseInt(a) - parseInt(b)
            })
            buffer = excludedMinIV.filter(function (e) {
                return this.indexOf(e) < 0
            }, buffer)
            reincludedPokemon = reincludedPokemon.concat(buffer).map(String)
            clearStaleMarkers()
            Store.set('remember_select_exclude_min_iv', excludedMinIV)
        })
        $textMinIV.on('change', function (e) {
            minIV = parseInt($textMinIV.val(), 10)
            if (isNaN(minIV) || minIV < 0) {
                minIV = ''
            }
            if (minIV > 100) {
                minIV = 100
            }
            $textMinIV.val(minIV)
            Store.set('remember_text_min_iv', minIV)
        })
        $textMinLevel.on('change', function (e) {
            minLevel = parseInt($textMinLevel.val(), 10)
            if (isNaN(minLevel) || minLevel < 0) {
                minLevel = ''
            }
            if (minLevel > 35) {
                minLevel = 35
            }
            $textMinLevel.val(minLevel)
            Store.set('remember_text_min_level', minLevel)
        })
        $switchTinyRat.on('change', function (e) {
            Store.set('showTinyRat', this.checked)
            lastpokemon = false
            updateMap()
        })
        $switchBigKarp.on('change', function (e) {
            Store.set('showBigKarp', this.checked)
            lastpokemon = false
            updateMap()
        })
        $selectPokemonNotify.on('change', function (e) {
            notifiedPokemon = $selectPokemonNotify.val().split(',').map(Number).sort(function (a, b) {
                return parseInt(a) - parseInt(b)
            })
            Store.set('remember_select_notify', notifiedPokemon)
        })
        $textPerfectionNotify.on('change', function (e) {
            notifiedMinPerfection = parseInt($textPerfectionNotify.val(), 10)
            if (isNaN(notifiedMinPerfection) || notifiedMinPerfection <= 0) {
                notifiedMinPerfection = ''
            }
            if (notifiedMinPerfection > 100) {
                notifiedMinPerfection = 100
            }
            $textPerfectionNotify.val(notifiedMinPerfection)
            Store.set('remember_text_perfection_notify', notifiedMinPerfection)
        })
        $textLevelNotify.on('change', function (e) {
            notifiedMinLevel = parseInt($textLevelNotify.val(), 10)
            if (isNaN(notifiedMinLevel) || notifiedMinLevel <= 0) {
                notifiedMinLevel = ''
            }
            if (notifiedMinLevel > 35) {
                notifiedMinLevel = 35
            }
            $textLevelNotify.val(notifiedMinLevel)
            Store.set('remember_text_level_notify', notifiedMinLevel)
        })
        $questsExcludePokemon.on('change', function (e) {
            buffer = questsExcludedPokemon
            questsExcludedPokemon = $questsExcludePokemon.val().split(',').map(Number).sort(function (a, b) {
                return parseInt(a) - parseInt(b)
            })
            buffer = buffer.filter(function (e) {
                return this.indexOf(e) < 0
            }, questsExcludedPokemon)
            reincludedQuestsPokemon = reincludedQuestsPokemon.concat(buffer).map(String)
            updateMap()
            Store.set('remember_quests_exclude_pokemon', questsExcludedPokemon)
        })
        // recall saved lists
        $selectExclude.val(Store.get('remember_select_exclude')).trigger('change')
        $selectExcludeMinIV.val(Store.get('remember_select_exclude_min_iv')).trigger('change')
        $selectPokemonNotify.val(Store.get('remember_select_notify')).trigger('change')
        $textPerfectionNotify.val(Store.get('remember_text_perfection_notify')).trigger('change')
        $textLevelNotify.val(Store.get('remember_text_level_notify')).trigger('change')
        $textMinIV.val(Store.get('remember_text_min_iv')).trigger('change')
        $textMinLevel.val(Store.get('remember_text_min_level')).trigger('change')
        $raidNotify.val(Store.get('remember_raid_notify')).trigger('change')
        $questsExcludePokemon.val(Store.get('remember_quests_exclude_pokemon')).trigger('change')
        $excludeRaidbosses.val(Store.get('remember_exclude_raidbosses')).trigger('change')
        $excludeRaideggs.val(Store.get('remember_exclude_raideggs')).trigger('change')

        if (isTouchDevice() && isMobileDevice()) {
            $('.select2-search input').prop('readonly', true)
        }
        $('#tabs').tabs()
        $('#quests-tabs').tabs()
        $('#grunt-tabs').tabs()
        $('#raidboss-tabs').tabs()
        if (manualRaids) {
            $('.global-raid-modal').html(generateRaidModal())
        }
    })

    $('.select-all').on('click', function (e) {
        e.preventDefault()
        var parent = $(this).parent()
        parent.find('.pokemon-list .pokemon-icon-sprite').addClass('active')
        parent.find('input').val(Array.from(Array(numberOfPokemon + 1).keys()).slice(1).join(',')).trigger('change')
    })

    $('.hide-all').on('click', function (e) {
        e.preventDefault()
        var parent = $(this).parent()
        parent.find('.pokemon-list .pokemon-icon-sprite').removeClass('active')
        parent.find('input').val('').trigger('change')
    })
    $('.select-all-item').on('click', function (e) {
        e.preventDefault()
        var parent = $(this).parent()
        parent.find('.item-list .item-icon-sprite').addClass('active')
        parent.find('input').val(Array.from(Array(numberOfItem + 1).keys()).slice(1).join(',')).trigger('change')
    })

    $('.hide-all-item').on('click', function (e) {
        e.preventDefault()
        var parent = $(this).parent()
        parent.find('.item-list .item-icon-sprite').removeClass('active')
        parent.find('input').val('').trigger('change')
    })

    $('.select-all-grunt').on('click', function (e) {
        e.preventDefault()
        var parent = $(this).parent()
        parent.find('.grunt-list .grunt-icon-sprite').addClass('active')
        parent.find('input').val(Array.from(Array(numberOfGrunt + 1).keys()).slice(1).join(',')).trigger('change')
    })

    $('.hide-all-grunt').on('click', function (e) {
        e.preventDefault()
        var parent = $(this).parent()
        parent.find('.grunt-list .grunt-icon-sprite').removeClass('active')
        parent.find('input').val('').trigger('change')
    })

    $('.select-all-raidboss').on('click', function (e) {
        e.preventDefault()
        var parent = $(this).parent()
        parent.find('.raidboss-list .raidboss-icon-sprite').addClass('active')
        parent.find('input').val(Array.from(Array(numberOfPokemon + 1).keys()).slice(1).join(',')).trigger('change')
    })

    $('.hide-all-raidboss').on('click', function (e) {
        e.preventDefault()
        var parent = $(this).parent()
        parent.find('.raidboss-list .raidboss-icon-sprite').removeClass('active')
        parent.find('input').val('').trigger('change')
    })

    $('.select-all-raideggs').on('click', function (e) {
        e.preventDefault()
        var parent = $(this).parent()
        parent.find('.raideggs-list .raideggs-icon-sprite').addClass('active')
        parent.find('input').val(Array.from(Array(numberOfPokemon + 1).keys()).slice(1).join(',')).trigger('change')
    })

    $('.hide-all-raideggs').on('click', function (e) {
        e.preventDefault()
        var parent = $(this).parent()
        parent.find('.raideggs-list .raideggs-icon-sprite').removeClass('active')
        parent.find('input').val('').trigger('change')
    })

    $('.area-go-to').on('click', function (e) {
        e.preventDefault()
        var lat = $(this).data('lat')
        var lng = $(this).data('lng')
        var zoom = $(this).data('zoom')
        map.setView(new L.LatLng(lat, lng), zoom)
    })

    $raidNotify.select2({
        placeholder: 'Minimum raid level',
        minimumResultsForSearch: Infinity
    })

    $raidNotify.on('change', function () {
        Store.set('remember_raid_notify', this.value)
    })

    $('#dialog_edit').on('click', '#closeButtonId', function () {
        $(this).closest('#dialog_edit').dialog('close')
    })

    // run interval timers to regularly update map and timediffs
    window.setInterval(updateLabelDiffTime, 1000)
    window.setInterval(updateMap, 2000)
    window.setInterval(updateWeatherOverlay, 60000)
    window.setInterval(updateGeoLocation, 1000)

    createUpdateWorker()

    // Wipe off/restore map icons when switches are toggled
    function buildSwitchChangeListener(data, dataType, storageKey) {
        return function () {
            Store.set(storageKey, this.checked)
            if (this.checked) {
                // When switch is turned on we asume it has been off, makes sure we dont end up in limbo
                // Without this there could've been a situation where no markers are on map and only newly modified ones are loaded
                if (storageKey === 'showPokemon') {
                    lastpokemon = false
                } else if (storageKey === 'showRaids') {
                    lastgyms = false
                } else if (storageKey === 'showGyms') {
                    lastgyms = false
                } else if (storageKey === 'showPokestops') {
                    lastpokestops = false
                } else if (storageKey === 'showLures') {
                    lastpokestops = false
                } else if (storageKey === 'showInvasions') {
                    lastpokestops = false
                } else if (storageKey === 'showQuests') {
                    lastpokestops = false
                } else if (storageKey === 'showPortals') {
                    lastportals = false
                } else if (storageKey === 'showSpawnpoints') {
                    lastspawns = false
                }
                updateMap()
            } else {
                $.each(dataType, function (d, dType) {
                    $.each(data[dType], function (key, value) {
                        // for any marker you're turning off, you'll want to wipe off the range
                        if (data[dType][key].marker.rangeCircle) {
                            markers.removeLayer(data[dType][key].marker.rangeCircle)
                            markersnotify.removeLayer(data[dType][key].marker.rangeCircle)
                            delete data[dType][key].marker.rangeCircle
                        }
                        if (storageKey !== 'showRanges') {
                            markers.removeLayer(data[dType][key].marker)
                            markersnotify.removeLayer(data[dType][key].marker)
                        }
                    })
                    if (storageKey !== 'showRanges') data[dType] = {}
                })
                if (storageKey === 'showRanges') {
                    updateMap()
                }
            }
        }
    }

    // Setup UI element interactions
    $('#raids-switch').change(function () {
        var options = {
            'duration': 500
        }
        var wrapper = $('#raids-filter-wrapper')
        var gymSidebarWrapper = $('#gym-sidebar-wrapper')
        var gymRaidsFilterWrapper = $('#gyms-raid-filter-wrapper')
        if (this.checked) {
            lastgyms = false
            wrapper.show(options)
            gymSidebarWrapper.show(options)
            gymRaidsFilterWrapper.show(options)
        } else {
            lastgyms = false
            wrapper.hide(options)
            if (!Store.get('showGyms')) {
                gymSidebarWrapper.hide(options)
                gymRaidsFilterWrapper.hide(options)
            }
        }
        buildSwitchChangeListener(mapData, ['gyms'], 'showRaids').bind(this)()
    })
    if (Store.get('showGyms') === true || Store.get('showRaids') === true) {
        $('#gyms-raid-filter-wrapper').toggle(true)
    }
    $('#gyms-switch').change(function () {
        var options = {
            'duration': 500
        }
        var wrapper = $('#gyms-filter-wrapper')
        var gymSidebarWrapper = $('#gym-sidebar-wrapper')
        var gymRaidsFilterWrapper = $('#gyms-raid-filter-wrapper')
        var raidsWrapper = $('#raidsfilter-wrapper')
        var badgeModeWrapper = $('#badge-mode-wrapper')
        if (Store.get('showCoveredPokestopCells') || Store.get('showGymCellCalculations')) {
            updateS2Overlay()
        }
        if (this.checked) {
            lastgyms = false
            wrapper.show(options)
            raidsWrapper.show(options)
            gymSidebarWrapper.show(options)
            gymRaidsFilterWrapper.show(options)
            badgeModeWrapper.show(options)
        } else {
            lastgyms = false
            wrapper.hide(options)
            raidsWrapper.hide(options)
            badgeModeWrapper.hide(options)
            if (!Store.get('showRaids')) {
                gymSidebarWrapper.hide(options)
                gymRaidsFilterWrapper.hide(options)
            }
        }
        buildSwitchChangeListener(mapData, ['gyms'], 'showGyms').bind(this)()
    })

    $('#raid-level-filter-switch').change(function () {
        var options = {
            'duration': 500
        }
        var wrapperLevel = $('#raid-level-filter-wrapper')
        Store.set('filterRaidlevel', this.checked)
        if (this.checked) {
            lastgyms = false
            updateMap()
            wrapperLevel.show(options)
        } else {
            lastgyms = false
            updateMap()
            wrapperLevel.hide(options)
        }
    })
    $('#raidboss-filter-switch').change(function () {
        var options = {
            'duration': 500
        }
        var wrapperRaidboss = $('#raidboss-filter-wrapper')
        Store.set('filterRaidboss', this.checked)
        if (this.checked) {
            lastgyms = false
            wrapperRaidboss.show(options)
        } else {
            lastgyms = false
            wrapperRaidboss.hide(options)
        }
    })

    $('#nests-switch').change(function () {
        var options = {
            'duration': 500
        }
        Store.set('showNests', this.checked)
        if (this.checked) {
            buildNestPolygons()
            $('#nests-content-wrapper').show(options)
        } else {
            nestPolygonGroup.clearLayers()
            $('#nests-content-wrapper').hide(options)
        }

        if (Store.get('showNests') === true) {
            $('#nests-content-wrapper').toggle(true)
        }
        buildNestPolygons()
        lastnests = false
        buildSwitchChangeListener(mapData, ['nests'], 'showNests').bind(this)()
    })
    $('#communities-switch').change(function () {
        var options = {
            'duration': 500
        }
        lastcommunities = false
        Store.set('showCommunities', this.checked)
        if (this.checked) {
            $('#community-content-wrapper').show(options)
        } else {
            $('#community-content-wrapper').hide(options)
        }
        buildSwitchChangeListener(mapData, ['communities'], 'showCommunities').bind(this)()
    })
    $('#poi-switch').change(function () {
        lastpois = false
        buildSwitchChangeListener(mapData, ['pois'], 'showPoi').bind(this)()
    })
    $('#portals-switch').change(function () {
        var options = {
            'duration': 500
        }
        var wrapper = $('#new-portals-only-wrapper')
        if (this.checked) {
            lastportals = false
            wrapper.show(options)
        } else {
            lastportals = false
            wrapper.hide(options)
        }
        return buildSwitchChangeListener(mapData, ['portals'], 'showPortals').bind(this)()
    })

    $('#s2-switch').change(function () {
        var options = {
            'duration': 500
        }
        var wrapper = $('#s2-switch-wrapper')
        if (this.checked) {
            wrapper.show(options)
            if (Store.get('showExCells')) {
                showS2Cells(13, {color: 'black', weight: 5, dashOffset: '8', dashArray: '2 6'})
            }
            if (Store.get('showGymCells')) {
                showS2Cells(14, {color: 'black', weight: 3, dashOffset: '4', dashArray: '2 6'})
            }
            if (Store.get('showStopCells')) {
                showS2Cells(17, {color: 'black'})
            }
        } else {
            wrapper.hide(options)
            exLayerGroup.clearLayers()
            gymLayerGroup.clearLayers()
            stopLayerGroup.clearLayers()
        }
        return buildSwitchChangeListener(mapData, ['s2cells'], 'showCells').bind(this)()
    })

    $('#s2-level13-switch').change(function () {
        Store.set('showExCells', this.checked)
        if (this.checked) {
            if (map.getZoom() > 13) {
                showS2Cells(13, {color: 'black', weight: 5, dashOffset: '8', dashArray: '2 6'})
            }
        } else {
            exLayerGroup.clearLayers()
        }
    })

    $('#s2-level14-switch').change(function () {
        var options = {
            'duration': 500
        }
        var wrapper = $('#fill-busy-gym-cell-wrapper')
        Store.set('showGymCells', this.checked)
        if (this.checked) {
            wrapper.show(options)
            if (map.getZoom() > 14) {
                showS2Cells(14, {color: 'black', weight: 3, dashOffset: '4', dashArray: '2 6'})
            }
        } else {
            wrapper.hide(options)
            gymLayerGroup.clearLayers()
        }
    })

    $('#s2-level17-switch').change(function () {
        var options = {
            'duration': 500
        }
        var wrapper = $('#fill-busy-pokestop-cell-wrapper')
        Store.set('showStopCells', this.checked)
        if (this.checked) {
            wrapper.show(options)
            if (map.getZoom() > 15) {
                showS2Cells(17, {color: 'black'})
            }
        } else {
            wrapper.hide(options)
            stopLayerGroup.clearLayers()
        }
    })

    $('#pokemon-switch').change(function () {
        var options = {
            'duration': 500
        }
        var wrapper = $('#pokemon-filter-wrapper')
        if (this.checked) {
            wrapper.show(options)
        } else {
            wrapper.hide(options)
        }
        buildSwitchChangeListener(mapData, ['pokemons'], 'showPokemon').bind(this)()
    })

    $('#weather-switch').change(function () {
        Store.set('showWeather', this.checked)
        if (this.checked) {
            updateWeatherOverlay()
        } else {
            destroyWeatherOverlay()
        }
    })

    $('#spawnpoints-switch').change(function () {
        buildSwitchChangeListener(mapData, ['spawnpoints'], 'showSpawnpoints').bind(this)()
    })
    $('#ranges-switch').change(buildSwitchChangeListener(mapData, ['gyms', 'pokemons', 'pokestops'], 'showRanges'))

    $('#scan-area-switch').change(function () {
        Store.set('showScanPolygon', this.checked)
        if (this.checked) {
            buildScanPolygons()
        } else {
            scanAreaGroup.clearLayers()
        }
    })
    $('#scan-area-quest-switch').change(function () {
        Store.set('showScanPolygonQuest', this.checked)
        if (this.checked) {
            buildScanPolygonQuest()
        } else {
            scanAreaGroupQuest.clearLayers()
        }
    })
    $('#scan-area-pvp-switch').change(function () {
        Store.set('showScanPolygonPvp', this.checked)
        if (this.checked) {
            buildScanPolygonPvp()
        } else {
            scanAreaGroupPvp.clearLayers()
        }
    })
    $('#pokestops-switch').change(function () {
        var options = {
            'duration': 500
        }
        if (Store.get('showCoveredPokestopCells') || Store.get('showGymCellCalculations')) {
            updateS2Overlay()
        }
        var wrapper = $('#pokestops-filter-wrapper')
        if (this.checked) {
            wrapper.show(options)
        } else {
            wrapper.hide(options)
        }
        buildSwitchChangeListener(mapData, ['pokestops'], 'showPokestops').bind(this)()
    })

    $('#lures-switch').change(function () {
        Store.set('showLures', this.checked)
        var options = {
            'duration': 500
        }
        var questWrapper = $('#quests-filter-wrapper')
        var rocketWrapper = $('#rocket-wrapper')
        if ((this.checked === true) && (Store.get('showInvasions') === true || Store.get('showQuests') === true)) {
            Store.set('showInvasions', false)
            Store.set('showQuests', false)
            questWrapper.hide(options)
            rocketWrapper.hide(options)
            $('#invasions-switch').prop('checked', false)
            $('#quests-switch').prop('checked', false)
        }
        if (this.checked) {
            lastpokestops = false
            updateMap()
        } else {
            lastpokestops = false
            updateMap()
        }
        return buildSwitchChangeListener(mapData, ['pokestops'], 'showLures').bind(this)()
    })

    $('#invasions-switch').change(function () {
        Store.set('showInvasions', this.checked)
        var questWrapper = $('#quests-filter-wrapper')
        var options = {
            'duration': 500
        }
        if ((this.checked === true) && (Store.get('showQuests') === true || Store.get('showLures') === true)) {
            Store.set('showQuests', false)
            Store.set('showLures', false)
            questWrapper.hide(options)
            $('#quests-switch').prop('checked', false)
            $('#lures-switch').prop('checked', false)
        }
        var rocketWrapper = $('#rocket-wrapper')
        if (this.checked) {
            lastpokestops = false
            rocketWrapper.show(options)
            updateMap()
            // Redraw Rocket Stops, we are switching Markers
            $.each(mapData.pokestops, function (key, value) {
                if (value['invasion_expiration'] > 0) {
                    markers.removeLayer(value.marker)
                    value.marker = setupPokestopMarker(value)
                }
            })
        } else {
            lastpokestops = false
            rocketWrapper.hide(options)
            updateMap()
            // Redraw Stops, we are switching Markers
            $.each(mapData.pokestops, function (key, value) {
                markers.removeLayer(value.marker)
                value.marker = setupPokestopMarker(value)
            })
        }
        return buildSwitchChangeListener(mapData, ['pokestops'], 'showInvasions').bind(this)()
    })

    $('#invasion-timer-switch').change(function () {
        Store.set('showInvasionTimer', this.checked)
        if (this.checked) {
            $.each(mapData.pokestops, function (key, value) {
                if (value['invasion_expiration'] > 0) {
                    markers.removeLayer(value.marker)
                    value.marker = setupPokestopMarker(value)
                }
            })
        } else {
            $.each(mapData.pokestops, function (key, value) {
                if (value['invasion_expiration'] > 0) {
                    markers.removeLayer(value.marker)
                    value.marker = setupPokestopMarker(value)
                }
            })
        }
    })

    $('#raid-timer-switch').change(function () {
        Store.set('showRaidTimer', this.checked)
        if (this.checked) {
            updateGymIcons()
        } else {
            updateGymIcons()
        }
    })

    $('#quests-switch').change(function () {
        Store.set('showQuests', this.checked)
        var rocketWrapper = $('#rocket-wrapper')
        var options = {
            'duration': 500
        }
        if ((this.checked === true) && (Store.get('showInvasions') === true || Store.get('showLures') === true)) {
            Store.set('showInvasions', false)
            Store.set('showLures', false)
            rocketWrapper.hide(options)
            $('#invasions-switch').prop('checked', false)
            $('#lures-switch').prop('checked', false)
        }
        var wrapper = $('#quests-filter-wrapper')
        if (this.checked) {
            lastpokestops = false
            wrapper.show(options)
            updateMap()
            // Redraw Queststops incase that we are switching Markers
            $.each(mapData.pokestops, function (key, value) {
                if (value['invasion_expiration'] > 0 && JSON.parse(value['quest_rewards'])) {
                    markers.removeLayer(value.marker)
                    value.marker = setupPokestopMarker(value)
                }
            })
        } else {
            lastpokestops = false
            wrapper.hide(options)
            updateMap()
        }
        return buildSwitchChangeListener(mapData, ['pokestops'], 'showQuests').bind(this)()
    })

    $('#quests-amount-icon-switch').change(function () {
        Store.set('showItemAmounts', this.checked)
        $.each(mapData.pokestops, function (key, value) {
            markers.removeLayer(value.marker)
            value.marker = setupPokestopMarker(value)
        })
    })

    $('#fill-busy-pokestop-cell-switch').change(function () {
        Store.set('showCoveredPokestopCells', this.checked)
        updateS2Overlay()
    })

    $('#fill-busy-gym-cell-switch').change(function () {
        Store.set('showGymCellCalculations', this.checked)
        updateS2Overlay()
    })

    $('#dustrange').on('input', function () {
        dustamount = $(this).val()
        Store.set('showDustAmount', dustamount)
        if (dustamount === '0') {
            $('#dustvalue').text(i8ln('Disabled'))
            setTimeout(function () { updateMap() }, 2000)
        } else {
            $('#dustvalue').text(' ' + dustamount)
            reloaddustamount = true
            setTimeout(function () { updateMap() }, 2000)
        }
    })

    $('#sound-switch').change(function () {
        Store.set('playSound', this.checked)
        var options = {
            'duration': 500
        }
        var wrapper = $('#cries-switch-wrapper')
        if (this.checked) {
            wrapper.show(options)
        } else {
            wrapper.hide(options)
        }
    })

    $('#cries-switch').change(function () {
        var wrapper = $('#cries-type-filter-wrapper')
        var options = {
            'duration': 500
        }
        if (this.checked) {
            wrapper.show(options)
        } else {
            wrapper.hide(options)
        }
        Store.set('playCries', this.checked)
        if (this.checked) {
            fetchCriesJson()
        }
    })

    $('#bounce-switch').change(function () {
        Store.set('remember_bounce_notify', this.checked)
    })

    $('#notification-switch').change(function () {
        Store.set('remember_notification_notify', this.checked)
    })

    $('#start-at-user-location-switch').change(function () {
        Store.set('startAtUserLocation', this.checked)
        if (this.checked === true && Store.get('startAtLastLocation') === true) {
            Store.set('startAtLastLocation', false)
            $('#start-at-last-location-switch').prop('checked', false)
        }
    })

    $('#start-at-last-location-switch').change(function () {
        Store.set('startAtLastLocation', this.checked)
        if (this.checked === true && Store.get('startAtUserLocation') === true) {
            Store.set('startAtUserLocation', false)
            $('#start-at-user-location-switch').prop('checked', false)
        }
    })

    $('#follow-my-location-switch').change(function () {
        if (!navigator.geolocation) {
            this.checked = false
        } else {
            Store.set('followMyLocation', this.checked)

            var options = {
                'duration': 500
            }
            var wrapper = $('#spawn-area-wrapper')
            var wrapper2 = $('#follow-me-map-wrapper')
            if (this.checked) {
                wrapper.show(options)
                wrapper2.show(options)
            } else { // remove spawnarea if "follow me" is beein turned off
                if (locationMarker.rangeCircle) {
                    markers.removeLayer(locationMarker.rangeCircle)
                    markersnotify.removeLayer(locationMarker.rangeCircle)
                    delete locationMarker.rangeCircle
                }
                wrapper.hide(options)
                wrapper2.hide(options)
            }
        }
    })

    $('#spawn-area-switch').change(function () {
        Store.set('spawnArea', this.checked)
        if (locationMarker.rangeCircle) {
            markers.removeLayer(locationMarker.rangeCircle)
            markersnotify.removeLayer(locationMarker.rangeCircle)
            delete locationMarker.rangeCircle
        }
    })
    $('#follow-me-map-switch').change(function () {
        Store.set('followMap', this.checked)
    })

    if ($('#nav-accordion').length) {
        $('#nav-accordion').accordion({
            active: false,
            collapsible: true,
            heightStyle: 'content'
        })
    }

    // Initialize dataTable in statistics sidebar
    //   - turn off sorting for the 'icon' column
    //   - initially sort 'name' column alphabetically

    $('#pokemonList_table').DataTable({
        paging: false,
        searching: false,
        info: false,
        errMode: 'throw',
        'language': {
            'emptyTable': ''
        },
        'columns': [{'orderable': false}, null, null, null]
    }).order([1, 'asc'])
})

function download(filename, text) { // eslint-disable-line no-unused-vars
    var element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
    element.setAttribute('download', filename + '_' + moment().format('DD-MM-YYYY HH:mm'))

    element.style.display = 'none'
    document.body.appendChild(element)

    element.click()

    document.body.removeChild(element)
}

function upload(fileText) {
    var data = JSON.parse(JSON.parse(fileText))
    Object.keys(data).forEach(function (k) {
        localStorage.setItem(k, data[k])
    })
    window.location.reload()
}

function openFile(event) { // eslint-disable-line no-unused-vars
    var input = event.target
    var reader = new FileReader()

    // Reset Settings first to prevent settings are still turned on
    localStorage.clear()
    window.location.reload()

    reader.onload = function () {
        console.log(reader.result)
        upload(reader.result)
    }
    reader.readAsText(input.files[0])
}

function checkAndCreateSound(pokemonId = 0) {
    if (Store.get('playSound')) {
        if (!Store.get('playCries') || pokemonId === 0) {
            createjs.Sound.play('ding')
        } else {
            createjs.Sound.play(pokemonId)
        }
    }
}

function removeNotifyAboutPokemon(id) { // eslint-disable-line no-unused-vars
    // remove old thing
    var arr = $selectPokemonNotify.val().split(',')
    var index = arr.indexOf(id.toString())
    if (index && index >= 0) {
        arr.splice(index, 1)
        $selectPokemonNotify.val(
            arr.join(',')
        ).trigger('change')
    }
    // remove new thing too
    $('label[for="notify-pokemon"] .pokemon-list .pokemon-icon-sprite[data-value="' + id + '"]').removeClass('active')
}

function shareNestsWhatsapp(mode, header, secondLine, footer) { // eslint-disable-line no-unused-vars
    var link = 'whatsapp://send?text=%2A' + header + '%2A:%0A' + secondLine + '%0A'
    $.each(mapData.nests, function (key, value) {
        // In All Modes, Show Nestname + Pokemon
        link += '%0A%2A' + mapData.nests[key]['name'] + '%2A:%20' + encodeURIComponent(mapData.nests[key]['pokemon_name'])
        // Adding Loc
        if (mode === 1 || mode === 3) {
            link += '%0Ahttps://maps.google.com/?q=' + mapData.nests[key]['lat'].toFixed(4) + ',' + mapData.nests[key]['lon'].toFixed(4)
        }
        // Adding Density
        if (mode === 2 || mode === 3) {
            link += '%0A' + i8ln('Spawns') + ': ~' + Math.round(mapData.nests[key]['pokemon_avg']) + '%20' + i8ln('per') + '%20' + i8ln('hour')
        }
        // Adding an extra Space if its not mode 0
        if (mode !== 0) {
            link += '%0A'
        }
    })
    link += '%0A%0A' + footer
    document.getElementById('shareNests' + mode).href = link
}
function shareCommunitiesWhatsapp(header, secondLine, footer) { // eslint-disable-line no-unused-vars
    var link = 'whatsapp://send?text=%2A' + header + '%2A:%0A' + secondLine + '%0A'
    $.each(mapData.communities, function (key, value) {
        // In only mode, show: type, name, link
        if (mapData.communities[key]['type'] === 3) { // Discord
            link += '%0A%2A' + mapData.communities[key]['title'] + '%2A(Discord):%20'
        } else if (mapData.communities[key]['type'] === 4) { // Telegram
            link += '%0A%2A' + mapData.communities[key]['title'] + '%2A(Telegram):%20'
        } else if (mapData.communities[key]['type'] === 5) { // Whatsapp
            link += '%0A%2A' + mapData.communities[key]['title'] + '%2A(Whatsapp):%20'
        } else if (mapData.communities[key]['type'] === 6) { // Msg
            link += '%0A%2A' + mapData.communities[key]['title'] + '%2A(FB Messenger):%20'
        } else if (mapData.communities[key]['type'] === 7) { // Fb
            link += '%0A%2A' + mapData.communities[key]['title'] + '%2A(Facebook):%20'
        } else if (mapData.communities[key]['type'] === 8) { // groupme
            link += '%0A%2A' + mapData.communities[key]['title'] + '%2A(GroupMe):%20'
        }
        if (mapData.communities[key]['has_invite_url'] === 1 && (mapData.communities[key]['invite_url'] !== '#' || mapData.communities[key]['invite_url'] !== undefined)) {
            link += '%0A' + i8ln('Link') + ':%20' + mapData.communities[key]['invite_url'] + '%0A'
        }
    })
    link += '%0A%0A' + footer
    document.getElementById('shareCommunities').href = link
}
