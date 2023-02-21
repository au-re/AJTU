import client from "https";
import { bucket } from "../firebase";

export async function uploadImageFromUrl(url: string, fileName: string) {
  const file = bucket.file(fileName);
  const signedUrl = await file.getSignedUrl({ action: "read", expires: "03-09-2491" });

  return new Promise((resolve, reject) => {
    client.get(url, (res) => {
      const contentType = res.headers["content-type"];
      const writeStream = file.createWriteStream({ metadata: { contentType } });

      writeStream.on("finish", () => {
        resolve(signedUrl);
      });

      writeStream.on("error", () => {
        reject();
      });

      res.pipe(writeStream);
    });
  });
}
