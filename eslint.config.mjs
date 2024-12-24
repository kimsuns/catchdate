import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // @typescript-eslint/no-unused-vars 설정
      "@typescript-eslint/no-unused-vars": [
        "warn", // "error" 대신 "warn"으로 설정 (경고로 표시)
        {
          args: "none", // 함수 매개변수는 무시
          vars: "all", // 모든 선언된 변수를 확인
        },
      ],
    },
  },
];

export default eslintConfig;
