
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

// Load env vars manually
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf8');
    envConfig.split('\n').forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) {
            process.env[key.trim()] = value.trim();
        }
    });
}

// Define Job Schema inline to avoid import issues
const JobSchema = new mongoose.Schema({
    title: String,
    slug: String,
    status: String,
}, { collection: 'jobs' }); // Explicitly set collection name

// Use a different model name to avoid compilation issues if it exists
const Job = mongoose.models.Job || mongoose.model('Job', JobSchema);

async function checkJobs() {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined');
        }
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to DB');

        // List all collections
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('Collections in DB:', collections.map(c => c.name));

        const jobs = await Job.find({});
        console.log(`Found ${jobs.length} jobs in 'jobs' collection`);

        jobs.forEach((job: any) => {
            console.log(`Title: ${job.title}, Slug: ${job.slug}, Status: ${job.status}, ID: ${job._id}`);
        });

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
    }
}

checkJobs();
