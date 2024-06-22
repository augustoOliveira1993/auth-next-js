import { MongoClient } from 'mongodb';
import connection from '@/ultils/db'
const uri = process.env.MONGO_URI; // altere conforme necessário

async function fetchDocuments() {


    try {
        const db = await connection();
        const collection = db.collection('sua_collection'); // altere conforme necessário

        const documents = await collection.find().toArray();
        return documents;
    } catch (err) {
        console.error('Erro ao buscar documentos:', err);
        return [];
    } finally {

    }
}

export default async function handler(req, res) {
    const documents = await fetchDocuments();
    res.status(200).json(documents);
}
