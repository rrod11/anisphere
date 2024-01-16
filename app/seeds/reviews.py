

from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text
from random import choice, sample, randint


animeReviews = [
  "Absolutely mind-blowing animation, intricate plot twists, and characters that tug at your heartstrings!",
  "A rollercoaster of emotions with stunning visuals this anime is a masterpiece!",
  "Incredible world-building paired with intense action sequences, a must-watch for any anime fan.",
  "Character development at its finest, you'll laugh, cry, and cheer for these unforgettable personalities.",
  "An anime that transcends genres, blending humor, drama, and suspense seamlessly.",
  "Visually stunning and emotionally resonant, a captivating journey from start to finish.",
  "Epic battles, deep philosophical themes, and breathtaking art, a true work of art.",
  "This anime takes storytelling to a whole new level, prepare for a wild ride!",
  "A perfect balance of humor and heart, each episode leaves you craving more.",
  "Unique and thought-provoking, it challenges the conventions of the anime medium.",
  "Stylish animation, gripping plotlines, and a soundtrack that elevates the entire experience.",
  "An emotional rollercoaster that explores the complexities of human relationships.",
  "From the first episode to the last, this anime keeps you hooked with its unpredictable narrative.",
  "A visually stunning feast for the eyes, every frame is a work of art.",
  "Masterfully crafted characters and a plot that keeps you guessing until the very end.",
  "Intriguing mysteries, well-developed characters, this anime has it all and more.",
  "A nostalgic journey that pays homage to classic anime while offering a fresh, modern twist.",
  "Heartwarming and inspiring, a testament to the power of friendship and resilience.",
  "Unforgettable characters, intricate world-building, this anime sets a new standard.",
  "A perfect blend of action, romance, and suspense, it keeps you on the edge of your seat.",
  "Immersive storytelling with unexpected twists, you won't be able to stop watching.",
  "A visually stunning masterpiece that explores the depths of human emotions.",
  "The soundtrack alone is enough reason to watch, paired with a compelling story, it's unbeatable.",
  "An anime that stays with you long after the final episode, truly unforgettable.",
  "Complex characters and a plot that keeps you guessing, this anime is a hidden gem.",
  "Innovative animation techniques and a plot that challenges the status quo of the genre.",
  "A perfect blend of action, humor, and drama, this anime has something for everyone.",
  "An emotional rollercoaster that explores the complexities of identity and self-discovery.",
  "Meticulous attention to detail in every aspect, from character design to world-building.",
  "A masterclass in storytelling, this anime keeps you engaged from start to finish.",
  "A journey of self-discovery that resonates with audiences of all ages.",
  "Epic battles, heartfelt moments, and a dose of humor, a well-rounded anime experience.",
  "A thought-provoking narrative that delves into the human psyche, prepare to be captivated.",
  "Exceptional character dynamics and a plot that keeps you guessing until the very end.",
  "A visual spectacle that pushes the boundaries of what anime can achieve.",
  "A hidden gem with a unique premise and characters that leave a lasting impression.",
  "An emotionally charged narrative that explores the beauty and complexity of life.",
  "A thrilling ride from start to finish, this anime knows how to keep you hooked.",
  "Heartwarming and charming, the perfect anime to lift your spirits.",
  "An anime that defies expectations, offering a fresh take on familiar themes.",
  "Exceptional world-building and a plot that unfolds with meticulous precision.",
  "A celebration of friendship, courage, and the power of the human spirit.",
  "A mind-bending anime that challenges your perception of reality, a true masterpiece.",
  "Character-driven storytelling at its finest, you'll grow attached to each and every one.",
  "A visual and emotional rollercoaster that leaves you craving for more.",
  "An anime that seamlessly blends genres, creating a truly unique and captivating experience.",
  "A masterful exploration of societal issues with characters you can't help but root for.",
  "Breathtaking animation and a narrative that keeps you guessing until the very end.",
  "A true work of art that transcends cultural boundaries, a must-watch for any anime enthusiast.",
  "An anime that challenges your perceptions and leaves you questioning the nature of reality."
]

negativeAnimeReviews = [
  "Bland animation and a plot that fails to engage, a disappointing experience.",
  "A convoluted mess of a storyline with characters that lack depth or development.",
  "Inconsistent visuals and a lackluster narrative, this anime falls short of expectations.",
  "An overreliance on clichés and tropes, a formulaic and uninspiring watch.",
  "Poorly executed character arcs and a plot that meanders without purpose.",
  "Visually unappealing with a storyline that fails to create any emotional connection.",
  "Epic battles that lack impact and a plot that feels disjointed, a letdown.",
  "An anime that struggles to find its identity, resulting in a muddled and confusing experience.",
  "A perfect storm of awkward pacing, weak character motivations, and lackluster animation.",
  "Uninspired world-building and a narrative that fails to capture the audience's interest.",
  "Lackluster character designs and a plot that leaves much to be desired.",
  "An anime that fails to deliver on its promises, leaving viewers with a sense of emptiness.",
  "From the first episode to the last, this anime fails to create any sense of investment.",
  "A visually forgettable experience with characters that fail to leave a lasting impression.",
  "Poorly handled themes and a plot that feels like a missed opportunity for deeper exploration.",
  "An anime that succumbs to clichés, resulting in a tedious and unoriginal viewing experience.",
  "Lack of character development and a narrative that lacks any real emotional impact.",
  "An anime that falls into the trap of excessive fan service, overshadowing any potential substance.",
  "Uninspired storytelling that fails to engage, leaving viewers disconnected and disinterested.",
  "An overcomplicated plot that leaves viewers more confused than intrigued.",
  "Flat and one-dimensional characters with a predictable and uninspiring storyline.",
  "A disappointing attempt at humor, with jokes that fall flat and characters lacking charm.",
  "Lack of narrative focus and a plot that meanders without a clear direction.",
  "An anime that relies too heavily on genre tropes, resulting in a lack of originality.",
  "A jumbled mess of ideas that never coalesce into a coherent and satisfying narrative."
]
# Adds a seed_reviews
def seed_reviews():
    seed_review1= Review(review='Literally the best anime to ever exist stop gawking and go give it a watch', user_id=randint(1, 30), post_id=randint(1, 25), rating=randint(3, 5))
    seed_review2 = Review(review='An amazing watch you will not regret taking the time out your day', user_id=randint(1, 30), post_id=randint(1, 25), rating=randint(3, 5))
    seed_review3 = Review(review='I was hooked from the jump cant wait for the next season', user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    seed_review4 = Review(review='Just give up your day its amazing', user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    seed_review5 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    seed_review6 = Review(review=choice(negativeAnimeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(1, 3))
    seed_review7 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    seed_review8 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    seed_review9 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    seed_review30 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    seed_review11 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    seed_review12 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    seed_review13 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    seed_review14 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    seed_review15 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    seed_review16 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    seed_review17 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    seed_review18 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    seed_review19 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    seed_review20 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review21 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review22 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review23 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review24 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review25 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review26 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review27 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review28 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review29 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review30 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review31 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review32 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review33 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review34 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review35 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review36 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review37 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review38 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review39 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review40 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review41 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review42 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review43 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review44 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review45 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review46 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review47 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review48 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review49 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review50 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review51 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review52 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review53 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review54 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review55 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review56 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review57 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review58 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review59 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review60 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review61 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review62 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review63 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review64 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review65 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review66 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review67 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review68 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review69 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review70 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review71 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review72 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review73 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review74 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review75 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review76 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review77 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review78 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review79 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review80 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review81 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review82 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review83 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review84 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review85 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review86 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review87 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review88 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review89 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review90 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review91 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review92 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review93 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review94 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review95 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review96 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review97 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review98 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review99 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review100 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review101 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review102 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review103 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review104 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review105 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review106 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review107 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review108 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review109 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review110 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review111 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review112 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review113 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review114 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review115 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review116 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review117 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review118 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review119 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review120 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review121 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review25 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review123 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review124 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review125 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review126 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review127 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review128 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review129 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))
    # seed_review130 = Review(review=choice(animeReviews), user_id=randint(1, 30),post_id=randint(1, 25), rating=randint(3, 5))

    all_reviews = [seed_review1, seed_review2, seed_review3, seed_review4, seed_review5, seed_review6,
                   seed_review7, seed_review8, seed_review9, seed_review30, seed_review11, seed_review12, seed_review13,
                   seed_review14, seed_review15, seed_review16, seed_review17, seed_review18, seed_review19,
                   seed_review20
                  #  , seed_review21, seed_review22, seed_review23, seed_review24, seed_review25, seed_review26,
                  #  seed_review27, seed_review28, seed_review29, seed_review30, seed_review31, seed_review32, seed_review33,
                  #  seed_review34, seed_review35, seed_review36, seed_review37, seed_review38, seed_review39,
                  #  seed_review40, seed_review41, seed_review42, seed_review43, seed_review44, seed_review45, seed_review46,
                  #  seed_review47, seed_review48, seed_review49, seed_review50, seed_review51, seed_review52,
                  #  seed_review53, seed_review54, seed_review55, seed_review56, seed_review57, seed_review58, seed_review59,
                  #  seed_review60, seed_review61, seed_review62, seed_review63, seed_review64, seed_review65, seed_review66, seed_review67,
                  #  seed_review68, seed_review69, seed_review70, seed_review71, seed_review72, seed_review73, seed_review74,
                  #  seed_review75, seed_review76, seed_review77, seed_review78, seed_review79, seed_review80,
                  #  seed_review81, seed_review82, seed_review83, seed_review84, seed_review85, seed_review86,
                  #  seed_review87, seed_review88, seed_review89, seed_review90, seed_review91, seed_review92, seed_review93,
                  #  seed_review94, seed_review95, seed_review96, seed_review97, seed_review98, seed_review99, seed_review100, seed_review101,
                  #  seed_review102, seed_review103, seed_review104, seed_review105, seed_review106, seed_review107, seed_review108, seed_review109,
                  #  seed_review110, seed_review111, seed_review112, seed_review113, seed_review114, seed_review115, seed_review116, seed_review117,
                  #  seed_review118, seed_review119, seed_review120, seed_review121, seed_review25, seed_review123, seed_review124,
                  #  seed_review125, seed_review126, seed_review127, seed_review128, seed_review129, seed_review130
                   ]
    add_reviews = [db.session.add(review) for review in all_reviews]
    db.session.commit()


def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
