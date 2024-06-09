import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../utils/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { db } = await connectToDatabase();
    if (req.method === 'GET') {
        const roles = await db.collection('roles').find().toArray();
        res.status(200).json(roles);
    } else if (req.method === 'POST') {
        const { _id, permissions } = req.body;
        await db.collection('roles').insertOne({ _id, permissions });
        res.status(201).json({ message: 'Role created' });
    }
}
