import { createUploadthing, createRouteHandler } from "uploadthing/server";

const f = createUploadthing();

const uploadRouter = {
  proofUploader: f({
    image: { maxFileSize: "4MB" },
  }).onUploadComplete((data) => {
    console.log("upload success:", data);
  }),
};

const handler = createRouteHandler({
  router: uploadRouter,
});

export { handler as GET, handler as POST };