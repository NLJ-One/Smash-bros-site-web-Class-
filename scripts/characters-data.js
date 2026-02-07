const DEFAULT_CHARACTER_VIDEO = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

const CHARACTERS = [
    {
        id: "mario",
        name: "Mario",
        image: "Mario.jpg",
        type: "All-Rounder",
        description: "Un personnage polyvalent, bon partout mais maître nulle part.",
        videoUrl: "https://youtu.be/vKBM9B8CEBw?si=KoUSfg7X2Y5YX4Kj",
        stats: {
            speed: 7,
            power: 6,
            weight: 5,
            projectiles: 3,
            aerial: 7,
            combo: 8
        },
        strengths: [
            "Très bon combo game",
            "Kill moves fiables",
            "Polyvalent"
        ],
        weaknesses: [
            "Range limité",
            "Faible contre les zoners"
        ],
        matchups: {
            strongVs: ["Donkey Kong", "Bowser"],
            weakVs: ["Pikachu", "Sonic"]
        }
    },
    {
        id: "yoshi",
        name: "Yoshi",
        image: "yoshi.png",
        type: "Rushdown / Aerial",
        description: "Mobile et agressif, excelle en aérien et en pression rapprochée.",
        videoUrl: "https://youtu.be/zbel6sAHzDM?si=wNE6ZVf1a-g4_65U",
        stats: {
            speed: 8,
            power: 7,
            weight: 6,
            projectiles: 6,
            aerial: 9,
            combo: 7
        },
        strengths: [
            "Pression aérienne très forte",
            "Bon mix-up au corps à corps",
            "Mobilité solide"
        ],
        weaknesses: [
            "Portée limitée au sol",
            "Recovery parfois lisible",
            "Prend cher sur les trades"
        ],
        matchups: {
            strongVs: ["Donkey Kong", "Bowser"],
            weakVs: ["Fox", "Samus"]
        }
    },
    {
        id: "link",
        name: "Link",
        image: "link.png",
        type: "Zoner",
        description: "Un maître du zoning avec projectiles puissants.",
        videoUrl: DEFAULT_CHARACTER_VIDEO,
        stats: {
            speed: 5,
            power: 7,
            weight: 6,
            projectiles: 9,
            aerial: 6,
            combo: 5
        },
        strengths: [
            "Projectiles très forts",
            "Kill power élevé",
            "Neutral dominant"
        ],
        weaknesses: [
            "Recovery exploitable",
            "Jeu rapproché faible"
        ],
        matchups: {
            strongVs: ["Mario", "Donkey Kong"],
            weakVs: ["Fox", "Sonic"]
        }
    },
    {
        id: "kirby",
        name: "Kirby",
        image: "Kirby.jpg",
        type: "Floaty / Copy",
        description: "Léger et imprévisible, excelle off-stage et punit les erreurs.",
        videoUrl: "https://youtu.be/ZLNX2uLYX7M?si=v9ex4e2T7lJwxIle",
        stats: {
            speed: 6,
            power: 5,
            weight: 2,
            projectiles: 3,
            aerial: 9,
            combo: 7
        },
        strengths: [
            "Jeu aérien très fort",
            "Recovery multiple et sûr",
            "Copy ability pour adapter le plan de jeu"
        ],
        weaknesses: [
            "Poids plume, meurt tôt",
            "Portée limitée au sol",
            "Struggle contre les zoners rapides"
        ],
        matchups: {
            strongVs: ["Donkey Kong", "Bowser"],
            weakVs: ["Fox", "Samus"]
        }
    },
    {
        id: "fox",
        name: "Fox",
        image: "fox.jpg",
        type: "Rushdown / Glass Cannon",
        description: "Ultra rapide, neutral explosif, mais poids très léger.",
        videoUrl: "https://youtu.be/xVbrtGvncd8?si=6zpC_m-haG3w0l17",
        stats: {
            speed: 10,
            power: 6,
            weight: 3,
            projectiles: 5,
            aerial: 8,
            combo: 9
        },
        strengths: [
            "Vitesse sol/aérien top tier",
            "Up smash / up air tue tôt",
            "Pressing constant"
        ],
        weaknesses: [
            "Poids léger: meurt vite",
            "Off-stage fragile",
            "Prend cher sur les trades"
        ],
        matchups: {
            strongVs: ["Link", "Samus"],
            weakVs: ["Pikachu", "Captain Falcon"]
        }
    },
    {
        id: "captain-falcon",
        name: "Captain Falcon",
        image: "captain falcon.jpg",
        type: "Rushdown / Grappler",
        description: "Explosif, combos dévastateurs, kill power énorme, mais recovery vulnérable.",
        videoUrl: "https://youtu.be/xzE8m7gAs7E?si=17Eepb2qSosSTudw",
        stats: {
            speed: 9,
            power: 9,
            weight: 6,
            projectiles: 0,
            aerial: 8,
            combo: 9
        },
        strengths: [
            "Punish game monstrueux",
            "Kill power très élevé",
            "Vitesse au sol excellente"
        ],
        weaknesses: [
            "Recovery exploitable",
            "Jeu off-stage risqué",
            "Pas de projectiles"
        ],
        matchups: {
            strongVs: ["Fox", "Mario"],
            weakVs: ["Pikachu", "Samus"]
        }
    },
    {
        id: "diddy-kong",
        name: "Diddy Kong",
        image: "diddy-kong.png",
        type: "Item / Neutral King",
        description: "Maître du contrôle de neutral avec la banane, combos fiables et mobilité.",
        videoUrl: "https://youtu.be/3oAbjiR-Bj0?si=Tq7Ii5jlvNno1zqW",
        stats: {
            speed: 8,
            power: 6,
            weight: 5,
            projectiles: 6,
            aerial: 7,
            combo: 8
        },
        strengths: [
            "Banane contrôle le neutral",
            "Combos sûrs et consistants",
            "Mobilité très solide"
        ],
        weaknesses: [
            "Sans banane, neutral affaibli",
            "Kill power moyenne sans setup",
            "Peut se faire edgeguard"
        ],
        matchups: {
            strongVs: ["Link", "Bowser"],
            weakVs: ["Fox", "Pikachu"]
        }
    },
    {
        id: "mewtwo",
        name: "Mewtwo",
        image: "mewtwo.jpg",
        type: "Zoner / Psychic",
        description: "Grande portée et projectiles puissants, mais léger et fragile.",
        videoUrl: "https://youtu.be/rZkQuogoY6o?si=wJMDuOBWUcykIFbe",
        stats: {
            speed: 8,
            power: 7,
            weight: 3,
            projectiles: 8,
            aerial: 7,
            combo: 6
        },
        strengths: [
            "Projectiles très forts",
            "Portée dissuasive",
            "Très bon jeu de spacing"
        ],
        weaknesses: [
            "Poids plume",
            "Prend cher en pression",
            "Recovery exploitable"
        ],
        matchups: {
            strongVs: ["Bowser", "Donkey Kong"],
            weakVs: ["Fox", "Pikachu"]
        }
    },
    {
        id: "donkey-kong",
        name: "Donkey Kong",
        image: "placeholder.jpg",
        type: "Heavyweight / Grappler",
        description: "Super lourd avec des coups dévastateurs et un cargo throw unique.",
        videoUrl: DEFAULT_CHARACTER_VIDEO,
        stats: {
            speed: 5,
            power: 9,
            weight: 10,
            projectiles: 2,
            aerial: 7,
            combo: 6
        },
        strengths: [
            "Kill power énorme",
            "Poids très élevé",
            "Cargo throw pour kills créatifs"
        ],
        weaknesses: [
            "Large hitbox",
            "Recovery exploitable",
            "Lent au sol"
        ],
        matchups: {
            strongVs: ["Little Mac", "Ganondorf"],
            weakVs: ["Pikachu", "Fox", "Mario"]
        }
    },
    {
        id: "samus",
        name: "Samus",
        image: "placeholder.jpg",
        type: "Zoner / Floaty",
        description: "Zoner avec projectiles puissants et bonne mobilité aérienne.",
        videoUrl: DEFAULT_CHARACTER_VIDEO,
        stats: {
            speed: 6,
            power: 7,
            weight: 7,
            projectiles: 9,
            aerial: 7,
            combo: 5
        },
        strengths: [
            "Charge Shot tue tôt",
            "Missiles pour pression",
            "Bon weight et recovery"
        ],
        weaknesses: [
            "Combos difficiles",
            "CQC limité",
            "Grab lent"
        ],
        matchups: {
            strongVs: ["Donkey Kong", "Ganondorf"],
            weakVs: ["Fox", "Pikachu"]
        }
    },
    {
        id: "dark-samus",
        name: "Dark Samus",
        image: "placeholder.jpg",
        type: "Zoner / Echo",
        description: "Clone de Samus avec animations différentes et hitbox légèrement modifiée.",
        videoUrl: DEFAULT_CHARACTER_VIDEO,
        stats: {
            speed: 6,
            power: 7,
            weight: 7,
            projectiles: 9,
            aerial: 7,
            combo: 5
        },
        strengths: [
            "Charge Shot tue tôt",
            "Missiles pour pression",
            "Bon weight et recovery"
        ],
        weaknesses: [
            "Combos difficiles",
            "CQC limité",
            "Grab lent"
        ],
        matchups: {
            strongVs: ["Donkey Kong", "Ganondorf"],
            weakVs: ["Fox", "Pikachu"]
        }
    },
    {
        id: "pikachu",
        name: "Pikachu",
        image: "placeholder.jpg",
        type: "Rushdown / All-Rounder",
        description: "Petit, rapide, recovery incroyable et edgeguarding redoutable.",
        videoUrl: DEFAULT_CHARACTER_VIDEO,
        stats: {
            speed: 9,
            power: 6,
            weight: 3,
            projectiles: 6,
            aerial: 9,
            combo: 8
        },
        strengths: [
            "Recovery top tier",
            "Edgeguarding excellent",
            "Petite hitbox difficile à toucher"
        ],
        weaknesses: [
            "Poids léger",
            "Range limité",
            "Kill power moyenne"
        ],
        matchups: {
            strongVs: ["Fox", "Captain Falcon", "Mario"],
            weakVs: ["Mr. Game & Watch", "Ness"]
        }
    },
    {
        id: "luigi",
        name: "Luigi",
        image: "placeholder.jpg",
        type: "All-Rounder / Combo",
        description: "Combo game explosif et grab puissant, mais recovery prévisible.",
        videoUrl: DEFAULT_CHARACTER_VIDEO,
        stats: {
            speed: 6,
            power: 7,
            weight: 5,
            projectiles: 4,
            aerial: 7,
            combo: 9
        },
        strengths: [
            "Zero-to-death combos",
            "Down B kill confirm",
            "Grab range excellent"
        ],
        weaknesses: [
            "Recovery linéaire",
            "Mobilité au sol moyenne",
            "Fireball lent"
        ],
        matchups: {
            strongVs: ["Donkey Kong", "Bowser"],
            weakVs: ["Samus", "Link"]
        }
    },
    {
        id: "ness",
        name: "Ness",
        image: "placeholder.jpg",
        type: "All-Rounder / PSI",
        description: "Aériens puissants et PK Fire pour pression, mais recovery risqué.",
        videoUrl: DEFAULT_CHARACTER_VIDEO,
        stats: {
            speed: 6,
            power: 7,
            weight: 5,
            projectiles: 7,
            aerial: 8,
            combo: 7
        },
        strengths: [
            "Back air tue très tôt",
            "PK Fire pour combos",
            "Grab kill confirm"
        ],
        weaknesses: [
            "Recovery exploitable",
            "Range au sol limité",
            "Vulnérable aux reflectors"
        ],
        matchups: {
            strongVs: ["Pikachu", "Fox"],
            weakVs: ["Rosalina & Luma", "Palutena"]
        }
    },
    {
        id: "jigglypuff",
        name: "Jigglypuff",
        image: "placeholder.jpg",
        type: "Floaty / Air Fighter",
        description: "Jeu aérien excellent avec Rest pour punish, mais extrêmement léger.",
        videoUrl: DEFAULT_CHARACTER_VIDEO,
        stats: {
            speed: 6,
            power: 5,
            weight: 1,
            projectiles: 0,
            aerial: 10,
            combo: 7
        },
        strengths: [
            "Meilleur jeu aérien du jeu",
            "Rest tue à 30%",
            "Edgeguarding redoutable"
        ],
        weaknesses: [
            "Plus léger du roster",
            "Aucun projectile",
            "Range très limitée"
        ],
        matchups: {
            strongVs: ["Fox", "Captain Falcon"],
            weakVs: ["Samus", "Link"]
        }
    },
    {
        id: "peach",
        name: "Peach",
        image: "placeholder.jpg",
        type: "Floaty / Technical",
        description: "Float cancels et turnips pour contrôle, technique mais très forte.",
        videoUrl: DEFAULT_CHARACTER_VIDEO,
        stats: {
            speed: 7,
            power: 6,
            weight: 4,
            projectiles: 7,
            aerial: 9,
            combo: 8
        },
        strengths: [
            "Float cancel pour frame traps",
            "Turnips pour neutral",
            "Edgeguarding top tier"
        ],
        weaknesses: [
            "Technique très élevée",
            "Léger poids",
            "Mobilité sol moyenne"
        ],
        matchups: {
            strongVs: ["Fox", "Wolf"],
            weakVs: ["Mr. Game & Watch", "Palutena"]
        }
    },
    {
        id: "daisy",
        name: "Daisy",
        image: "placeholder.jpg",
        type: "Floaty / Technical Echo",
        description: "Clone de Peach avec propriétés légèrement différentes.",
        videoUrl: DEFAULT_CHARACTER_VIDEO,
        stats: {
            speed: 7,
            power: 6,
            weight: 4,
            projectiles: 7,
            aerial: 9,
            combo: 8
        },
        strengths: [
            "Float cancel pour frame traps",
            "Turnips pour neutral",
            "Edgeguarding top tier"
        ],
        weaknesses: [
            "Technique très élevée",
            "Léger poids",
            "Mobilité sol moyenne"
        ],
        matchups: {
            strongVs: ["Fox", "Wolf"],
            weakVs: ["Mr. Game & Watch", "Palutena"]
        }
    },
    {
        id: "bowser",
        name: "Bowser",
        image: "placeholder.jpg",
        type: "Super Heavyweight",
        description: "Le plus lourd du jeu avec une vitesse surprenante et des coups dévastateurs.",
        videoUrl: DEFAULT_CHARACTER_VIDEO,
        stats: {
            speed: 6,
            power: 10,
            weight: 10,
            projectiles: 3,
            aerial: 6,
            combo: 4
        },
        strengths: [
            "Plus lourd du roster",
            "Tough Guy armor",
            "Kill power extrême"
        ],
        weaknesses: [
            "Combo food énorme",
            "Recovery prévisible",
            "Large hitbox"
        ],
        matchups: {
            strongVs: ["Little Mac", "Ganondorf"],
            weakVs: ["Pikachu", "Mario", "Fox"]
        }
    },
    {
        id: "ice-climbers",
        name: "Ice Climbers",
        image: "placeholder.jpg",
        type: "Duo / Grappler",
        description: "Duo avec desync combos dévastateurs mais vulnérables séparés.",
        videoUrl: DEFAULT_CHARACTER_VIDEO,
        stats: {
            speed: 6,
            power: 7,
            weight: 5,
            projectiles: 5,
            aerial: 6,
            combo: 10
        },
        strengths: [
            "Grab combos infinies",
            "Desync pour mixups",
            "Pression constante à deux"
        ],
        weaknesses: [
            "Nana meurt facilement",
            "Recovery faible solo",
            "Matchup-dependent"
        ],
        matchups: {
            strongVs: ["Donkey Kong", "Ganondorf"],
            weakVs: ["Pikachu", "Joker"]
        }
    },
    {
        id: "sheik",
        name: "Sheik",
        image: "placeholder.jpg",
        type: "Rushdown / Hit-and-Run",
        description: "Frame data incroyable et neutral dominant, mais kill power faible.",
        videoUrl: DEFAULT_CHARACTER_VIDEO,
        stats: {
            speed: 10,
            power: 4,
            weight: 4,
            projectiles: 6,
            aerial: 8,
            combo: 9
        },
        strengths: [
            "Frame data exceptionnelle",
            "Neutral top tier",
            "Combo game solide"
        ],
        weaknesses: [
            "Difficulté à tuer",
            "Poids léger",
            "Damage output faible"
        ],
        matchups: {
            strongVs: ["Ganondorf", "Donkey Kong"],
            weakVs: ["Lucina", "Palutena"]
        }
    },
    {
        id: "zelda",
        name: "Zelda",
        image: "placeholder.jpg",
        type: "Zoner / Trapper",
        description: "Phantom et Din's Fire pour contrôle de zone, kill power excellent.",
        videoUrl: DEFAULT_CHARACTER_VIDEO,
        stats: {
            speed: 5,
            power: 8,
            weight: 4,
            projectiles: 8,
            aerial: 7,
            combo: 5
        },
        strengths: [
            "Phantom contrôle neutral",
            "Kill moves très puissants",
            "Teleport mixup"
        ],
        weaknesses: [
            "Lente au sol",
            "CQC limité",
            "Vulnérable au rush"
        ],
        matchups: {
            strongVs: ["Donkey Kong", "Ganondorf"],
            weakVs: ["Fox", "Pikachu"]
        }
    },
    {
        id: "dr-mario",
        name: "Dr. Mario",
        image: "placeholder.jpg",
        type: "All-Rounder / Heavy",
        description: "Version plus lente mais plus puissante de Mario.",
        videoUrl: DEFAULT_CHARACTER_VIDEO,
        stats: {
            speed: 5,
            power: 8,
            weight: 6,
            projectiles: 4,
            aerial: 6,
            combo: 7
        },
        strengths: [
            "Damage output élevé",
            "Kill power supérieur à Mario",
            "Down B spike"
        ],
        weaknesses: [
            "Recovery très faible",
            "Lent comparé à Mario",
            "Mobilité limitée"
        ],
        matchups: {
            strongVs: ["Bowser", "Donkey Kong"],
            weakVs: ["Pikachu", "Fox"]
        }
    },
    {
        id: "pichu",
        name: "Pichu",
        image: "placeholder.jpg",
        type: "Glass Cannon / Rushdown",
        description: "Plus rapide que Pikachu avec plus de kill power, mais se blesse lui-même.",
        videoUrl: DEFAULT_CHARACTER_VIDEO,
        stats: {
            speed: 10,
            power: 7,
            weight: 2,
            projectiles: 6,
            aerial: 9,
            combo: 9
        },
        strengths: [
            "Frame data exceptionnelle",
            "Kill power supérieur à Pikachu",
            "Hitbox minuscule"
        ],
        weaknesses: [
            "Se blesse avec électricité",
            "Encore plus léger que Pikachu",
            "High risk high reward"
        ],
        matchups: {
            strongVs: ["Fox", "Wolf"],
            weakVs: ["Mr. Game & Watch", "Ness"]
        }
    },
    {
        id: "falco",
        name: "Falco",
        image: "placeholder.jpg",
        type: "Rushdown / Combo",
        description: "Combos pillar puissants et laser pour neutral, mais recovery vulnérable.",
        videoUrl: DEFAULT_CHARACTER_VIDEO,
        stats: {
            speed: 7,
            power: 7,
            weight: 4,
            projectiles: 6,
            aerial: 8,
            combo: 9
        },
        strengths: [
            "Pillar combos dévastateurs",
            "Laser stop momentum",
            "Kill power décent"
        ],
        weaknesses: [
            "Recovery très exploitable",
            "Vitesse au sol moyenne",
            "Off-stage risqué"
        ],
        matchups: {
            strongVs: ["Donkey Kong", "Ganondorf"],
            weakVs: ["Pikachu", "Joker"]
        }
    },
    {
        id: "marth",
        name: "Marth",
        image: "placeholder.jpg",
        type: "Spacing / Swordsman",
        description: "Tipper mechanic récompense le spacing parfait avec kill power énorme.",
        videoUrl: DEFAULT_CHARACTER_VIDEO,
        stats: {
            speed: 7,
            power: 8,
            weight: 5,
            projectiles: 0,
            aerial: 8,
            combo: 6
        },
        strengths: [
            "Range exceptionnelle",
            "Tipper tue très tôt",
            "Frame data solide"
        ],
        weaknesses: [
            "Inconsistant sans tipper",
            "Recovery exploitable",
            "Nécessite spacing précis"
        ],
        matchups: {
            strongVs: ["Fox", "Pikachu"],
            weakVs: ["Lucina", "Wolf"]
        }
    },
    {
        id: "lucina",
        name: "Lucina",
        image: "placeholder.jpg",
        type: "Spacing / Swordsman Echo",
        description: "Clone de Marth sans tipper, damage constant sur toute la lame.",
        videoUrl: DEFAULT_CHARACTER_VIDEO,
        stats: {
            speed: 7,
            power: 7,
            weight: 5,
            projectiles: 0,
            aerial: 8,
            combo: 7
        },
        strengths: [
            "Consistency supérieure à Marth",
            "Range excellente",
            "Pas de sour spots"
        ],
        weaknesses: [
            "Kill power inférieur à Marth tipper",
            "Recovery exploitable",
            "Aucun projectile"
        ],
        matchups: {
            strongVs: ["Fox", "Pikachu"],
            weakVs: ["Palutena", "Shulk"]
        }
    },
    {
        id: "young-link",
        name: "Young Link",
        image: "placeholder.jpg",
        type: "Zoner / Rushdown Hybrid",
        description: "Plus rapide que Link avec projectiles multiples et combo game.",
        videoUrl: DEFAULT_CHARACTER_VIDEO,
        stats: {
            speed: 8,
            power: 6,
            weight: 4,
            projectiles: 9,
            aerial: 7,
            combo: 8
        },
        strengths: [
            "Trois projectiles différents",
            "Vitesse supérieure",
            "Combo game solide"
        ],
        weaknesses: [
            "Poids léger",
            "Range inférieur à Link",
            "Kill power moyenne"
        ],
        matchups: {
            strongVs: ["Donkey Kong", "Ganondorf"],
            weakVs: ["Fox", "Pikachu"]
        }
    },
    {
        id: "ganondorf",
        name: "Ganondorf",
        image: "placeholder.jpg",
        type: "Super Heavyweight / Glass Cannon",
        description: "Damage et kill power les plus élevés, mais très lent et exploitable.",
        videoUrl: DEFAULT_CHARACTER_VIDEO,
        stats: {
            speed: 3,
            power: 10,
            weight: 9,
            projectiles: 1,
            aerial: 5,
            combo: 3
        },
        strengths: [
            "Highest damage per hit",
            "Kill power absolu",
            "Down tilt spike"
        ],
        weaknesses: [
            "Très lent",
            "Recovery horrible",
            "Neutral très faible"
        ],
        matchups: {
            strongVs: ["Little Mac"],
            weakVs: ["Pikachu", "Fox", "Mario", "Sheik"]
        }
    },
    {
        id: "roy",
        name: "Roy",
        image: "placeholder.jpg",
        type: "Rushdown / Swordsman",
        description: "Épée inversée (sweet spot à la base), rushdown agressif et rapide.",
        videoUrl: DEFAULT_CHARACTER_VIDEO,
        stats: {
            speed: 8,
            power: 8,
            weight: 5,
            projectiles: 0,
            aerial: 8,
            combo: 8
        },
        strengths: [
            "Vitesse au sol excellente",
            "Kill power élevé",
            "CQC redoutable"
        ],
        weaknesses: [
            "Recovery exploitable",
            "Range inférieur autres FE",
            "Doit jouer close range"
        ],
        matchups: {
            strongVs: ["Donkey Kong", "Bowser"],
            weakVs: ["Pikachu", "Joker"]
        }
    },
    {
        id: "chrom",
        name: "Chrom",
        image: "placeholder.jpg",
        type: "Rushdown / Swordsman Echo",
        description: "Clone de Roy sans sweet spot, damage constant et recovery différente.",
        videoUrl: DEFAULT_CHARACTER_VIDEO,
        stats: {
            speed: 8,
            power: 8,
            weight: 5,
            projectiles: 0,
            aerial: 8,
            combo: 8
        },
        strengths: [
            "Consistency sur tous hits",
            "Up B tue verticalement",
            "Vitesse excellente"
        ],
        weaknesses: [
            "Recovery pire que Roy",
            "Off-stage très risqué",
            "Range moyen"
        ],
        matchups: {
            strongVs: ["Donkey Kong", "Bowser"],
            weakVs: ["Pikachu", "Edgeguarders"]
        }
    },
    {
        id: "mr-game-and-watch",
        name: "Mr. Game & Watch",
        image: "placeholder.jpg",
        type: "All-Rounder / Trapper",
        description: "Moveset unique avec up B invincible et bucket pour absorb.",
        videoUrl: DEFAULT_CHARACTER_VIDEO,
        stats: {
            speed: 7,
            power: 7,
            weight: 3,
            projectiles: 7,
            aerial: 9,
            combo: 8
        },
        strengths: [
            "Up B invincible",
            "Bucket absorb projectiles",
            "Hitbox 2D difficile"
        ],
        weaknesses: [
            "Poids très léger",
            "Range limité",
            "Shield pression faible"
        ],
        matchups: {
            strongVs: ["Pikachu", "Ness", "Samus"],
            weakVs: ["Lucina", "Palutena"]
        }
    },
    {
        id: "meta-knight",
        name: "Meta Knight",
        image: "placeholder.jpg",
        type: "Rushdown / Aerial",
        description: "Multiple jumps et mobilité aérienne exceptionnelle.",
        videoUrl: DEFAULT_CHARACTER_VIDEO,
        stats: {
            speed: 9,
            power: 5,
            weight: 4,
            projectiles: 0,
            aerial: 9,
            combo: 7
        },
        strengths: [
            "5 jumps pour mobilité",
            "Frame data excellente",
            "Edgeguarding top tier"
        ],
        weaknesses: [
            "Range très courte",
            "Damage output faible",
            "Kill power moyenne"
        ],
        matchups: {
            strongVs: ["Little Mac", "Ganondorf"],
            weakVs: ["Lucina", "Palutena"]
        }
    },
    {
        id: "pit",
        name: "Pit",
        image: "placeholder.jpg",
        type: "All-Rounder / Balanced",
        description: "Équilibré avec multiple jumps et flèches contrôlables.",
        videoUrl: DEFAULT_CHARACTER_VIDEO,
        stats: {
            speed: 7,
            power: 6,
            weight: 5,
            projectiles: 7,
            aerial: 8,
            combo: 7
        },
        strengths: [
            "Multiple jumps",
            "Flèches contrôlables",
            "Recovery excellente"
        ],
        weaknesses: [
            "Pas de strengths extrêmes",
            "Kill power moyenne",
            "Neutre honnête"
        ],
        matchups: {
            strongVs: ["Donkey Kong", "Ganondorf"],
            weakVs: ["Fox", "Pikachu"]
        }
    },
    {
        id: "dark-pit",
        name: "Dark Pit",
        image: "placeholder.jpg",
        type: "All-Rounder / Balanced Echo",
        description: "Clone de Pit avec flèches et side B légèrement différents.",
        videoUrl: DEFAULT_CHARACTER_VIDEO,
        stats: {
            speed: 7,
            power: 6,
            weight: 5,
            projectiles: 7,
            aerial: 8,
            combo: 7
        },
        strengths: [
            "Multiple jumps",
            "Side B tue mieux",
            "Recovery excellente"
        ],
        weaknesses: [
            "Flèches moins contrôlables",
            "Kill power moyenne",
            "Neutre honnête"
        ],
        matchups: {
            strongVs: ["Donkey Kong", "Ganondorf"],
            weakVs: ["Fox", "Pikachu"]
        }
    },
    {
        id: "zero-suit-samus",
        name: "Zero Suit Samus",
        image: "placeholder.jpg",
        type: "Rushdown / Hit-and-Run",
        description: "Mobile et rapide avec ladder combos et paralyzer stun.",
        videoUrl: DEFAULT_CHARACTER_VIDEO,
        stats: {
            speed: 9,
            power: 7,
            weight: 4,
            projectiles: 6,
            aerial: 9,
            combo: 9
        },
        strengths: [
            "Ladder combos dévastateurs",
            "Mobilité exceptionnelle",
            "Neutral très fort"
        ],
        weaknesses: [
            "Poids léger",
            "Nécessite précision",
            "Inconsistent sans confirms"
        ],
        matchups: {
            strongVs: ["Donkey Kong", "Bowser"],
            weakVs: ["Mr. Game & Watch", "Pikachu"]
        }
    },
    {
        id: "wario",
        name: "Wario",
        image: "placeholder.jpg",
        type: "Bait-and-Punish / Waft",
        description: "Mobilité aérienne unique et Waft pour early kills.",
        videoUrl: DEFAULT_CHARACTER_VIDEO,
        stats: {
            speed: 7,
            power: 7,
            weight: 6,
            projectiles: 2,
            aerial: 9,
            combo: 7
        },
        strengths: [
            "Waft tue à 50%",
            "Meilleure drift aérienne",
            "Bike pour mixups"
        ],
        weaknesses: [
            "Range limité",
            "Dépendant de Waft",
            "CQC moyen"
        ],
        matchups: {
            strongVs: ["Fox", "Wolf"],
            weakVs: ["Lucina", "Palutena"]
        }
    },
    {
        id: "snake",
        name: "Snake",
        image: "placeholder.jpg",
        type: "Trapper / Zoner",
        description: "Grenades et mines pour contrôle de scène, weight élevé.",
        videoUrl: DEFAULT_CHARACTER_VIDEO,
        stats: {
            speed: 5,
            power: 8,
            weight: 7,
            projectiles: 8,
            aerial: 6,
            combo: 5
        },
        strengths: [
            "Grenades contrôlent neutral",
            "Weight élevé",
            "Kill power excellent"
        ],
        weaknesses: [
            "Recovery exploitable",
            "CQC limité",
            "Dépendant des items"
        ],
        matchups: {
            strongVs: ["Donkey Kong", "Ganondorf"],
            weakVs: ["Pikachu", "Fox"]
        }
    },
    {
        id: "ike",
        name: "Ike",
        image: "placeholder.jpg",
        type: "Heavyweight Swordsman",
        description: "Range énorme et kill power élevé, mais lent au sol.",
        videoUrl: DEFAULT_CHARACTER_VIDEO,
        stats: {
            speed: 5,
            power: 9,
            weight: 7,
            projectiles: 0,
            aerial: 7,
            combo: 5
        },
        strengths: [
            "Range exceptionnelle",
            "Kill power très élevé",
            "Nair broken"
        ],
        weaknesses: [
            "Lent au sol",
            "Frame data moyenne",
            "Exploitable en neutral"
        ],
        matchups: {
            strongVs: ["Donkey Kong", "Bowser"],
            weakVs: ["Pikachu", "Fox"]
        }
    },
    {
        id: "pokemon-trainer",
        name: "Pokemon Trainer",
        image: "placeholder.jpg",
        type: "Stance Change / Versatile",
        description: "Trois Pokémon avec styles différents: Squirtle, Ivysaur, Charizard.",
        videoUrl: DEFAULT_CHARACTER_VIDEO,
        stats: {
            speed: 7,
            power: 7,
            weight: 6,
            projectiles: 6,
            aerial: 7,
            combo: 8
        },
        strengths: [
            "Adaptabilité aux matchups",
            "Ivysaur neutral excellent",
            "Switch pour éviter combos"
        ],
        weaknesses: [
            "Trois recoveries différentes",
            "Charizard combo food",
            "Complexe à maîtriser"
        ],
        matchups: {
            strongVs: ["Donkey Kong", "Ganondorf"],
            weakVs: ["Fox", "Pikachu"]
        }
    },
    {
        id: "lucas",
        name: "Lucas",
        image: "placeholder.jpg",
        type: "Zoner / All-Rounder",
        description: "PK Fire et zair pour spacing, kill power excellent.",
        videoUrl: DEFAULT_CHARACTER_VIDEO,
        stats: {
            speed: 6,
            power: 8,
            weight: 5,
            projectiles: 7,
            aerial: 8,
            combo: 7
        },
        strengths: [
            "Zair pour spacing",
            "Kill power très élevé",
            "PK Freeze pour edgeguard"
        ],
        weaknesses: [
            "Recovery exploitable",
            "Frame data moyenne",
            "Grab laggy"
        ],
        matchups: {
            strongVs: ["Donkey Kong", "Ganondorf"],
            weakVs: ["Fox", "Pikachu"]
        }
    },
    {
        id: "sonic",
        name: "Sonic",
        image: "placeholder.jpg",
        type: "Bait-and-Punish / Hit-and-Run",
        description: "Le plus rapide du jeu, neutral évasif et timeout potential.",
        videoUrl: DEFAULT_CHARACTER_VIDEO,
        stats: {
            speed: 10,
            power: 5,
            weight: 5,
            projectiles: 0,
            aerial: 6,
            combo: 6
        },
        strengths: [
            "Vitesse absolue",
            "Timeout game excellent",
            "Hard to catch"
        ],
        weaknesses: [
            "Kill power faible",
            "Aucun projectile",
            "Playstyle campy"
        ],
        matchups: {
            strongVs: ["Link", "Samus"],
            weakVs: ["Pikachu", "Joker"]
        }
    },
    {
        id: "king-dedede",
        name: "King Dedede",
        image: "placeholder.jpg",
        type: "Heavyweight / Gordo",
        description: "Super lourd avec Gordo pour pression et multiple jumps.",
        videoUrl: DEFAULT_CHARACTER_VIDEO,
        stats: {
            speed: 4,
            power: 8,
            weight: 9,
            projectiles: 7,
            aerial: 6,
            combo: 5
        },
        strengths: [
            "Gordo contrôle neutral",
            "Multiple jumps",
            "Weight très élevé"
        ],
        weaknesses: [
            "Gordo réfléchissable",
            "Très lent",
            "Combo food énorme"
        ],
        matchups: {
            strongVs: ["Little Mac"],
            weakVs: ["Pikachu", "Fox", "Mario"]
        }
    },
    {
        id: "olimar",
        name: "Olimar",
        image: "placeholder.jpg",
        type: "Puppeteer / Zoner",
        description: "Pikmin pour range et priority, mais fragile sans eux.",
        videoUrl: DEFAULT_CHARACTER_VIDEO,
        stats: {
            speed: 6,
            power: 7,
            weight: 4,
            projectiles: 8,
            aerial: 7,
            combo: 7
        },
        strengths: [
            "Range avec Pikmin",
            "Priority excellente",
            "Smash attacks puissants"
        ],
        weaknesses: [
            "Vulnérable sans Pikmin",
            "Recovery courte",
            "Poids léger"
        ],
        matchups: {
            strongVs: ["Donkey Kong", "Bowser"],
            weakVs: ["Fox", "Pikachu"]
        }
    },
    {
        id: "lucario",
        name: "Lucario",
        image: "placeholder.jpg",
        type: "Comeback / Aura",
        description: "Aura augmente damage et knockback à haut pourcentage.",
        videoUrl: DEFAULT_CHARACTER_VIDEO,
        stats: {
            speed: 7,
            power: 6,
            weight: 5,
            projectiles: 7,
            aerial: 7,
            combo: 6
        },
        strengths: [
            "Aura pour comebacks",
            "Recovery très longue",
            "Force sphere pour neutral"
        ],
        weaknesses: [
            "Faible à bas pourcentage",
            "Inconsistent damage",
            "Frame data moyenne"
        ],
        matchups: {
            strongVs: ["Donkey Kong", "Ganondorf"],
            weakVs: ["Fox", "Pikachu"]
        }
    },
    {
        id: "rob",
        name: "R.O.B.",
        image: "placeholder.jpg",
        type: "Zoner / All-Rounder",
        description: "Laser et gyro pour neutral, weight élevé et recovery excellente.",
        videoUrl: DEFAULT_CHARACTER_VIDEO,
        stats: {
            speed: 6,
            power: 7,
            weight: 7,
            projectiles: 9,
            aerial: 7,
            combo: 7
        },
        strengths: [
            "Gyro contrôle neutral",
            "Weight élevé",
            "Recovery exceptionnelle"
        ],
        weaknesses: [
            "Large hitbox",
            "Gyro utilisable contre lui",
            "CQC moyen"
        ],
        matchups: {
            strongVs: ["Donkey Kong", "Ganondorf"],
            weakVs: ["Fox", "Pikachu"]
        }
    },
    {
        id: "toon-link",
        name: "Toon Link",
        image: "placeholder.jpg",
        type: "Zoner / Floaty",
        description: "Version floaty de Link avec projectiles et bombs.",
        videoUrl: DEFAULT_CHARACTER_VIDEO,
        stats: {
            speed: 7,
            power: 6,
            weight: 5,
            projectiles: 9,
            aerial: 7,
            combo: 6
        },
        strengths: [
            "Trois projectiles",
            "Bombs pour setups",
            "Mobilité correcte"
        ],
        weaknesses: [
            "Kill power moyenne",
            "Range inférieur à Link",
            "Recovery exploitable"
        ],
        matchups: {
            strongVs: ["Donkey Kong", "Ganondorf"],
            weakVs: ["Fox", "Pikachu"]
        }
    },
    {
        id: "wolf",
        name: "Wolf",
        image: "placeholder.jpg",
        type: "All-Rounder / Spacie",
        description: "Spacie avec kill power élevé et blaster pour pression.",
        videoUrl: DEFAULT_CHARACTER_VIDEO,
        stats: {
            speed: 8,
            power: 8,
            weight: 6,
            projectiles: 7,
            aerial: 8,
            combo: 7
        },
        strengths: [
            "Kill power excellent",
            "Blaster pour neutral",
            "Frame data solide"
        ],
        weaknesses: [
            "Recovery exploitable",
            "Range moyen",
            "Vulnerable off-stage"
        ],
        matchups: {
            strongVs: ["Donkey Kong", "Bowser"],
            weakVs: ["Pikachu", "Fox"]
        }
    },
    {
        id: "villager",
        name: "Villager",
        image: "placeholder.jpg",
        type: "Trapper / Zoner",
        description: "Pocket et projectiles pour contrôle, playstyle défensif.",
        videoUrl: DEFAULT_CHARACTER_VIDEO,
        stats: {
            speed: 6,
            power: 6,
            weight: 5,
            projectiles: 8,
            aerial: 7,
            combo: 5
        },
        strengths: [
            "Pocket reflète projectiles",
            "Bowling ball spike",
            "Recovery excellente"
        ],
        weaknesses: [
            "CQC très limité",
            "Inconsistent kill power",
            "Slow playstyle"
        ],
        matchups: {
            strongVs: ["Samus", "Link"],
            weakVs: ["Fox", "Pikachu"]
        }
    },
    {
        id: "mega-man",
        name: "Mega Man",
        image: "placeholder.jpg",
        type: "Zoner / Projectile",
        description: "Tous les coups sont projectiles, contrôle de zone unique.",
        videoUrl: DEFAULT_CHARACTER_VIDEO,
        stats: {
            speed: 6,
            power: 7,
            weight: 6,
            projectiles: 10,
            aerial: 7,
            combo: 6
        },
        strengths: [
            "Projectiles sur tous coups",
            "Metal Blade versatile",
            "Lemons pour chip damage"
        ],
        weaknesses: [
            "CQC inexistant",
            "Grab horrible",
            "Kill setups difficiles"
        ],
        matchups: {
            strongVs: ["Donkey Kong", "Ganondorf"],
            weakVs: ["Fox", "Pikachu"]
        }
    },
    {
        id: "wii-fit-trainer",
        name: "Wii Fit Trainer",
        image: "placeholder.jpg",
        type: "Zoner / Buff",
        description: "Deep Breathing buff et hitbox unique difficile à lire.",
        videoUrl: DEFAULT_CHARACTER_VIDEO,
        stats: {
            speed: 7,
            power: 6,
            weight: 5,
            projectiles: 7,
            aerial: 7,
            combo: 6
        },
        strengths: [
            "Deep Breathing buff damage",
            "Hitbox unique",
            "Header pour edgeguard"
        ],
        weaknesses: [
            "Inconsistent hitboxes",
            "Dépendant de Deep Breathing",
            "Kill power moyenne"
        ],
        matchups: {
            strongVs: ["Donkey Kong", "Ganondorf"],
            weakVs: ["Fox", "Pikachu"]
        }
    },
    {
        id: "rosalina-luma",
        name: "Rosalina & Luma",
        image: "placeholder.jpg",
        type: "Puppeteer / Floaty",
        description: "Luma pour hitbox disjoints et pression, gravité unique.",
        videoUrl: DEFAULT_CHARACTER_VIDEO,
        stats: {
            speed: 6,
            power: 7,
            weight: 4,
            projectiles: 6,
            aerial: 9,
            combo: 7
        },
        strengths: [
            "Luma pour coverage",
            "Gravité floaty unique",
            "Absorb projectiles"
        ],
        weaknesses: [
            "Vulnérable sans Luma",
            "Large hurtbox",
            "Poids léger"
        ],
        matchups: {
            strongVs: ["Ness", "Lucas"],
            weakVs: ["Fox", "Wolf"]
        }
    },
    {
        id: "little-mac",
        name: "Little Mac",
        image: "placeholder.jpg",
        type: "Ground Fighter / Glass Cannon",
        description: "Dominant au sol avec super armor, horrible en l'air.",
        videoUrl: DEFAULT_CHARACTER_VIDEO,
        stats: {
            speed: 9,
            power: 9,
            weight: 6,
            projectiles: 0,
            aerial: 1,
            combo: 7
        },
        strengths: [
            "Meilleur ground game",
            "Super armor smash attacks",
            "KO Punch instant kill"
        ],
        weaknesses: [
            "Pire jeu aérien",
            "Recovery horrible",
            "Off-stage = mort"
        ],
        matchups: {
            strongVs: ["Ganondorf"],
            weakVs: ["Pikachu", "Fox", "Tous avec throw"]
        }
    },
    {
        id: "greninja",
        name: "Greninja",
        image: "placeholder.jpg",
        type: "Hit-and-Run / Ninja",
        description: "Mobilité unique et dash attack burst option.",
        videoUrl: DEFAULT_CHARACTER_VIDEO,
        stats: {
            speed: 9,
            power: 6,
            weight: 5,
            projectiles: 6,
            aerial: 8,
            combo: 8
        },
        strengths: [
            "Mobilité exceptionnelle",
            "Dash attack burst",
            "Substitute counter"
        ],
        weaknesses: [
            "Inconsistent confirms",
            "Nécessite précision",
            "Kill power moyenne"
        ],
        matchups: {
            strongVs: ["Donkey Kong", "Ganondorf"],
            weakVs: ["Mr. Game & Watch", "Pikachu"]
        }
    },
    {
        id: "palutena",
        name: "Palutena",
        image: "placeholder.jpg",
        type: "All-Rounder / Goddess",
        description: "Nair et bair excellents, teleport mixup et reflect.",
        videoUrl: DEFAULT_CHARACTER_VIDEO,
        stats: {
            speed: 8,
            power: 7,
            weight: 5,
            projectiles: 7,
            aerial: 9,
            combo: 7
        },
        strengths: [
            "Nair safe et rapide",
            "Teleport pour mixups",
            "Explosive Flame pour neutral"
        ],
        weaknesses: [
            "Damage output moyen",
            "Grab range court",
            "Off-stage risqué"
        ],
        matchups: {
            strongVs: ["Fox", "Ness"],
            weakVs: ["Lucina", "Wolf"]
        }
    },
    {
        id: "pac-man",
        name: "Pac-Man",
        image: "placeholder.jpg",
        type: "Trapper / Item",
        description: "Fruits et trampoline pour setups créatifs et complexes.",
        videoUrl: DEFAULT_CHARACTER_VIDEO,
        stats: {
            speed: 7,
            power: 6,
            weight: 5,
            projectiles: 8,
            aerial: 7,
            combo: 7
        },
        strengths: [
            "Fruits versatiles",
            "Trampoline pour setups",
            "Hydrant pour control"
        ],
        weaknesses: [
            "Complexe à maîtriser",
            "Items contre lui",
            "Inconsistent confirms"
        ],
        matchups: {
            strongVs: ["Donkey Kong", "Ganondorf"],
            weakVs: ["Fox", "Pikachu"]
        }
    },
    {
        id: "robin",
        name: "Robin",
        image: "placeholder.jpg",
        type: "Zoner / Tactician",
        description: "Tomes et Levin Sword pour kill power, durability limitée.",
        videoUrl: DEFAULT_CHARACTER_VIDEO,
        stats: {
            speed: 4,
            power: 8,
            weight: 5,
            projectiles: 8,
            aerial: 6,
            combo: 6
        },
        strengths: [
            "Levin Sword kill power",
            "Thunder spells variés",
            "Arcfire pour traps"
        ],
        weaknesses: [
            "Très lent",
            "Durability management",
            "Recovery exploitable"
        ],
        matchups: {
            strongVs: ["Donkey Kong", "Ganondorf"],
            weakVs: ["Fox", "Pikachu"]
        }
    },
    {
        id: "shulk",
        name: "Shulk",
        image: "placeholder.jpg",
        type: "Swordsman / Monado Arts",
        description: "Monado Arts changent stats, range énorme avec épée.",
        videoUrl: DEFAULT_CHARACTER_VIDEO,
        stats: {
            speed: 6,
            power: 7,
            weight: 6,
            projectiles: 0,
            aerial: 7,
            combo: 7
        },
        strengths: [
            "Meilleure range du jeu",
            "Monado Arts versatilité",
            "Kill power avec Smash Art"
        ],
        weaknesses: [
            "Frame data lente",
            "Nécessite Art management",
            "CQC difficile"
        ],
        matchups: {
            strongVs: ["Donkey Kong", "Ganondorf"],
            weakVs: ["Fox", "Pikachu"]
        }
    },
    {
        id: "bowser-jr",
        name: "Bowser Jr.",
        image: "placeholder.jpg",
        type: "All-Rounder / Clown Car",
        description: "Mechakoopa et cannonball pour neutral, hurtbox unique.",
        videoUrl: DEFAULT_CHARACTER_VIDEO,
        stats: {
            speed: 6,
            power: 7,
            weight: 6,
            projectiles: 7,
            aerial: 7,
            combo: 6
        },
        strengths: [
            "Mechakoopa pour neutral",
            "Body hurtbox réduit damage",
            "Recovery longue"
        ],
        weaknesses: [
            "Face hurtbox prend plus damage",
            "Kill power moyenne",
            "Frame data moyenne"
        ],
        matchups: {
            strongVs: ["Donkey Kong", "Ganondorf"],
            weakVs: ["Fox", "Pikachu"]
        }
    },
    {
        id: "duck-hunt",
        name: "Duck Hunt",
        image: "placeholder.jpg",
        type: "Zoner / Trapper",
        description: "Can et gunmen pour contrôle de zone complexe.",
        videoUrl: DEFAULT_CHARACTER_VIDEO,
        stats: {
            speed: 7,
            power: 6,
            weight: 4,
            projectiles: 9,
            aerial: 7,
            combo: 6
        },
        strengths: [
            "Can contrôle unique",
            "Gunmen pour pressure",
            "Clay pigeon edgeguard"
        ],
        weaknesses: [
            "Poids léger",
            "Kill power faible",
            "Technique élevée"
        ],
        matchups: {
            strongVs: ["Donkey Kong", "Ganondorf"],
            weakVs: ["Fox", "Pikachu"]
        }
    },
    {
        id: "ryu",
        name: "Ryu",
        image: "placeholder.jpg",
        type: "Fighting Game / Shoto",
        description: "Input commands pour true Shoryuken et Hadoken plus forts.",
        videoUrl: DEFAULT_CHARACTER_VIDEO,
        stats: {
            speed: 5,
            power: 8,
            weight: 6,
            projectiles: 7,
            aerial: 6,
            combo: 8
        },
        strengths: [
            "True input kill power",
            "Focus Attack armor",
            "Confirms from jab"
        ],
        weaknesses: [
            "Lent",
            "Recovery linéaire",
            "Nécessite inputs"
        ],
        matchups: {
            strongVs: ["Donkey Kong", "Ganondorf"],
            weakVs: ["Pikachu", "Fox"]
        }
    },
    {
        id: "ken",
        name: "Ken",
        image: "placeholder.jpg",
        type: "Fighting Game / Shoto Echo",
        description: "Clone de Ryu plus rapide avec différents confirms.",
        videoUrl: DEFAULT_CHARACTER_VIDEO,
        stats: {
            speed: 6,
            power: 8,
            weight: 6,
            projectiles: 7,
            aerial: 7,
            combo: 9
        },
        strengths: [
            "Plus rapide que Ryu",
            "Combo game supérieur",
            "True input kills"
        ],
        weaknesses: [
            "Recovery linéaire",
            "Nécessite inputs",
            "Range moyen"
        ],
        matchups: {
            strongVs: ["Donkey Kong", "Ganondorf"],
            weakVs: ["Pikachu", "Fox"]
        }
    },
    {
        id: "cloud",
        name: "Cloud",
        image: "placeholder.jpg",
        type: "Swordsman / Limit",
        description: "Limit Break pour buff temporaire, range excellente.",
        videoUrl: DEFAULT_CHARACTER_VIDEO,
        stats: {
            speed: 8,
            power: 8,
            weight: 6,
            projectiles: 5,
            aerial: 8,
            combo: 7
        },
        strengths: [
            "Limit buff très fort",
            "Range excellente",
            "Neutral dominant"
        ],
        weaknesses: [
            "Recovery horrible sans limit",
            "Off-stage très risqué",
            "Exploitable sans limit"
        ],
        matchups: {
            strongVs: ["Donkey Kong", "Ganondorf"],
            weakVs: ["Pikachu", "Edgeguarders"]
        }
    },
    {
        id: "corrin",
        name: "Corrin",
        image: "placeholder.jpg",
        type: "Swordsman / Dragon",
        description: "Dragon fang shot pour stun, tipper sur smash attacks.",
        videoUrl: DEFAULT_CHARACTER_VIDEO,
        stats: {
            speed: 6,
            power: 7,
            weight: 5,
            projectiles: 6,
            aerial: 7,
            combo: 7
        },
        strengths: [
            "Dragon fang stun",
            "Range excellente",
            "Tipper kill power"
        ],
        weaknesses: [
            "Mobilité moyenne",
            "Recovery exploitable",
            "Frame data lente"
        ],
        matchups: {
            strongVs: ["Donkey Kong", "Ganondorf"],
            weakVs: ["Fox", "Pikachu"]
        }
    },
    {
        id: "bayonetta",
        name: "Bayonetta",
        image: "placeholder.jpg",
        type: "Combo / Witch Time",
        description: "Witch Time counter et ladder combos, mais nerfs importants.",
        videoUrl: DEFAULT_CHARACTER_VIDEO,
        stats: {
            speed: 7,
            power: 6,
            weight: 4,
            projectiles: 5,
            aerial: 9,
            combo: 10
        },
        strengths: [
            "Witch Time counter",
            "Ladder combos unique",
            "Recovery excellente"
        ],
        weaknesses: [
            "Nerfs importants depuis Smash 4",
            "Inconsistent combos",
            "Poids léger"
        ],
        matchups: {
            strongVs: ["Donkey Kong", "Ganondorf"],
            weakVs: ["Pikachu", "Mr. Game & Watch"]
        }
    },
    {
        id: "inkling",
        name: "Inkling",
        image: "placeholder.jpg",
        type: "Rushdown / Ink",
        description: "Ink augmente damage, roller pour mobility et mixups.",
        videoUrl: DEFAULT_CHARACTER_VIDEO,
        stats: {
            speed: 9,
            power: 7,
            weight: 5,
            projectiles: 6,
            aerial: 8,
            combo: 8
        },
        strengths: [
            "Ink buff damage",
            "Mobilité excellente",
            "Roller bury setup"
        ],
        weaknesses: [
            "Nécessite ink management",
            "Poids léger",
            "Recovery moyenne"
        ],
        matchups: {
            strongVs: ["Donkey Kong", "Ganondorf"],
            weakVs: ["Mr. Game & Watch", "Palutena"]
        }
    },
    {
        id: "ridley",
        name: "Ridley",
        image: "placeholder.jpg",
        type: "Heavyweight / Dragon",
        description: "Grand et léger, kill power élevé mais combo food.",
        videoUrl: DEFAULT_CHARACTER_VIDEO,
        stats: {
            speed: 7,
            power: 9,
            weight: 6,
            projectiles: 5,
            aerial: 7,
            combo: 5
        },
        strengths: [
            "Kill power énorme",
            "Range excellente",
            "Skewer instant kill setup"
        ],
        weaknesses: [
            "Léger pour sa taille",
            "Énorme hitbox",
            "Recovery exploitable"
        ],
        matchups: {
            strongVs: ["Donkey Kong", "Ganondorf"],
            weakVs: ["Pikachu", "Fox"]
        }
    },
    {
        id: "simon",
        name: "Simon",
        image: "placeholder.jpg",
        type: "Zoner / Belmont",
        description: "Whip pour range énorme et projectiles multiples.",
        videoUrl: DEFAULT_CHARACTER_VIDEO,
        stats: {
            speed: 5,
            power: 7,
            weight: 6,
            projectiles: 9,
            aerial: 6,
            combo: 5
        },
        strengths: [
            "Range énorme",
            "Projectiles variés",
            "Edgeguarding excellent"
        ],
        weaknesses: [
            "Lent",
            "Recovery horrible",
            "CQC très limité"
        ],
        matchups: {
            strongVs: ["Donkey Kong", "Little Mac"],
            weakVs: ["Fox", "Pikachu"]
        }
    },
    {
        id: "richter",
        name: "Richter",
        image: "placeholder.jpg",
        type: "Zoner / Belmont Echo",
        description: "Clone de Simon avec holy water feu vs aura.",
        videoUrl: DEFAULT_CHARACTER_VIDEO,
        stats: {
            speed: 5,
            power: 7,
            weight: 6,
            projectiles: 9,
            aerial: 6,
            combo: 5
        },
        strengths: [
            "Range énorme",
            "Projectiles variés",
            "Edgeguarding excellent"
        ],
        weaknesses: [
            "Lent",
            "Recovery horrible",
            "CQC très limité"
        ],
        matchups: {
            strongVs: ["Donkey Kong", "Little Mac"],
            weakVs: ["Fox", "Pikachu"]
        }
    },
    {
        id: "king-k-rool",
        name: "King K. Rool",
        image: "placeholder.jpg",
        type: "Super Heavyweight / Armor",
        description: "Belly armor et projectiles, très lourd mais exploitable.",
        videoUrl: DEFAULT_CHARACTER_VIDEO,
        stats: {
            speed: 4,
            power: 9,
            weight: 9,
            projectiles: 7,
            aerial: 5,
            combo: 4
        },
        strengths: [
            "Belly armor unique",
            "Weight très élevé",
            "Crown et cannon pour neutral"
        ],
        weaknesses: [
            "Très lent",
            "Recovery exploitable",
            "Armor cassable"
        ],
        matchups: {
            strongVs: ["Little Mac", "Ganondorf"],
            weakVs: ["Pikachu", "Fox", "Mario"]
        }
    },
    {
        id: "isabelle",
        name: "Isabelle",
        image: "placeholder.jpg",
        type: "Trapper / Support",
        description: "Fishing rod et lloyd rocket pour traps, version défensive de Villager.",
        videoUrl: DEFAULT_CHARACTER_VIDEO,
        stats: {
            speed: 6,
            power: 5,
            weight: 4,
            projectiles: 8,
            aerial: 7,
            combo: 6
        },
        strengths: [
            "Fishing rod unique",
            "Pocket reflète projectiles",
            "Lloyd rocket pression"
        ],
        weaknesses: [
            "Kill power très faible",
            "CQC limité",
            "Poids léger"
        ],
        matchups: {
            strongVs: ["Samus", "Link"],
            weakVs: ["Fox", "Pikachu"]
        }
    },
    {
        id: "incineroar",
        name: "Incineroar",
        image: "placeholder.jpg",
        type: "Grappler / Wrestler",
        description: "Revenge buff et command grabs, mais très lent.",
        videoUrl: DEFAULT_CHARACTER_VIDEO,
        stats: {
            speed: 3,
            power: 9,
            weight: 7,
            projectiles: 1,
            aerial: 5,
            combo: 6
        },
        strengths: [
            "Revenge buff énorme",
            "Command grabs puissants",
            "Kill power élevé"
        ],
        weaknesses: [
            "Plus lent du roster",
            "Recovery horrible",
            "Aucune mobilité"
        ],
        matchups: {
            strongVs: ["Ganondorf", "Little Mac"],
            weakVs: ["Pikachu", "Fox", "Tous projectiles"]
        }
    },
    {
        id: "piranha-plant",
        name: "Piranha Plant",
        image: "placeholder.jpg",
        type: "Trapper / Zoner",
        description: "Ptooie et poison cloud pour contrôle, moveset unique.",
        videoUrl: DEFAULT_CHARACTER_VIDEO,
        stats: {
            speed: 5,
            power: 7,
            weight: 6,
            projectiles: 8,
            aerial: 6,
            combo: 6
        },
        strengths: [
            "Ptooie pour neutral",
            "Poison cloud damage",
            "Long Stem Strike armor"
        ],
        weaknesses: [
            "Lent",
            "Recovery exploitable",
            "Frame data lente"
        ],
        matchups: {
            strongVs: ["Donkey Kong", "Ganondorf"],
            weakVs: ["Fox", "Pikachu"]
        }
    },
    {
        id: "joker",
        name: "Joker",
        image: "placeholder.jpg",
        type: "All-Rounder / Arsene",
        description: "Arsene buff massif quand rebellion gauge pleine.",
        videoUrl: DEFAULT_CHARACTER_VIDEO,
        stats: {
            speed: 9,
            power: 7,
            weight: 5,
            projectiles: 6,
            aerial: 9,
            combo: 9
        },
        strengths: [
            "Arsene buff massif",
            "Frame data excellente",
            "Mobilité top tier"
        ],
        weaknesses: [
            "Faible sans Arsene",
            "Poids léger",
            "Dépendant de rebellion gauge"
        ],
        matchups: {
            strongVs: ["Fox", "Pikachu"],
            weakVs: ["Lucina", "Palutena"]
        }
    },
    {
        id: "hero",
        name: "Hero",
        image: "placeholder.jpg",
        type: "Swordsman / RNG",
        description: "Command menu RNG avec spells variés, criticals aléatoires.",
        videoUrl: DEFAULT_CHARACTER_VIDEO,
        stats: {
            speed: 6,
            power: 8,
            weight: 6,
            projectiles: 8,
            aerial: 6,
            combo: 6
        },
        strengths: [
            "Command menu versatile",
            "Critical hits random",
            "Spells très puissants"
        ],
        weaknesses: [
            "RNG dépendant",
            "MP management nécessaire",
            "Recovery exploitable"
        ],
        matchups: {
            strongVs: ["Donkey Kong", "Ganondorf"],
            weakVs: ["Fox", "Pikachu"]
        }
    },
    {
        id: "banjo-kazooie",
        name: "Banjo & Kazooie",
        image: "placeholder.jpg",
        type: "All-Rounder / Zoner",
        description: "Wonderwing invincible et projectiles variés.",
        videoUrl: DEFAULT_CHARACTER_VIDEO,
        stats: {
            speed: 7,
            power: 7,
            weight: 6,
            projectiles: 7,
            aerial: 7,
            combo: 6
        },
        strengths: [
            "Wonderwing invincible",
            "Grenade egg pour edgeguard",
            "Versatilité"
        ],
        weaknesses: [
            "Wonderwing uses limitées",
            "Kill power moyenne",
            "Frame data moyenne"
        ],
        matchups: {
            strongVs: ["Donkey Kong", "Ganondorf"],
            weakVs: ["Fox", "Pikachu"]
        }
    },
    {
        id: "terry",
        name: "Terry",
        image: "placeholder.jpg",
        type: "Fighting Game / Brawler",
        description: "GO moves à 100%, true inputs et super armor.",
        videoUrl: DEFAULT_CHARACTER_VIDEO,
        stats: {
            speed: 6,
            power: 8,
            weight: 6,
            projectiles: 7,
            aerial: 6,
            combo: 8
        },
        strengths: [
            "GO moves kill early",
            "Super armor",
            "True input bonus"
        ],
        weaknesses: [
            "Recovery exploitable",
            "Range limité",
            "Nécessite inputs"
        ],
        matchups: {
            strongVs: ["Donkey Kong", "Ganondorf"],
            weakVs: ["Pikachu", "Fox"]
        }
    },
    {
        id: "byleth",
        name: "Byleth",
        image: "placeholder.jpg",
        type: "Swordsman / Range",
        description: "Quatre armes pour range variable, kill power élevé.",
        videoUrl: DEFAULT_CHARACTER_VIDEO,
        stats: {
            speed: 5,
            power: 9,
            weight: 6,
            projectiles: 3,
            aerial: 7,
            combo: 6
        },
        strengths: [
            "Range énorme variée",
            "Kill power très élevé",
            "Aymr armor"
        ],
        weaknesses: [
            "Très lent",
            "Frame data lente",
            "Recovery exploitable"
        ],
        matchups: {
            strongVs: ["Donkey Kong", "Ganondorf"],
            weakVs: ["Pikachu", "Fox"]
        }
    },
    {
        id: "min-min",
        name: "Min Min",
        image: "placeholder.jpg",
        type: "Zoner / ARMS",
        description: "Range la plus longue pour pokes, contrôle de zone absolu.",
        videoUrl: DEFAULT_CHARACTER_VIDEO,
        stats: {
            speed: 5,
            power: 7,
            weight: 6,
            projectiles: 8,
            aerial: 6,
            combo: 5
        },
        strengths: [
            "Range absolue la plus longue",
            "Contrôle de zone dominant",
            "ARMS charge buff"
        ],
        weaknesses: [
            "CQC horrible",
            "Recovery linéaire",
            "Vulnérable au rush"
        ],
        matchups: {
            strongVs: ["Donkey Kong", "Ganondorf", "Little Mac"],
            weakVs: ["Pikachu", "Fox"]
        }
    },
    {
        id: "steve",
        name: "Steve",
        image: "placeholder.jpg",
        type: "Crafter / Unique",
        description: "Mine resources et craft, moveset complètement unique.",
        videoUrl: DEFAULT_CHARACTER_VIDEO,
        stats: {
            speed: 6,
            power: 8,
            weight: 6,
            projectiles: 6,
            aerial: 7,
            combo: 7
        },
        strengths: [
            "Blocks pour stage control",
            "Minecart for setups",
            "Crafting buff moves"
        ],
        weaknesses: [
            "Nécessite resource management",
            "Vulnerability pendant mining",
            "Recovery exploitable"
        ],
        matchups: {
            strongVs: ["Donkey Kong", "Ganondorf"],
            weakVs: ["Pikachu", "Fox"]
        }
    },
    {
        id: "sephiroth",
        name: "Sephiroth",
        image: "placeholder.jpg",
        type: "Swordsman / Glass Cannon",
        description: "Range absurde et One-Winged Angel buff, mais très léger.",
        videoUrl: DEFAULT_CHARACTER_VIDEO,
        stats: {
            speed: 7,
            power: 9,
            weight: 3,
            projectiles: 7,
            aerial: 8,
            combo: 6
        },
        strengths: [
            "Range la plus longue des swords",
            "One-Winged Angel buff",
            "Kill power énorme"
        ],
        weaknesses: [
            "Deuxième plus léger",
            "Large hitbox",
            "Frame data lente"
        ],
        matchups: {
            strongVs: ["Donkey Kong", "Ganondorf"],
            weakVs: ["Pikachu", "Fox"]
        }
    },
    {
        id: "pyra-mythra",
        name: "Pyra/Mythra",
        image: "placeholder.jpg",
        type: "Stance Change / Dual",
        description: "Swap entre Mythra (speed) et Pyra (power).",
        videoUrl: DEFAULT_CHARACTER_VIDEO,
        stats: {
            speed: 8,
            power: 8,
            weight: 5,
            projectiles: 5,
            aerial: 8,
            combo: 8
        },
        strengths: [
            "Mythra vitesse top tier",
            "Pyra kill power énorme",
            "Adaptabilité aux situations"
        ],
        weaknesses: [
            "Mythra kill power faible",
            "Pyra lente",
            "Recovery exploitable"
        ],
        matchups: {
            strongVs: ["Donkey Kong", "Ganondorf"],
            weakVs: ["Pikachu", "Mr. Game & Watch"]
        }
    },
    {
        id: "kazuya",
        name: "Kazuya",
        image: "placeholder.jpg",
        type: "Fighting Game / Tekken",
        description: "True combos de Tekken, super armor et crouch dash.",
        videoUrl: DEFAULT_CHARACTER_VIDEO,
        stats: {
            speed: 5,
            power: 9,
            weight: 7,
            projectiles: 5,
            aerial: 5,
            combo: 10
        },
        strengths: [
            "True combos dévastateurs",
            "Super armor sur moves",
            "Intangibility on moves"
        ],
        weaknesses: [
            "Très lent",
            "Recovery exploitable",
            "Nécessite inputs complexes"
        ],
        matchups: {
            strongVs: ["Donkey Kong", "Ganondorf"],
            weakVs: ["Pikachu", "Fox"]
        }
    },
    {
        id: "sora",
        name: "Sora",
        image: "placeholder.jpg",
        type: "Floaty / Magic",
        description: "Trois spells et mobilité aérienne unique, dernier DLC.",
        videoUrl: DEFAULT_CHARACTER_VIDEO,
        stats: {
            speed: 7,
            power: 6,
            weight: 4,
            projectiles: 7,
            aerial: 9,
            combo: 8
        },
        strengths: [
            "Mobilité aérienne unique",
            "Spells pour versatilité",
            "Recovery excellente"
        ],
        weaknesses: [
            "Poids léger",
            "Kill power moyenne",
            "Range moyen"
        ],
        matchups: {
            strongVs: ["Donkey Kong", "Ganondorf"],
            weakVs: ["Mr. Game & Watch", "Palutena"]
        }
    }
];
