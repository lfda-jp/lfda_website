// ミニハッカソン：開催回
// 1回 = 1ブロック。下のひな形をコピーして、配列のどこに足してもOK
// （表示は開催日の新しい順。「第◯回」は開催日の古い順に自動で振られます）
//
// {
//   date: '2026年10月6日',
//   name: '回の名前',                   // なければ行ごと削除（「ミニハッカソン」と表示）
//   tools: ['Claude Code'],            // 使ったツール（複数可）
//   works: [                           // つくったもの
//     { member: '名前', title: 'つくったもの' },
//     { member: '名前', title: 'つくったもの', note: '補足', url: 'https://…' },  // note・url は任意
//   ],
//   showcase: [                        // 最近作ったものを紹介（なければ行ごと削除）
//     { member: '名前', title: 'つくったもの' },
//   ],
//   links: [                           // 開催レポートなど（なければ行ごと削除）
//     { label: 'note', url: 'https://note.com/…' },
//   ],
// },
export const hackathons = [
  {
    date: '2026年9月8日',
    name: 'LFDA内、AI自動化ミニハッカソン',
    tools: ['Claude Code'],
    works: [
      { member: '青野', title: '定例会・締切のリマインドと、カレンダー予定を通知するDiscord Bot' },
      { member: 'みち', title: 'LINEとNotionをつなぐタスク管理エージェント', note: 'その後、LFDA連絡用DiscordのBotも制作' },
      { member: 'たまき', title: '業務のフォーム入力／Googleカレンダー連携の自動化' },
    ],
    showcase: [
      { member: '青野', title: '登山のGPS記録サイト' },
    ],
  },
]
