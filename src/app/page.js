"use client";
import React, { useState, useEffect } from "react";
import styles from "./page.module.css";

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

const SENTENCES = [
  {
    id: 1,
    french: "Bonjour",
    english: "Hello",
    turkish: "Merhaba",
  },
  {
    id: 2,
    french: "Bonne nuit",
    english: "Good night",
    turkish: "İyi geceler",
  },
  {
    id: 3,
    french: "pluie",
    english: "rain",
    turkish: "yağmur",
  },
  {
    id: 4,
    french: "soleil",
    english: "sun",
    turkish: "güneş",
  },
  {
    id: 5,
    french: "Comment t'appelles-tu ?",
    english: "What is your name?",
    turkish: "Adın ne?",
  },
  {
    id: 6,
    french: "Je m'appelle Benek",
    english: "My name is Benek",
    turkish: "Benim adım Benek",
  },
  {
    id: 7,
    french: "gateau au chocolat",
    english: "chocolate cake",
    turkish: "çikolatalı kek",
  },
  {
    id: 8,
    french: "Comment ça va ?",
    english: "How are you?",
    turkish: "Nasılsın?",
  },
  {
    id: 9,
    french: "Ça va bien, merci",
    english: "I'm fine, thank you",
    turkish: "İyiyim, teşekkür ederim",
  },
  {
    id: 10,
    french: "enchantée",
    english: "nice to meet you",
    turkish: "Tanıştığımıza memnun oldum",
  },
  {
    id: 11,
    french: "Où habites-tu?",
    english: "Where do you live?",
    turkish: "Nerede yaşıyorsun?",
  },
];

const ColorfulText = ({ text, translation }) => {
  return (
    <div>
      <p className={styles.textColor}>{text}</p>{" "}
      <p style={{ color: "#B0B0B0", fontStyle: "italic" }}>{translation}</p>
    </div>
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
        {SENTENCES.map((sentence) => (
          <li className={styles.listItem} key={sentence.id}>
            <div className="colorful-text">
              <ColorfulText
                text={sentence.french}
                translation={sentence.turkish}
              />
            </div>
            <button
              className={styles.button}
              onClick={() => speak(sentence.french)}
            >
              <i className="fas fa-volume-up"></i>
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
