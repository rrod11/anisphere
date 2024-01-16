from app.models import db, Thread, environment, SCHEMA
from random import choice, sample, randint
from sqlalchemy.sql import text


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


# Adds a demo user, you can add other users here if you want
def seed_threads():
    seed_thread1= Thread(title="Best Ever", description=".", user_id=randint(1, 30), post_id=randint(1,25), fan=True)
    seed_thread2= Thread(title="Crazy Plot",  user_id=randint(1, 30) , description=".", post_id=randint(1,25), fan=True)
    seed_thread3 = Thread(title="Im addicted",  user_id=randint(1, 30), description="  .", post_id=randint(1,25), fan=True)
    seed_thread4 = Thread(title="Top of the top",  user_id=randint(1, 30),  description=".", post_id=randint(1,25), fan=True)
    seed_thread5 = Thread(title="Better than life",  user_id=randint(1, 30), description=".", post_id=randint(1,25), fan=True)
    seed_thread6 = Thread(title="Cant even begin to explain",  user_id=randint(1, 30), description="", post_id=randint(1,25), fan=True)
    seed_thread7 = Thread(title="They did that",  user_id=randint(1, 30), description="", post_id=randint(1,25), fan=True)
    seed_thread8 = Thread(title="30/30",  user_id=randint(1, 30),  description="", post_id=randint(1,25), fan=True)
    seed_thread9 = Thread(title="i'd definitely watch again",  user_id=randint(1, 30),  description="", post_id=randint(1,25), fan=True)
    seed_thread10 = Thread(title="where do i sign up",  user_id=randint(1, 30), description="", post_id=randint(1,25), fan=True)
    seed_thread11 = Thread(title=choice(animeReviews),  user_id=randint(1, 30), description="", post_id=randint(1,25), fan=True)
    seed_thread12 = Thread(title=choice(animeReviews),  user_id=randint(1, 30), description="", post_id=randint(1,25), fan=True)
    seed_thread13 = Thread(title=choice(animeReviews),  user_id=randint(1, 30), description="", post_id=randint(1,25), fan=True)
    seed_thread14 = Thread(title=choice(animeReviews),  user_id=randint(1, 30), description="", post_id=randint(1,25), fan=True)
    seed_thread15 = Thread(title=choice(animeReviews),  user_id=randint(1, 30), description="", post_id=randint(1,25), fan=True)
    seed_thread16 = Thread(title=choice(animeReviews),  user_id=randint(1, 30), description="", post_id=randint(1,25), fan=True)
    seed_thread17 = Thread(title=choice(animeReviews),  user_id=randint(1, 30), description="", post_id=randint(1,25), fan=True)
    seed_thread18 = Thread(title=choice(animeReviews),  user_id=randint(1, 30), description="", post_id=randint(1,25), fan=True)




    all_threads = [seed_thread1, seed_thread2, seed_thread3, seed_thread4, seed_thread5, seed_thread6,
                 seed_thread7, seed_thread8, seed_thread9, seed_thread10, seed_thread11, seed_thread12,seed_thread13,
                 seed_thread14,seed_thread15,seed_thread16,seed_thread17,seed_thread18,
                ]
    add_threads = [db.session.add(thread) for thread in all_threads]
    db.session.commit()


def undo_threads():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.threads RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM threads"))

    db.session.commit()
