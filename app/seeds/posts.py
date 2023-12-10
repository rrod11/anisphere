from app.models import db, Post, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_posts():
    seed_post1= Post(title='The Time I Got Reincarnated as A Slime',image="https://res.cloudinary.com/dpdvw1sam/image/upload/v1701797258/slime_hgxhzv.webp" ,description="Lonely thirty-seven-year-old Satoru Mikami is stuck in a dead-end job, unhappy with his mundane life, but after dying at the hands of a robber, they awaken to a fresh start in a fantasy realm... as a slime! As Rimuru acclimates to their new, goopy, existence, their exploits with the other monsters set off a chain of events that will change the world forever!", user_id="2")
    seed_post3 = Post(title='Mushoku Tensei: Jobless Reincarnation', image="https://res.cloudinary.com/dpdvw1sam/image/upload/v1701797444/mkjr_fqfrcn.jpg",description="Despite being bullied, scorned, and oppressed all of his life, a 34-year-old shut-in still found the resolve to attempt something heroic—only for it to end in a tragic accident. But in a twist of fate, he awakens in another world as Rudeus Greyrat, starting life again as a baby born to two loving parents. Preserving his memories and knowledge from his previous life, Rudeus quickly adapts to his new environment. With the mind of a grown adult, he starts to display magical talent that exceeds all expectations, honing his skill with the help of a mage named Roxy Migurdia. Rudeus learns swordplay from his father, Paul, and meets Sylphiette, a girl his age who quickly becomes his closest friend. As Rudeus' second chance at life begins, he tries to make the most of his new opportunity while conquering his traumatic past. And perhaps, one day, he may find the one thing he could not find in his old world—love.",user_id="3" )
    seed_post4 = Post(title="Hell's Paradise", image="https://res.cloudinary.com/dpdvw1sam/image/upload/v1701797548/hp_ta1t6n.png",description="After being sentenced to death, ninja Gabimaru the Hollow finds himself apathetic. After leading a blood-soaked life, Gabimaru believes he deserves to die. However, every attempt to execute him inexplicably fails. Finally, Sagiri Yamada Asaemon, a fledgling member of a famed executioner clan, is asked to take Gabimaru's life; yet Sagiri makes no move to kill him as requested. Insisting that Gabimaru will not die because of his love for his wife, Sagiri instead offers him the chance to obtain a full pardon for his crimes. If he can travel to the island of Shinsekyo and obtain the Elixir of Life—which supposedly grants immortality—and bring it back for the shogun, then his freedom will be assured. But of the many who have traveled to Shinsekyo in search of the mythical Elixir, not a single person has returned sound of mind, if at all. Though unaware of the numerous dangers ahead, Gabimaru decides to accept the offer—alongside ten other death row convicts—in hope that he and his wife may finally live in peace.",user_id="4")
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
    seed_post45 = Post(title="")






    all_posts = [seed_post1, seed_post2, seed_post3, seed_post4, seed_post5, seed_post6,
                 seed_post7, seed_post8, seed_post9, seed_post10, seed_post11, seed_post12,seed_post13, seed_post14,
                 seed_post15, seed_post16,seed_post17, seed_post18, seed_post19, seed_post20, seed_post21, seed_post22,
                 seed_post23, seed_post24, seed_post25,seed_post26, seed_post27, seed_post28, seed_post29, seed_post30,
                 seed_post31, seed_post32, seed_post33, seed_post34, seed_post35, seed_post36, seed_post37, seed_post38,
                 seed_post39, seed_post40, seed_post41, seed_post42, seed_post43, seed_post44, seed_post45, seed_post45,
                 seed_post46, seed_post47, seed_post48, seed_post49, seed_post50, seed_post51, seed_post52, seed_post53,
                 seed_post54, seed_post55, seed_post56, seed_post57, seed_post58, seed_post59, seed_post60, seed_post61,
                 seed_post62, seed_post63, seed_post64. seed_post65]
    add_products = [db.session.add(post) for post in all_posts]
    db.session.commit()


def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))

    db.session.commit()
