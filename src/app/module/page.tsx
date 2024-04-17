import { modules } from "@/constants/module";
import Link from "next/link";

export default function page() {
  return (
    <div className="flex flex-wrap my-32 xl:mx-60">
      <div className="flex flex-wrap justify-center gap-16">
        {modules.map((module) => (
          <Link
            className="flex flex-col items-center justify-center w-48 gap-3 py-6 bg-orange-500 rounded-xl max-h-48"
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
