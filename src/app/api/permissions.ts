import { NextApiRequest, NextApiResponse } from 'next';
import connection from '@/ultils/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {db} = await connection();
    if (req.method === 'GET') {
        const permissions = await db.collection('permissions').find().toArray();
        res.status(200).json(permissions);
    } else if (req.method === 'POST') {
        const { _id, description } = req.body;
        await db.collection('permissions').insertOne({ _id, description });
        res.status(201).json({ message: 'Permission created' });
    }
}
