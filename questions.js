// 15 questions, each with a target sentence and 6 picture choices.
// The flow per question (same as the phrases game) is:
//   1. Audio-only — 6 pictures, no printed sentence; student listens.
//   2. Sentence-only — the printed sentence alone, no pictures.
//   3. Choose — 6 pictures plus the printed sentence; student picks one.
//
// Each option's `word` is the picture filename (without extension), used both
// for the asset lookup and for what's spoken when the student taps a picture.
// The `targetSentence` is the literal text printed to the screen.

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
        { word: "cat_swimming", image: "cat_swimming.png" },
        { word: "can_swim",     image: "can_swim.png" },
        { word: "cat_swig",     image: "cat_swig.png" },
        { word: "kit_swim",     image: "kit_swim.png" },
        { word: "rat_swim",     image: "rat_swim.png" },
        { word: "cat_skim",     image: "cat_skim.png" }
      ]
    },
    {
      targetSentence: "A bug is on the rug.",
      target: "bug_on_a_rug",
      options: [
        { word: "bug_on_a_rug",   image: "bug_on_a_rug.png" },
        { word: "mug_on_a_rug",   image: "mug_on_a_rug.png" },
        { word: "bug_on_a_jug",   image: "bug_on_a_jug.png" },
        { word: "bug_on_the_run", image: "bug_on_the_run.png" },
        { word: "bun_on_a_rug",   image: "bun_on_a_rug.png" },
        { word: "bug_in_a_rug",   image: "bug_in_a_rug.png" }
      ]
    },
    {
      targetSentence: "The fox got a hat.",
      target: "fox_got_a_hat",
      options: [
        { word: "fox_got_a_hat",  image: "fox_got_a_hat.png" },
        { word: "fox_got_a_bat",  image: "fox_got_a_bat.png" },
        { word: "box_with_a_hat", image: "box_with_a_hat.png" },
        { word: "fox_got_a_hut",  image: "fox_got_a_hut.png" },
        { word: "fax_got_a_hat",  image: "fax_got_a_hat.png" },
        { word: "fawn_got_a_hat", image: "fawn_got_a_hat.png" }
      ]
    },
    {
      targetSentence: "The pig has a bag.",
      target: "pig_has_a_bag",
      options: [
        { word: "pig_has_a_bag",   image: "pig_has_a_bag.png" },
        { word: "pig_has_a_bug",   image: "pig_has_a_bug.png" },
        { word: "pug_has_a_bag",   image: "pug_has_a_bag.png" },
        { word: "pin_has_a_bag",   image: "pin_has_a_bag.png" },
        { word: "pig_has_a_badge", image: "pig_has_a_badge.png" },
        { word: "pig_has_a_rag",   image: "pig_has_a_rag.png" }
      ]
    },
    {
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
        { word: "hen_on_an_egg",  image: "hen_on_an_egg.png" },
        { word: "hen_pat_an_egg", image: "hen_pat_an_egg.png" },
        { word: "men_on_an_egg",  image: "men_on_an_egg.png" },
        { word: "head_on_an_egg", image: "head_on_an_egg.png" },
        { word: "hen_sat_on_peg", image: "hen_sat_on_peg.png" },
        { word: "hen_in_an_egg",  image: "hen_in_an_egg.png" }
      ]
    },
    {
      targetSentence: "The cup is on the book.",
      target: "cup_is_on_the_book",
      options: [
        { word: "cup_is_on_the_book", image: "cup_is_on_the_book.png" },
        { word: "pup_on_the_book",    image: "pup_on_the_book.png" },
        { word: "cup_in_a_boot",      image: "cup_in_a_boot.png" },
        { word: "cup_on_a_hook",      image: "cup_on_a_hook.png" },
        { word: "cop_on_a_book",      image: "cop_on_a_book.png" },
        { word: "cub_on_a_book",      image: "cub_on_a_book.png" }
      ]
    },
    {
      targetSentence: "The star is on the ball.",
      target: "star_on_ball",
      options: [
        { word: "star_on_ball",     image: "star_on_ball.png" },
        { word: "star_on_a_bell",   image: "star_on_a_bell.png" },
        { word: "star_in_a_doll",   image: "star_in_a_doll.png" },
        { word: "car_on_a_ball",    image: "car_on_a_ball.png" },
        { word: "star_on_the_wall", image: "star_on_the_wall.png" },
        { word: "store_on_a_ball",  image: "store_on_a_ball.png" }
      ]
    },
    {
      targetSentence: "The fish has a bat.",
      target: "fish_has_a_bat",
      options: [
        { word: "fish_has_a_bat",  image: "fish_has_a_bat.png" },
        { word: "dish_has_a_bat",  image: "dish_has_a_bat.png" },
        { word: "fin_has_a_bat",   image: "fin_has_a_bat.png" },
        { word: "fish_has_a_beet", image: "fish_has_a_beet.png" },
        { word: "fish_has_a_hat",  image: "fish_has_a_hat.png" },
        { word: "fish_has_a_boat", image: "fish_has_a_boat.png" }
      ]
    },
    {
      targetSentence: "The pup is on the moon.",
      target: "pup_on_the_moon",
      options: [
        { word: "pup_on_the_moon",  image: "pup_on_the_moon.png" },
        { word: "pup_on_a_spoon",   image: "pup_on_a_spoon.png" },
        { word: "pup_on_a_moose",   image: "pup_on_a_moose.png" },
        { word: "puck_on_the_moon", image: "puck_on_the_moon.png" },
        { word: "cup_on_the_moon",  image: "cup_on_the_moon.png" },
        { word: "pup_on_a_man",     image: "pup_on_a_man.png" }
      ]
    },
    {
      targetSentence: "The pen is on the tree.",
      target: "pen_on_a_tree",
      options: [
        { word: "pen_on_a_tree",   image: "pen_on_a_tree.png" },
        { word: "ten_on_a_tree",   image: "ten_on_a_tree.png" },
        { word: "pet_on_a_tree",   image: "pet_on_a_tree.png" },
        { word: "pen_on_a_bee",    image: "pen_on_a_bee.png" },
        { word: "pen_on_a_tray",   image: "pen_on_a_tray.png" },
        { word: "pin_on_the_tree", image: "pin_on_the_tree.png" }
      ]
    },
    {
      targetSentence: "The kite is in the sky.",
      target: "kite_in_the_sky",
      options: [
        { word: "kite_in_the_sky",    image: "kite_in_the_sky.png" },
        { word: "knight_in_the_sky",  image: "knight_in_the_sky.png" },
        { word: "kit_in_the_sky",     image: "kit_in_the_sky.png" },
        { word: "kite_is_in_the_spy", image: "kite_is_in_the_spy.png" },
        { word: "kite_in_the_ski",    image: "kite_in_the_ski.png" },
        { word: "kite_in_the_tie",    image: "kite_in_the_tie.png" }
      ]
    },
    {
      targetSentence: "The mouse is in the house.",
      target: "mouse_in_a_house",
      options: [
        { word: "mouse_in_a_house",    image: "mouse_in_a_house.png" },
        { word: "house_in_a_house",    image: "house_in_a_house.png" },
        { word: "mouth_in_house",      image: "mouth_in_house.png" },
        { word: "mouse_in_a_hose",     image: "mouse_in_a_hose.png" },
        { word: "moose_in_the_house",  image: "moose_in_the_house.png" },
        { word: "mouse_in_the_spouse", image: "mouse_in_the_spouse.png" }
      ]
    },
    {
      targetSentence: "The train is on the track.",
      target: "train_on_the_track",
      options: [
        { word: "train_on_the_track", image: "train_on_the_track.png" },
        { word: "brain_on_the_track", image: "brain_on_the_track.png" },
        { word: "tray_on_the_tracks", image: "tray_on_the_tracks.png" },
        { word: "train_on_the_trap",  image: "train_on_the_trap.png" },
        { word: "train_on_truck",     image: "train_on_truck.png" },
        { word: "train_on_the_stack", image: "train_on_the_stack.png" }
      ]
    },
    {
      targetSentence: "The mop is in the mud.",
      target: "the_mop_is_in_the_mud",
      options: [
        { word: "the_mop_is_in_the_mud",    image: "the_mop_is_in_the_mud.png" },
        { word: "the_mop_is_in_the_spud",   image: "the_mop_is_in_the_spud.png" },
        { word: "the_mop_is_above_the_mud", image: "the_mop_is_above_the_mud.png" },
        { word: "the_mom_is_in_the_mud",    image: "the_mom_is_in_the_mud.png" },
        { word: "the_map_is_in_the_mud",    image: "the_map_is_in_the_mud.png" },
        { word: "the_mop_is_in_the_mug",    image: "the_mop_is_in_the_mug.png" }
      ]
    }
  ]
};

// Helper used throughout the UI: convert "cat_swimming" -> "cat swimming" for display + speech.
function prettify(word) {
  return word.replace(/_/g, " ");
}
