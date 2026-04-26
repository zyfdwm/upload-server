import express from "express";
import cors from "cors";
import { createUploadthing, createRouteHandler } from "uploadthing/server";

const app = express();

app.use(cors({
    origin: "*"
}));

if (!process.env.UPLOADTHING_SECRET) {
    console.error("UPLOADTHING_SECRET missing");
}

const f = createUploadthing();

const uploadRouter = {
    proofUploader: f({
        image: { maxFileSize: "4MB" },
    }).onUploadComplete((data) => {
        console.log("upload success:", data);
    }),
};

app.use(
    "/api/uploadthing",
    createRouteHandler({
        router: uploadRouter,
    })
);

app.get("/", (req, res) => {
    res.send("Upload server running");
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});