import { motion } from "framer-motion";

export default function TextWithBounce({ text }: { text: string }) {
  return (
    <div className="flex justify-center">
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: index * 0.1, // 글자마다 약간의 딜레이를 주어 순차적으로 튀는 효과
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
          className="inline-block"
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
}
