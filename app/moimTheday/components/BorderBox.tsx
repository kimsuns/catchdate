interface BorderBox {
  title: string;
  children: React.ReactNode;
}

export default function BorderBox({ title, children }: BorderBox) {
  return (
    <div className="relative p-4 border border-gray-300 rounded-lg bg-white shadow-md">
      <div className="absolute -top-3 left-20 transform -translate-x-1/2 bg-white px-2 text-[12px] font-semibold text-gray-700">
        {title}
      </div>
      <div>{children}</div>
    </div>
  );
}
