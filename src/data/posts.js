import upper from '../../public/upper.JPG'
import upper2 from '../../public/upper2.JPG'
import upper3 from '../../public/upper3.jpg'
import llm from '../../public/llm.jpeg'
import proj1 from '../../public/proj1.png'
import proj2 from '../../public/proj2.png'
import proj3 from '../../public/proj3.png'
import proj4 from '../../public/proj4.png'


export const posts = [
  {
    id: 1,
    title: "My First 4 weeks at AI4Good Lab as a Research Alumni",
    date: "2026-06-07",
    content: [
      { type: 'p', value: "The first four weeks at ==AI4Good Lab as a Research Alumni== have been incredibly rewarding. I learned a lot about the field of AI for Good and had the opportunity to attend many interesting talks and work on some exciting projects. It is crazy to think that just in 4 weeks, I learned not everything but almost everything from **neural networks, CNN, RNN, NLP, transformers to Reinforcement Learning**!" },
      { type: 'p', value: "4 projects that my e1 team worked on (in incredibly short time of 3 weeks bonus 5-minute presentations):" },
      { type: 'list', items: [
        "Do socioeconomic indicators correlate with violence against women? - **PCA and K-Means learning**",
        "Cassava Leaf Disease Classification - **ImageNet + EfficientNet**",
        "Toxic Comments Classification Challenge - **DistilBERT**",
        "Training a Robotic Arm with Reinforcement Learning - **Gymnasium PandaReachDense + SAC/TQC/PPO**"
      ]},
    ],
    images: [proj3, proj1, proj2, proj4],
  },
  {
    id: 2,
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
    id: 3,
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
