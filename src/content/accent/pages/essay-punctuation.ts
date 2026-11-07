import type { AccentPage } from '../types';

export const page: AccentPage = {
  slug: 'essays/punctuation-as-product',
  section: 'essays',
  kind: 'essay',
  title: 'Punctuation as Product: Why Our Products Are Named After the Marks Between Words',
  summary:
    'Words travel badly between languages. Pauses, emphasis and exclamation travel well. Here is why Colon Hyphen Bracket names its products after punctuation.',
  readingMinutes: 9,
  pipes: ['website-design', 'chb', 'cubby'],
  rules: [
    {
      id: 'brand.mark-before-name',
      statement: 'When showing a product name, render its punctuation mark first and the word second, for example "´ Accent" or "! Bang".',
      why: 'The mark is the part of the name that survives translation, so it leads.',
    },
    {
      id: 'brand.mark-is-text',
      statement: 'Render product marks as real text characters, never as images or icon fonts.',
      why: 'Text marks are selectable, searchable, translatable and readable by screen readers.',
      violationPattern: '<img[^>]+alt="(´|!|:-\\]|;-\\])"',
    },
    {
      id: 'brand.mark-has-label',
      statement: 'Give every standalone punctuation mark an accessible label with the product name, such as aria-label="Bang".',
      why: 'A screen reader announcing "exclamation mark" alone tells nobody which product they are on.',
    },
    {
      id: 'brand.pipe-namespace-format',
      statement: 'Write Pipes namespaces as pipe\\name in lowercase with a single backslash, for example pipe\\website-design.',
      why: 'The backslash is a path. Keeping one consistent format makes namespaces easy to scan and to parse.',
    },
  ],
  tabs: {
    overview: `# Punctuation as Product

Most product names are words. Words are wonderful, right up until you leave the country they were born in.

Colon Hyphen Bracket names its products after punctuation instead. The company itself is a face built out of three marks: :-]. The design system you are reading is called Accent, and its mark is the acute accent, ´. The website builder for small businesses is Bang, written !. The AI companion is Semi, who winks at you as ;-]. The conversational reasoning engine is Greater, marked >. The journaling app is Hash, marked #. The precision editor is Trim, marked ~. And every topic inside Pipes lives at a path written with a backslash, like pipe\\website-design.

This essay explains why we did that, what it costs, and what it buys. It is partly a branding story. Mostly it is a story about what survives the trip between languages and what does not.

::demo:punctuation-family::

## The problem with naming things with words

### Words carry baggage you did not pack

Every naming agency has a horror story. A car called something that means "doesn't go" in Spanish. A soda whose slogan, translated into another language, promised to bring your ancestors back from the dead. Some of those stories are exaggerated. The pattern is real.

A word arrives with a pronunciation, a set of associations, slang meanings, rhymes, puns, and history. You can check the big languages. You cannot check all of them, and you definitely cannot check the slang of next year.

### Translation is uneven

Even honest translations drift. The English "home" carries warmth. Its nearest neighbour in another language may just mean "residence", which sounds like a tax form. "Pipes" in English suggests plumbing and flow. In another language the closest word might suggest smoking, or bagpipes, or nothing at all.

So a product name built from a word works brilliantly in one market and limps in others. You can rename per region. Big companies do. It is expensive, it splits your brand, and it makes support harder because nobody agrees on what the thing is called.

### Small companies cannot afford a naming department

We are a small company. Our customers include a bakery owner in Ohio and a translator in Lisbon. We do not have a team to localise twelve product names into forty languages. We needed names that were already local almost everywhere.

## Why punctuation works

### Marks are shared across most written languages

Look at a page of French, Portuguese, German, Turkish, Vietnamese, Indonesian, or Swahili. You will find commas, full stops, exclamation marks, colons and brackets doing roughly the same jobs. Many scripts that do not use the Latin alphabet have borrowed some of these marks, or have close cousins that do the same work: a pause, a stop, a raised voice, an aside.

That is the core idea. Words translate unevenly. Punctuation mostly does not need translating, because it describes the shape of speech rather than its content. A pause is a pause. Emphasis is emphasis. A shout is a shout.

Here is how the same job is done in four writing systems.

::demo:fig-marks-scripts::

### Each mark already means something

We did not pick marks at random. Each one describes the job of its product.

Try the same five words with a different mark each time.

::demo:fig-pause-stress::

### ´ Accent: emphasis and inflection

An accent mark changes how a letter is said. It does not add a new word; it shifts weight. That is exactly what a design system should do. It should not shout over your content. It should tell the reader where to put their attention: this heading matters, this number is the total, this button is the next step. Accent is the mark of inflection.

### ! Bang: a small business saying something out loud

Programmers call the exclamation mark "bang". It is the loudest mark on the keyboard. Bang builds websites for small businesses, and the point of a small business website is to say, clearly and with some enthusiasm, "we are open, here is what we do, come in." The mark fits the energy. It also fits the speed: one keystroke.

### :-] Colon Hyphen Bracket: the company as a face

The company name is literally the three characters that make its logo. Colon, hyphen, bracket. Turn your head and it is a small, slightly square smile. We liked that it is made entirely of utility characters, the kind you type every day, arranged into something human. That is what we try to do with software.

### ;-] Semi: the wink

Semi (surfaced as Ask or Semi) is our conversational AI partner. Swap the colon for a semicolon and the face winks. A wink says "I am helping, and I am not taking myself too seriously." That is the right posture for an assistant. It should be useful and it should not pretend to be your therapist or your boss. (Speech-to-text programs often hear her as "Simmy" or "Simi", but her brand name is always Semi.)

### > Greater: the prompt to reach further

Where Semi acts as the ambient desktop partner, Greater (marked \`>\`) is the high-order edge reasoning engine. Like the shell prompt or the mathematical sign of abundance, \`>\` invites deep inquiry, synthesis across personal nodes, and zero-leakage local evaluation. (Speech-to-text systems often hear this as "Grader", but her name is strictly Greater.)

### # Hash and ~ Trim: craft tools

Hash (\`#\`) takes the octothorpe and makes it the home of distraction-free epistemic journaling, recording thoughts directly into personal Merkle trees. Trim (\`~\`), bearing the tilde's wave, is the precision editorial tool: cutting fluff, reducing noise, and trimming drafts down to their essential marrow.

### \\ The pipe namespace: a path

Inside Pipes, every topic lives at a namespace like pipe\\chb or pipe\\cubby. The backslash is a path separator. It says "this lives inside that." It reads the same in Tokyo and in Toronto, because people who use computers have all seen file paths.

Together, the marks and words form the family lockups.

::demo:fig-wordmark-lockups::

## What this looks like in practice

### In the interface

Product marks lead. In navigation, you see "´ Accent" rather than "Accent ´". The mark is the part that crosses borders, so it gets the first position. It is set as real text, not as an image, which means you can copy it, search for it, and a screen reader can read it with a proper label.

### In conversation

A customer in Brazil and a customer in Poland can both write "the ! builder" in a support ticket and we know exactly what they mean. Support agents do not need a glossary of regional names.

### In code

Namespaces like pipe\\website-design double as identifiers. Engineers and local AI models can parse them with a single rule: lowercase, one backslash, hyphens between words. Fewer special cases means fewer bugs.

### A concrete example

Say a café owner in Mexico City signs up for Bang. Her site uses Accent under the hood. She asks Semi to rewrite her menu descriptions, uses Greater to evaluate supplier contracts, and journals in Hash. Her blog posts get filed under pipe\\cafe. At no point did anyone need to translate a product name. The marks (!, ´, ;-], >, #, ~, \\) did the work, and the words around them were in Spanish because that is her language, not ours.

## The counter-argument: isn't this just clever?

There is a fair case against all of this. Let us make it properly.

### Punctuation is hard to search

Try typing "!" into a search engine. You will get nothing useful. A brand that cannot be searched is a brand that cannot be found. This is the strongest objection and it is correct.

Our answer is that the mark is never alone. It is always paired with a word: "! Bang", "´ Accent". The word handles search. The mark handles identity and translation. Neither works as well without the other.

### Marks are not universal

Plenty of writing systems use different punctuation. Arabic uses a reversed question mark. Chinese and Japanese use full-width marks and a different full stop. Spanish opens questions and exclamations with inverted marks. Some scripts historically used little punctuation at all.

That is true, and "universal" is too strong a word. "Widely shared" is accurate. The exclamation mark and the bracket are understood by a very large share of the people who use the web, including many who write in non-Latin scripts. That is a better hit rate than any single word we could have picked.

### Screen readers say strange things

Out of the box, a screen reader may announce ":-]" as "colon hyphen right bracket". That is literally our name, which is funny, but "!" read as "exclamation" with no context is unhelpful. So every standalone mark gets an accessible label. This is a real cost, and we pay it on purpose.

### It might feel like a gimmick

Some people will find the whole thing a bit precious. That is fine. A name has two jobs: be remembered and be understood. If someone rolls their eyes and still remembers that the website builder is the exclamation mark, the name has done the first job.

## What we learned

### Names should describe jobs, not aspirations

The best thing about this system is that each mark describes what the product does. Accent shifts emphasis. Bang speaks up. The wink helps without pomp. The backslash is a path. When a name describes a job, people guess right about the product before they use it.

### Pair the neutral with the specific

A mark alone is too abstract. A word alone travels badly. Together they cover each other's weaknesses. That pairing (one neutral primitive, one specific word) is a pattern we reuse elsewhere, including in typography, where we pair one serif with one sans.

### Treat brand marks like content

Because the marks are text, they obey the same rules as text: contrast, size, labels, selection. A brand made of images is a brand that breaks on slow connections, in dark mode, and for blind users. A brand made of characters works anywhere text works.

## Closing

The space between words is where a lot of meaning lives. A comma tells you to breathe. A full stop tells you a thought is done. An exclamation mark tells you someone is excited. People all over the world read those signals without thinking about them.

We named our products after those signals because we wanted names that start out already understood, and then let the words around them be in whatever language our customers speak. It is a small decision. It saves us a lot of translating, and it reminds us, every time we type the company name, that software is mostly utility characters arranged to look a little bit human.
`,
  },
};
