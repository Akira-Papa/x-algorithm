import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "利用規約",
  description: "Xアルゴリズム攻略ガイドの利用規約です。",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">利用規約</h1>

        <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
          <p className="text-muted-foreground">
            最終更新日: 2025年1月22日
          </p>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">本サイトについて</h2>
            <p className="text-foreground/90 leading-relaxed">
              「Xアルゴリズム攻略ガイド」は、X（旧Twitter）が公開しているオープンソースのアルゴリズムを
              解説・分析した<strong>非公式の教育サイト</strong>です。
              個人がボランティアで運営しており、X社（X Corp.）とは一切関係がありません。
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">著作権について</h2>
            <div className="space-y-3">
              <p className="text-foreground/90 leading-relaxed">
                本サイトのコンテンツ（解説文、図表等）は自由にご活用いただけますが、
                引用の際は出典の明記をお願いします。
              </p>
              <p className="text-foreground/90 leading-relaxed">
                Xアルゴリズムのソースコードに関する権利は、X Corp.およびそのライセンス条項に従います。
                ソースコードは<a href="https://github.com/xai-org/x-algorithm" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">GitHub</a>で公開されています。
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">免責事項</h2>
            <ul className="list-disc list-inside space-y-2 text-foreground/90">
              <li>本サイトの情報は、公開されているオープンソースコードを基に作成しています</li>
              <li>アルゴリズムは常に更新される可能性があり、最新の仕様を保証するものではありません</li>
              <li>本サイトの情報を利用したことによる損害について、運営者は責任を負いません</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">お願い</h2>
            <p className="text-foreground/90 leading-relaxed">
              本サイトは、Xのアルゴリズムを理解し、より良いコンテンツ作成に活かすための学習を目的としています。
              スパム行為やフォロワーの不正獲得など、Xの利用規約に違反する目的での利用はお控えください。
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">お問い合わせ</h2>
            <p className="text-foreground/90 leading-relaxed">
              ご質問やフィードバックは、
              <a href="https://x.com/akira_papa_IT" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">X（@akira_papa_IT）</a>
              までお気軽にどうぞ。
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
