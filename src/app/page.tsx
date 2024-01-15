import ArticleSection from "./components/ArticleSection";
import LeftSection from "./components/LeftSection";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-[#121313] text-white">
      <div className="flex h-full w-4/5">
        <LeftSection />
        <ArticleSection />
      </div>
    </main>
  );
}
