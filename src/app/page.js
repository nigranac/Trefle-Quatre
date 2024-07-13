"use client";
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  const SENTENCES = [
    {
      id: 1,
      french: "Bonjour, comment ça va ?",
      english: "Hello, how are you?",
    },
    {
      id: 2,
      french: "Je t'aime.",
      english: "I love you.",
    },
    {
      id: 3,
      french: "Bonne journée!",
      english: "Have a nice day!",
    },
    {
      id: 4,
      french: "Merci beaucoup.",
      english: "Thank you very much.",
    },
    {
      id: 5,
      french: "Où est la bibliothèque?",
      english: "Where is the library?",
    },
  ];

  function getRandomColor() {
    const colors = ["red", "blue", "green", "yellow", "purple", "orange"];
    return colors[Math.floor(Math.random() * colors.length)];
  }
  function ColorfulText({ text }) {
    return text.split(" ").map((word, index) => (
      <span key={index} style={{ color: getRandomColor() }}>
        {word}{" "}
      </span>
    ));
  }

  function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "fr-FR";
    window.speechSynthesis.speak(utterance);
  }
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>src/app/page.js</code>
        </p>
        <div></div>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <ul>
        {SENTENCES.map((sentence) => (
          <li key={sentence.id}>
            <div className="colorful-text">
              <ColorfulText text={sentence.french} />
            </div>
            <button
              className="speak-button"
              onClick={() => speak(sentence.french)}
            >
              <i className="fas fa-volume-up"></i>
            </button>
          </li>
        ))}
      </ul>

      <div className={styles.grid}>
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Docs <span>-&gt;</span>
          </h2>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>
      </div>
    </main>
  );
}
