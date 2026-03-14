export interface Prose {
  title: string;
  author: string;
  category: string;
  summary?: string;
  year?: string;
  facts?: string;
}

export const proseDatabase: Prose[] = [

  // ── BRITISH PROSE ──────────────────────────────────────────────────────────

  {
    title: "Toxophilus",
    author: "Roger Ascham",
    category: "British Prose",
    year: "1545",
    summary: "A dialogue between Toxophilus and Philologus debating the merits of archery versus book learning.",
    facts: "- First book on archery written in English\n- Defends the use of English over Latin\n- Marks early English prose style and humanism"
  },
  {
    title: "The Scholemaster",
    author: "Roger Ascham",
    category: "British Prose",
    year: "1570",
    summary: "A treatise on education promoting a gentle method of teaching Latin called 'double translation' and warning against the corrupting influence of Italy.",
    facts: "- Published posthumously\n- Famous quote: 'an Englishman Italianate is a devil incarnate'"
  },
  {
    title: "Of Studies",
    author: "Francis Bacon",
    category: "British Prose",
    year: "1597",
    summary: "An essay arguing that studies serve three purposes: delight, ornament, and ability.",
    facts: "- Famous quote: 'Some books are to be tasted, others to be swallowed, and some few to be chewed and digested'\n- From the first edition of Bacon's Essays (1597)"
  },
  {
    title: "Of Beauty",
    author: "Francis Bacon",
    category: "British Prose",
    year: "1612",
    summary: "An essay distinguishing between physical beauty and grace, arguing that virtue is an essential companion to beauty.",
    facts: "- Part of Bacon's Essays\n- Bacon is known as the 'father of the English essay'"
  },
  {
    title: "Of Truth",
    author: "Francis Bacon",
    category: "British Prose",
    year: "1625",
    summary: "An essay exploring why men love lies, arguing that truth is the sovereign good of human nature.",
    facts: "- Opens with Pilate's question: 'What is truth?'\n- Opens the final enlarged edition of the Essays (1625)"
  },
  {
    title: "Of Adversity",
    author: "Francis Bacon",
    category: "British Prose",
    year: "1625",
    summary: "An essay arguing that adversity brings out the best in human character, contrasting it with prosperity.",
    facts: "- Famous quote: 'Prosperity is the blessing of the Old Testament; adversity is the blessing of the New'"
  },
  {
    title: "Of Envy",
    author: "Francis Bacon",
    category: "British Prose",
    year: "1625",
    summary: "An analysis of envy distinguishing between public envy, which checks kings, and private envy, which is destructive.",
    facts: "- Part of the 1625 Essays\n- Influenced later moral essayists like Addison and Steele"
  },
  {
    title: "Of Love",
    author: "Francis Bacon",
    category: "British Prose",
    year: "1612",
    summary: "A sceptical view of romantic love, describing it as a weakness that distracts great men from their purposes.",
    facts: "- Famous quote: 'It is impossible to love and be wise'\n- Distinguishes stage love from real love"
  },
  {
    title: "Of Ambition",
    author: "Francis Bacon",
    category: "British Prose",
    year: "1625",
    summary: "Examines ambition as a dangerous but useful force, advising rulers to employ ambitious men in wars to channel their energy.",
    facts: "- Part of the 1625 Essays\n- Reflects Bacon's own pragmatic political career"
  },
  {
    title: "Of Revenge",
    author: "Francis Bacon",
    category: "British Prose",
    year: "1625",
    summary: "Argues against private revenge, accepting it only when the law cannot provide redress.",
    facts: "- Opens with the famous quote: 'Revenge is a kind of wild justice'"
  },
  {
    title: "Of Great Place",
    author: "Francis Bacon",
    category: "British Prose",
    year: "1612",
    summary: "Reflects on the burdens of high office, stating men in power are servants of the sovereign, fame, and the public.",
    facts: "- Part of the 1612 Essays\n- Argues it takes more virtue to leave power gracefully than to obtain it"
  },
  {
    title: "Of Marriage and Single Life",
    author: "Francis Bacon",
    category: "British Prose",
    year: "1612",
    summary: "Weighs marriage against bachelorhood, arguing married men are better citizens but single men are better friends.",
    facts: "- Takes a pragmatic, non-emotional perspective on human relationships"
  },
  {
    title: "Of Friendship",
    author: "Francis Bacon",
    category: "British Prose",
    year: "1625",
    summary: "Explores the practical benefits of friendship: easing the heart, providing counsel, and assisting in action.",
    facts: "- One of Bacon's longest essays\n- Frequently compared to Montaigne's essay on the same topic"
  },
  {
    title: "The Anatomy of Melancholy",
    author: "Robert Burton",
    category: "British Prose",
    year: "1621",
    summary: "A vast encyclopaedic work exploring the causes, symptoms, and cures of melancholy using a fictional persona, Democritus Junior.",
    facts: "- Hugely influential on writers like Keats and Sterne\n- Draws extensively on classical, medical, and literary sources"
  },
  {
    title: "Religio Medici",
    author: "Sir Thomas Browne",
    category: "British Prose",
    year: "1642",
    summary: "A personal meditation by a physician reconciling scientific inquiry with Christian belief.",
    facts: "- Title translates to 'The Religion of a Doctor'\n- Placed on the Catholic Index of Forbidden Books in 1645"
  },
  {
    title: "Urn Burial",
    author: "Sir Thomas Browne",
    category: "British Prose",
    year: "1658",
    summary: "Prompted by the discovery of ancient Roman urns in Norfolk, the text meditates on death, memory, and the futility of earthly fame.",
    facts: "- Full title: 'Hydriotaphia, Urn Burial'\n- The final chapter is widely considered a masterpiece of English prose"
  },
  {
    title: "An Essay Concerning Human Understanding",
    author: "John Locke",
    category: "British Prose",
    year: "1689",
    summary: "Argues that the human mind begins as a blank slate (tabula rasa) and all knowledge derives from sensory experience.",
    facts: "- Founding text of British empiricism\n- Hugely influential on the Enlightenment and modern psychology"
  },
  {
    title: "Two Treatises of Government",
    author: "John Locke",
    category: "British Prose",
    year: "1689",
    summary: "Refutes the divine right of kings and argues that government derives its authority from the consent of the governed.",
    facts: "- Directly influenced the American Declaration of Independence (1776)"
  },
  {
    title: "Leviathan",
    author: "Thomas Hobbes",
    category: "British Prose",
    year: "1651",
    summary: "Argues that to escape the brutal state of nature, people must enter a social contract and surrender their rights to an absolute sovereign.",
    facts: "- Famous quote describing life without government: 'solitary, poor, nasty, brutish, and short'\n- Foundational text of political philosophy"
  },
  {
    title: "Areopagitica",
    author: "John Milton",
    category: "British Prose",
    year: "1644",
    summary: "A passionate speech addressed to the Parliament of England arguing against the licensing and censorship of books.",
    facts: "- Title refers to the Areopagus, an Athenian hill used as a court\n- Considered the greatest defence of freedom of the press in English"
  },
  {
    title: "The Pilgrim's Progress",
    author: "John Bunyan",
    category: "British Prose",
    year: "1678",
    summary: "A religious allegory following Christian as he flees the City of Destruction and travels to the Celestial City.",
    facts: "- Written while Bunyan was imprisoned for unlicensed preaching\n- Features locations like the Slough of Despond and Vanity Fair"
  },
  {
    title: "The Compleat Angler",
    author: "Izaak Walton",
    category: "British Prose",
    year: "1653",
    summary: "A celebration of fishing written as a dialogue between a fisherman, a hunter, and a fowler.",
    facts: "- A touchstone text of English pastoral prose\n- One of the most reprinted books in English literature"
  },
  {
    title: "A Modest Proposal",
    author: "Jonathan Swift",
    category: "British Prose",
    year: "1729",
    summary: "A satirical essay suggesting the Irish poor should sell their babies as food for the English rich to ease economic troubles.",
    facts: "- A savage attack on British economic exploitation of Ireland\n- Masterpiece of sustained irony and satirical prose"
  },
  {
    title: "A Tale of a Tub",
    author: "Jonathan Swift",
    category: "British Prose",
    year: "1704",
    summary: "A complex satire attacking religious extremism and literary pedantry through an allegory of three brothers representing branches of Christianity.",
    facts: "- The brothers are Peter (Catholic), Martin (Anglican), and Jack (Dissenter)\n- Damaged Swift's career in the Church due to its irreverence"
  },
  {
    title: "The Drapier's Letters",
    author: "Jonathan Swift",
    category: "British Prose",
    year: "1724",
    summary: "A series of pamphlets written under the persona of a Dublin draper opposing the introduction of debased copper coinage into Ireland.",
    facts: "- Successfully halted the introduction of Wood's halfpence\n- A landmark in Irish political writing"
  },
  {
    title: "The Spectator",
    author: "Joseph Addison",
    category: "British Prose",
    year: "1711",
    summary: "A daily periodical featuring essays on manners, morals, and literature, aiming to bring philosophy out of libraries to clubs and assemblies.",
    facts: "- Co-founded by Joseph Addison and Richard Steele (1711–1712)\n- Published 555 issues\n- Established the model for the English essay"
  },
  {
    title: "The Tatler",
    author: "Richard Steele",
    category: "British Prose",
    year: "1709",
    summary: "A periodical preceding The Spectator covering news, gossip, and moral reflection under the fictional persona Isaac Bickerstaff.",
    facts: "- Founded by Richard Steele in 1709\n- The pseudonym Isaac Bickerstaff was originally created by Swift"
  },
  {
    title: "The Citizen of the World",
    author: "Oliver Goldsmith",
    category: "British Prose",
    year: "1762",
    summary: "A series of fictional letters by a Chinese philosopher visiting London, observing English society and absurdities with an outsider's eye.",
    facts: "- First published in 'The Public Ledger'\n- Uses the popular 18th-century 'foreign observer' device"
  },
  {
    title: "The Rambler",
    author: "Samuel Johnson",
    category: "British Prose",
    year: "1750",
    summary: "A twice-weekly periodical covering morality, literature, and daily life, written almost entirely by Johnson.",
    facts: "- Johnson wrote 208 issues essentially alone between 1750 and 1752\n- Cemented Johnson's authoritative, Latinate prose style"
  },
  {
    title: "The Life of Samuel Johnson",
    author: "James Boswell",
    category: "British Prose",
    year: "1791",
    summary: "A pioneering biography recording conversations, anecdotes, and observations of Johnson over more than twenty years.",
    facts: "- Considered the greatest biography in the English language\n- Revolutionised biographical writing by recording direct conversation"
  },
  {
    title: "The History of the Decline and Fall of the Roman Empire",
    author: "Edward Gibbon",
    category: "British Prose",
    year: "1776",
    summary: "A monumental history tracing Rome's fall to 1453, attributing it to internal moral decay, Christianity, and barbarian invasions.",
    facts: "- Published in six volumes between 1776 and 1789\n- Chapters critiquing early Christianity caused enormous controversy"
  },
  {
    title: "Letters on England",
    author: "Voltaire",
    category: "British Prose",
    year: "1733",
    summary: "Voltaire's account of English society, praising its religious tolerance and political freedom as a contrast to French despotism.",
    facts: "- Also known as 'Philosophical Letters'\n- Ordered burned in France as a danger to religion and the state"
  },
  {
    title: "A Vindication of the Rights of Woman",
    author: "Mary Wollstonecraft",
    category: "British Prose",
    year: "1792",
    summary: "An early feminist philosophy text arguing that women are not naturally inferior to men, but appear so only due to lack of education.",
    facts: "- Demands equal education and rational development for women\n- A founding text of Western feminism"
  },
  {
    title: "An Enquiry Concerning Human Understanding",
    author: "David Hume",
    category: "British Prose",
    year: "1748",
    summary: "Presents Hume's empiricist philosophy, arguing all knowledge derives from sensory experience and questioning the concept of causation.",
    facts: "- A revision of his earlier 'Treatise of Human Nature'\n- Famously attacks miracles as evidence for religion"
  },
  {
    title: "Reflections on the Revolution in France",
    author: "Edmund Burke",
    category: "British Prose",
    year: "1790",
    summary: "Attacks the French Revolution for destroying institutions, arguing for tradition, inheritance, and gradual reform instead.",
    facts: "- Considered the founding text of modern conservatism\n- Prompted Thomas Paine to write 'Rights of Man' in response"
  },
  {
    title: "Philosophical Enquiry into the Origin of Our Ideas of the Sublime and Beautiful",
    author: "Edmund Burke",
    category: "British Prose",
    year: "1757",
    summary: "Distinguishes between the sublime (associated with terror and vastness) and the beautiful (associated with smoothness and pleasure).",
    facts: "- Grounds aesthetics in psychology rather than reason\n- Hugely influential on Romantic literature and Gothic writers"
  },
  {
    title: "Rights of Man",
    author: "Thomas Paine",
    category: "British Prose",
    year: "1791",
    summary: "Defends the French Revolution and argues that every generation has the right to determine its own government.",
    facts: "- Written as a direct reply to Burke's 'Reflections'\n- Advocates for democratic rights and welfare provisions"
  },
  {
    title: "The Wealth of Nations",
    author: "Adam Smith",
    category: "British Prose",
    year: "1776",
    summary: "Argues that free markets, driven by self-interest and the 'invisible hand', produce the most efficient allocation of resources.",
    facts: "- The foundational text of modern economics\n- Published in 1776"
  },
  {
    title: "Sartor Resartus",
    author: "Thomas Carlyle",
    category: "British Prose",
    year: "1833",
    summary: "A satirical philosophical work presenting a 'philosophy of clothes' by a fictional German professor to attack materialism.",
    facts: "- Title translates to 'The Tailor Re-tailored'\n- Greatly influenced American Transcendentalism"
  },
  {
    title: "The French Revolution",
    author: "Thomas Carlyle",
    category: "British Prose",
    year: "1837",
    summary: "A dramatic history presenting the Revolution as a vast catastrophe caused by the failure of the French aristocracy and church.",
    facts: "- Charles Dickens used it as a primary source for 'A Tale of Two Cities'\n- Mill's housemaid accidentally burned the manuscript of Volume I"
  },
  {
    title: "The Hero as Man of Letters",
    author: "Thomas Carlyle",
    category: "British Prose",
    year: "1841",
    summary: "Argues that the great writer is a modern hero whose pen shapes society, using Johnson, Rousseau, and Burns as examples.",
    facts: "- Part of the series 'On Heroes, Hero-Worship, and the Heroic in History' (1841)"
  },
  {
    title: "Past and Present",
    author: "Thomas Carlyle",
    category: "British Prose",
    year: "1843",
    summary: "Contrasts the ordered life of a 12th-century English abbey with the chaos and misery of industrial England in the 1840s.",
    facts: "- Attacks laissez-faire economics\n- Directly influenced John Ruskin and Friedrich Engels"
  },
  {
    title: "On Liberty",
    author: "John Stuart Mill",
    category: "British Prose",
    year: "1859",
    summary: "A philosophical defence of individual freedom introducing the 'harm principle' to justify restricting liberty only to prevent harm to others.",
    facts: "- Co-authored in spirit by Mill's wife, Harriet Taylor\n- A central text in liberal political philosophy"
  },
  {
    title: "Utilitarianism",
    author: "John Stuart Mill",
    category: "British Prose",
    year: "1863",
    summary: "Defends the philosophy that actions are right if they produce the greatest happiness for the greatest number.",
    facts: "- Refines Jeremy Bentham's philosophy\n- Famous quote: 'Better to be Socrates dissatisfied than a fool satisfied'"
  },
  {
    title: "Confessions of an English Opium-Eater",
    author: "Thomas De Quincey",
    category: "British Prose",
    year: "1821",
    summary: "A memoir detailing the author's opium addiction, the pleasures and terrors of his opium dreams, and withdrawal.",
    facts: "- Considered the founding text of the literary drug memoir\n- Influenced Edgar Allan Poe and Baudelaire"
  },
  {
    title: "On Murder Considered as one of the Fine Arts",
    author: "Thomas De Quincey",
    category: "British Prose",
    year: "1827",
    summary: "A dark satirical essay adopting a mock-aesthetic tone to treat murder as an art form judged by aesthetic criteria.",
    facts: "- Parodies connoisseurship while meditating on violence and beauty"
  },
  {
    title: "The English Mail Coach",
    author: "Thomas De Quincey",
    category: "British Prose",
    year: "1849",
    summary: "An essayistic memoir celebrating the mail coach system, moving between realism and hallucinatory vision.",
    facts: "- Contains the famous 'Dream Fugue' section, a masterpiece of prose poetry"
  },
  {
    title: "On the Knocking at the Gate in Macbeth",
    author: "Thomas De Quincey",
    category: "British Prose",
    year: "1823",
    summary: "A critical essay arguing that the knocking after Duncan's murder restores the normal world, deepening the sense of evil.",
    facts: "- Considered one of the finest pieces of Shakespearean criticism in English"
  },
  {
    title: "Suspiria de Profundis",
    author: "Thomas De Quincey",
    category: "British Prose",
    year: "1845",
    summary: "A sequel to the Confessions containing visionary prose poems reflecting on childhood suffering and the human mind.",
    facts: "- Title translates to 'Sighs from the Depths'\n- Includes the famous section personifying the three 'Ladies of Sorrow'"
  },
  {
    title: "Modern Painters",
    author: "John Ruskin",
    category: "British Prose",
    year: "1843",
    summary: "A multi-volume study arguing that great art must represent truth to nature, originally written to defend J. M. W. Turner.",
    facts: "- Ruskin wrote Volume I at age 24\n- Deeply shaped the aesthetics of the Pre-Raphaelite Brotherhood"
  },
  {
    title: "The Stones of Venice",
    author: "John Ruskin",
    category: "British Prose",
    year: "1851",
    summary: "A study of Venetian architecture arguing that a city's art reflects its moral and spiritual state.",
    facts: "- Chapter 'The Nature of Gothic' inspired William Morris and the Arts and Crafts Movement\n- Attacks the dehumanising effects of industrial labour"
  },
  {
    title: "Unto This Last",
    author: "John Ruskin",
    category: "British Prose",
    year: "1860",
    summary: "A fierce attack on classical economics, arguing for a moral economy based on justice, affection, and human dignity.",
    facts: "- Mahatma Gandhi translated it into Gujarati as 'Sarvodaya'\n- Serialised in Cornhill Magazine but cancelled early due to reader protests"
  },
  {
    title: "The Woods in Spring",
    author: "R. L. Stevenson",
    category: "British Prose",
    year: "1876",
    summary: "A lyrical nature essay celebrating the awakening of the woods in spring with great sensory vividness.",
    facts: "- Part of Stevenson's early essays\n- Shows his skill as a graceful prose stylist in the tradition of Hazlitt"
  },
  {
    title: "Culture and Anarchy",
    author: "Matthew Arnold",
    category: "British Prose",
    year: "1869",
    summary: "Argues British society is divided into Barbarians (aristocracy), Philistines (middle class), and Populace (working class), and that culture is the only antidote.",
    facts: "- Coined the term 'Philistine' for the culturally narrow middle class\n- Introduced the critical concept of 'Hellenism vs Hebraism'"
  },
  {
    title: "Literature and Dogma",
    author: "Matthew Arnold",
    category: "British Prose",
    year: "1873",
    summary: "Argues for interpreting Christianity based on literature rather than literal dogma.",
    facts: "- Defines God as 'the power not ourselves that makes for righteousness'\n- Influenced later liberal theology"
  },
  {
    title: "Table-Talk",
    author: "William Hazlitt",
    category: "British Prose",
    year: "1821",
    summary: "A collection of conversational personal essays covering painting, acting, envy, and the fear of death.",
    facts: "- Hazlitt is considered the greatest critic of the Romantic age\n- Praised by T.S. Eliot and Virginia Woolf"
  },
  {
    title: "The Round Table",
    author: "William Hazlitt",
    category: "British Prose",
    year: "1817",
    summary: "A collection of essays covering literature, drama, and manners, co-written with Leigh Hunt.",
    facts: "- Originally published in The Examiner\n- Helped establish Hazlitt as a leading critic"
  },
  {
    title: "The Indian Jugglers",
    author: "William Hazlitt",
    category: "British Prose",
    year: "1821",
    summary: "Uses a performance by Indian jugglers to meditate on the difference between mechanical skill and unteachable genius.",
    facts: "- A quintessential model of the familiar essay form"
  },
  {
    title: "My First Acquaintance with Poets",
    author: "William Hazlitt",
    category: "British Prose",
    year: "1823",
    summary: "A memoir recounting an 18-year-old Hazlitt's first intoxicating meetings with Coleridge and Wordsworth in 1798.",
    facts: "- Provides a rare first-hand portrait of the Romantic poets in their prime\n- Deeply influenced John Keats"
  },
  {
    title: "An Essay on the Principles of Human Action",
    author: "William Hazlitt",
    category: "British Prose",
    year: "1805",
    summary: "A philosophical essay arguing against psychological egoism, claiming humans are naturally disinterested and capable of genuine concern for others.",
    facts: "- Hazlitt's first published work\n- Shares affinities with Keats's concept of 'negative capability'"
  },
  {
    title: "Essays of Elia",
    author: "Charles Lamb",
    category: "British Prose",
    year: "1823",
    summary: "A collection of warm, nostalgic personal essays covering childhood memories, old books, and London life.",
    facts: "- First published in The London Magazine under the pen name Elia\n- Deliberately uses an old-fashioned, 17th-century prose style"
  },
  {
    title: "Dream Children: A Reverie",
    author: "Charles Lamb",
    category: "British Prose",
    year: "1822",
    summary: "A poignant essay where the narrator imagines telling his children about his youth, before waking to the reality that he is unmarried and childless.",
    facts: "- A masterpiece of the personal essay meditating on loss and fantasy\n- Reflects Lamb's lifelong bachelorhood and care for his sister Mary"
  },
  {
    title: "Old China",
    author: "Charles Lamb",
    category: "British Prose",
    year: "1823",
    summary: "Lamb and his sister Mary reminisce over old china, reflecting on the pleasures of their poorer days when small indulgences meant more.",
    facts: "- Highly praised by Virginia Woolf for its intimacy and emotional depth"
  },
  {
    title: "A Dissertation upon Roast Pig",
    author: "Charles Lamb",
    category: "British Prose",
    year: "1822",
    summary: "A comic mock-history of how mankind discovered roast pork after a Chinese boy accidentally burned down a house with pigs inside.",
    facts: "- One of Lamb's most famous and frequently anthologised comic essays"
  },
  {
    title: "Essay on Milton",
    author: "T. B. Macaulay",
    category: "British Prose",
    year: "1825",
    summary: "A critical essay praising Milton's epic poetry and defending his Puritan political convictions.",
    facts: "- Published in the Edinburgh Review\n- Made the 25-year-old Macaulay famous overnight"
  },
  {
    title: "Apologia Pro Vita Sua",
    author: "John Henry Newman",
    category: "British Prose",
    year: "1864",
    summary: "An autobiographical account of Newman's spiritual journey from Anglicanism to Roman Catholicism.",
    facts: "- Title means 'A Defence of His Own Life'\n- Written in direct response to an attack by Charles Kingsley"
  },
  {
    title: "Eminent Victorians",
    author: "Lytton Strachey",
    category: "British Prose",
    year: "1918",
    summary: "Four biographical portraits (Manning, Nightingale, Arnold, Gordon) that use irony to debunk Victorian myth-making.",
    facts: "- Revolutionised the art of biography with psychological analysis\n- Strachey was a key member of the Bloomsbury Group"
  },
  {
    title: "Silly Novels by Lady Novelists",
    author: "George Eliot",
    category: "British Prose",
    year: "1856",
    summary: "Attacks the poor quality of fiction by women who treat novel-writing as a frivolous hobby, demanding intellectual rigour instead.",
    facts: "- Written under her real name, Marian Evans, before she began writing fiction\n- A key text in feminist literary history"
  },
  {
    title: "Orthodoxy",
    author: "G. K. Chesterton",
    category: "British Prose",
    year: "1908",
    summary: "An intellectual autobiography explaining Chesterton's journey to Christian orthodoxy, arguing that scepticism leads to madness.",
    facts: "- Written as a positive companion piece to 'Heretics'\n- Deeply influenced C. S. Lewis's conversion to Christianity"
  },
  {
    title: "Heretics",
    author: "G. K. Chesterton",
    category: "British Prose",
    year: "1905",
    summary: "A collection attacking the shallow, fashionable ideas of contemporary thinkers like H. G. Wells and Bernard Shaw.",
    facts: "- Prompted Shaw to challenge Chesterton to write a defense of his own beliefs"
  },
  {
    title: "All Things Considered",
    author: "G. K. Chesterton",
    category: "British Prose",
    year: "1908",
    summary: "Short essays using everyday objects like cheese and sandwiches as springboards for surprising philosophical arguments.",
    facts: "- Showcases his highly influential paradoxical and witty prose style"
  },
  {
    title: "The Great Mutiny: India",
    author: "Christopher Hibbert",
    category: "British Prose",
    year: "1978",
    summary: "A narrative history of the Indian Rebellion of 1857 using eyewitness accounts from both British and Indian sources.",
    facts: "- Also published as 'The Destruction of Lord Raglan'"
  },
  {
    title: "Remote People",
    author: "Evelyn Waugh",
    category: "British Prose",
    year: "1931",
    summary: "A travel memoir of Waugh's journey to Abyssinia for the coronation of Haile Selassie, capturing the absurdity of colonial life.",
    facts: "- Informed his later satirical novels 'Black Mischief' and 'Scoop'"
  },
  {
    title: "Lives of Poets",
    author: "Samuel Johnson",
    category: "British Prose",
    year: "1779",
    summary: "Biographical and critical essays on 52 English poets, featuring lively portraits and frank critical judgements.",
    facts: "- Full title: 'Prefaces, Biographical and Critical, to the Works of the English Poets'\n- Famously criticized Milton's 'Lycidas' for lacking passion"
  },
  {
    title: "Women to Men",
    author: "Charlotte Perkins Stetson Gilman",
    category: "British Prose",
    year: "1911",
    summary: "A collection arguing for women's economic independence, critiquing domestic confinement as the root of gender inequality.",
    facts: "- Anticipates many core arguments of second-wave feminism"
  },
  {
    title: "Children as Nuisances / A Treatise on Parents and Children",
    author: "George Bernard Shaw",
    category: "British Prose",
    year: "1910",
    summary: "A polemical preface arguing that children are treated as property, attacking compulsory education and corporal punishment.",
    facts: "- Attached as the preface to Shaw's play 'Misalliance'"
  },
  {
    title: "Anticipations",
    author: "H. G. Wells",
    category: "British Prose",
    year: "1901",
    summary: "A speculative non-fiction work predicting 20th-century developments like motor cars, aerial warfare, and suburban growth.",
    facts: "- Wells's first major non-fiction work\n- Highly accurate in many of its sociological predictions"
  },
  {
    title: "On the Rule of the Road",
    author: "A. G. Gardiner",
    category: "British Prose",
    year: "1921",
    summary: "Uses the etiquette of road use as a metaphor to argue that true liberty requires the discipline of respecting others' rights.",
    facts: "- Gardiner wrote under the pen name 'Alpha of the Plough'"
  },
  {
    title: "On Forgetting",
    author: "Robert Lynd",
    category: "British Prose",
    year: "1921",
    summary: "A witty essay reflecting on the universal human tendency to forget facts, names, and appointments.",
    facts: "- Lynd wrote for The New Statesman under the pen name 'Y. Y.'"
  },
  {
    title: "The Divine Within",
    author: "Aldous Huxley",
    category: "British Prose",
    year: "1956",
    summary: "Explores mystical experience and the nature of human consciousness, drawing on Eastern and Western spiritual traditions.",
    facts: "- Reflects Huxley's shift toward mysticism, partly informed by his mescaline experiments"
  },
  {
    title: "Modern Fiction",
    author: "Virginia Woolf",
    category: "British Prose",
    year: "1919",
    summary: "Attacks the materialist fiction of writers like Arnold Bennett, arguing novelists should instead capture the inner consciousness.",
    facts: "- A founding manifesto of Modernist fiction\n- Famous quote: 'examine for a moment an ordinary mind on an ordinary day'"
  },
  {
    title: "A Room of One's Own",
    author: "Virginia Woolf",
    category: "British Prose",
    year: "1929",
    summary: "Argues a woman must have money and a private room to write, introducing the concept of Shakespeare's equally brilliant sister, Judith.",
    facts: "- Based on two lectures given at women's colleges at Cambridge\n- Argues for an 'androgynous mind' as the ideal state for writing"
  },
  {
    title: "Mr. Bennett and Mrs. Brown",
    author: "Virginia Woolf",
    category: "British Prose",
    year: "1924",
    summary: "Uses a fictional lady in a railway carriage to argue that Edwardian novelists focus on material conditions rather than capturing true human character.",
    facts: "- Contains the famous claim: 'On or about December 1910, human character changed'"
  },
  {
    title: "Three Guineas",
    author: "Virginia Woolf",
    category: "British Prose",
    year: "1938",
    summary: "Argues that fascism and British patriarchal structures share the same roots, casting women as outsiders with a duty to oppose war.",
    facts: "- Written as a response to a letter asking how to prevent war\n- Considered one of the most important feminist political texts of the 20th century"
  },
  {
    title: "The Common Reader",
    author: "Virginia Woolf",
    category: "British Prose",
    year: "1925",
    summary: "Literary essays celebrating the ordinary reader who reads for pleasure, covering Greek literature, drama, and Russian novelists.",
    facts: "- The title is borrowed from Samuel Johnson\n- Includes the famous essay 'How Should One Read a Book?'"
  },
  {
    title: "Hamlet and His Problems",
    author: "T. S. Eliot",
    category: "British Prose",
    year: "1919",
    summary: "Argues that Hamlet is an artistic failure because Shakespeare could not find a set of objects or events to adequately express Hamlet's emotion.",
    facts: "- Introduced the hugely influential critical concept of the 'objective correlative'\n- Essential for 20th-century literary theory"
  },
  {
    title: "Politics and the English Language",
    author: "George Orwell",
    category: "British Prose",
    year: "1946",
    summary: "Argues that bad writing corrupts thought, showing how vague and pretentious political language conceals ugly realities.",
    facts: "- Contains Orwell's famous six rules for clear writing\n- Famous rule: 'Never use a long word where a short one will do'"
  },
  {
    title: "Shooting an Elephant",
    author: "George Orwell",
    category: "British Prose",
    year: "1936",
    summary: "An autobiographical essay where the narrator is pressured into shooting a tame elephant that has gone rogue in Burma.",
    facts: "- Famous quote: 'When the white man turns tyrant it is his own freedom that he destroys'\n- Key theme: The performative nature of colonial authority"
  },
  {
    title: "The Lion and the Unicorn",
    author: "George Orwell",
    category: "British Prose",
    year: "1941",
    summary: "Written during the Blitz, Orwell calls for a democratic socialist revolution to harness English patriotism and win the war.",
    facts: "- Full title: 'The Lion and the Unicorn: Socialism and the English Genius'"
  },
  {
    title: "The Problems of Philosophy",
    author: "Bertrand Russell",
    category: "British Prose",
    year: "1912",
    summary: "An accessible introduction to epistemology and reality, famously using a table to question the difference between appearance and matter.",
    facts: "- Russell won the Nobel Prize in Literature (1950)"
  },
  {
    title: "Why I Am Not a Christian",
    author: "Bertrand Russell",
    category: "British Prose",
    year: "1927",
    summary: "Examines and rejects traditional arguments for God, arguing that religion is primarily based on fear.",
    facts: "- This text contributed to Russell being denied a professorship in New York in 1940"
  },
  {
    title: "Education and the Social Order",
    author: "Bertrand Russell",
    category: "British Prose",
    year: "1932",
    summary: "Argues that modern education creates obedient citizens rather than free, creative thinkers, advocating for individual excellence.",
    facts: "- Russell and his wife ran an experimental school, Beacon Hill, inspired by these ideas"
  },
  {
    title: "Aspects of the Novel",
    author: "E. M. Forster",
    category: "British Prose",
    year: "1927",
    summary: "A series of Cambridge lectures on the craft of fiction, discussing story, plot, fantasy, and rhythm.",
    facts: "- Introduced the critical distinction between 'flat' characters and 'round' characters"
  },
  {
    title: "Two Cheers for Democracy",
    author: "E. M. Forster",
    category: "British Prose",
    year: "1951",
    summary: "Argues for democracy as the least bad political system, while insisting personal relationships matter more than the state.",
    facts: "- Famous quote: 'If I had to choose between betraying my country and betraying my friend, I hope I should have the guts to betray my country'"
  },
  {
    title: "Shakespearean Tragedy",
    author: "A. C. Bradley",
    category: "British Prose",
    year: "1904",
    summary: "A systematic study of Hamlet, Othello, King Lear, and Macbeth, focusing heavily on character analysis and tragic flaws.",
    facts: "- The most influential book on Shakespeare written in English\n- Famously attacked by L. C. Knights in 'How Many Children Had Lady Macbeth?'"
  },
  {
    title: "The Great Tradition",
    author: "F. R. Leavis",
    category: "British Prose",
    year: "1948",
    summary: "Argues that the only morally serious novelists in the English tradition are Jane Austen, George Eliot, Henry James, and Joseph Conrad.",
    facts: "- Famously dismissed Charles Dickens as a mere entertainer\n- Defined a generation of English literary studies"
  },
  {
    title: "The Abolition of Man",
    author: "C. S. Lewis",
    category: "British Prose",
    year: "1943",
    summary: "Defends the existence of objective values (the Tao) and warns against subjectivist moral education.",
    facts: "- Warns that relativist education produces 'men without chests' (people without moral feeling)"
  },
  {
    title: "The Four Loves",
    author: "C. S. Lewis",
    category: "British Prose",
    year: "1960",
    summary: "Analyses four kinds of love in Greek: Storge (affection), Philia (friendship), Eros (romantic), and Agape (divine).",
    facts: "- Argues natural loves must be subordinated to divine love to avoid becoming demonic\n- Based on a series of radio broadcasts"
  },
  {
    title: "Reflections on the Psalms",
    author: "C. S. Lewis",
    category: "British Prose",
    year: "1958",
    summary: "Reflects on the Psalms as a literary reader rather than a theologian, discussing cursing psalms and self-righteousness.",
    facts: "- Exemplifies Lewis's approach of reading the Bible as literature informed by faith"
  },
  {
    title: "Proust",
    author: "Samuel Beckett",
    category: "British Prose",
    year: "1931",
    summary: "A critical essay analyzing Marcel Proust's 'In Search of Lost Time', focusing on themes of habit, time, and involuntary memory.",
    facts: "- Beckett won the Nobel Prize in Literature (1969)\n- Lays the intellectual foundation for Beckett's own later themes in his plays"
  },
  {
    title: "Disjecta",
    author: "Samuel Beckett",
    category: "British Prose",
    year: "1983",
    summary: "A posthumous collection of Beckett's miscellaneous critical essays, letters, and unpublished fragments.",
    facts: "- Title translates to 'scattered pieces'\n- Includes 'German Letter of 1937' discussing his desire to bore holes in language\n- Essential for understanding Beckett's aesthetic philosophy"
  },
  {
    title: "Under My Skin",
    author: "Doris Lessing",
    category: "British Prose",
    year: "1994",
    summary: "The first volume of Lessing's autobiography covering her childhood in Rhodesia and early Communist activism.",
    facts: "- Doris Lessing won the Nobel Prize in Literature (2007)\n- Noted for its fierce honesty and political insight"
  },
  {
    title: "Shakespeare: The Invention of the Human",
    author: "Harold Bloom",
    category: "British Prose",
    year: "1998",
    summary: "Argues that Shakespeare did not merely reflect human nature but actively invented our modern understanding of what it means to be human.",
    facts: "- A major work of 'aesthetic criticism'\n- Focuses heavily on Falstaff and Hamlet as the most fully realised characters"
  },
  {
    title: "Ways of Seeing",
    author: "John Berger",
    category: "British Prose",
    year: "1972",
    summary: "Argues that how we see art is shaped by assumptions about gender, class, and the ownership of images.",
    facts: "- Based on a BBC television series\n- Hugely influential in art history and cultural studies\n- Famous opening: 'Seeing comes before words'"
  },
  {
    title: "About Looking",
    author: "John Berger",
    category: "British Prose",
    year: "1980",
    summary: "Essays exploring how photographs freeze time, how animals are reduced to spectacle, and how art survives.",
    facts: "- Includes the famous essay 'Why Look at Animals?'\n- Blends Marxist analysis with poetic sensitivity"
  },
  {
    title: "Changing My Mind",
    author: "Zadie Smith",
    category: "British Prose",
    year: "2009",
    summary: "Literary and personal essays covering writers, film, philosophy, and Smith's own development.",
    facts: "- Title reflects her belief that good thinking requires a willingness to change positions"
  },
  {
    title: "Feel Free",
    author: "Zadie Smith",
    category: "British Prose",
    year: "2018",
    summary: "A wide-ranging collection covering art, music, politics, and Caribbean literature.",
    facts: "- Includes the widely shared political essay 'On Optimism and Despair'"
  },
  {
    title: "Untold Stories",
    author: "Alan Bennett",
    category: "British Prose",
    year: "2005",
    summary: "A memoir covering Bennett's Yorkshire childhood, his mother's depression, and his cancer diagnosis.",
    facts: "- Written in Bennett's characteristically ironic and understated style"
  },
  {
    title: "Writing Home",
    author: "Alan Bennett",
    category: "British Prose",
    year: "1994",
    summary: "A collection of diaries and journalism spanning thirty years of Bennett's life.",
    facts: "- Includes his account of a woman living in a van, later adapted into the film 'The Lady in the Van' (2015)"
  },
  {
    title: "Whoops! Why Everyone Owes Everyone and No One Can Pay",
    author: "John Lanchester",
    category: "British Prose",
    year: "2010",
    summary: "A witty, accessible explanation of the 2008 global financial crisis and complex financial instruments.",
    facts: "- Praised for making financial complexity understandable to general readers"
  },
  {
    title: "Perfidious Man",
    author: "Will Self",
    category: "British Prose",
    year: "2000",
    summary: "Essays reflecting on masculinity, celebrity culture, and the peculiarities of British life.",
    facts: "- Self's dense, satirical prose style is often compared to Swift and De Quincey"
  },
  {
    title: "Walking to Hollywood",
    author: "Will Self",
    category: "British Prose",
    year: "2010",
    summary: "A hybrid memoir and travelogue describing a partially delusional walk from London to Hollywood.",
    facts: "- Explores themes of celebrity, landscape, and mental illness"
  },
  {
    title: "Phantasmagoria",
    author: "Marina Warner",
    category: "British Prose",
    year: "2006",
    summary: "A cultural history tracing phantom figures and ghosts in the Western imagination through cinema and digital culture.",
    facts: "- Argues that ghosts reveal our deepest fears and desires"
  },
  {
    title: "Stranger Magic",
    author: "Marina Warner",
    category: "British Prose",
    year: "2011",
    summary: "Explores 'The Arabian Nights' and its profound influence on Western culture and literature.",
    facts: "- Argues the tales are a shared world literary heritage, not just Eastern curiosities"
  },
  {
    title: "Letters to a Young Contrarian",
    author: "Christopher Hitchens",
    category: "British Prose",
    year: "2001",
    summary: "Advises on how to live as a contrarian who challenges consensus and defends unpopular positions.",
    facts: "- Written in the tradition of Rilke's 'Letters to a Young Poet'\n- Draws on figures like Socrates and Zola"
  },
  {
    title: "God Is Not Great",
    author: "Christopher Hitchens",
    category: "British Prose",
    year: "2007",
    summary: "A polemic against organized religion, arguing it promotes violence, ignorance, and servility.",
    facts: "- Full title: 'God Is Not Great: How Religion Poisons Everything'\n- A defining text of the 2000s 'New Atheism' movement"
  },
  {
    title: "The Story of the Jews",
    author: "Simon Schama",
    category: "British Prose",
    year: "2013",
    summary: "A narrative history tracing Jewish life, culture, and survival from antiquity to the threshold of modernity.",
    facts: "- Originally a BBC documentary series"
  },
  {
    title: "Landscape and Memory",
    author: "Simon Schama",
    category: "British Prose",
    year: "1995",
    summary: "Explores how Western culture shapes and is shaped by natural landscapes like forests, mountains, and rivers.",
    facts: "- Blends art criticism, history, and environmental writing"
  },
  {
    title: "The Consolations of Philosophy",
    author: "Alain de Botton",
    category: "British Prose",
    year: "2000",
    summary: "Applies the ideas of six major philosophers to common human problems like unpopularity, heartbreak, and failure.",
    facts: "- Became an international bestseller and was adapted into a TV series"
  },
  {
    title: "Status Anxiety",
    author: "Alain de Botton",
    category: "British Prose",
    year: "2004",
    summary: "An analysis of the modern obsession with social status, tracing the history of meritocracy.",
    facts: "- Argues modern societies attribute failure entirely to personal inadequacy"
  },
  {
    title: "We Shall Fight",
    author: "Winston Churchill",
    category: "British Prose",
    year: "1940",
    summary: "Churchill's famous speech delivered to the House of Commons after the Dunkirk evacuation, vowing Britain would never surrender.",
    facts: "- Churchill won the Nobel Prize in Literature (1953)\n- Full title: 'We Shall Fight on the Beaches'"
  },

  // ── OTHER PROSE ────────────────────────────────────────────────────────────

  {
    title: "Thus Spoke Zarathustra",
    author: "Friedrich Nietzsche",
    category: "Other Prose",
    year: "1883",
    summary: "A philosophical novel in which the prophet Zarathustra descends from a mountain to announce the death of God.",
    facts: "- Introduces the concept of the Übermensch (Superman) and eternal recurrence\n- Famous announcement: 'God is dead'"
  },
  {
    title: "Beyond Good and Evil",
    author: "Friedrich Nietzsche",
    category: "Other Prose",
    year: "1886",
    summary: "Attacks conventional Christian ethics as a 'slave morality' that suppresses the vital instincts of strong individuals.",
    facts: "- The concept of 'master morality vs slave morality' is essential for NET literary theory"
  },
  {
    title: "The Myth of Sisyphus",
    author: "Albert Camus",
    category: "Other Prose",
    year: "1942",
    summary: "Argues human life is absurd because we seek meaning in a meaningless universe, using Sisyphus as a metaphor.",
    facts: "- Camus won the Nobel Prize in Literature (1957)\n- Defined existentialist-absurdist philosophy\n- Famous quote: 'One must imagine Sisyphus happy'"
  },
  {
    title: "Reflections on the Guillotine",
    author: "Albert Camus",
    category: "Other Prose",
    year: "1957",
    summary: "A powerful philosophical and personal essay arguing against capital punishment.",
    facts: "- Contributed to growing European opposition to the death penalty"
  },
  {
    title: "Existentialism is a Humanism",
    author: "Jean-Paul Sartre",
    category: "Other Prose",
    year: "1945",
    summary: "A lecture defending existentialism, explaining that humans are not born with a fixed nature and are condemned to be free.",
    facts: "- Sartre won but declined the Nobel Prize in Literature (1964)\n- Famous phrase: 'Existence precedes essence'"
  },
  {
    title: "Being and Nothingness",
    author: "Jean-Paul Sartre",
    category: "Other Prose",
    year: "1943",
    summary: "A major philosophical work arguing that human consciousness is fundamentally different from the fixed being of objects.",
    facts: "- Developed the concept of 'bad faith' (self-deception to deny freedom)\n- Deeply influenced Simone de Beauvoir's feminism"
  },
  {
    title: "The World As I See It",
    author: "Albert Einstein",
    category: "Other Prose",
    year: "1934",
    summary: "Essays reflecting on science, pacifism, Jewish identity, and politics, advocating for international cooperation.",
    facts: "- His essay on education famously argues for imagination over rote learning"
  },
  {
    title: "The Human Condition",
    author: "Hannah Arendt",
    category: "Other Prose",
    year: "1958",
    summary: "Analyses the fundamental activities of human life: labour, work, and action (political life with others).",
    facts: "- Key concepts include the 'public realm' and 'natality' (the capacity to begin something new)"
  },
  {
    title: "Eichmann in Jerusalem",
    author: "Hannah Arendt",
    category: "Other Prose",
    year: "1963",
    summary: "A report on the trial of Nazi bureaucrat Adolf Eichmann, arguing he was not a monster but a thoughtless functionary.",
    facts: "- Coined the highly debated phrase 'banality of evil'\n- Hugely influential for Holocaust studies and ethics"
  },
  {
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    category: "Other Prose",
    year: "2011",
    summary: "A history of the human species arguing that our success stems from our cognitive ability to believe in shared fictions like money and religion.",
    facts: "- Originally published in Hebrew in 2011\n- Traces the cognitive, agricultural, and scientific revolutions"
  },
  {
    title: "On the Social Contract",
    author: "Jean-Jacques Rousseau",
    category: "Other Prose",
    year: "1762",
    summary: "Argues that legitimate authority rests on a contract where citizens surrender individual rights to the community, creating a 'general will'.",
    facts: "- Opens with the famous line: 'Man is born free, and everywhere he is in chains'\n- Directly influenced the French Revolution"
  },
  {
    title: "We Should All Be Feminists",
    author: "Chimamanda Ngozi Adichie",
    category: "Other Prose",
    year: "2014",
    summary: "Argues that feminism is not an angry or Western ideology but a simple demand for equal rights.",
    facts: "- Adapted from a TED talk\n- Famously sampled in Beyoncé's song 'Flawless'"
  },
  {
    title: "Dear Ijeawele",
    author: "Chimamanda Ngozi Adichie",
    category: "Other Prose",
    year: "2017",
    summary: "A letter offering fifteen suggestions on how to raise a feminist daughter, arguing against gender stereotyping from birth.",
    facts: "- Expands the ideas of 'We Should All Be Feminists' with practical advice"
  },
  {
    title: "Theory of Colours",
    author: "Johann Wolfgang von Goethe",
    category: "Other Prose",
    year: "1810",
    summary: "A scientific treatise arguing against Newton's purely physical account of light, emphasizing the mind's active role in perception.",
    facts: "- Influenced Schopenhauer, Turner, and Kandinsky\n- Ludwig Wittgenstein wrote 'Remarks on Colour' partly in response"
  },
  {
    title: "Maxims and Reflections",
    author: "Johann Wolfgang von Goethe",
    category: "Other Prose",
    year: "1833",
    summary: "A collection of aphorisms covering science, art, literature, and morality.",
    facts: "- Condenses complex ideas into memorable phrases\n- Influenced Nietzsche and many later German thinkers"
  },
  {
    title: "The Communist Manifesto",
    author: "Karl Marx",
    category: "Other Prose",
    year: "1848",
    summary: "Argues that all history is class struggle and that the proletariat must overthrow the bourgeoisie to establish a communist society.",
    facts: "- Co-authored with Friedrich Engels\n- Opens with: 'A spectre is haunting Europe'\n- Ends with: 'Workers of the world, unite!'"
  },
  {
    title: "Das Kapital",
    author: "Karl Marx",
    category: "Other Prose",
    year: "1867",
    summary: "Analyses capitalism as an exploitative system where workers are paid less than the value they create (surplus value).",
    facts: "- Only Volume I was published in Marx's lifetime\n- Engels edited Volumes II and III from Marx's notes"
  },
  {
    title: "The Condition of the Working Class in England",
    author: "Friedrich Engels",
    category: "Other Prose",
    year: "1845",
    summary: "Documents the appalling living conditions of the industrial working class in 1840s Manchester.",
    facts: "- Argues capitalism systematically produces poverty and disease\n- A key document of Victorian social history"
  },
  {
    title: "What Is Art?",
    author: "Leo Tolstoy",
    category: "Other Prose",
    year: "1897",
    summary: "Argues art's purpose is to transmit feeling to unite people, attacking inaccessible or complex art as counterfeit.",
    facts: "- Famously rejected Shakespeare, Beethoven, and his own early novels as failing his moral test"
  },
  {
    title: "The Kingdom of God Is Within You",
    author: "Leo Tolstoy",
    category: "Other Prose",
    year: "1894",
    summary: "Tolstoy's major work on Christian anarchism, arguing for an inner state of faith achieved through non-resistance to evil.",
    facts: "- Profoundly influenced Mahatma Gandhi's concept of Satyagraha (non-violent resistance)"
  },
  {
    title: "Pedagogy of the Oppressed",
    author: "Paulo Freire",
    category: "Other Prose",
    year: "1968",
    summary: "Attacks the passive 'banking model' of education, arguing instead for dialogic learning to empower the oppressed.",
    facts: "- Develops the concept of critical consciousness (conscientização)\n- Hugely important in postcolonial education studies"
  },
  {
    title: "The Shock Doctrine / No Logo",
    author: "Naomi Klein",
    category: "Other Prose",
    year: "2007",
    summary: "Argues free-market policies are forcefully imposed during disasters when populations are too traumatised to resist.",
    facts: "- Klein's earlier book 'No Logo' (1999) helped launch the global anti-globalisation movement"
  },
  {
    title: "The Diary of a Young Girl",
    author: "Anne Frank",
    category: "Other Prose",
    year: "1947",
    summary: "The diary of a Jewish girl hiding in a secret annexe in Amsterdam from 1942 to 1944.",
    facts: "- One of the most widely read books in the world\n- Declared a UNESCO World Heritage documentary"
  },
  {
    title: "The Gulag Archipelago",
    author: "Aleksandr Solzhenitsyn",
    category: "Other Prose",
    year: "1973",
    summary: "A monumental account of the Soviet forced labour camp system, drawing on testimonies from 227 witnesses.",
    facts: "- Solzhenitsyn won the Nobel Prize in Literature (1970)\n- Publication in the West led to his expulsion from the Soviet Union in 1974"
  },
  {
    title: "The Guns of August",
    author: "Barbara Tuchman",
    category: "Other Prose",
    year: "1962",
    summary: "A narrative history of the first month of World War I, detailing the rigid plans and miscommunications that caused the catastrophe.",
    facts: "- President Kennedy read it during the Cuban Missile Crisis as a warning against rigid military thinking"
  },
  {
    title: "The Rise and Fall of the Third Reich",
    author: "William L. Shirer",
    category: "Other Prose",
    year: "1960",
    summary: "A comprehensive history of Nazi Germany from 1933 to 1945, using captured documents and trial records.",
    facts: "- Written by a journalist stationed in Berlin during the 1930s\n- One of the best-selling history books of the 20th century"
  },
  {
    title: "Night",
    author: "Elie Wiesel",
    category: "Other Prose",
    year: "1956",
    summary: "An autobiographical account of Wiesel's teenage experiences and survival in the Auschwitz and Buchenwald concentration camps.",
    facts: "- Elie Wiesel won the Nobel Peace Prize (1986)\n- An essential Holocaust memoir centering on the destruction of his faith"
  },
  {
    title: "I Know Why the Caged Bird Sings",
    author: "Maya Angelou",
    category: "Other Prose",
    year: "1969",
    summary: "The first volume of Angelou's autobiography describing her childhood in the segregated South and her discovery of literature.",
    facts: "- Banned in many American schools for its frank treatment of racism and trauma\n- Angelou recited poetry at Bill Clinton's 1993 inauguration"
  },
  {
    title: "The Right Stuff",
    author: "Tom Wolfe",
    category: "Other Prose",
    year: "1979",
    summary: "An account of the early American space programme examining the skill and courage that defined the first astronauts.",
    facts: "- Considered a masterpiece of 'New Journalism', applying novelistic techniques to factual reporting"
  },
  {
    title: "Bury My Heart at Wounded Knee",
    author: "Dee Brown",
    category: "Other Prose",
    year: "1970",
    summary: "A history of the systematic destruction of Native American cultures by the US government told entirely from the indigenous perspective.",
    facts: "- Title refers to the 1890 Wounded Knee Massacre\n- Uses tribal council records and eyewitness accounts"
  },
  {
    title: "The Double Helix",
    author: "James D. Watson",
    category: "Other Prose",
    year: "1968",
    summary: "A candid, personal account of the competitive race to discover the structure of DNA at Cambridge in the 1950s.",
    facts: "- Watson won the Nobel Prize in Physiology (1962)\n- Controversially minimises the contribution of Rosalind Franklin"
  },
  {
    title: "The Great War and Modern Memory",
    author: "Paul Fussell",
    category: "Other Prose",
    year: "1975",
    summary: "An analysis of the literary response to World War I focusing on British soldier-writers like Siegfried Sassoon and Wilfred Owen.",
    facts: "- Argues the war created a new ironic sensibility that shapes modern consciousness"
  },
  {
    title: "The Years",
    author: "Annie Ernaux",
    category: "Other Prose",
    year: "2008",
    summary: "A memoir tracing French society from 1941 to 2006 through collective memory ('we'), photographs, and social change.",
    facts: "- Ernaux won the Nobel Prize in Literature (2022)\n- Written entirely in the third person"
  },
  {
    title: "A Woman's Story",
    author: "Annie Ernaux",
    category: "Other Prose",
    year: "1987",
    summary: "A memoir about Ernaux's working-class mother written after her death from Alzheimer's disease.",
    facts: "- Uses 'flat writing' (écriture plate) stripped of literary ornament"
  },
  {
    title: "Living to Tell the Tale",
    author: "Gabriel García Márquez",
    category: "Other Prose",
    year: "2002",
    summary: "The first volume of the author's autobiography covering his childhood in Colombia and discovery of literature.",
    facts: "- García Márquez won the Nobel Prize in Literature (1982)\n- Only one of three planned autobiographical volumes was completed"
  },
  {
    title: "The Labyrinth of Solitude",
    author: "Octavio Paz",
    category: "Other Prose",
    year: "1950",
    summary: "A profound meditation on Mexican national identity, exploring colonialism and the masks Mexicans adopt to hide vulnerability.",
    facts: "- Octavio Paz won the Nobel Prize in Literature (1990)\n- Analyses Mexican fiestas, death rituals, and the macho figure"
  },

  // ── AMERICAN PROSE ─────────────────────────────────────────────────────────

  {
    title: "Self-Reliance",
    author: "Ralph Waldo Emerson",
    category: "American Prose",
    year: "1841",
    summary: "Argues that individuals must trust their own instincts rather than conform to society or tradition.",
    facts: "- Famous quote: 'A foolish consistency is the hobgoblin of little minds'\n- Founding text of American Transcendentalism"
  },
  {
    title: "Nature",
    author: "Ralph Waldo Emerson",
    category: "American Prose",
    year: "1836",
    summary: "Argues that nature is the symbol of spirit and the medium for divine communication.",
    facts: "- The founding manifesto of American Transcendentalism\n- Introduces the famous 'transparent eyeball' concept"
  },
  {
    title: "Walden",
    author: "Henry David Thoreau",
    category: "American Prose",
    year: "1854",
    summary: "An account of Thoreau's time living alone in a cabin by Walden Pond, reflecting on simplicity and self-sufficiency.",
    facts: "- The cabin experiment lasted exactly two years, two months, and two days\n- Deeply influenced the modern environmental movement"
  },
  {
    title: "Civil Disobedience",
    author: "Henry David Thoreau",
    category: "American Prose",
    year: "1849",
    summary: "Argues individuals have a moral duty to disobey unjust laws, prioritizing conscience over the state.",
    facts: "- Originally titled 'Resistance to Civil Government'\n- Directly influenced Gandhi's Satyagraha and Martin Luther King Jr."
  },
  {
    title: "The Autobiography of Benjamin Franklin",
    author: "Benjamin Franklin",
    category: "American Prose",
    year: "1791",
    summary: "Traces Franklin's rise from poverty to wealth, detailing his self-education and practical philosophy of hard work.",
    facts: "- The first great American autobiography\n- A founding text of the 'self-made man' mythology"
  },
  {
    title: "The Souls of Black Folk",
    author: "W. E. B. Du Bois",
    category: "American Prose",
    year: "1903",
    summary: "A collection of essays on the African American experience in the post-Civil War South.",
    facts: "- Introduces the concept of 'double consciousness'\n- Famous opening: 'The problem of the twentieth century is the problem of the color-line'"
  },
  {
    title: "I Have a Dream",
    author: "Martin Luther King Jr.",
    category: "American Prose",
    year: "1963",
    summary: "King's famous speech calling for an end to racism and judging people by character rather than skin colour.",
    facts: "- Delivered at the Lincoln Memorial during the March on Washington\n- King won the Nobel Peace Prize (1964)"
  },
  {
    title: "Silent Spring",
    author: "Rachel Carson",
    category: "American Prose",
    year: "1962",
    summary: "Documents the devastating environmental effects of pesticides, arguing that industry has recklessly poisoned nature.",
    facts: "- Widely credited with launching the modern environmental movement\n- Led to the US ban on DDT in 1972"
  },
  {
    title: "In Cold Blood",
    author: "Truman Capote",
    category: "American Prose",
    year: "1966",
    summary: "A meticulously researched account of the 1959 murder of the Clutter family in Kansas and the subsequent trial.",
    facts: "- Invented the 'non-fiction novel' genre\n- Blends journalistic fact with novelistic technique"
  },
  {
    title: "Against Interpretation",
    author: "Susan Sontag",
    category: "American Prose",
    year: "1966",
    summary: "Argues critics focus too much on interpreting content at the expense of experiencing art's form and sensory impact.",
    facts: "- Famous quote: 'In place of a hermeneutics we need an erotics of art'"
  },
  {
    title: "On Photography",
    author: "Susan Sontag",
    category: "American Prose",
    year: "1977",
    summary: "Essays exploring how photographs substitute for reality and alter our relationship to tourism, war, and memory.",
    facts: "- Hugely influential in media studies\n- Roland Barthes' 'Camera Lucida' is partly a response to it"
  },
  {
    title: "Notes of a Native Son",
    author: "James Baldwin",
    category: "American Prose",
    year: "1955",
    summary: "Essays exploring the Black experience in America, analyzing racial violence and the Harlem of his childhood.",
    facts: "- Title essay connects his father's death with the 1943 Harlem race riot"
  },
  {
    title: "The Fire Next Time",
    author: "James Baldwin",
    category: "American Prose",
    year: "1963",
    summary: "Two linked essays meditating on race, religion, and the crisis of American racial consciousness, advocating love over hatred.",
    facts: "- Includes a letter to his nephew\n- Title comes from a spiritual: 'No more water, the fire next time'"
  },
  {
    title: "Dust Tracks on a Road",
    author: "Zora Neale Hurston",
    category: "American Prose",
    year: "1942",
    summary: "Hurston's autobiography tracing her childhood in an all-Black town, her education, and her career as a folklorist.",
    facts: "- Written with the vernacular richness of her fiction\n- Rediscovered by Alice Walker in the 1970s"
  },
  {
    title: "Manufacturing Consent",
    author: "Noam Chomsky",
    category: "American Prose",
    year: "1988",
    summary: "Argues mass media in democracies serve the powerful elite through a 'propaganda model' consisting of five filters.",
    facts: "- Co-authored with Edward S. Herman\n- Adapted into a documentary film in 1992"
  },
  {
    title: "Hegemony or Survival",
    author: "Noam Chomsky",
    category: "American Prose",
    year: "2003",
    summary: "Argues American foreign policy is driven by an imperial grand strategy for global hegemony at the cost of human survival.",
    facts: "- Venezuelan president Hugo Chávez famously endorsed it at the UN General Assembly in 2006"
  },
  {
    title: "Playing in the Dark",
    author: "Toni Morrison",
    category: "American Prose",
    year: "1992",
    summary: "Literary essays arguing that the Africanist presence has been systematically ignored but is central to American literature.",
    facts: "- Toni Morrison won the Nobel Prize in Literature (1993)\n- Analyses authors like Poe, Hemingway, and Twain"
  },
  {
    title: "Nobel Acceptance Speech",
    author: "Nelson Mandela",
    category: "American Prose",
    year: "1993",
    summary: "Mandela's speech honouring the anti-apartheid struggle and calling for justice, reconciliation, and the end of racism.",
    facts: "- Mandela won the Nobel Peace Prize (1993)\n- Shared the prize with F. W. de Klerk"
  },
  {
    title: "On National Culture",
    author: "Frantz Fanon",
    category: "American Prose",
    year: "1961",
    summary: "An essay from 'The Wretched of the Earth' arguing that colonised peoples must reclaim their own culture for liberation.",
    facts: "- Fanon was a Martinique-born psychiatrist\n- 'The Wretched of the Earth' features a famous preface by Sartre"
  },

  // ── INDIAN PROSE ───────────────────────────────────────────────────────────

  {
    title: "A Defence of Hindu Theism",
    author: "Raja Ram Mohan Roy",
    category: "Indian Prose",
    year: "1817",
    summary: "Defends the monotheistic basis of Hinduism against Christian missionaries and orthodox polytheists using rational argument.",
    facts: "- Called the 'Father of the Bengal Renaissance'\n- The first Indian reformer to use English prose for religious debate"
  },
  {
    title: "Complete Works of Swami Vivekananda",
    author: "Swami Vivekananda",
    category: "Indian Prose",
    year: "1907",
    summary: "The collected speeches, essays, and poems covering Vedanta philosophy, Yoga, and Indian spirituality.",
    facts: "- His 1893 Chicago speech received a two-minute standing ovation\n- Founded the Ramakrishna Mission"
  },
  {
    title: "Our Motherland",
    author: "Swami Vivekananda",
    category: "Indian Prose",
    year: "1897",
    summary: "A speech calling on Indians to take pride in their spiritual heritage while acknowledging the need for social progress.",
    facts: "- Delivered after his return from the West\n- Part of his wider project of Hindu nationalism and social reform"
  },
  {
    title: "Individual and Self",
    author: "J. Krishnamurti",
    category: "Indian Prose",
    year: "1953",
    summary: "Explores the nature of the self, arguing that a fixed, separate self is an illusion created by psychological conditioning.",
    facts: "- Krishnamurti famously dissolved the Order of the Star in 1929, rejecting all external authority"
  },
  {
    title: "What Are We Seeking",
    author: "J. Krishnamurti",
    category: "Indian Prose",
    year: "1950",
    summary: "Asks why humans perpetually search for external happiness, arguing that seeking is rooted in fear and discontent.",
    facts: "- Questioning method rejects organized religion and ideology\n- Admired by figures like Aldous Huxley and David Bohm"
  },
  {
    title: "Anandamath",
    author: "Bankim Chandra Chatterjee",
    category: "Indian Prose",
    year: "1882",
    summary: "A Bengali historical novel set during the Sannyasi Rebellion where Hindu monks fight British and Muslim power.",
    facts: "- Contains the Indian national song 'Vande Mataram'\n- Bankim Chandra is called the 'Walter Scott of Bengal'"
  },
  {
    title: "Nationalism",
    author: "Rabindranath Tagore",
    category: "Indian Prose",
    year: "1917",
    summary: "A critique of Western political nationalism, contrasting its commercial machine with India's broader spiritual civilization.",
    facts: "- Tagore won the Nobel Prize in Literature (1913)\n- Famously returned his knighthood after the 1919 Jallianwala Bagh massacre"
  },
  {
    title: "The Religion of Man",
    author: "Rabindranath Tagore",
    category: "Indian Prose",
    year: "1931",
    summary: "Presents a humanist religious vision where God is revealed through human creativity, love, and relationships.",
    facts: "- Based on his Hibbert Lectures at Oxford\n- Blends Upanishadic philosophy, Vaishnavism, and Western humanism"
  },
  {
    title: "Hind Swaraj",
    author: "Mahatma Gandhi",
    category: "Indian Prose",
    year: "1909",
    summary: "A dialogue arguing for Indian home rule (swaraj) through moral regeneration rather than violence or parliamentary politics.",
    facts: "- Written in Gujarati on a ship in just ten days\n- Translated into English by Gandhi himself"
  },
  {
    title: "My Experiments with Truth",
    author: "Mahatma Gandhi",
    category: "Indian Prose",
    year: "1927",
    summary: "Gandhi's autobiography tracing his life as an experiment in pursuing truth (Satya) and non-violence (Ahimsa).",
    facts: "- Originally serialised in 'Navajivan'\n- Deeply influenced Nelson Mandela and Martin Luther King Jr."
  },
  {
    title: "Glimpses of World History",
    author: "Jawaharlal Nehru",
    category: "Indian Prose",
    year: "1934",
    summary: "A series of letters written by Nehru from prison to his daughter Indira, surveying world history from ancient to modern times.",
    facts: "- Written entirely from prison without reference books\n- Covers 3000 years of history in 196 letters"
  },
  {
    title: "The Discovery of India",
    author: "Jawaharlal Nehru",
    category: "Indian Prose",
    year: "1946",
    summary: "A meditation on Indian history and culture written during imprisonment, defining the 'idea of India' as unity in diversity.",
    facts: "- Shaped the secular vision of the Indian Constitution\n- Adapted into the television series 'Bharat Ek Khoj'"
  },
  {
    title: "Annihilation of Caste",
    author: "B. R. Ambedkar",
    category: "Indian Prose",
    year: "1936",
    summary: "An undelivered speech arguing that caste is the foundation of Hindu society and must be completely destroyed, not reformed.",
    facts: "- Sparked a famous public debate with Gandhi\n- Arundhati Roy wrote a major introduction for the 2014 edition"
  },
  {
    title: "Waiting for a Visa",
    author: "B. R. Ambedkar",
    category: "Indian Prose",
    year: "1935",
    summary: "An autobiographical account of specific incidents of untouchability and discrimination Ambedkar experienced.",
    facts: "- One of the earliest and most devastating first-person accounts of caste discrimination"
  },
  {
    title: "Thoughts on Social Justice",
    author: "B. R. Ambedkar",
    category: "Indian Prose",
    year: "1943",
    summary: "Argues social justice requires economic equality and the destruction of caste hierarchy, critiquing Gandhian and orthodox socialist approaches.",
    facts: "- Ambedkar was the principal architect of the Indian Constitution\n- Essential for NET on Indian social thought"
  },
  {
    title: "My Days",
    author: "R. K. Narayan",
    category: "Indian Prose",
    year: "1974",
    summary: "Narayan's autobiography tracing his childhood, education, early marriage, and development as a writer in Malgudi.",
    facts: "- Author of 'The Guide', which won the Sahitya Akademi Award (1960)\n- Graham Greene was his most important early supporter"
  },
  {
    title: "The Doctor and the Saint",
    author: "Arundhati Roy",
    category: "Indian Prose",
    year: "2017",
    summary: "A critical essay examining the contrast between Gandhi and Ambedkar on caste, arguing Gandhi's views were regressive.",
    facts: "- Written as an introduction to Ambedkar's 'Annihilation of Caste'\n- Sparked enormous controversy in India"
  },
  {
    title: "Capitalism: A Ghost Story",
    author: "Arundhati Roy",
    category: "Indian Prose",
    year: "2014",
    summary: "Essays examining how global capital has transformed India, analyzing displacement and the rise of Hindu nationalism.",
    facts: "- Arundhati Roy won the Booker Prize (1997)\n- Known for passionate engagement and detailed research"
  },
  {
    title: "India After Gandhi",
    author: "Ramachandra Guha",
    category: "Indian Prose",
    year: "2007",
    summary: "A comprehensive history of independent India covering Partition, the Emergency, and economic liberalisation.",
    facts: "- Praised as the definitive history of independent India\n- Essential for NET questions on Indian English non-fiction"
  },
  {
    title: "Gandhi Before India",
    author: "Ramachandra Guha",
    category: "Indian Prose",
    year: "2013",
    summary: "The first volume of a Gandhi biography covering his birth to his departure from South Africa in 1914.",
    facts: "- Shows how Gandhi developed Satyagraha by fighting racial discrimination in South Africa"
  },
  {
    title: "Environmentalism: A Global History",
    author: "Ramachandra Guha",
    category: "Indian Prose",
    year: "2000",
    summary: "A global survey of the environmental movement contrasting Western recreational environmentalism with developing world struggles for survival.",
    facts: "- Coined the distinction between 'wilderness environmentalism' and 'livelihood environmentalism'"
  },
  {
    title: "Everybody Loves a Good Drought",
    author: "P. Sainath",
    category: "Indian Prose",
    year: "1996",
    summary: "Reportage from India's poorest rural districts, documenting how drought and landlessness are used by elites for profit.",
    facts: "- Sainath later founded the People's Archive of Rural India (PARI)\n- One of the most important works of Indian developmental journalism"
  },
  {
    title: "The Last Grain",
    author: "P. Sainath",
    category: "Indian Prose",
    year: "2000",
    summary: "Collected journalism exploring agrarian distress and farmer suicides caused by economic reforms.",
    facts: "- Widely credited with bringing the issue of farmer suicides in Maharashtra to national attention"
  },
  {
    title: "Development as Freedom",
    author: "Amartya Sen",
    category: "Indian Prose",
    year: "1999",
    summary: "Argues development is the expansion of human freedoms and capabilities, not merely economic growth.",
    facts: "- Amartya Sen won the Nobel Prize in Economics (1998)\n- 'Capabilities' concept developed with philosopher Martha Nussbaum"
  },
  {
    title: "The Idea of Justice",
    author: "Amartya Sen",
    category: "Indian Prose",
    year: "2009",
    summary: "Proposes a comparative approach to justice focused on reducing evident real-world injustice rather than seeking an ideal utopian society.",
    facts: "- Engages with Rawls, Smith, and non-Western traditions of justice"
  },
  {
    title: "Other Asias",
    author: "Gayatri Chakravorty Spivak",
    category: "Indian Prose",
    year: "2008",
    summary: "Essays examining Asian postcolonial identity, questioning the idea of 'Asia' as a coherent entity and exploring the subaltern.",
    facts: "- Spivak is best known for her landmark essay 'Can the Subaltern Speak?' (1988)"
  },
  {
    title: "The Paradoxical Prime Minister",
    author: "Shashi Tharoor",
    category: "Indian Prose",
    year: "2018",
    summary: "A critical analysis of Narendra Modi's tenure, highlighting contradictions between his rhetoric of development and rising intolerance.",
    facts: "- Tharoor is a prominent public intellectual and former UN diplomat"
  },
  {
    title: "An Era of Darkness",
    author: "Shashi Tharoor",
    category: "Indian Prose",
    year: "2016",
    summary: "Argues British colonialism inflicted massive economic and social damage on India and demands reparations.",
    facts: "- Published in the UK as 'Inglorious Empire'\n- Based on a viral Oxford Union speech"
  },
  {
    title: "My Gita",
    author: "Devdutt Pattanaik",
    category: "Indian Prose",
    year: "2015",
    summary: "An accessible reading of the Bhagavad Gita arguing it is about seeing the world from multiple perspectives rather than mere duty.",
    facts: "- Part of Pattanaik's wider project making Hindu mythology accessible to modern readers"
  },
  {
    title: "Sita: An Illustrated Retelling",
    author: "Devdutt Pattanaik",
    category: "Indian Prose",
    year: "2013",
    summary: "Retells the Ramayana focusing on regional folk versions to recover a more complex, active Sita.",
    facts: "- Challenges conventional patriarchal interpretations of Indian mythology"
  },
  {
    title: "Wings of Fire",
    author: "A. P. J. Abdul Kalam",
    category: "Indian Prose",
    year: "1999",
    summary: "The autobiography of India's 'Missile Man,' tracing his journey from a poor childhood to developing India's aerospace technology.",
    facts: "- Kalam served as India's 11th President (2002–2007)\n- One of the best-selling autobiographies in India"
  },
  {
    title: "Autobiography of an Unknown Indian",
    author: "Nirad C. Chaudhuri",
    category: "Indian Prose",
    year: "1951",
    summary: "Traces Chaudhuri's life in Bengal, offering a controversial portrait of the colonial encounter and praising European influence.",
    facts: "- The dedication 'To the memory of the British Empire' caused immediate outrage\n- V. S. Naipaul called it a 20th-century masterpiece"
  },
  {
    title: "My Story",
    author: "Kamala Das",
    category: "Indian Prose",
    year: "1976",
    summary: "Kamala Das's controversial autobiography describing her unhappy arranged marriage and her search for identity and love.",
    facts: "- Malayalam version is titled 'Ente Katha'\n- Its candid treatment of female sexuality shocked Indian society"
  },
  {
    title: "A Childhood in Malabar",
    author: "Kamala Das",
    category: "Indian Prose",
    year: "1992",
    summary: "A sensory Malayalam memoir of Das's childhood in her ancestral home in Kerala.",
    facts: "- Das later converted to Islam and changed her name to Kamala Surayya"
  },
  {
    title: "Unbowed",
    author: "Wangari Maathai",
    category: "Indian Prose",
    year: "2006",
    summary: "The autobiography of the Kenyan founder of the Green Belt Movement, describing her environmental campaigns and fight for democracy.",
    facts: "- Wangari Maathai won the Nobel Peace Prize (2004)\n- The first African woman and environmentalist to receive the prize"
  },
  {
    title: "Climbing the Mango Trees",
    author: "Madhur Jaffrey",
    category: "Indian Prose",
    year: "2005",
    summary: "A memoir of Jaffrey's childhood in 1940s Delhi, centred on the aromas and rituals of Indian cooking.",
    facts: "- Jaffrey famously introduced Indian food to Western audiences with her 1973 cookbook"
  },
  {
    title: "Beyond the Lines",
    author: "Kuldip Nayar",
    category: "Indian Prose",
    year: "2012",
    summary: "The autobiography of a respected Indian journalist covering Partition, the Emergency, and India-Pakistan relations.",
    facts: "- Nayar was imprisoned during Indira Gandhi's Emergency (1975–77)"
  },
  {
    title: "Playing It My Way",
    author: "Sachin Tendulkar",
    category: "Indian Prose",
    year: "2014",
    summary: "Sachin Tendulkar's autobiography tracing his childhood and record-breaking 24-year Test cricket career.",
    facts: "- Co-written with Boria Majumdar\n- One of the fastest-selling autobiographies in Indian publishing history"
  },
  {
    title: "Joothan: A Dalit's Life",
    author: "Omprakash Valmiki",
    category: "Indian Prose",
    year: "1997",
    summary: "A devastating memoir of growing up as an untouchable in Uttar Pradesh, facing daily humiliations, violence, and exclusions.",
    facts: "- 'Joothan' means leftover food scraped off others' plates\n- Essential text for Dalit literature in NET"
  },
  {
    title: "Karukku",
    author: "Bama",
    category: "Indian Prose",
    year: "1992",
    summary: "The first Dalit woman's autobiography in Tamil, describing caste oppression from both upper-caste Hindus and the Church.",
    facts: "- 'Karukku' refers to the double-edged saw-edged palm leaf\n- Bama is the pen name of Faustina Mary Fatima Rani"
  },
  {
    title: "The Prisons We Broke",
    author: "Baby Kamble",
    category: "Indian Prose",
    year: "1986",
    summary: "A memoir of Mahar community life in Maharashtra, detailing extreme poverty and the transformation brought by Ambedkar.",
    facts: "- Originally written in Marathi as 'Jina Amucha' (Our Life)\n- Focuses on community-level caste oppression rather than just the individual"
  },
  {
    title: "Baluta",
    author: "Daya Pawar",
    category: "Indian Prose",
    year: "1978",
    summary: "The first major Dalit autobiography in Marathi, describing extreme poverty in Mumbai's chawls and encounters with the Ambedkarite movement.",
    facts: "- The title refers to the grain given to village servants\n- Considered the founding text of modern Dalit autobiography in Marathi"
  },
  {
    title: "Akkarmashi",
    author: "Sharankumar Limbale",
    category: "Indian Prose",
    year: "1984",
    summary: "An autobiography describing the double discrimination faced by the illegitimate child of a Dalit woman and an upper-caste landlord.",
    facts: "- Title means 'half-caste' or 'illegitimate' (translated as 'The Outcaste')\n- Limbale authored the first systematic work of Dalit literary criticism"
  },
  {
    title: "Ants Among Elephants",
    author: "Sujatha Gidla",
    category: "Indian Prose",
    year: "2017",
    summary: "A family memoir tracing three generations of an untouchable family from the colonial era through independence and migration.",
    facts: "- Written in English and published in New York before its Indian release"
  },
  {
    title: "Tryst with Destiny",
    author: "Jawaharlal Nehru",
    category: "Indian Prose",
    year: "1947",
    summary: "Nehru's famous speech delivered at midnight on August 14–15, 1947, marking India's independence.",
    facts: "- Broadcast live on All India Radio\n- The phrase 'tryst with destiny' became part of the Indian political lexicon"
  },
  {
    title: "Under the Western Eyes",
    author: "Chandra Talpade Mohanty",
    category: "Indian Prose",
    year: "1986",
    summary: "A landmark feminist postcolonial essay arguing Western feminism imposes a monolithic victim framework on 'Third World Women'.",
    facts: "- One of the most cited essays in feminist and postcolonial theory\n- Published in Feminist Review"
  },
  {
    title: "Writing Caste, Writing Gender: Narrating Dalit Women's Testimonies",
    author: "Sharmila Rege (editor)",
    category: "Indian Prose",
    year: "2006",
    summary: "An edited collection of testimonies by Dalit women writers arguing they offer a unique intersectional perspective.",
    facts: "- Challenges mainstream feminism and Dalit movements for ignoring Dalit women"
  },
  {
    title: "Caste as Woman",
    author: "Vrinda Nabar",
    category: "Indian Prose",
    year: "1995",
    summary: "Explores how the caste system and patriarchy are deeply intertwined, doubly oppressing Indian women.",
    facts: "- An important work in Indian feminist criticism"
  },
  {
    title: "The Foundations of Indian Culture",
    author: "Sri Aurobindo",
    category: "Indian Prose",
    year: "1919",
    summary: "Defends Indian civilisation against colonial critiques, arguing its contribution to the world is spiritual rather than material.",
    facts: "- Originally published in the journal Arya\n- Aurobindo was a revolutionary nationalist who became a philosopher and yogi"
  },

];

export const categories = ["British Prose", "Other Prose", "American Prose", "Indian Prose"] as const;
export type Category = typeof categories[number];
