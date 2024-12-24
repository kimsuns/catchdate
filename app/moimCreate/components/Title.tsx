export default function Title({ text }: { text: string }) {
  return (
    <span className="text-black font-suit text-[17px] font-bold leading-[29px]">
      {text}
    </span>
  );
}
