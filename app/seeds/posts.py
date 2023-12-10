from app.models import db, Post, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_posts():
    seed_post1= Post(title="After Lost")
    seed_post2= Post(title="Ajin Demi Human")
    seed_post3 = Post(title="Am I actually the Strongest")
    seed_post4 = Post(title="Assasination Classroom")
    seed_post5 = Post(title="Attack on Titan")
    seed_post6 = Post(title="Atelier Ryza")
    seed_post7 = Post(title="Akame Ga Kill")
    seed_post8 = Post(title="Akudame Drive")
    seed_post9 = Post(title="Afro Samurai")
    seed_post10 = Post(title="Ayaka: A Story of Bonds and Wounds")
    seed_post11=Post(title="Basilisk")
    seed_post12 = Post(title="Bastard")
    seed_post13 = Post(title="Brserk")
    seed_post14 =Post(title="Beyond The Boundary")
    seed_post15 =Post(title="B: The Beginning")
    seed_post16 = Post(title='Black Clover', image="https://res.cloudinary.com/dpdvw1sam/image/upload/v1701796836/bc_tgapsn.jpg" ,description="Asta and Yuno were abandoned at the same church on the same day. Raised together as children, they came to know of the 'Wizard King'—a title given to the strongest mage in the kingdom—and promised that they would compete against each other for the position of the next Wizard King. However, as they grew up, the stark difference between them became evident. While Yuno is able to wield magic with amazing power and control, Asta cannot use magic at all and desperately tries to awaken his powers by training physically. When they reach the age of 15, Yuno is bestowed a spectacular Grimoire with a four-leaf clover, while Asta receives nothing. However, soon after, Yuno is attacked by a person named Lebuty, whose main purpose is to obtain Yuno's Grimoire. Asta tries to fight Lebuty, but he is outmatched. Though without hope and on the brink of defeat, he finds the strength to continue when he hears Yuno's voice. Unleashing his inner emotions in a rage, Asta receives a five-leaf clover Grimoire, a 'Black Clover' giving him enough power to defeat Lebuty. A few days later, the two friends head out into the world, both seeking the same goal—to become the Wizard King!", user_id="1")
    seed_post17 = Post(title="Bleach")
    seed_post18 = Post(title="Blue Dragon")
    seed_post19=Post(title="Blue Exorcist")
    seed_post20 = Post(title="Burn The Witch")
    seed_post21 = Post(title="Bunguo Stray Dog")
    seed_post22 =Post(title="Cautious Hero")
    seed_post23= Post(title="Chained Soldier")
    seed_post24 = Post(title="Charlotte")
    seed_post25 = Post(title="Code Geass")
    seed_post26 = Post(title="Classroom of the Elite")
    seed_post27 = Post(title="Cowboy Bebop")
    seed_post28 = Post(title="Cyberpunk EdgeRunners")
    seed_post29 = Post(title="Daily Life of the Immortal King")
    seed_post30= Post(title="Dark Gathering")
    seed_post31 = Post(title="Darker Than Black")
    seed_post32 = Post(title="Darwin's Game")
    seed_post33 = Post(title="Death Note")
    seed_post34 = Post(title="Death Parade")
    seed_post35 = Post(title="Daedman Wonderland")
    seed_post36 = Post(title = "Delicious in Dungeon")
    seed_post37 = Post(title="Demon Slayer")
    seed_post38 = Post(title="Dororo")
    seed_post39 = Post(title="Eden's Zero")
    seed_post40=Post(title="Erased")
    seed_post41 = Post(title="Elfin Lied")
    seed_post42 = Post(title="Fairy Tale")
    seed_post43 = Post(title="Fate Zero")
    seed_post44 = Post(title="Fire Force")
    seed_post45 = Post(title="Fruit Basket")
    seed_post46 = Post(title="Fruit of Evolution")
    seed_post47 = Post(title="Full Metal Alchemist")
    seed_post48 = Post(title="Full Metal Alchemist: Brotherhood")
    seed_post49 = Post(title = "The Future Diary")
    seed_post50 = Post(title="Gangsta")
    seed_post51 = Post(title="The Gene of A.I.")
    seed_post52 = Post(title="Gintama")
    seed_post53= Post(title="God of High School")
    seed_post54 = Post(title="Gurren Lagann")
    seed_post55 = Post(title="The Great Cleric")
    seed_post56 = Post(title="Grimgar of Ashes and Illusion")
    seed_post57 = Post(title="Helck")
    seed_post58 = Post(title="Hell's Paradise", image="https://res.cloudinary.com/dpdvw1sam/image/upload/v1701797548/hp_ta1t6n.png",description="After being sentenced to death, ninja Gabimaru the Hollow finds himself apathetic. After leading a blood-soaked life, Gabimaru believes he deserves to die. However, every attempt to execute him inexplicably fails. Finally, Sagiri Yamada Asaemon, a fledgling member of a famed executioner clan, is asked to take Gabimaru's life; yet Sagiri makes no move to kill him as requested. Insisting that Gabimaru will not die because of his love for his wife, Sagiri instead offers him the chance to obtain a full pardon for his crimes. If he can travel to the island of Shinsekyo and obtain the Elixir of Life—which supposedly grants immortality—and bring it back for the shogun, then his freedom will be assured. But of the many who have traveled to Shinsekyo in search of the mythical Elixir, not a single person has returned sound of mind, if at all. Though unaware of the numerous dangers ahead, Gabimaru decides to accept the offer—alongside ten other death row convicts—in hope that he and his wife may finally live in peace.",user_id="4")
    seed_post59 = Post(title="Hellsing Ultimate")
    seed_post60 = Post(title="Hero Classroom")
    seed_post61 = Post(title="Hunter x Hunter")
    seed_post62 = Post(title="Hitori No SHita")
    seed_post63 = Post(title="Horiyama")
    seed_post64 = Post(title="I Don't Want To Get Hurt So I Maxed Out My Defense")
    seed_post65 = Post(title="Initial D")
    seed_post66 = Post(title="Jujutsu Kaisen")
    seed_post67 = Post(title="Kakeguri")
    seed_post68 = Post(title="Kill La Kill")
    seed_post69 = Post(title="Kingdoms of Ruin")
    seed_post70=  Post(title="The Lengendary Hero is Dead")
    seed_post71 = Post(title="Link Click")
    seed_post72 = Post(title="Masamunkun Revenge")
    seed_post73 = Post(title="Mashle")
    seed_post74 = Post(title="Mob Psycho")
    seed_post75 = Post(title="Mobile Suit Gundam")
    seed_post76 = Post(title="Monster")
    seed_post77 = Post(title="Monogatari")
    seed_post78 = Post(title="The Most Heretical Last Boss Queen")
    seed_post79 = Post(title='Mushoku Tensei: Jobless Reincarnation', image="https://res.cloudinary.com/dpdvw1sam/image/upload/v1701797444/mkjr_fqfrcn.jpg",description="Despite being bullied, scorned, and oppressed all of his life, a 34-year-old shut-in still found the resolve to attempt something heroic—only for it to end in a tragic accident. But in a twist of fate, he awakens in another world as Rudeus Greyrat, starting life again as a baby born to two loving parents. Preserving his memories and knowledge from his previous life, Rudeus quickly adapts to his new environment. With the mind of a grown adult, he starts to display magical talent that exceeds all expectations, honing his skill with the help of a mage named Roxy Migurdia. Rudeus learns swordplay from his father, Paul, and meets Sylphiette, a girl his age who quickly becomes his closest friend. As Rudeus' second chance at life begins, he tries to make the most of his new opportunity while conquering his traumatic past. And perhaps, one day, he may find the one thing he could not find in his old world—love.",user_id="3" )
    seed_post80 = Post(title="My Hero Academia")
    seed_post81 = Post(title="Neir")
    seed_post82 = Post(title="Neon Genesis Evangelion")
    seed_post83 = Post(title="Naruto")
    seed_post84 = Post(title="Naruto Shippuden")
    seed_post85 = Post(title="One Piece")
    seed_post86= Post(title="One Punch Man")
    seed_post87=Post(title="Overlord")
    seed_post88 = Post(title="Radiant")
    seed_post89=Post(title="Ragna Crimson")
    seed_post90= Post(tite="Ranking of Kings")
    seed_post91 = Post(title="Rise of the Shield Hero")
    seed_post95 = Post(title="Redo of Hero")
    seed_post96 = Post(title="Reign of the Seven Spell Blades")
    seed_post97 = Post(title="Rezero")
    seed_post98= Post(title="Rurouni Kenshin")
    seed_post99=Post(title="Saint Seiya")
    seed_post100 = Post(title="Seven Deadly Sins")
    seed_post101=Post(title="Seven Knights Revolution")
    seed_post102 = Post(title="Shaman King")
    seed_post103 = Post(title="Shikimoris not just a Cutie")
    seed_post104= Post(title="Soul Eater")
    seed_post105 = Post(title="Scissor Seven")
    seed_post106 = Post(title="Spare Me, Great Lord")
    seed_post107 = Post(title="Spy Classroom")
    seed_post108 = Post(title="Spy Family")
    seed_post109 = Post(title="Steins Gate")
    seed_post110 = Post(title="Strike the Blood")
    seed_post111 = Post(title="Tower of God")
    seed_post112= Post(title="Tales of Zestria")
    seed_post113 = Post(title= "The Promised Neverland")
    seed_post114= Post(title='The Time I Got Reincarnated as A Slime',image="https://res.cloudinary.com/dpdvw1sam/image/upload/v1701797258/slime_hgxhzv.webp" ,description="Lonely thirty-seven-year-old Satoru Mikami is stuck in a dead-end job, unhappy with his mundane life, but after dying at the hands of a robber, they awaken to a fresh start in a fantasy realm... as a slime! As Rimuru acclimates to their new, goopy, existence, their exploits with the other monsters set off a chain of events that will change the world forever!", user_id="2")
    seed_post115 = Post(title="Tokyo 24th Ward")
    seed_post116= Post(title="Trigun")
    seed_post117 =Post(title="Tsugumomo")
    seed_post118 = Post(title="Tsukimichi Moonlit Fantasy")
    seed_post119 = Post(title="Tsuyokute New Sage")







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
                 seed_post119, seed_post120]
    add_products = [db.session.add(post) for post in all_posts]
    db.session.commit()


def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))

    db.session.commit()
