import { MongoClient, Collection, ObjectID } from 'mongodb'
require('dotenv').config()

export class MongoDB {

    private static instance: MongoDB
    private collection: Collection

    private constructor() {
    }

    private async init(url: string, db_name: string, db_collection: string): Promise<void> {
        const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        this.collection = client.db(db_name).collection(db_collection)
    }

    public static async get_instance(): Promise<MongoDB> {
        if (!MongoDB.instance) {
            MongoDB.instance = new MongoDB()
            await MongoDB.instance.init(process.env.MONGO_URI, "Ask", "Questions")
        }
        return MongoDB.instance
    }

    public async get(): Promise<Array<any>> {
        const questions = await this.collection.find().sort({ date: -1 }).toArray()
        return questions
    }

    public add_question(question: string, author: string, username: string, date: string): void {
        this.collection.insertOne({ question, author, username, date, answer : ""})
    }

    public async get_questions_by_username(username: string): Promise<any> {
        const questions = await this.collection.find({ username: username }).sort({ date: -1 }).toArray()
        return questions
    }

    public update(id: string, answer: string): void {
        const _id = new ObjectID(id)
        this.collection.updateOne({ _id: _id }, { $set: { answer: answer } })
    }
}
