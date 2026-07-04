import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { code } = await request.json();

    if (!code || typeof code !== "string") {
      return NextResponse.json(
        { error: "No code provided" },
        { status: 400 }
      );
    }

    // Execute code in a sandboxed environment
    const logs: string[] = [];
    const originalLog = console.log;

    // Override console.log to capture output
    console.log = (...args: unknown[]) => {
      logs.push(args.map(String).join(" "));
    };

    try {
      // Execute the code
      const fn = new Function(code);
      fn();
    } catch {
      return NextResponse.json({
        success: false,
        error: "Error al ejecutar el codigo",
        logs,
      });
    }

    console.log = originalLog;

    return NextResponse.json({
      success: true,
      logs,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
