export const mockGenerateQuestions = async (difficulty, topic) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return {
    questions: [
        {
            type: "multiple_choice",
            question: `MOCK [${difficulty}]: Who held the real political power in feudal Japan, while the emperor served as a figurehead?`,
            options: ["The Emperor", "The Shogun", "The Daimyo", "The Samurai"],
            correctIndex: 1,
            explanation: "The shogun was the military dictator who controlled the government, with the emperor acting symbolically."
        },
        {
            type: "multiple_choice",
            question: `MOCK [${difficulty}]: What was the term for the military government established by the shogun in feudal Japan?`,
            options: ["Bakufu", "Han", "Sankin-kotai", "Bushido"],
            correctIndex: 0,
            explanation: "Bakufu refers to the shogunate, the centralized military administration that governed Japan."
        },
        {
            type: "multiple_choice",
            question: `MOCK [${difficulty}]: In the feudal system, who were the regional lords that governed domains (han) under the shogun?`,
            options: ["Samurai", "Daimyo", "Ronin", "Shinto priests"],
            correctIndex: 1,
            explanation: "Daimyo were powerful feudal lords who administered their territories and provided military service to the shogun."
        },
        {
            type: "multiple_choice",
            question: `MOCK [${difficulty}]: Which social class was at the top of the hierarchy in feudal Japanese society during the Edo period?`,
            options: ["Farmers", "Merchants", "Samurai", "Artisans"],
            correctIndex: 2,
            explanation: "The samurai warrior class held the highest status, followed by farmers, artisans, and merchants."
        },
        {
            type: "multiple_choice",
            question: `MOCK [${difficulty}]: What system did the Tokugawa shogunate implement to control the daimyo by requiring them to alternate residence in Edo?`,
            options: ["Bushido code", "Sankin-kotai", "Jito system", "Gokenin"],
            correctIndex: 1,
            explanation: "Sankin-kotai, or alternate attendance, ensured daimyo loyalty by forcing them to spend time in the capital, draining resources."
        },
        {
            type: "multiple_choice",
            question: `MOCK [${difficulty}]: Which clan established the first shogunate in 1192 under Minamoto no Yoritomo?`,
            options: ["Ashikaga", "Tokugawa", "Minamoto", "Hojo"],
            correctIndex: 2,
            explanation: "The Minamoto clan founded the Kamakura shogunate, marking the start of shogun rule."
        },
        {
            type: "multiple_choice",
            question: `MOCK [${difficulty}]: During which period did the Ashikaga shogunate rule, known as the Muromachi period?`,
            options: ["1185–1333", "1336–1573", "1603–1868", "794–1185"],
            correctIndex: 1,
            explanation: "The Muromachi period (1336–1573) saw the Ashikaga family as shoguns, a time of cultural flourishing but political instability."
        },
        {
            type: "multiple_choice",
            question: `MOCK [${difficulty}]: What was the primary role of the emperor in the feudal Japanese government?`,
            options: ["Military leader", "Figurehead with no real power", "Tax collector", "Land distributor"],
            correctIndex: 1,
            explanation: "The emperor was a ceremonial and spiritual leader, while actual governance was handled by the shogun."
        },
        {
            type: "multiple_choice",
            question: `MOCK [${difficulty}]: Under the bakuhan system, what was the relationship between the shogun and the daimyo?`,
            options: ["Equal partners", "Shogun as overlord, daimyo as vassals", "Daimyo controlled the shogun", "No formal ties"],
            correctIndex: 1,
            explanation: "The bakuhan system structured Japan with the shogun as national ruler and daimyo as semi-autonomous regional governors."
        },
        {
            type: "multiple_choice",
            question: `MOCK [${difficulty}]: Which shogunate implemented a policy of national seclusion (sakoku) to limit foreign influence?`,
            options: ["Kamakura", "Muromachi", "Tokugawa", "Azuchi-Momoyama"],
            correctIndex: 2,
            explanation: "The Tokugawa shogunate (1603–1868) enforced sakoku to maintain internal stability and control."
        }
    ]
  };
};
