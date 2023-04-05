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
  await prisma.user.upsert({
    // 1-1. emailでデータが存在するか確認
    where: {
      email: 'udemy@test.com',
    },
    // 1-2. なければ新規作成
    create: {
      name: 'userA',
      email: 'udemy@test.com',
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

  // 2. テスト環境のブラウザを立ち上げる
  const browser = await chromium.launch();

  // 3. cookieを付与する
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

  // 4. context(session情報)をjsonファイルに書き出す
  await context.storageState({ path: storagePath });

  await browser.close();
}
