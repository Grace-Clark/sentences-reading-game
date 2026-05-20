// 15 questions, each with a target sentence and 6 picture choices.
// The flow per question is:
//   1. Audio-only — 6 pictures, no printed sentence; student listens.
//   2. Sentence-only — the printed sentence alone, no pictures.
//   3. Choose — 6 pictures plus the printed sentence; student picks one.
//
// Each option has:
//   word      - filename of the picture (without extension), used as the option id
//   image     - the picture filename in assets/words/
//   audio     - (optional) audio filename in assets/audio/ if it differs from word
//   sentence  - the full sentence form spoken in feedback and shown in the report,
//               e.g. "The map is in the mud." for the map_in_mud option.
//
// `audio` is used because the recordings were named more concisely than the picture
// filenames (e.g. "bug_on_a_rug.png" pairs with "bug_on_rug.m4a"). When omitted, the
// game tries assets/audio/<word>.m4a.

const QUESTIONS = {
  practice: [
    {
      target: "car",
      prompt: "Point to the car.",
      options: [
        { word: "car",  image: "car.png" },
        { word: "ball", image: "ball.png" }
      ]
    },
    {
      target: "ball",
      prompt: "Point to the ball.",
      options: [
        { word: "car",  image: "car.png" },
        { word: "ball", image: "ball.png" }
      ]
    }
  ],
  main: [
    {
      targetSentence: "The cat can swim.",
      target: "cat_swimming",
      options: [
        { word: "cat_swimming", image: "cat_swimming.png", audio: "cat_can_swim", sentence: "The cat can swim." },
        { word: "can_swim",     image: "can_swim.png",     audio: "can_can_swim", sentence: "The can can swim." },
        { word: "cat_swig",     image: "cat_swig.png",     audio: "cat_can_swig", sentence: "The cat can swig." },
        { word: "kit_swim",     image: "kit_swim.png",     audio: "kit_can_swim", sentence: "The kit can swim." },
        { word: "rat_swim",     image: "rat_swim.png",     audio: "rat_can_swim", sentence: "The rat can swim." },
        { word: "cat_skim",     image: "cat_skim.png",     audio: "cat_can_skim", sentence: "The cat can skim." }
      ]
    },
    {
      targetSentence: "A bug is on the rug.",
      target: "bug_on_a_rug",
      options: [
        { word: "bug_on_a_rug",   image: "bug_on_a_rug.png",   audio: "bug_on_rug", sentence: "A bug is on the rug." },
        { word: "mug_on_a_rug",   image: "mug_on_a_rug.png",   audio: "mug_on_rug", sentence: "A mug is on the rug." },
        { word: "bug_on_a_jug",   image: "bug_on_a_jug.png",   audio: "bug_on_jug", sentence: "A bug is on the jug." },
        { word: "bug_on_the_run", image: "bug_on_the_run.png", audio: "bug_on_run", sentence: "A bug is on the run." },
        { word: "bun_on_a_rug",   image: "bun_on_a_rug.png",   audio: "bun_on_rug", sentence: "A bun is on the rug." },
        { word: "bug_in_a_rug",   image: "bug_in_a_rug.png",   audio: "bug_in_rug", sentence: "A bug is in the rug." }
      ]
    },
    {
      targetSentence: "The fox got a hat.",
      target: "fox_got_a_hat",
      options: [
        { word: "fox_got_a_hat",  image: "fox_got_a_hat.png",  audio: "fox_got_hat",  sentence: "The fox got a hat." },
        { word: "fox_got_a_bat",  image: "fox_got_a_bat.png",  audio: "fox_got_bat",  sentence: "The fox got a bat." },
        // "box with a hat" image, recording + sentence use "got"
        { word: "box_with_a_hat", image: "box_with_a_hat.png", audio: "box_got_hat",  sentence: "The box got a hat." },
        { word: "fox_got_a_hut",  image: "fox_got_a_hut.png",  audio: "fox_got_hut",  sentence: "The fox got a hut." },
        { word: "fax_got_a_hat",  image: "fax_got_a_hat.png",  audio: "fax_got_hat",  sentence: "The fax got a hat." },
        { word: "fawn_got_a_hat", image: "fawn_got_a_hat.png", audio: "fawn_got_hat", sentence: "The fawn got a hat." }
      ]
    },
    {
      targetSentence: "The pig has a bag.",
      target: "pig_has_a_bag",
      options: [
        { word: "pig_has_a_bag",   image: "pig_has_a_bag.png",   audio: "pig_has_bag",   sentence: "The pig has a bag." },
        { word: "pig_has_a_bug",   image: "pig_has_a_bug.png",   audio: "pig_has_bug",   sentence: "The pig has a bug." },
        { word: "pug_has_a_bag",   image: "pug_has_a_bag.png",   audio: "pug_has_bag",   sentence: "The pug has a bag." },
        { word: "pin_has_a_bag",   image: "pin_has_a_bag.png",   audio: "pin_has_bag",   sentence: "The pin has a bag." },
        { word: "pig_has_a_badge", image: "pig_has_a_badge.png", audio: "pig_has_badge", sentence: "The pig has a badge." },
        { word: "pig_has_a_rag",   image: "pig_has_a_rag.png",   audio: "pig_has_rag",   sentence: "The pig has a rag." }
      ]
    },
    {
      targetSentence: "The dog can sit.",
      target: "dog_can_sit",
      options: [
        { word: "dog_can_sit",  image: "dog_can_sit.png",  sentence: "The dog can sit." },
        { word: "doll_can_sit", image: "doll_can_sit.png", sentence: "The doll can sit." },
        { word: "dog_can_set",  image: "dog_can_set.png",  sentence: "The dog can set." },
        { word: "hog_can_sit",  image: "hog_can_sit.png",  sentence: "The hog can sit." },
        { word: "dog_can_sip",  image: "dog_can_sip.png",  sentence: "The dog can sip." },
        { word: "dog_can_hit",  image: "dog_can_hit.png",  sentence: "The dog can hit." }
      ]
    },
    {
      targetSentence: "The hen sat on an egg.",
      target: "hen_on_an_egg",
      options: [
        { word: "hen_on_an_egg",  image: "hen_on_an_egg.png",  audio: "hen_sat_on_egg", sentence: "The hen sat on an egg." },
        { word: "hen_pat_an_egg", image: "hen_pat_an_egg.png", audio: "hen_pat_egg",    sentence: "The hen pat an egg." },
        { word: "men_on_an_egg",  image: "men_on_an_egg.png",  audio: "men_sat_egg",    sentence: "The men sat on an egg." },
        { word: "head_on_an_egg", image: "head_on_an_egg.png", audio: "head_sat_egg",   sentence: "The head sat on an egg." },
        { word: "hen_sat_on_peg", image: "hen_sat_on_peg.png", audio: "hen_sat_peg",    sentence: "The hen sat on a peg." },
        { word: "hen_in_an_egg",  image: "hen_in_an_egg.png",  audio: "hen_sat_in_egg", sentence: "The hen sat in an egg." }
      ]
    },
    {
      targetSentence: "The cup is on the book.",
      target: "cup_is_on_the_book",
      options: [
        { word: "cup_is_on_the_book", image: "cup_is_on_the_book.png", audio: "cup_on_book", sentence: "The cup is on the book." },
        { word: "pup_on_the_book",    image: "pup_on_the_book.png",    audio: "pup_on_book", sentence: "The pup is on the book." },
        // "cup in a boot" image, recording + sentence use "on"
        { word: "cup_in_a_boot",      image: "cup_in_a_boot.png",      audio: "cup_on_boot", sentence: "The cup is on the boot." },
        { word: "cup_on_a_hook",      image: "cup_on_a_hook.png",      audio: "cup_on_hook", sentence: "The cup is on the hook." },
        { word: "cop_on_a_book",      image: "cop_on_a_book.png",      audio: "cop_on_book", sentence: "The cop is on the book." },
        { word: "cub_on_a_book",      image: "cub_on_a_book.png",      audio: "cub_on_book", sentence: "The cub is on the book." }
      ]
    },
    {
      targetSentence: "The star is on the ball.",
      target: "star_on_ball",
      options: [
        { word: "star_on_ball",     image: "star_on_ball.png",                          sentence: "The star is on the ball." },
        { word: "star_on_a_bell",   image: "star_on_a_bell.png",   audio: "star_on_bell",  sentence: "The star is on the bell." },
        // "star in a doll" image, recording + sentence use "on"
        { word: "star_in_a_doll",   image: "star_in_a_doll.png",   audio: "star_on_doll",  sentence: "The star is on the doll." },
        { word: "car_on_a_ball",    image: "car_on_a_ball.png",    audio: "car_on_ball",   sentence: "The car is on the ball." },
        { word: "star_on_the_wall", image: "star_on_the_wall.png", audio: "star_on_wall",  sentence: "The star is on the wall." },
        { word: "store_on_a_ball",  image: "store_on_a_ball.png",  audio: "store_on_ball", sentence: "The store is on the ball." }
      ]
    },
    {
      targetSentence: "The fish has a bat.",
      target: "fish_has_a_bat",
      options: [
        { word: "fish_has_a_bat",  image: "fish_has_a_bat.png",  audio: "fish_has_bat",  sentence: "The fish has a bat." },
        { word: "dish_has_a_bat",  image: "dish_has_a_bat.png",  audio: "dish_has_bat",  sentence: "The dish has a bat." },
        { word: "fin_has_a_bat",   image: "fin_has_a_bat.png",   audio: "fin_has_bat",   sentence: "The fin has a bat." },
        { word: "fish_has_a_beet", image: "fish_has_a_beet.png", audio: "fish_has_beet", sentence: "The fish has a beet." },
        { word: "fish_has_a_hat",  image: "fish_has_a_hat.png",  audio: "fish_has_hat",  sentence: "The fish has a hat." },
        { word: "fish_has_a_boat", image: "fish_has_a_boat.png", audio: "fish_has_boat", sentence: "The fish has a boat." }
      ]
    },
    {
      targetSentence: "The pup is on the moon.",
      target: "pup_on_the_moon",
      options: [
        { word: "pup_on_the_moon",  image: "pup_on_the_moon.png",  audio: "pup_on_moon",  sentence: "The pup is on the moon." },
        { word: "pup_on_a_spoon",   image: "pup_on_a_spoon.png",   audio: "pup_on_spoon", sentence: "The pup is on the spoon." },
        { word: "pup_on_a_moose",   image: "pup_on_a_moose.png",   audio: "pup_on_moose", sentence: "The pup is on the moose." },
        { word: "puck_on_the_moon", image: "puck_on_the_moon.png", audio: "puck_on_moon", sentence: "The puck is on the moon." },
        { word: "cup_on_the_moon",  image: "cup_on_the_moon.png",  audio: "cup_on_moon",  sentence: "The cup is on the moon." },
        { word: "pup_on_a_man",     image: "pup_on_a_man.png",     audio: "pup_on_man",   sentence: "The pup is on the man." }
      ]
    },
    {
      targetSentence: "The pen is on the tree.",
      target: "pen_on_a_tree",
      options: [
        { word: "pen_on_a_tree",   image: "pen_on_a_tree.png",   audio: "pen_on_tree", sentence: "The pen is on the tree." },
        { word: "ten_on_a_tree",   image: "ten_on_a_tree.png",   audio: "ten_on_tree", sentence: "The ten is on the tree." },
        { word: "pet_on_a_tree",   image: "pet_on_a_tree.png",   audio: "pet_on_tree", sentence: "The pet is on the tree." },
        { word: "pen_on_a_bee",    image: "pen_on_a_bee.png",    audio: "pen_on_bee",  sentence: "The pen is on the bee." },
        { word: "pen_on_a_tray",   image: "pen_on_a_tray.png",   audio: "pen_on_tray", sentence: "The pen is on the tray." },
        { word: "pin_on_the_tree", image: "pin_on_the_tree.png", audio: "pin_on_tree", sentence: "The pin is on the tree." }
      ]
    },
    {
      targetSentence: "The kite is in the sky.",
      target: "kite_in_the_sky",
      options: [
        { word: "kite_in_the_sky",    image: "kite_in_the_sky.png",    audio: "kite_in_sky",   sentence: "The kite is in the sky." },
        { word: "knight_in_the_sky",  image: "knight_in_the_sky.png",  audio: "knight_in_sky", sentence: "The knight is in the sky." },
        { word: "kit_in_the_sky",     image: "kit_in_the_sky.png",     audio: "kit_in_sky",    sentence: "The kit is in the sky." },
        { word: "kite_is_in_the_spy", image: "kite_is_in_the_spy.png", audio: "kite_in_spy",   sentence: "The kite is in the spy." },
        { word: "kite_in_the_ski",    image: "kite_in_the_ski.png",    audio: "kite_in_ski",   sentence: "The kite is in the ski." },
        // "kite in the tie" image, recording + sentence use "on"
        { word: "kite_in_the_tie",    image: "kite_in_the_tie.png",    audio: "kite_on_tie",   sentence: "The kite is on the tie." }
      ]
    },
    {
      targetSentence: "The mouse is in the house.",
      target: "mouse_in_a_house",
      options: [
        { word: "mouse_in_a_house",    image: "mouse_in_a_house.png",    audio: "mouse_in_house",  sentence: "The mouse is in the house." },
        { word: "house_in_a_house",    image: "house_in_a_house.png",    audio: "house_in_house",  sentence: "The house is in the house." },
        { word: "mouth_in_house",      image: "mouth_in_house.png",                                sentence: "The mouth is in the house." },
        { word: "mouse_in_a_hose",     image: "mouse_in_a_hose.png",     audio: "mouse_in_hose",   sentence: "The mouse is in the hose." },
        { word: "moose_in_the_house",  image: "moose_in_the_house.png",  audio: "moose_in_house",  sentence: "The moose is in the house." },
        // "mouse in the spouse" image, recording + sentence use "blouse"
        { word: "mouse_in_the_spouse", image: "mouse_in_the_spouse.png", audio: "mouse_in_blouse", sentence: "The mouse is in the blouse." }
      ]
    },
    {
      targetSentence: "The train is on the track.",
      target: "train_on_the_track",
      options: [
        { word: "train_on_the_track", image: "train_on_the_track.png", audio: "train_on_track", sentence: "The train is on the track." },
        { word: "brain_on_the_track", image: "brain_on_the_track.png", audio: "brain_on_track", sentence: "The brain is on the track." },
        { word: "tray_on_the_tracks", image: "tray_on_the_tracks.png", audio: "tray_on_track",  sentence: "The tray is on the tracks." },
        { word: "train_on_the_trap",  image: "train_on_the_trap.png",  audio: "train_on_trap",  sentence: "The train is on the trap." },
        { word: "train_on_truck",     image: "train_on_truck.png",                              sentence: "The train is on the truck." },
        { word: "train_on_the_stack", image: "train_on_the_stack.png", audio: "train_on_stack", sentence: "The train is on the stack." }
      ]
    },
    {
      targetSentence: "The mop is in the mud.",
      target: "the_mop_is_in_the_mud",
      options: [
        { word: "the_mop_is_in_the_mud",    image: "the_mop_is_in_the_mud.png",    audio: "mop_in_mud",    sentence: "The mop is in the mud." },
        { word: "the_mop_is_in_the_spud",   image: "the_mop_is_in_the_spud.png",   audio: "mop_in_spud",   sentence: "The mop is in the spud." },
        { word: "the_mop_is_above_the_mud", image: "the_mop_is_above_the_mud.png", audio: "mop_above_mud", sentence: "The mop is above the mud." },
        { word: "the_mom_is_in_the_mud",    image: "the_mom_is_in_the_mud.png",    audio: "mom_in_mud",    sentence: "The mom is in the mud." },
        { word: "the_map_is_in_the_mud",    image: "the_map_is_in_the_mud.png",    audio: "map_in_mud",    sentence: "The map is in the mud." },
        { word: "the_mop_is_in_the_mug",    image: "the_mop_is_in_the_mug.png",    audio: "mop_in_mug",    sentence: "The mop is in the mug." }
      ]
    }
  ]
};

function prettify(word) {
  return word.replace(/_/g, " ");
}
