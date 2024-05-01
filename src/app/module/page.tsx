import { modules } from "@/constants/module";
import Link from "next/link";

export default function page() {
  return (
    <div className="flex flex-wrap my-16 xl:mx-40">
      <div className="flex flex-wrap justify-center gap-16">
        {modules.map((module) => (
          <Link
          key={module.name}
            className="flex flex-col items-center justify-center gap-3 py-6 bg-orange-500 w-44 rounded-xl max-h-48 hover:bg-orange-600"
            href={"/module" + module.url}
          >
            {module.logo}
            <h1 className="text-xl font-bold text-white">{module.name}</h1>
          </Link>
        ))}
      </div>
    </div>
  );
}
