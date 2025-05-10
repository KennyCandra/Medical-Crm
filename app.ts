import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import { AppDataSource } from './ormconfig'
import { Response, Request, NextFunction, ErrorRequestHandler } from 'express'
import createHttpError from "http-errors";
import cors from 'cors'
import AuthRoutes from './src/routes/Auth'
import DiagnosisRoutes from './src/routes/Diagnosis'
import SpecializationRoutes from './src/routes/Specializations'
import PrescriptoinRoutes from './src/routes/Prescription'
import DrugRoutes from './src/routes/Drug'
import AnalyticsRoutes from './src/routes/Analytics'
import cookiesParser from 'cookie-parser'
import { GoogleGenAI } from '@google/genai'
import DiseaseRoutes from './src/routes/Disease'
import AllergyRoutes from './src/routes/Allergies'
import ReportRouter from './src/routes/ReportsController'

const app = express()
app.use(express.json())
app.use(cookiesParser())
app.use(cors({
    credentials: true,
    origin: [
        "http://localhost:5173",
        process.env.FRONTEND_URL || "https://your-frontend-domain.com"
    ]
}));

app.use('/auth', AuthRoutes)
app.use('/spec', SpecializationRoutes)
app.use('/diagnosis', DiagnosisRoutes)
app.use('/disease', DiseaseRoutes)
app.use('/presc', PrescriptoinRoutes)
app.use('/drug', DrugRoutes)
app.use('/analytics', AnalyticsRoutes)
app.use('/allergy', AllergyRoutes)
app.use('/reports', ReportRouter)

export const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

app.use(
    (err: ErrorRequestHandler
        , req: Request
        , res: Response
        , next: NextFunction
    ) => {
        let status: number = 500;
        let message: string = "Internal Server Error";

        if (createHttpError.isHttpError(err)) {
            status = err.statusCode;
            message = err.message;
        }
        res.status(status).json({ message: message });
        return
    }
)

AppDataSource.initialize().then(() => {
    const PORT = process.env.PORT || process.env.DB_PORT_SERVER || 3000;
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
})