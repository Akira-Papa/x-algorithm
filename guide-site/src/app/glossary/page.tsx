'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { MagnifyingGlassIcon, BookOpenIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';

// カテゴリ定義
const categories = [
  { id: 'ml', label: '機械学習', color: 'blue' },
  { id: 'scoring', label: 'スコアリング', color: 'green' },
  { id: 'filtering', label: 'フィルター', color: 'orange' },
  { id: 'engagement', label: 'エンゲージメント', color: 'purple' },
  { id: 'system', label: 'システム', color: 'slate' },
  { id: 'content', label: 'コンテンツ', color: 'pink' },
];

interface GlossaryTerm {
  id: string;
  term: string;
  reading?: string;
  category: string;
  shortDescription: string;
  description: string;
  relatedTerms?: string[];
  relatedChapters?: number[];
}

// 用語データ
const glossaryTerms: GlossaryTerm[] = [
  // 機械学習カテゴリ
  {
    id: 'two-tower',
    term: 'Two-Tower',
    reading: 'ツータワー',
    category: 'ml',
    shortDescription: 'コンテンツとユーザーを別々のニューラルネットワークで処理する検索アーキテクチャ',
    description: `Two-Towerは、Xの推薦システムの根幹をなす機械学習アーキテクチャです。ユーザータワーとコンテンツタワーの2つのネットワークでそれぞれベクトル化し、類似度でマッチングスコアを算出します。`,
    relatedTerms: ['phoenix', 'embedding', 'candidate-generation'],
    relatedChapters: [3],
  },
  {
    id: 'phoenix',
    term: 'Phoenix',
    reading: 'フェニックス',
    category: 'ml',
    shortDescription: 'ユーザーの長期的な興味関心を予測するMLモデル',
    description: `Phoenixは、Xの推薦システムで使用される機械学習モデルです。ユーザーが将来どのようなコンテンツに興味を持つかを予測し、19種類のエンゲージメント予測に使用されます。`,
    relatedTerms: ['two-tower', 'engagement'],
    relatedChapters: [4],
  },
  {
    id: 'embedding',
    term: 'Embedding',
    reading: 'エンベディング',
    category: 'ml',
    shortDescription: 'テキストや画像をベクトル（数値の配列）に変換した表現',
    description: `Embeddingは、テキストや画像などの非構造化データを固定長のベクトルに変換する技術です。類似したコンテンツは近いベクトル空間に配置されます。`,
    relatedTerms: ['two-tower', 'simcluster'],
    relatedChapters: [3, 4],
  },
  {
    id: 'simcluster',
    term: 'SimCluster',
    reading: 'シムクラスター',
    category: 'ml',
    shortDescription: 'ユーザーとツイートをクラスタリングする機能',
    description: `SimClusterは、類似した興味を持つユーザーやツイートをグループ化する機能です。OON（Out of Network）の関連性判定に使用されます。`,
    relatedTerms: ['oon', 'topical-authority'],
    relatedChapters: [7],
  },

  // エンゲージメントカテゴリ
  {
    id: 'engagement',
    term: 'Engagement',
    reading: 'エンゲージメント',
    category: 'engagement',
    shortDescription: 'ユーザーがコンテンツに対して行うアクション全般',
    description: `Engagementは、いいね、リポスト、リプライ、ブックマークなどユーザーがコンテンツに対して行うアクション全般を指します。Xでは19種類のエンゲージメントが定義されています。`,
    relatedTerms: ['fav', 'repost', 'reply', 'bookmark'],
    relatedChapters: [2],
  },
  {
    id: 'fav',
    term: 'Fav (いいね)',
    reading: 'ファボ',
    category: 'engagement',
    shortDescription: 'コンテンツに対する基本的な好意的反応',
    description: `Favは「いいね」の内部呼称です。スコア計算では0.5ポイントとして扱われ、最も基本的なエンゲージメント指標の1つです。`,
    relatedTerms: ['engagement', 'reply', 'repost'],
    relatedChapters: [2, 5],
  },
  {
    id: 'repost',
    term: 'Repost (リポスト)',
    reading: 'リポスト',
    category: 'engagement',
    shortDescription: 'コンテンツを自分のタイムラインで共有するアクション',
    description: `Repostは、他者のツイートを自分のフォロワーに共有するアクションです。スコア計算では1.0ポイントとして重要視されます。`,
    relatedTerms: ['engagement', 'fav', 'quote'],
    relatedChapters: [2, 5],
  },
  {
    id: 'reply',
    term: 'Reply (リプライ)',
    reading: 'リプライ',
    category: 'engagement',
    shortDescription: 'ツイートへの返信コメント',
    description: `Replyは、ツイートへの返信です。スコア計算では27.0ポイントと非常に高い重みが設定されており、会話を促進するコンテンツが優遇されます。`,
    relatedTerms: ['engagement', 'conversation'],
    relatedChapters: [2, 5],
  },
  {
    id: 'bookmark',
    term: 'Bookmark (ブックマーク)',
    reading: 'ブックマーク',
    category: 'engagement',
    shortDescription: 'コンテンツを後で見返すために保存するアクション',
    description: `Bookmarkは、コンテンツを保存するプライベートなアクションです。スコア計算では0.5ポイントで、他者には見えない深い興味の指標となります。`,
    relatedTerms: ['engagement', 'fav'],
    relatedChapters: [2, 5],
  },
  {
    id: 'dwell-time',
    term: 'Dwell Time',
    reading: 'ドウェルタイム',
    category: 'engagement',
    shortDescription: 'ユーザーがコンテンツを閲覧した時間',
    description: `Dwell Timeは、ユーザーがあるコンテンツに留まった時間を計測する指標です。長いDwell Timeは深い興味を示すシグナルとして扱われます。`,
    relatedTerms: ['engagement', 'vqv'],
    relatedChapters: [2, 9],
  },

  // スコアリングカテゴリ
  {
    id: 'trust-score',
    term: 'Trust Score',
    reading: 'トラストスコア',
    category: 'scoring',
    shortDescription: 'アカウントの信頼性を示すスコア',
    description: `Trust Scoreは、アカウントの信頼性を0-1の範囲で示す内部スコアです。アカウント年齢、フォロー/フォロワー比率、認証状態などから算出されます。`,
    relatedTerms: ['topical-authority', 'reputation'],
    relatedChapters: [11],
  },
  {
    id: 'topical-authority',
    term: 'Topical Authority',
    reading: 'トピカルオーソリティ',
    category: 'scoring',
    shortDescription: '特定トピックにおけるアカウントの専門性指標',
    description: `Topical Authorityは、特定のトピックにおいてアカウントがどれだけ影響力・専門性を持っているかを示す指標です。一貫した投稿テーマが高スコアにつながります。`,
    relatedTerms: ['trust-score', 'simcluster'],
    relatedChapters: [8, 11],
  },
  {
    id: 'real-graph-weight',
    term: 'RealGraphWeight',
    reading: 'リアルグラフウェイト',
    category: 'scoring',
    shortDescription: 'フォロー関係の強さを示す重み付け',
    description: `RealGraphWeightは、フォロー関係の強さを示す指標です。単なるフォロー関係だけでなく、実際のインタラクション頻度も考慮されます。`,
    relatedTerms: ['inn', 'oon'],
    relatedChapters: [7],
  },
  {
    id: 'vqv',
    term: 'VQV (Video Quality View)',
    reading: 'ブイキューブイ',
    category: 'scoring',
    shortDescription: '動画の品質視聴を判定する指標',
    description: `VQVは、動画が一定時間以上視聴された場合に「品質視聴」としてカウントする指標です。完全再生率や再生時間が重要な要素となります。`,
    relatedTerms: ['dwell-time', 'engagement'],
    relatedChapters: [9],
  },

  // フィルターカテゴリ
  {
    id: 'safety-filter',
    term: 'SafetyFilter',
    reading: 'セーフティフィルター',
    category: 'filtering',
    shortDescription: '暴力・ヘイト・違法コンテンツを検出するフィルター',
    description: `SafetyFilterは、暴力、ヘイトスピーチ、テロ、違法行為などのコンテンツを検出し、SAFE/SENSITIVE/UNSAFEで分類するフィルターです。`,
    relatedTerms: ['nsfw-filter', 'spam-filter'],
    relatedChapters: [6],
  },
  {
    id: 'nsfw-filter',
    term: 'NsfwFilter',
    reading: 'エヌエスエフダブリューフィルター',
    category: 'filtering',
    shortDescription: '成人向けコンテンツを検出するフィルター',
    description: `NsfwFilterは、性的コンテンツや成人向けコンテンツを検出するフィルターです。検出されたコンテンツは年齢確認が必要になったり、表示制限を受けます。`,
    relatedTerms: ['safety-filter', 'quality-filter'],
    relatedChapters: [6],
  },
  {
    id: 'spam-filter',
    term: 'SpamFilter',
    reading: 'スパムフィルター',
    category: 'filtering',
    shortDescription: '大量投稿や自動化を検出するフィルター',
    description: `SpamFilterは、大量投稿、自動化、リンク乱用などのスパム行為を検出するフィルターです。スパムと判定されるとリーチ制限やアカウント凍結の対象となります。`,
    relatedTerms: ['safety-filter', 'quality-filter'],
    relatedChapters: [6],
  },
  {
    id: 'quality-filter',
    term: 'QualityFilter',
    reading: 'クオリティフィルター',
    category: 'filtering',
    shortDescription: 'コンテンツの情報価値を判定するフィルター',
    description: `QualityFilterは、コンテンツの情報価値やオリジナリティを判定するフィルターです。低品質と判定されたコンテンツはリーチ制限を受けます。`,
    relatedTerms: ['spam-filter', 'visibility-filter'],
    relatedChapters: [6],
  },
  {
    id: 'visibility-filter',
    term: 'VisibilityFilter',
    reading: 'ビジビリティフィルター',
    category: 'filtering',
    shortDescription: 'コンテンツの表示範囲を制御するフィルター',
    description: `VisibilityFilterは、コンテンツがどの範囲で表示されるかを制御するフィルターです。ユーザー設定やコンテンツの特性に基づいて動作します。`,
    relatedTerms: ['quality-filter', 'author-diversity'],
    relatedChapters: [6],
  },
  {
    id: 'author-diversity',
    term: 'Author Diversity',
    reading: 'オーサーダイバーシティ',
    category: 'filtering',
    shortDescription: 'タイムラインにおける著者の多様性を確保する仕組み',
    description: `Author Diversityは、同一著者のコンテンツがタイムラインを占有することを防ぐ仕組みです。連続表示制限などで実現されています。`,
    relatedTerms: ['visibility-filter', 'timeline'],
    relatedChapters: [8],
  },

  // システムカテゴリ
  {
    id: 'inn',
    term: 'In-Network (IN)',
    reading: 'インネットワーク',
    category: 'system',
    shortDescription: 'フォローしているアカウントからのコンテンツ',
    description: `In-Networkは、ユーザーがフォローしているアカウントからのコンテンツを指します。フォロー関係に基づく推薦であり、基本的なタイムライン構成要素です。`,
    relatedTerms: ['oon', 'real-graph-weight'],
    relatedChapters: [7],
  },
  {
    id: 'oon',
    term: 'Out-of-Network (OON)',
    reading: 'アウトオブネットワーク',
    category: 'system',
    shortDescription: 'フォローしていないアカウントからのコンテンツ',
    description: `Out-of-Networkは、ユーザーがフォローしていないアカウントからのコンテンツを指します。SimClusterやトピック類似性に基づいて推薦されます。`,
    relatedTerms: ['inn', 'simcluster'],
    relatedChapters: [7],
  },
  {
    id: 'candidate-generation',
    term: 'Candidate Generation',
    reading: 'キャンディデートジェネレーション',
    category: 'system',
    shortDescription: '推薦候補を大量に生成する初期段階',
    description: `Candidate Generationは、推薦システムの最初の段階で、大量のコンテンツ候補を生成するプロセスです。Two-Towerなどで実現されます。`,
    relatedTerms: ['two-tower', 'ranking'],
    relatedChapters: [1, 3],
  },
  {
    id: 'ranking',
    term: 'Ranking',
    reading: 'ランキング',
    category: 'system',
    shortDescription: '候補コンテンツをスコアで並び替える段階',
    description: `Rankingは、Candidate Generationで生成された候補を、各種スコアに基づいて並び替えるプロセスです。最終的なタイムライン表示順を決定します。`,
    relatedTerms: ['candidate-generation', 'scoring'],
    relatedChapters: [1, 5],
  },
  {
    id: 'timeline',
    term: 'Timeline (For You)',
    reading: 'タイムライン',
    category: 'system',
    shortDescription: 'ユーザーに表示されるパーソナライズされたフィード',
    description: `Timeline (For You)は、ユーザーに表示されるパーソナライズされたコンテンツフィードです。INとOONの両方からコンテンツが選択・順位付けされます。`,
    relatedTerms: ['inn', 'oon', 'ranking'],
    relatedChapters: [1, 7],
  },

  // コンテンツカテゴリ
  {
    id: 'hook',
    term: 'Hook (フック)',
    reading: 'フック',
    category: 'content',
    shortDescription: 'ユーザーの注意を引く導入部分',
    description: `Hookは、ツイートや動画の冒頭でユーザーの注意を引きつけるための要素です。最初の数秒や数文字が重要とされています。`,
    relatedTerms: ['cta', 'dwell-time'],
    relatedChapters: [9, 10],
  },
  {
    id: 'cta',
    term: 'CTA (Call to Action)',
    reading: 'シーティーエー',
    category: 'content',
    shortDescription: 'ユーザーにアクションを促す要素',
    description: `CTAは、ユーザーに特定のアクション（いいね、フォロー、クリックなど）を促すための要素です。適切なCTAはエンゲージメント向上に貢献します。`,
    relatedTerms: ['hook', 'engagement'],
    relatedChapters: [10],
  },
  {
    id: 'thread',
    term: 'Thread (スレッド)',
    reading: 'スレッド',
    category: 'content',
    shortDescription: '複数のツイートを連続して投稿する形式',
    description: `Threadは、複数のツイートを連続して投稿し、長文コンテンツを構成する形式です。適切な長さと構成がエンゲージメントに影響します。`,
    relatedTerms: ['engagement', 'dwell-time'],
    relatedChapters: [10],
  },
  {
    id: 'pinned-tweet',
    term: 'Pinned Tweet',
    reading: 'ピンドツイート',
    category: 'content',
    shortDescription: 'プロフィールの上部に固定表示されるツイート',
    description: `Pinned Tweetは、プロフィールページの上部に固定表示されるツイートです。新規訪問者への第一印象を形成する重要な要素です。`,
    relatedTerms: ['trust-score', 'profile'],
    relatedChapters: [11],
  },
];

// カテゴリの色を取得
function getCategoryColor(categoryId: string) {
  const category = categories.find((c) => c.id === categoryId);
  return category?.color || 'slate';
}

// カテゴリラベルを取得
function getCategoryLabel(categoryId: string) {
  const category = categories.find((c) => c.id === categoryId);
  return category?.label || categoryId;
}

export default function GlossaryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedTerms, setExpandedTerms] = useState<Set<string>>(new Set());

  // フィルタリングとソート
  const filteredTerms = useMemo(() => {
    return glossaryTerms
      .filter((term) => {
        // カテゴリフィルター
        if (selectedCategory && term.category !== selectedCategory) {
          return false;
        }
        // テキスト検索
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          return (
            term.term.toLowerCase().includes(query) ||
            term.reading?.toLowerCase().includes(query) ||
            term.shortDescription.toLowerCase().includes(query)
          );
        }
        return true;
      })
      .sort((a, b) => {
        const readingA = a.reading || a.term;
        const readingB = b.reading || b.term;
        return readingA.localeCompare(readingB, 'ja');
      });
  }, [searchQuery, selectedCategory]);

  const toggleExpand = (termId: string) => {
    setExpandedTerms((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(termId)) {
        newSet.delete(termId);
      } else {
        newSet.add(termId);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* ヘッダー */}
      <header className="bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            目次に戻る
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* ページタイトル */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <BookOpenIcon className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold">用語集</h1>
          </div>
          <p className="text-muted-foreground">
            Xアルゴリズムの専門用語を解説します。検索やカテゴリで絞り込むことができます。
          </p>
        </div>

        {/* 検索バー */}
        <div className="relative mb-6">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="用語を検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="用語を検索"
          />
        </div>

        {/* カテゴリフィルター */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setSelectedCategory(null)}
            className={cn(
              'px-3 py-1.5 rounded-full text-sm font-medium transition-colors',
              selectedCategory === null
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            )}
          >
            すべて
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={cn(
                'px-3 py-1.5 rounded-full text-sm font-medium transition-colors',
                selectedCategory === cat.id
                  ? cat.color === 'blue'
                    ? 'bg-blue-500 text-white'
                    : cat.color === 'green'
                    ? 'bg-green-500 text-white'
                    : cat.color === 'orange'
                    ? 'bg-orange-500 text-white'
                    : cat.color === 'purple'
                    ? 'bg-purple-500 text-white'
                    : cat.color === 'pink'
                    ? 'bg-pink-500 text-white'
                    : 'bg-slate-500 text-white'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 検索結果件数 */}
        <div className="mb-4 text-sm text-muted-foreground">
          {filteredTerms.length}件の用語
        </div>
        <div aria-live="polite" className="sr-only">
          {filteredTerms.length}件の用語が見つかりました
        </div>

        {/* 用語一覧 */}
        <div className="grid gap-4 md:grid-cols-2">
          {filteredTerms.map((term) => {
            const color = getCategoryColor(term.category);
            const isExpanded = expandedTerms.has(term.id);

            return (
              <div
                key={term.id}
                className="border border-border rounded-lg p-4 hover:border-primary/50 transition-colors bg-card"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="font-bold text-lg truncate">{term.term}</h3>
                    {term.reading && (
                      <span className="text-sm text-muted-foreground">
                        （{term.reading}）
                      </span>
                    )}
                  </div>
                  <span
                    className={cn(
                      'px-2 py-1 rounded text-xs font-medium whitespace-nowrap',
                      color === 'blue' && 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
                      color === 'green' && 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
                      color === 'orange' && 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
                      color === 'purple' && 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
                      color === 'pink' && 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300',
                      color === 'slate' && 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                    )}
                  >
                    {getCategoryLabel(term.category)}
                  </span>
                </div>

                <p className="mt-2 text-sm text-muted-foreground">
                  {term.shortDescription}
                </p>

                {/* 展開時の詳細説明 */}
                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <p className="text-sm whitespace-pre-wrap">{term.description}</p>
                  </div>
                )}

                {/* 関連章リンクと詳細ボタン */}
                <div className="mt-3 flex items-center justify-between">
                  {term.relatedChapters && term.relatedChapters.length > 0 ? (
                    <div className="flex gap-2">
                      {term.relatedChapters.map((ch) => (
                        <Link
                          key={ch}
                          href={`/chapters/${ch}`}
                          className="text-xs text-primary hover:underline"
                        >
                          第{ch}章
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div />
                  )}
                  <button
                    onClick={() => toggleExpand(term.id)}
                    className="text-xs text-primary hover:underline"
                  >
                    {isExpanded ? '閉じる' : '詳細を見る'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* 結果なしの場合 */}
        {filteredTerms.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              該当する用語が見つかりませんでした。
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory(null);
              }}
              className="mt-4 text-primary hover:underline"
            >
              フィルターをリセット
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
