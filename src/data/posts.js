import upper from '../../public/upper.JPG'
import upper2 from '../../public/upper2.JPG'
import upper3 from '../../public/upper3.jpg'
import llm from '../../public/llm.jpeg'

export const posts = [
  {
    id: 1,
    title: "My First Experience at UpperBound 2026",
    date: "2026-05-22",
    content: [
      { type: 'p', value: "I had an amazing experience at ==UpperBound 2026== ! The event was filled with insightful talks, engaging workshops, and fantastic networking opportunities. The vibe was amazing, the food was delicious, and I connected with so many cool, like-minded people in the same field." },
      { type: 'p', value: "I had a special conversation with **Professor Michael Bowling** about his talk on embedding concepts — so inspiring and intriguing. My favourite talks of the day:" },
      { type: 'list', items: [
        "**AI in Alberta Health** — Prof Ross Mitchell",
        "**Embedding Everything, Everywhere, All at Once** — Prof Michael Bowling",
      ]},
    ],
    images: [upper, upper2, upper3],
  },
  {
    id: 2,
    title: "My First Experience as an researcher at UR2PHD under the supervision of Professor Barbosa",
    date: "2025-12-22",
    content: [
      { type: 'p', value: "This Fall 2025 semester, I had the opportunity to work on a research project through the ==UR2PhD== program by the **Computing Research Association** together with my teammate, ==Ingrid Adams==." },
      { type: 'p', value: " Our project, ==Evaluating LLM Performance on the Correction of Syntactic and Semantic SQL Errors in the Spider Dataset==, focuses on current LLMs' performance on evaluating typical SQL errors on a large database." },
      { type: 'p', value: "What we have found from this research:" },
      { type: 'list', items: [
        "**LLM** such as Open AI and LLama can perform well on correcting **syntactic errors**" ,
        "They struggle with **semantic errors** especially when the error is more complex such as mixed errors.",
        "**LLMs'** also **overcorrect**, meaning they may change a correct query into an incorrect one.",
      ]},
    ],
    images: [llm],
  },
]
