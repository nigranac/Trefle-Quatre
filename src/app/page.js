"use client";
import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import WordWithTooltip from "./modules/WorldWithTooltip";

const phrases = ["Hoşgeldin", "Bienvenue"];
const typingSpeed = 150;
const erasingSpeed = 100;
const delayBetweenPhrases = 1000;

const TypingEffect = () => {
  const [currentPhrase, setCurrentPhrase] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % phrases.length;
      const fullPhrase = phrases[i];

      if (isDeleting) {
        setCurrentPhrase(fullPhrase.substring(0, currentPhrase.length - 1));
        if (currentPhrase.length === 0) {
          setIsDeleting(false);
          setLoopNum(loopNum + 1);
        }
      } else {
        setCurrentPhrase(fullPhrase.substring(0, currentPhrase.length + 1));
        if (currentPhrase.length === fullPhrase.length) {
          setTimeout(() => setIsDeleting(true), delayBetweenPhrases);
        }
      }
    };

    const typingTimer = setTimeout(
      handleTyping,
      isDeleting ? erasingSpeed : typingSpeed
    );

    return () => clearTimeout(typingTimer);
  }, [currentPhrase, isDeleting, loopNum]);

  return <div className={styles.welcomeMessage}>{currentPhrase}</div>;
};

const SENTENCES_2 = [
  {
    id: 12,
    french: "Elle a un beau crayon",
    words: [
      { french: "Elle", turkish: "O (kadın)" },
      { french: "a", turkish: "sahip" },
      { french: "un", turkish: "bir" },
      { french: "beau", turkish: "güzel" },
      { french: "crayon", turkish: "kalem", tick: true },
    ],
    turkish: "Onun güzel kalemi var",
    star: true,
  },
  {
    id: 1,
    french: "Bonjour",
    words: [{ french: "Bonjour", turkish: "Merhaba" }],
    turkish: "Merhaba",
  },
  {
    id: 2,
    french: "Bonne nuit",
    words: [
      { french: "Bonne", turkish: "İyi" },
      { french: "nuit", turkish: "geceler" },
    ],
    turkish: "İyi geceler",
  },
  {
    id: 3,
    french: "pluie",
    words: [{ french: "pluie", turkish: "yağmur" }],
    turkish: "yağmur",
  },
  {
    id: 4,
    french: "soleil",
    words: [{ french: "soleil", turkish: "güneş" }],
    turkish: "güneş",
  },
  {
    id: 5,
    french: "Comment t'appelles-tu ?",
    words: [
      { french: "Comment", turkish: "Nasıl" },
      { french: "t'appelles-tu", turkish: "adın ne" },
      { french: "?", turkish: "" },
    ],
    turkish: "Adın ne?",
  },
  {
    id: 6,
    french: "Je m'appelle Benek",
    words: [
      { french: "Je", turkish: "Ben" },
      { french: "m'appelle", turkish: "adım" },
      { french: "Benek", turkish: "Benek" },
    ],
    turkish: "Benim adım Benek",
  },
  {
    id: 7,
    french: "gateau au chocolat",
    words: [
      { french: "gateau", turkish: "kek" },
      { french: "au", turkish: "ile" },
      { french: "chocolat", turkish: "çikolatalı" },
    ],
    turkish: "çikolatalı kek",
  },
  {
    id: 8,
    french: "Comment ça va ?",
    words: [
      { french: "Comment", turkish: "Nasılsın" },
      { french: "ça", turkish: "bu" },
      { french: "va", turkish: "gidiyor" },
      { french: "?", turkish: "" },
    ],
    turkish: "Nasılsın?",
  },
  {
    id: 9,
    french: "Ça va bien, merci",
    words: [
      { french: "Ça", turkish: "Bu" },
      { french: "va", turkish: "gidiyor" },
      { french: "bien,", turkish: "iyi," },
      { french: "merci", turkish: "teşekkürler" },
    ],
    turkish: "İyiyim, teşekkür ederim",
  },
  {
    id: 10,
    french: "enchantée",
    words: [{ french: "enchantée", turkish: "Memnun oldum" }],
    turkish: "Tanıştığımıza memnun oldum",
  },
  {
    id: 11,
    french: "Où habites-tu?",
    words: [
      { french: "Où", turkish: "Nerede" },
      { french: "habites-tu", turkish: "yaşıyorsun" },
      { french: "?", turkish: "" },
    ],
    turkish: "Nerede yaşıyorsun?",
  },
];

const Sentence = ({ sentence }) => {
  return (
    <li className={styles.listItem} key={sentence.id}>
      {sentence.star && <div className={styles.star}>⭐</div>}
      <div>
        {sentence.words.map((word, index) => (
          <WordWithTooltip
            key={index}
            frenchWord={word.french}
            turkishTranslation={word.turkish}
            tick={word.tick}
          />
        ))}
        <p style={{ color: "#B0B0B0", fontStyle: "italic" }}>
          {sentence.turkish}
        </p>
      </div>
      <button className={styles.button} onClick={() => speak(sentence.french)}>
        <i className="fas fa-volume-up"></i>
      </button>
    </li>
  );
};

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "fr-FR";
  window.speechSynthesis.speak(utterance);
}

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.clover}>🍀</div>
      <div className={styles.daisy}>🌼</div>
      <TypingEffect />
      <ul className={styles.list}>
        {SENTENCES_2.map((sentence, index) => (
          <Sentence key={index} sentence={sentence} />
        ))}
      </ul>
    </main>
  );
}
