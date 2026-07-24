import upper from '../../public/upper.JPG'
import upper2 from '../../public/upper2.JPG'
import upper3 from '../../public/upper3.jpg'
import llm from '../../public/llm.jpeg'
import proj1 from '../../public/proj1.png'
import proj2 from '../../public/proj2.png'
import proj3 from '../../public/proj3.png'
import proj4 from '../../public/proj4.png'
import feeds from '../../public/FEEDS.png'
import me from '../../public/zoe.JPEG'
import win from '../../public/win.jpg'
import team from '../../public/team.JPG'
import cohort from '../../public/cohort.PNG'
import google from '../../public/gg.JPG'
import mila from '../../public/mila.JPG'
import logos from '../../logos/logo-removebg.png'

export const posts = [
  {
    id: 1,
    title: "Demo Day at AI4Good Lab 2026 and we won the Accelerator Award!",
    date: "2026-06-23",
    content: [
      { type: 'p', value: "==The day has come!== After 3 weeks of hard work on our project, my Edmonton cohort had a wonderful trip to **Montreal** to attend **Demo Day** where we had a ** 3-mintute presentation** (pretty stressful) and **90-minute talking booth**!" },
      { type: 'p', value: "Everything went smoothly, and we were able to effectively showcase our project to a great audience! **FEEDS** has been a great success and we won ==the Accelerator Award==" },
      { type: 'p', value: "Here are few reasons why I believe **FEEDS** deserves the award:" },
      { type: 'list', items: [
        "Our **3-minute presentation** was ==clear, concise, and engaging== => we were able to effectively communicate the problem, our solution, and the impact of our project.",
        "Our **90-minute talking booth** was ==well-organized and informative== => we were able to answer questions and provide additional information regarding the **next steps and implementation**.",
        "Our project has a ==clear impact== => we were able to demonstrate how our project can help food banks **better predict** supply and demand, which can ultimately lead to more efficient resource allocation and better support for those in need.",
        "Our project is ==well-designed==. We choose regression models which can be simple but effective for our problem. We did not just focus on one specic Food Bank but built **a 3-level model (provincial, regional, and campus)** which can be ==generalized== to other regions in Canada.",
      ]},
    ],
    images: [win, mila, cohort],
  },
  {
    id: 2,
    title: "A visit to Google Deepmind in Montreal, Canada",
    date: "2026-06-22",
    content: [
      { type: 'p', value: "I had an amazing experience at ==Google Deepmind== ! The workshop was filled with very interesting and over-the-top **projects**. The panelist was super fun and insightful where I can learn the career paths of **Google engineer scientists**." },
      { type: 'p', value: "The vibe was wonderful, the food was delicious (there is a cake!), and I connected with so many cool, like-minded people in other cohorts." },
    ],
    images: [google, me, team],
  },
  {
    id: 3,
    title: "My first 2 weeks working on Food Bank Project (We achieved a lot in just 2 weeks!)",
    date: "2026-06-14",
    content: [
      { type: 'p', value: "The last 2 weeks have been incredibly productive for our team working on the ==Food Bank Project==! It was exhausting but truly rewarding!" },
      { type: 'p', value: "To sum up, this is what we have accomplished:" },
      { type: 'list', items: [
        "Visited **Edmonton Food Bank** and learned about their operations and challenges => this is where we got the idea for our project!",
        "Had a meeting with the **Campus Food Bank** director and got a lot of insights about the food bank's operations (and asked for data!)",
        "Worked on a **Prophet + Random Forest** model to predict the supply and demand for provincial food bank => we achieved a ==80% accuracy==",
        "Built a model for **regional FB (Red Deer)** using Prophet to predict monthly hampers demands => We achieved a ==82.3% accuracy==",
        "FOund out that our **5 external features** such as AISH caseload, CPI, etc explained the provincial model also explained the regional model => this is a great sign that our model is ==generalizable== and can be applied to other regions in Alberta!",
        "Developed a **full-stack web application** to visualize the data and predictions for the food bank (using React, and Python/FastAPI)",
        "Our project name is ==FEEDS== (Forecasting Engine for Estimating Demand and Supply)"
      ]},
    ],
    images: [feeds, logos],
  },
  {
    id: 4,
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
    id: 5,
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
    id: 6,
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
