import fs from "fs";
import path from "path";

export const runtime = "nodejs";

const RESUME_FILENAMES: Record<string, { file: string; downloadName: string }> = {
  design: {
    file: "design_resume.pdf",
    downloadName: "Luvya-Nishad-Design-Resume.pdf",
  },
  developer: {
    file: "developer_resume.pdf",
    downloadName: "Luvya-Nishad-Developer-Resume.pdf",
  },
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ type: string }> }
) {
  const { type } = await params;
  const config = RESUME_FILENAMES[type];

  if (!config) {
    return new Response("Resume not found", { status: 404 });
  }

  const filePath = path.join(process.cwd(), "public", "resumes", config.file);

  try {
    const fileBuffer = await fs.promises.readFile(filePath);

    return new Response(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${config.downloadName}"`,
        "Content-Length": fileBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error("Resume download error:", error);
    return new Response("File not found", { status: 404 });
  }
}
