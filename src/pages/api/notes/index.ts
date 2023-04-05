import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import { getNotes } from '@/lib/notes';
import { authOptions } from '../auth/[...nextauth]';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // MEMO: サーバサイドでsession情報を取得するときにunstable_getServerSessionを利用する
  const session = await unstable_getServerSession(req, res, authOptions);
  if (req.method === 'GET') {
    if (!session) {
      return res.status(401).json({
        error: 'You must sign in to access this endpoint',
      });
    }

    try {
      const { notes, error } = await getNotes();
      if (error) throw new Error(error);
      return res.status(200).json(notes);
    } catch (error: any) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }

  // GET以外
  res.setHeader('Allow', ['GET']);
  res.status(405).end(`Method ${req.method} is not allowed`);
};

export default handler;
