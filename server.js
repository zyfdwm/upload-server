import express from "express";
import cors from "cors";
import { createUploadthing, createRouteHandler } from "uploadthing/server";

const app = express();

app.use(cors({
    origin: "*"
}));

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

app.listen(3001, () => {
    console.log("Server running on port 3001");
});