const FILTER_OPTIONS = [
  {
    "label": "Aura Stripes",
    "value": "horizontal_lines"
  },
  {
    "label": "Blue Haze",
    "value": "extreme_offset_blue"
  },
  {
    "label": "Emerald Shift",
    "value": "extreme_offset_green"
  },
  {
    "label": "Green Glimmer",
    "value": "offset_green"
  },
  {
    "label": "Azure Pulse",
    "value": "extra_offset_blue"
  },
  {
    "label": "Crimson Pulse",
    "value": "extra_offset_red"
  },
  {
    "label": "Emerald Pulse",
    "value": "extra_offset_green"
  },
  {
    "label": "Crimson Surge",
    "value": "extreme_offset_red"
  },
  {
    "label": "Red Glitters",
    "value": "specks_redscale"
  },
  {
    "label": "Mystic",
    "value": "eclectic"
  },
  {
    "label": "Window Pane",
    "value": "pane"
  },
  {
    "label": "Diagonal Stripes",
    "value": "diagonal_lines"
  },
  {
    "label": "Green Sprinkles",
    "value": "green_specks"
  },
  {
    "label": "Casino Royale",
    "value": "casino"
  },
  {
    "label": "Golden Casino",
    "value": "yellow_casino"
  },
  {
    "label": "Green Stripes",
    "value": "green_diagonal_lines"
  },
  {
    "label": "Displacement",
    "value": "offset"
  },
  {
    "label": "Blue Shift",
    "value": "offset_blue"
  },
  {
    "label": "Modernist",
    "value": "neue"
  },
  {
    "label": "Sunset Glow",
    "value": "sunset"
  },
  {
    "label": "Starry Night",
    "value": "specks"
  },
  {
    "label": "Timber",
    "value": "wood"
  },
  {
    "label": "Lix",
    "value": "lix"
  },
  {
    "label": "Ryo",
    "value": "ryo"
  },
  {
    "label": "Blue Mood",
    "value": "bluescale"
  },
  {
    "label": "Solange Blush",
    "value": "solange"
  },
  {
    "label": "Evening Hues",
    "value": "evening"
  },
  {
    "label": "Crimson Dream",
    "value": "crimson"
  },
  {
    "label": "Teal Mist",
    "value": "teal_min_noise"
  },
  {
    "label": "Phase Shift",
    "value": "phase"
  },
  {
    "label": "Purple Dusk",
    "value": "dark_purple_min_noise"
  },
  {
    "label": "Coral Reef",
    "value": "coral"
  },
  {
    "label": "Dark Aura",
    "value": "darkify"
  },
  {
    "label": "Brightness Boost",
    "value": "incbrightness"
  },
  {
    "label": "Radiance Boost",
    "value": "incbrightness2"
  },
  {
    "label": "Negate",
    "value": "invert"
  },
  {
    "label": "Saturation Fix",
    "value": "sat_adj"
  },
  {
    "label": "Lemon Zest",
    "value": "lemon"
  },
  {
    "label": "Pink Whisper",
    "value": "pink_min_noise"
  },
  {
    "label": "Front Focus",
    "value": "frontward"
  },
  {
    "label": "Vintage Aura",
    "value": "vintage"
  },
  {
    "label": "Perfumed",
    "value": "perfume"
  },
  {
    "label": "Calm Serenity",
    "value": "serenity"
  },
  {
    "label": "Pink Aura",
    "value": "pink_aura"
  },
  {
    "label": "Mystic Haze",
    "value": "haze"
  },
  {
    "label": "Cool Twilight",
    "value": "cool_twilight"
  },
  {
    "label": "Blue Vibes",
    "value": "blues"
  },
  {
    "label": "Horizon Line",
    "value": "horizon"
  },
  {
    "label": "Mellow Yellow",
    "value": "mellow"
  },
  {
    "label": "Solange Shadows",
    "value": "solange_dark"
  },
  {
    "label": "Solange Grey",
    "value": "solange_grey"
  },
  {
    "label": "Zapped",
    "value": "zapt"
  },
  {
    "label": "Eon Storm",
    "value": "eon"
  },
  {
    "label": "Aeon Flux",
    "value": "aeon"
  },
  {
    "label": "Digital Matrix",
    "value": "matrix"
  },
  {
    "label": "Cosmic Dust",
    "value": "cosmic"
  },
  {
    "label": "Minimal Noise",
    "value": "min_noise"
  },
  {
    "label": "Red Noise",
    "value": "red_min_noise"
  },
  {
    "label": "Matrix Reloaded",
    "value": "matrix2"
  },
  {
    "label": "Purple Dream",
    "value": "purplescale"
  },
  {
    "label": "Radio Waves",
    "value": "radio"
  },
  {
    "label": "Roaring Twenties",
    "value": "twenties"
  },
  {
    "label": "Ocean Waves",
    "value": "ocean"
  },
  {
    "label": "Aura Blue",
    "value": "a"
  },
  {
    "label": "Pixel Blue",
    "value": "pixel_blue"
  },
  {
    "label": "Classic Greyscale",
    "value": "greyscale"
  },
  {
    "label": "Grime Filter",
    "value": "grime"
  },
  {
    "label": "Red Monochrome",
    "value": "redgreyscale"
  },
  {
    "label": "Retro Violet",
    "value": "retroviolet"
  },
  {
    "label": "Green Monochrome",
    "value": "greengreyscale"
  },
  {
    "label": "Warm Aura",
    "value": "warmth"
  },
  {
    "label": "Green Medium Noise",
    "value": "green_med_noise"
  },
  {
    "label": "Emerald Mist",
    "value": "green_min_noise"
  },
  {
    "label": "Blue Mist",
    "value": "blue_min_noise"
  },
  {
    "label": "Rose Tint",
    "value": "rosetint"
  },
  {
    "label": "Purple Noise",
    "value": "purple_min_noise"
  }
];



export default FILTER_OPTIONS;
