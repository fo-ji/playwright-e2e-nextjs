import { chromium } from '@playwright/test';
import path from 'node:path';
import prisma from '../../src/lib/prisma';

export default async function globalConfig() {
  const storagePath = path.resolve(__dirname, 'storageState.json');
  const date = new Date();
  const sessionToken = '9468389e-ff19-4eb4-bf73-b56516e9b7e8';
  // MEMO: NextAuthの場合、ブラウザとSessionモデルのsessionTokenを比較して認証を行う
  // MEMO: playwrightではstorageState.jsonでブラウザのセッションを設定できる

  // 1. 認証をパスするユーザーを作成
  const user = await prisma.user.upsert({
    // 1-1. emailでデータが存在するか確認
    where: {
      email: 'udemy@example.com',
    },
    // 1-2. なければ新規作成
    create: {
      name: 'userA',
      email: 'udemy@example.com',
      sessions: {
        create: {
          expires: new Date(
            date.getFullYear(),
            date.getMonth() + 6,
            date.getDate()
          ),
          sessionToken,
        },
      },
      accounts: {
        create: {
          type: 'oauth',
          provider: 'github',
          providerAccountId: '1234567',
          access_token: 'Q3v00dCoWcdzmxpGeiPG2I3wDgsJypSP',
          token_type: 'bearer',
          scope: 'read:user,user:email',
        },
      },
    },
    // 1-3. あれば何もしない
    update: {},
  });

  // 2. 認証ユーザーに紐付くタスクを作成
  const taskIds = [
    '4dd0db39-f099-a513-732e-12297a854a1f',
    '6fc76eff-a023-ff4a-350f-fbf002b6bf7e',
  ];
  const query = taskIds.map((id, idx) =>
    prisma.task.upsert({
      where: { id },
      create: {
        id,
        title: `Task ${idx + 1}`,
        completed: false,
        userId: user.id,
      },
      update: {},
    })
  );
  // $transaction APIで同一トランザクションで実行
  await prisma.$transaction([...query]);

  // 3. テスト環境のブラウザを立ち上げる
  const browser = await chromium.launch();

  // 4. cookieを付与する
  const context = await browser.newContext();
  await context.addCookies([
    {
      name: 'next-auth.session-token',
      value: sessionToken,
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      sameSite: 'Lax',
      expires: Math.round((Date.now() + 86400000 * 1) / 1000),
    },
  ]);

  // 5. context(session情報)をjsonファイルに書き出す
  await context.storageState({ path: storagePath });

  await browser.close();
}
