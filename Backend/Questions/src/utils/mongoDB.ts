import { MongoClient, Collection } from 'mongodb'
require('dotenv').config()

export class MongoDB {

    private static instance: MongoDB
    private collection: Collection

    private constructor() {
    }

    private async init(url: string, db_name: string, db_collection: string) : Promise<void> {
        const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        this.collection = client.db(db_name).collection(db_collection)
    }

    public static async get_instance() : Promise<MongoDB> {
        if (!MongoDB.instance) {
            MongoDB.instance = new MongoDB()
            await MongoDB.instance.init(process.env.MONGO_URI, "Ask", "Questions")
        }
        return MongoDB.instance
    }

    public async get(): Promise<Array<any>> {
        const questions = await this.collection.find().toArray()
        return questions
    }

    public add_question(question: object): void {
        this.collection.insertOne(question)
    }

    public async get_questions_by_username(username : string): Promise<any> {
        const questions = await this.collection.find({ username : username }).toArray()
        return questions
    }
}
