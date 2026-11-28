import {
  CopyInviteButton,
  CurrentYear,
  ScrollReveal,
  ThemeToggle,
} from "@/components/ClientParts";
import { DiscordIcon, MoonIcon } from "@/components/icons";
import { INVITE_URL, X_URL } from "@/lib/site.mjs";

// ==========================================
// 📄 セクションの表示データ
// ==========================================

type Card = {
  icon: string;
  title: string;
  body: string;
  wide?: boolean;
};

const THINGS: Card[] = [
  {
    icon: "💬",
    title: "ゆるく雑談",
    body: "日常のひとことから深夜のゆるトークまで。無理に盛り上げなくてOKです。",
  },
  {
    icon: "🎮",
    title: "ゲーム",
    body: "一緒に遊ぶ相手探しや、好きなタイトルの情報交換に。",
  },
  {
    icon: "🎵",
    title: "音楽",
    body: "おすすめ曲の共有や、作業のお供のプレイリスト交換など。",
  },
  {
    icon: "🖼️",
    title: "画像・動画",
    body: "撮ったもの、作ったもの、見つけた面白いものを気軽にシェア。",
  },
  {
    icon: "🧵",
    title: "スレッドで自由に",
    body: "好きな話題はスレッドを立ててどうぞ。自分の「好き」を置ける場所があります。",
  },
  {
    icon: "🎉",
    title: "イベント開催予定",
    body: "みんなで集まれる企画を準備中。告知はDiscordと公式Xでお知らせします。",
  },
  {
    icon: "🤝",
    title: "他サーバーとの連携・交流",
    body: "コミュニティ同士のつながりも大切にしています。連携に興味のある運営者さんは、公式XのDMやDiscordで声をかけてください。",
    wide: true,
  },
];

const BOT_FEATURES: Card[] = [
  {
    icon: "⭐",
    title: "XP・レベル",
    body: "活動するとXPが貯まってレベルアップ。ランキングで競うのも楽しいです。",
  },
  {
    icon: "🔢",
    title: "数当てゲーム",
    body: "ヒントを頼りに数字を当てる、つい熱くなるミニゲーム。",
  },
  {
    icon: "🗳️",
    title: "投票・募集",
    body: "アンケートやメンバー募集を手軽に。意見集めや遊び相手探しに。",
  },
  {
    icon: "⏲️",
    title: "タイマー",
    body: "ゲームや作業のお供に使えるシンプルなタイマー機能。",
  },
  {
    icon: "👋",
    title: "ウェルカム",
    body: "新しいメンバーを温かく迎えるウェルカムメッセージ。",
  },
  {
    icon: "🌙",
    title: "これからも成長中",
    body: "まぶ鯖と一緒に、機能は少しずつ増えていきます。",
  },
];

const SAFETY: Card[] = [
  {
    icon: "🚫",
    title: "荒らし・攻撃目的は禁止",
    body: "相手を傷つけるための参加はお断りしています。",
  },
  {
    icon: "🛡️",
    title: "妨害行為はNG",
    body: "コミュニティの交流を妨げる行為は禁止です。",
  },
  {
    icon: "🌱",
    title: "初見さんも参加しやすく",
    body: "「どこで話せばいいかわからない」人も大歓迎。まずは眺めるだけでもOKです。",
  },
];

const OK_LIST = [
  "ROM専でもOK",
  "ちょっと覗くだけでもOK",
  "気になる話題に参加するだけでもOK",
];

const FAQS = [
  {
    question: "ROM専でも大丈夫ですか？",
    answer:
      "大丈夫です。読むだけ、眺めるだけの参加も歓迎しています。話したくなったときに、話したくなった分だけどうぞ。",
  },
  {
    question: "Discordを使うのが初めてです",
    answer:
      "初見さんも参加しやすい環境を目指しています。招待リンクから参加して、まずは雰囲気を眺めてみてください。分からないことは気軽に聞いてください。",
  },
  {
    question: "参加にお金はかかりますか？",
    answer: "かかりません。公開コミュニティとして、誰でも無料で参加できます。",
  },
  {
    question: "他のサーバーと連携したいです",
    answer:
      "歓迎しています。公式X（@mabu_saba）のDMか、Discord内で運営に声をかけてください。",
  },
];

const HERO_BADGES = ["ROM専OK", "覗くだけOK", "初見さん歓迎", "自分のペースでOK"];

function CardList({ cards }: { cards: Card[] }) {
  return (
    <ul className="cards">
      {cards.map((card) => (
        <li key={card.title} className={card.wide ? "wide" : undefined}>
          <div className="icon">{card.icon}</div>
          <h3>{card.title}</h3>
          <p>{card.body}</p>
        </li>
      ))}
    </ul>
  );
}

// ==========================================
// 🏠 トップページ
// ==========================================
export default function Home() {
  return (
    <>
      <ScrollReveal />

      {/* 📌 ヘッダー */}
      <header className="site-header">
        <div className="wrap">
          <a className="logo" href="/">
            <MoonIcon />
            まぶ鯖
          </a>
          <nav className="main-nav" aria-label="メインナビゲーション">
            <a href="#things">できること</a>
            <a href="#media">公式メディア</a>
            <a href="#bot">mabubot</a>
            <a href="#rules">安心の取り組み</a>
            <a href="#faq">FAQ</a>
          </nav>
          <ThemeToggle />
          <a
            className="btn btn-discord btn-small header-cta"
            href={INVITE_URL}
            target="_blank"
            rel="noopener"
          >
            Discordに参加
          </a>
        </div>
      </header>

      <main>
        {/* 📌 ヒーロー */}
        <div className="hero">
          <div className="wrap">
            <MoonIcon className="moon" />
            <h1>まぶ鯖</h1>
            <p className="tagline">
              🌙 メンバー募集中！「なんか暇だな…」と思ったそこのあなたへ
            </p>
            <p className="lead">
              ただ雑談するだけじゃない。いろんな人やコミュニティとつながりながら、
              <strong>自分のペースで楽しめる公開Discordコミュニティ</strong>
              です。
            </p>
            <div className="cta-row">
              <a
                className="btn btn-discord"
                href={INVITE_URL}
                target="_blank"
                rel="noopener"
              >
                <DiscordIcon />
                Discordに参加する
              </a>
              <a className="btn btn-ghost" href="#media">
                公式メディアを見る
              </a>
            </div>
            <div className="hero-badges">
              {HERO_BADGES.map((badge) => (
                <span key={badge}>{badge}</span>
              ))}
            </div>
          </div>
          <figure className="hero-figure">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/images/hero-night.webp"
              alt="月夜の丘に集まって、チャットやゲームの話題で盛り上がる仲間たちのイラスト"
              width={2400}
              height={1014}
              fetchPriority="high"
            />
          </figure>
        </div>

        {/* 📌 できること */}
        <section id="things">
          <div className="wrap">
            <div className="section-head reveal">
              <div className="kicker">WHAT YOU CAN DO</div>
              <h2>まぶ鯖でできること</h2>
              <p>
                話したいときに、話したい分だけ。気になる話題だけ参加しても大丈夫です。
              </p>
            </div>
            <div className="reveal">
              <CardList cards={THINGS} />
            </div>
          </div>
        </section>

        {/* 📌 公式メディア */}
        <section id="media">
          <div className="wrap">
            <div className="section-head reveal">
              <div className="kicker">OFFICIAL MEDIA</div>
              <h2>公式メディア</h2>
              <p>
                まぶ鯖は Discord と X で運営しています（note
                は開設準備中）。まずは眺めるだけでもどうぞ。
              </p>
            </div>
            <div className="media-cards reveal">
              <a
                className="media-card"
                href={INVITE_URL}
                target="_blank"
                rel="noopener"
              >
                <span className="role">本拠地</span>
                <h3>💬 Discord</h3>
                <p>
                  雑談・ゲーム・イベント実施の中心地。参加は招待リンクから、いつでも自由です。
                </p>
                <span className="go">参加する →</span>
              </a>
              <a
                className="media-card"
                href={X_URL}
                target="_blank"
                rel="noopener"
              >
                <span className="role">拡散・速報</span>
                <h3>𝕏 公式X</h3>
                <p>
                  メンバー募集、イベント告知、サーバーの日常を発信しています。@mabu_saba
                </p>
                <span className="go">フォローする →</span>
              </a>
              <div className="media-card">
                <span className="role">蓄積・ガイド</span>
                <h3>📝 公式note</h3>
                <p>
                  初見ガイド、ルール、イベントレポート、月刊の活動報告をまとめていく場所です。
                </p>
                <span className="soon">開設準備中</span>
              </div>
            </div>
          </div>
        </section>

        {/* 📌 専用Bot */}
        <section id="bot">
          <div className="wrap">
            <div className="section-head reveal">
              <div className="kicker">ORIGINAL BOT</div>
              <h2>専用Bot「mabubot」</h2>
              <p>
                まぶ鯖のために作られた自家製Botが、サーバーの毎日をちょっと楽しくします。
              </p>
            </div>
            <div className="reveal">
              <CardList cards={BOT_FEATURES} />
            </div>
          </div>
        </section>

        {/* 📌 安心の取り組み */}
        <section id="rules">
          <div className="wrap">
            <div className="section-head reveal">
              <div className="kicker">SAFE &amp; WELCOMING</div>
              <h2>安心して楽しめる環境づくり</h2>
              <p>みんなが気持ちよく交流できるコミュニティを目指しています。</p>
            </div>
            <div className="reveal">
              <CardList cards={SAFETY} />
            </div>
            <ul className="ok-list reveal">
              {OK_LIST.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* 📌 他サーバーとの連携 */}
        <section id="collab">
          <div className="wrap">
            <div className="split reveal">
              <div>
                <div
                  className="kicker"
                  style={{
                    color: "var(--accent)",
                    fontWeight: 700,
                    letterSpacing: ".14em",
                    fontSize: ".82rem",
                  }}
                >
                  COLLABORATION
                </div>
                <h2>他サーバーとの連携も！</h2>
                <p style={{ color: "var(--muted)" }}>
                  まぶ鯖では、他のDiscordサーバーとの連携・交流も歓迎しています。イベントの相互告知や、コミュニティ同士の交流に興味のある運営者さんは、お気軽に声をかけてください。
                </p>
                <ul className="feature-list">
                  <li>
                    <strong>連絡先</strong> ― 公式X{" "}
                    <a href={X_URL} target="_blank" rel="noopener">
                      @mabu_saba
                    </a>{" "}
                    のDM、またはDiscord内で
                  </li>
                  <li>
                    <strong>できること</strong> ―
                    イベントの相互告知、交流企画の相談など
                  </li>
                </ul>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/images/collab-bridge.webp"
                alt="光の橋でつながる2つの浮島と、手を振り合う人々のイラスト"
                width={2400}
                height={1014}
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* 📌 FAQ */}
        <section id="faq">
          <div className="wrap">
            <div className="section-head reveal">
              <div className="kicker">FAQ</div>
              <h2>よくある質問</h2>
            </div>
            <div className="faq reveal">
              {FAQS.map((faq) => (
                <details key={faq.question}>
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* 📌 参加 */}
        <section id="join">
          <div className="wrap">
            <div className="join-panel reveal">
              <MoonIcon className="moon-big" />
              <h2>まずは気軽に遊びに来てください</h2>
              <p>
                参加は招待リンクから。下のボタン、またはリンクのコピーでどうぞ。
              </p>
              <div className="cta-row">
                <a
                  className="btn btn-discord"
                  href={INVITE_URL}
                  target="_blank"
                  rel="noopener"
                >
                  Discordで参加する
                </a>
                <a
                  className="btn btn-x"
                  href={X_URL}
                  target="_blank"
                  rel="noopener"
                >
                  公式Xを見る
                </a>
              </div>
              <CopyInviteButton />
            </div>
          </div>
        </section>
      </main>

      {/* 📌 フッター */}
      <footer>
        <div className="wrap">
          <div className="f-name">🌙 まぶ鯖</div>
          <p>自分のペースで楽しめる、公開Discordコミュニティ。</p>
          <nav aria-label="フッターナビゲーション">
            <a href={INVITE_URL} target="_blank" rel="noopener">
              Discord
            </a>
            <a href={X_URL} target="_blank" rel="noopener">
              公式X @mabu_saba
            </a>
            <a href="#media">公式note（開設準備中）</a>
            <a href="#things">できること</a>
            <a href="#faq">FAQ</a>
          </nav>
          <p>
            © <CurrentYear /> まぶ鯖
          </p>
        </div>
      </footer>
    </>
  );
}
