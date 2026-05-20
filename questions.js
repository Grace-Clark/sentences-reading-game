// 15 questions, each with a target sentence and 6 picture choices.
// The flow per question is:
//   1. Audio-only — 6 pictures, no printed sentence; student listens.
//   2. Sentence-only — the printed sentence alone, no pictures.
//   3. Choose — 6 pictures plus the printed sentence; student picks one.
//
// Each option has:
//   word   - filename of the picture (without extension), used as the option's id
//   image  - the picture filename in assets/words/
//   audio  - (optional) filename in assets/audio/ if it differs from word
//
// `audio` is used because the recorded audio files were named more concisely
// than the picture filenames (e.g. "bug_on_a_rug.png" pairs with
// "bug_on_rug.m4a"). When omitted, the game tries assets/audio/<word>.m4a.
// Q15 ("the mop is in the mud") has no recordings yet, so all 6 options use TTS.

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
        { word: "cat_swimming", image: "cat_swimming.png", audio: "cat_can_swim" },
        { word: "can_swim",     image: "can_swim.png",     audio: "can_can_swim" },
        { word: "cat_swig",     image: "cat_swig.png",     audio: "cat_can_swig" },
        { word: "kit_swim",     image: "kit_swim.png",     audio: "kit_can_swim" },
        { word: "rat_swim",     image: "rat_swim.png",     audio: "rat_can_swim" },
        { word: "cat_skim",     image: "cat_skim.png",     audio: "cat_can_skim" }
      ]
    },
    {
      targetSentence: "A bug is on the rug.",
      target: "bug_on_a_rug",
      options: [
        { word: "bug_on_a_rug",   image: "bug_on_a_rug.png",   audio: "bug_on_rug" },
        { word: "mug_on_a_rug",   image: "mug_on_a_rug.png",   audio: "mug_on_rug" },
        { word: "bug_on_a_jug",   image: "bug_on_a_jug.png",   audio: "bug_on_jug" },
        { word: "bug_on_the_run", image: "bug_on_the_run.png", audio: "bug_on_run" },
        { word: "bun_on_a_rug",   image: "bun_on_a_rug.png",   audio: "bun_on_rug" },
        { word: "bug_in_a_rug",   image: "bug_in_a_rug.png",   audio: "bug_in_rug" }
      ]
    },
    {
      targetSentence: "The fox got a hat.",
      target: "fox_got_a_hat",
      options: [
        { word: "fox_got_a_hat",  image: "fox_got_a_hat.png",  audio: "fox_got_hat" },
        { word: "fox_got_a_bat",  image: "fox_got_a_bat.png",  audio: "fox_got_bat" },
        // "box with a hat" image, recording says "box got a hat"
        { word: "box_with_a_hat", image: "box_with_a_hat.png", audio: "box_got_hat" },
        { word: "fox_got_a_hut",  image: "fox_got_a_hut.png",  audio: "fox_got_hut" },
        { word: "fax_got_a_hat",  image: "fax_got_a_hat.png",  audio: "fax_got_hat" },
        { word: "fawn_got_a_hat", image: "fawn_got_a_hat.png", audio: "fawn_got_hat" }
      ]
    },
    {
      targetSentence: "The pig has a bag.",
      target: "pig_has_a_bag",
      options: [
        { word: "pig_has_a_bag",   image: "pig_has_a_bag.png",   audio: "pig_has_bag" },
        { word: "pig_has_a_bug",   image: "pig_has_a_bug.png",   audio: "pig_has_bug" },
        { word: "pug_has_a_bag",   image: "pug_has_a_bag.png",   audio: "pug_has_bag" },
        { word: "pin_has_a_bag",   image: "pin_has_a_bag.png",   audio: "pin_has_bag" },
        { word: "pig_has_a_badge", image: "pig_has_a_badge.png", audio: "pig_has_badge" },
        { word: "pig_has_a_rag",   image: "pig_has_a_rag.png",   audio: "pig_has_rag" }
      ]
    },
    {
      // All audio filenames match the picture filenames exactly here.
      targetSentence: "The dog can sit.",
      target: "dog_can_sit",
      options: [
        { word: "dog_can_sit",  image: "dog_can_sit.png" },
        { word: "doll_can_sit", image: "doll_can_sit.png" },
        { word: "dog_can_set",  image: "dog_can_set.png" },
        { word: "hog_can_sit",  image: "hog_can_sit.png" },
        { word: "dog_can_sip",  image: "dog_can_sip.png" },
        { word: "dog_can_hit",  image: "dog_can_hit.png" }
      ]
    },
    {
      targetSentence: "The hen sat on an egg.",
      target: "hen_on_an_egg",
      options: [
        { word: "hen_on_an_egg",  image: "hen_on_an_egg.png",  audio: "hen_sat_on_egg" },
        { word: "hen_pat_an_egg", image: "hen_pat_an_egg.png", audio: "hen_pat_egg" },
        { word: "men_on_an_egg",  image: "men_on_an_egg.png",  audio: "men_sat_egg" },
        { word: "head_on_an_egg", image: "head_on_an_egg.png", audio: "head_sat_egg" },
        { word: "hen_sat_on_peg", image: "hen_sat_on_peg.png", audio: "hen_sat_peg" },
        { word: "hen_in_an_egg",  image: "hen_in_an_egg.png",  audio: "hen_sat_in_egg" }
      ]
    },
    {
      targetSentence: "The cup is on the book.",
      target: "cup_is_on_the_book",
      options: [
        { word: "cup_is_on_the_book", image: "cup_is_on_the_book.png", audio: "cup_on_book" },
        { word: "pup_on_the_book",    image: "pup_on_the_book.png",    audio: "pup_on_book" },
        // "cup in a boot" image, recording says "cup on boot"
        { word: "cup_in_a_boot",      image: "cup_in_a_boot.png",      audio: "cup_on_boot" },
        { word: "cup_on_a_hook",      image: "cup_on_a_hook.png",      audio: "cup_on_hook" },
        { word: "cop_on_a_book",      image: "cop_on_a_book.png",      audio: "cop_on_book" },
        { word: "cub_on_a_book",      image: "cub_on_a_book.png",      audio: "cub_on_book" }
      ]
    },
    {
      targetSentence: "The star is on the ball.",
      target: "star_on_ball",
      options: [
        { word: "star_on_ball",     image: "star_on_ball.png" },
        { word: "star_on_a_bell",   image: "star_on_a_bell.png",   audio: "star_on_bell" },
        // "star in a doll" image, recording says "star on doll"
        { word: "star_in_a_doll",   image: "star_in_a_doll.png",   audio: "star_on_doll" },
        { word: "car_on_a_ball",    image: "car_on_a_ball.png",    audio: "car_on_ball" },
        { word: "star_on_the_wall", image: "star_on_the_wall.png", audio: "star_on_wall" },
        { word: "store_on_a_ball",  image: "store_on_a_ball.png",  audio: "store_on_ball" }
      ]
    },
    {
      targetSentence: "The fish has a bat.",
      target: "fish_has_a_bat",
      options: [
        { word: "fish_has_a_bat",  image: "fish_has_a_bat.png",  audio: "fish_has_bat" },
        { word: "dish_has_a_bat",  image: "dish_has_a_bat.png",  audio: "dish_has_bat" },
        { word: "fin_has_a_bat",   image: "fin_has_a_bat.png",   audio: "fin_has_bat" },
        { word: "fish_has_a_beet", image: "fish_has_a_beet.png", audio: "fish_has_beet" },
        { word: "fish_has_a_hat",  image: "fish_has_a_hat.png",  audio: "fish_has_hat" },
        { word: "fish_has_a_boat", image: "fish_has_a_boat.png", audio: "fish_has_boat" }
      ]
    },
    {
      targetSentence: "The pup is on the moon.",
      target: "pup_on_the_moon",
      options: [
        { word: "pup_on_the_moon",  image: "pup_on_the_moon.png",  audio: "pup_on_moon" },
        { word: "pup_on_a_spoon",   image: "pup_on_a_spoon.png",   audio: "pup_on_spoon" },
        { word: "pup_on_a_moose",   image: "pup_on_a_moose.png",   audio: "pup_on_moose" },
        { word: "puck_on_the_moon", image: "puck_on_the_moon.png", audio: "puck_on_moon" },
        { word: "cup_on_the_moon",  image: "cup_on_the_moon.png",  audio: "cup_on_moon" },
        { word: "pup_on_a_man",     image: "pup_on_a_man.png",     audio: "pup_on_man" }
      ]
    },
    {
      targetSentence: "The pen is on the tree.",
      target: "pen_on_a_tree",
      options: [
        { word: "pen_on_a_tree",   image: "pen_on_a_tree.png",   audio: "pen_on_tree" },
        { word: "ten_on_a_tree",   image: "ten_on_a_tree.png",   audio: "ten_on_tree" },
        { word: "pet_on_a_tree",   image: "pet_on_a_tree.png",   audio: "pet_on_tree" },
        { word: "pen_on_a_bee",    image: "pen_on_a_bee.png",    audio: "pen_on_bee" },
        { word: "pen_on_a_tray",   image: "pen_on_a_tray.png",   audio: "pen_on_tray" },
        { word: "pin_on_the_tree", image: "pin_on_the_tree.png", audio: "pin_on_tree" }
      ]
    },
    {
      targetSentence: "The kite is in the sky.",
      target: "kite_in_the_sky",
      options: [
        { word: "kite_in_the_sky",    image: "kite_in_the_sky.png",    audio: "kite_in_sky" },
        { word: "knight_in_the_sky",  image: "knight_in_the_sky.png",  audio: "knight_in_sky" },
        { word: "kit_in_the_sky",     image: "kit_in_the_sky.png",     audio: "kit_in_sky" },
        { word: "kite_is_in_the_spy", image: "kite_is_in_the_spy.png", audio: "kite_in_spy" },
        { word: "kite_in_the_ski",    image: "kite_in_the_ski.png",    audio: "kite_in_ski" },
        // "kite in the tie" image, recording says "kite on tie"
        { word: "kite_in_the_tie",    image: "kite_in_the_tie.png",    audio: "kite_on_tie" }
      ]
    },
    {
      targetSentence: "The mouse is in the house.",
      target: "mouse_in_a_house",
      options: [
        { word: "mouse_in_a_house",    image: "mouse_in_a_house.png",    audio: "mouse_in_house" },
        { word: "house_in_a_house",    image: "house_in_a_house.png",    audio: "house_in_house" },
        { word: "mouth_in_house",      image: "mouth_in_house.png" },
        { word: "mouse_in_a_hose",     image: "mouse_in_a_hose.png",     audio: "mouse_in_hose" },
        { word: "moose_in_the_house",  image: "moose_in_the_house.png",  audio: "moose_in_house" },
        // "mouse in the spouse" image, recording says "mouse in blouse"
        { word: "mouse_in_the_spouse", image: "mouse_in_the_spouse.png", audio: "mouse_in_blouse" }
      ]
    },
    {
      targetSentence: "The train is on the track.",
      target: "train_on_the_track",
      options: [
        { word: "train_on_the_track", image: "train_on_the_track.png", audio: "train_on_track" },
        { word: "brain_on_the_track", image: "brain_on_the_track.png", audio: "brain_on_track" },
        { word: "tray_on_the_tracks", image: "tray_on_the_tracks.png", audio: "tray_on_track" },
        { word: "train_on_the_trap",  image: "train_on_the_trap.png",  audio: "train_on_trap" },
        { word: "train_on_truck",     image: "train_on_truck.png" },
        { word: "train_on_the_stack", image: "train_on_the_stack.png", audio: "train_on_stack" }
      ]
    },
    {
      targetSentence: "The mop is in the mud.",
      target: "the_mop_is_in_the_mud",
      options: [
        { word: "the_mop_is_in_the_mud",    image: "the_mop_is_in_the_mud.png",    audio: "mop_in_mud" },
        { word: "the_mop_is_in_the_spud",   image: "the_mop_is_in_the_spud.png",   audio: "mop_in_spud" },
        { word: "the_mop_is_above_the_mud", image: "the_mop_is_above_the_mud.png", audio: "mop_above_mud" },
        { word: "the_mom_is_in_the_mud",    image: "the_mom_is_in_the_mud.png",    audio: "mom_in_mud" },
        { word: "the_map_is_in_the_mud",    image: "the_map_is_in_the_mud.png",    audio: "map_in_mud" },
        { word: "the_mop_is_in_the_mug",    image: "the_mop_is_in_the_mug.png",    audio: "mop_in_mug" }
      ]
    }
  ]
};

function prettify(word) {
  return word.replace(/_/g, " ");
}
