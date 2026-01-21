import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: "Xアルゴリズム攻略ガイドのプライバシーポリシーです。",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">プライバシーポリシー</h1>

        <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
          <p className="text-muted-foreground">
            最終更新日: 2025年1月22日
          </p>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">個人情報の収集について</h2>
            <p className="text-foreground/90 leading-relaxed">
              本サイト「Xアルゴリズム攻略ガイド」は、<strong>個人情報を一切収集しません</strong>。
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground/90">
              <li>アクセス解析ツールは使用していません</li>
              <li>Cookieは使用していません</li>
              <li>ユーザー登録機能はありません</li>
              <li>お問い合わせフォームはありません</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">本サイトについて</h2>
            <p className="text-foreground/90 leading-relaxed">
              本サイトは、Xのアルゴリズムを学びたい方のために、
              個人がボランティアで運営・公開している非営利の教育サイトです。
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">外部リンクについて</h2>
            <p className="text-foreground/90 leading-relaxed">
              本サイトには、GitHub等の外部サイトへのリンクが含まれています。
              リンク先のサイトにおけるプライバシーポリシーについては、
              各サイトの規約をご確認ください。
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">お問い合わせ</h2>
            <p className="text-foreground/90 leading-relaxed">
              ご質問がある場合は、
              <a href="https://x.com/akira_papa_IT" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">X（@akira_papa_IT）</a>
              までご連絡ください。
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
