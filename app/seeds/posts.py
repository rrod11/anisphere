from app.models import db, Post, environment, SCHEMA
from random import choice, sample, randint
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_posts():
    seed_post1= Post(title="After Lost", image="https://res.cloudinary.com/dpdvw1sam/image/upload/v1701796840/al_hkfzf2.jpg", description="In the quaint town of Eclipsia, where reality and the supernatural intertwine, a mysterious event known as 'The Vanishing' shrouds the community in an enigmatic veil. As the town grapples with the aftermath of unexplained disappearances, a group of individuals with disparate backgrounds finds themselves entangled in a web of secrets that transcend the boundaries of the known world.", user_id=randint(1, 10))
    seed_post2= Post(title="Ajin Demi Human",  user_id=randint(1, 10))
    seed_post3 = Post(title="Am I actually the Strongest",  user_id=randint(1, 10))
    seed_post4 = Post(title="Assasination Classroom",  user_id=randint(1, 10))
    seed_post5 = Post(title="Attack on Titan",  user_id=randint(1, 10))
    seed_post6 = Post(title="Atelier Ryza",  user_id=randint(1, 10))
    seed_post7 = Post(title="Akame Ga Kill",  user_id=randint(1, 10))
    seed_post8 = Post(title="Akudame Drive",  user_id=randint(1, 10))
    seed_post9 = Post(title="Afro Samurai",  user_id=randint(1, 10))
    seed_post10 = Post(title="Ayaka: A Story of Bonds and Wounds",  user_id=randint(1, 10))
    seed_post11=Post(title="Basilisk",  user_id=randint(1, 10))
    seed_post12 = Post(title="Bastard",  user_id=randint(1, 10))
    seed_post13 = Post(title="Brserk",  user_id=randint(1, 10))
    seed_post14 =Post(title="Beyond The Boundary",  user_id=randint(1, 10))
    seed_post15 =Post(title="B: The Beginning",  user_id=randint(1, 10))
    seed_post16 = Post(title='Black Clover', image="https://res.cloudinary.com/dpdvw1sam/image/upload/v1701796836/bc_tgapsn.jpg" ,description="Asta and Yuno were abandoned at the same church on the same day. Raised together as children, they came to know of the 'Wizard King'—a title given to the strongest mage in the kingdom—and promised that they would compete against each other for the position of the next Wizard King. However, as they grew up, the stark difference between them became evident. While Yuno is able to wield magic with amazing power and control, Asta cannot use magic at all and desperately tries to awaken his powers by training physically. When they reach the age of 15, Yuno is bestowed a spectacular Grimoire with a four-leaf clover, while Asta receives nothing. However, soon after, Yuno is attacked by a person named Lebuty, whose main purpose is to obtain Yuno's Grimoire. Asta tries to fight Lebuty, but he is outmatched. Though without hope and on the brink of defeat, he finds the strength to continue when he hears Yuno's voice. Unleashing his inner emotions in a rage, Asta receives a five-leaf clover Grimoire, a 'Black Clover' giving him enough power to defeat Lebuty. A few days later, the two friends head out into the world, both seeking the same goal—to become the Wizard King!", user_id="1")
    seed_post17 = Post(title="Bleach",  user_id=randint(1, 10))
    seed_post18 = Post(title="Blue Dragon",  user_id=randint(1, 10))
    seed_post19=Post(title="Blue Exorcist",  user_id=randint(1, 10))
    seed_post20 = Post(title="Burn The Witch",  user_id=randint(1, 10))
    seed_post21 = Post(title="Bunguo Stray Dog",  user_id=randint(1, 10))
    seed_post22 =Post(title="Cautious Hero",  user_id=randint(1, 10))
    seed_post23= Post(title="Chained Soldier",  user_id=randint(1, 10))
    seed_post24 = Post(title="Charlotte",  user_id=randint(1, 10))
    seed_post25 = Post(title="Code Geass",  user_id=randint(1, 10))
    seed_post26 = Post(title="Classroom of the Elite",  user_id=randint(1, 10))
    seed_post27 = Post(title="Cowboy Bebop",  user_id=randint(1, 10))
    seed_post28 = Post(title="Cyberpunk EdgeRunners",  user_id=randint(1, 10))
    seed_post29 = Post(title="Daily Life of the Immortal King",  user_id=randint(1, 10))
    seed_post30= Post(title="Dark Gathering",  user_id=randint(1, 10))
    seed_post31 = Post(title="Darker Than Black",  user_id=randint(1, 10))
    seed_post32 = Post(title="Darwin's Game",  user_id=randint(1, 10))
    seed_post33 = Post(title="Death Note",  user_id=randint(1, 10))
    seed_post34 = Post(title="Death Parade",  user_id=randint(1, 10))
    seed_post35 = Post(title="Daedman Wonderland",  user_id=randint(1, 10))
    seed_post36 = Post(title = "Delicious in Dungeon",  user_id=randint(1, 10))
    seed_post37 = Post(title="Demon Slayer",  user_id=randint(1, 10))
    seed_post38 = Post(title="Dororo",  user_id=randint(1, 10))
    seed_post39 = Post(title="Eden's Zero",  user_id=randint(1, 10))
    seed_post40=Post(title="Erased",  user_id=randint(1, 10))
    seed_post41 = Post(title="Elfin Lied",  user_id=randint(1, 10))
    seed_post42 = Post(title="Fairy Tale",  user_id=randint(1, 10))
    seed_post43 = Post(title="Fate Zero",  user_id=randint(1, 10))
    seed_post44 = Post(title="Fire Force",  user_id=randint(1, 10))
    seed_post45 = Post(title="Fruit Basket",  user_id=randint(1, 10))
    seed_post46 = Post(title="Fruit of Evolution",  user_id=randint(1, 10))
    seed_post47 = Post(title="Full Metal Alchemist",  user_id=randint(1, 10))
    seed_post48 = Post(title="Full Metal Alchemist: Brotherhood",  user_id=randint(1, 10))
    seed_post49 = Post(title = "The Future Diary",  user_id=randint(1, 10))
    seed_post50 = Post(title="Gangsta",  user_id=randint(1, 10))
    seed_post51 = Post(title="The Gene of A.I.",  user_id=randint(1, 10))
    seed_post52 = Post(title="Gintama",  user_id=randint(1, 10))
    seed_post53= Post(title="God of High School",  user_id=randint(1, 10))
    seed_post54 = Post(title="Gurren Lagann",  user_id=randint(1, 10))
    seed_post55 = Post(title="The Great Cleric",  user_id=randint(1, 10))
    seed_post56 = Post(title="Grimgar of Ashes and Illusion",  user_id=randint(1, 10))
    seed_post57 = Post(title="Helck",  user_id=randint(1, 10))
    seed_post58 = Post(title="Hell's Paradise", image="https://res.cloudinary.com/dpdvw1sam/image/upload/v1701797548/hp_ta1t6n.png",description="After being sentenced to death, ninja Gabimaru the Hollow finds himself apathetic. After leading a blood-soaked life, Gabimaru believes he deserves to die. However, every attempt to execute him inexplicably fails. Finally, Sagiri Yamada Asaemon, a fledgling member of a famed executioner clan, is asked to take Gabimaru's life; yet Sagiri makes no move to kill him as requested. Insisting that Gabimaru will not die because of his love for his wife, Sagiri instead offers him the chance to obtain a full pardon for his crimes. If he can travel to the island of Shinsekyo and obtain the Elixir of Life—which supposedly grants immortality—and bring it back for the shogun, then his freedom will be assured. But of the many who have traveled to Shinsekyo in search of the mythical Elixir, not a single person has returned sound of mind, if at all. Though unaware of the numerous dangers ahead, Gabimaru decides to accept the offer—alongside ten other death row convicts—in hope that he and his wife may finally live in peace.",user_id="4")
    seed_post59 = Post(title="Hellsing Ultimate",  user_id=randint(1, 10))
    seed_post60 = Post(title="Hero Classroom",  user_id=randint(1, 10))
    seed_post61 = Post(title="Hunter x Hunter",  user_id=randint(1, 10))
    seed_post62 = Post(title="Hitori No SHita",  user_id=randint(1, 10))
    seed_post63 = Post(title="Horiyama",  user_id=randint(1, 10))
    seed_post64 = Post(title="I Don't Want To Get Hurt So I Maxed Out My Defense",  user_id=randint(1, 10))
    seed_post65 = Post(title="Initial D",  user_id=randint(1, 10))
    seed_post66 = Post(title="Jujutsu Kaisen",  user_id=randint(1, 10))
    seed_post67 = Post(title="Kakeguri",  user_id=randint(1, 10))
    seed_post68 = Post(title="Kill La Kill",  user_id=randint(1, 10))
    seed_post69 = Post(title="Kingdoms of Ruin",  user_id=randint(1, 10))
    seed_post70=  Post(title="The Lengendary Hero is Dead",  user_id=randint(1, 10))
    seed_post71 = Post(title="Link Click",  user_id=randint(1, 10))
    seed_post72 = Post(title="Masamunkun Revenge",  user_id=randint(1, 10))
    seed_post73 = Post(title="Mashle",  user_id=randint(1, 10))
    seed_post74 = Post(title="Mob Psycho",  user_id=randint(1, 10))
    seed_post75 = Post(title="Mobile Suit Gundam",  user_id=randint(1, 10))
    seed_post76 = Post(title="Monster",  user_id=randint(1, 10))
    seed_post77 = Post(title="Monogatari",  user_id=randint(1, 10))
    seed_post78 = Post(title="The Most Heretical Last Boss Queen",  user_id=randint(1, 10))
    seed_post79 = Post(title='Mushoku Tensei: Jobless Reincarnation', image="https://res.cloudinary.com/dpdvw1sam/image/upload/v1701797444/mkjr_fqfrcn.jpg",description="Despite being bullied, scorned, and oppressed all of his life, a 34-year-old shut-in still found the resolve to attempt something heroic—only for it to end in a tragic accident. But in a twist of fate, he awakens in another world as Rudeus Greyrat, starting life again as a baby born to two loving parents. Preserving his memories and knowledge from his previous life, Rudeus quickly adapts to his new environment. With the mind of a grown adult, he starts to display magical talent that exceeds all expectations, honing his skill with the help of a mage named Roxy Migurdia. Rudeus learns swordplay from his father, Paul, and meets Sylphiette, a girl his age who quickly becomes his closest friend. As Rudeus' second chance at life begins, he tries to make the most of his new opportunity while conquering his traumatic past. And perhaps, one day, he may find the one thing he could not find in his old world—love.",user_id="3" )
    seed_post80 = Post(title="My Hero Academia", user_id=randint(1, 10) )
    seed_post81 = Post(title="Neir", user_id=randint(1, 10))
    seed_post82 = Post(title="Neon Genesis Evangelion", user_id=randint(1, 10))
    seed_post83 = Post(title="Naruto", user_id=randint(1, 10))
    seed_post84 = Post(title="Naruto Shippuden", user_id=randint(1, 10))
    seed_post85 = Post(title="One Piece", user_id=randint(1, 10))
    seed_post86= Post(title="One Punch Man", user_id=randint(1, 10))
    seed_post87=Post(title="Overlord", user_id=randint(1, 10))
    seed_post88 = Post(title="Radiant", user_id=randint(1, 10))
    seed_post89=Post(title="Ragna Crimson", user_id=randint(1, 10))
    seed_post90= Post(tite="Ranking of Kings", user_id=randint(1, 10))
    seed_post91 = Post(title="Rise of the Shield Hero", user_id=randint(1, 10))
    seed_post95 = Post(title="Redo of Hero", user_id=randint(1, 10))
    seed_post96 = Post(title="Reign of the Seven Spell Blades", user_id=randint(1, 10))
    seed_post97 = Post(title="Rezero", user_id=randint(1, 10))
    seed_post98= Post(title="Rurouni Kenshin", user_id=randint(1, 10))
    seed_post99=Post(title="Saint Seiya", user_id=randint(1, 10))
    seed_post100 = Post(title="Seven Deadly Sins", user_id=randint(1, 10))
    seed_post101=Post(title="Seven Knights Revolution", user_id=randint(1, 10))
    seed_post102 = Post(title="Shaman King", user_id=randint(1, 10))
    seed_post103 = Post(title="Shikimoris not just a Cutie", user_id=randint(1, 10))
    seed_post104= Post(title="Soul Eater", user_id=randint(1, 10))
    seed_post105 = Post(title="Scissor Seven", user_id=randint(1, 10))
    seed_post106 = Post(title="Spare Me, Great Lord", user_id=randint(1, 10))
    seed_post107 = Post(title="Spy Classroom", user_id=randint(1, 10))
    seed_post108 = Post(title="Spy Family", user_id=randint(1, 10))
    seed_post109 = Post(title="Steins Gate", user_id=randint(1, 10))
    seed_post110 = Post(title="Strike the Blood", user_id=randint(1, 10))
    seed_post111 = Post(title="Tower of God", user_id=randint(1, 10))
    seed_post112= Post(title="Tales of Zestria", user_id=randint(1, 10))
    seed_post113 = Post(title= "The Promised Neverland", user_id=randint(1, 10))
    seed_post114= Post(title='The Time I Got Reincarnated as A Slime',image="https://res.cloudinary.com/dpdvw1sam/image/upload/v1701797258/slime_hgxhzv.webp" ,description="Lonely thirty-seven-year-old Satoru Mikami is stuck in a dead-end job, unhappy with his mundane life, but after dying at the hands of a robber, they awaken to a fresh start in a fantasy realm... as a slime! As Rimuru acclimates to their new, goopy, existence, their exploits with the other monsters set off a chain of events that will change the world forever!", user_id="2")
    seed_post115 = Post(title="Tokyo 24th Ward", user_id=randint(1, 10))
    seed_post116= Post(title="Trigun", user_id=randint(1, 10))
    seed_post117 =Post(title="Tsugumomo", user_id=randint(1, 10))
    seed_post118 = Post(title="Tsukimichi Moonlit Fantasy", user_id=randint(1, 10))
    seed_post119 = Post(title="Tsuyokute New Saga", user_id=randint(1, 10))
    seed_post120 = Post(title="Undead Murder Farce", user_id=randint(1, 10))
    seed_post121 = Post(title="Undead Unlock", user_id=randint(1, 10))
    seed_post122 = Post(title="Under the Dog", user_id=randint(1, 10))
    seed_post123 = Post(title="The World's Greatest Assassin Get Reincarnated As an Aristocrat", user_id=randint(1, 10))
    seed_post124 = Post(title="Xam'd Lost Memories", user_id=randint(1, 10))
    seed_post125 = Post(title="Zatch Bell", user_id=randint(1, 10))
    seed_post126 = Post(title="Zom 100: Bucket List of The Dead", user_id=randint(1, 10))
    seed_post127 = Post(title="91 Days", user_id=randint(1, 10))







    all_posts = [seed_post1, seed_post2, seed_post3, seed_post4, seed_post5, seed_post6,
                 seed_post7, seed_post8, seed_post9, seed_post10, seed_post11, seed_post12,seed_post13, seed_post14,
                 seed_post15, seed_post16,seed_post17, seed_post18, seed_post19, seed_post20, seed_post21, seed_post22,
                 seed_post23, seed_post24, seed_post25,seed_post26, seed_post27, seed_post28, seed_post29, seed_post30,
                 seed_post31, seed_post32, seed_post33, seed_post34, seed_post35, seed_post36, seed_post37, seed_post38,
                 seed_post39, seed_post40, seed_post41, seed_post42, seed_post43, seed_post44, seed_post45, seed_post45,
                 seed_post46, seed_post47, seed_post48, seed_post49, seed_post50, seed_post51, seed_post52, seed_post53,
                 seed_post54, seed_post55, seed_post56, seed_post57, seed_post58, seed_post59, seed_post60, seed_post61,
                 seed_post62, seed_post63, seed_post64. seed_post65, seed_post66, seed_post67, seed_post68, seed_post69,
                 seed_post70, seed_post71, seed_post72, seed_post73, seed_post74, seed_post75, seed_post76, seed_post77,
                 seed_post78, seed_post79, seed_post80, seed_post81, seed_post82, seed_post83, seed_post84, seed_post85,
                 seed_post86, seed_post88, seed_post89, seed_post90, seed_post91, seed_post92, seed_post93, seed_post94,
                 seed_post95, seed_post96, seed_post97, seed_post98, seed_post99, seed_post100, seed_post101, seed_post102,
                 seed_post103, seed_post104, seed_post105, seed_post106, seed_post107, seed_post108, seed_post109, seed_post110,
                 seed_post111, seed_post112, seed_post113, seed_post114, seed_post115, seed_post116, seed_post117, seed_post118,
                 seed_post119, seed_post120, seed_post121, seed_post122, seed_post123, seed_post124, seed_post125, seed_post126,
                 seed_post127]
    add_products = [db.session.add(post) for post in all_posts]
    db.session.commit()


def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))

    db.session.commit()
